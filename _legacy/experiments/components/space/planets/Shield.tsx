"use client";

import { useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { mergeVertices } from "three/examples/jsm/utils/BufferGeometryUtils.js";
import { Beacon, PlanetBody, useFocus } from "../PlanetBody";
import { Ship, type ShipPath } from "../Ship";
import { CAMERA_STOPS, LAYOUT, PLANET_POSITIONS } from "@/lib/world";

const PALETTE: [string, string, string] = ["#02101a", "#0e4a68", "#86dcef"];
const COLOR = "#62d6f2";
const PERIOD = 7;
const TRAVEL = 0.62; // fraction of the period the ship is flying
const SPAN = 7; // half-length of the ship's straight path

/** Goldberg-style hex grid: the dual of a subdivided icosahedron. */
function hexGrid(radius: number) {
  const ico = new THREE.IcosahedronGeometry(1, 4);
  ico.deleteAttribute("normal");
  ico.deleteAttribute("uv");
  const g = mergeVertices(ico);
  const pos = g.attributes.position;
  const index = g.index!;
  const centroids: THREE.Vector3[] = [];
  const edges = new Map<string, number[]>();
  const a = new THREE.Vector3();
  const b = new THREE.Vector3();
  const c = new THREE.Vector3();
  for (let f = 0; f < index.count / 3; f++) {
    const i = [index.getX(f * 3), index.getX(f * 3 + 1), index.getX(f * 3 + 2)];
    a.fromBufferAttribute(pos, i[0]);
    b.fromBufferAttribute(pos, i[1]);
    c.fromBufferAttribute(pos, i[2]);
    centroids.push(a.clone().add(b).add(c).normalize().multiplyScalar(radius));
    for (let e = 0; e < 3; e++) {
      const u = i[e];
      const v = i[(e + 1) % 3];
      const key = u < v ? `${u}_${v}` : `${v}_${u}`;
      edges.set(key, [...(edges.get(key) ?? []), f]);
    }
  }
  const out: number[] = [];
  edges.forEach((faces) => {
    if (faces.length !== 2) return;
    const [p, q] = [centroids[faces[0]], centroids[faces[1]]];
    out.push(p.x, p.y, p.z, q.x, q.y, q.z);
  });
  const lines = new THREE.BufferGeometry();
  lines.setAttribute("position", new THREE.Float32BufferAttribute(out, 3));
  return lines;
}

const RIPPLE = /* glsl */ `
uniform vec3 uImpact0;
uniform vec3 uImpact1;
uniform float uAge0;
uniform float uAge1;
float ripple(vec3 dir, vec3 impact, float age) {
  if (age < 0.0) return 0.0;
  float d = acos(clamp(dot(dir, impact), -1.0, 1.0));
  float front = exp(-pow((d - age * 1.5) * 5.0, 2.0));
  float flash = exp(-d * 6.0) * exp(-age * 5.0) * 2.0;
  return (front + flash) * exp(-age * 1.1);
}
float ripples(vec3 dir) { return ripple(dir, uImpact0, uAge0) + ripple(dir, uImpact1, uAge1); }
`;

const shieldVertex = /* glsl */ `
varying vec3 vDir;
varying float vFacing;
void main() {
  vDir = normalize(position);
  vec4 world = modelMatrix * vec4(position, 1.0);
  vec3 N = normalize(mat3(modelMatrix) * position);
  vFacing = dot(N, normalize(cameraPosition - world.xyz));
  gl_Position = projectionMatrix * viewMatrix * world;
}
`;

const gridFragment = /* glsl */ `
uniform vec3 uColor;
uniform float uTime;
varying vec3 vDir;
varying float vFacing;
${RIPPLE}
void main() {
  float edge = 1.0 - abs(vFacing);
  float side = vFacing > 0.0 ? 1.0 : 0.45;
  float shimmer = 0.5 + 0.5 * sin(vDir.y * 9.0 - uTime * 0.6 + vDir.x * 4.0);
  float a = (0.05 + 0.3 * pow(edge, 2.0) + 0.04 * shimmer) * side + ripples(vDir) * 1.3;
  gl_FragColor = vec4(uColor * a, 1.0);
}
`;

const shellFragment = /* glsl */ `
uniform vec3 uColor;
varying vec3 vDir;
varying float vFacing;
${RIPPLE}
void main() {
  float edge = 1.0 - clamp(vFacing, 0.0, 1.0);
  float a = pow(edge, 3.5) * 0.35 + ripples(vDir) * 0.22;
  gl_FragColor = vec4(uColor * a, 1.0);
}
`;

export function Shield() {
  const position = PLANET_POSITIONS.shield;
  const { radius, spin } = LAYOUT.shield;
  const shieldRadius = radius * 1.62;
  const lightDir = useMemo(() => position.clone().negate().normalize(), [position]);
  const focus = useFocus(position, 2);

  const { grid, uniforms, path, crossings } = useMemo(() => {
    const grid = hexGrid(shieldRadius);
    const uniforms = {
      uColor: { value: new THREE.Color(COLOR) },
      uTime: { value: 0 },
      uImpact0: { value: new THREE.Vector3(1, 0, 0) },
      uImpact1: { value: new THREE.Vector3(1, 0, 0) },
      uAge0: { value: -1 },
      uAge1: { value: -1 },
    };

    // The ship flies a straight chord in front of the planet: inside the
    // shield but clear of the surface, so it crosses the shield twice.
    const toCamera = CAMERA_STOPS[2].position.clone().sub(position).normalize();
    const dir = new THREE.Vector3(1, 0.18, -0.25).normalize();
    const offset = toCamera.clone().addScaledVector(dir, -toCamera.dot(dir)).normalize();
    const base = offset.multiplyScalar(radius * 1.3);
    const half = Math.sqrt(shieldRadius ** 2 - base.lengthSq());
    const sAt = (phase: number) => -SPAN + 2 * SPAN * (phase / TRAVEL);
    const path: ShipPath = (t, out) => {
      const phase = ((t % PERIOD) + PERIOD) % PERIOD / PERIOD;
      out.copy(base).addScaledVector(dir, sAt(Math.min(phase, TRAVEL)));
      if (phase > TRAVEL) return 0;
      const s = sAt(phase);
      return THREE.MathUtils.smoothstep(SPAN - Math.abs(s), 0, 1.5);
    };
    const crossings = [-half, half].map((s) => ((s + SPAN) / (2 * SPAN)) * TRAVEL * PERIOD);
    const impacts = [-half, half].map((s) => base.clone().addScaledVector(dir, s).normalize());
    uniforms.uImpact0.value.copy(impacts[0]);
    uniforms.uImpact1.value.copy(impacts[1]);
    return { grid, uniforms, path, crossings };
  }, [position, radius, shieldRadius]);

  useFrame(({ clock }, dt) => {
    uniforms.uTime.value += dt;
    const cycle = clock.elapsedTime % PERIOD;
    uniforms.uAge0.value = cycle - crossings[0];
    uniforms.uAge1.value = cycle - crossings[1];
  });

  return (
    <group position={position}>
      <group ref={focus.group} {...focus.handlers}>
        <PlanetBody radius={radius} palette={PALETTE} rim="#72dcff" lightDir={lightDir} noiseScale={2.8} spin={spin} />
        <lineSegments geometry={grid}>
          <shaderMaterial
            vertexShader={shieldVertex}
            fragmentShader={gridFragment}
            uniforms={uniforms}
            transparent
            depthWrite={false}
            blending={THREE.AdditiveBlending}
          />
        </lineSegments>
        <mesh>
          <sphereGeometry args={[shieldRadius, 64, 64]} />
          <shaderMaterial
            vertexShader={shieldVertex}
            fragmentShader={shellFragment}
            uniforms={uniforms}
            transparent
            depthWrite={false}
            blending={THREE.AdditiveBlending}
          />
        </mesh>
        <Ship path={path} color="#d9f7ff" trail={0.7} />
        <Beacon color={COLOR} focus={focus.state} />
      </group>
    </group>
  );
}
