"use client";

import { Suspense, useRef, type ReactNode } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import {
  OrbitControls,
  Environment,
  ContactShadows,
  AdaptiveDpr,
  AdaptiveEvents,
  Preload,
} from "@react-three/drei";
import type { Group } from "three";
import RobotRig from "./RobotRig";
import Platform3D from "./Platform3D";
import HoloEffects from "./HoloEffects";
import CanvasLoader from "@/components/UI/CanvasLoader";
import { useInteractionState } from "@/hooks/useInteractionState";
import { damp } from "@/utils/math";

/**
 * Parallax rides on the stage group, not the camera: OrbitControls owns the
 * camera transform and moving both fights the damping. On screen it reads the
 * same as a camera drift.
 */
function StageRig({ children }: { children: ReactNode }) {
  const group = useRef<Group>(null);
  useFrame((state, delta) => {
    const g = group.current;
    if (!g) return;
    g.position.x = damp(g.position.x, state.pointer.x * 0.16, 2.5, delta);
    g.position.y = damp(g.position.y, -state.pointer.y * 0.09, 2.5, delta);
  });
  return <group ref={group}>{children}</group>;
}

export default function RobotCanvas() {
  const interaction = useInteractionState();

  return (
    <Canvas
      shadows
      dpr={[1, 1.75]}
      camera={{ position: [2.6, 1.7, 6.1], fov: 32, near: 0.1, far: 60 }}
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      style={{ background: "transparent" }}
    >
      {/* --------------------------- lighting --------------------------- */}
      <ambientLight intensity={0.3} />
      {/* key: bright soft white */}
      <directionalLight
        position={[4.5, 6.5, 4]}
        intensity={2.9}
        color="#ffffff"
        castShadow
        shadow-mapSize={[1024, 1024]}
        shadow-bias={-0.0004}
      />
      {/* fill: purple ambience */}
      <pointLight position={[-5, 2.4, 2.6]} intensity={22} color="#8b5cf6" />
      {/* rim: blue edge light from behind */}
      <spotLight
        position={[-2.4, 3.8, -5]}
        angle={0.75}
        penumbra={0.9}
        intensity={60}
        color="#3b82f6"
      />
      <pointLight position={[3.6, 1.4, -3]} intensity={16} color="#22d3ee" />

      <Suspense fallback={<CanvasLoader />}>
        <StageRig>
          <RobotRig interaction={interaction} />
          <HoloEffects />
          <Platform3D />
          <ContactShadows
            position={[0, 0.075, 0]}
            opacity={0.5}
            scale={7}
            blur={2.4}
            far={3}
            color="#000000"
          />
        </StageRig>

        {/* HDR reflections from the pmndrs CDN. In its own boundary, so the
            explicit lights above still carry the scene if it's blocked. */}
        <Suspense fallback={null}>
          <Environment preset="city" environmentIntensity={0.6} />
        </Suspense>

        <Preload all />
      </Suspense>

      <OrbitControls
        makeDefault
        enablePan={false}
        enableZoom
        autoRotate={false}
        zoomSpeed={0.55}
        rotateSpeed={0.8}
        minDistance={4.4}
        maxDistance={9}
        minPolarAngle={Math.PI / 5}
        maxPolarAngle={Math.PI / 2.06}
        target={[0, 0.9, 0]}
        enableDamping
        dampingFactor={0.07}
        onStart={() => {
          interaction.current.active = true;
        }}
        onEnd={() => {
          interaction.current.active = false;
          interaction.current.lastAt = performance.now();
        }}
      />

      <AdaptiveDpr pixelated />
      <AdaptiveEvents />
    </Canvas>
  );
}
