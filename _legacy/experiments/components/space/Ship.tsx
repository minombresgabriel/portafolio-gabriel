"use client";

import { useMemo } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

/** Writes the ship position at time `t` into `out` and returns its opacity. */
export type ShipPath = (t: number, out: THREE.Vector3) => number;

const TRAIL_POINTS = 28;

const trailVertex = /* glsl */ `
attribute float aAlpha;
varying float vAlpha;
void main() {
  vAlpha = aAlpha;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
`;

const trailFragment = /* glsl */ `
uniform vec3 uColor;
varying float vAlpha;
void main() {
  gl_FragColor = vec4(uColor * vAlpha, 1.0);
}
`;

const headVertex = /* glsl */ `
uniform float uSize;
attribute float aAlpha;
varying float vAlpha;
void main() {
  vAlpha = aAlpha;
  vec4 mv = modelViewMatrix * vec4(position, 1.0);
  gl_PointSize = uSize * (8.0 / -mv.z);
  gl_Position = projectionMatrix * mv;
}
`;

const headFragment = /* glsl */ `
uniform vec3 uColor;
varying float vAlpha;
void main() {
  float d = length(gl_PointCoord - 0.5) * 2.0;
  float a = pow(max(1.0 - d, 0.0), 3.0);
  gl_FragColor = vec4(uColor * a * vAlpha * 3.0, 1.0);
}
`;

/** A tiny ship of light: a bright head and a fading trail along `path`. */
export function Ship({
  path,
  color = "#ffffff",
  trail = 0.6,
  size = 14,
}: {
  path: ShipPath;
  color?: string;
  trail?: number;
  size?: number;
}) {
  const dpr = useThree((s) => s.viewport.dpr);
  const { trailGeometry, headGeometry, trailLine, headUniforms } = useMemo(() => {
    const trailGeometry = new THREE.BufferGeometry();
    trailGeometry.setAttribute("position", new THREE.BufferAttribute(new Float32Array(TRAIL_POINTS * 3), 3));
    trailGeometry.setAttribute("aAlpha", new THREE.BufferAttribute(new Float32Array(TRAIL_POINTS), 1));
    const headGeometry = new THREE.BufferGeometry();
    headGeometry.setAttribute("position", new THREE.BufferAttribute(new Float32Array(3), 3));
    headGeometry.setAttribute("aAlpha", new THREE.BufferAttribute(new Float32Array(1), 1));
    const c = new THREE.Color(color);
    // A THREE.Line primitive: <line> in JSX would collide with the SVG element.
    const trailLine = new THREE.Line(
      trailGeometry,
      new THREE.ShaderMaterial({
        vertexShader: trailVertex,
        fragmentShader: trailFragment,
        uniforms: { uColor: { value: c } },
        transparent: true,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
      }),
    );
    return {
      trailGeometry,
      headGeometry,
      trailLine,
      headUniforms: { uColor: { value: c }, uSize: { value: size * dpr } },
    };
  }, [color, size, dpr]);

  const tmp = useMemo(() => new THREE.Vector3(), []);

  useFrame(({ clock }) => {
    const t = clock.elapsedTime;
    const pos = trailGeometry.attributes.position as THREE.BufferAttribute;
    const alpha = trailGeometry.attributes.aAlpha as THREE.BufferAttribute;
    for (let i = 0; i < TRAIL_POINTS; i++) {
      const a = path(t - (i / (TRAIL_POINTS - 1)) * trail, tmp);
      pos.setXYZ(i, tmp.x, tmp.y, tmp.z);
      alpha.setX(i, a * Math.pow(1 - i / (TRAIL_POINTS - 1), 1.6) * 0.9);
    }
    pos.needsUpdate = true;
    alpha.needsUpdate = true;
    trailGeometry.computeBoundingSphere();

    const headAlpha = path(t, tmp);
    (headGeometry.attributes.position as THREE.BufferAttribute).setXYZ(0, tmp.x, tmp.y, tmp.z);
    (headGeometry.attributes.aAlpha as THREE.BufferAttribute).setX(0, headAlpha);
    headGeometry.attributes.position.needsUpdate = true;
    headGeometry.attributes.aAlpha.needsUpdate = true;
    headGeometry.computeBoundingSphere();
  });

  return (
    <group>
      <primitive object={trailLine} />
      <points geometry={headGeometry}>
        <shaderMaterial
          vertexShader={headVertex}
          fragmentShader={headFragment}
          uniforms={headUniforms}
          transparent
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </points>
    </group>
  );
}
