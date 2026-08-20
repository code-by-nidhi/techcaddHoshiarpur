"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { MeshReflectorMaterial } from "@react-three/drei";
import { AdditiveBlending, type Group, type Mesh, type MeshBasicMaterial } from "three";

/**
 * The neon stage: a reflective glass floor, a raised disc, concentric rings,
 * and light trails that run around the robot. Rings are circular and spin
 * around Y, so they read as travelling light rather than wobbling ellipses.
 */

const RINGS = [
  { r: 1.5, color: "#3b82f6", w: 0.022, o: 0.95 },
  { r: 1.78, color: "#60a5fa", w: 0.012, o: 0.6 },
  { r: 2.15, color: "#3b82f6", w: 0.014, o: 0.55 },
  { r: 2.55, color: "#60a5fa", w: 0.01, o: 0.35 },
];

const TRAILS = [
  { r: 1.94, color: "#93c5fd", speed: 0.5, arc: 1.1, y: 0.035 },
  { r: 2.32, color: "#38bdf8", speed: -0.32, arc: 0.7, y: 0.05 },
  { r: 1.66, color: "#22d3ee", speed: 0.72, arc: 0.45, y: 0.02 },
];

function PulseWave() {
  const mesh = useRef<Mesh>(null);
  useFrame(({ clock }) => {
    const m = mesh.current;
    if (!m) return;
    const p = (clock.elapsedTime % 4) / 4;
    const s = 1.1 + p * 1.9;
    m.scale.set(s, s, s);
    (m.material as MeshBasicMaterial).opacity = (1 - p) * 0.4;
  });
  return (
    <mesh ref={mesh} rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.03, 0]}>
      <ringGeometry args={[0.97, 1, 96]} />
      <meshBasicMaterial
        color="#93c5fd"
        transparent
        blending={AdditiveBlending}
        depthWrite={false}
        toneMapped={false}
      />
    </mesh>
  );
}

export default function Platform3D() {
  const trails = useRef<Group>(null);

  useFrame((_, delta) => {
    trails.current?.children.forEach((c, i) => {
      c.rotation.z += delta * TRAILS[i].speed;
    });
  });

  return (
    <group>
      {/* glass floor */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.001, 0]} receiveShadow>
        <circleGeometry args={[7, 64]} />
        <MeshReflectorMaterial
          resolution={512}
          blur={[300, 90]}
          mixBlur={1}
          mixStrength={26}
          mirror={0.5}
          depthScale={1.1}
          minDepthThreshold={0.4}
          maxDepthThreshold={1.35}
          color="#070c1c"
          metalness={0.75}
          roughness={0.85}
        />
      </mesh>

      {/* raised podium */}
      <mesh position={[0, 0.008, 0]} receiveShadow>
        <cylinderGeometry args={[1.62, 1.7, 0.11, 72]} />
        <meshStandardMaterial
          color="#0a1024"
          metalness={0.85}
          roughness={0.28}
          envMapIntensity={0.8}
        />
      </mesh>
      <mesh position={[0, 0.066, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[1.5, 1.62, 96]} />
        <meshBasicMaterial
          color="#2563eb"
          transparent
          opacity={0.5}
          blending={AdditiveBlending}
          depthWrite={false}
          toneMapped={false}
        />
      </mesh>

      {/* concentric rings */}
      {RINGS.map((r) => (
        <mesh key={r.r} rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.07, 0]}>
          <ringGeometry args={[r.r - r.w, r.r, 128]} />
          <meshBasicMaterial
            color={r.color}
            transparent
            opacity={r.o}
            blending={AdditiveBlending}
            depthWrite={false}
            toneMapped={false}
          />
        </mesh>
      ))}

      {/* travelling light trails */}
      <group ref={trails}>
        {TRAILS.map((t) => (
          <mesh
            key={t.r}
            rotation={[-Math.PI / 2, 0, 0]}
            position={[0, t.y + 0.07, 0]}
          >
            <ringGeometry args={[t.r - 0.012, t.r + 0.012, 128, 1, 0, t.arc]} />
            <meshBasicMaterial
              color={t.color}
              transparent
              opacity={0.9}
              blending={AdditiveBlending}
              depthWrite={false}
              side={2}
              toneMapped={false}
            />
          </mesh>
        ))}
      </group>

      <PulseWave />

      {/* glow pooling on the floor */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.012, 0]}>
        <circleGeometry args={[3.4, 64]} />
        <meshBasicMaterial
          color="#1d4ed8"
          transparent
          opacity={0.2}
          blending={AdditiveBlending}
          depthWrite={false}
          toneMapped={false}
        />
      </mesh>

      <pointLight position={[0, 0.4, 0]} intensity={10} distance={5} color="#3b82f6" />
    </group>
  );
}
