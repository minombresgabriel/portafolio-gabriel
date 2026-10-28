"use client";

import { useMemo, useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { mergeVertices } from "three/examples/jsm/utils/BufferGeometryUtils.js";
import { Atmosphere, Beacon, useFocus } from "../PlanetBody";
import { Ship, type ShipPath } from "../Ship";
import { CAMERA_STOPS, LAYOUT, PLANET_POSITIONS } from "@/lib/world";

const COLOR = "#a98cff";
const PERIOD = 8;
const ARRIVE = 3.6; // seconds for the ships to reach the crystal
const START = 7.5;
const SPARKS = 48;

const crystalVertex = /* glsl */ `
varying vec3 vNormalW;
varying vec3 vPosW;
varying vec3 vNormalL;
void main() {
  vNormalL = normal;
  vec4 world = modelMatrix * vec4(position, 1.0);
  vPosW = world.xyz;
  vNormalW = normalize(mat3(modelMatrix) * normal);
  gl_Position = projectionMatrix * viewMatrix * world;
}
`;

const crystalFragment = /* glsl */ `
uniform vec3 uLightDir;
uniform float uTime;
uniform vec3 uImpact;
uniform float uFlash;
varying vec3 vNormalW;
varying vec3 vPosW;
varying vec3 vNormalL;
float hash(vec3 p) { return fract(sin(dot(p, vec3(12.9898, 78.233, 37.719))) * 43758.5453); }
void main() {
  vec3 N = normalize(vNormalW);
  vec3 V = normalize(cameraPosition - vPosW);
  vec3 L = normalize(uLightDir);
  float facet = hash(floor(vNormalL * 40.0));

  vec3 deep = vec3(0.025, 0.012, 0.07);
  vec3 body = mix(deep, vec3(0.2, 0.12, 0.55), facet * 0.7);
  float diff = max(dot(N, L), 0.0);
  float spec = pow(max(dot(reflect(-L, N), V), 0.0), 28.0);
  float fres = pow(1.0 - max(dot(N, V), 0.0), 2.4);
  float inner = (0.5 + 0.5 * sin(uTime * 0.5 + facet * 6.283)) * (0.08 + 0.2 * facet);

  vec3 c = body * (0.12 + diff * 1.2);
  c += vec3(0.85, 0.78, 1.0) * spec * 1.6;
  c += vec3(0.45, 0.32, 1.0) * fres * 0.85;
  c += vec3(0.5, 0.36, 1.0) * inner;
  float hit = exp(-acos(clamp(dot(normalize(vNormalL), uImpact), -1.0, 1.0)) * 3.5);
  c += vec3(0.8, 0.7, 1.0) * hit * uFlash * 1.8;
  gl_FragColor = vec4(c, 1.0);
}
`;

const edgeFragment = /* glsl */ `
uniform float uFlash;
void main() {
  gl_FragColor = vec4(vec3(0.42, 0.3, 0.95) * (0.32 + uFlash * 0.5), 1.0);
}
`;

const sparkVertex = /* glsl */ `
uniform float uAge;
uniform vec3 uOrigin;
uniform float uSize;
attribute vec3 aDir;
varying float vAlpha;
void main() {
  float age = max(uAge, 0.0);
  vec3 p = uOrigin + aDir * age * 0.55 * (1.0 - age * 0.25);
  vAlpha = uAge < 0.0 ? 0.0 : max(1.0 - age / 1.3, 0.0);
  vec4 mv = modelViewMatrix * vec4(p, 1.0);
  gl_PointSize = uSize * (6.0 / -mv.z);
  gl_Position = projectionMatrix * mv;
}
`;

const sparkFragment = /* glsl */ `
varying float vAlpha;
void main() {
  float d = length(gl_PointCoord - 0.5) * 2.0;
  gl_FragColor = vec4(vec3(0.75, 0.65, 1.0) * pow(max(1.0 - d, 0.0), 2.0) * vAlpha * 1.6, 1.0);
}
`;

/** An irregular faceted gem: a jittered icosphere with flat normals. */
function gemGeometry(radius: number) {
  const ico = new THREE.IcosahedronGeometry(radius, 1);
  ico.deleteAttribute("normal");
  ico.deleteAttribute("uv");
  const g = mergeVertices(ico);
  const pos = g.attributes.position;
  const v = new THREE.Vector3();
  for (let i = 0; i < pos.count; i++) {
    v.fromBufferAttribute(pos, i);
    const jitter = 0.9 + ((Math.sin(i * 91.7) * 43758.5453) % 1 + 1) % 1 * 0.2;
    v.multiplyScalar(jitter);
    pos.setXYZ(i, v.x, v.y, v.z);
  }
  const flat = g.toNonIndexed();
  flat.computeVertexNormals();
  return flat;
}

const easeInOut = (x: number) => (x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2);

export function Crystal() {
  const position = PLANET_POSITIONS.crystal;
  const { radius, spin } = LAYOUT.crystal;
  const lightDir = useMemo(() => position.clone().negate().normalize(), [position]);
  const focus = useFocus(position, 3);
  const gem = useRef<THREE.Group>(null);
  const dpr = useThree((s) => s.viewport.dpr);

  const { geometry, edges, uniforms, sparkUniforms, sparks, entering, dissolving, approach } = useMemo(() => {
    const geometry = gemGeometry(radius);
    const edges = new THREE.EdgesGeometry(geometry, 1);
    const uniforms = {
      uLightDir: { value: lightDir },
      uTime: { value: 0 },
      uImpact: { value: new THREE.Vector3(1, 0, 0) },
      uFlash: { value: 0 },
    };

    // Both ships come in side by side from the camera's left.
    const toCamera = CAMERA_STOPS[3].position.clone().sub(position).normalize();
    const side = new THREE.Vector3().crossVectors(toCamera, new THREE.Vector3(0, 1, 0)).normalize();
    const approach = toCamera.clone().multiplyScalar(0.55).addScaledVector(side, 0.8).setY(0.25).normalize();
    const lane = new THREE.Vector3().crossVectors(approach, new THREE.Vector3(0, 1, 0)).normalize();

    const distanceAt = (t: number) => START + (radius * 0.85 - START) * easeInOut(Math.min(t / ARRIVE, 1));
    // Invert distanceAt by bisection (only at setup).
    const timeAtDistance = (target: number) => {
      let lo = 0;
      let hi = ARRIVE;
      for (let i = 0; i < 24; i++) {
        const mid = (lo + hi) / 2;
        if (distanceAt(mid) > target) lo = mid;
        else hi = mid;
      }
      return hi;
    };
    const makePath = (laneOffset: number, stopAt: number): ShipPath => {
      const endsAt = stopAt > 0 ? timeAtDistance(stopAt) : timeAtDistance(radius * 0.98);
      return (t, out) => {
        const local = ((t % PERIOD) + PERIOD) % PERIOD;
        const d = Math.max(distanceAt(local), stopAt);
        out.copy(approach).multiplyScalar(d).addScaledVector(lane, laneOffset * Math.min(1, (d - radius) / 2));
        const fadeIn = THREE.MathUtils.smoothstep(local, 0, 0.6);
        // The entering ship vanishes into the surface; the other one stalls and fades.
        if (stopAt === 0) return local < endsAt ? fadeIn : 0;
        return fadeIn * (local < endsAt ? 1 : Math.max(0, 1 - (local - endsAt) / 0.25));
      };
    };

    const dissolveRadius = radius * 1.75;
    const entering = { path: makePath(0.22, 0), hit: timeAtDistance(radius * 0.98) };
    const dissolving = {
      path: makePath(-0.22, dissolveRadius),
      at: timeAtDistance(dissolveRadius),
      origin: approach.clone().multiplyScalar(dissolveRadius).addScaledVector(lane, -0.22 * Math.min(1, (dissolveRadius - radius) / 2)),
    };

    const dirs = new Float32Array(SPARKS * 3);
    for (let i = 0; i < SPARKS; i++) {
      const d = new THREE.Vector3().randomDirection().multiplyScalar(0.4 + Math.random() * 0.8);
      dirs.set([d.x, d.y, d.z], i * 3);
    }
    const sparks = new THREE.BufferGeometry();
    sparks.setAttribute("position", new THREE.BufferAttribute(new Float32Array(SPARKS * 3), 3));
    sparks.setAttribute("aDir", new THREE.BufferAttribute(dirs, 3));
    sparks.boundingSphere = new THREE.Sphere(new THREE.Vector3(), START);
    const sparkUniforms = {
      uAge: { value: -1 },
      uOrigin: { value: dissolving.origin },
      uSize: { value: 5 * dpr },
    };
    return { geometry, edges, uniforms, sparkUniforms, sparks, entering, dissolving, approach };
  }, [position, radius, lightDir, dpr]);

  useFrame(({ clock }, dt) => {
    const local = clock.elapsedTime % PERIOD;
    uniforms.uTime.value += dt;
    const sinceHit = local - entering.hit;
    uniforms.uFlash.value = sinceHit >= 0 ? Math.exp(-sinceHit * 2.2) : 0;
    sparkUniforms.uAge.value = local - dissolving.at;
    if (gem.current) {
      gem.current.rotation.y += dt * spin;
      // Keep the impact glow where the ship actually lands while the gem spins.
      uniforms.uImpact.value.copy(approach).applyQuaternion(gem.current.quaternion.clone().invert());
    }
  });

  return (
    <group position={position}>
      <group ref={focus.group} {...focus.handlers}>
        <group ref={gem} rotation={[0.3, 0, 0.15]}>
          <mesh geometry={geometry}>
            <shaderMaterial vertexShader={crystalVertex} fragmentShader={crystalFragment} uniforms={uniforms} />
          </mesh>
          <lineSegments geometry={edges} scale={1.003}>
            <shaderMaterial
              vertexShader="void main(){gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.0);}"
              fragmentShader={edgeFragment}
              uniforms={uniforms}
              transparent
              depthWrite={false}
              blending={THREE.AdditiveBlending}
            />
          </lineSegments>
        </group>
        <Atmosphere radius={radius} color={COLOR} lightDir={lightDir} strength={0.55} scale={1.2} />
        <Ship path={entering.path} color="#e4dbff" trail={0.6} />
        <Ship path={dissolving.path} color="#e4dbff" trail={0.6} />
        <points geometry={sparks}>
          <shaderMaterial
            vertexShader={sparkVertex}
            fragmentShader={sparkFragment}
            uniforms={sparkUniforms}
            transparent
            depthWrite={false}
            blending={THREE.AdditiveBlending}
          />
        </points>
        <Beacon color={COLOR} focus={focus.state} />
      </group>
    </group>
  );
}
