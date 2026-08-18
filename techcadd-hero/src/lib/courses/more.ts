import {
  COMMON_AUDIENCE as A, COMMON_FAQS, COMMON_WHY, DEFAULT_COMPARISON, DEFAULT_INSTRUCTOR,
} from "./shared";
import type { Course, Module, Project } from "./types";

/**
 * The remaining catalogue entries, so every card in the mega menu opens its own
 * page instead of falling back to the index.
 *
 * Same approach as the engineering family: one factory, and per course only
 * what genuinely differs.
 */

type Spec = {
  slug: string;
  title: string;
  short: string;
  overview: string;
  category: string;
  duration: string;
  level: string;
  hero: string;
  modules: Module[];
  outcomes: string[];
  tools: string[];
  roles: string[];
  industries: string[];
  nextSteps: string[];
  projects: Project[];
  related: string[];
  keywords: string[];
};

function makeCourse(s: Spec): Course {
  return {
    slug: s.slug,
    title: s.title,
    shortDescription: s.short,
    overview: s.overview,
    category: s.category,
    level: s.level,
    duration: s.duration,
    mode: "Online / Offline",
    certification: true,
    heroImage: s.hero,
    video: { url: "", thumbnail: "/images/classroom.webp", caption: `Inside the ${s.title} track.` },
    audience: [A.beginners, A.students, A.freshers, A.professionals, A.switchers],
    whyChooseUs: COMMON_WHY,
    modules: s.modules,
    learningOutcomes: s.outcomes,
    tools: s.tools,
    careerOutcomes: {
      roles: s.roles,
      opportunities: ["Product and agency teams", "Freelance projects", "Campus placements", "In-house roles"],
      nextSteps: s.nextSteps,
      industries: s.industries,
    },
    projects: s.projects,
    instructor: DEFAULT_INSTRUCTOR,
    comparison: DEFAULT_COMPARISON,
    /* Real testimonials only — an empty array renders no reviews section. */
    reviews: [],
    faqs: [
      {
        q: "Is this course suitable for beginners?",
        a: `Yes. ${s.title} begins from fundamentals, and the pace is set so nothing is assumed.`,
      },
      {
        q: "What are the prerequisites?",
        a: "Basic computer familiarity. Anything else the track needs is introduced in the first module.",
      },
      ...COMMON_FAQS,
    ],
    relatedCourses: s.related,
    keywords: s.keywords,
  };
}

const SPECS: Spec[] = [
  /* ------------------------------ programming ----------------------------- */
  {
    slug: "c-programming",
    title: "C Programming",
    short: "Learn C programming from fundamentals to practical application development.",
    overview:
      "C from the ground up: types, control flow and functions, then pointers, memory and file handling — the foundation every later language builds on.",
    category: "Programming",
    duration: "3 Months",
    level: "Beginner",
    hero: "/images/mern.webp",
    modules: [
      { title: "C fundamentals", summary: "Types, operators and control flow.", topics: ["Data types", "Operators", "Conditionals", "Loops"], duration: "3 weeks", lessons: 12 },
      { title: "Functions & arrays", summary: "Structuring a program beyond main().", topics: ["Functions", "Scope", "Arrays", "Strings"], duration: "3 weeks", lessons: 12 },
      { title: "Pointers & memory", summary: "The part that makes C worth learning.", topics: ["Pointers", "Pointer arithmetic", "malloc & free", "Common leaks"], duration: "3 weeks", lessons: 12 },
      { title: "Structures & file handling", summary: "Modelling data and persisting it.", topics: ["Structs", "Unions", "File I/O", "Header files"], duration: "3 weeks", lessons: 12 },
    ],
    outcomes: ["Write and debug idiomatic C", "Reason about pointers and memory", "Model data with structs", "Read and write files", "Break a problem into functions"],
    tools: ["C", "GCC", "VS Code", "GDB", "Make"],
    roles: ["Software Engineer", "Embedded Developer", "Systems Programmer", "Firmware Trainee"],
    industries: ["Embedded systems", "Product engineering", "Automotive", "Consumer electronics"],
    nextSteps: ["C++ Programming", "Data structures & algorithms", "Embedded systems", "Operating systems"],
    projects: [
      { name: "Student record system", summary: "A console application over structs and file storage.", tech: ["C"], level: "Beginner", skills: ["Structs", "File I/O", "Functions"], image: "/images/lab.webp" },
      { name: "Text-based utility tool", summary: "Command-line parsing, dynamic memory and clean teardown.", tech: ["C"], level: "Intermediate", skills: ["Pointers", "Dynamic memory", "Strings"], image: "/images/classroom.webp" },
    ],
    related: ["cpp-programming", "java-programming", "python-programming", "kotlin-programming"],
    keywords: ["c course Hoshiarpur", "c programming training", "c language classes", "learn c programming"],
  },
  {
    slug: "cpp-programming",
    title: "C++ Programming",
    short: "The language behind systems, engines and anything that has to be fast.",
    overview:
      "C and C++ from syntax to memory: pointers, classes, templates and the STL, with the data structures interviews still ask about.",
    category: "Programming",
    duration: "3 Months",
    level: "Beginner to Advanced",
    hero: "/images/mern.webp",
    modules: [
      { title: "C fundamentals", summary: "Types, control flow and functions.", topics: ["Types", "Control flow", "Functions", "Arrays"], duration: "3 weeks", lessons: 12 },
      { title: "Pointers & memory", summary: "The part that makes or breaks a C++ developer.", topics: ["Pointers", "Dynamic memory", "References", "Leaks"], duration: "3 weeks", lessons: 12 },
      { title: "Object-oriented C++", summary: "Classes, inheritance and operator overloading.", topics: ["Classes", "Inheritance", "Polymorphism", "Operators"], duration: "3 weeks", lessons: 12 },
      { title: "STL & data structures", summary: "Containers, algorithms and complexity.", topics: ["Vectors & maps", "Iterators", "Algorithms", "Complexity"], duration: "3 weeks", lessons: 12 },
    ],
    outcomes: ["Write clean, idiomatic C++", "Reason about pointers and memory", "Model problems with classes", "Use the STL fluently", "Answer data-structure interview questions"],
    tools: ["C++", "GCC", "STL", "VS Code", "GDB", "CMake"],
    roles: ["Software Engineer", "Embedded Developer", "Game Programmer", "Systems Developer"],
    industries: ["Embedded systems", "Gaming", "Finance", "Product engineering"],
    nextSteps: ["Data structures & algorithms", "Java Programming", "Embedded systems", "System design"],
    projects: [
      { name: "Library management system", summary: "A console application built on classes and file storage.", tech: ["C++", "STL"], level: "Intermediate", skills: ["OOP", "File I/O", "Containers"], image: "/images/lab.webp" },
      { name: "Data structure library", summary: "Your own list, stack and tree, with tests.", tech: ["C++"], level: "Advanced", skills: ["Pointers", "Templates", "Complexity"], image: "/images/classroom.webp" },
    ],
    related: ["java-programming", "python-programming", "kotlin-programming", "full-stack-web-development"],
    keywords: ["c++ course Hoshiarpur", "c programming training", "data structures course", "cpp classes"],
  },
  {
    slug: "kotlin-programming",
    title: "Kotlin Programming",
    short: "Modern JVM language, and the default for Android development.",
    overview:
      "Kotlin from the language up: null safety, coroutines and the standard library, then Android fundamentals and a published app.",
    category: "Programming",
    duration: "3 Months",
    level: "Beginner to Intermediate",
    hero: "/images/mern.webp",
    modules: [
      { title: "Kotlin basics", summary: "Syntax, types and null safety.", topics: ["Variables", "Null safety", "Functions", "Collections"], duration: "3 weeks", lessons: 12 },
      { title: "OOP & functional Kotlin", summary: "Classes, data classes and higher-order functions.", topics: ["Classes", "Data classes", "Lambdas", "Extensions"], duration: "3 weeks", lessons: 12 },
      { title: "Coroutines", summary: "Concurrency without the callback mess.", topics: ["Suspend functions", "Scopes", "Flows", "Error handling"], duration: "2 weeks", lessons: 8 },
      { title: "Android fundamentals", summary: "Building and shipping an app.", topics: ["Activities", "Jetpack Compose", "Networking", "Publishing"], duration: "4 weeks", lessons: 16 },
    ],
    outcomes: ["Write idiomatic, null-safe Kotlin", "Use coroutines for async work", "Build an Android UI in Compose", "Call and handle APIs", "Publish a working app"],
    tools: ["Kotlin", "Android Studio", "Jetpack Compose", "Coroutines", "Retrofit", "Gradle"],
    roles: ["Android Developer", "Kotlin Developer", "Mobile Engineer", "Backend Developer"],
    industries: ["Mobile products", "E-commerce", "Fintech", "Startups"],
    nextSteps: ["Advanced Android", "Kotlin Multiplatform", "Java Programming", "Cloud & DevOps"],
    projects: [
      { name: "Notes app", summary: "A Compose app with local storage and search.", tech: ["Kotlin", "Compose"], level: "Beginner", skills: ["UI state", "Persistence", "Navigation"], image: "/images/form.webp" },
      { name: "API-backed weather app", summary: "Networking, coroutines and error states done properly.", tech: ["Kotlin", "Retrofit"], level: "Intermediate", skills: ["Coroutines", "Networking", "Error handling"], image: "/images/lab.webp" },
    ],
    related: ["java-programming", "cpp-programming", "python-programming", "full-stack-web-development"],
    keywords: ["kotlin course Hoshiarpur", "android development training", "jetpack compose course", "kotlin classes"],
  },
  {
    slug: "web-designing",
    title: "Web Designing",
    short: "Design and build interfaces that look right and work on every screen.",
    overview:
      "The design half of the web: layout, type, colour and responsive HTML/CSS, finishing with sites you have designed and built yourself.",
    category: "Web Development",
    duration: "2 Months",
    level: "Beginner",
    hero: "/images/digital.webp",
    modules: [
      { title: "Design fundamentals", summary: "Layout, hierarchy, type and colour.", topics: ["Grids", "Typography", "Colour", "Hierarchy"], duration: "2 weeks", lessons: 8 },
      { title: "HTML & CSS", summary: "Turning a design into a page.", topics: ["Semantic HTML", "Flexbox", "Grid", "Transitions"], duration: "3 weeks", lessons: 12 },
      { title: "Responsive design", summary: "One design, every screen.", topics: ["Breakpoints", "Fluid type", "Images", "Accessibility"], duration: "2 weeks", lessons: 8 },
      { title: "Figma to build", summary: "Designing in Figma and handing off to code.", topics: ["Components", "Auto layout", "Prototypes", "Handoff"], duration: "1 week", lessons: 5 },
    ],
    outcomes: ["Design a clean, hierarchical layout", "Build responsive pages in HTML and CSS", "Work confidently in Figma", "Meet basic accessibility standards", "Hand off a design a developer can build"],
    tools: ["HTML", "CSS", "Figma", "Flexbox", "CSS Grid", "VS Code"],
    roles: ["Web Designer", "UI Designer", "Frontend Assistant", "Freelance Designer"],
    industries: ["Agencies", "E-commerce", "Startups", "Freelance"],
    nextSteps: ["Web Development", "Full Stack Web Development", "UI/UX in depth", "WordPress"],
    projects: [
      { name: "Responsive landing page", summary: "Designed in Figma, built in HTML and CSS.", tech: ["Figma", "HTML", "CSS"], level: "Beginner", skills: ["Layout", "Responsive", "Type"], image: "/images/digital.webp" },
      { name: "Multi-page portfolio site", summary: "A consistent design system across several pages.", tech: ["HTML", "CSS"], level: "Intermediate", skills: ["Components", "Consistency", "Accessibility"], image: "/images/classroom.webp" },
    ],
    related: ["web-development", "full-stack-web-development", "wordpress", "digital-marketing"],
    keywords: ["web designing course Hoshiarpur", "html css training", "figma course", "responsive design classes"],
  },
  {
    slug: "web-development",
    title: "Web Development",
    short: "Build interactive websites with JavaScript and a modern front end.",
    overview:
      "Three months on the front end: JavaScript properly, the DOM, APIs and React, ending with deployed applications you built from a brief.",
    category: "Web Development",
    duration: "3 Months",
    level: "Beginner to Intermediate",
    hero: "/images/mern.webp",
    modules: [
      { title: "HTML & CSS refresher", summary: "The structure and styling you build on.", topics: ["Semantics", "Flexbox", "Grid", "Responsive"], duration: "2 weeks", lessons: 8 },
      { title: "JavaScript", summary: "The language and the browser APIs.", topics: ["Types & scope", "DOM", "Events", "Async & fetch"], duration: "4 weeks", lessons: 16 },
      { title: "React", summary: "Components, state and data fetching.", topics: ["Components", "Hooks", "Routing", "Forms"], duration: "4 weeks", lessons: 16 },
      { title: "Build & deploy", summary: "Version control and getting it online.", topics: ["Git", "Build tools", "Environment config", "Deployment"], duration: "2 weeks", lessons: 8 },
    ],
    outcomes: ["Write modern JavaScript with confidence", "Manipulate the DOM and handle events", "Build React applications with state", "Consume REST APIs", "Deploy a site to production"],
    tools: ["HTML", "CSS", "JavaScript", "React", "Git", "GitHub", "Vite", "Vercel"],
    roles: ["Frontend Developer", "Web Developer", "React Developer", "Freelance Developer"],
    industries: ["SaaS", "Agencies", "E-commerce", "Startups"],
    nextSteps: ["Full Stack Web Development", "MERN Stack Development", "TypeScript", "Cloud & DevOps"],
    projects: [
      { name: "Interactive dashboard", summary: "A React dashboard consuming a live API.", tech: ["React", "REST"], level: "Intermediate", skills: ["State", "Data fetching", "Components"], image: "/images/data-science.webp" },
      { name: "Deployed portfolio", summary: "Your own site, built and shipped.", tech: ["JavaScript", "Vercel"], level: "Beginner", skills: ["DOM", "Responsive", "Deployment"], image: "/images/lab.webp" },
    ],
    related: ["full-stack-web-development", "mern-stack-development", "web-designing", "mean-stack-development"],
    keywords: ["web development course Hoshiarpur", "javascript training", "react course", "frontend classes"],
  },
  {
    slug: "mean-stack-development",
    title: "MEAN Stack Development",
    short: "MongoDB, Express, Angular and Node — one JavaScript stack, end to end.",
    overview:
      "Five months on the Angular side of the JavaScript stack: TypeScript-first components, Express APIs and MongoDB, shipped with tests and a deployment pipeline.",
    category: "Web Development",
    duration: "5 Months",
    level: "Intermediate",
    hero: "/images/mern.webp",
    modules: [
      { title: "TypeScript & ES6+", summary: "The language Angular expects.", topics: ["Types", "Interfaces", "Decorators", "Modules"], duration: "3 weeks", lessons: 12 },
      { title: "Angular", summary: "Components, services and reactive patterns.", topics: ["Components", "Services & DI", "RxJS", "Routing"], duration: "5 weeks", lessons: 20 },
      { title: "Node & Express APIs", summary: "The server half.", topics: ["REST design", "Middleware", "Auth", "Validation"], duration: "4 weeks", lessons: 16 },
      { title: "MongoDB & deployment", summary: "Data modelling and shipping.", topics: ["Schema design", "Aggregation", "Testing", "Deployment"], duration: "4 weeks", lessons: 14 },
    ],
    outcomes: ["Build Angular applications in TypeScript", "Handle async flows with RxJS", "Design and secure Express APIs", "Model data in MongoDB", "Deploy a full MEAN application"],
    tools: ["Angular", "TypeScript", "Node.js", "Express", "MongoDB", "RxJS", "Jasmine", "Git"],
    roles: ["MEAN Stack Developer", "Angular Developer", "Full Stack Engineer", "Node.js Developer"],
    industries: ["Enterprise applications", "SaaS", "Fintech", "Consulting"],
    nextSteps: ["MERN Stack Development", "Cloud & DevOps", "System design", "Testing in depth"],
    projects: [
      { name: "Enterprise admin portal", summary: "Role-based Angular front end over an Express API.", tech: ["Angular", "Express", "MongoDB"], level: "Advanced", skills: ["RxJS", "Auth", "Data modelling"], image: "/images/form.webp" },
      { name: "Task management app", summary: "CRUD, validation and tests end to end.", tech: ["Angular", "Node.js"], level: "Intermediate", skills: ["Forms", "Services", "Testing"], image: "/images/lab.webp" },
    ],
    related: ["mern-stack-development", "full-stack-web-development", "web-development", "java-programming"],
    keywords: ["mean stack course Hoshiarpur", "angular training", "node express course", "typescript classes"],
  },
  {
    slug: "php-full-stack",
    title: "PHP Full Stack",
    short: "PHP, MySQL and Laravel — the stack a large share of the web still runs on.",
    overview:
      "Four months building database-backed applications in PHP: core language, MySQL, then Laravel with authentication, testing and deployment.",
    category: "Web Development",
    duration: "4 Months",
    level: "Beginner to Advanced",
    hero: "/images/cloud.webp",
    modules: [
      { title: "PHP fundamentals", summary: "Syntax, forms and sessions.", topics: ["Syntax", "Forms", "Sessions", "File handling"], duration: "3 weeks", lessons: 12 },
      { title: "MySQL", summary: "Schema design and queries that scale.", topics: ["Schema design", "Joins", "Indexes", "Transactions"], duration: "3 weeks", lessons: 12 },
      { title: "Laravel", summary: "The framework most PHP jobs ask for.", topics: ["Routing", "Eloquent", "Blade", "Auth"], duration: "5 weeks", lessons: 20 },
      { title: "Project & deployment", summary: "Shipping a real application.", topics: ["Testing", "Queues", "Hosting", "Security"], duration: "3 weeks", lessons: 12 },
    ],
    outcomes: ["Write structured, secure PHP", "Design and query MySQL schemas", "Build Laravel applications with Eloquent", "Implement authentication and roles", "Deploy a PHP application to a server"],
    tools: ["PHP", "MySQL", "Laravel", "Composer", "Blade", "phpMyAdmin", "Git"],
    roles: ["PHP Developer", "Laravel Developer", "Backend Developer", "Full Stack Developer"],
    industries: ["Agencies", "E-commerce", "CMS platforms", "Small business software"],
    nextSteps: ["Full Stack Web Development", "Cloud & DevOps", "API design", "WordPress"],
    projects: [
      { name: "E-commerce backend", summary: "Products, cart and orders on Laravel and MySQL.", tech: ["Laravel", "MySQL"], level: "Advanced", skills: ["Eloquent", "Auth", "Payments"], image: "/images/mern.webp" },
      { name: "Content management tool", summary: "A CRUD admin with roles and validation.", tech: ["PHP", "MySQL"], level: "Intermediate", skills: ["Sessions", "Validation", "Security"], image: "/images/classroom.webp" },
    ],
    related: ["full-stack-web-development", "web-development", "wordpress", "mean-stack-development"],
    keywords: ["php course Hoshiarpur", "laravel training", "mysql course", "php full stack classes"],
  },

  /* ------------------------------- marketing ------------------------------ */
  {
    slug: "seo",
    title: "SEO",
    short: "Earn search traffic that keeps arriving after you stop paying for it.",
    overview:
      "Six weeks of search: keyword research, on-page and technical work, link building and the measurement that proves any of it worked.",
    category: "Marketing",
    duration: "6 Weeks",
    level: "Beginner to Intermediate",
    hero: "/images/digital.webp",
    modules: [
      { title: "How search works", summary: "Crawling, indexing and ranking.", topics: ["Crawling", "Indexing", "Ranking signals", "Intent"], duration: "1 week", lessons: 5 },
      { title: "Keyword & content", summary: "Finding demand and writing for it.", topics: ["Keyword research", "Clustering", "Content briefs", "On-page"], duration: "2 weeks", lessons: 8 },
      { title: "Technical SEO", summary: "The problems that cap a site's ceiling.", topics: ["Site speed", "Schema", "Sitemaps", "Crawl budget"], duration: "2 weeks", lessons: 8 },
      { title: "Links & measurement", summary: "Authority, and proving results.", topics: ["Link building", "Search Console", "Rank tracking", "Reporting"], duration: "1 week", lessons: 5 },
    ],
    outcomes: ["Research keywords by intent", "Write and optimise pages that rank", "Run a technical audit", "Build links without risking penalties", "Report organic performance honestly"],
    tools: ["Google Search Console", "SEMrush", "Ahrefs", "Screaming Frog", "GA4", "Schema markup"],
    roles: ["SEO Specialist", "Content Strategist", "Digital Marketer", "Freelance SEO Consultant"],
    industries: ["E-commerce", "Publishing", "Local services", "SaaS"],
    nextSteps: ["Digital Marketing", "Google Ads", "Data Analytics", "Content strategy"],
    projects: [
      { name: "Full technical audit", summary: "Audit a live site, fix what matters, measure the movement.", tech: ["Search Console", "Screaming Frog"], level: "Intermediate", skills: ["Auditing", "Prioritisation", "Measurement"], image: "/images/digital.webp" },
      { name: "Content cluster build", summary: "A pillar page and supporting articles, planned from keyword data.", tech: ["SEMrush", "WordPress"], level: "Beginner", skills: ["Research", "On-page", "Internal linking"], image: "/images/classroom.webp" },
    ],
    related: ["digital-marketing", "google-ads", "wordpress", "social-media-marketing"],
    keywords: ["seo course Hoshiarpur", "search engine optimisation training", "technical seo course", "seo classes"],
  },
  {
    slug: "google-ads",
    title: "Google Ads",
    short: "Search, shopping and display campaigns run against a real budget.",
    overview:
      "Six weeks inside Google Ads: account structure, keywords, ad copy, bidding and the reporting that ties spend to revenue.",
    category: "Marketing",
    duration: "6 Weeks",
    level: "Beginner to Intermediate",
    hero: "/images/digital.webp",
    modules: [
      { title: "Account structure", summary: "Campaigns, ad groups and why structure decides cost.", topics: ["Campaign types", "Ad groups", "Budgets", "Settings"], duration: "1 week", lessons: 5 },
      { title: "Keywords & copy", summary: "Match types, negatives and ads that earn the click.", topics: ["Match types", "Negatives", "Ad copy", "Extensions"], duration: "2 weeks", lessons: 8 },
      { title: "Bidding & optimisation", summary: "Spending where it returns.", topics: ["Bid strategies", "Quality Score", "A/B tests", "Landing pages"], duration: "2 weeks", lessons: 8 },
      { title: "Shopping & reporting", summary: "Product ads and proving the result.", topics: ["Merchant Centre", "Shopping", "Conversion tracking", "Reporting"], duration: "1 week", lessons: 5 },
    ],
    outcomes: ["Structure an account for control", "Choose match types and negatives deliberately", "Write and test ad copy", "Set bid strategies against a goal", "Track conversions and report on ROAS"],
    tools: ["Google Ads", "Merchant Centre", "GA4", "Google Tag Manager", "Looker Studio", "Keyword Planner"],
    roles: ["PPC Specialist", "Performance Marketer", "Campaign Manager", "Freelance Ads Consultant"],
    industries: ["E-commerce", "Local services", "EdTech", "Lead generation"],
    nextSteps: ["Digital Marketing", "SEO", "Data Analytics", "Conversion optimisation"],
    projects: [
      { name: "Live search campaign", summary: "A campaign planned, launched and optimised on a supervised budget.", tech: ["Google Ads", "GA4"], level: "Intermediate", skills: ["Structure", "Bidding", "Reporting"], image: "/images/digital.webp" },
      { name: "Shopping feed setup", summary: "A product feed and shopping campaign from scratch.", tech: ["Merchant Centre"], level: "Beginner", skills: ["Feeds", "Targeting", "Tracking"], image: "/images/form.webp" },
    ],
    related: ["digital-marketing", "seo", "social-media-marketing", "data-analytics"],
    keywords: ["google ads course Hoshiarpur", "ppc training", "adwords course", "shopping ads classes"],
  },
  {
    slug: "social-media-marketing",
    title: "Social Media Marketing",
    short: "Paid and organic social that earns attention rather than buying all of it.",
    overview:
      "Six weeks across Meta, Instagram and LinkedIn: audience research, creative testing, community and the paid mechanics behind each platform.",
    category: "Marketing",
    duration: "6 Weeks",
    level: "Beginner",
    hero: "/images/digital.webp",
    modules: [
      { title: "Strategy & audience", summary: "Who you are talking to, and where.", topics: ["Audience research", "Positioning", "Platform choice", "Calendars"], duration: "1 week", lessons: 5 },
      { title: "Organic content", summary: "Content people choose to watch.", topics: ["Formats", "Hooks", "Community", "Scheduling"], duration: "2 weeks", lessons: 8 },
      { title: "Meta Ads", summary: "Targeting, creative and budget.", topics: ["Ads Manager", "Audiences", "Creative testing", "Retargeting"], duration: "2 weeks", lessons: 8 },
      { title: "Measurement", summary: "What actually moved.", topics: ["Pixel setup", "Attribution", "Reporting", "Iteration"], duration: "1 week", lessons: 5 },
    ],
    outcomes: ["Build a platform-appropriate strategy", "Plan and produce a content calendar", "Run and optimise Meta ad campaigns", "Set up tracking and retargeting", "Report on social performance"],
    tools: ["Meta Ads Manager", "Instagram", "LinkedIn", "Canva", "Meta Pixel", "Buffer"],
    roles: ["Social Media Manager", "Performance Marketer", "Content Creator", "Community Manager"],
    industries: ["D2C brands", "Hospitality", "EdTech", "Agencies"],
    nextSteps: ["Digital Marketing", "Google Ads", "Content strategy", "Data Analytics"],
    projects: [
      { name: "Paid social campaign", summary: "Audience, creative and budget run end to end.", tech: ["Meta Ads"], level: "Intermediate", skills: ["Targeting", "Creative testing", "Reporting"], image: "/images/digital.webp" },
      { name: "30-day content calendar", summary: "A month of planned, produced and scheduled content.", tech: ["Canva", "Buffer"], level: "Beginner", skills: ["Planning", "Copywriting", "Design"], image: "/images/classroom.webp" },
    ],
    related: ["digital-marketing", "google-ads", "seo", "shopify"],
    keywords: ["social media marketing course Hoshiarpur", "meta ads training", "instagram marketing course", "smm classes"],
  },
  {
    slug: "wordpress",
    title: "WordPress",
    short: "Build, customise and maintain sites on the CMS that runs much of the web.",
    overview:
      "Four weeks from install to launch: themes, plugins, page builders, performance and the security basics every live site needs.",
    category: "Web Development",
    duration: "4 Weeks",
    level: "Beginner",
    hero: "/images/cloud.webp",
    modules: [
      { title: "Setup & themes", summary: "Hosting, install and choosing a theme.", topics: ["Hosting", "Install", "Themes", "Customiser"], duration: "1 week", lessons: 5 },
      { title: "Pages & builders", summary: "Building pages without writing code.", topics: ["Gutenberg", "Elementor", "Templates", "Menus"], duration: "1 week", lessons: 5 },
      { title: "Plugins & WooCommerce", summary: "Extending the site, including selling.", topics: ["Essential plugins", "WooCommerce", "Forms", "SEO plugins"], duration: "1 week", lessons: 5 },
      { title: "Performance & security", summary: "Keeping it fast and unbroken.", topics: ["Caching", "Images", "Backups", "Hardening"], duration: "1 week", lessons: 5 },
    ],
    outcomes: ["Install and configure WordPress", "Build pages with a builder", "Set up a WooCommerce store", "Improve site speed measurably", "Back up and secure a live site"],
    tools: ["WordPress", "Elementor", "WooCommerce", "Yoast", "cPanel", "UpdraftPlus"],
    roles: ["WordPress Developer", "Web Designer", "Freelance Site Builder", "Digital Marketer"],
    industries: ["Small business", "Agencies", "Publishing", "E-commerce"],
    nextSteps: ["Web Designing", "SEO", "PHP Full Stack", "Shopify"],
    projects: [
      { name: "Business website", summary: "A complete multi-page site, launched on real hosting.", tech: ["WordPress", "Elementor"], level: "Beginner", skills: ["Themes", "Pages", "Launch"], image: "/images/digital.webp" },
      { name: "WooCommerce store", summary: "Products, checkout and shipping configured end to end.", tech: ["WooCommerce"], level: "Intermediate", skills: ["Products", "Payments", "Performance"], image: "/images/form.webp" },
    ],
    related: ["web-designing", "shopify", "seo", "php-full-stack"],
    keywords: ["wordpress course Hoshiarpur", "elementor training", "woocommerce course", "website building classes"],
  },
  {
    slug: "shopify",
    title: "Shopify",
    short: "Launch and run an online store that converts.",
    overview:
      "Four weeks building a Shopify store: setup, theme customisation, products, payments, apps and the conversion work that follows launch.",
    category: "Marketing",
    duration: "4 Weeks",
    level: "Beginner",
    hero: "/images/digital.webp",
    modules: [
      { title: "Store setup", summary: "Account, domain and settings.", topics: ["Setup", "Domains", "Payments", "Shipping"], duration: "1 week", lessons: 5 },
      { title: "Themes & products", summary: "Making it look and read right.", topics: ["Theme editor", "Collections", "Product pages", "Navigation"], duration: "1 week", lessons: 5 },
      { title: "Apps & automation", summary: "Extending the store sensibly.", topics: ["App selection", "Email flows", "Reviews", "Upsells"], duration: "1 week", lessons: 5 },
      { title: "Conversion & analytics", summary: "Turning traffic into orders.", topics: ["CRO basics", "Analytics", "Abandoned carts", "Reporting"], duration: "1 week", lessons: 5 },
    ],
    outcomes: ["Set up a store end to end", "Customise a theme without breaking it", "Configure payments and shipping", "Automate email flows", "Read store analytics and act on them"],
    tools: ["Shopify", "Shopify Theme Editor", "Klaviyo", "Google Analytics", "Meta Pixel"],
    roles: ["Shopify Developer", "E-commerce Manager", "Freelance Store Builder", "Digital Marketer"],
    industries: ["D2C brands", "Retail", "Dropshipping", "Agencies"],
    nextSteps: ["Digital Marketing", "Social Media Marketing", "SEO", "WordPress"],
    projects: [
      { name: "Launch-ready store", summary: "A full store with products, payments and shipping live.", tech: ["Shopify"], level: "Beginner", skills: ["Setup", "Theming", "Payments"], image: "/images/digital.webp" },
      { name: "Conversion improvement sprint", summary: "Measure, change, re-measure on a live store.", tech: ["Shopify", "GA4"], level: "Intermediate", skills: ["CRO", "Analytics", "Email"], image: "/images/form.webp" },
    ],
    related: ["digital-marketing", "wordpress", "social-media-marketing", "seo"],
    keywords: ["shopify course Hoshiarpur", "ecommerce training", "dropshipping course", "shopify store classes"],
  },

  /* --------------------------------- data --------------------------------- */
  {
    slug: "power-bi",
    title: "Power BI",
    short: "Model data and build dashboards the business will actually use.",
    overview:
      "Six weeks in Power BI: connecting and shaping with Power Query, modelling relationships, writing DAX and publishing dashboards that refresh.",
    category: "Data & AI",
    duration: "6 Weeks",
    level: "Beginner to Intermediate",
    hero: "/images/data-science.webp",
    modules: [
      { title: "Connect & transform", summary: "Power Query, and cleaning at the source.", topics: ["Connectors", "Power Query", "Cleaning", "Merging"], duration: "1 week", lessons: 5 },
      { title: "Data modelling", summary: "Relationships and star schemas.", topics: ["Relationships", "Star schema", "Date tables", "Cardinality"], duration: "2 weeks", lessons: 8 },
      { title: "DAX", summary: "Measures that answer real questions.", topics: ["Calculated columns", "Measures", "CALCULATE", "Time intelligence"], duration: "2 weeks", lessons: 8 },
      { title: "Dashboards & sharing", summary: "Design, publish and refresh.", topics: ["Visual design", "Bookmarks", "Publishing", "Scheduled refresh"], duration: "1 week", lessons: 5 },
    ],
    outcomes: ["Clean and shape data in Power Query", "Build a sound star-schema model", "Write DAX measures with confidence", "Design dashboards for decisions", "Publish and schedule refreshes"],
    tools: ["Power BI Desktop", "Power Query", "DAX", "Power BI Service", "Excel", "SQL"],
    roles: ["BI Developer", "Data Analyst", "Reporting Analyst", "Business Analyst"],
    industries: ["Finance", "Retail", "Manufacturing", "Healthcare"],
    nextSteps: ["Tableau", "Data Analytics", "SQL in depth", "Machine Learning"],
    projects: [
      { name: "Executive sales dashboard", summary: "A modelled, DAX-driven dashboard with scheduled refresh.", tech: ["Power BI", "DAX"], level: "Intermediate", skills: ["Modelling", "DAX", "Design"], image: "/images/data-science.webp" },
      { name: "Operations report", summary: "Power Query cleaning feeding a daily operations view.", tech: ["Power Query"], level: "Beginner", skills: ["Cleaning", "Merging", "Visuals"], image: "/images/form.webp" },
    ],
    related: ["tableau", "data-analytics", "machine-learning", "artificial-intelligence"],
    keywords: ["power bi course Hoshiarpur", "dax training", "power query course", "bi dashboard classes"],
  },
  {
    slug: "data-science",
    title: "Data Science",
    short: "Statistics, Python and modelling, plus the storytelling that sells the result.",
    overview:
      "Five months across the data science workflow: framing a question, cleaning the data, modelling it honestly and presenting a result someone will act on.",
    category: "Data & AI",
    duration: "5 Months",
    level: "Beginner to Advanced",
    hero: "/images/data-science.webp",
    modules: [
      { title: "Python & data handling", summary: "The toolkit.", topics: ["Python", "Pandas", "NumPy", "Notebooks"], duration: "4 weeks", lessons: 16 },
      { title: "Statistics", summary: "Enough inference to avoid confident wrong answers.", topics: ["Distributions", "Hypothesis testing", "Confidence", "Sampling"], duration: "4 weeks", lessons: 16 },
      { title: "Modelling", summary: "Supervised methods and honest validation.", topics: ["Regression", "Classification", "Validation", "Metrics"], duration: "5 weeks", lessons: 20 },
      { title: "Communication", summary: "The half that decides whether the work matters.", topics: ["Visualisation", "Narrative", "Dashboards", "Presenting"], duration: "3 weeks", lessons: 12 },
    ],
    outcomes: ["Frame a business question as a data problem", "Clean and reshape messy datasets", "Apply statistics without over-claiming", "Build and validate predictive models", "Present findings so a decision follows"],
    tools: ["Python", "Pandas", "NumPy", "scikit-learn", "Matplotlib", "SQL", "Jupyter", "Power BI"],
    roles: ["Data Scientist", "Data Analyst", "Research Analyst", "Analytics Consultant"],
    industries: ["Finance", "Healthcare", "Retail", "Consulting"],
    nextSteps: ["Machine Learning", "Artificial Intelligence", "Data Analytics", "Cloud & DevOps"],
    projects: [
      { name: "End-to-end analysis", summary: "One question taken from raw data to a presented recommendation.", tech: ["Python", "Pandas"], level: "Advanced", skills: ["Framing", "Analysis", "Presenting"], image: "/images/data-science.webp" },
      { name: "Predictive model", summary: "A validated model with explained drivers.", tech: ["scikit-learn"], level: "Intermediate", skills: ["Modelling", "Validation", "Explainability"], image: "/images/ai.webp" },
    ],
    related: ["data-analytics", "machine-learning", "artificial-intelligence", "power-bi"],
    keywords: ["data science course Hoshiarpur", "python data science training", "statistics course", "data scientist classes"],
  },
  {
    slug: "deep-learning",
    title: "Deep Learning",
    short: "Neural networks for vision and language, trained and deployed.",
    overview:
      "Four months on neural networks: the architectures that matter, the training practices that make them converge, and getting a trained model into production.",
    category: "Data & AI",
    duration: "4 Months",
    level: "Advanced",
    hero: "/images/ai.webp",
    modules: [
      { title: "Neural network foundations", summary: "How a network actually learns.", topics: ["Perceptrons", "Backpropagation", "Optimisers", "Regularisation"], duration: "4 weeks", lessons: 16 },
      { title: "Computer vision", summary: "CNNs and the vision toolkit.", topics: ["CNNs", "Augmentation", "Transfer learning", "Detection"], duration: "4 weeks", lessons: 16 },
      { title: "Sequences & language", summary: "From RNNs to transformers.", topics: ["RNNs", "Attention", "Transformers", "Fine-tuning"], duration: "4 weeks", lessons: 16 },
      { title: "Deployment", summary: "Serving a model at a sensible cost.", topics: ["Export formats", "Serving", "Quantisation", "Monitoring"], duration: "3 weeks", lessons: 12 },
    ],
    outcomes: ["Explain how a network trains", "Build CNNs for image tasks", "Apply transfer learning effectively", "Fine-tune transformer models", "Serve a trained model behind an API"],
    tools: ["PyTorch", "TensorFlow", "Keras", "Hugging Face", "OpenCV", "CUDA", "ONNX"],
    roles: ["Deep Learning Engineer", "Computer Vision Engineer", "NLP Engineer", "AI Researcher"],
    industries: ["Healthcare imaging", "Manufacturing QA", "Autonomous systems", "Language products"],
    nextSteps: ["Artificial Intelligence", "MLOps", "Edge deployment", "Research methods"],
    projects: [
      { name: "Image classifier", summary: "A CNN trained with augmentation and transfer learning.", tech: ["PyTorch"], level: "Advanced", skills: ["CNNs", "Augmentation", "Evaluation"], image: "/images/ai.webp" },
      { name: "Fine-tuned language model", summary: "A transformer fine-tuned on a domain dataset.", tech: ["Hugging Face"], level: "Advanced", skills: ["Fine-tuning", "Tokenisation", "Metrics"], image: "/images/lab.webp" },
    ],
    related: ["artificial-intelligence", "machine-learning", "data-science", "python-programming"],
    keywords: ["deep learning course Hoshiarpur", "neural networks training", "pytorch course", "computer vision classes"],
  },
];

export const MORE_COURSES: Course[] = SPECS.map(makeCourse);
