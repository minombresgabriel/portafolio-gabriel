"use client";

import { useEffect, useMemo, useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import gsap from "gsap";
import { useSpace } from "@/lib/store";
import { CAMERA_STOPS } from "@/lib/world";
import { CONTACT_STOP } from "@/data/portfolio";

/** Shared, mutable camera state read by other scene parts (e.g. speed lines). */
export const rig = { speed: 0 };

const LAST = CAMERA_STOPS.length - 1;

const travelDuration = (from: number, to: number) => {
  const hops = Math.abs(to - from);
  const base = Math.min(1.2 + (hops - 1) * 0.3, 2.6);
  // The pull-back to reveal the whole system deserves more time.
  return from === CONTACT_STOP || to === CONTACT_STOP ? base + 1 : base;
};

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
  const tmp = useMemo(
    () => ({ pos: new THREE.Vector3(), target: new THREE.Vector3(), back: new THREE.Vector3(), last: new THREE.Vector3() }),
    [],
  );

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
        gsap.to(state.current, { dolly: 0, duration: 2.6, ease: "power3.out" });
      }
    });
    return () => {
      tween?.kill();
      unsubStop();
      unsubIntro();
    };
  }, []);

  useFrame(({ pointer }, dt) => {
    const s = state.current;
    const { caseOpen } = useSpace.getState();
    const u = THREE.MathUtils.clamp(s.p / LAST, 0, 1);
    positions.getPoint(u, tmp.pos);
    targets.getPoint(u, tmp.target);

    // Intro dolly: start further back along the view axis and glide in.
    tmp.back.copy(tmp.pos).sub(tmp.target).normalize();
    tmp.pos.addScaledVector(tmp.back, s.dolly * 9);

    // Gentle pointer parallax, stronger when resting.
    s.parallax.x = THREE.MathUtils.damp(s.parallax.x, pointer.x, 2, dt);
    s.parallax.y = THREE.MathUtils.damp(s.parallax.y, pointer.y, 2, dt);
    camera.position.copy(tmp.pos);
    camera.lookAt(tmp.target);
    camera.translateX(s.parallax.x * 0.18);
    camera.translateY(s.parallax.y * 0.12);
    camera.lookAt(tmp.target);

    // Slight roll mid-flight, eased in and out of each hop.
    const frac = s.p - Math.floor(s.p);
    camera.rotateZ(Math.sin(frac * Math.PI) * 0.07 * s.direction);

    // Screen-space framing: shift the projection so the subject sits left or
    // right of centre without moving the camera.
    const near = CAMERA_STOPS[Math.round(s.p)];
    const goal = caseOpen ? near.caseFraming : near.framing;
    s.framing = THREE.MathUtils.damp(s.framing, size.width < 900 ? 0 : goal, 3, dt);
    camera.setViewOffset(size.width, size.height, -s.framing * size.width, 0, size.width, size.height);

    const speed = dt > 0 && tmp.last.lengthSq() > 0 ? tmp.last.distanceTo(camera.position) / dt : 0;
    tmp.last.copy(camera.position);
    rig.speed = THREE.MathUtils.damp(rig.speed, Math.min(speed / 45, 1), 4, dt);
  });

  return null;
}
