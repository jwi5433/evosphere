"use client";

import React, { useRef, useState, useEffect, useCallback } from "react";
import { Canvas, useFrame, useLoader } from "@react-three/fiber";
import { TrackballControls } from "@react-three/drei";
import { TextureLoader, Group } from "three";

const AutoRotatingPlanet: React.FC<{
  idle: boolean;
  children: React.ReactNode;
}> = ({ idle, children }) => {
  const groupRef = useRef<Group>(null);

  useFrame(() => {
    if (idle && groupRef.current) {
      groupRef.current.rotation.y += 0.001;
    }
  });

  return <group ref={groupRef}>{children}</group>;
};

const EvoSphereScene: React.FC = () => {
  const [idle, setIdle] = useState(false);
  const idleTimer = useRef<NodeJS.Timeout | null>(null);

  const resetIdleTimer = useCallback(() => {
    if (idleTimer.current) clearTimeout(idleTimer.current);
    setIdle(false);
    idleTimer.current = setTimeout(() => setIdle(true), 10000);
  }, []);
  useEffect(() => {
    resetIdleTimer();

    const events = ["mousemove", "mousedown", "wheel", "touchstart"];
    const reset = () => resetIdleTimer();

    events.forEach((event) => window.addEventListener(event, reset));
    return () => {
      events.forEach((event) => window.removeEventListener(event, reset));
      if (idleTimer.current) clearTimeout(idleTimer.current);
    };
  }, [resetIdleTimer]);

  const diffuseMap = useLoader(
    TextureLoader,
    "/textures/terrain/rocky_grass/rocky_diff.jpg",
  );
  const normalMap = useLoader(
    TextureLoader,
    "/textures/terrain/rocky_grass/rocky_nor.png",
  );
  const roughnessMap = useLoader(
    TextureLoader,
    "/textures/terrain/rocky_grass/rocky_rough.png",
  );
  // @ts-ignore
  // @ts-ignore
  return (
    <div style={{ height: "100vh", width: "100%", background: "#27272a" }}>
      <Canvas
        camera={{
          position: [0, 0, 7],
          fov: 60,
        }}
        shadows
      >
        <ambientLight intensity={0.5} />
        <directionalLight
          position={[5, 5, 5]}
          intensity={1.0}
          castShadow={true}
        />
        <TrackballControls
          rotateSpeed={1}
          zoomSpeed={0.5}
          panSpeed={0.3}
          staticMoving={false}
          dynamicDampingFactor={0.12}
        />

        <AutoRotatingPlanet idle={idle}>
          <mesh position={[0, 0, 0]} receiveShadow={true}>
            <sphereGeometry args={[2, 32, 32]} />
            <meshStandardMaterial
              map={diffuseMap}
              normalMap={normalMap}
              roughnessMap={roughnessMap}
            />
          </mesh>
        </AutoRotatingPlanet>
      </Canvas>
    </div>
  );
};
export default EvoSphereScene;
