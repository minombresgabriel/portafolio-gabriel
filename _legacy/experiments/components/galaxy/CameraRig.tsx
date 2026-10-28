"use client";

import { useEffect, useMemo, useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import gsap from "gsap";
import { useSpace } from "@/lib/store";
import { CAMERA_STOPS, GALAXY_SPIN } from "@/lib/galaxy";
import { CONTACT_STOP } from "@/data/portfolio";

const LAST = CAMERA_STOPS.length - 1;
const UP = new THREE.Vector3(0, 1, 0);

const travelDuration = (from: number, to: number) => {
  const hops = Math.abs(to - from);
  const base = Math.min(1.4 + (hops - 1) * 0.3, 2.8);
  // Diving in from the wide view, or pulling back out, deserves more time.
  const wide = (s: number) => s === 0 || s === CONTACT_STOP;
  return wide(from) || wide(to) ? base + 0.9 : base;
};

/**
 * Flies the camera along one smooth spline through every stop. Stops are
 * defined in galaxy space and rotated with the galaxy, so a cluster stays
 * framed while the galaxy turns.
 */
export function CameraRig() {
  const camera = useThree((s) => s.camera as THREE.PerspectiveCamera);
  const size = useThree((s) => s.size);

  const { positions, targets } = useMemo(
    () => ({
      positions: new THREE.CatmullRomCurve3(CAMERA_STOPS.map((s) => s.position), false, "centripetal"),
      targets: new THREE.CatmullRomCurve3(CAMERA_STOPS.map((s) => s.target), false, "centripetal"),
    }),
    [],
  );

  const initial = useSpace.getState();
  const state = useRef({
    p: initial.stop,
    dolly: initial.introDone ? 0 : 1,
    framing: CAMERA_STOPS[initial.stop].framing,
    direction: 1,
    parallax: new THREE.Vector2(),
  });
  const tmp = useMemo(() => ({ pos: new THREE.Vector3(), target: new THREE.Vector3(), back: new THREE.Vector3() }), []);

  useEffect(() => {
    let tween: gsap.core.Tween | null = null;
    const unsubStop = useSpace.subscribe((s, prev) => {
      if (s.stop === prev.stop) return;
      const from = Math.round(state.current.p);
      state.current.direction = s.stop > state.current.p ? 1 : -1;
      tween?.kill();
      tween = gsap.to(state.current, {
        p: s.stop,
        duration: travelDuration(from, s.stop),
        ease: "power3.inOut",
        onComplete: () => useSpace.getState().setArrived(s.stop),
      });
    });
    const unsubIntro = useSpace.subscribe((s, prev) => {
      if (s.introDone && !prev.introDone) {
        gsap.to(state.current, { dolly: 0, duration: 4.5, ease: "power2.out" });
      }
    });
    return () => {
      tween?.kill();
      unsubStop();
      unsubIntro();
    };
  }, []);

  useFrame(({ pointer, clock }, dt) => {
    const s = state.current;
    const u = THREE.MathUtils.clamp(s.p / LAST, 0, 1);
    positions.getPoint(u, tmp.pos);
    targets.getPoint(u, tmp.target);

    // Intro: start far above the forming galaxy and glide down into place.
    tmp.back.copy(tmp.pos).sub(tmp.target).normalize();
    tmp.pos.addScaledVector(tmp.back, s.dolly * 70);

    const angle = clock.elapsedTime * GALAXY_SPIN;
    tmp.pos.applyAxisAngle(UP, angle);
    tmp.target.applyAxisAngle(UP, angle);

    s.parallax.x = THREE.MathUtils.damp(s.parallax.x, pointer.x, 1.5, dt);
    s.parallax.y = THREE.MathUtils.damp(s.parallax.y, pointer.y, 1.5, dt);
    const sway = tmp.pos.distanceTo(tmp.target) * 0.02;
    camera.position.copy(tmp.pos);
    camera.lookAt(tmp.target);
    camera.translateX(s.parallax.x * sway);
    camera.translateY(s.parallax.y * sway * 0.6);
    camera.lookAt(tmp.target);

    // Slight roll mid-flight, eased in and out of each hop.
    const frac = s.p - Math.floor(s.p);
    camera.rotateZ(Math.sin(frac * Math.PI) * 0.06 * s.direction);

    // Screen-space framing: shift the projection so the subject sits left or
    // right of centre without moving the camera.
    const near = CAMERA_STOPS[Math.round(s.p)];
    s.framing = THREE.MathUtils.damp(s.framing, size.width < 900 ? 0 : near.framing, 3, dt);
    camera.setViewOffset(size.width, size.height, -s.framing * size.width, 0, size.width, size.height);
  });

  return null;
}
