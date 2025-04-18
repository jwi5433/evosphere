"use client";

import React from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { TrackballControls } from "@react-three/drei";
import { Vector3 } from "three";

import { useTrackballControls } from "./controls/useTrackballControls";
import { PlanetMesh } from "./scenes/PlanetMesh";
import { SceneLighting } from "./scenes/SceneLighting";

function Scene() {
  const targetPosition = new Vector3(0, 0, 0);

  const { controlProps, updateControls } = useTrackballControls(targetPosition);

  useFrame(() => {
    updateControls();
  });

  return (
    <>
      {/* Lighting */}
      <SceneLighting intensity={1.5} />

      {/* Controls */}
      <TrackballControls {...controlProps} />

      {/* Planet */}
      <PlanetMesh position={targetPosition} />
    </>
  );
}

const EvoSphereScene = () => {
  return (
    <div style={{ height: "100vh", width: "100%", background: "#18181b" }}>
      <Canvas
        camera={{
          position: [0, 0, 7],
          fov: 60,
        }}
        gl={{
          antialias: true,
          alpha: false,
          powerPreference: "high-performance",
        }}
        onCreated={({ gl }) => {
          gl.domElement.style.touchAction = "none";
        }}
      >
        <Scene />
      </Canvas>
    </div>
  );
};

export default EvoSphereScene;
