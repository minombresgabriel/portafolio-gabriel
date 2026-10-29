"use client";

import { useState } from "react";
import { Canvas } from "@react-three/fiber";
import { PerformanceMonitor } from "@react-three/drei";
import { Bloom, EffectComposer, Noise, ToneMapping, Vignette } from "@react-three/postprocessing";
import { BlendFunction, ToneMappingMode } from "postprocessing";
import { CameraRig } from "./CameraRig";
import { Environment } from "./Environment";
import { Engine } from "./planets/Engine";
import { Shield } from "./planets/Shield";
import { Crystal } from "./planets/Crystal";
import { Station } from "./planets/Station";
import { Signal } from "./planets/Signal";
import { useSpace } from "@/lib/store";
import { CAMERA_STOPS } from "@/lib/world";

export default function Scene() {
  const [dpr, setDpr] = useState(1.5);
  const setSceneReady = useSpace((s) => s.setSceneReady);
  const start = CAMERA_STOPS[useSpace.getState().stop].position;

  return (
    <Canvas
      flat
      dpr={dpr}
      camera={{ fov: 35, near: 0.1, far: 3000, position: start.toArray() }}
      gl={{ antialias: false, powerPreference: "high-performance", alpha: false, stencil: false }}
      onCreated={({ gl }) => {
        gl.setClearColor("#000000");
        setSceneReady();
      }}
      aria-hidden
    >
      <PerformanceMonitor
        bounds={() => [50, 58]}
        onIncline={() => setDpr((d) => Math.min(d + 0.25, 1.75))}
        onDecline={() => setDpr((d) => Math.max(d - 0.25, 1))}
      />
      <CameraRig />
      <Environment />
      <Engine />
      <Shield />
      <Crystal />
      <Station />
      <Signal />
      <EffectComposer multisampling={0}>
        <Bloom mipmapBlur intensity={1.05} luminanceThreshold={0.32} luminanceSmoothing={0.35} radius={0.75} />
        <ToneMapping mode={ToneMappingMode.ACES_FILMIC} />
        <Vignette offset={0.32} darkness={0.75} />
        <Noise premultiply blendFunction={BlendFunction.SCREEN} opacity={0.32} />
      </EffectComposer>
    </Canvas>
  );
}
