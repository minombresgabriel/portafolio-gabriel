"use client";

import { useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { Beacon, PlanetBody, useFocus } from "../PlanetBody";
import { LAYOUT, PLANET_POSITIONS } from "@/lib/world";

const PALETTE: [string, string, string] = ["#0a0c11", "#596273", "#eaeef6"];
const COLOR = "#e9edf5";
const BEAM_LENGTH = 9;
const BEAT = 1.6; // seconds per heartbeat

const HEARTBEAT = /* glsl */ `
uniform float uTime;
float beat(float phase) {
  return exp(-pow((phase - 0.04) * 28.0, 2.0)) + 0.55 * exp(-pow((phase - 0.19) * 28.0, 2.0));
}
`;

const beamVertex = /* glsl */ `
varying float vAlong;
varying float vFacing;
void main() {
  vAlong = uv.y;
  vec4 world = modelMatrix * vec4(position, 1.0);
  vec3 N = normalize(mat3(modelMatrix) * normal);
  vFacing = abs(dot(N, normalize(cameraPosition - world.xyz)));
  gl_Position = projectionMatrix * viewMatrix * world;
}
`;

const beamFragment = /* glsl */ `
uniform vec3 uColor;
uniform float uGlow;
varying float vAlong;
varying float vFacing;
${HEARTBEAT}
void main() {
  float phase = fract(uTime / ${BEAT.toFixed(2)});
  float travel = exp(-pow((vAlong - phase * 1.3) * 9.0, 2.0));
  float tip = pow(1.0 - vAlong, 1.4);
  float soft = uGlow > 0.5 ? pow(vFacing, 3.0) : 1.0;
  float a = (0.25 + beat(phase) * 0.9 + travel * 1.2) * tip * soft * (uGlow > 0.5 ? 0.35 : 1.0);
  gl_FragColor = vec4(uColor * a, 1.0);
}
`;

const waveVertex = /* glsl */ `
varying vec3 vDir;
varying float vFacing;
void main() {
  vDir = normalize(position);
  vec4 world = modelMatrix * vec4(position, 1.0);
  vFacing = dot(normalize(mat3(modelMatrix) * position), normalize(cameraPosition - world.xyz));
  gl_Position = projectionMatrix * viewMatrix * world;
}
`;

const waveFragment = /* glsl */ `
uniform vec3 uColor;
uniform vec3 uOrigin;
varying vec3 vDir;
varying float vFacing;
${HEARTBEAT}
void main() {
  float phase = fract(uTime / ${BEAT.toFixed(2)});
  float d = acos(clamp(dot(vDir, uOrigin), -1.0, 1.0));
  float r = phase * 0.9;
  float ring = exp(-pow((d - r) * 30.0, 2.0)) * (1.0 - phase);
  float core = exp(-d * 18.0) * (0.4 + beat(phase));
  gl_FragColor = vec4(uColor * (ring * 0.7 + core) * step(0.0, vFacing), 1.0);
}
`;

export function Signal() {
  const position = PLANET_POSITIONS.signal;
  const { radius, spin } = LAYOUT.signal;
  const lightDir = useMemo(() => position.clone().negate().normalize(), [position]);
  const focus = useFocus(position, 5);

  const { origin, quaternion, core, glow, wave } = useMemo(() => {
    const origin = new THREE.Vector3(0.45, 1, 0.3).normalize();
    const quaternion = new THREE.Quaternion().setFromUnitVectors(new THREE.Vector3(0, 1, 0), origin);
    const time = { value: 0 };
    const color = { value: new THREE.Color(COLOR) };
    const core = { uTime: time, uColor: color, uGlow: { value: 0 } };
    const glow = { uTime: time, uColor: color, uGlow: { value: 1 } };
    const wave = { uTime: time, uColor: color, uOrigin: { value: origin } };
    return { origin, quaternion, core, glow, wave };
  }, []);

  const beamGeometry = useMemo(() => {
    const make = (r: number) => new THREE.CylinderGeometry(r, r, BEAM_LENGTH, 16, 1, true).translate(0, BEAM_LENGTH / 2, 0);
    return { core: make(0.007), glow: make(0.06) };
  }, []);

  useFrame((_, dt) => {
    core.uTime.value += dt;
  });

  const additive = { transparent: true, depthWrite: false, blending: THREE.AdditiveBlending } as const;

  return (
    <group position={position}>
      <group ref={focus.group} {...focus.handlers}>
        <PlanetBody
          radius={radius}
          palette={PALETTE}
          rim="#dce6ff"
          lightDir={lightDir}
          noiseScale={1.6}
          bands={0.35}
          spin={spin}
          atmosphere={0.8}
        />
        <mesh scale={1.004}>
          <sphereGeometry args={[radius, 96, 96]} />
          <shaderMaterial vertexShader={waveVertex} fragmentShader={waveFragment} uniforms={wave} {...additive} />
        </mesh>
        <group position={origin.clone().multiplyScalar(radius)} quaternion={quaternion}>
          <mesh geometry={beamGeometry.core}>
            <shaderMaterial vertexShader={beamVertex} fragmentShader={beamFragment} uniforms={core} {...additive} />
          </mesh>
          <mesh geometry={beamGeometry.glow}>
            <shaderMaterial
              vertexShader={beamVertex}
              fragmentShader={beamFragment}
              uniforms={glow}
              side={THREE.DoubleSide}
              {...additive}
            />
          </mesh>
        </group>
        <Beacon color={COLOR} focus={focus.state} />
      </group>
    </group>
  );
}
