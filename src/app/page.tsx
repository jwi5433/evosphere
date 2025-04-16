import React from "react";
import DynamicEvoSphere from "@/components/DynamicEvoSphere";

export default function Home() {
  return (
    <main>
      <React.Suspense fallback={<div>Loading EvoSphere...</div>}>
        <DynamicEvoSphere />
      </React.Suspense>
    </main>
  );
}
