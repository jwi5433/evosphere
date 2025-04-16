"use client";

import React from "react";
import dynamic from "next/dynamic";

const EvoSphereScene = dynamic(
  () => import("@/components/EvoSphereScene"), // Path to your actual scene component
  {
    ssr: false,
    loading: () => (
      <div
        style={{
          height: "100vh",
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#27272a",
          color: "white",
        }}
      >
        Loading Scene Code...
      </div>
    ),
  },
);
export default function DynamicEvoSphere() {
  return <EvoSphereScene />;
}
