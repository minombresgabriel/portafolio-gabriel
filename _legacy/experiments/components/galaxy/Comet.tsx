"use client";

import { useEffect, useMemo, useRef } from "react";
import { useThree } from "@react-three/fiber";
import * as THREE from "three";
import { useSpace } from "@/lib/store";
import { COMET_FROM, COMET_TO } from "@/lib/galaxy";
import { Ship, type ShipPath } from "./Ship";

const FLIGHT = 2.2;

/** Every sent message crosses the galaxy as a comet and lands in its core. */
export function Comet() {
  const launches = useSpace((s) => s.messageLaunches);
  const launchedAt = useRef<number | null>(null);
  const clock = useThree((s) => s.clock);

  useEffect(() => {
    if (launches > 0) launchedAt.current = clock.elapsedTime;
  }, [launches, clock]);

  const path = useMemo<ShipPath>(() => {
    const control = COMET_FROM.clone().lerp(COMET_TO, 0.5).add(new THREE.Vector3(10, 22, 0));
    const curve = new THREE.QuadraticBezierCurve3(COMET_FROM, control, COMET_TO);
    return (t, out) => {
      if (launchedAt.current === null) return 0;
      const u = (t - launchedAt.current) / FLIGHT;
      curve.getPoint(THREE.MathUtils.clamp(u, 0, 1), out);
      return u < 0 || u > 1 ? 0 : THREE.MathUtils.smoothstep(u, 0, 0.08) * (1 - THREE.MathUtils.smoothstep(u, 0.85, 1));
    };
  }, []);

  return <Ship path={path} color="#fff6e8" trail={0.7} size={900} />;
}
