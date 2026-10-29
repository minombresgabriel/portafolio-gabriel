"use client";

import { useEffect, useMemo, useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import gsap from "gsap";
import { useSpace } from "@/lib/store";
import { CLUSTERS, CORE_RADIUS, GALAXY_RADIUS, GALAXY_SPIN, armAngle } from "@/lib/galaxy";
import { ClusterLabels } from "./ClusterLabels";
import { Comet } from "./Comet";

/* ----------------------------------------------------------------- shader */

const vertex = /* glsl */ `
uniform float uTime;
uniform float uForm;
uniform float uPixel;
uniform float uScale;
uniform float uMaxSize;
attribute vec3 aColor;
attribute float aSize;
attribute float aSeed;
varying vec3 vColor;
varying float vAlpha;

void main() {
  // Formation: everything starts collapsed in the core and unfolds outward
  // in a swirl, the inner disk first.
  float r = length(position.xz);
  float delay = clamp(r / ${GALAXY_RADIUS.toFixed(1)}, 0.0, 1.0) * 0.45;
  float f = clamp((uForm - delay) / 0.55, 0.0, 1.0);
  f = 1.0 - pow(1.0 - f, 3.0);
  float swirl = (1.0 - f) * (2.6 + aSeed * 2.4);
  float c = cos(swirl);
  float s = sin(swirl);
  vec3 p = position * mix(0.015, 1.0, f);
  p.xz = mat2(c, -s, s, c) * p.xz;

  vec4 mv = modelViewMatrix * vec4(p, 1.0);
  float depth = max(-mv.z, 0.001);
  float size = aSize * uScale * uPixel / depth;
  float maxSize = uMaxSize * uPixel;

  // Sub-pixel points keep their energy instead of flickering; points that
  // hit the size cap (very close to the camera) dim like soft bokeh.
  vAlpha = min(size, 1.0) * sqrt(min(1.0, maxSize / size));
  vAlpha *= smoothstep(0.3, 2.0, depth) * smoothstep(0.0, 0.08, f);
  gl_PointSize = clamp(size, 1.0, maxSize);

  float twinkle = 0.78 + 0.22 * sin(uTime * (0.4 + aSeed * 2.2) + aSeed * 60.0);
  vColor = aColor * twinkle;
  gl_Position = projectionMatrix * mv;
}
`;

const fragment = /* glsl */ `
uniform float uAlpha;
varying vec3 vColor;
varying float vAlpha;
void main() {
  float d = length(gl_PointCoord - 0.5) * 2.0;
  if (d > 1.0) discard;
  #ifdef DUST
    float a = exp(-d * d * 3.0) * (1.0 - d);
    gl_FragColor = vec4(vColor, a * vAlpha * uAlpha);
  #else
    float a = exp(-d * d * 7.0) + 0.12 * exp(-d * d * 1.6);
    gl_FragColor = vec4(vColor * a * vAlpha * uAlpha, 1.0);
  #endif
}
`;

/* ------------------------------------------------------------- generation */

// Deterministic randomness so the galaxy is identical on every visit.
const rng = (seed: number) => () => {
  seed |= 0;
  seed = (seed + 0x6d2b79f5) | 0;
  let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
  t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
  return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
};

const COLORS = {
  core: new THREE.Color("#fff1da"),
  gold: new THREE.Color("#ffbf6e"),
  blue: new THREE.Color("#6a8cff"),
  violet: new THREE.Color("#9d6bff"),
  pink: new THREE.Color("#ff6aa8"),
  dust: new THREE.Color("#070405"),
};

type Layer = { position: number[]; color: number[]; size: number[]; seed: number[] };
const layer = (): Layer => ({ position: [], color: [], size: [], seed: [] });

const push = (l: Layer, rand: () => number, p: THREE.Vector3, c: THREE.Color, size: number) => {
  l.position.push(p.x, p.y, p.z);
  l.color.push(c.r, c.g, c.b);
  l.size.push(size);
  l.seed.push(rand());
};

const toGeometry = (l: Layer) => {
  const g = new THREE.BufferGeometry();
  g.setAttribute("position", new THREE.Float32BufferAttribute(l.position, 3));
  g.setAttribute("aColor", new THREE.Float32BufferAttribute(l.color, 3));
  g.setAttribute("aSize", new THREE.Float32BufferAttribute(l.size, 1));
  g.setAttribute("aSeed", new THREE.Float32BufferAttribute(l.seed, 1));
  return g;
};

/** Colour by distance from the core and closeness to an arm's ridge. */
const tint = (out: THREE.Color, r: number, ridge: number) => {
  const t = r / GALAXY_RADIUS;
  out.copy(COLORS.core).lerp(COLORS.gold, THREE.MathUtils.smoothstep(t, 0, 0.2));
  out.lerp(COLORS.blue, THREE.MathUtils.smoothstep(t, 0.12, 0.5) * (0.35 + 0.65 * ridge));
  out.lerp(COLORS.violet, THREE.MathUtils.smoothstep(t, 0.45, 1) * (0.45 + 0.55 * ridge));
  return out;
};

function buildGalaxy() {
  const rand = rng(1987);
  const gauss = () => {
    const u = 1 - rand();
    const v = rand();
    return Math.sqrt(-2 * Math.log(u)) * Math.cos(2 * Math.PI * v);
  };
  const stars = layer();
  const haze = layer();
  const dust = layer();
  const clusters = layer();
  const p = new THREE.Vector3();
  const c = new THREE.Color();

  /** A point on (or between) the arms. Returns its ridge closeness 0..1. */
  const diskPoint = (out: THREE.Vector3, spread = 1) => {
    const r = CORE_RADIUS + Math.pow(rand(), 1.3) * (GALAXY_RADIUS - CORE_RADIUS);
    let angle: number;
    let ridge: number;
    if (rand() < 0.22) {
      angle = rand() * Math.PI * 2; // smooth disk between the arms
      ridge = 0.15;
    } else {
      const strong = rand() < 0.72;
      const arm = strong ? (rand() < 0.5 ? 0 : 2) : rand() < 0.5 ? 1 : 3;
      const offset = gauss() * (strong ? 0.26 : 0.4) * spread;
      angle = armAngle(arm, r) + offset;
      ridge = Math.exp(-(offset * offset) / 0.03) * (strong ? 1 : 0.6);
    }
    const rr = r * (1 + gauss() * 0.05);
    const thickness = 0.3 + 1.9 * Math.exp(-rr / 7);
    out.set(Math.cos(angle) * rr, gauss() * thickness, Math.sin(angle) * rr);
    return { r: rr, ridge };
  };

  // Disk and arms.
  for (let i = 0; i < 190000; i++) {
    const { r, ridge } = diskPoint(p);
    tint(c, r, ridge).multiplyScalar(0.32 + Math.pow(rand(), 3) * 1.1);
    push(stars, rand, p, c, 0.55 + Math.pow(rand(), 7) * 3.2);
  }

  // Bulge: a warm, dense, slightly flattened core.
  for (let i = 0; i < 42000; i++) {
    const k = Math.pow(rand(), 1.6);
    p.set(gauss() * 4.6 * k, gauss() * 2.3 * k, gauss() * 4.6 * k);
    const r = p.length();
    c.copy(COLORS.core).lerp(COLORS.gold, THREE.MathUtils.smoothstep(r, 0.5, 7)).multiplyScalar(0.5 + rand() * 0.9);
    push(stars, rand, p, c, 0.6 + Math.pow(rand(), 5) * 2.5);
  }

  // Star-forming regions: pink knots strung along the main arms.
  for (let k = 0; k < 110; k++) {
    const r = 7 + rand() * (GALAXY_RADIUS - 12);
    const arm = rand() < 0.5 ? 0 : 2;
    const a = armAngle(arm, r) + gauss() * 0.1;
    const center = new THREE.Vector3(Math.cos(a) * r, gauss() * 0.25, Math.sin(a) * r);
    const count = 30 + Math.floor(rand() * 70);
    for (let i = 0; i < count; i++) {
      p.set(gauss(), gauss() * 0.4, gauss()).multiplyScalar(0.45 + rand() * 0.5).add(center);
      c.copy(COLORS.pink).lerp(COLORS.violet, rand() * 0.4).multiplyScalar(0.7 + rand() * 0.8);
      push(stars, rand, p, c, 0.8 + rand() * 1.6);
    }
  }

  // Haze: few, large, faint points that melt everything into one glow.
  for (let i = 0; i < 2600; i++) {
    let r: number;
    let ridge = 1;
    if (rand() < 0.28) {
      p.set(gauss() * 5, gauss() * 1.6, gauss() * 5);
      r = p.length();
    } else {
      ({ r, ridge } = diskPoint(p, 0.8));
    }
    tint(c, r, ridge).multiplyScalar(0.055 + rand() * 0.05);
    push(haze, rand, p, c, 16 + rand() * 26);
  }

  // Dust lanes along the inner edge of the main arms.
  for (let i = 0; i < 5200; i++) {
    const r = 4 + Math.pow(rand(), 0.9) * (GALAXY_RADIUS - 10);
    const arm = rand() < 0.5 ? 0 : 2;
    const a = armAngle(arm, r) - 0.24 + gauss() * 0.07;
    p.set(Math.cos(a) * r, gauss() * 0.22, Math.sin(a) * r);
    push(dust, rand, p, COLORS.dust, 7 + rand() * 14);
  }

  // The five projects: bright clusters in their own colours, part of the arm.
  CLUSTERS.forEach((cl) => {
    const accent = new THREE.Color(cl.color);
    for (let i = 0; i < 1500; i++) {
      const k = Math.pow(rand(), 1.8);
      p.set(gauss(), gauss() * 0.6, gauss()).multiplyScalar(1.1 * k).add(cl.position);
      c.copy(accent).lerp(COLORS.core, Math.max(0, 0.6 - k)).multiplyScalar(0.6 + rand() * 0.9);
      push(clusters, rand, p, c, 0.7 + Math.pow(rand(), 4) * 2.4);
    }
    // A bright heart and a soft halo for each cluster.
    push(clusters, rand, cl.position, accent.clone().lerp(COLORS.core, 0.5).multiplyScalar(2.4), 7);
    for (let i = 0; i < 14; i++) {
      p.set(gauss(), gauss() * 0.5, gauss()).multiplyScalar(1.2).add(cl.position);
      push(haze, rand, p, accent.clone().multiplyScalar(0.07), 14 + rand() * 10);
    }
  });

  return {
    stars: toGeometry(stars),
    haze: toGeometry(haze),
    dust: toGeometry(dust),
    clusters: toGeometry(clusters),
  };
}

function buildBackground() {
  const rand = rng(42);
  const l = layer();
  const p = new THREE.Vector3();
  const c = new THREE.Color();
  const tints = ["#ffffff", "#cdd8ff", "#ffe4c4"].map((h) => new THREE.Color(h));
  for (let i = 0; i < 6000; i++) {
    const u = rand() * 2 - 1;
    const t = rand() * Math.PI * 2;
    const s = Math.sqrt(1 - u * u);
    p.set(s * Math.cos(t), u, s * Math.sin(t)).multiplyScalar(700 + rand() * 300);
    c.copy(tints[i % 3]).multiplyScalar(0.25 + Math.pow(rand(), 4) * 1.1);
    push(l, rand, p, c, 4 + Math.pow(rand(), 6) * 14);
  }
  return toGeometry(l);
}

/* ------------------------------------------------------------- component */

type LayerOptions = { scale: number; maxSize: number; alpha?: number; dust?: boolean; formed?: boolean };

function useLayerMaterial(time: { value: number }, form: { value: number }, opts: LayerOptions) {
  const dpr = useThree((s) => s.viewport.dpr);
  return useMemo(() => {
    const m = new THREE.ShaderMaterial({
      vertexShader: vertex,
      fragmentShader: fragment,
      defines: opts.dust ? { DUST: "" } : {},
      uniforms: {
        uTime: time,
        uForm: opts.formed ? { value: 1 } : form,
        uPixel: { value: dpr },
        uScale: { value: opts.scale },
        uMaxSize: { value: opts.maxSize },
        uAlpha: { value: opts.alpha ?? 1 },
      },
      transparent: true,
      depthWrite: false,
      blending: opts.dust ? THREE.NormalBlending : THREE.AdditiveBlending,
    });
    return m;
  }, [time, form, dpr, opts.scale, opts.maxSize, opts.alpha, opts.dust, opts.formed]);
}

export function Galaxy() {
  const group = useRef<THREE.Group>(null);
  const geometries = useMemo(buildGalaxy, []);
  const background = useMemo(buildBackground, []);
  const uniforms = useMemo(() => ({ time: { value: 0 }, form: { value: useSpace.getState().introDone ? 1 : 0 } }), []);

  const stars = useLayerMaterial(uniforms.time, uniforms.form, { scale: 150, maxSize: 26 });
  const clusters = useLayerMaterial(uniforms.time, uniforms.form, { scale: 150, maxSize: 34 });
  const haze = useLayerMaterial(uniforms.time, uniforms.form, { scale: 150, maxSize: 320 });
  const dust = useLayerMaterial(uniforms.time, uniforms.form, { scale: 150, maxSize: 260, alpha: 0.55, dust: true });
  const sky = useLayerMaterial(uniforms.time, uniforms.form, { scale: 150, maxSize: 6, formed: true });

  // When the intro hands over, the galaxy unfolds from a single point.
  useEffect(
    () =>
      useSpace.subscribe((s, prev) => {
        if (s.introDone && !prev.introDone) {
          gsap.fromTo(uniforms.form, { value: 0 }, { value: 1, duration: 4.2, ease: "power2.out" });
        }
      }),
    [uniforms],
  );

  useFrame(({ clock }, dt) => {
    uniforms.time.value += dt;
    if (group.current) group.current.rotation.y = clock.elapsedTime * GALAXY_SPIN;
  });

  return (
    <>
      <points geometry={background} material={sky} frustumCulled={false} />
      <group ref={group}>
        <points geometry={geometries.haze} material={haze} frustumCulled={false} renderOrder={1} />
        <points geometry={geometries.stars} material={stars} frustumCulled={false} renderOrder={2} />
        <points geometry={geometries.dust} material={dust} frustumCulled={false} renderOrder={3} />
        <points geometry={geometries.clusters} material={clusters} frustumCulled={false} renderOrder={4} />
        <ClusterLabels />
        <Comet />
      </group>
    </>
  );
}

