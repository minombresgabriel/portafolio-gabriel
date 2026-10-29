"use client";

import { useMemo, useRef } from "react";
import { useFrame, useThree, type ThreeEvent } from "@react-three/fiber";
import * as THREE from "three";
import { NOISE } from "./glsl";
import { useSpace } from "@/lib/store";
import { CONTACT_STOP } from "@/data/portfolio";

const bodyVertex = /* glsl */ `
varying vec3 vLocal;
varying vec3 vNormalW;
varying vec3 vPosW;
void main() {
  vLocal = position;
  vec4 world = modelMatrix * vec4(position, 1.0);
  vPosW = world.xyz;
  vNormalW = normalize(mat3(modelMatrix) * normal);
  gl_Position = projectionMatrix * viewMatrix * world;
}
`;

const bodyFragment = /* glsl */ `
uniform vec3 uDeep;
uniform vec3 uMid;
uniform vec3 uLight;
uniform vec3 uRim;
uniform vec3 uLightDir;
uniform float uTime;
uniform float uScale;
uniform float uBands;
varying vec3 vLocal;
varying vec3 vNormalW;
varying vec3 vPosW;
${NOISE}
void main() {
  vec3 N = normalize(vNormalW);
  vec3 V = normalize(cameraPosition - vPosW);
  vec3 L = normalize(uLightDir);
  vec3 p = normalize(vLocal);

  float warp = fbm(p * uScale * 0.7 + vec3(0.0, uTime * 0.012, 0.0));
  float surface = fbm(p * uScale + warp * 0.9);
  float lat = p.y * 5.0 + warp * 1.4 + fbm(p * vec3(2.0, 14.0, 2.0)) * 0.35;
  float bands = sin(lat * 3.1) * 0.5 + fbm(vec3(lat * 0.8, p.x, p.z) * 2.0) * 0.5;
  float n = mix(surface, bands, uBands);

  vec3 col = mix(uDeep, uMid, smoothstep(-0.45, 0.15, n));
  col = mix(col, uLight, smoothstep(0.1, 0.65, n));

  float ndl = dot(N, L);
  float diff = smoothstep(-0.15, 0.9, ndl);
  float fres = pow(1.0 - max(dot(N, V), 0.0), 3.0);
  vec3 H = normalize(L + V);

  vec3 c = col * diff * 1.4;
  c += uRim * fres * smoothstep(-0.3, 0.55, ndl) * 1.6;
  c += uLight * pow(max(dot(N, H), 0.0), 36.0) * 0.12 * diff;
  c += col * 0.01;
  gl_FragColor = vec4(c, 1.0);
}
`;

const atmosphereVertex = /* glsl */ `
varying vec3 vNormalW;
varying vec3 vPosW;
varying vec3 vCenter;
void main() {
  vec4 world = modelMatrix * vec4(position, 1.0);
  vPosW = world.xyz;
  vCenter = (modelMatrix * vec4(0.0, 0.0, 0.0, 1.0)).xyz;
  vNormalW = normalize(mat3(modelMatrix) * normal);
  gl_Position = projectionMatrix * viewMatrix * world;
}
`;

const atmosphereFragment = /* glsl */ `
uniform vec3 uColor;
uniform vec3 uLightDir;
uniform float uStrength;
varying vec3 vNormalW;
varying vec3 vPosW;
varying vec3 vCenter;
void main() {
  vec3 N = normalize(vNormalW);
  vec3 V = normalize(cameraPosition - vPosW);
  float x = clamp(-dot(N, V), 0.0, 1.0);
  float glow = pow(smoothstep(0.0, 0.5, x), 2.4);
  float lit = smoothstep(-0.45, 0.7, dot(normalize(vPosW - vCenter), normalize(uLightDir)));
  gl_FragColor = vec4(uColor * glow * lit * uStrength, 1.0);
}
`;

type Palette = [deep: string, mid: string, light: string];

type PlanetBodyProps = {
  radius: number;
  palette: Palette;
  rim: string;
  lightDir: THREE.Vector3;
  noiseScale?: number;
  bands?: number;
  spin?: number;
  atmosphere?: number;
};

export function PlanetBody({
  radius,
  palette,
  rim,
  lightDir,
  noiseScale = 2.2,
  bands = 0,
  spin = 0.05,
  atmosphere = 1,
}: PlanetBodyProps) {
  const body = useRef<THREE.Mesh>(null);

  const bodyUniforms = useMemo(
    () => ({
      uDeep: { value: new THREE.Color(palette[0]) },
      uMid: { value: new THREE.Color(palette[1]) },
      uLight: { value: new THREE.Color(palette[2]) },
      uRim: { value: new THREE.Color(rim) },
      uLightDir: { value: lightDir },
      uTime: { value: 0 },
      uScale: { value: noiseScale },
      uBands: { value: bands },
    }),
    [palette, rim, lightDir, noiseScale, bands],
  );

  useFrame((_, dt) => {
    bodyUniforms.uTime.value += dt;
    if (body.current) body.current.rotation.y += dt * spin;
  });

  return (
    <group>
      <mesh ref={body}>
        <sphereGeometry args={[radius, 96, 96]} />
        <shaderMaterial vertexShader={bodyVertex} fragmentShader={bodyFragment} uniforms={bodyUniforms} />
      </mesh>
      {atmosphere > 0 && <Atmosphere radius={radius} color={rim} lightDir={lightDir} strength={atmosphere} />}
    </group>
  );
}

/** Soft additive halo hugging a sphere, brighter on its sun-facing side. */
export function Atmosphere({
  radius,
  color,
  lightDir,
  strength = 1,
  scale = 1.12,
}: {
  radius: number;
  color: string;
  lightDir: THREE.Vector3;
  strength?: number;
  scale?: number;
}) {
  const uniforms = useMemo(
    () => ({
      uColor: { value: new THREE.Color(color) },
      uLightDir: { value: lightDir },
      uStrength: { value: strength },
    }),
    [color, lightDir, strength],
  );
  return (
    <mesh scale={scale}>
      <sphereGeometry args={[radius, 64, 64]} />
      <shaderMaterial
        vertexShader={atmosphereVertex}
        fragmentShader={atmosphereFragment}
        uniforms={uniforms}
        side={THREE.BackSide}
        blending={THREE.AdditiveBlending}
        transparent
        depthWrite={false}
      />
    </mesh>
  );
}

const beaconVertex = /* glsl */ `
uniform float uSize;
void main() {
  gl_PointSize = uSize;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
`;

const beaconFragment = /* glsl */ `
uniform vec3 uColor;
uniform float uOpacity;
void main() {
  float d = length(gl_PointCoord - 0.5) * 2.0;
  float a = pow(max(1.0 - d, 0.0), 2.5);
  gl_FragColor = vec4(uColor * a * uOpacity * 2.0, 1.0);
}
`;

/**
 * Keeps distant planets as points of light: the group shrinks while far away
 * and grows to full size as the camera arrives. At the contact stop every
 * planet is exaggerated so the whole system reads at a glance.
 */
export function useFocus(position: THREE.Vector3, stop: number) {
  const group = useRef<THREE.Group>(null);
  const state = useRef({ near: 0, system: 0 });

  // Clicking the planet in focus opens its case study.
  const handlers = useMemo(() => {
    const inFocus = () => useSpace.getState().arrived === stop;
    return {
      onClick: (e: ThreeEvent<MouseEvent>) => {
        if (!inFocus()) return;
        e.stopPropagation();
        useSpace.getState().openCase();
      },
      onPointerOver: () => {
        if (inFocus()) document.body.style.cursor = "pointer";
      },
      onPointerOut: () => {
        document.body.style.cursor = "";
      },
    };
  }, [stop]);

  useFrame(({ camera }, dt) => {
    const atContact = useSpace.getState().stop === CONTACT_STOP;
    const s = state.current;
    s.system = THREE.MathUtils.damp(s.system, atContact ? 1 : 0, 1.4, dt);
    const d = camera.position.distanceTo(position);
    s.near = 1 - THREE.MathUtils.smoothstep(d, 14, 46);
    const scale = THREE.MathUtils.lerp(THREE.MathUtils.lerp(0.22, 1, s.near), 2.3, s.system);
    group.current?.scale.setScalar(scale);
  });

  return { group, state, handlers };
}

/** A soft point of light marking a planet from far away. */
export function Beacon({ color, focus }: { color: string; focus: ReturnType<typeof useFocus>["state"] }) {
  const dpr = useThree((s) => s.viewport.dpr);
  const uniforms = useMemo(
    () => ({
      uColor: { value: new THREE.Color(color) },
      uOpacity: { value: 1 },
      uSize: { value: 26 * dpr },
    }),
    [color, dpr],
  );
  const geometry = useMemo(() => {
    const g = new THREE.BufferGeometry();
    g.setAttribute("position", new THREE.Float32BufferAttribute([0, 0, 0], 3));
    return g;
  }, []);

  useFrame(() => {
    const { near, system } = focus.current;
    uniforms.uOpacity.value = (1 - near) * (1 - system * 0.5);
  });

  return (
    <points geometry={geometry}>
      <shaderMaterial
        vertexShader={beaconVertex}
        fragmentShader={beaconFragment}
        uniforms={uniforms}
        transparent
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}
