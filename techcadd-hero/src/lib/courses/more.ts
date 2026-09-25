import {
  COMMON_AUDIENCE as A, COMMON_FAQS, COMMON_WHY, DEFAULT_INSTRUCTOR,
} from "./shared";
import type { Course, Instructor, Module, Project } from "./types";

/**
 * The remaining catalogue entries, so every card in the mega menu opens its own
 * page instead of falling back to the index.
 *
 * Same approach as the engineering family: one factory, and per course only
 * what genuinely differs.
 */

export type Spec = {
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

  /*
   * Optional overrides. Every field below has a sensible shared default, so a
   * course only writes one when its own copy genuinely differs — which is what
   * keeps the rest of this file to a handful of lines per track.
   */

  /** Replaces the generated "Inside the X track." line. */
  videoCaption?: string;
  /** Replaces the shared beginner/student/fresher audience blocks. */
  audience?: { label: string; copy: string }[];
  /** Replaces COMMON_WHY where a course argues its own case. */
  whyChooseUs?: { title: string; copy: string }[];
  /** A line of copy per career role, shown instead of bare role chips. */
  roleDetails?: { role: string; copy: string }[];
  /** Replaces DEFAULT_INSTRUCTOR's "Why learn with us?" panel. */
  instructor?: Instructor;
};

export function makeCourse(s: Spec): Course {
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
    video: {
      url: "",
      thumbnail: "/images/classroom.webp",
      caption: s.videoCaption ?? `Inside the ${s.title} track.`,
    },
    audience: s.audience ?? [A.beginners, A.students, A.freshers, A.professionals, A.switchers],
    whyChooseUs: s.whyChooseUs ?? COMMON_WHY,
    modules: s.modules,
    learningOutcomes: s.outcomes,
    tools: s.tools,
    careerOutcomes: {
      roles: s.roles,
      ...(s.roleDetails ? { roleDetails: s.roleDetails } : {}),
      opportunities: ["Product and agency teams", "Freelance projects", "Campus placements", "In-house roles"],
      nextSteps: s.nextSteps,
      industries: s.industries,
    },
    projects: s.projects,
    instructor: s.instructor ?? DEFAULT_INSTRUCTOR,
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
    slug: "web-designing",
    title: "Web Designing",
    short:
      "Design and build websites that look right and work on every screen — HTML5, CSS3, JavaScript, Bootstrap and responsive layout.",
    overview:
      "Prepare for a career in web design with structured training in Hoshiarpur. You study website design, HTML, CSS, JavaScript, responsive design and user interface work, then put each of them into practice. Built for beginners: the course teaches website creation step by step, so creative and technical skill grow together rather than one waiting on the other.",
    category: "Web Development",
    duration: "2 Months",
    level: "Beginner",
    hero: "/images/courses/web-designing.webp",
    videoCaption:
      "Watch. Learn. Design. See how students work through the concepts behind building websites, get practical design training, and move through a course structured around real practice.",
    audience: [
      {
        label: "Students & freshers",
        copy: "Begin your web journey by mastering HTML, CSS and JavaScript fundamentals and the skills modern responsive websites need.",
      },
      {
        label: "BCA & MCA students",
        copy: "Expand your web development skills and apply website design concepts to college assignments.",
      },
      {
        label: "Aspiring web designers",
        copy: "Learn every skill needed to build attractive, responsive websites.",
      },
      {
        label: "Career changers",
        copy: "Gain practical skills and get ready to move into web design work.",
      },
      {
        label: "Creative students",
        copy: "Combine creative skill with technology across layout, typography, colour, responsive design and user interface.",
      },
      {
        label: "Working professionals",
        copy: "Develop digital skills and learn how to design and manage professional websites.",
      },
    ],
    whyChooseUs: [
      {
        title: "Web design training for beginners",
        copy: "Start with the basics of website design and progress to modern concepts through simple instruction, worked examples and exercises.",
      },
      {
        title: "Hands-on design experience",
        copy: "Move from theory to real work: design web pages, build layouts, style elements and make sites responsive.",
      },
      {
        title: "Contemporary web technologies",
        copy: "Work with HTML5, CSS3, JavaScript, Bootstrap, responsive design and user interface practice.",
      },
      {
        title: "Practical website projects",
        copy: "Build real website projects and learn how professional sites are designed, styled and optimised across screen sizes.",
      },
      {
        title: "Designing creatively",
        copy: "Turn your own ideas into attractive websites through demonstrations, design assignments, doubt solving and technical guidance.",
      },
      {
        title: "Career-ready design skills",
        copy: "Gain the skills that support internships, freelancing, web design roles and further study of web technologies.",
      },
    ],
    modules: [
      {
        title: "Web designing basics",
        summary: "How websites work — structure, browsers, domains, web hosting and the basic elements of a page.",
        topics: ["Website structure", "Browsers", "Domains & hosting", "Page elements"],
        duration: "1 week",
        lessons: 6,
      },
      {
        title: "HTML basics",
        summary: "HTML syntax and elements — headings, paragraphs, links, images, lists, tables and forms.",
        topics: ["Headings & paragraphs", "Links & images", "Lists & tables", "Forms"],
        duration: "2 weeks",
        lessons: 10,
      },
      {
        title: "CSS styling & page layout",
        summary: "Selectors, colour, fonts, backgrounds, borders, spacing, positioning and advanced page styling.",
        topics: ["Selectors", "Colour & typography", "Box model & spacing", "Positioning"],
        duration: "2 weeks",
        lessons: 12,
      },
      {
        title: "Responsive web design",
        summary: "The principles and methods behind sites that adapt to desktop, tablet and mobile.",
        topics: ["Media queries", "Flexbox", "CSS Grid", "Mobile-first layout"],
        duration: "2 weeks",
        lessons: 10,
      },
      {
        title: "JavaScript basics",
        summary: "The JavaScript language — variables, data types, operators, functions, conditions and loops.",
        topics: ["Variables & types", "Operators", "Functions", "Conditions & loops"],
        duration: "2 weeks",
        lessons: 10,
      },
      {
        title: "User interface & user experience",
        summary: "Planning layouts, navigation, typography, visual hierarchy and usability.",
        topics: ["Layout planning", "Navigation", "Visual hierarchy", "Usability"],
        duration: "1 week",
        lessons: 8,
      },
      {
        title: "Bootstrap & frameworks",
        summary: "Building responsive layouts, navigation bars, cards, forms and buttons with Bootstrap.",
        topics: ["Grid system", "Navbars", "Cards & forms", "Components"],
        duration: "2 weeks",
        lessons: 10,
      },
      {
        title: "Website graphics & resources",
        summary: "Choosing and using images, icons, banners and fonts so a site looks considered rather than assembled.",
        topics: ["Images & icons", "Banners", "Web fonts", "Asset choice"],
        duration: "1 week",
        lessons: 6,
      },
      {
        title: "Forms & interactivity",
        summary: "Contact and registration forms, buttons, menus and sliders, with form validation.",
        topics: ["Contact forms", "Validation", "Menus & sliders", "Interactive components"],
        duration: "1 week",
        lessons: 8,
      },
      {
        title: "Website deployment & hosting",
        summary: "Domain names, web hosting, FTP, deployment and file management.",
        topics: ["Domains", "Hosting", "FTP & deployment", "File management"],
        duration: "1 week",
        lessons: 6,
      },
      {
        title: "Website optimisation",
        summary: "Page speed, image optimisation, mobile usability and accessible site structure.",
        topics: ["Page speed", "Image optimisation", "Mobile usability", "Accessibility"],
        duration: "1 week",
        lessons: 6,
      },
      {
        title: "Practice projects & career development",
        summary: "Real practice projects, landing pages and responsive builds, plus preparation for internships and design work.",
        topics: ["Landing pages", "Portfolio site", "Responsive build", "Interview preparation"],
        duration: "2 weeks",
        lessons: 10,
      },
    ],
    outcomes: [
      "Build standards-based pages with HTML5",
      "Style and lay out sites confidently with CSS3",
      "Make any layout responsive across desktop, tablet and mobile",
      "Add interactivity and form validation with JavaScript",
      "Apply user interface and usability principles to a design",
      "Deploy, host and optimise a finished website",
    ],
    tools: [
      "HTML5",
      "CSS3",
      "JavaScript",
      "Bootstrap",
      "Responsive Web Design",
      "Flexbox & CSS Grid",
      "VS Code",
      "Git & GitHub",
      "Figma / UI Design Tools",
      "Web Browsers & Developer Tools",
      "Domain & Web Hosting Basics",
      "SEO-Friendly Web Design",
    ],
    roles: [
      "Web Designer",
      "UI Designer",
      "Frontend Developer",
      "WordPress Designer",
      "UI/UX Designer",
      "Freelance Web Designer",
    ],
    roleDetails: [
      {
        role: "Web Designer",
        copy: "Create attractive, responsive websites for businesses, organisations and individuals.",
      },
      {
        role: "UI Designer",
        copy: "Build visually appealing interfaces through layout, typography, colour, components and design principles.",
      },
      {
        role: "Frontend Developer",
        copy: "Build the visual and interactive parts of a website with HTML, CSS and JavaScript.",
      },
      {
        role: "WordPress Designer",
        copy: "Build and customise websites on WordPress.",
      },
      {
        role: "UI/UX Designer",
        copy: "Shape the user experience through usability, navigation, visual layout and interaction.",
      },
      {
        role: "Freelance Web Designer",
        copy: "Design websites independently for clients, startups, businesses or personal brands.",
      },
    ],
    instructor: {
      heading: "Why learn web designing with us?",
      intro:
        "Design is judged by what ends up on the screen, so the sessions are built around building. Every concept arrives attached to a page you are making, and every page is reviewed the way client work would be.",
      points: [
        {
          title: "Learning through practice",
          copy: "Go beyond theory with website exercises, design assignments and project-based training.",
        },
        {
          title: "A program for beginners",
          copy: "Start at the basics and move toward building responsive, professional websites.",
        },
        {
          title: "Training with real-world tools",
          copy: "Work with HTML, CSS, JavaScript, Bootstrap, VS Code, Git, GitHub and Figma.",
        },
        {
          title: "Practical website creation",
          copy: "Build real websites, landing pages, portfolio sites and responsive layouts.",
        },
        {
          title: "Guided sessions with support",
          copy: "Learn through worked examples, practical work, problem solving and continuous support.",
        },
        {
          title: "Technical & creative career skills",
          copy: "Develop the mix of technical and creative skill that internships, freelance projects and interviews ask for.",
        },
      ],
    },
    industries: ["Digital agencies", "Startups", "E-commerce", "Freelance & studio work"],
    nextSteps: ["Frontend development", "React", "WordPress development", "UI/UX design"],
    projects: [
      {
        name: "Responsive business landing page",
        summary: "A single-page site built mobile-first, from a layout sketch to a deployed page.",
        tech: ["HTML5", "CSS3", "Flexbox"],
        level: "Beginner",
        skills: ["Layout", "Responsive design", "Typography"],
        image: "/images/lab.webp",
      },
      {
        name: "Personal portfolio website",
        summary: "A multi-page portfolio with navigation, a working contact form and validation.",
        tech: ["HTML5", "CSS3", "JavaScript"],
        level: "Intermediate",
        skills: ["Forms & validation", "Navigation", "Visual hierarchy"],
        image: "/images/classroom.webp",
      },
      {
        name: "Bootstrap e-commerce front page",
        summary: "Product grid, cards and navbar assembled with Bootstrap, then optimised for speed and mobile.",
        tech: ["Bootstrap", "CSS3", "JavaScript"],
        level: "Intermediate",
        skills: ["Bootstrap components", "Grid layout", "Optimisation"],
        image: "/images/digital.webp",
      },
    ],
    related: ["digital-marketing", "web-development"],
    keywords: [
      "best web designing course in hoshiarpur",
      "web designing courses in hoshiarpur",
      "web designing certification courses",
      "html css javascript classes hoshiarpur",
      "responsive web design training",
    ],
  },
  {
    slug: "web-development",
    title: "Web Development",
    short:
      "Frontend to backend — HTML, CSS, JavaScript, React, Node.js, databases and deployment, ending with applications you have shipped.",
    overview:
      "Launch your career in web development with structured training in Hoshiarpur. You learn to create responsive, interactive and functional websites using HTML, CSS, JavaScript, frontend frameworks, backend technologies, databases, APIs and the tools professional teams actually use. Designed for beginners, students, freshers and aspiring developers who want practical, industry-relevant skills rather than theory.",
    category: "Web Development",
    duration: "3 Months",
    level: "Beginner to Intermediate",
    hero: "/images/courses/web-development.webp",
    videoCaption:
      "Watch. Learn. Build. See how the training works in practice — learners working with coding tools, building website interfaces, practising development concepts and applying what they learn.",
    audience: [
      {
        label: "Students & freshers",
        copy: "Build a strong foundation in website creation, coding, responsive design and web development concepts.",
      },
      {
        label: "BCA & MCA students",
        copy: "Strengthen your technical knowledge through websites, applications, academic projects and practical development tasks.",
      },
      {
        label: "Aspiring developers",
        copy: "Learn frontend and backend concepts and understand how complete websites and web applications are built.",
      },
      {
        label: "Career shifters",
        copy: "Develop practical web development skills and prepare to move into the IT and software industry.",
      },
      {
        label: "Creative & tech enthusiasts",
        copy: "Turn creative ideas into engaging websites while getting hands-on with modern development technologies.",
      },
      {
        label: "Working professionals",
        copy: "Upgrade your technical capability with current tools, frameworks, APIs, databases and deployment practice.",
      },
    ],
    whyChooseUs: [
      {
        title: "Beginner-friendly learning path",
        copy: "Start with the fundamentals and progress toward advanced concepts through a structured approach.",
      },
      {
        title: "Practical, project-based training",
        copy: "Learn by writing code, completing assignments, developing websites and building real web applications.",
      },
      {
        title: "Frontend to backend",
        copy: "Understand the whole development process, from designing interfaces to building backend functionality and connecting databases.",
      },
      {
        title: "Modern development technologies",
        copy: "Work with HTML, CSS, JavaScript, React, Node.js, Express.js, APIs, databases, Git and GitHub.",
      },
      {
        title: "Portfolio-focused projects",
        copy: "Build websites and applications that demonstrate your skills in internships, interviews and freelance work.",
      },
      {
        title: "Guided learning & doubt support",
        copy: "Learn through examples, coding sessions, practical exercises, debugging and continuous technical guidance.",
      },
    ],
    modules: [
      {
        title: "Introduction to web development",
        summary: "How websites and web applications work — frontend and backend concepts, terminology and the development environment.",
        topics: ["How the web works", "Frontend vs backend", "Web terminology", "Environment setup"],
        duration: "1 week",
        lessons: 6,
      },
      {
        title: "HTML5 & website structure",
        summary: "HTML elements, headings, paragraphs, links, images, lists, tables, forms, semantic tags and page structure.",
        topics: ["Elements & structure", "Links & images", "Tables & forms", "Semantic tags"],
        duration: "1 week",
        lessons: 8,
      },
      {
        title: "CSS3 & web designing",
        summary: "Selectors, properties, colour, typography, spacing, positioning, layouts, Flexbox, Grid, transitions and animations.",
        topics: ["Selectors & properties", "Flexbox", "CSS Grid", "Transitions & animations"],
        duration: "2 weeks",
        lessons: 12,
      },
      {
        title: "Responsive web design",
        summary: "Building sites that adapt to desktop, tablet and mobile with responsive layouts, flexible elements and media queries.",
        topics: ["Media queries", "Flexible layouts", "Mobile-first", "Cross-device testing"],
        duration: "1 week",
        lessons: 8,
      },
      {
        title: "JavaScript programming",
        summary: "Variables, data types, operators, conditions, loops, functions, arrays, objects and the logic web development needs.",
        topics: ["Variables & types", "Functions", "Arrays & objects", "Programming logic"],
        duration: "2 weeks",
        lessons: 12,
      },
      {
        title: "DOM & website interactivity",
        summary: "The Document Object Model, events, forms, validation, dynamic content and user interaction.",
        topics: ["DOM traversal", "Events", "Forms & validation", "Dynamic content"],
        duration: "1 week",
        lessons: 10,
      },
      {
        title: "Modern JavaScript & APIs",
        summary: "ES6 features, modules, asynchronous programming, promises, the Fetch API, JSON and dynamic data.",
        topics: ["ES6 features", "Modules", "Promises & async", "Fetch & JSON"],
        duration: "2 weeks",
        lessons: 10,
      },
      {
        title: "Frontend development with React",
        summary: "React fundamentals — components, props, state, events, forms, hooks and routing.",
        topics: ["Components & props", "State & events", "Hooks", "Routing"],
        duration: "2 weeks",
        lessons: 14,
      },
      {
        title: "Backend development",
        summary: "Server-side programming, routing, requests and responses, middleware and authentication with Node.js and Express.js.",
        topics: ["Node.js", "Express routing", "Middleware", "Authentication concepts"],
        duration: "2 weeks",
        lessons: 12,
      },
      {
        title: "Databases & API integration",
        summary: "Database concepts, CRUD, SQL, connecting applications to data, REST APIs and frontend-backend communication.",
        topics: ["SQL & CRUD", "Database connection", "REST APIs", "JSON handling"],
        duration: "2 weeks",
        lessons: 12,
      },
      {
        title: "Git, GitHub & deployment",
        summary: "Version control with Git and GitHub, project basics, hosting, domains and publishing a site.",
        topics: ["Git basics", "GitHub workflow", "Hosting & domains", "Deployment"],
        duration: "1 week",
        lessons: 8,
      },
      {
        title: "Projects & career preparation",
        summary: "Build websites and applications, troubleshoot, create a portfolio and prepare for interviews.",
        topics: ["Project build", "Debugging", "Portfolio", "Interview preparation"],
        duration: "2 weeks",
        lessons: 10,
      },
    ],
    outcomes: [
      "Website structure and development fundamentals",
      "HTML5 and semantic web development",
      "CSS3 and modern website styling",
      "Responsive and mobile-friendly design",
      "JavaScript programming and logic building",
      "DOM manipulation and interactive websites",
      "Modern JavaScript and asynchronous programming",
      "React frontend development",
      "Backend development fundamentals",
      "REST APIs and JSON",
      "Database connectivity and CRUD operations",
      "Git and GitHub",
      "Website hosting and deployment",
      "Debugging and problem solving",
      "Real-world website and application development",
    ],
    tools: [
      "HTML5",
      "CSS3",
      "JavaScript",
      "VS Code",
      "Git & GitHub",
      "React",
      "Node.js",
      "Express.js",
      "SQL & Databases",
      "REST APIs & JSON",
      "Responsive Web Design",
      "Browser Developer Tools",
      "Web Hosting & Deployment",
    ],
    roles: [
      "Frontend Developer",
      "Backend Developer",
      "Full Stack Developer",
      "Web Developer",
      "React Developer",
      "Web Application Developer",
      "Freelance Web Developer",
      "Software Development Foundation",
    ],
    roleDetails: [
      {
        role: "Frontend Developer",
        copy: "Create responsive, interactive website interfaces using HTML, CSS, JavaScript and React.",
      },
      {
        role: "Backend Developer",
        copy: "Build server-side applications, APIs, business logic and database-connected solutions.",
      },
      {
        role: "Full Stack Developer",
        copy: "Work across frontend, backend, databases and APIs on complete web applications.",
      },
      {
        role: "Web Developer",
        copy: "Design, develop, maintain and improve websites and web-based solutions.",
      },
      {
        role: "React Developer",
        copy: "Build modern, interactive user interfaces using React and JavaScript.",
      },
      {
        role: "Web Application Developer",
        copy: "Develop functional web applications around business requirements and user needs.",
      },
      {
        role: "Freelance Web Developer",
        copy: "Build websites and applications for clients and independent projects.",
      },
      {
        role: "Software Development Foundation",
        copy: "Build a base that supports future growth into software engineering and advanced programming.",
      },
    ],
    instructor: {
      heading: "Why learn web development with us?",
      intro:
        "Web development is judged by what runs. Every concept here arrives attached to something you are building, and every build goes through review the way real work does.",
      points: [
        {
          title: "Practical learning approach",
          copy: "Coding exercises, assignments, website tasks and hands-on projects rather than theory alone.",
        },
        {
          title: "Industry-relevant curriculum",
          copy: "Technologies and practices widely used for building modern websites and web applications.",
        },
        {
          title: "Step-by-step training",
          copy: "Progress from HTML and CSS to JavaScript, React, backend, databases, APIs and deployment.",
        },
        {
          title: "Real-world projects",
          copy: "Projects that build coding confidence, problem-solving ability and portfolio quality.",
        },
        {
          title: "Expert guidance",
          copy: "Structured support with practical demonstrations, coding assistance, debugging help and doubt solving.",
        },
        {
          title: "Career-focused skills",
          copy: "Frontend, backend, database, API and version-control skills for internships, interviews and freelancing.",
        },
      ],
    },
    industries: ["Product companies", "Digital agencies", "Startups", "Freelance & remote work"],
    nextSteps: ["MERN stack", "Next.js", "TypeScript", "Cloud & DevOps"],
    projects: [
      {
        name: "Responsive multi-page website",
        summary: "A complete site built mobile-first, from semantic HTML through to deployment.",
        tech: ["HTML5", "CSS3", "JavaScript"],
        level: "Beginner",
        skills: ["Responsive design", "Semantic HTML", "Deployment"],
        image: "/images/lab.webp",
      },
      {
        name: "React dashboard with a live API",
        summary: "Components, state and routing, fed by data fetched asynchronously and rendered as it arrives.",
        tech: ["React", "REST APIs", "JSON"],
        level: "Intermediate",
        skills: ["Hooks", "Async data", "Routing"],
        image: "/images/classroom.webp",
      },
      {
        name: "Full stack task application",
        summary: "An Express API over a database, consumed by a React front end, with authentication and CRUD.",
        tech: ["Node.js", "Express.js", "SQL", "React"],
        level: "Advanced",
        skills: ["REST design", "CRUD", "Auth concepts"],
        image: "/images/cyber.webp",
      },
    ],
    related: ["web-designing"],
    keywords: [
      "best web development course in hoshiarpur",
      "web development training in hoshiarpur",
      "react and node js training",
      "frontend and backend course hoshiarpur",
      "full stack web development classes",
    ],
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
    hero: "/images/courses/seo.webp",
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
    hero: "/images/courses/google-ads.webp",
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
    related: ["digital-marketing", "seo", "social-media-marketing"],
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
    hero: "/images/courses/social-media-marketing.webp",
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
    related: ["digital-marketing", "google-ads", "seo"],
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
    hero: "/images/courses/wordpress.webp",
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
    related: ["web-designing", "seo"],
    keywords: ["wordpress course Hoshiarpur", "elementor training", "woocommerce course", "website building classes"],
  },
];

export const MORE_COURSES: Course[] = SPECS.map(makeCourse);
