import {
  COMMON_AUDIENCE as A, COMMON_FAQS, COMMON_WHY, DEFAULT_INSTRUCTOR,
} from "./shared";
import type { Course, Module, Project } from "./types";

/**
 * Civil & Mechanical Engineering catalogue.
 *
 * These eight share almost everything — category, mode, audience, teaching
 * approach, base FAQs — so only what genuinely differs is
 * written per course. Adding a ninth is a dozen lines, not two hundred.
 */

type Spec = {
  /** optional catalogue badge, e.g. "Trending" */
  badge?: Course["badge"];
  slug: string;
  title: string;
  short: string;
  overview: string;
  duration: string;
  level: string;
  modules: Module[];
  outcomes: string[];
  tools: string[];
  roles: string[];
  projects: Project[];
  keywords: string[];
};

const CATEGORY = "Civil & Mechanical Engineering";

function makeCourse(spec: Spec): Course {
  return {
    slug: spec.slug,
    title: spec.title,
    shortDescription: spec.short,
    overview: spec.overview,
    category: CATEGORY,
    badge: spec.badge,
    level: spec.level,
    duration: spec.duration,
    mode: "Online / Offline",
    certification: true,
    heroImage: "/images/lab.webp",
    video: {
      url: "",
      thumbnail: "/images/classroom.webp",
      caption: `How the ${spec.title} track is run, module by module.`,
    },
    audience: [A.beginners, A.students, A.freshers, A.professionals, A.freelancers],
    whyChooseUs: COMMON_WHY,
    modules: spec.modules,
    learningOutcomes: spec.outcomes,
    tools: spec.tools,
    careerOutcomes: {
      roles: spec.roles,
      opportunities: [
        "Design and drafting teams",
        "Manufacturing and production units",
        "Freelance drafting work",
        "Campus placements",
      ],
      nextSteps: ["Advanced CAD modules", "Simulation & analysis", "CNC programming", "Product design"],
      industries: ["Manufacturing", "Automotive", "Construction & infrastructure", "Tool rooms"],
    },
    projects: spec.projects,
    instructor: DEFAULT_INSTRUCTOR,
    /* Real testimonials only — an empty array renders no reviews section. */
    reviews: [],
    faqs: [
      {
        q: "Is this course suitable for beginners?",
        a: `Yes. ${spec.title} starts from the interface and the fundamentals, so no prior software experience is assumed.`,
      },
      {
        q: "What are the prerequisites?",
        a: "Basic engineering drawing sense helps, but the first module covers what you need. Diploma, degree and ITI students all take this track.",
      },
      ...COMMON_FAQS,
    ],
    relatedCourses: [],
    keywords: spec.keywords,
  };
}

const SPECS: Spec[] = [
  {
    slug: "autocad",
    badge: "Trending",
    title: "AutoCAD",
    short: "2D drafting and 3D modelling, to the drawing standards industry actually checks.",
    overview:
      "The drafting tool most design offices still run on. You work from setup and templates through dimensioning, layouts and plotting, finishing with drawing sets that would pass a review.",
    duration: "2 Months",
    level: "Beginner to Advanced",
    modules: [
      { title: "Interface & drawing setup", summary: "Units, templates, layers and the habits that keep a drawing clean.", topics: ["Workspace", "Units & limits", "Layers", "Templates"], duration: "2 weeks", lessons: 8 },
      { title: "2D drafting", summary: "Precise geometry with the modify tools that make it fast.", topics: ["Draw tools", "Modify tools", "Object snaps", "Blocks"], duration: "3 weeks", lessons: 12 },
      { title: "Dimensioning & annotation", summary: "Communicating intent, not just shape.", topics: ["Dimension styles", "Text styles", "Tables", "GD&T basics"], duration: "2 weeks", lessons: 8 },
      { title: "3D & plotting", summary: "Solids, views and a print-ready sheet set.", topics: ["3D solids", "Viewports", "Layouts", "Plot styles"], duration: "2 weeks", lessons: 8 },
    ],
    outcomes: [
      "Set up a drawing to a company template",
      "Draft accurate 2D geometry at speed",
      "Dimension and annotate to standard",
      "Build simple 3D solids",
      "Produce plot-ready layouts and sheet sets",
    ],
    tools: ["AutoCAD", "AutoCAD LT", "DWG TrueView", "Layer standards", "Sheet Set Manager"],
    roles: ["CAD Draughtsman", "Design Engineer", "Detailing Engineer", "Site Engineer"],
    projects: [
      { name: "Residential floor plan set", summary: "A complete plan, elevation and section set, dimensioned and plotted.", tech: ["AutoCAD"], level: "Intermediate", skills: ["Layers", "Annotation", "Layouts"], image: "/images/lab.webp" },
      { name: "Machine part detail drawing", summary: "Orthographic views with tolerances and a title block.", tech: ["AutoCAD"], level: "Beginner", skills: ["Projection", "Dimensioning", "Blocks"], image: "/images/classroom.webp" },
    ],
    keywords: ["autocad course Hoshiarpur", "autocad training", "2d drafting course", "cad classes"],
  },
  {
    slug: "solidworks",
    title: "SolidWorks",
    short: "Parametric part and assembly modelling for mechanical design.",
    overview:
      "Model parts the way a design team does: sketch-driven, fully constrained and built to change. You move from single parts through assemblies and mates to drawings that release.",
    duration: "2 Months",
    level: "Beginner to Advanced",
    modules: [
      { title: "Sketching & constraints", summary: "Fully defined sketches, and why they matter downstream.", topics: ["Sketch entities", "Relations", "Dimensions", "Design intent"], duration: "2 weeks", lessons: 8 },
      { title: "Part modelling", summary: "Features that build a part someone else can edit.", topics: ["Extrude & revolve", "Sweep & loft", "Patterns", "Fillets"], duration: "3 weeks", lessons: 12 },
      { title: "Assemblies", summary: "Mates, motion and interference checks.", topics: ["Mates", "Sub-assemblies", "Interference", "Exploded views"], duration: "2 weeks", lessons: 8 },
      { title: "Drawings & sheet metal", summary: "Releasing the design, plus the sheet metal toolset.", topics: ["Drawing views", "BOM", "Sheet metal", "Flat patterns"], duration: "2 weeks", lessons: 8 },
    ],
    outcomes: [
      "Build fully defined, editable sketches",
      "Model parts with clear design intent",
      "Assemble components and check interference",
      "Produce drawings with a bill of materials",
      "Work with sheet metal and flat patterns",
    ],
    tools: ["SolidWorks", "SolidWorks Drawings", "Sheet Metal", "Assembly Mates", "eDrawings"],
    roles: ["Design Engineer", "Product Designer", "Mechanical Draughtsman", "R&D Assistant"],
    projects: [
      { name: "Sheet metal enclosure", summary: "An enclosure modelled, flattened and drawn for fabrication.", tech: ["SolidWorks"], level: "Intermediate", skills: ["Sheet metal", "Flat pattern", "Drawings"], image: "/images/lab.webp" },
      { name: "Multi-part assembly", summary: "An assembly with mates, motion study and a BOM.", tech: ["SolidWorks"], level: "Advanced", skills: ["Mates", "Interference", "BOM"], image: "/images/classroom.webp" },
    ],
    keywords: ["solidworks course Hoshiarpur", "solidworks training", "mechanical design course", "3d modelling classes"],
  },
  {
    slug: "catia",
    title: "CATIA",
    short: "Surface and solid modelling for automotive and aerospace workflows.",
    overview:
      "The package automotive and aerospace suppliers specify. You cover part design and assembly, then move into the surfacing tools that make CATIA worth learning separately.",
    duration: "2 Months",
    level: "Intermediate",
    modules: [
      { title: "Sketcher & part design", summary: "The solid modelling foundation.", topics: ["Sketcher", "Pads & pockets", "Dress-up features", "Transformations"], duration: "3 weeks", lessons: 12 },
      { title: "Assembly design", summary: "Constraints, products and structure.", topics: ["Constraints", "Product structure", "Clash analysis", "Scenes"], duration: "2 weeks", lessons: 8 },
      { title: "Generative shape design", summary: "Surfacing, where CATIA earns its reputation.", topics: ["Wireframe", "Surfaces", "Joins & trims", "Continuity"], duration: "3 weeks", lessons: 12 },
      { title: "Drafting", summary: "Views, sections and released drawings.", topics: ["Views", "Sections", "Dimensions", "Standards"], duration: "1 week", lessons: 4 },
    ],
    outcomes: [
      "Model parts in the Part Design workbench",
      "Constrain and analyse assemblies",
      "Build and evaluate surfaces",
      "Check continuity across joined surfaces",
      "Generate drawings to standard",
    ],
    tools: ["CATIA V5", "Part Design", "Assembly Design", "Generative Shape Design", "Drafting"],
    roles: ["Design Engineer", "Surfacing Engineer", "CAD Engineer", "Automotive Design Assistant"],
    projects: [
      { name: "Automotive panel surface", summary: "A styled panel built from wireframe and surfaces, checked for continuity.", tech: ["CATIA"], level: "Advanced", skills: ["Surfacing", "Continuity", "Wireframe"], image: "/images/lab.webp" },
      { name: "Component assembly", summary: "A constrained assembly with clash analysis and drawings.", tech: ["CATIA"], level: "Intermediate", skills: ["Constraints", "Clash", "Drafting"], image: "/images/classroom.webp" },
    ],
    keywords: ["catia course Hoshiarpur", "catia v5 training", "automotive design course", "surfacing course"],
  },
  {
    slug: "nc-cad",
    title: "NC CAD",
    short: "CAD geometry prepared specifically for numerical control machining.",
    overview:
      "Drawing for the machine rather than for the page. You prepare and repair geometry, set datums and hand off models a CAM programmer can use without rework.",
    duration: "6 Weeks",
    level: "Beginner to Intermediate",
    modules: [
      { title: "NC drafting fundamentals", summary: "Geometry that survives the trip to CAM.", topics: ["Coordinate systems", "Datums", "Tolerances", "Drawing prep"], duration: "2 weeks", lessons: 8 },
      { title: "Model preparation", summary: "Repairing and simplifying geometry for machining.", topics: ["Healing", "Simplification", "Feature removal", "Export formats"], duration: "2 weeks", lessons: 8 },
      { title: "Handoff to CAM", summary: "What a programmer needs from you, and why.", topics: ["Stock definition", "Setup sheets", "Fixture notes", "Revision control"], duration: "2 weeks", lessons: 8 },
    ],
    outcomes: [
      "Set coordinate systems and datums correctly",
      "Repair and simplify models for machining",
      "Apply tolerances a machinist can hold",
      "Export in the formats CAM expects",
      "Produce a clean setup handoff",
    ],
    tools: ["AutoCAD", "SolidWorks", "STEP / IGES", "Setup sheets", "GD&T"],
    roles: ["NC Programmer Assistant", "CAD Technician", "Manufacturing Engineer", "Tool Room Draughtsman"],
    projects: [
      { name: "Machining-ready model pack", summary: "A part model prepared, toleranced and exported for CAM.", tech: ["CAD", "STEP"], level: "Intermediate", skills: ["Datums", "Tolerancing", "Export"], image: "/images/lab.webp" },
    ],
    keywords: ["nc cad course", "cad for cnc training", "machining drawing course", "cad cam Hoshiarpur"],
  },
  {
    slug: "nx-cam",
    title: "NX CAM",
    short: "Toolpath programming and post-processing in Siemens NX.",
    overview:
      "Take a solid model to a verified NC program: operations, tooling, cutting parameters, simulation and a post-processed file the machine will actually run.",
    duration: "2 Months",
    level: "Intermediate",
    modules: [
      { title: "CAM setup", summary: "Blanks, coordinate systems and tool libraries.", topics: ["Machine setup", "Blank definition", "Tool library", "Geometry groups"], duration: "2 weeks", lessons: 8 },
      { title: "Milling operations", summary: "Roughing through finishing, and when to use which.", topics: ["Planar milling", "Cavity milling", "Contour", "Drilling"], duration: "3 weeks", lessons: 12 },
      { title: "Simulation & verification", summary: "Catching collisions before the spindle does.", topics: ["Toolpath verify", "Gouge check", "Machine simulation", "Stock tracking"], duration: "2 weeks", lessons: 8 },
      { title: "Post-processing", summary: "Producing G-code the controller accepts.", topics: ["Post configuration", "G-code output", "Shop docs", "Optimisation"], duration: "1 week", lessons: 4 },
    ],
    outcomes: [
      "Set up a CAM job from a solid model",
      "Choose and sequence milling operations",
      "Build and manage a tool library",
      "Verify toolpaths and catch collisions",
      "Post-process to machine-ready G-code",
    ],
    tools: ["Siemens NX", "NX CAM", "Post Builder", "Tool libraries", "G-code"],
    roles: ["CAM Programmer", "CNC Programmer", "Manufacturing Engineer", "Process Planner"],
    projects: [
      { name: "3-axis milled component", summary: "A part programmed from roughing to finishing, verified and posted.", tech: ["NX CAM"], level: "Advanced", skills: ["Operation strategy", "Verification", "Posting"], image: "/images/lab.webp" },
    ],
    keywords: ["nx cam course", "siemens nx training", "cnc programming course", "cam course Hoshiarpur"],
  },
  {
    slug: "solidcam",
    title: "SolidCAM",
    short: "CAM inside SolidWorks, including iMachining strategies.",
    overview:
      "Programming without leaving SolidWorks. Covers 2.5D and 3D milling, turning basics and the iMachining strategies that cut cycle times on real jobs.",
    duration: "6 Weeks",
    level: "Intermediate",
    modules: [
      { title: "SolidCAM setup", summary: "CAM-Parts, stock and coordinate systems inside SolidWorks.", topics: ["CAM-Part", "Stock & target", "CoordSys", "Tool table"], duration: "2 weeks", lessons: 8 },
      { title: "2.5D milling", summary: "The operations that cover most shop work.", topics: ["Profile", "Pocket", "Drilling", "Face milling"], duration: "2 weeks", lessons: 8 },
      { title: "iMachining & 3D", summary: "Adaptive strategies and 3D finishing.", topics: ["iMachining 2D/3D", "Technology wizard", "3D roughing", "Finishing"], duration: "2 weeks", lessons: 8 },
    ],
    outcomes: [
      "Define a CAM-Part from a SolidWorks model",
      "Program 2.5D milling operations",
      "Apply iMachining to cut cycle time",
      "Simulate and verify before posting",
      "Generate shop documentation",
    ],
    tools: ["SolidCAM", "SolidWorks", "iMachining", "Tool tables", "G-code"],
    roles: ["CAM Programmer", "CNC Machinist", "Production Engineer", "Tool Room Programmer"],
    projects: [
      { name: "iMachining pocket job", summary: "A pocketed part programmed conventionally and with iMachining, cycle times compared.", tech: ["SolidCAM"], level: "Intermediate", skills: ["Strategy choice", "Simulation", "Optimisation"], image: "/images/lab.webp" },
    ],
    keywords: ["solidcam course", "solidworks cam training", "imachining course", "cnc programming Hoshiarpur"],
  },
  {
    slug: "mastercam",
    title: "MasterCAM",
    short: "Mill and lathe programming on one of the most widely used CAM packages.",
    overview:
      "MasterCAM end to end: geometry, toolpaths, verification and posting, across both milling and turning, on the package most Indian job shops run.",
    duration: "6 Weeks",
    level: "Beginner to Intermediate",
    modules: [
      { title: "Geometry & setup", summary: "Getting the model and job ready.", topics: ["Geometry import", "Levels", "Stock setup", "Tool manager"], duration: "2 weeks", lessons: 8 },
      { title: "Mill toolpaths", summary: "Contour, pocket, drill and surface work.", topics: ["Contour", "Pocket", "Drill", "Surface finishing"], duration: "2 weeks", lessons: 8 },
      { title: "Lathe & posting", summary: "Turning operations and machine-ready output.", topics: ["Roughing & finishing", "Threading", "Parting", "Post processing"], duration: "2 weeks", lessons: 8 },
    ],
    outcomes: [
      "Prepare geometry and stock for a job",
      "Program mill toolpaths for real parts",
      "Program basic turning operations",
      "Verify toolpaths against stock",
      "Post G-code for a specific controller",
    ],
    tools: ["MasterCAM", "Mill", "Lathe", "Verify", "Post processors"],
    roles: ["CNC Programmer", "CAM Engineer", "Machine Operator", "Production Planner"],
    projects: [
      { name: "Turned shaft programme", summary: "A shaft roughed, finished, threaded and parted, then posted.", tech: ["MasterCAM Lathe"], level: "Intermediate", skills: ["Turning", "Threading", "Posting"], image: "/images/lab.webp" },
    ],
    keywords: ["mastercam course Hoshiarpur", "mastercam training", "cnc mill lathe programming", "cam classes"],
  },
  {
    slug: "cnc-manual-programming",
    title: "CNC Manual Programming",
    short: "Writing G-code and M-code by hand, and reading anyone else's.",
    overview:
      "The skill that makes every CAM package make sense. You write programs by hand, dry-run them, and learn to debug a program at the machine when the post output is wrong.",
    duration: "6 Weeks",
    level: "Beginner to Intermediate",
    modules: [
      { title: "G-code fundamentals", summary: "The language, block by block.", topics: ["Program structure", "G & M codes", "Coordinate systems", "Offsets"], duration: "2 weeks", lessons: 8 },
      { title: "Milling programmes", summary: "Writing a mill programme from a drawing.", topics: ["Linear & circular", "Cutter comp", "Canned cycles", "Subprograms"], duration: "2 weeks", lessons: 8 },
      { title: "Turning & debugging", summary: "Lathe programming, then finding the fault.", topics: ["Turning cycles", "Threading", "Dry run", "Fault finding"], duration: "2 weeks", lessons: 8 },
    ],
    outcomes: [
      "Read and write G-code and M-code",
      "Set work and tool offsets correctly",
      "Use canned cycles and cutter compensation",
      "Write mill and lathe programmes by hand",
      "Debug a programme safely at the machine",
    ],
    tools: ["Fanuc controls", "G-code", "M-code", "Canned cycles", "Simulators"],
    roles: ["CNC Operator", "CNC Programmer", "Setter", "Production Technician"],
    projects: [
      { name: "Hand-written mill programme", summary: "A drawing turned into a verified programme without CAM.", tech: ["G-code"], level: "Beginner", skills: ["Program structure", "Offsets", "Canned cycles"], image: "/images/lab.webp" },
    ],
    keywords: ["cnc programming course Hoshiarpur", "g code training", "manual cnc programming", "fanuc programming course"],
  },
];

/** Each engineering course relates to the others in its own family. */
export const ENGINEERING_COURSES: Course[] = SPECS.map((spec) => {
  const course = makeCourse(spec);
  course.relatedCourses = SPECS.filter((s) => s.slug !== spec.slug)
    .map((s) => s.slug)
    .slice(0, 4);
  return course;
});
