// src/components/scenes/Skydome.tsx
import React, { useEffect } from "react";
import { useLoader } from "@react-three/fiber";
import * as THREE from "three";
import { TextureLoader } from "three";

const Skydome = () => {
  const spaceTexture = useLoader(TextureLoader, "/textures/skybox_large.jpg");

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
