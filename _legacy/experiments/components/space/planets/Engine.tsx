"use client";

import { useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { Beacon, PlanetBody, useFocus } from "../PlanetBody";
import { LAYOUT, PLANET_POSITIONS } from "@/lib/world";
import { useSpace } from "@/lib/store";

const RINGS = 7;
const STRANDS = 4;
const SEGMENTS = 320;
const STOP = 1;
const PALETTE: [string, string, string] = ["#1c0d04", "#7a4515", "#ecb66c"];

const ringVertex = /* glsl */ `
uniform float uOrder;
uniform float uTime;
uniform float uRadius;
uniform vec3 uLightDir;
attribute float aAngle;
attribute float aRing;
attribute float aStrand;
attribute float aSeed;
varying float vAlpha;

mat3 rotX(float a) { float c = cos(a), s = sin(a); return mat3(1.0, 0.0, 0.0, 0.0, c, s, 0.0, -s, c); }
mat3 rotZ(float a) { float c = cos(a), s = sin(a); return mat3(c, s, 0.0, -s, c, 0.0, 0.0, 0.0, 1.0); }

void main() {
  float o = clamp(uOrder * 1.6 - aRing * 0.09, 0.0, 1.0);
  o = o * o * (3.0 - 2.0 * o);
  float strand = aStrand - 0.5;

  // Ordered: seven clean concentric rings.
  float rClean = uRadius * (1.42 + aRing * 0.125) + strand * 0.04 * uRadius;
  vec3 clean = vec3(cos(aAngle) * rClean, 0.0, sin(aAngle) * rClean);

  // Chaos: every ring collapsed into one tangled, breathing loop.
  float t = uTime * 0.35;
  float rChaos = uRadius * 1.78
    + uRadius * 0.2 * sin(aAngle * 3.0 + aSeed * 6.283 + t)
    + uRadius * 0.09 * sin(aAngle * 5.0 + aSeed * 17.0 + t * 1.3)
    + strand * 0.06 * uRadius;
  vec3 chaos = vec3(cos(aAngle) * rChaos, uRadius * 0.16 * sin(aAngle * 2.0 + aSeed * 9.0 + t * 0.8), sin(aAngle) * rChaos);
  float tx = (aSeed - 0.5) * 0.85 + 0.14 * sin(t + aSeed * 20.0);
  float tz = (fract(aSeed * 7.13) - 0.5) * 0.85 + 0.14 * cos(t * 0.8 + aSeed * 11.0);
  chaos = rotX(tx) * rotZ(tz) * chaos;

  vec3 p = mix(chaos, clean, o);
  vec4 world = modelMatrix * vec4(p, 1.0);
  gl_Position = projectionMatrix * viewMatrix * world;

  // The planet casts a shadow across the rings.
  vec3 center = (modelMatrix * vec4(0.0, 0.0, 0.0, 1.0)).xyz;
  float worldRadius = uRadius * length(modelMatrix[0].xyz);
  vec3 rel = world.xyz - center;
  vec3 L = normalize(uLightDir);
  float along = dot(rel, L);
  float perp = length(rel - along * L);
  float shadow = along < 0.0 ? smoothstep(worldRadius * 0.9, worldRadius * 1.08, perp) : 1.0;

  float shimmer = 0.55 + 0.45 * sin(aAngle * 2.0 + uTime * 0.25 + aRing * 1.7);
  float core = 1.0 - abs(strand) * 1.4;
  vAlpha = (0.22 + 0.28 * o) * shimmer * core * (0.08 + 0.92 * shadow);
}
`;

const ringFragment = /* glsl */ `
uniform vec3 uColor;
varying float vAlpha;
void main() {
  gl_FragColor = vec4(uColor * vAlpha, 1.0);
}
`;

function Rings({ radius, lightDir }: { radius: number; lightDir: THREE.Vector3 }) {
  const geometry = useMemo(() => {
    const count = RINGS * STRANDS * SEGMENTS * 2;
    const angle = new Float32Array(count);
    const ring = new Float32Array(count);
    const strand = new Float32Array(count);
    const seed = new Float32Array(count);
    let v = 0;
    for (let r = 0; r < RINGS; r++) {
      const s = (r * 0.618034 + 0.13) % 1;
      for (let k = 0; k < STRANDS; k++) {
        for (let i = 0; i < SEGMENTS; i++) {
          for (const step of [i, i + 1]) {
            angle[v] = (step / SEGMENTS) * Math.PI * 2;
            ring[v] = r;
            strand[v] = k / (STRANDS - 1);
            seed[v] = s;
            v++;
          }
        }
      }
    }
    const g = new THREE.BufferGeometry();
    // Positions are computed in the shader; this only sizes the draw call.
    g.setAttribute("position", new THREE.BufferAttribute(new Float32Array(count * 3), 3));
    g.setAttribute("aAngle", new THREE.BufferAttribute(angle, 1));
    g.setAttribute("aRing", new THREE.BufferAttribute(ring, 1));
    g.setAttribute("aStrand", new THREE.BufferAttribute(strand, 1));
    g.setAttribute("aSeed", new THREE.BufferAttribute(seed, 1));
    g.boundingSphere = new THREE.Sphere(new THREE.Vector3(), radius * 3);
    return g;
  }, [radius]);

  const uniforms = useMemo(
    () => ({
      uOrder: { value: 0 },
      uTime: { value: 0 },
      uRadius: { value: radius },
      uLightDir: { value: lightDir },
      uColor: { value: new THREE.Color("#ffb25a") },
    }),
    [radius, lightDir],
  );

  useFrame((_, dt) => {
    const { arrived, stop } = useSpace.getState();
    const target = arrived === STOP || (stop === STOP && arrived === null) ? 1 : 0;
    uniforms.uTime.value += dt;
    // Untangle slowly (cinematic), re-tangle a little faster when leaving.
    uniforms.uOrder.value = THREE.MathUtils.damp(uniforms.uOrder.value, target, target ? 0.75 : 1.2, dt);
  });

  return (
    <lineSegments geometry={geometry} rotation={[0.42, 0, -0.2]}>
      <shaderMaterial
        vertexShader={ringVertex}
        fragmentShader={ringFragment}
        uniforms={uniforms}
        transparent
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </lineSegments>
  );
}

export function Engine() {
  const position = PLANET_POSITIONS.engine;
  const { radius, spin } = LAYOUT.engine;
  const lightDir = useMemo(() => position.clone().negate().normalize(), [position]);
  const focus = useFocus(position, 1);

  return (
    <group position={position}>
      <group ref={focus.group} {...focus.handlers}>
        <PlanetBody
          radius={radius}
          palette={PALETTE}
          rim="#ffb45e"
          lightDir={lightDir}
          noiseScale={2.4}
          bands={0.8}
          spin={spin}
        />
        <Rings radius={radius} lightDir={lightDir} />
        <Beacon color="#f2a650" focus={focus.state} />
      </group>
    </group>
  );
}
