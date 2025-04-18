import React from 'react';

interface SimpleLightingProps {
  intensity?: number;
}

export const SceneLighting: React.FC<SimpleLightingProps> = ({
  intensity = 1.2
}) => {
  return (
    <>
      {/* Single bright ambient light for flat lighting */}
      <ambientLight intensity={intensity} />
    </>
  );
}; 