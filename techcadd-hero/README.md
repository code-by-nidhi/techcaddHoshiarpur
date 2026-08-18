# TechCadd Jalandhar — Navbar + Hero

Next.js 15 (App Router) · TypeScript · Tailwind v4 · Framer Motion ·
React Three Fiber / drei / Three.js · Lucide.

```bash
npm install
npm run dev     # http://localhost:3000
```

The layout, navbar, typography, and colour work are unchanged from the
reference. What changed in this pass: the robot is now a live 3D scene.

## The robot

The hero renders your **ROBOT.jpeg cutout** (`public/images/robot-cutout.webp`),
standing on a CSS/SVG neon platform: concentric ellipse rings with glow
(`PlatformRings.tsx`), light streaks travelling around it via animated
`stroke-dashoffset` (`OrbitArcs.tsx`), a glass floor disc, and a mirrored,
masked copy of the robot as the floor reflection. The glow behind it takes the
colour of whichever course tag you hover.

Your cutout faces left; set `FACE_RIGHT = true` at the top of
`RobotShowcase.tsx` to mirror it, at the cost of reversing the `techcadd` and
`02` decals on the body.

### The robot is static

No drag, no rotation, no cursor movement — it sits on the platform exactly as
the reference shows it. The only motion in the stage is around it: the ring
pulse, the travelling light streaks, the contact glow, and the course tags
drifting.

Two flags at the top of `RobotShowcase.tsx` if you change your mind:
`IDLE_FLOAT` brings back a gentle up-and-down drift, `FACE_RIGHT` mirrors the
robot (which also reverses the `techcadd` and `02` decals).

### The 3D version is still in the repo

`RobotCanvas.tsx`, `RobotRig.tsx`, `RobotDog.tsx`, `Platform3D.tsx`, and
`HoloEffects.tsx` are the live WebGL stage — wake-up sequence, 360° drag,
zoom, cursor head tracking, idle breathing, auto-rotate after 5s, and the
per-tag robot reactions. Nothing imports them right now. To switch back,
replace the robot `<Image>` (and `PlatformRings` / `OrbitArcs`) in
`RobotShowcase.tsx` with:

```tsx
const RobotCanvas = dynamic(() => import("./RobotCanvas"), {
  ssr: false,
  loading: () => <StageFallback />,
});
```

That scene ships with a procedural robot; point
`NEXT_PUBLIC_ROBOT_MODEL_URL` at a Unitree Go2 / Spot GLB (Sketchfab,
CGTrader, TurboSquid) for a photoreal model, and
`NEXT_PUBLIC_ROBOT_HEAD_NODE` at its head node to keep head tracking.

## Interaction (3D version)

- **360° drag, zoom, touch** — OrbitControls, pan disabled, distance clamped
  4.4–9 so the robot can't be lost or clipped.
- **Head tracking** — the head leads the cursor (±0.28 yaw, ±0.14 pitch) with
  a slow wander layered on so it never sits perfectly still.
- **Body response** — a couple of degrees of tilt, deliberately under-driven.
- **Camera parallax** — applied to the stage group, not the camera, because
  OrbitControls owns the camera transform and moving both fights the damping.
  On screen it reads the same.
- **Auto-rotate** — starts after 5s of no interaction, stops the moment you
  grab it.

## Course tags → robot reactions

The eight tags are DOM elements (crisp text, real hover states, keyboard
focusable). They talk to the WebGL scene through `lib/robotBus.ts`, a tiny
external store the rig reads inside `useFrame` — so hovering a tag never
re-renders the Canvas.

In the shipped image version, hovering a tag tints the glow behind the robot
with that tag's colour. Switch to the 3D stage and the same bus drives richer
reactions:

| Tag | Reaction (3D version) |
|---|---|
| AI / ML, Cloud Computing | holographic wireframe shell above the robot |
| Python, MERN, Full Stack, Web Dev | LEDs shift to the tag's colour and pulse faster, shockwave on the platform |
| Data Analytics, Data Science | animated bar chart above the robot |

Tag positions, colours, and effects are all in `lib/content.ts` → `COURSE_TAGS`.
They ring the outside of the stage so nothing lands on the model.

## Sizing

The robot occupies 68% of the stage width, positioned at `left-[16%] top-[8%]`
in `RobotShowcase.tsx` — adjust those four values together if you move it, and
keep the reflection block's `left`/`w` in sync.


## The full site

`app/page.tsx`, in order:

| Section | Component | Surface |
|---|---|---|
| Hero | `Hero/Hero.tsx` | dark — unchanged |
| About | `sections/About.tsx` | white — editorial rebuild: opening statement, wide imagery block, milestone timeline, founder vision, mission & values |
| Course categories | `sections/CourseCategories.tsx` | #F8FAFC — six gradient cards |
| Explore Professional Courses | `sections/FeaturedCourses.tsx` | white — glass cards |
| Why Choose Techcadd | `sections/WhyChoose.tsx` | white — sticky rail + staggered cards |
| Career Outcomes | `sections/CareerOutcomes.tsx` | #F8FAFC — bento dashboard |
| Student Success Wall | `sections/StudentWall.tsx` | white — featured story + masonry wall |
| Career Journey Roadmap | `sections/ProgrammeRoadmap.tsx` | white — sticky horizontal scroll |
| Technology Universe | `sections/TechUniverse.tsx` | #F8FAFC — orbit hub, click to explore |
| Innovation Command Center | `sections/CommandCenter.tsx` | white — three-pane analytics |
| Smart Help Center | `sections/HelpCenter.tsx` | #F8FAFC — search + tabs + question cards |
| Knowledge Hub | `sections/KnowledgeHub.tsx` | white — hero article, secondary, trending, topics |
| Career Launch Center | `sections/LaunchCenter.tsx` | dark — full viewport, particles, counters |
| Mega Footer | `Layout/MegaFooter.tsx` | #F8FAFC — six columns, newsletter, WhatsApp, watermark |

Dark hero → white all the way down → dark Launch Center. Neighbouring sections
never share a background.

### What each redesign does differently

- **Career Outcomes** replaces the hiring-partners logo wall entirely. Bento
  grid: three headline counters, a placement-assistance activity panel, a
  Google-reviews rating ring with a star breakdown, an alumni-by-city bar
  chart, and an enrolment sparkline that draws on scroll.
- **Student Success Wall** is a CSS masonry column layout with one featured
  story in a gradient block, career-outcome badges, glow borders on hover, and
  an animated review count — social proof wall, not a carousel.
- **Career Journey Roadmap** pins for four viewport heights and drives the
  eight stages sideways as you scroll, with a progress line that fills and
  cards that fade in as they arrive.
- **Technology Universe** puts seven domains in orbit around a pulsing core.
  Clicking one slides its stack, projects, industry use cases and career paths
  into the detail panel; the active pill animates between nodes with a shared
  layout ID.
- **Innovation Command Center** is a three-pane SaaS console — categories rail,
  workspace with a blueprint grid, live metrics sidebar with animated bars.
- **Smart Help Center** has live search across question and answer text,
  category tabs with a sliding indicator, and an empty state that routes to a
  counsellor.
- **Knowledge Hub** leads with a full-bleed featured article, two secondary
  cards, a numbered trending list and a topic cloud.
- **Career Launch Center** is a full-viewport close with drifting gradients,
  30 floating particles, three magnetic CTAs and live counters.
- **Mega Footer** carries a giant faded TECHCADD watermark, newsletter capture,
  a WhatsApp block and a five-column sitemap on #F8FAFC.

### One content note

The brief asked for "placement assistance metrics" and your standing rule is no
placement percentages or salary figures. The dashboard reports the *activity*
instead — mock interviews conducted, resume reviews, campus drives, mentor
referrals. No percentages placed, no packages, no salary bands anywhere.

### Placeholders to replace

- **About imagery** — the wide campus block and the founder portrait are
  gradient placeholders with a comment marking the `<Image>` swap.
- **Student avatars** — gradient initials in `StudentWall.tsx`.
- **Contact details** — `lib/site.ts` → `MEGA_FOOTER.contact`, including the
  WhatsApp number that builds the `wa.me` link.
- **Newsletter** — `subscribe()` in `MegaFooter.tsx` sets local state only;
  wire it to your provider.

**All copy lives in `lib/site.ts`.**

## Files

| Piece | File |
|---|---|
| Navbar | `components/Layout/Navbar.tsx` |
| Badge, headline, CTAs, feature row | `components/Hero/HeroContent.tsx` + siblings |
| Robot, reflection, glow | `components/Hero/RobotShowcase.tsx` |
| Neon platform rings, glass floor | `components/Hero/PlatformRings.tsx` |
| Orbiting light streaks | `components/Hero/OrbitArcs.tsx` |
| Canvas, lights, controls, parallax (unused) | `components/Hero/RobotCanvas.tsx` |
| Wake-up, idle, tracking, LED logic | `components/Hero/RobotRig.tsx` |
| The robot geometry + materials | `components/Hero/RobotDog.tsx` |
| Rings, trails, glass floor | `components/Hero/Platform3D.tsx` |
| Holo / chart / shockwave reactions | `components/Hero/HoloEffects.tsx` |
| Course tags | `components/Hero/FloatingTechCards.tsx` |
| Navy field, glows, particles | `components/Hero/BackgroundEffects.tsx` |
| All copy, nav items, tags | `lib/content.ts` |

## Assets

- `public/images/techcadd-logo-white.png` — your official logo, recoloured
  white for the dark navbar (the navy original is invisible on this
  background). Note its tagline reads "Your Skill & Technology Partner",
  not the "Your Skill Our Technology Future" in the reference screenshot —
  the official file wins.
- `public/images/robot-cutout.webp` — your ROBOT.jpeg with the checkerboard
  removed, feathered, and upscaled 3x. This is what the hero shows.
- `public/images/robot-stage.webp` — robot + platform lifted from the
  reference render, also kept as a fallback.

## Performance

- Canvas is `dynamic(..., { ssr: false })`; no WebGL in the server bundle.
- `dpr={[1, 1.75]}` + `AdaptiveDpr` + `AdaptiveEvents` degrade under load.
- Reflector at 512; drop it if you're targeting weak mobile GPUs.
- Particles are one 2D canvas that pauses when the tab is hidden.
- `prefers-reduced-motion` disables the DOM float loops and particle motion.
- `<Environment preset="city" />` streams an HDRI from the pmndrs CDN inside
  its own Suspense boundary — blocked network degrades to the explicit lights,
  it doesn't break. For fully offline, download an `.hdr` to `/public` and use
  `<Environment files="/studio.hdr" />`.

## Tailwind

Tailwind v4 (`@import "tailwindcss"` + `@theme` in `globals.css`). On v3, swap
that import for the three `@tailwind` directives.

## Book Demo enquiries → MySQL

The Book Demo modal (`src/components/UI/DemoModal.tsx`, opened from anywhere
via `demoBus.open()`) posts to a Next.js route handler in this app, which
validates the enquiry and stores it in MySQL through Prisma.

```
DemoModal  ──POST /api/demo-request──▶  route handler
                                          │  zod validation + rate limit
                                          ▼
                                       Prisma  ──▶  MySQL `demo_bookings`
```

The browser never talks to MySQL. `DATABASE_URL` is read only inside the route
handler, which runs on the server — it is never prefixed `NEXT_PUBLIC_` and so
never reaches the client bundle.

### It writes the same table as the `server/` API

This app's `DemoRequest` model is mapped onto the existing `demo_bookings`
table — the one the NestJS API in `../server` writes. That is deliberate: two
tables would split the counselling team's leads in two. `prisma/schema.prisma`
here and `server/prisma/mysql/schema.prisma` describe the same table and must
be kept in step, or the Nest service's `npm run mysql:push` will alter columns
out from under this one.

Once every Book Demo trigger goes through `/api/demo-request`, the Nest
`bookings` module can be deleted and this schema owns the table outright.

### Local setup

```bash
npm install                 # postinstall runs `prisma generate`

cp .env.example .env        # then edit DATABASE_URL
```

`DATABASE_URL` goes in `.env`, not `.env.local`. Next.js reads both, but the
Prisma CLI only reads `.env`, so migrations cannot find a connection string
that lives in `.env.local`.

Start MySQL before migrating. On this machine that is **XAMPP's** MySQL (the
`MYSQL80` Windows service is stopped, and XAMPP's `root` has no password) —
start it from the XAMPP control panel. Don't run both: they both want 3306.

```bash
npm run db:migrate          # prisma migrate dev
npm run dev                 # http://localhost:3000
```

Env files are read once at startup. After editing `.env`, restart the dev
server or it will still see the old values.

Then click **Book Demo**, submit the form, and confirm the row:

```bash
npm run db:studio           # or: SELECT * FROM demo_bookings ORDER BY id DESC;
```

#### If the table already exists

`demo_bookings` may already have been created by the Nest service
(`npm run mysql:push` there). `migrate dev` would then try to create a table
that exists. Baseline the migration as already-applied instead:

```bash
npx prisma migrate resolve --applied 20260818000000_create_demo_requests
```

### Production

Never run `migrate dev` against production — it can reset the database. Apply
the checked-in migrations instead, which is additive and non-interactive:

```bash
npx prisma generate
npx prisma migrate deploy   # npm run db:deploy
npm run build
npm run start
```

`DATABASE_URL` comes from the host's environment (systemd unit, Docker env,
Vercel project settings) — not from a file in the repo. The MySQL user needs
only `SELECT, INSERT, UPDATE` on this table; it does not need `DROP`.

### Rate limiting caveat

`src/lib/rate-limit.ts` holds its counters in process memory: five submissions
a minute per IP, per instance. On a single Node process that is the whole
application. Behind an autoscaler each instance keeps its own count and the
effective limit multiplies by the instance count — if the limit must be exact
there, swap that module for a shared store. The call site does not change.

### The API

`POST /api/demo-request` — the only public method; everything else returns 405.
Stored enquiries are personal data and are never served from a public route.

Request:

```json
{ "name": "Mamta", "phone": "9876567876",
  "course": "Full Stack Development", "source": "navbar" }
```

| Status | When |
| ------ | ---- |
| 201 | stored (or matched a submission from the same number in the last minute) |
| 400 | validation failed — `errors` maps field → message |
| 413 | body over 4 KB |
| 415 | not `application/json` |
| 429 | more than 5 submissions a minute from one address |
| 503 | MySQL unreachable |
| 500 | anything else |

Database and Prisma errors are logged server-side and never returned to the
browser.
