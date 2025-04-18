// src/components/scenes/Skydome.tsx
import React, { useEffect } from "react";
import { useLoader } from "@react-three/fiber";
import { RGBELoader } from "three-stdlib";
import * as THREE from "three";

const Skydome = () => {
  const spaceTexture = useLoader(RGBELoader, "/textures/skybox.hdr");

  useEffect(() => {
    if (spaceTexture) {
      spaceTexture.mapping = THREE.EquirectangularReflectionMapping;
    }
  }, [spaceTexture]);

  return (
    <mesh scale={-1}>
      <sphereGeometry args={[900, 64, 64]} />
      <meshBasicMaterial
        map={spaceTexture}
        side={THREE.BackSide}
        depthWrite={false}
        fog={false}
      />
    </mesh>
  );
};

export default Skydome;
