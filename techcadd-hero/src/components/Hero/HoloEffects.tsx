"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import {
  AdditiveBlending,
  Color,
  type Group,
  type Mesh,
  type MeshBasicMaterial,
} from "three";
import { robotBus } from "@/lib/robotBus";
import { damp } from "@/utils/math";

/**
 * Reactions to the course tags. Each effect lerps its own visibility, so
 * hovering in and out never snaps:
 *   holo  — a holographic ring + wireframe shell above the robot
 *   chart — a small bar chart that grows
 *   pulse — handled on the LEDs by the rig, plus a shockwave here
 */
export default function HoloEffects() {
  const holo = useRef<Group>(null);
  const chart = useRef<Group>(null);
  const shock = useRef<Mesh>(null);
  const mix = useRef({ holo: 0, chart: 0, pulse: 0 });
  const tint = useRef(new Color("#60a5fa"));

  useFrame(({ clock }, delta) => {
    const focus = robotBus.get();
    const m = mix.current;
    m.holo = damp(m.holo, focus?.effect === "holo" ? 1 : 0, 5, delta);
    m.chart = damp(m.chart, focus?.effect === "chart" ? 1 : 0, 5, delta);
    m.pulse = damp(m.pulse, focus?.effect === "pulse" ? 1 : 0, 5, delta);

    if (focus) tint.current.lerp(new Color(...focus.color), 1 - Math.exp(-5 * delta));

    const t = clock.elapsedTime;

    if (holo.current) {
      holo.current.visible = m.holo > 0.01;
      holo.current.rotation.y = t * 0.6;
      holo.current.scale.setScalar(0.7 + m.holo * 0.3);
      holo.current.traverse((o) => {
        const mesh = o as Mesh;
        const mat = mesh.material as MeshBasicMaterial | undefined;
        if (mat?.transparent) {
          mat.opacity = m.holo * 0.55;
          mat.color.copy(tint.current);
        }
      });
    }

    if (chart.current) {
      chart.current.visible = m.chart > 0.01;
      chart.current.children.forEach((bar, i) => {
        const target =
          m.chart * (0.25 + 0.28 * (1 + Math.sin(t * 2.2 + i * 1.1)) * (0.4 + i * 0.16));
        bar.scale.y = damp(bar.scale.y, Math.max(target, 0.001), 8, delta);
        bar.position.y = bar.scale.y / 2;
        const mat = (bar as Mesh).material as MeshBasicMaterial;
        mat.opacity = m.chart * 0.95;
        mat.color.copy(tint.current);
      });
    }

    if (shock.current) {
      shock.current.visible = m.pulse > 0.01;
      const p = (t % 1.6) / 1.6;
      const s = 1.2 + p * 1.6;
      shock.current.scale.set(s, s, s);
      const mat = shock.current.material as MeshBasicMaterial;
      mat.opacity = (1 - p) * m.pulse * 0.7;
      mat.color.copy(tint.current);
    }
  });

  return (
    <group>
      {/* holographic shell above the robot */}
      <group ref={holo} position={[0, 2.05, 0]} visible={false}>
        <mesh>
          <icosahedronGeometry args={[0.42, 1]} />
          <meshBasicMaterial
            wireframe
            transparent
            opacity={0}
            blending={AdditiveBlending}
            depthWrite={false}
            toneMapped={false}
          />
        </mesh>
        <mesh rotation={[Math.PI / 2.4, 0, 0]}>
          <torusGeometry args={[0.62, 0.006, 8, 64]} />
          <meshBasicMaterial
            transparent
            opacity={0}
            blending={AdditiveBlending}
            depthWrite={false}
            toneMapped={false}
          />
        </mesh>
      </group>

      {/* data bars */}
      <group ref={chart} position={[0, 1.85, 0]} visible={false}>
        {[-0.24, -0.08, 0.08, 0.24].map((x) => (
          <mesh key={x} position={[x, 0, 0]} scale={[1, 0.001, 1]}>
            <boxGeometry args={[0.09, 1, 0.09]} />
            <meshBasicMaterial
              transparent
              opacity={0}
              blending={AdditiveBlending}
              depthWrite={false}
              toneMapped={false}
            />
          </mesh>
        ))}
      </group>

      {/* shockwave on the platform */}
      <mesh
        ref={shock}
        rotation={[-Math.PI / 2, 0, 0]}
        position={[0, 0.09, 0]}
        visible={false}
      >
        <ringGeometry args={[0.96, 1, 96]} />
        <meshBasicMaterial
          transparent
          opacity={0}
          blending={AdditiveBlending}
          depthWrite={false}
          toneMapped={false}
        />
      </mesh>
    </group>
  );
}
