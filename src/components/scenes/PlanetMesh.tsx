import React from "react";
import { useLoader } from "@react-three/fiber";
import { TextureLoader, Vector3 } from "three";

interface PlanetMeshProps {
  position?: Vector3;
  radius?: number;
  texturePath?: string;
  scale?: number | [number, number, number] | Vector3;
}

export const PlanetMesh: React.FC<PlanetMeshProps> = ({
  position = new Vector3(0, 0, 0),
  radius = 2,
  texturePath = "/textures/terrain/rocky_grass/rocky_diff.jpg",
  scale = 1,
}) => {
  const diffuseMap = useLoader(TextureLoader, texturePath);

  return (
    <mesh position={position} scale={scale}>
      <sphereGeometry args={[radius, 32, 32]} />
      <meshStandardMaterial map={diffuseMap} />
    </mesh>
  );
};
