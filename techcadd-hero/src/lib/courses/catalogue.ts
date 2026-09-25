import {
  COMMON_FAQS, COMMON_WHY,
} from "./shared";
import type { Course } from "./types";

/**
 * The catalogue.
 *
 * Adding a course means appending one object here — the route, the template,
 * the sitemap and the related-course links all pick it up automatically. No
 * new page file is ever needed.
 *
 * Reviews below are drawn from the testimonials already on the site. Replace
 * them with the real, attributed reviews for each programme before launch.
 */

export const COURSES: Course[] = [
  /* ------------------------------------------------------------------ */
  {
    slug: "python-programming",
    title: "Best Python Course in Hoshiarpur",
    shortTitle: "Python",
    shortDescription:
      "Kick start your programming career with the Best Python Training in Hoshiarpur.",
    overview:
      "Kick start your programming career with the Best Python Training in Hoshiarpur. Learn Python Programming Language along with Data Structures and Object Oriented Programming. Best for beginners who wish to learn Python training in Hoshiarpur, Python Certification courses and gain industry ready skills.",
    category: "Programming",
    badge: "Trending",
    level: "Beginner to Advanced",
    duration: "3 Months",
    mode: "Online / Offline",
    certification: true,
    heroImage: "/images/courses/python-programming.webp",
    video: {
      url: "",
      thumbnail: "/images/courses/python-programming.webp",
      caption:
        "Watch. Learn. Code. \u2014 Our Python Course in Action. Gain a glimpse into our Python Course via our course video below. See what it\u2019s like to learn and code in the program, as well as how the entire training experience is set up.",
    },

    /* "Who Should Enroll in This Python Training?" */
    audience: [
      {
        label: "Students & Freshers",
        copy: "Begin learning about coding with the help of basic ideas and Python exercises.",
      },
      {
        label: "BCA & MCA Students",
        copy: "Get better at programming by understanding Python and applying it to academic assignments.",
      },
      {
        label: "Developers Aspirants",
        copy: "Gain knowledge about Python to form the basis of software development.",
      },
      {
        label: "Career Shifters",
        copy: "Get ready to enter the world of IT with this easy-to-understand language.",
      },
      {
        label: "Lovers of Data & AI",
        copy: "Discover Python as the foundation of learning about data science, automation, and artificial intelligence.",
      },
      {
        label: "Professionals",
        copy: "Enhance your skills through the simplification of work processes with the help of Python.",
      },
    ],

    whyChooseUs: COMMON_WHY,

    /* Python Course Modules \u2014 twelve, in the supplied order */
    modules: [
      {
        title: "Python Fundamentals",
        summary:
          "Learn Python syntax, variables, data types, operators, input/output, and basic programming concepts.",
        topics: ["Syntax", "Variables", "Data types", "Operators", "Input/output"],
      },
      {
        title: "Conditional Statements & Loops",
        summary:
          "Understand if-else, nested conditions, for loops, while loops, and control statements through practical examples.",
        topics: ["if-else", "Nested conditions", "for loops", "while loops", "Control statements"],
      },
      {
        title: "Python Data Structures",
        summary:
          "Work with lists, tuples, sets, and dictionaries. Learn how to store, access, modify, and manage data efficiently.",
        topics: ["Lists", "Tuples", "Sets", "Dictionaries"],
      },
      {
        title: "Functions & Modules",
        summary:
          "Create reusable functions, understand parameters and return values, use built-in functions, and organize code with modules.",
        topics: ["Functions", "Parameters", "Return values", "Built-in functions", "Modules"],
      },
      {
        title: "Object-Oriented Programming",
        summary:
          "Learn classes, objects, constructors, inheritance, polymorphism, encapsulation, and abstraction to write structured applications.",
        topics: [
          "Classes",
          "Objects",
          "Constructors",
          "Inheritance",
          "Polymorphism",
          "Encapsulation",
          "Abstraction",
        ],
      },
      {
        title: "File Handling & Exception Handling",
        summary:
          "Learn to read and write files while handling errors using exceptions, try, except, finally, and custom exceptions.",
        topics: ["Read/write files", "Exceptions", "try", "except", "finally", "Custom exceptions"],
      },
      {
        title: "Python Libraries",
        summary:
          "Explore useful libraries such as NumPy, Pandas, Matplotlib, and other tools for data processing and visualization.",
        topics: ["NumPy", "Pandas", "Matplotlib", "Data processing", "Visualization"],
      },
      {
        title: "Database Connectivity",
        summary:
          "Understand databases and learn how Python interacts with databases to store, retrieve, update, and manage application data.",
        topics: ["Databases", "Store", "Retrieve", "Update", "Manage data"],
      },
      {
        title: "Web Development with Python",
        summary:
          "Get introduced to Python web development using frameworks such as Django or Flask, including routes, templates, forms, and basic backend concepts.",
        topics: ["Django", "Flask", "Routes", "Templates", "Forms", "Backend concepts"],
      },
      {
        title: "APIs & JSON",
        summary:
          "Learn how applications communicate through APIs, work with JSON data, and connect Python applications with external services.",
        topics: ["APIs", "JSON", "External services"],
      },
      {
        title: "Automation with Python",
        summary:
          "Use Python to automate repetitive tasks such as file management, data processing, and everyday workflow activities.",
        topics: ["File management", "Data processing", "Workflow automation"],
      },
      {
        title: "Projects & Career Preparation",
        summary:
          "Apply your knowledge through practical projects, debugging exercises, and portfolio-building activities to develop job-ready confidence.",
        topics: ["Practical projects", "Debugging", "Portfolio building"],
      },
    ],

    /* progress tracker stages for the roadmap */
    journey: [
      "Beginner",
      "Fundamentals",
      "Programming Logic",
      "OOP",
      "Database",
      "Advanced Python",
      "Projects",
      "Certification",
    ],

    learningOutcomes: [
      "Write clear, idiomatic Python",
      "Choose the right data structure for a problem",
      "Model applications with classes and objects",
      "Read, write and process files safely",
      "Work with databases, APIs and JSON",
      "Automate repetitive tasks end to end",
    ],

    /* "Tools & Technologies You Will Learn" */
    tools: [
      "Python",
      "VS Code",
      "Jupyter Notebook",
      "Git & GitHub",
      "NumPy",
      "Pandas",
      "Matplotlib",
      "SQL & Databases",
      "Django / Flask",
      "REST APIs & JSON",
      "Python Automation",
      "Virtual Environments & pip",
    ],

    careerOutcomes: {
      roles: [
        "Python Developer",
        "Backend Developer",
        "Web Developer",
        "Data Analyst",
        "Automation Developer",
        "Software Developer",
        "AI & Machine Learning Foundation",
      ],
      /* the supplied Career Opportunities list, with its copy intact */
      roleDetails: [
        {
          role: "Python Developer",
          copy: "Development of applications, scripts, APIs, and backend using Python programming.",
        },
        {
          role: "Backend Developer",
          copy: "Building server-side applications and database driven websites.",
        },
        {
          role: "Web Developer",
          copy: "Development of dynamic websites and web applications with Python programming.",
        },
        {
          role: "Data Analyst",
          copy: "Working with data utilizing Python, Pandas, NumPy, and visualization tools.",
        },
        {
          role: "Automation Developer",
          copy: "Building scripts that automate business and technical activities.",
        },
        {
          role: "Software Developer",
          copy: "Using Python programming to develop and manage software solutions.",
        },
        {
          role: "AI & Machine Learning Foundation",
          copy: "Build a strong Python base and take your first step toward exciting careers in AI and Machine Learning.",
        },
      ],
      opportunities: [
        "Product and agency teams",
        "Freelance projects",
        "Campus placements",
        "In-house roles",
      ],
      nextSteps: ["Data Science", "Machine Learning", "Django / Flask", "Automation"],
      industries: ["Product engineering", "Data and analytics", "Automation", "Web development"],
    },

    projects: [
      {
        name: "Student record system",
        summary: "A console application over data structures and file storage.",
        tech: ["Python"],
        level: "Beginner",
        skills: ["Data structures", "File I/O", "Functions"],
        image: "/images/lab.webp",
      },
      {
        name: "Data analysis notebook",
        summary: "Load, clean and chart a real dataset end to end.",
        tech: ["Python", "Pandas", "Matplotlib"],
        level: "Intermediate",
        skills: ["Pandas", "Cleaning", "Visualisation"],
        image: "/images/classroom.webp",
      },
      {
        name: "Automation script",
        summary: "Automate a repetitive file and data workflow.",
        tech: ["Python"],
        level: "Intermediate",
        skills: ["Automation", "File management", "Scheduling"],
        image: "/images/lab.webp",
      },
    ],
    /* "Why learn Python Programming with us?" — replaces the shared default
       so this section carries the course's own copy. */
    instructor: {
      heading: "Why learn Python Programming with us?",
      intro:
        "Shift your learning experience from theoretical to practical exercises, assignments, and project based training.",
      points: [
        {
          title: "Learning by Practicing",
          copy: "Shift your learning experience from theoretical to practical exercises, assignments, and project based training.",
        },
        {
          title: "Beginner Oriented Program",
          copy: "Start learning from scratch and step by step to make the understanding of Python easy.",
        },
        {
          title: "Training with Industry Relevant Tools",
          copy: "Work with Python, VS Code, Git, GitHub, NumPy, Pandas, Databases, APIs, and other useful tools.",
        },
        {
          title: "Real World Projects",
          copy: "Make real world projects to enhance your problem solving ability and build your portfolio.",
        },
        {
          title: "Learning through Sessions with Guidance",
          copy: "Structured sessions to learn through practice, examples, doubt solving, and practicing continuously.",
        },
        {
          title: "Technology Career Skills",
          copy: "Programming and project based skills to prepare you for interviews, internships, freelancing, and tech careers.",
        },
      ],
    },
    /* Real testimonials only \u2014 an empty array renders no reviews section. */
    reviews: [],
    faqs: [
      {
        q: "Is this course suitable for beginners?",
        a: "This Python course is perfect for beginners since Python is easy to understand and can help learners develop skills in technology.",
      },
      {
        q: "What are the prerequisites?",
        a: "Basic computer familiarity. Anything else the track needs is introduced in the first module.",
      },
      ...COMMON_FAQS,
    ],
    relatedCourses: [
    ],
    keywords: [
      "best python course in hoshiarpur",
      "python training in hoshiarpur",
      "python certification courses",
      "python programming language",
    ],
  },

  /* ------------------------------------------------------------------ */
  {
    slug: "digital-marketing",
    title: "Digital Marketing",
    shortDescription:
      "SEO, local search, social, paid ads, content and analytics — planned, run and measured on real campaigns.",
    overview:
      "Kick-start your marketing career with structured Digital Marketing training in Hoshiarpur. You learn SEO, social media marketing, Google Business Profile, content marketing, online advertising, email marketing, WordPress, analytics and campaign management. Suited to students, freshers, business owners, freelancers and working professionals who want to understand how businesses become visible online, generate leads and grow through digital platforms.",
    category: "Marketing",
    badge: "Trending",
    level: "Beginner to Advanced",
    duration: "4 Months",
    mode: "Online / Offline",
    certification: true,
    heroImage: "/images/courses/digital-marketing.webp",
    video: {
      url: "",
      thumbnail: "/images/digital.webp",
      caption:
        "Learn, practise, market. See how learners work through marketing concepts, build campaigns, use the tools, optimise websites and run social platforms through assignments and projects.",
    },
    rating: { score: 4.8, count: 143 },
    audience: [
      {
        label: "Students & freshers",
        copy: "Start with SEO, social media, content creation, Google Business Profile, analytics and online advertising.",
      },
      {
        label: "BCA, MCA & other graduates",
        copy: "Add practical, job-oriented marketing skills alongside your academic qualification.",
      },
      {
        label: "Digital marketing aspirants",
        copy: "Learn to plan campaigns, improve search rankings, manage social media, generate leads and analyse performance.",
      },
      {
        label: "Business owners & entrepreneurs",
        copy: "Promote your business online, improve local visibility, reach target customers and generate enquiries.",
      },
      {
        label: "Career changers",
        copy: "Move into digital marketing through a path that covers basics to advanced concepts, with projects throughout.",
      },
      {
        label: "Freelancers & professionals",
        copy: "Sharpen your ability to handle SEO, social, content, paid campaigns, analytics and digital branding for clients.",
      },
    ],
    whyChooseUs: [
      {
        title: "From basics to advanced, in phases",
        copy: "Understand digital marketing from scratch, then move to advanced strategy across the channels that actually drive business outcomes.",
      },
      {
        title: "Keyword research & search marketing",
        copy: "Learn SEO and SEM in practice — keyword research, on-page, technical and off-page work, local SEO and Google Business Profile optimisation.",
      },
      {
        title: "Social media on the platforms that matter",
        copy: "Develop and run social strategy across Instagram, Facebook, LinkedIn, YouTube and more.",
      },
      {
        title: "Campaign management",
        copy: "Hands-on with website promotion, lead generation, content campaigns, local marketing and digital advertising — and how marketers track them.",
      },
      {
        title: "Live projects & practical sessions",
        copy: "Assignments, campaign planning, SEO activity, content development, social work and analytics rather than theory alone.",
      },
      {
        title: "Practical skills for career growth",
        copy: "Build toward roles in SEO, social media, content, performance marketing, digital advertising, local SEO and freelancing.",
      },
    ],
    modules: [
      {
        title: "Digital marketing fundamentals",
        summary: "Core concepts, online customer journeys, marketing channels, target audiences, digital branding and campaign objectives.",
        topics: ["Marketing channels", "Customer journey", "Target audiences", "Campaign objectives"],
        duration: "1 week",
        lessons: 8,
      },
      {
        title: "Website & WordPress fundamentals",
        summary: "Websites, domains, hosting, site structure, WordPress pages, posts, themes, plugins and forms.",
        topics: ["Domains & hosting", "WordPress basics", "Themes & plugins", "Forms"],
        duration: "2 weeks",
        lessons: 10,
      },
      {
        title: "Search engine optimisation",
        summary: "Keyword research, search intent, on-page and technical SEO, internal linking, meta tags, content and image optimisation, backlinks.",
        topics: ["Keyword research", "On-page SEO", "Technical SEO", "Backlinks"],
        duration: "3 weeks",
        lessons: 14,
      },
      {
        title: "Local SEO & Google Business Profile",
        summary: "Improving local presence — profile and business information optimisation, categories, services, reviews, posts, local keywords and citations.",
        topics: ["Google Business Profile", "Categories & services", "Reviews & posts", "Citations"],
        duration: "2 weeks",
        lessons: 10,
      },
      {
        title: "Social media marketing",
        summary: "Strategy, content planning, audience targeting, profile optimisation, posts, reels, hashtags, calendars and performance tracking.",
        topics: ["Content planning", "Audience targeting", "Reels & posts", "Performance tracking"],
        duration: "2 weeks",
        lessons: 12,
      },
      {
        title: "Content marketing & copywriting",
        summary: "Writing useful, engaging content for websites, blogs, social, landing pages, ads and business profiles, with keywords used naturally.",
        topics: ["Copywriting", "Blog content", "Landing pages", "Keyword placement"],
        duration: "2 weeks",
        lessons: 10,
      },
      {
        title: "Paid advertising & performance marketing",
        summary: "Advertising fundamentals — campaign objectives, audience targeting, ad formats, keyword-based ads, budget planning and measurement.",
        topics: ["Campaign objectives", "Audience targeting", "Ad formats", "Budget planning"],
        duration: "2 weeks",
        lessons: 12,
      },
      {
        title: "Email marketing & lead generation",
        summary: "Campaign fundamentals, subscriber lists, promotional emails, lead magnets, calls to action and follow-up sequences.",
        topics: ["Subscriber lists", "Lead magnets", "Calls to action", "Follow-up campaigns"],
        duration: "1 week",
        lessons: 8,
      },
      {
        title: "Analytics & performance tracking",
        summary: "Traffic, user behaviour, conversions, campaign performance, engagement and the marketing KPIs that matter.",
        topics: ["Traffic & behaviour", "Conversions", "Campaign reporting", "Marketing KPIs"],
        duration: "2 weeks",
        lessons: 10,
      },
      {
        title: "Graphic & marketing content creation",
        summary: "Building marketing creatives, social posts, banners and promotional visuals with commonly used design tools.",
        topics: ["Creative basics", "Social posts", "Banners", "Design tools"],
        duration: "1 week",
        lessons: 8,
      },
      {
        title: "Strategy & brand building",
        summary: "Developing a strategy — identifying audiences, analysing competitors, choosing channels, planning content and measuring outcomes.",
        topics: ["Audience research", "Competitor analysis", "Channel selection", "Measurement"],
        duration: "2 weeks",
        lessons: 10,
      },
      {
        title: "Live projects & career preparation",
        summary: "SEO audits, social campaigns, content assignments, local SEO activity, reporting, portfolio development and interview preparation.",
        topics: ["SEO audit", "Live campaign", "Reporting", "Portfolio & interviews"],
        duration: "2 weeks",
        lessons: 10,
      },
    ],
    learningOutcomes: [
      "Search engine optimisation and local SEO",
      "Social media marketing and content strategy",
      "Google Business Profile management",
      "Paid advertising and lead generation",
      "Website, WordPress and content marketing",
      "Analytics, reporting and digital campaign skills",
    ],
    tools: [
      "Google Search Console",
      "Google Analytics",
      "Google Business Profile",
      "Google Ads",
      "Meta Ads Manager",
      "WordPress",
      "Canva",
      "SEO Tools",
      "Keyword Research Tools",
      "Social Media Platforms",
      "Email Marketing Tools",
      "Google Keyword Planner",
      "Microsoft Excel",
      "Content & Analytics Tools",
    ],
    careerOutcomes: {
      roles: [
        "Digital Marketing Executive",
        "SEO Executive",
        "Social Media Executive",
        "SEO Analyst",
        "Performance Marketing Executive",
        "Content Marketing Executive",
        "Digital Marketing Freelancer",
        "Social Media Manager",
      ],
      roleDetails: [
        {
          role: "Digital Marketing Executive",
          copy: "Plan and run online marketing across SEO, social media, content, websites and campaigns.",
        },
        {
          role: "SEO Executive",
          copy: "Work on keyword research, on-page, technical and local SEO, content SEO and link building.",
        },
        {
          role: "Social Media Executive",
          copy: "Manage accounts, plan the content calendar, publish, engage the audience and analyse performance.",
        },
        {
          role: "SEO Analyst",
          copy: "Analyse website performance, keyword rankings, visibility, competitors and SEO opportunities.",
        },
        {
          role: "Performance Marketing Executive",
          copy: "Support paid campaigns, audience targeting, optimisation, lead generation and performance analysis.",
        },
        {
          role: "Content Marketing Executive",
          copy: "Create blogs, website copy, social content and promotional material for campaigns.",
        },
        {
          role: "Digital Marketing Freelancer",
          copy: "Offer SEO, social, content, local SEO and website promotion services independently.",
        },
        {
          role: "Social Media Manager",
          copy: "Own social strategy, manage brand accounts, coordinate content and build online presence.",
        },
      ],
      opportunities: [
        "Marketing agencies",
        "In-house brand teams",
        "Local business promotion",
        "Freelance & consulting",
      ],
      nextSteps: ["Advanced Google Ads", "Marketing analytics", "Conversion rate optimisation", "Marketing automation"],
      industries: ["Agencies", "E-commerce", "Education", "Local business & retail"],
    },
    projects: [
      {
        name: "SEO audit of a live website",
        summary: "A full on-page and technical review with keyword mapping and a prioritised fix list.",
        tech: ["Search Console", "SEO Tools", "Excel"],
        level: "Beginner",
        skills: ["Keyword research", "On-page SEO", "Reporting"],
        image: "/images/digital.webp",
      },
      {
        name: "Local business Google Business Profile",
        summary: "Profile optimisation, categories, services, posts and review strategy for a real local business.",
        tech: ["Google Business Profile", "Local SEO"],
        level: "Intermediate",
        skills: ["Local SEO", "Citations", "Review management"],
        image: "/images/classroom.webp",
      },
      {
        name: "Social & paid campaign with reporting",
        summary: "A planned content calendar plus a small paid campaign, measured and reported against its objective.",
        tech: ["Meta Ads Manager", "Google Analytics", "Canva"],
        level: "Advanced",
        skills: ["Campaign planning", "Audience targeting", "Analytics"],
        image: "/images/lab.webp",
      },
    ],
    instructor: {
      heading: "Why learn digital marketing with us?",
      intro:
        "Marketing is judged on results, so the work here is done on live sites and real campaigns. You leave with audits, calendars and reports you actually produced, not notes about how they are produced.",
      points: [
        {
          title: "Learning through practice",
          copy: "Go beyond theory with SEO activity, content assignments, social work, campaigns and analysis projects.",
        },
        {
          title: "Beginner-friendly program",
          copy: "Start with the concepts, then move to advanced SEO, social, ads, analytics, local SEO and campaigns.",
        },
        {
          title: "Training with industry tools",
          copy: "Hands-on with Google Business Profile, Analytics, Search Console, Google Ads, Meta Ads, WordPress, Canva and keyword tools.",
        },
        {
          title: "Real marketing projects",
          copy: "SEO optimisation, social campaigns, content creation, local business promotion and website analysis.",
        },
        {
          title: "Structured sessions",
          copy: "Classes, demonstrations, campaign exercises, performance analysis and doubt solving.",
        },
        {
          title: "Marketing career skills",
          copy: "Practical skills for internships, interviews, freelance work and agency or in-house marketing roles.",
        },
      ],
    },
    reviews: [
      {
        name: "Priya Bansal",
        initials: "PB",
        rating: 5,
        course: "Digital Marketing",
        role: "Performance Marketer",
        quote:
          "Running a campaign with actual money on the line taught me more in three weeks than a year of reading.",
      },
      {
        name: "Karan Thakur",
        initials: "KT",
        rating: 5,
        course: "Digital Marketing",
        role: "SEO Specialist",
        quote:
          "The audit module gave me a repeatable process. I use the same checklist with freelance clients now.",
      },
    ],
    faqs: [
      {
        q: "Is this course suitable for beginners?",
        a: "Yes. It starts from what digital marketing is and how customers find a business online, then builds toward campaigns you plan and run yourself.",
      },
      {
        q: "Do I need a technical background?",
        a: "No. The website and WordPress module covers everything technical the rest of the course relies on.",
      },
      ...COMMON_FAQS,
    ],
    relatedCourses: ["web-designing", "web-development"],
    keywords: [
      "best digital marketing course in hoshiarpur",
      "digital marketing training in hoshiarpur",
      "digital marketing certificate courses",
      "seo training hoshiarpur",
      "social media marketing classes",
    ],
  },
];
