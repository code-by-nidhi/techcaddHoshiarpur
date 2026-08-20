import {
  COMMON_AUDIENCE as A, COMMON_FAQS, COMMON_WHY, DEFAULT_INSTRUCTOR,
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
    slug: "full-stack-web-development",
    title: "Full Stack Web Development",
    shortDescription:
      "Front to back, database to deploy — build and ship complete web applications.",
    overview:
      "A six-month programme that takes you from your first HTML page to a deployed, database-backed application. You write the front end, the API and the data layer, then put the whole thing online under code review.",
    category: "Web Development",
    level: "Beginner to Advanced",
    duration: "6 Months",
    mode: "Online / Offline",
    certification: true,
    heroImage: "/images/mern.webp",
    video: {
      url: "",
      thumbnail: "/images/classroom.webp",
      caption: "See how the programme runs, module by module.",
    },
    rating: { score: 4.9, count: 214 },
    audience: [A.beginners, A.students, A.freshers, A.switchers, A.freelancers],
    whyChooseUs: COMMON_WHY,
    modules: [
      {
        title: "HTML & CSS Fundamentals",
        summary: "Structure and style, done properly — semantics, layout and responsive design.",
        topics: ["Semantic HTML", "Flexbox & Grid", "Responsive design", "Accessibility basics"],
        duration: "3 weeks",
        lessons: 12,
      },
      {
        title: "JavaScript",
        summary: "The language itself, then the browser APIs you use it through.",
        topics: ["Types & scope", "Arrays and objects", "DOM & events", "Async, promises, fetch"],
        duration: "5 weeks",
        lessons: 20,
      },
      {
        title: "React",
        summary: "Component thinking, state, and the patterns real applications use.",
        topics: ["Components & props", "State & hooks", "Routing", "Data fetching & caching"],
        duration: "5 weeks",
        lessons: 18,
      },
      {
        title: "Node.js & Express",
        summary: "Server-side JavaScript: routing, middleware, authentication and file handling.",
        topics: ["HTTP & REST", "Express routing", "JWT auth", "Error handling"],
        duration: "4 weeks",
        lessons: 16,
      },
      {
        title: "MongoDB",
        summary: "Modelling data for an application that has to change over time.",
        topics: ["Schema design", "Mongoose", "Aggregation", "Indexes & performance"],
        duration: "3 weeks",
        lessons: 12,
      },
      {
        title: "Project Development & Deployment",
        summary: "Take one application from brief to production, with review at each stage.",
        topics: ["Git workflow", "Testing basics", "CI & environment config", "Deployment"],
        duration: "4 weeks",
        lessons: 14,
      },
    ],
    learningOutcomes: [
      "Build responsive websites that hold up on any screen",
      "Develop complete applications front to back",
      "Design and consume REST APIs",
      "Model and query a database",
      "Use Git and GitHub the way a team does",
      "Debug across the browser, server and database",
      "Deploy and configure an application for production",
    ],
    tools: ["HTML", "CSS", "JavaScript", "React", "Node.js", "Express", "MongoDB", "Git", "GitHub", "VS Code", "Postman", "Vercel"],
    careerOutcomes: {
      roles: ["Frontend Developer", "Backend Developer", "Full Stack Developer", "Web Developer", "MERN Developer"],
      opportunities: ["Product companies and startups", "Agency and client work", "Freelance web projects", "Internal tooling teams"],
      nextSteps: ["Next.js and server components", "TypeScript in depth", "Cloud & DevOps", "System design fundamentals"],
      industries: ["SaaS products", "E-commerce", "EdTech", "Enterprise applications"],
    },
    projects: [
      {
        name: "E-commerce storefront",
        summary: "Catalogue, cart, checkout flow and an admin view, backed by a real database.",
        tech: ["React", "Node.js", "MongoDB", "Stripe test mode"],
        level: "Advanced",
        skills: ["State management", "API design", "Payments", "Auth"],
        image: "/images/mern.webp",
      },
      {
        name: "Job portal",
        summary: "Listings, applications and role-based dashboards for seekers and recruiters.",
        tech: ["React", "Express", "MongoDB", "JWT"],
        level: "Intermediate",
        skills: ["Role-based access", "Search & filters", "File upload"],
        image: "/images/form.webp",
      },
      {
        name: "Admin dashboard",
        summary: "Charts, tables and CRUD over a live API, built to a supplied design.",
        tech: ["React", "REST", "Charting"],
        level: "Intermediate",
        skills: ["Data visualisation", "Forms", "Pagination"],
        image: "/images/data-science.webp",
      },
      {
        name: "Personal portfolio",
        summary: "Your own deployed site — the first thing an interviewer opens.",
        tech: ["HTML", "CSS", "JavaScript", "Vercel"],
        level: "Beginner",
        skills: ["Responsive layout", "Performance", "Deployment"],
        image: "/images/lab.webp",
      },
    ],
    instructor: DEFAULT_INSTRUCTOR,
    reviews: [
      {
        name: "Harmanpreet Singh",
        initials: "HS",
        rating: 5,
        course: "Full Stack Web Development",
        role: "Placed as MERN Developer",
        quote:
          "I walked in with a commerce degree and no idea what an API was. Three deployed projects and a clean commit history did more for me in interviews than any certificate.",
      },
      {
        name: "Simranjeet Kaur",
        initials: "SK",
        rating: 5,
        course: "Full Stack Web Development",
        role: "Frontend Developer",
        quote:
          "The code reviews were relentless in the best way. By the last module I was reading other people's pull requests without flinching.",
      },
      {
        name: "Aditya Malhotra",
        initials: "AM",
        rating: 5,
        course: "Full Stack Web Development",
        role: "Web Developer",
        quote:
          "Starting the project floor in month two was the difference. I stopped learning about development and started doing it.",
      },
    ],
    faqs: [
      {
        q: "Is this course suitable for beginners?",
        a: "Yes. The first two modules assume no prior coding, and the pace is set so fundamentals are solid before React arrives.",
      },
      {
        q: "What are the prerequisites?",
        a: "Basic computer familiarity. No prior programming, and no particular degree, is required.",
      },
      ...COMMON_FAQS,
      {
        q: "What can I do after completing the course?",
        a: "Graduates typically target frontend, backend or full stack developer roles, and some take on freelance client work with the portfolio they build here.",
      },
    ],
    relatedCourses: ["mern-stack-development", "python-programming", "java-programming", "data-analytics"],
    keywords: ["full stack developer course", "web development training Hoshiarpur", "MERN course", "React Node MongoDB training"],
  },

  /* ------------------------------------------------------------------ */
  {
    slug: "mern-stack-development",
    title: "MERN Stack Development",
    shortDescription: "MongoDB, Express, React and Node — one language, end to end.",
    overview:
      "Five months on the JavaScript stack most Indian product teams hire for. You build in React, serve with Express, store in MongoDB, and ship the result with authentication, tests and a deployment pipeline.",
    category: "Web Development",
    badge: "Trending",
    level: "Intermediate",
    duration: "5 Months",
    mode: "Online / Offline",
    certification: true,
    heroImage: "/images/courses/mern-stack-development.webp",
    video: {
      url: "",
      thumbnail: "/images/lab.webp",
      caption: "A walkthrough of the stack and the projects you build on it.",
    },
    rating: { score: 4.9, count: 168 },
    audience: [A.students, A.freshers, A.professionals, A.switchers, A.freelancers],
    whyChooseUs: COMMON_WHY,
    modules: [
      {
        title: "JavaScript & ES6+ refresher",
        summary: "The language features the rest of the stack leans on.",
        topics: ["Modules", "Destructuring", "Async/await", "Functional patterns"],
        duration: "2 weeks",
        lessons: 8,
      },
      {
        title: "React in depth",
        summary: "Beyond the basics: composition, performance and real data flows.",
        topics: ["Hooks in anger", "Context & state libraries", "Routing", "Forms & validation"],
        duration: "5 weeks",
        lessons: 20,
      },
      {
        title: "Node.js & Express",
        summary: "APIs that other people can depend on.",
        topics: ["REST design", "Middleware", "Auth & sessions", "Rate limiting"],
        duration: "4 weeks",
        lessons: 16,
      },
      {
        title: "MongoDB & Mongoose",
        summary: "Schema design for applications that keep changing.",
        topics: ["Documents & relations", "Aggregation pipeline", "Indexing", "Transactions"],
        duration: "3 weeks",
        lessons: 12,
      },
      {
        title: "Testing & tooling",
        summary: "The habits that make a codebase survivable.",
        topics: ["Unit testing", "API testing", "Linting & formatting", "Debugging"],
        duration: "2 weeks",
        lessons: 8,
      },
      {
        title: "Capstone & deployment",
        summary: "One substantial application, reviewed and shipped.",
        topics: ["Architecture", "CI", "Environment config", "Monitoring basics"],
        duration: "4 weeks",
        lessons: 14,
      },
    ],
    learningOutcomes: [
      "Build production-shaped React applications",
      "Design and secure REST APIs with Express",
      "Model data in MongoDB and query it efficiently",
      "Implement authentication and role-based access",
      "Write tests that catch real regressions",
      "Deploy a full stack application end to end",
    ],
    tools: ["React", "Node.js", "Express", "MongoDB", "Mongoose", "JavaScript", "Git", "GitHub", "Postman", "Jest", "VS Code", "Vercel"],
    careerOutcomes: {
      roles: ["MERN Stack Developer", "React Developer", "Node.js Developer", "Full Stack Engineer", "Software Engineer"],
      opportunities: ["Product startups", "Agency delivery teams", "Freelance application builds", "Remote contract work"],
      nextSteps: ["TypeScript", "Next.js", "Cloud & DevOps", "System design"],
      industries: ["SaaS", "Fintech", "E-commerce", "Internal enterprise tooling"],
    },
    projects: [
      {
        name: "Social feed application",
        summary: "Posts, follows, notifications and an activity feed with real-time updates.",
        tech: ["React", "Node.js", "MongoDB", "WebSockets"],
        level: "Advanced",
        skills: ["Real-time data", "Feed ranking", "Optimistic UI"],
        image: "/images/mern.webp",
      },
      {
        name: "Booking platform",
        summary: "Availability, reservations and an operator dashboard.",
        tech: ["React", "Express", "MongoDB"],
        level: "Intermediate",
        skills: ["Date handling", "Conflict resolution", "Admin flows"],
        image: "/images/form.webp",
      },
      {
        name: "REST API with auth",
        summary: "A documented API with tokens, refresh flow and rate limiting.",
        tech: ["Node.js", "Express", "JWT"],
        level: "Intermediate",
        skills: ["API design", "Security", "Documentation"],
        image: "/images/cloud.webp",
      },
    ],
    instructor: DEFAULT_INSTRUCTOR,
    reviews: [
      {
        name: "Navjot Kaur",
        initials: "NK",
        rating: 5,
        course: "MERN Stack Development",
        role: "React Developer",
        quote:
          "The capstone was the closest thing to a real job I had done. Architecture decisions, review comments, the lot.",
      },
      {
        name: "Rohit Verma",
        initials: "RV",
        rating: 5,
        course: "MERN Stack Development",
        role: "Node.js Developer",
        quote:
          "Being pushed to write tests early changed how I work. It came up in every interview I sat.",
      },
    ],
    faqs: [
      {
        q: "Who can join this course?",
        a: "Anyone comfortable with basic programming. If you have never written JavaScript, start with Full Stack Web Development instead — it covers the fundamentals first.",
      },
      {
        q: "What are the prerequisites?",
        a: "Basic programming logic and some HTML/CSS exposure. The first module refreshes the JavaScript you need.",
      },
      ...COMMON_FAQS,
    ],
    relatedCourses: ["full-stack-web-development", "java-programming", "python-programming", "data-analytics"],
    keywords: ["MERN stack course", "React training Hoshiarpur", "Node.js course", "MongoDB training"],
  },

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
      "data-science",
      "machine-learning",
      "full-stack-web-development",
      "java-programming",
    ],
    keywords: [
      "best python course in hoshiarpur",
      "python training in hoshiarpur",
      "python certification courses",
      "python programming language",
    ],
  },
  {
    slug: "java-programming",
    title: "Java Programming",
    shortDescription:
      "Java from first syntax to application development — object-oriented programming, data structures and practical projects.",
    overview:
      "Kick-start your programming career with structured Java training in Hoshiarpur. You learn the Java language alongside data structures and object-oriented programming, building the practical skills that support the journey toward becoming an industry-ready developer. The track is designed for beginners: it starts at fundamentals and progresses step by step to database connectivity, web development and a finished application.",
    category: "Programming",
    level: "Beginner to Advanced",
    duration: "4 Months",
    mode: "Online / Offline",
    certification: true,
    heroImage: "/images/courses/java-programming.webp",
    video: {
      url: "",
      thumbnail: "/images/lab.webp",
      caption:
        "Watch. Learn. Code. See how Java concepts are taught through coding practice, practical examples and a structured training experience built to make programming easier to understand.",
    },
    rating: { score: 4.8, count: 137 },
    audience: [
      {
        label: "Students & freshers",
        copy: "Start your coding journey with Java fundamentals, programming concepts and hands-on coding exercises.",
      },
      {
        label: "BCA & MCA students",
        copy: "Strengthen your programming knowledge by learning Java concepts and applying them to academic projects and assignments.",
      },
      {
        label: "Developer aspirants",
        copy: "Build a solid Java foundation to move toward software development, backend programming and application development.",
      },
      {
        label: "Career shifters",
        copy: "Step into the IT industry by learning one of the most widely used programming languages through a structured approach.",
      },
      {
        label: "Software & technology enthusiasts",
        copy: "Understand Java programming as a foundation for application development, backend technologies and enterprise software.",
      },
      {
        label: "Working professionals",
        copy: "Upgrade your programming skills and understand how Java is used to develop scalable and reliable software solutions.",
      },
    ],
    whyChooseUs: [
      {
        title: "Learning by practicing",
        copy: "Move beyond theory with coding exercises, assignments, practical examples and project-based learning.",
      },
      {
        title: "Beginner-oriented program",
        copy: "Start from the basics and progress step by step, making Java programming easier to understand and apply.",
      },
      {
        title: "Training with industry-relevant tools",
        copy: "Practice with Java, IDEs, Git, GitHub, SQL, JDBC, APIs and other technologies used in modern development environments.",
      },
      {
        title: "Real-world projects",
        copy: "Work on practical Java projects that strengthen your programming, logical thinking, debugging and problem-solving skills.",
      },
      {
        title: "Learning through guided sessions",
        copy: "Learn through structured sessions, live examples, coding practice, doubt-solving and continuous guidance.",
      },
      {
        title: "Technology career skills",
        copy: "Build programming and project-based skills that support your preparation for interviews, internships, software development roles and technology careers.",
      },
    ],
    modules: [
      {
        title: "Java fundamentals",
        summary:
          "Java syntax, variables, data types, operators, input/output, keywords and fundamental programming concepts.",
        topics: ["Syntax & keywords", "Variables & data types", "Operators", "Input & output"],
        duration: "2 weeks",
        lessons: 10,
      },
      {
        title: "Conditional statements & loops",
        summary:
          "if-else, nested conditions, switch, for, while and do-while, taught through practical coding examples.",
        topics: ["if-else & nested conditions", "switch", "for / while / do-while", "Control statements"],
        duration: "2 weeks",
        lessons: 10,
      },
      {
        title: "Java arrays & strings",
        summary:
          "Work with arrays and strings while learning how to store, process, compare, search and manipulate different types of data.",
        topics: ["Arrays", "String handling", "Searching & comparing", "Data manipulation"],
        duration: "2 weeks",
        lessons: 10,
      },
      {
        title: "Methods & packages",
        summary:
          "Create reusable methods, understand parameters and return values, use built-in methods and organise programs using packages.",
        topics: ["Method creation", "Parameters & return values", "Built-in methods", "Packages"],
        duration: "2 weeks",
        lessons: 8,
      },
      {
        title: "Object-oriented programming",
        summary:
          "Classes, objects, constructors, inheritance, polymorphism, encapsulation and abstraction for structured, maintainable applications.",
        topics: ["Classes & objects", "Constructors", "Inheritance & polymorphism", "Encapsulation & abstraction"],
        duration: "3 weeks",
        lessons: 14,
      },
      {
        title: "Exception & file handling",
        summary:
          "How Java handles errors and files using try, catch, finally, custom exceptions and file input/output concepts.",
        topics: ["try / catch / finally", "Custom exceptions", "File input & output", "Error handling patterns"],
        duration: "2 weeks",
        lessons: 8,
      },
      {
        title: "Collections framework",
        summary:
          "ArrayList, LinkedList, HashSet, HashMap and other collection classes for storing and managing data efficiently.",
        topics: ["ArrayList & LinkedList", "HashSet", "HashMap", "Choosing a collection"],
        duration: "2 weeks",
        lessons: 10,
      },
      {
        title: "Database connectivity",
        summary:
          "How Java applications communicate with databases using SQL and JDBC to store, retrieve, update and manage application data.",
        topics: ["SQL basics", "JDBC", "CRUD operations", "Result sets"],
        duration: "2 weeks",
        lessons: 10,
      },
      {
        title: "Java web development",
        summary:
          "Java-based web development concepts including servlets, JSP, request-response handling, sessions and basic backend development.",
        topics: ["Servlets", "JSP", "Request & response", "Sessions"],
        duration: "3 weeks",
        lessons: 12,
      },
      {
        title: "APIs & JSON",
        summary:
          "How applications communicate through APIs, working with JSON data and connecting Java applications with external services.",
        topics: ["REST concepts", "JSON handling", "Consuming APIs", "External services"],
        duration: "2 weeks",
        lessons: 8,
      },
      {
        title: "Java application development",
        summary:
          "How Java concepts come together to create practical applications, focusing on coding structure, debugging, testing and development practices.",
        topics: ["Application structure", "Debugging", "Testing", "Development practices"],
        duration: "2 weeks",
        lessons: 10,
      },
      {
        title: "Projects & career preparation",
        summary:
          "Apply your Java knowledge through practical projects, coding exercises, debugging tasks and portfolio-building activities.",
        topics: ["Project build", "Coding exercises", "Debugging tasks", "Portfolio & interview prep"],
        duration: "3 weeks",
        lessons: 12,
      },
    ],
    learningOutcomes: [
      "Write clean, structured Java using core syntax and control flow",
      "Apply object-oriented programming to build maintainable applications",
      "Work confidently with arrays, strings and the collections framework",
      "Handle errors and files safely with exceptions and file I/O",
      "Connect Java applications to a database using SQL and JDBC",
      "Build backend features with servlets, JSP and REST APIs",
      "Debug, test and structure a complete Java application",
      "Present project work as a portfolio for interviews and internships",
    ],
    tools: [
      "Java",
      "Eclipse / IntelliJ IDEA",
      "VS Code",
      "Git & GitHub",
      "JDBC",
      "Collections Framework",
      "SQL & Databases",
      "Servlets & JSP",
      "REST APIs & JSON",
      "Maven",
      "Java Application Development",
      "Object-Oriented Programming",
    ],
    careerOutcomes: {
      roles: [
        "Java Developer",
        "Backend Developer",
        "Software Developer",
        "Web Developer",
        "Application Developer",
        "Full Stack Developer Foundation",
        "Enterprise Application Developer",
      ],
      roleDetails: [
        {
          role: "Java Developer",
          copy: "Build applications, backend systems, APIs and software solutions using Java programming.",
        },
        {
          role: "Backend Developer",
          copy: "Develop server-side applications, business logic, APIs and database-driven systems.",
        },
        {
          role: "Software Developer",
          copy: "Use Java to design, develop, test and maintain software applications.",
        },
        {
          role: "Web Developer",
          copy: "Create dynamic and database-connected web applications using Java technologies.",
        },
        {
          role: "Application Developer",
          copy: "Develop desktop, enterprise and business applications using Java-based technologies.",
        },
        {
          role: "Full Stack Developer Foundation",
          copy: "Build a strong Java backend foundation and progress toward full-stack development.",
        },
        {
          role: "Enterprise Application Developer",
          copy: "Learn the programming foundation required to work toward scalable enterprise and business software development.",
        },
      ],
      opportunities: [
        "Enterprise engineering teams",
        "Service and consulting firms",
        "Product backends",
        "Campus placements",
      ],
      nextSteps: ["Spring Boot & microservices", "Cloud & DevOps", "System design", "Android with Kotlin"],
      industries: ["Banking & finance", "Enterprise software", "Telecom", "Government systems"],
    },
    projects: [
      {
        name: "Library management application",
        summary: "Catalogue, lending and returns backed by a relational database.",
        tech: ["Java", "JDBC", "MySQL"],
        level: "Intermediate",
        skills: ["OOP", "JDBC", "Validation"],
        image: "/images/classroom.webp",
      },
      {
        name: "Student record system",
        summary: "Create, search and update records using collections and database connectivity.",
        tech: ["Java", "Collections", "SQL"],
        level: "Intermediate",
        skills: ["Collections", "CRUD", "Debugging"],
        image: "/images/cyber.webp",
      },
      {
        name: "Inventory console application",
        summary: "A first end-to-end build using core Java, collections and file handling.",
        tech: ["Java", "File I/O"],
        level: "Beginner",
        skills: ["OOP", "Persistence", "CLI design"],
        image: "/images/lab.webp",
      },
    ],
    instructor: DEFAULT_INSTRUCTOR,
    reviews: [
      {
        name: "Gurpreet Sandhu",
        initials: "GS",
        rating: 5,
        course: "Java Programming",
        role: "Java Developer",
        quote:
          "Collections and OOP were taught with real problems rather than toy examples. That is exactly what the interview asked about.",
      },
      {
        name: "Anjali Rana",
        initials: "AR",
        rating: 4,
        course: "Java Programming",
        role: "Backend Developer",
        quote:
          "JDBC and servlets felt enormous until the modules broke them into pieces. Shipping the final application made it click.",
      },
    ],
    faqs: [
      {
        q: "Is this course suitable for beginners?",
        a: "Yes. The first modules start from Java syntax and fundamental programming concepts, and the pace builds gradually toward application development.",
      },
      {
        q: "What are the prerequisites?",
        a: "None beyond basic computer familiarity. Prior programming exposure helps but is not assumed.",
      },
      ...COMMON_FAQS,
    ],
    relatedCourses: ["python-programming", "full-stack-web-development", "mern-stack-development", "data-analytics"],
    keywords: [
      "best java course in hoshiarpur",
      "java training in hoshiarpur",
      "java certification courses",
      "java programming language",
      "core java classes hoshiarpur",
    ],
  },

  /* ------------------------------------------------------------------ */
  {
    slug: "data-analytics",
    title: "Data Analytics",
    shortDescription: "SQL, Python and dashboards that a business will actually act on.",
    overview:
      "Five months turning raw data into decisions: statistics you genuinely use, SQL you can be tested on, and dashboards built to answer a specific business question rather than to look busy.",
    category: "Data & AI",
    level: "Beginner to Advanced",
    duration: "5 Months",
    mode: "Online / Offline",
    certification: true,
    heroImage: "/images/data-science.webp",
    video: {
      url: "",
      thumbnail: "/images/form.webp",
      caption: "The analytics workflow, from raw table to reported insight.",
    },
    rating: { score: 4.9, count: 156 },
    audience: [A.beginners, A.students, A.professionals, A.switchers, A.entrepreneurs],
    whyChooseUs: COMMON_WHY,
    modules: [
      {
        title: "Excel & analytical thinking",
        summary: "Framing a question before touching a tool.",
        topics: ["Pivot tables", "Lookup functions", "Data hygiene", "Framing an analysis"],
        duration: "2 weeks",
        lessons: 8,
      },
      {
        title: "SQL",
        summary: "Getting exactly the rows you need out of a real database.",
        topics: ["SELECT & filtering", "Joins", "Window functions", "Query performance"],
        duration: "4 weeks",
        lessons: 16,
      },
      {
        title: "Python for analysis",
        summary: "Pandas for the work spreadsheets cannot carry.",
        topics: ["Dataframes", "Cleaning", "Merging", "Time series"],
        duration: "4 weeks",
        lessons: 16,
      },
      {
        title: "Statistics that matter",
        summary: "Enough inference to avoid confident wrong answers.",
        topics: ["Distributions", "Hypothesis testing", "A/B testing", "Correlation vs causation"],
        duration: "3 weeks",
        lessons: 12,
      },
      {
        title: "Power BI & Tableau",
        summary: "Dashboards designed for the person who has to decide something.",
        topics: ["Data modelling", "DAX basics", "Visual design", "Publishing & refresh"],
        duration: "4 weeks",
        lessons: 14,
      },
      {
        title: "Capstone analysis",
        summary: "One end-to-end analysis, presented and defended.",
        topics: ["Problem framing", "Analysis", "Storytelling", "Presentation"],
        duration: "3 weeks",
        lessons: 10,
      },
    ],
    learningOutcomes: [
      "Write SQL against a real schema with confidence",
      "Clean and reshape messy data in Pandas",
      "Choose the right chart for the question",
      "Run and interpret a basic experiment",
      "Build dashboards in Power BI and Tableau",
      "Present findings so a decision follows",
    ],
    tools: ["SQL", "MySQL", "Python", "Pandas", "NumPy", "Power BI", "Tableau", "Excel", "Git", "Jupyter"],
    careerOutcomes: {
      roles: ["Data Analyst", "Business Analyst", "BI Developer", "Reporting Analyst", "Analytics Consultant"],
      opportunities: ["Analytics teams", "Operations and finance reporting", "Freelance dashboard work", "Consulting"],
      nextSteps: ["Machine learning foundations", "Data engineering basics", "Advanced statistics", "Cloud data platforms"],
      industries: ["Retail & e-commerce", "Finance", "Healthcare", "Logistics"],
    },
    projects: [
      {
        name: "Sales analytics dashboard",
        summary: "Revenue, cohorts and regional performance in one publishable dashboard.",
        tech: ["SQL", "Power BI"],
        level: "Intermediate",
        skills: ["Data modelling", "Visual design", "DAX"],
        image: "/images/data-science.webp",
      },
      {
        name: "Customer churn analysis",
        summary: "Find who leaves, when, and which signals precede it.",
        tech: ["Python", "Pandas", "SQL"],
        level: "Advanced",
        skills: ["Feature analysis", "Segmentation", "Reporting"],
        image: "/images/ai.webp",
      },
      {
        name: "Pricing experiment review",
        summary: "Read an A/B test properly and say what it does and does not prove.",
        tech: ["Python", "Statistics"],
        level: "Intermediate",
        skills: ["Hypothesis testing", "Interpretation", "Communication"],
        image: "/images/digital.webp",
      },
    ],
    instructor: DEFAULT_INSTRUCTOR,
    reviews: [
      {
        name: "Simranjeet Kaur",
        initials: "SK",
        rating: 5,
        course: "Data Analytics",
        role: "Data Analyst",
        quote:
          "The SQL and statistics modules were relentless, and that is exactly why the interview felt easy.",
      },
      {
        name: "Deepak Chauhan",
        initials: "DC",
        rating: 5,
        course: "Data Analytics",
        role: "BI Developer",
        quote:
          "Being made to present the capstone to a room changed how I build dashboards. I design for the decision now.",
      },
    ],
    faqs: [
      {
        q: "Is this course suitable for beginners?",
        a: "Yes. It starts with Excel and analytical framing before SQL, so no prior coding is assumed.",
      },
      {
        q: "What are the prerequisites?",
        a: "Comfort with numbers and basic spreadsheets. Programming experience is helpful but not required.",
      },
      ...COMMON_FAQS,
    ],
    relatedCourses: ["python-programming", "digital-marketing", "full-stack-web-development", "java-programming"],
    keywords: ["data analytics course Hoshiarpur", "power bi training", "sql course", "data analyst training"],
  },

  /* ------------------------------------------------------------------ */
  {
    slug: "digital-marketing",
    title: "Digital Marketing",
    shortDescription: "Run real campaigns with a real budget, then report on them properly.",
    overview:
      "Four months of performance marketing: SEO, paid social, Google Ads and analytics, taught by running live campaigns and reporting on them the way an agency lead expects.",
    category: "Marketing",
    badge: "Trending",
    level: "Beginner to Advanced",
    duration: "4 Months",
    mode: "Online / Offline",
    certification: true,
    heroImage: "/images/courses/digital-marketing.webp",
    video: {
      url: "",
      thumbnail: "/images/classroom.webp",
      caption: "How live campaign work is built into the programme.",
    },
    rating: { score: 4.8, count: 143 },
    audience: [A.beginners, A.students, A.freshers, A.freelancers, A.entrepreneurs],
    whyChooseUs: COMMON_WHY,
    modules: [
      {
        title: "Marketing foundations",
        summary: "Audience, positioning and the funnel everything else hangs on.",
        topics: ["Audience research", "Positioning", "Funnel stages", "Offer design"],
        duration: "2 weeks",
        lessons: 8,
      },
      {
        title: "SEO",
        summary: "Earning traffic that keeps arriving after you stop paying.",
        topics: ["Keyword research", "On-page SEO", "Technical audit", "Link building"],
        duration: "4 weeks",
        lessons: 16,
      },
      {
        title: "Google Ads",
        summary: "Search and shopping campaigns run against a real budget.",
        topics: ["Campaign structure", "Keyword match types", "Ad copy testing", "Bidding"],
        duration: "3 weeks",
        lessons: 12,
      },
      {
        title: "Social & content",
        summary: "Meta and organic content that earns attention rather than buying all of it.",
        topics: ["Meta Ads", "Creative testing", "Content calendars", "Community"],
        duration: "3 weeks",
        lessons: 12,
      },
      {
        title: "Analytics & attribution",
        summary: "Tying spend to outcomes without fooling yourself.",
        topics: ["GA4", "Events & conversions", "Attribution models", "Reporting"],
        duration: "3 weeks",
        lessons: 12,
      },
      {
        title: "Live campaign & report",
        summary: "Plan, run and defend one campaign end to end.",
        topics: ["Budget planning", "Execution", "Optimisation", "Client reporting"],
        duration: "3 weeks",
        lessons: 10,
      },
    ],
    learningOutcomes: [
      "Research an audience and position an offer",
      "Run search and social campaigns end to end",
      "Audit and improve a site's organic performance",
      "Set up GA4 events and conversion tracking",
      "Read attribution without over-claiming",
      "Report campaign performance to a client or manager",
    ],
    tools: ["Google Ads", "Meta Ads Manager", "GA4", "Google Search Console", "SEMrush", "WordPress", "Canva", "Looker Studio"],
    careerOutcomes: {
      roles: ["Performance Marketer", "SEO Specialist", "Social Media Manager", "Campaign Manager", "Growth Analyst"],
      opportunities: ["Agency roles", "In-house marketing teams", "Freelance campaign management", "Running your own business's marketing"],
      nextSteps: ["Marketing automation", "Conversion rate optimisation", "Data Analytics", "Content strategy"],
      industries: ["E-commerce", "EdTech", "Local services", "D2C brands"],
    },
    projects: [
      {
        name: "Full-funnel campaign",
        summary: "A live campaign with a real budget, from brief through to performance report.",
        tech: ["Google Ads", "Meta Ads", "GA4"],
        level: "Advanced",
        skills: ["Budgeting", "Creative testing", "Reporting"],
        image: "/images/digital.webp",
      },
      {
        name: "SEO audit and rebuild",
        summary: "Audit a real site, fix what matters, and measure the movement.",
        tech: ["Search Console", "SEMrush", "WordPress"],
        level: "Intermediate",
        skills: ["Technical SEO", "Content planning", "Measurement"],
        image: "/images/classroom.webp",
      },
      {
        name: "Landing page CRO test",
        summary: "Build two variants, run the test, and interpret the result honestly.",
        tech: ["WordPress", "GA4"],
        level: "Intermediate",
        skills: ["Copywriting", "Experiment design", "Analysis"],
        image: "/images/form.webp",
      },
    ],
    instructor: DEFAULT_INSTRUCTOR,
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
        a: "Yes. It starts with marketing fundamentals before any platform work, so no prior experience is needed.",
      },
      {
        q: "Do I need my own ad budget?",
        a: "No. Live campaign work runs on a supervised budget provided as part of the programme.",
      },
      ...COMMON_FAQS,
    ],
    relatedCourses: ["data-analytics", "python-programming", "full-stack-web-development", "mern-stack-development"],
    keywords: ["digital marketing course Hoshiarpur", "seo training", "google ads course", "performance marketing training"],
  },
];
