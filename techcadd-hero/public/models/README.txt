Drop your compressed robot-dog.glb here, then set in .env.local:

  NEXT_PUBLIC_ROBOT_MODEL_URL=/models/robot-dog.glb

Until then the hero renders the built-in procedural robot dog, so the
page runs with zero external assets. If the GLB fails to load, the
scene falls back to the procedural dog instead of crashing.

Tip: run your GLB through gltf-transform for a much smaller file:
  npx @gltf-transform/cli optimize in.glb robot-dog.glb --texture-compress webp
