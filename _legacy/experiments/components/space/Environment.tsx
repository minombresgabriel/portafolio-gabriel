"use client";

import { useEffect, useMemo, useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { NOISE } from "./glsl";
import { PlanetBody } from "./PlanetBody";
import { Ship, type ShipPath } from "./Ship";
import { rig } from "./CameraRig";
import { useSpace } from "@/lib/store";
import { CONTACT_STOP, planets } from "@/data/portfolio";
import {
  CAMERA_STOPS,
  EARTH_POSITION,
  LAYOUT,
  MESSAGE_ORIGIN,
  PLANET_POSITIONS,
  SUN_POSITION,
} from "@/lib/world";

const additive = { transparent: true, depthWrite: false, blending: THREE.AdditiveBlending } as const;

/* ------------------------------------------------------------------ stars */

const starVertex = /* glsl */ `
uniform float uTime;
uniform float uDpr;
attribute float aSize;
attribute float aSeed;
attribute vec3 aColor;
varying vec3 vColor;
varying float vTwinkle;
void main() {
  vColor = aColor;
  vTwinkle = 0.65 + 0.35 * sin(uTime * (0.6 + aSeed * 1.8) + aSeed * 60.0);
  gl_PointSize = aSize * uDpr;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
`;

const starFragment = /* glsl */ `
varying vec3 vColor;
varying float vTwinkle;
void main() {
  float d = length(gl_PointCoord - 0.5) * 2.0;
  float a = smoothstep(1.0, 0.0, d);
  gl_FragColor = vec4(vColor * a * a * vTwinkle, 1.0);
}
`;

function Starfield({ count = 5000 }) {
  const dpr = useThree((s) => s.viewport.dpr);
  const { geometry, uniforms } = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const size = new Float32Array(count);
    const seed = new Float32Array(count);
    const color = new Float32Array(count * 3);
    const tints = [new THREE.Color("#ffffff"), new THREE.Color("#cfdcff"), new THREE.Color("#ffe6c7")];
    const v = new THREE.Vector3();
    for (let i = 0; i < count; i++) {
      v.randomDirection().multiplyScalar(700 + Math.random() * 400);
      pos.set([v.x, v.y, v.z], i * 3);
      const bright = Math.random() < 0.04;
      size[i] = bright ? 2.6 + Math.random() * 1.6 : 0.8 + Math.random() * 1.4;
      seed[i] = Math.random();
      const c = tints[i % 3].clone().multiplyScalar(bright ? 1.2 : 0.25 + Math.random() * 0.45);
      color.set([c.r, c.g, c.b], i * 3);
    }
    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute("position", new THREE.BufferAttribute(pos, 3));
    geometry.setAttribute("aSize", new THREE.BufferAttribute(size, 1));
    geometry.setAttribute("aSeed", new THREE.BufferAttribute(seed, 1));
    geometry.setAttribute("aColor", new THREE.BufferAttribute(color, 3));
    return { geometry, uniforms: { uTime: { value: 0 }, uDpr: { value: dpr } } };
  }, [count, dpr]);

  useFrame((_, dt) => {
    uniforms.uTime.value += dt;
  });

  return (
    <points geometry={geometry} frustumCulled={false}>
      <shaderMaterial vertexShader={starVertex} fragmentShader={starFragment} uniforms={uniforms} {...additive} />
    </points>
  );
}

/* -------------------------------------------------------------------- sun */

const glowVertex = /* glsl */ `
varying vec2 vUv;
void main() {
  vUv = uv;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
`;

const glowFragment = /* glsl */ `
uniform vec3 uColor;
uniform float uIntensity;
varying vec2 vUv;
void main() {
  float d = length(vUv - 0.5) * 2.0;
  float a = pow(max(1.0 - d, 0.0), 3.0) + 0.6 * pow(max(1.0 - d, 0.0), 12.0);
  gl_FragColor = vec4(uColor * a * uIntensity, 1.0);
}
`;

/** A camera-facing radial glow. */
function Glow({ size, color, intensity = 1 }: { size: number; color: string; intensity?: number }) {
  const mesh = useRef<THREE.Mesh>(null);
  const uniforms = useMemo(
    () => ({ uColor: { value: new THREE.Color(color) }, uIntensity: { value: intensity } }),
    [color, intensity],
  );
  useFrame(({ camera }) => mesh.current?.quaternion.copy(camera.quaternion));
  return (
    <mesh ref={mesh}>
      <planeGeometry args={[size, size]} />
      <shaderMaterial vertexShader={glowVertex} fragmentShader={glowFragment} uniforms={uniforms} {...additive} />
    </mesh>
  );
}

function Sun() {
  return (
    <group position={SUN_POSITION}>
      <mesh>
        <sphereGeometry args={[3.2, 48, 48]} />
        <meshBasicMaterial color={new THREE.Color("#fff0d2").multiplyScalar(3)} toneMapped={false} />
      </mesh>
      <Glow size={70} color="#ffb766" intensity={0.9} />
      <Glow size={22} color="#fff1dc" intensity={1.2} />
      <pointLight intensity={3} decay={0} color="#fff4e6" />
    </group>
  );
}

/* ----------------------------------------------------------------- orbits */

function Orbits() {
  const { lines, material } = useMemo(() => {
    const material = new THREE.LineBasicMaterial({ color: "#ffffff", ...additive, opacity: 0 });
    const lines = planets.map((p) => {
      const curve = new THREE.EllipseCurve(0, 0, LAYOUT[p.id].orbit, LAYOUT[p.id].orbit);
      const pts = curve.getPoints(256).map((v) => new THREE.Vector3(v.x, PLANET_POSITIONS[p.id].y, v.y));
      return new THREE.LineLoop(new THREE.BufferGeometry().setFromPoints(pts), material);
    });
    return { lines, material };
  }, []);

  useFrame((_, dt) => {
    const atContact = useSpace.getState().stop === CONTACT_STOP;
    material.opacity = THREE.MathUtils.damp(material.opacity, atContact ? 0.16 : 0.025, 1.5, dt);
  });

  return (
    <group>
      {lines.map((l, i) => (
        <primitive key={i} object={l} />
      ))}
    </group>
  );
}

/* --------------------------------------------------------------- nebulae */

const nebulaFragment = /* glsl */ `
uniform vec3 uColor;
uniform float uOpacity;
uniform float uTime;
uniform float uSeed;
varying vec2 vUv;
${NOISE}
void main() {
  vec2 p = vUv - 0.5;
  float r = length(p) * 2.0;
  float n = fbm(vec3(p * 2.6, uSeed + uTime * 0.01));
  float wisps = fbm(vec3(p * 6.0 + n, uSeed * 2.0));
  float a = smoothstep(1.0, 0.1, r) * smoothstep(-0.2, 0.7, n + wisps * 0.4);
  gl_FragColor = vec4(uColor * a * uOpacity, 1.0);
}
`;

/** Very subtle colour behind the planet in focus, and nowhere else. */
function Nebula({ index }: { index: number }) {
  const planet = planets[index];
  const stop = index + 1;
  const { position, quaternion, uniforms } = useMemo(() => {
    const p = PLANET_POSITIONS[planet.id];
    const cam = CAMERA_STOPS[stop].position;
    const position = p.clone().addScaledVector(p.clone().sub(cam).normalize(), 40);
    const quaternion = new THREE.Quaternion().setFromRotationMatrix(
      new THREE.Matrix4().lookAt(position, cam, new THREE.Vector3(0, 1, 0)),
    );
    const uniforms = {
      uColor: { value: new THREE.Color(planet.color) },
      uOpacity: { value: 0 },
      uTime: { value: 0 },
      uSeed: { value: index * 3.7 },
    };
    return { position, quaternion, uniforms };
  }, [planet, stop, index]);

  useFrame((_, dt) => {
    const s = useSpace.getState().stop;
    const active = s === stop || (stop === 1 && s === 0);
    uniforms.uTime.value += dt;
    uniforms.uOpacity.value = THREE.MathUtils.damp(uniforms.uOpacity.value, active ? 0.16 : 0, 1.2, dt);
  });

  return (
    <mesh position={position} quaternion={quaternion}>
      <planeGeometry args={[90, 90]} />
      <shaderMaterial vertexShader={glowVertex} fragmentShader={nebulaFragment} uniforms={uniforms} {...additive} />
    </mesh>
  );
}

/* ----------------------------------------------------------- speed lines */

const speedVertex = /* glsl */ `
uniform float uSpeed;
uniform float uTime;
attribute float aEnd;
attribute float aSeed;
varying float vAlpha;
void main() {
  vec3 p = position;
  float z = -mod(aSeed * 60.0 + uTime * 40.0, 60.0) - 2.0;
  p.z = z - aEnd * (2.0 + uSpeed * 9.0);
  vAlpha = uSpeed * (1.0 - aEnd) * smoothstep(-62.0, -30.0, z) * smoothstep(-2.0, -8.0, z);
  gl_Position = projectionMatrix * modelViewMatrix * vec4(p, 1.0);
}
`;

const speedFragment = /* glsl */ `
uniform vec3 uColor;
varying float vAlpha;
void main() {
  gl_FragColor = vec4(uColor * vAlpha * 0.8, 1.0);
}
`;

/** Faint light trails around the camera while it travels. */
function SpeedLines({ count = 180 }) {
  const group = useRef<THREE.Group>(null);
  const { geometry, uniforms } = useMemo(() => {
    const pos = new Float32Array(count * 6);
    const end = new Float32Array(count * 2);
    const seed = new Float32Array(count * 2);
    for (let i = 0; i < count; i++) {
      const a = Math.random() * Math.PI * 2;
      const r = 2.2 + Math.random() * 6;
      const s = Math.random();
      for (let k = 0; k < 2; k++) {
        pos.set([Math.cos(a) * r, Math.sin(a) * r * 0.7, 0], (i * 2 + k) * 3);
        end[i * 2 + k] = k;
        seed[i * 2 + k] = s;
      }
    }
    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute("position", new THREE.BufferAttribute(pos, 3));
    geometry.setAttribute("aEnd", new THREE.BufferAttribute(end, 1));
    geometry.setAttribute("aSeed", new THREE.BufferAttribute(seed, 1));
    return {
      geometry,
      uniforms: { uSpeed: { value: 0 }, uTime: { value: 0 }, uColor: { value: new THREE.Color("#dfe9ff") } },
    };
  }, [count]);

  useFrame(({ camera }, dt) => {
    uniforms.uSpeed.value = rig.speed;
    uniforms.uTime.value += dt * (0.2 + rig.speed);
    group.current?.position.copy(camera.position);
    group.current?.quaternion.copy(camera.quaternion);
  });

  return (
    <group ref={group}>
      <lineSegments geometry={geometry} frustumCulled={false}>
        <shaderMaterial vertexShader={speedVertex} fragmentShader={speedFragment} uniforms={uniforms} {...additive} />
      </lineSegments>
    </group>
  );
}

/* ------------------------------------------------------ earth & message */

const EARTH_PALETTE: [string, string, string] = ["#020a1c", "#11406e", "#9fc7e6"];
const FLIGHT = 1.6;

function Earth() {
  const lightDir = useMemo(() => SUN_POSITION.clone().sub(EARTH_POSITION).normalize(), []);
  return (
    <group position={EARTH_POSITION}>
      <PlanetBody
        radius={2.4}
        palette={EARTH_PALETTE}
        rim="#7fb8ff"
        lightDir={lightDir}
        noiseScale={3.2}
        spin={0.04}
        atmosphere={1.3}
      />
    </group>
  );
}

/** A small light that flies to Earth every time a message is sent. */
function MessageLight() {
  const launches = useSpace((s) => s.messageLaunches);
  const launchedAt = useRef<number | null>(null);
  const clock = useThree((s) => s.clock);

  useEffect(() => {
    if (launches > 0) launchedAt.current = clock.elapsedTime;
  }, [launches, clock]);

  const path = useMemo<ShipPath>(() => {
    const control = MESSAGE_ORIGIN.clone().lerp(EARTH_POSITION, 0.5).add(new THREE.Vector3(0, 5, 0));
    const curve = new THREE.QuadraticBezierCurve3(MESSAGE_ORIGIN, control, EARTH_POSITION);
    return (t, out) => {
      if (launchedAt.current === null) return 0;
      const u = (t - launchedAt.current) / FLIGHT;
      curve.getPoint(THREE.MathUtils.clamp(u, 0, 1), out);
      return u < 0 || u > 1 ? 0 : THREE.MathUtils.smoothstep(u, 0, 0.1) * (1 - THREE.MathUtils.smoothstep(u, 0.9, 1));
    };
  }, []);

  return <Ship path={path} color="#ffffff" trail={0.45} size={44} />;
}

export function Environment() {
  return (
    <>
      <ambientLight intensity={0.04} />
      <Starfield />
      <Sun />
      <Orbits />
      {planets.map((_, i) => (
        <Nebula key={i} index={i} />
      ))}
      <SpeedLines />
      <Earth />
      <MessageLight />
    </>
  );
}
