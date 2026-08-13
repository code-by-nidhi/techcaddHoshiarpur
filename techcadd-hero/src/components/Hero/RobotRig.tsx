"use client";

import { Suspense, useEffect, useRef, type RefObject } from "react";
import { useFrame } from "@react-three/fiber";
import { useGLTF } from "@react-three/drei";
import { Color, Group, MathUtils, type Mesh, type MeshStandardMaterial } from "three";
import RobotDog, { type RobotHandles } from "./RobotDog";
import ModelErrorBoundary from "@/components/UI/ModelErrorBoundary";
import { robotBus } from "@/lib/robotBus";
import type { InteractionState } from "@/hooks/useInteractionState";
import { damp } from "@/utils/math";

const MODEL_URL = process.env.NEXT_PUBLIC_ROBOT_MODEL_URL ?? "";
/** Name of the head bone/mesh in your GLB, if you have one. */
const HEAD_NODE = process.env.NEXT_PUBLIC_ROBOT_HEAD_NODE ?? "";

/* ------------------------------ timeline ------------------------------ */
const T = {
  ledOn: [0.15, 0.95],
  stand: [0.25, 1.35],
  lookLR: [1.5, 3.25], // one smooth sine: left, then right, then centre
  waveUp: [3.35, 3.65],
  waveHold: [3.65, 4.25],
  waveDown: [4.25, 4.55],
  end: 4.8,
} as const;

const seg = (t: number, [a, b]: readonly [number, number] | number[]) =>
  MathUtils.clamp((t - a) / (b - a), 0, 1);
const easeInOut = (x: number) =>
  x < 0.5 ? 2 * x * x : 1 - Math.pow(-2 * x + 2, 2) / 2;

/** Idle seconds before the showcase rotation kicks in. */
const AUTOROTATE_AFTER = 5;

/** Torso height that lands the feet on top of the podium (podium top = 0.063). */
const STANCE_Y = 1.04;

/**
 * Your own GLB. Head tracking still works if you name the head node in
 * NEXT_PUBLIC_ROBOT_HEAD_NODE — everything else (float, wake-up rise, LED
 * pulse on emissive materials, auto-rotate) is driven at the group level and
 * needs no rigging.
 */
function GltfRobot({
  url,
  handles,
}: {
  url: string;
  handles: RefObject<RobotHandles | null>;
}) {
  const { scene } = useGLTF(url);

  useEffect(() => {
    const leds: MeshStandardMaterial[] = [];
    scene.traverse((o) => {
      const mesh = o as Mesh;
      if (!mesh.isMesh) return;
      mesh.castShadow = true;
      mesh.receiveShadow = true;
      const mat = mesh.material as MeshStandardMaterial;
      if (mat?.emissive && mat.emissiveIntensity > 0) leds.push(mat);
    });
    handles.current = {
      head: HEAD_NODE ? ((scene.getObjectByName(HEAD_NODE) as Group) ?? null) : null,
      frontLeftLeg: null,
      torso: null,
      leds,
    };
  }, [scene, handles]);

  return <primitive object={scene} />;
}

export default function RobotRig({
  interaction,
}: {
  interaction: RefObject<InteractionState>;
}) {
  const root = useRef<Group>(null);
  const handles = useRef<RobotHandles>(null);
  const start = useRef<number | null>(null);
  const autoYaw = useRef(0);
  const ledBase = useRef<{ intensity: number; color: Color }[] | null>(null);
  const focusMix = useRef(0);

  useFrame((state, delta) => {
    const g = root.current;
    if (!g) return;
    if (start.current === null) start.current = state.clock.elapsedTime;
    const t = state.clock.elapsedTime - start.current;
    const h = handles.current;

    // snapshot the LED defaults once so hover effects can return to them
    if (h && !ledBase.current) {
      ledBase.current = h.leds.map((m) => ({
        intensity: m.emissiveIntensity,
        color: m.emissive.clone(),
      }));
    }

    const waking = t < T.end;
    const { active, lastAt } = interaction.current;
    const idleFor = (performance.now() - lastAt) / 1000;

    /* ---------------------------- body ---------------------------- */
    // powers up from a crouch
    const stand = easeInOut(seg(t, T.stand));
    const crouch = (1 - stand) * 0.26;

    // showcase rotation once the user has been still for a while
    if (!waking && !active && idleFor > AUTOROTATE_AFTER) {
      autoYaw.current += delta * 0.16;
    }

    const { x: mx, y: my } = state.pointer;
    const bodyFloat = waking ? 0 : Math.sin(t * 0.85) * 0.028;

    g.position.y = damp(g.position.y, STANCE_Y - crouch + bodyFloat, 5, delta);
    g.rotation.y = damp(g.rotation.y, autoYaw.current + (waking ? 0 : mx * 0.06), 3, delta);
    g.rotation.z = damp(g.rotation.z, waking ? -crouch * 0.1 : -mx * 0.025, 3, delta);
    g.rotation.x = damp(g.rotation.x, waking ? 0 : my * 0.018, 3, delta);

    // breathing
    if (h?.torso) {
      const breath = 1 + Math.sin(t * 1.5) * (waking ? 0.004 : 0.011);
      h.torso.scale.set(1, breath, 1);
    }

    /* ---------------------------- head ---------------------------- */
    if (h?.head) {
      // wake-up: one smooth sweep left → right → centre
      const sweep = seg(t, T.lookLR);
      const wakeYaw = sweep > 0 && sweep < 1 ? Math.sin(sweep * Math.PI * 2) * 0.6 : 0;
      const wakePitch = waking ? Math.sin(sweep * Math.PI) * -0.08 : 0;

      // tracking fades in after the sequence, plus a slow wander so it never
      // sits perfectly still
      const track = MathUtils.clamp((t - T.end) / 1.4, 0, 1);
      const wander = Math.sin(t * 0.21) * 0.1 + Math.sin(t * 0.07) * 0.05;

      const targetYaw = wakeYaw + track * (mx * 0.28 + wander);
      const targetPitch = wakePitch + track * (my * 0.14 + Math.sin(t * 0.31) * 0.02);

      h.head.rotation.y = damp(h.head.rotation.y, targetYaw, 4.5, delta);
      h.head.rotation.x = damp(h.head.rotation.x, targetPitch, 4.5, delta);
      h.head.rotation.z = damp(h.head.rotation.z, track * mx * 0.05, 4, delta);
    }

    /* ---------------------------- wave ---------------------------- */
    if (h?.frontLeftLeg) {
      const up = easeInOut(seg(t, T.waveUp));
      const down = easeInOut(seg(t, T.waveDown));
      const lift = Math.max(up - down, 0);
      const swing =
        lift > 0.2 && t > T.waveHold[0]
          ? Math.sin((t - T.waveHold[0]) * 11) * 0.28 * lift
          : 0;
      const leg = h.frontLeftLeg;
      leg.rotation.z = damp(leg.rotation.z, -1.15 * lift + swing, 9, delta);
      leg.rotation.x = damp(leg.rotation.x, 0.12 * lift, 9, delta);
      // weight shifts onto the other three legs
      g.rotation.z += -0.035 * lift;
      g.position.x = damp(g.position.x, -0.06 * lift, 6, delta);
    }

    /* ------------------------ LEDs + hover -------------------------- */
    if (h && ledBase.current) {
      const focus = robotBus.get();
      focusMix.current = damp(focusMix.current, focus ? 1 : 0, 6, delta);

      const powerOn = easeInOut(seg(t, T.ledOn));
      // a couple of flickers as it boots, then a slow breath
      const flicker =
        t < T.ledOn[1] ? 0.55 + 0.45 * Math.sin(t * 42) : 1;
      const pulse =
        0.86 +
        0.14 * Math.sin(t * (focus?.effect === "pulse" ? 7 : 2.2));
      const boost = 1 + focusMix.current * (focus?.effect === "pulse" ? 1.1 : 0.5);

      h.leds.forEach((m, i) => {
        const base = ledBase.current![i];
        m.emissiveIntensity = base.intensity * powerOn * flicker * pulse * boost;
        if (focus) {
          m.emissive.lerp(
            new Color(focus.color[0], focus.color[1], focus.color[2]),
            1 - Math.exp(-4 * delta)
          );
        } else {
          m.emissive.lerp(base.color, 1 - Math.exp(-4 * delta));
        }
      });
    }
  });

  return (
    <group ref={root} position={[0, STANCE_Y, 0]}>
      {MODEL_URL ? (
        <ModelErrorBoundary fallback={<RobotDog ref={handles} />}>
          <Suspense fallback={<RobotDog ref={handles} />}>
            <GltfRobot url={MODEL_URL} handles={handles} />
          </Suspense>
        </ModelErrorBoundary>
      ) : (
        <RobotDog ref={handles} />
      )}
    </group>
  );
}


if (MODEL_URL) useGLTF.preload(MODEL_URL);
