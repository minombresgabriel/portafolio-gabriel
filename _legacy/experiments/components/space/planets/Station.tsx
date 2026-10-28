"use client";

import { useLayoutEffect, useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { Beacon, useFocus } from "../PlanetBody";
import { Ship, type ShipPath } from "../Ship";
import { CAMERA_STOPS, LAYOUT, PLANET_POSITIONS } from "@/lib/world";

const COLOR = "#45e0a8";
const BAYS = 12;
const SHIPS = 4;
const PERIOD = 9;
const SPIN = 0.06;
const TILT = new THREE.Euler(1.15, 0.35, 0);

const easeOut = (x: number) => 1 - Math.pow(1 - x, 3);

export function Station() {
  const position = PLANET_POSITIONS.station;
  const { radius } = LAYOUT.station;
  const focus = useFocus(position, 4);
  const spinner = useRef<THREE.Group>(null);
  const bays = useRef<THREE.InstancedMesh>(null);

  const { bayMatrices, ships } = useMemo(() => {
    const bayMatrices = Array.from({ length: BAYS }, (_, i) => {
      const a = (i / BAYS) * Math.PI * 2;
      const m = new THREE.Matrix4().compose(
        new THREE.Vector3(Math.cos(a) * (radius + 0.09), Math.sin(a) * (radius + 0.09), 0),
        new THREE.Quaternion().setFromAxisAngle(new THREE.Vector3(0, 0, 1), a),
        new THREE.Vector3(1, 1, 1),
      );
      return m;
    });

    // Ships approach from the camera's side of the station and dock into a bay
    // that keeps rotating with the ring.
    const toCamera = CAMERA_STOPS[4].position.clone().sub(position).normalize();
    const tilt = new THREE.Quaternion().setFromEuler(TILT);
    const ships: ShipPath[] = Array.from({ length: SHIPS }, (_, k) => {
      const bay = (k * 5 + 1) % BAYS;
      const offset = (k / SHIPS) * PERIOD;
      const start = toCamera
        .clone()
        .applyAxisAngle(new THREE.Vector3(0, 1, 0), (k % 2 ? 1 : -1) * (0.9 + k * 0.25))
        .setY(0.3 * (k - 1.5))
        .normalize()
        .multiplyScalar(9);
      const dock = new THREE.Vector3();
      return (t, out) => {
        const local = (((t + offset) % PERIOD) + PERIOD) % PERIOD;
        const flight = Math.min(local / (PERIOD * 0.55), 1);
        const angle = (bay / BAYS) * Math.PI * 2 + SPIN * t;
        dock.set(Math.cos(angle) * (radius + 0.12), Math.sin(angle) * (radius + 0.12), 0).applyQuaternion(tilt);
        out.lerpVectors(start, dock, easeOut(flight));
        const fadeIn = THREE.MathUtils.smoothstep(local, 0, 0.8);
        return flight < 1 ? fadeIn * (1 - THREE.MathUtils.smoothstep(flight, 0.92, 1)) : 0;
      };
    });
    return { bayMatrices, ships };
  }, [position, radius]);

  useLayoutEffect(() => {
    const mesh = bays.current;
    if (!mesh) return;
    // Colours must exist before the first render so the shader compiles with them.
    bayMatrices.forEach((m, i) => {
      mesh.setMatrixAt(i, m);
      mesh.setColorAt(i, new THREE.Color(COLOR));
    });
    mesh.instanceMatrix.needsUpdate = true;
  }, [bayMatrices]);

  const color = useMemo(() => new THREE.Color(), []);
  const base = useMemo(() => new THREE.Color(COLOR), []);

  useFrame(({ clock }, dt) => {
    if (spinner.current) spinner.current.rotation.z += dt * SPIN;
    const mesh = bays.current;
    if (!mesh) return;
    const t = clock.elapsedTime;
    for (let i = 0; i < BAYS; i++) {
      const pulse = 0.55 + 0.45 * Math.sin(t * 1.3 + i * 1.7);
      mesh.setColorAt(i, color.copy(base).multiplyScalar(0.6 + pulse * 1.6));
    }
    if (mesh.instanceColor) mesh.instanceColor.needsUpdate = true;
  });

  const metal = (
    <meshStandardMaterial color="#26322e" metalness={0.65} roughness={0.32} />
  );

  return (
    <group position={position}>
      <group ref={focus.group} {...focus.handlers}>
        <group rotation={TILT}>
          <group ref={spinner}>
            <mesh>
              <torusGeometry args={[radius, 0.07, 24, 200]} />
              {metal}
            </mesh>
            <mesh>
              <torusGeometry args={[radius - 0.14, 0.012, 8, 200]} />
              <meshBasicMaterial color={COLOR} toneMapped={false} />
            </mesh>
            <mesh>
              <torusGeometry args={[radius + 0.2, 0.006, 8, 200]} />
              <meshBasicMaterial color={COLOR} transparent opacity={0.35} toneMapped={false} />
            </mesh>
            {[0, 1].map((i) => (
              <mesh key={i} rotation={[0, 0, (i * Math.PI) / 2]}>
                <boxGeometry args={[radius * 2 - 0.1, 0.03, 0.03]} />
                {metal}
              </mesh>
            ))}
            <instancedMesh ref={bays} args={[undefined, undefined, BAYS]}>
              <boxGeometry args={[0.12, 0.2, 0.12]} />
              <meshBasicMaterial toneMapped={false} />
            </instancedMesh>
          </group>
          <mesh>
            <sphereGeometry args={[0.32, 48, 48]} />
            {metal}
          </mesh>
          <mesh>
            <torusGeometry args={[0.42, 0.015, 8, 96]} />
            <meshBasicMaterial color={COLOR} toneMapped={false} />
          </mesh>
          <mesh>
            <sphereGeometry args={[0.12, 24, 24]} />
            <meshBasicMaterial color="#c9ffe9" toneMapped={false} />
          </mesh>
        </group>
        {ships.map((path, i) => (
          <Ship key={i} path={path} color="#cffff0" trail={0.5} size={11} />
        ))}
        <Beacon color={COLOR} focus={focus.state} />
      </group>
    </group>
  );
}
