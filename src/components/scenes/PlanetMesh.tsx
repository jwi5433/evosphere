import React from 'react';
import { useLoader } from '@react-three/fiber';
import { TextureLoader, Vector3 } from 'three';

interface PlanetMeshProps {
  position?: Vector3;
  radius?: number;
  texturePath?: string;
}

export const PlanetMesh: React.FC<PlanetMeshProps> = ({
  position = new Vector3(0, 0, 0),
  radius = 2,
  texturePath = "/textures/terrain/rocky_grass/rocky_diff.jpg"
}) => {
  // Load texture for the planet
  const diffuseMap = useLoader(TextureLoader, texturePath);
  
  return (
    <mesh position={position}>
      <sphereGeometry args={[radius, 32, 32]} />
      <meshStandardMaterial map={diffuseMap} />
    </mesh>
  );
}; 