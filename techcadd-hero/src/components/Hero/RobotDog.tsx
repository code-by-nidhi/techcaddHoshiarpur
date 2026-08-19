"use client";

import { useRef, useMemo, useImperativeHandle, forwardRef } from "react";
import { RoundedBox } from "@react-three/drei";
import { Group, MeshStandardMaterial, MeshPhysicalMaterial, Color } from "three";

/**
 * Unitree Go2 / B2-flavoured quadruped built from primitives with proper PBR
 * materials: a clearcoated white shell, machined-silver actuators, matte black
 * carbon parts, and emissive LED lenses.
 *
 * It exposes rig handles (head, front-left leg, LED materials, torso) so the
 * animation layer can drive the wake-up sequence, head tracking, and the
 * hover reactions without knowing anything about the geometry.
 */

export type RobotHandles = {
  head: Group | null;
  frontLeftLeg: Group | null;
  torso: Group | null;
  leds: (MeshStandardMaterial | MeshPhysicalMaterial)[];
};

const SILVER = { color: "#b9bfc9", metalness: 1, roughness: 0.28 } as const;
const DARK = { color: "#0e1219", metalness: 0.6, roughness: 0.55 } as const;
const RUBBER = { color: "#05070b", metalness: 0.05, roughness: 0.95 } as const;

function Shell({ children, ...props }: React.ComponentProps<typeof RoundedBox>) {
  return (
    <RoundedBox castShadow receiveShadow {...props}>
      <meshPhysicalMaterial
        color="#f4f6f9"
        metalness={0.25}
        roughness={0.28}
        clearcoat={1}
        clearcoatRoughness={0.12}
        envMapIntensity={1.1}
      />
      {children}
    </RoundedBox>
  );
}

/** One leg: hip actuator, shell-covered thigh, carbon calf, rubber foot. */
const Leg = forwardRef<Group, { x: number; z: number; front: boolean }>(
  function Leg({ x, z, front }, ref) {
    const side = z > 0 ? 1 : -1;
    return (
      <group ref={ref} position={[x, -0.1, z]}>
        {/* hip roll actuator */}
        <mesh rotation={[Math.PI / 2, 0, 0]} castShadow>
          <cylinderGeometry args={[0.15, 0.15, 0.2, 24]} />
          <meshStandardMaterial {...SILVER} />
        </mesh>
        <mesh position={[0, 0, side * 0.11]} rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[0.105, 0.105, 0.03, 24]} />
          <meshStandardMaterial {...DARK} />
        </mesh>

        <group rotation={[0, 0, front ? 0.24 : 0.3]}>
          {/* thigh: silver rod inside a white shell */}
          <mesh position={[0, -0.24, 0]} castShadow>
            <capsuleGeometry args={[0.045, 0.36, 4, 12]} />
            <meshStandardMaterial {...SILVER} />
          </mesh>
          <Shell
            args={[0.16, 0.4, 0.13]}
            radius={0.06}
            smoothness={4}
            position={[0.012, -0.23, 0]}
          />

          {/* knee */}
          <group position={[0, -0.46, 0]}>
            <mesh rotation={[Math.PI / 2, 0, 0]} castShadow>
              <cylinderGeometry args={[0.075, 0.075, 0.13, 20]} />
              <meshStandardMaterial {...SILVER} />
            </mesh>

            <group rotation={[0, 0, front ? -0.56 : -0.64]}>
              {/* carbon calf, tapered */}
              <mesh position={[0, -0.19, 0]} castShadow>
                <cylinderGeometry args={[0.024, 0.042, 0.4, 14]} />
                <meshStandardMaterial {...DARK} />
              </mesh>
              {/* rubber foot */}
              <mesh position={[0, -0.4, 0]} castShadow>
                <sphereGeometry args={[0.062, 18, 18]} />
                <meshStandardMaterial {...RUBBER} />
              </mesh>
            </group>
          </group>
        </group>
      </group>
    );
  }
);

const RobotDog = forwardRef<RobotHandles>(function RobotDog(_props, ref) {
  const head = useRef<Group>(null);
  const frontLeftLeg = useRef<Group>(null);
  const torso = useRef<Group>(null);

  /** LED materials are created once so the rig can animate them directly. */
  const leds = useMemo(() => {
    const make = (intensity: number) =>
      new MeshStandardMaterial({
        color: new Color("#dbeafe"),
        emissive: new Color("#2f6bff"),
        emissiveIntensity: intensity,
        toneMapped: false,
        metalness: 0.2,
        roughness: 0.25,
      });
    return [make(3.4), make(3.4), make(2.2), make(2.2), make(1.8)];
  }, []);

  useImperativeHandle(ref, () => ({
    head: head.current,
    frontLeftLeg: frontLeftLeg.current,
    torso: torso.current,
    leds,
  }));

  return (
    <group>
      {/* ------------------------------- torso ------------------------------ */}
      <group ref={torso}>
        <Shell args={[1.62, 0.46, 0.7]} radius={0.16} smoothness={5} />

        {/* upper deck + carry handle */}
        <Shell
          args={[1.1, 0.12, 0.5]}
          radius={0.05}
          smoothness={4}
          position={[-0.06, 0.27, 0]}
        />
        <mesh position={[-0.06, 0.36, 0]} rotation={[Math.PI / 2, 0, 0]} castShadow>
          <torusGeometry args={[0.22, 0.022, 12, 40, Math.PI]} />
          <meshStandardMaterial {...DARK} />
        </mesh>

        {/* status strip */}
        <mesh position={[0.3, 0.33, 0]}>
          <boxGeometry args={[0.34, 0.014, 0.05]} />
          <primitive object={leds[4]} attach="material" />
        </mesh>

        {/* belly / battery */}
        <RoundedBox
          args={[1.0, 0.2, 0.52]}
          radius={0.07}
          smoothness={4}
          position={[-0.05, -0.24, 0]}
          castShadow
        >
          <meshStandardMaterial {...DARK} />
        </RoundedBox>

        {/* side heat vents */}
        {[0.36, -0.36].map((z) => (
          <group key={z} position={[-0.2, 0.02, z]}>
            {[-0.16, -0.02, 0.12].map((x) => (
              <mesh key={x} position={[x, 0, 0]}>
                <boxGeometry args={[0.075, 0.13, 0.014]} />
                <meshStandardMaterial {...DARK} />
              </mesh>
            ))}
          </group>
        ))}

        {/* rear cap */}
        <RoundedBox
          args={[0.16, 0.32, 0.5]}
          radius={0.06}
          smoothness={4}
          position={[-0.86, 0.02, 0]}
          castShadow
        >
          <meshStandardMaterial {...SILVER} />
        </RoundedBox>
      </group>

      {/* -------------------------------- head ------------------------------ */}
      <group ref={head} position={[0.86, 0.14, 0]}>
        {/* neck yoke */}
        <mesh position={[-0.14, -0.02, 0]} rotation={[Math.PI / 2, 0, 0]} castShadow>
          <cylinderGeometry args={[0.11, 0.11, 0.3, 20]} />
          <meshStandardMaterial {...SILVER} />
        </mesh>

        <Shell args={[0.46, 0.36, 0.52]} radius={0.11} smoothness={5} />

        {/* black sensor face */}
        <RoundedBox
          args={[0.09, 0.28, 0.44]}
          radius={0.04}
          smoothness={4}
          position={[0.22, -0.01, 0]}
          castShadow
        >
          <meshStandardMaterial color="#05070c" metalness={0.5} roughness={0.25} />
        </RoundedBox>

        {/* LED eyes */}
        {[0.12, -0.12].map((z, i) => (
          <mesh key={z} position={[0.27, 0.03, z]} rotation={[0, 0, Math.PI / 2]}>
            <cylinderGeometry args={[0.036, 0.036, 0.02, 20]} />
            <primitive object={leds[i]} attach="material" />
          </mesh>
        ))}

        {/* lidar dome */}
        <mesh position={[-0.02, 0.2, 0]} castShadow>
          <sphereGeometry args={[0.085, 22, 22, 0, Math.PI * 2, 0, Math.PI / 2]} />
          <meshStandardMaterial color="#0b0f16" metalness={0.9} roughness={0.15} />
        </mesh>
        <mesh position={[-0.02, 0.205, 0]}>
          <torusGeometry args={[0.075, 0.008, 8, 28]} />
          <primitive object={leds[2]} attach="material" />
        </mesh>

        {/* cheek accents */}
        {[0.2, -0.2].map((z) => (
          <mesh key={z} position={[0.06, -0.06, z]}>
            <boxGeometry args={[0.2, 0.02, 0.012]} />
            <primitive object={leds[3]} attach="material" />
          </mesh>
        ))}
      </group>

      {/* -------------------------------- legs ------------------------------ */}
      <Leg ref={frontLeftLeg} x={0.58} z={0.4} front />
      <Leg x={0.58} z={-0.4} front />
      <Leg x={-0.58} z={0.4} front={false} />
      <Leg x={-0.58} z={-0.4} front={false} />
    </group>
  );
});

export default RobotDog;
