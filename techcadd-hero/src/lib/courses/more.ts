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
    slug: "c-programming",
    title: "C Programming",
    short:
      "C from first syntax to pointers, data structures and problem solving — the base every later language builds on.",
    overview:
      "Make your entry into programming with structured C training in Hoshiarpur. You learn the C language alongside data structures and the problem-solving habits that carry into every language after it. Built for beginners: C is straightforward to learn and gives you a genuine base in programming and logical thinking.",
    category: "Programming",
    duration: "3 Months",
    level: "Beginner",
    hero: "/images/courses/c-programming.webp",
    videoCaption:
      "Watch. Learn. Code. See what it is like to learn programming here — how code is written, how concepts are explained, and how the course is structured from the first module to the last.",
    audience: [
      {
        label: "Students & freshers",
        copy: "Get started in programming with basic programming concepts and by solving C programming problems.",
      },
      {
        label: "BCA & MCA students",
        copy: "Improve your programming skills by learning C concepts and applying them to assignment work.",
      },
      {
        label: "Aspiring developers",
        copy: "Develop a strong programming base that supports becoming a software developer later.",
      },
      {
        label: "Career switchers",
        copy: "Get ready to enter the IT industry through the most fundamental programming language.",
      },
      {
        label: "Programming & technology enthusiasts",
        copy: "Learn the basics of C to understand logic, algorithms, data structures and software development.",
      },
    ],
    whyChooseUs: [
      {
        title: "Easy-to-follow program structure",
        copy: "Start from the basics of C and progress gradually to advanced concepts through clear explanations, coding examples and practice sessions.",
      },
      {
        title: "Learning by coding",
        copy: "Learn C by writing programs, solving logical problems, working through coding exercises and practising each concept.",
      },
      {
        title: "Strong programming knowledge",
        copy: "Build real understanding of variables, functions, arrays, pointers, memory, data structures and algorithms.",
      },
      {
        title: "Project practice",
        copy: "Apply what you learn through practical C projects and problem-solving exercises that show how coding logic is used.",
      },
      {
        title: "Guided learning & doubt support",
        copy: "Understand the harder concepts through live coding, worked examples, demonstrations and doubt-clearing sessions.",
      },
      {
        title: "Core programming skills for careers",
        copy: "Gain the core skills that support internships, interviews, software development, competitive programming and advanced courses.",
      },
    ],
    modules: [
      {
        title: "Basics of C programming",
        summary: "C syntax, keywords, variables, data types, constants, operators, input/output and programming fundamentals.",
        topics: ["Syntax & keywords", "Variables & data types", "Constants & operators", "Input & output"],
        duration: "2 weeks",
        lessons: 10,
      },
      {
        title: "Conditional statements & looping",
        summary: "Conditional statements, if-else, nested conditions, switch, for, while and do-while through practical examples.",
        topics: ["if-else & nested conditions", "switch", "for / while / do-while", "Break & continue"],
        duration: "2 weeks",
        lessons: 10,
      },
      {
        title: "Arrays & strings",
        summary: "One- and two-dimensional arrays, character arrays, strings, string functions and handling array and string data.",
        topics: ["1D & 2D arrays", "Character arrays", "String functions", "Array handling"],
        duration: "2 weeks",
        lessons: 10,
      },
      {
        title: "Functions & modular programming",
        summary: "Writing reusable functions, understanding parameters and return values, and using library functions.",
        topics: ["Function definition", "Parameters & return values", "Scope", "Library functions"],
        duration: "2 weeks",
        lessons: 8,
      },
      {
        title: "Pointers & memory concepts",
        summary: "Pointers, pointer arithmetic, address and reference concepts, and dynamic memory in C.",
        topics: ["Pointer basics", "Pointer arithmetic", "Address & reference", "Pointers with arrays"],
        duration: "2 weeks",
        lessons: 10,
      },
      {
        title: "Structures, unions & file handling",
        summary: "Structures, unions, enumeration and file handling, with ways to work with structured data in programs.",
        topics: ["Structures", "Unions & enums", "File input & output", "Structured data"],
        duration: "2 weeks",
        lessons: 10,
      },
      {
        title: "Data structures in C",
        summary: "Basic data structures — arrays, linked lists, stacks and queues — with searching and sorting in C.",
        topics: ["Linked lists", "Stacks", "Queues", "Searching & sorting"],
        duration: "3 weeks",
        lessons: 12,
      },
      {
        title: "Dynamic memory management",
        summary: "malloc(), calloc(), realloc() and free(), with dynamic memory allocation concepts in C programs.",
        topics: ["malloc & calloc", "realloc", "free & leaks", "Allocation patterns"],
        duration: "1 week",
        lessons: 6,
      },
      {
        title: "Advanced C programming",
        summary: "Recursion, function pointers, preprocessor directives, command-line arguments and modular programming.",
        topics: ["Recursion", "Function pointers", "Preprocessor directives", "Command-line arguments"],
        duration: "2 weeks",
        lessons: 10,
      },
      {
        title: "Algorithms & problem solving",
        summary: "Basic algorithms, searching, sorting, logical problem solving and programming methods.",
        topics: ["Algorithm basics", "Searching", "Sorting", "Problem-solving patterns"],
        duration: "2 weeks",
        lessons: 10,
      },
      {
        title: "Database & application concepts",
        summary: "Database concepts and the relationship between programming concepts and applications.",
        topics: ["Database fundamentals", "SQL basics", "Programs & data", "Application concepts"],
        duration: "1 week",
        lessons: 6,
      },
      {
        title: "Practical exercises & job readiness",
        summary: "Build programming skill through coding projects, debugging exercises and problem-solving tasks.",
        topics: ["Coding projects", "Debugging exercises", "Problem solving", "Interview preparation"],
        duration: "2 weeks",
        lessons: 10,
      },
    ],
    outcomes: [
      "C programming fundamentals",
      "Conditions, loops and functions",
      "Arrays, strings and data handling",
      "Pointers, structures and memory management",
      "File handling, data structures and algorithms",
      "Practical projects and problem-solving skills",
    ],
    tools: [
      "C Programming",
      "Visual Studio Code",
      "Code::Blocks / GCC",
      "Git & GitHub",
      "Data Structures",
      "Algorithms",
      "Pointers & Memory Management",
      "File Handling",
      "SQL & Database Fundamentals",
      "Debugging Tools",
      "Command-Line Programming",
      "Problem-Solving Techniques",
    ],
    roles: [
      "C Programmer",
      "Software Developer",
      "Embedded Systems Developer",
      "System Programmer",
      "Application Developer",
      "Junior Software Engineer",
      "Data Structures & Algorithms Foundation",
    ],
    roleDetails: [
      {
        role: "C Programmer",
        copy: "Build programs, utilities, system-level applications and software solutions using C.",
      },
      {
        role: "Software Developer",
        copy: "Use programming concepts, algorithms and problem-solving skills to design and develop software applications.",
      },
      {
        role: "Embedded Systems Developer",
        copy: "Work on microcontrollers, hardware-oriented applications and embedded systems using C.",
      },
      {
        role: "System Programmer",
        copy: "Work with low-level programming concepts, operating systems, memory management and system-oriented software.",
      },
      {
        role: "Application Developer",
        copy: "Apply programming concepts to build and maintain applications across different development technologies.",
      },
      {
        role: "Junior Software Engineer",
        copy: "Use C, data structures, algorithms and debugging as an entry point into software engineering.",
      },
      {
        role: "Data Structures & Algorithms Foundation",
        copy: "Build a solid programming foundation and move toward software development and competitive programming.",
      },
    ],
    instructor: {
      heading: "Why learn C programming with us?",
      intro:
        "The aim is not to get you through a syllabus but to make you comfortable writing, reading and debugging code — which is the skill every later language and every interview actually tests.",
      points: [
        {
          title: "Learning through practice",
          copy: "Coding problems, assignments, debugging and project-based work rather than theory alone.",
        },
        {
          title: "A program for beginners",
          copy: "Start with basic concepts and move gradually toward the more advanced parts of C.",
        },
        {
          title: "Training with relevant tools",
          copy: "Work with VS Code, GCC, Git, GitHub and debugging tools used in real development.",
        },
        {
          title: "Real programming projects",
          copy: "Build projects that strengthen logical reasoning, coding ability, debugging and your portfolio.",
        },
        {
          title: "Guided sessions",
          copy: "Practical examples, live code writing, doubt clearing and continuous guidance.",
        },
        {
          title: "Technical career skills",
          copy: "Programming, algorithms and problem-solving skills that support interviews, internships and further study.",
        },
      ],
    },
    industries: ["Embedded systems", "Product engineering", "Automotive", "Consumer electronics"],
    nextSteps: ["C++ Programming", "Data structures & algorithms", "Embedded systems", "Operating systems"],
    projects: [
      {
        name: "Student record system",
        summary: "A console application built over structures and file storage.",
        tech: ["C"],
        level: "Beginner",
        skills: ["Structures", "File I/O", "Functions"],
        image: "/images/lab.webp",
      },
      {
        name: "Text-based utility tool",
        summary: "Command-line parsing, dynamic memory and clean teardown.",
        tech: ["C"],
        level: "Intermediate",
        skills: ["Pointers", "Dynamic memory", "Strings"],
        image: "/images/classroom.webp",
      },
      {
        name: "Data structures workbench",
        summary: "Linked lists, stacks and queues implemented and exercised against searching and sorting problems.",
        tech: ["C"],
        level: "Intermediate",
        skills: ["Linked lists", "Algorithms", "Debugging"],
        image: "/images/cyber.webp",
      },
    ],
    related: ["cpp-programming", "java-programming", "python-programming", "data-analytics"],
    keywords: [
      "best c programming course in hoshiarpur",
      "c programming training in hoshiarpur",
      "c programming certification courses",
      "c language classes hoshiarpur",
      "learn c programming",
    ],
  },
  {
    slug: "cpp-programming",
    title: "C++ Programming",
    short:
      "C++ from first syntax to the STL — object-oriented programming, data structures and the algorithms interviews ask about.",
    overview:
      "Get started in programming with structured C++ training in Hoshiarpur. You learn the C++ language alongside data structures and object-oriented programming, which makes it a strong first language for understanding programming concepts and problem-solving approaches. Built for beginners: the track starts at fundamentals and progresses to templates, the STL and algorithmic thinking.",
    category: "Programming",
    duration: "3 Months",
    level: "Beginner to Advanced",
    hero: "/images/courses/cpp-programming.webp",
    videoCaption:
      "Watch. Learn. Code. See how you learn, practise and write code inside the course, and what the whole training experience looks like from the first module to the last.",
    audience: [
      {
        label: "Students & freshers",
        copy: "Start your programming journey with C++ concepts, coding and everyday programming practice.",
      },
      {
        label: "BCA & MCA students",
        copy: "Strengthen your coding fundamentals with C++ and put them to work in academic projects and assignments.",
      },
      {
        label: "Aspiring developers",
        copy: "Learn C++ programming concepts and build a strong foundation for software and application development.",
      },
      {
        label: "Career changers",
        copy: "Move into the IT field by learning a programming language through a structured process.",
      },
      {
        label: "Coding enthusiasts & technologists",
        copy: "Get the grounding in C++ that data structures, algorithms and software development build on.",
      },
    ],
    whyChooseUs: [
      {
        title: "A step-by-step approach to C++",
        copy: "Begin with the basics and move gradually to advanced concepts through detailed explanation, worked examples and practice.",
      },
      {
        title: "Programming through practice",
        copy: "Gain proficiency by writing C++ code, solving logical problems and working through coding exercises.",
      },
      {
        title: "Solid programming fundamentals",
        copy: "Learn programming logic, data structures, algorithms, memory management and object-oriented concepts.",
      },
      {
        title: "Learning through projects",
        copy: "Apply concepts practically with C++ projects, so you see how the language solves real programming problems.",
      },
      {
        title: "Guidance & doubt resolution",
        copy: "Learn through live coding, practical demonstration, debugging and doubt-clearing sessions.",
      },
      {
        title: "Training for a programming career",
        copy: "Build the foundation that supports internships, technical interviews, software development and data structures & algorithms.",
      },
    ],
    modules: [
      {
        title: "Basics of C++",
        summary: "The C++ language from the ground up — variables, data types, operators, input and output, and keywords.",
        topics: ["Syntax & keywords", "Variables & data types", "Operators", "Input & output"],
        duration: "2 weeks",
        lessons: 10,
      },
      {
        title: "Conditions & loops",
        summary: "Conditional statements and loops — if-else, nesting, switch, for, while, do-while and control statements.",
        topics: ["if-else & nesting", "switch", "for / while / do-while", "Control statements"],
        duration: "2 weeks",
        lessons: 10,
      },
      {
        title: "C++ data structures",
        summary: "Arrays, strings, structures and the basic data structures that let you handle data properly.",
        topics: ["Arrays", "Strings", "Structures", "Handling data"],
        duration: "2 weeks",
        lessons: 10,
      },
      {
        title: "Functions & modular programming",
        summary: "Reusable functions, parameters and return values, function overloading, recursion and modular programs.",
        topics: ["Functions & scope", "Overloading", "Recursion", "Modular design"],
        duration: "2 weeks",
        lessons: 10,
      },
      {
        title: "Object-oriented programming",
        summary: "Classes and objects, constructors and destructors, inheritance, polymorphism, encapsulation and abstraction.",
        topics: ["Classes & objects", "Constructors & destructors", "Inheritance & polymorphism", "Encapsulation & abstraction"],
        duration: "3 weeks",
        lessons: 14,
      },
      {
        title: "Pointers, references & memory",
        summary: "Pointers, references, dynamic memory allocation and memory management, and how they are used in C++.",
        topics: ["Pointers", "References", "Dynamic allocation", "Memory management"],
        duration: "2 weeks",
        lessons: 10,
      },
      {
        title: "Advanced C++ topics",
        summary: "Templates, exception handling, namespaces, the STL and iterators, and where each is used in practice.",
        topics: ["Templates", "Exception handling", "Namespaces", "Iterators"],
        duration: "2 weeks",
        lessons: 10,
      },
      {
        title: "Standard Template Library",
        summary: "The STL components used most: vectors, lists, stacks, queues, sets, maps, algorithms and iterators.",
        topics: ["Vectors & lists", "Stacks & queues", "Sets & maps", "STL algorithms"],
        duration: "2 weeks",
        lessons: 10,
      },
      {
        title: "File handling & exception handling",
        summary: "Working with files and errors — try, catch and throw, alongside file streams.",
        topics: ["File streams", "Reading & writing", "try / catch / throw", "Error patterns"],
        duration: "2 weeks",
        lessons: 8,
      },
      {
        title: "Data structures & algorithms",
        summary: "Searching, sorting, linked lists, stacks, queues, trees and algorithmic thinking in C++.",
        topics: ["Searching & sorting", "Linked lists", "Stacks, queues & trees", "Algorithmic thinking"],
        duration: "3 weeks",
        lessons: 12,
      },
      {
        title: "Practical C++ programming",
        summary: "Programming exercises, logical problems, debugging and coding challenges.",
        topics: ["Programming exercises", "Logical problems", "Debugging", "Coding challenges"],
        duration: "2 weeks",
        lessons: 10,
      },
      {
        title: "Projects & career development",
        summary: "Practical projects, programming challenges and debugging exercises that build real experience.",
        topics: ["Project build", "Programming challenges", "Debugging exercises", "Interview preparation"],
        duration: "2 weeks",
        lessons: 10,
      },
    ],
    outcomes: [
      "C++ programming fundamentals",
      "Functions, arrays and strings",
      "Object-oriented programming",
      "Pointers, memory and file handling",
      "Data structures and algorithms",
      "Practical projects and development skills",
    ],
    tools: [
      "C++",
      "Visual Studio Code",
      "Visual Studio",
      "Code::Blocks",
      "Git & GitHub",
      "STL",
      "Data Structures & Algorithms",
      "Object-Oriented Programming",
      "File Handling",
      "C++ Debugging",
      "Problem Solving & Competitive Programming",
      "C++ Project Development",
    ],
    roles: [
      "C++ Developer",
      "Software Developer",
      "Backend Developer",
      "Game Developer",
      "System Programmer",
      "Software Engineer",
      "Data Structures & Algorithms Foundation",
    ],
    roleDetails: [
      {
        role: "C++ Developer",
        copy: "Build applications, software solutions and system programs using C++.",
      },
      {
        role: "Software Developer",
        copy: "Design, develop, test and maintain software applications using core programming concepts.",
      },
      {
        role: "Backend Developer",
        copy: "Build the application logic and server-side behaviour behind a product.",
      },
      {
        role: "Game Developer",
        copy: "Work on games and game logic, where C++ remains the language of choice for performance.",
      },
      {
        role: "System Programmer",
        copy: "Work on system-level software and performance-oriented applications.",
      },
      {
        role: "Software Engineer",
        copy: "Build applications using programming, algorithms and problem-solving technique.",
      },
      {
        role: "Data Structures & Algorithms Foundation",
        copy: "Sharpen problem-solving ability and prepare for advanced software development and competitive programming.",
      },
    ],
    instructor: {
      heading: "Why learn C++ programming with us?",
      intro:
        "C++ rewards understanding over memorisation — pointers, memory and the STL only make sense once you have written and broken them yourself. The sessions are built around that, not around slides.",
      points: [
        {
          title: "Learning by doing",
          copy: "Move past theory with practical coding, assignments, debugging exercises and project-based training.",
        },
        {
          title: "Beginner friendly",
          copy: "Start from the basics and move gradually toward advanced programming concepts.",
        },
        {
          title: "Industry-relevant technologies",
          copy: "Practise with C++, VS Code, Visual Studio, Git, GitHub, the STL and debugging tools.",
        },
        {
          title: "Real-world C++ projects",
          copy: "Build projects that sharpen logical reasoning and programming skill, and give you a portfolio.",
        },
        {
          title: "Guided learning sessions",
          copy: "Coding examples, practical exercises, doubt resolution and continuous guidance.",
        },
        {
          title: "Technology career skills",
          copy: "Programming, problem-solving, data structures and project skills for interviews, internships and freelancing.",
        },
      ],
    },
    industries: ["Product engineering", "Game development", "Embedded systems", "Financial technology"],
    nextSteps: ["Data structures & algorithms", "Competitive programming", "Game development", "Systems programming"],
    projects: [
      {
        name: "Library management system",
        summary: "Classes, inheritance and file storage behind a working console application.",
        tech: ["C++"],
        level: "Beginner",
        skills: ["OOP", "File handling", "Classes"],
        image: "/images/lab.webp",
      },
      {
        name: "STL data structures workbench",
        summary: "Vectors, maps, stacks and queues exercised against searching and sorting problems.",
        tech: ["C++", "STL"],
        level: "Intermediate",
        skills: ["STL", "Algorithms", "Complexity"],
        image: "/images/classroom.webp",
      },
      {
        name: "Console game engine",
        summary: "Game loop, collision logic and dynamic memory, built with templates and operator overloading.",
        tech: ["C++"],
        level: "Advanced",
        skills: ["Templates", "Memory management", "Game logic"],
        image: "/images/cyber.webp",
      },
    ],
    related: ["c-programming", "java-programming", "python-programming", "data-analytics"],
    keywords: [
      "best c++ training in hoshiarpur",
      "c++ course in hoshiarpur",
      "c++ certification courses",
      "c++ programming classes",
      "learn c++ with stl",
    ],
  },
  {
    slug: "kotlin-programming",
    title: "Kotlin Programming",
    short:
      "Kotlin from first syntax to a working Android app — object-oriented programming, null safety, APIs and Firebase.",
    overview:
      "Become confident in app development with structured Kotlin training in Hoshiarpur. You learn the Kotlin language alongside object-oriented programming, Android development and application building. Kotlin's clean syntax makes it a strong first language, and the track is built for beginners: it starts at fundamentals and finishes with Android projects you have built yourself.",
    category: "Programming",
    duration: "3 Months",
    level: "Beginner to Intermediate",
    hero: "/images/courses/kotlin-programming.webp",
    videoCaption:
      "Watch. Learn. Code. See how learners work through Kotlin concepts, write code, build applications and move through the whole training process.",
    audience: [
      {
        label: "Students & freshers",
        copy: "Kick-start your coding journey with Kotlin fundamentals and hands-on programming practice.",
      },
      {
        label: "BCA & MCA students",
        copy: "Master Kotlin concepts, strengthen your coding skills and apply them in academic projects and Android app development.",
      },
      {
        label: "Aspiring Android developers",
        copy: "Build your foundation in modern Android application development using Kotlin.",
      },
      {
        label: "Career changers",
        copy: "Enter the IT industry through a beginner-friendly programming language.",
      },
      {
        label: "App development enthusiasts",
        copy: "Get started with Kotlin for building Android applications, APIs, database work and more.",
      },
      {
        label: "Working professionals",
        copy: "Update your programming skills and learn Kotlin for modern mobile and software development.",
      },
    ],
    whyChooseUs: [
      {
        title: "Kotlin for beginners",
        copy: "Learn from basic to advanced concepts through clear explanations, programming exercises and practice sessions.",
      },
      {
        title: "Hands-on programming",
        copy: "Build skill by writing Kotlin programs, solving problems and working through assignments that turn theory into practice.",
      },
      {
        title: "Android app development",
        copy: "Learn Kotlin alongside Android app development, UI design, app components, navigation and the technologies mobile development uses.",
      },
      {
        title: "Project-based learning",
        copy: "Apply Kotlin to real Android apps and projects, so you learn the development process and finish with portfolio work.",
      },
      {
        title: "Guided practice & doubt clearing",
        copy: "Learn through demonstrations, live coding, worked examples and debugging rather than memorising syntax.",
      },
      {
        title: "Industry-oriented training",
        copy: "Build a foundation in Kotlin and Android for internships, interview preparation, freelancing and growth in mobile development.",
      },
    ],
    modules: [
      {
        title: "Kotlin basics",
        summary: "The Kotlin language, its syntax, variables, data types, operators, input and output, expressions and fundamentals.",
        topics: ["Syntax & keywords", "Variables & data types", "Operators & expressions", "Input & output"],
        duration: "2 weeks",
        lessons: 10,
      },
      {
        title: "Conditions & loops",
        summary: "if-else, nested conditions, when, for and while loops, and control structures through programming exercises.",
        topics: ["if-else & nesting", "when", "for / while", "Control structures"],
        duration: "2 weeks",
        lessons: 10,
      },
      {
        title: "Collections & data manipulation",
        summary: "Lists, sets, maps and arrays, and how data is handled inside an application.",
        topics: ["Lists & sets", "Maps", "Arrays", "Transforming data"],
        duration: "2 weeks",
        lessons: 10,
      },
      {
        title: "Functions & classes",
        summary: "Creating functions, arguments and return values, working with classes and objects, and organising code.",
        topics: ["Functions", "Arguments & return values", "Classes & objects", "Code organisation"],
        duration: "2 weeks",
        lessons: 10,
      },
      {
        title: "Object-oriented programming",
        summary: "Classes, objects, constructors, inheritance, polymorphism, encapsulation, abstraction and interfaces.",
        topics: ["Constructors", "Inheritance & polymorphism", "Encapsulation & abstraction", "Interfaces"],
        duration: "2 weeks",
        lessons: 12,
      },
      {
        title: "Null safety & error handling",
        summary: "Null safety and error handling with nullable types, safe calls, try, catch, finally and exceptions.",
        topics: ["Nullable types", "Safe calls", "try / catch / finally", "Exceptions"],
        duration: "2 weeks",
        lessons: 8,
      },
      {
        title: "Kotlin libraries & development tools",
        summary: "Useful Kotlin libraries and development tools, and how they help build applications and handle data.",
        topics: ["Standard library", "Coroutines", "Gradle", "Tooling"],
        duration: "2 weeks",
        lessons: 8,
      },
      {
        title: "Databases & connectivity",
        summary: "Database concepts and how Kotlin applications store, retrieve, modify and manage application data.",
        topics: ["Database fundamentals", "SQL basics", "CRUD operations", "Local storage"],
        duration: "2 weeks",
        lessons: 10,
      },
      {
        title: "Android application development",
        summary: "Android development with Kotlin — activities, layouts, UI components, navigation and forms.",
        topics: ["Activities", "Layouts & XML", "UI components", "Navigation"],
        duration: "3 weeks",
        lessons: 14,
      },
      {
        title: "APIs & JSON",
        summary: "How mobile applications talk to external services through APIs, handle JSON and integrate online resources.",
        topics: ["REST concepts", "JSON handling", "Consuming APIs", "Integration"],
        duration: "2 weeks",
        lessons: 10,
      },
      {
        title: "Firebase & app integration",
        summary: "Firebase services such as authentication and cloud data, and how modern Android apps integrate with cloud platforms.",
        topics: ["Firebase authentication", "Cloud data", "Realtime updates", "App integration"],
        duration: "2 weeks",
        lessons: 10,
      },
      {
        title: "Projects & career preparation",
        summary: "Practical Android projects, debugging, portfolio building and interview preparation.",
        topics: ["Android project build", "Debugging", "Portfolio", "Interview preparation"],
        duration: "2 weeks",
        lessons: 10,
      },
    ],
    outcomes: [
      "Kotlin programming fundamentals",
      "Conditions, loops and functions",
      "Object-oriented programming in Kotlin",
      "Collections, null safety and exception handling",
      "Android development with Kotlin",
      "APIs, databases and practical projects",
    ],
    tools: [
      "Kotlin",
      "Android Studio",
      "Android SDK",
      "Git & GitHub",
      "XML & Android UI",
      "Jetpack Components",
      "Firebase",
      "SQL & Databases",
      "REST APIs & JSON",
      "Gradle",
      "Android Debugging Tools",
      "Kotlin Coroutines",
    ],
    roles: [
      "Kotlin Developer",
      "Android Developer",
      "Mobile Application Developer",
      "Back-end Developer",
      "Software Developer",
      "Application Developer",
      "Gateway to AI & Emerging Technologies",
    ],
    roleDetails: [
      {
        role: "Kotlin Developer",
        copy: "Build applications, software solutions and back-end services using Kotlin.",
      },
      {
        role: "Android Developer",
        copy: "Build modern Android applications using Kotlin and the Android development stack.",
      },
      {
        role: "Mobile Application Developer",
        copy: "Create functional mobile applications for business and consumer needs.",
      },
      {
        role: "Back-end Developer",
        copy: "Work on server-side development using Kotlin-based back-end technologies.",
      },
      {
        role: "Software Developer",
        copy: "Develop, test and maintain software solutions using Kotlin.",
      },
      {
        role: "Application Developer",
        copy: "Build and integrate application features, databases, APIs and third-party services.",
      },
      {
        role: "Gateway to AI & Emerging Technologies",
        copy: "Strengthen your programming foundation and prepare for opportunities across today's evolving technology landscape.",
      },
    ],
    instructor: {
      heading: "Why learn Kotlin programming with us?",
      intro:
        "Kotlin is best learned by building something that runs on a phone. The sessions are built around that: concepts arrive when a project needs them, not as a list to memorise first.",
      points: [
        {
          title: "Learning through practice",
          copy: "Shift from theory to practical coding through assignments, projects and hands-on training.",
        },
        {
          title: "Beginner friendly",
          copy: "Start at the basics and move step by step, so each concept builds on the last.",
        },
        {
          title: "Industry-relevant tools",
          copy: "Practise with Kotlin, Android Studio, Git, GitHub, Firebase, databases and APIs.",
        },
        {
          title: "Real-world projects",
          copy: "Work on Android application projects that improve coding and problem solving, and build your portfolio.",
        },
        {
          title: "Practical guided sessions",
          copy: "Guided sessions with worked examples, doubt solving, debugging and continuous coding practice.",
        },
        {
          title: "Technology career skills",
          copy: "Programming and application development skills for internships, interviews, freelancing and a technology career.",
        },
      ],
    },
    industries: ["Mobile app development", "Product engineering", "Startups", "IT services"],
    nextSteps: ["Jetpack Compose", "Kotlin coroutines in depth", "Backend with Ktor", "Cross-platform mobile"],
    projects: [
      {
        name: "Notes app with local storage",
        summary: "Create, edit and search notes, persisted to a local database.",
        tech: ["Kotlin", "Android", "SQLite"],
        level: "Beginner",
        skills: ["Activities", "Layouts", "Local storage"],
        image: "/images/lab.webp",
      },
      {
        name: "Weather app over a REST API",
        summary: "Consumes a public API, parses JSON and handles loading and error states.",
        tech: ["Kotlin", "REST APIs", "JSON"],
        level: "Intermediate",
        skills: ["API integration", "Coroutines", "Null safety"],
        image: "/images/classroom.webp",
      },
      {
        name: "Firebase-backed task manager",
        summary: "Authentication, cloud data and realtime updates across devices.",
        tech: ["Kotlin", "Android", "Firebase"],
        level: "Intermediate",
        skills: ["Authentication", "Cloud data", "App architecture"],
        image: "/images/cyber.webp",
      },
    ],
    related: ["java-programming", "cpp-programming", "python-programming", "full-stack-web-development"],
    keywords: [
      "best kotlin course in hoshiarpur",
      "kotlin training in hoshiarpur",
      "kotlin certification courses",
      "android development with kotlin",
      "kotlin app development classes",
    ],
  },
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
    related: ["full-stack-web-development", "mern-stack-development", "digital-marketing", "web-development"],
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
    related: ["full-stack-web-development", "mern-stack-development", "web-designing", "java-programming"],
    keywords: [
      "best web development course in hoshiarpur",
      "web development training in hoshiarpur",
      "react and node js training",
      "frontend and backend course hoshiarpur",
      "full stack web development classes",
    ],
  },
  {
    slug: "mean-stack-development",
    title: "MEAN Stack Development",
    short:
      "MongoDB, Express, Angular and Node — one JavaScript stack from first component to a deployed, database-driven application.",
    overview:
      "Take the first step toward a full-stack career with structured MEAN training in Hoshiarpur. You study MongoDB, Express.js, Angular and Node.js alongside JavaScript, database management, REST APIs and modern web development practice. Suitable for beginners: the track starts at web fundamentals and builds through frontend, backend and database work to a complete application.",
    category: "Web Development",
    duration: "5 Months",
    level: "Intermediate",
    hero: "/images/courses/mean-stack-development.webp",
    videoCaption:
      "Watch. Learn. Create. See what you will be building in the MEAN Stack training and how the course is structured from fundamentals through to a full application.",
    audience: [
      {
        label: "Students & freshers",
        copy: "Build your foundation in frontend and backend development through beginner-friendly concepts, hands-on coding and practical web application projects.",
      },
      {
        label: "BCA & MCA students",
        copy: "Strengthen your programming knowledge and get practical exposure to modern web development technologies.",
      },
      {
        label: "MEAN stack aspirants",
        copy: "Learn the MEAN stack and develop the skills to build complete web applications.",
      },
      {
        label: "Career shifters",
        copy: "Gain full-stack knowledge and experience, and move into the IT industry.",
      },
      {
        label: "JavaScript learners",
        copy: "Work in one language across the whole stack, since MEAN is JavaScript end to end.",
      },
      {
        label: "Working professionals",
        copy: "Improve your development skills and learn current tools for building web solutions.",
      },
    ],
    whyChooseUs: [
      {
        title: "Frontend and backend, made approachable",
        copy: "Begin at web development basics and move step by step through frontend, backend, database and server-side concepts with worked examples.",
      },
      {
        title: "The complete MEAN stack",
        copy: "Learn MongoDB, Express.js, Angular and Node.js, and how the four fit together to build an application.",
      },
      {
        title: "Coding and web app development",
        copy: "Write code, build components, develop APIs, integrate databases and build an application in practice.",
      },
      {
        title: "Real-life MEAN projects",
        copy: "Build projects that give a working understanding, exercise problem solving and add real weight to your resume.",
      },
      {
        title: "Learning & technical support",
        copy: "Practical examples, coding practice, debugging and doubt solving across projects and full-stack concepts.",
      },
      {
        title: "Skills for future careers",
        copy: "Develop internship- and job-ready skills alongside genuine expertise in full-stack technologies.",
      },
    ],
    modules: [
      {
        title: "Web development fundamentals",
        summary: "HTML, CSS, JavaScript basics, page structure, responsive design and the fundamentals modern web development needs.",
        topics: ["HTML structure", "CSS styling", "Responsive design", "Web fundamentals"],
        duration: "2 weeks",
        lessons: 10,
      },
      {
        title: "JavaScript programming",
        summary: "Variables, data types, operators, functions, arrays, objects, loops, conditions, ES6 features and asynchronous programming.",
        topics: ["Core syntax", "Functions & objects", "ES6 features", "Async programming"],
        duration: "2 weeks",
        lessons: 12,
      },
      {
        title: "Angular fundamentals",
        summary: "Angular architecture, components, templates, directives, data binding, modules, services, routing and forms.",
        topics: ["Components & templates", "Directives", "Data binding", "Routing & forms"],
        duration: "3 weeks",
        lessons: 14,
      },
      {
        title: "Advanced Angular development",
        summary: "Services, dependency injection, reactive forms, HTTP requests, route guards, authentication concepts and API integration.",
        topics: ["Dependency injection", "Reactive forms", "HTTP & interceptors", "Route guards"],
        duration: "3 weeks",
        lessons: 14,
      },
      {
        title: "Node.js fundamentals",
        summary: "How Node.js works, building server-side applications, npm, modules, asynchronous operations and backend services.",
        topics: ["Node runtime", "npm & modules", "Async operations", "Backend services"],
        duration: "2 weeks",
        lessons: 10,
      },
      {
        title: "Express.js & backend development",
        summary: "Routing, middleware, request and response handling, controllers, authentication, validation and error handling.",
        topics: ["Routing", "Middleware", "Controllers", "Validation & errors"],
        duration: "3 weeks",
        lessons: 12,
      },
      {
        title: "MongoDB database",
        summary: "Collections, documents, CRUD, queries, relationships, indexing and database management for web applications.",
        topics: ["Collections & documents", "CRUD", "Queries", "Indexing"],
        duration: "2 weeks",
        lessons: 12,
      },
      {
        title: "MongoDB with Node.js",
        summary: "Connecting MongoDB to Node applications — schemas, models, validation and working with application data.",
        topics: ["Mongoose schemas", "Models", "Validation", "Data operations"],
        duration: "2 weeks",
        lessons: 10,
      },
      {
        title: "REST APIs & JSON",
        summary: "Building and consuming REST APIs, HTTP methods, JSON handling, connecting frontend to backend and managing responses.",
        topics: ["HTTP methods", "JSON", "API design", "Frontend integration"],
        duration: "2 weeks",
        lessons: 10,
      },
      {
        title: "Authentication & security",
        summary: "Registration, login, password handling, authentication workflows, authorisation, tokens and basic security practice.",
        topics: ["Registration & login", "Password handling", "JWT & tokens", "Authorisation"],
        duration: "2 weeks",
        lessons: 10,
      },
      {
        title: "Git, GitHub & deployment",
        summary: "Version control, repository management, branches, collaboration and the basics of deploying a web application.",
        topics: ["Git basics", "Branches", "Collaboration", "Deployment"],
        duration: "1 week",
        lessons: 8,
      },
      {
        title: "Projects & career preparation",
        summary: "Full-stack projects, debugging, API integration, portfolio development and interview-oriented preparation.",
        topics: ["Capstone project", "Debugging", "Portfolio", "Interview preparation"],
        duration: "2 weeks",
        lessons: 10,
      },
    ],
    outcomes: [
      "Web development and HTML/CSS fundamentals",
      "JavaScript and TypeScript programming",
      "Angular frontend development",
      "Node.js and Express.js backend development",
      "MongoDB and database integration",
      "Full stack projects and deployment skills",
    ],
    tools: [
      "MongoDB",
      "Express.js",
      "Angular",
      "Node.js",
      "JavaScript",
      "HTML5 & CSS3",
      "VS Code",
      "Git & GitHub",
      "REST APIs & JSON",
      "MongoDB Compass",
      "npm",
      "Postman",
      "Authentication & JWT",
      "Web Application Deployment",
    ],
    roles: [
      "MEAN Stack Developer",
      "Full Stack Developer",
      "Frontend Developer",
      "Backend Developer",
      "Angular Developer",
      "Node.js Developer",
      "Web Application Developer",
      "Foundation in Full-Stack Development",
    ],
    roleDetails: [
      {
        role: "MEAN Stack Developer",
        copy: "Build entire web applications with MongoDB, Express.js, Angular and Node.js.",
      },
      {
        role: "Full Stack Developer",
        copy: "Develop both the frontend interface and the backend systems behind modern web applications.",
      },
      {
        role: "Frontend Developer",
        copy: "Design responsive, interactive interfaces with Angular, JavaScript, HTML and CSS.",
      },
      {
        role: "Backend Developer",
        copy: "Build server-side applications, RESTful APIs, authentication systems and database layers with Node.js and Express.js.",
      },
      {
        role: "Angular Developer",
        copy: "Build scalable, dynamic web applications using Angular.",
      },
      {
        role: "Node.js Developer",
        copy: "Develop backend services, REST APIs and server-side applications with Node.js.",
      },
      {
        role: "Web Application Developer",
        copy: "Design, build, integrate and maintain complete database-driven web applications.",
      },
      {
        role: "Foundation in Full-Stack Development",
        copy: "Build a grounding in modern web technologies and move a step further into full-stack development.",
      },
    ],
    instructor: {
      heading: "Why learn MEAN stack development with us?",
      intro:
        "Angular rewards structure, and the stack only makes sense once one language carries you from a form field to a database write. The sessions follow that path, so every concept arrives attached to something already running.",
      points: [
        {
          title: "Learning through practice",
          copy: "Apply theory through coding practice, assignments, API integration and full-stack projects.",
        },
        {
          title: "Beginner-level program",
          copy: "Start from the basics and progress through frontend, backend, database and application development.",
        },
        {
          title: "Industry relevance",
          copy: "Train on the tools teams actually use — MongoDB, Express.js, Angular, Node.js, Git, GitHub, Postman and APIs.",
        },
        {
          title: "Real-world projects",
          copy: "Build applications that strengthen development skill, problem solving and your portfolio.",
        },
        {
          title: "Guided sessions",
          copy: "Well-structured sessions with live coding, debugging and doubt solving.",
        },
        {
          title: "Technology career skills",
          copy: "Frontend, backend, database, API and deployment skills for internships, interviews and freelancing.",
        },
      ],
    },
    industries: ["Product companies", "Enterprise software", "SaaS", "IT services"],
    nextSteps: ["TypeScript in depth", "NgRx state management", "Cloud & DevOps", "System design"],
    projects: [
      {
        name: "Angular frontend over a REST API",
        summary: "Components, routing and reactive forms, fed by data fetched over HTTP.",
        tech: ["Angular", "TypeScript", "REST APIs"],
        level: "Beginner",
        skills: ["Components", "Routing", "HTTP"],
        image: "/images/classroom.webp",
      },
      {
        name: "Authenticated Express API",
        summary: "Express and MongoDB behind registration, login, token sessions and protected routes.",
        tech: ["Node.js", "Express.js", "MongoDB", "JWT"],
        level: "Intermediate",
        skills: ["REST design", "Authentication", "Validation"],
        image: "/images/cyber.webp",
      },
      {
        name: "Full stack MEAN capstone",
        summary: "An Angular front end on an Express API and MongoDB, version-controlled and deployed.",
        tech: ["MongoDB", "Express.js", "Angular", "Node.js"],
        level: "Advanced",
        skills: ["Full stack architecture", "Deployment", "Git workflow"],
        image: "/images/lab.webp",
      },
    ],
    related: ["mern-stack-development", "full-stack-web-development", "web-development", "java-programming"],
    keywords: [
      "best mean stack course in hoshiarpur",
      "mean stack training in hoshiarpur",
      "angular and node js classes",
      "mongodb express angular node course",
      "full stack javascript training",
    ],
  },
  {
    slug: "php-full-stack",
    title: "PHP Full Stack",
    short:
      "PHP, MySQL and Laravel with the frontend that sits on top — dynamic, database-driven applications built end to end.",
    overview:
      "Kick-start your web development career with structured PHP Full Stack training in Hoshiarpur. You learn frontend technologies, backend programming in PHP, MySQL databases, APIs and practical project development. Built for beginners and aspiring developers: the track starts at how the web works and finishes with dynamic, database-driven applications you have built yourself.",
    category: "Web Development",
    duration: "4 Months",
    level: "Beginner to Advanced",
    hero: "/images/courses/php-full-stack.webp",
    videoCaption:
      "Watch. Learn. Code. See how students work through frontend and backend development, practise coding, and build real web development projects during the training.",
    audience: [
      {
        label: "Students & freshers",
        copy: "Start your web development journey with HTML, CSS, JavaScript, PHP and database fundamentals through practical coding.",
      },
      {
        label: "BCA & MCA students",
        copy: "Strengthen your development knowledge by learning full stack concepts and applying them to academic and personal projects.",
      },
      {
        label: "Web developer aspirants",
        copy: "Build the skills to create responsive websites, dynamic applications, backend systems and database-driven solutions.",
      },
      {
        label: "Career shifters",
        copy: "Move toward the IT industry through a structured full stack path with beginner-friendly concepts and hands-on practice.",
      },
      {
        label: "Coding enthusiasts",
        copy: "Explore frontend, backend, databases, APIs and complete application development through practical projects.",
      },
      {
        label: "Working professionals",
        copy: "Upgrade existing web skills and learn modern tools and techniques for building scalable web applications.",
      },
    ],
    whyChooseUs: [
      {
        title: "Step-by-step learning from the basics",
        copy: "Learn PHP from its fundamentals and progress to full stack development through structured teaching, coding practice and worked examples.",
      },
      {
        title: "Frontend and backend skills",
        copy: "Build a complete website from scratch — HTML, CSS and JavaScript on the front, PHP and MySQL behind it.",
      },
      {
        title: "Training with relevant technologies",
        copy: "Work with VS Code, Git, GitHub, MySQL, API integrations, Bootstrap and PHP frameworks.",
      },
      {
        title: "Dynamic website development",
        copy: "Get practical experience building dynamic sites, admin panels, login forms, eCommerce features and database-driven applications.",
      },
      {
        title: "Coding practice with live sessions",
        copy: "Live coding, assignments, debugging sessions and regular doubt clearing so the concepts actually land.",
      },
      {
        title: "Skills for a web development career",
        copy: "Build toward jobs, internships, freelance work and interview readiness in web development.",
      },
    ],
    modules: [
      {
        title: "Web development fundamentals",
        summary: "How websites work — HTML and CSS basics, browsers, servers, responsive layouts and core web concepts.",
        topics: ["How the web works", "Browsers & servers", "HTML basics", "Responsive layout"],
        duration: "1 week",
        lessons: 8,
      },
      {
        title: "HTML & CSS",
        summary: "Structured pages with HTML and responsive interfaces with CSS — layouts, forms, navigation, Flexbox and Grid.",
        topics: ["Page structure", "Forms & navigation", "Flexbox", "CSS Grid"],
        duration: "2 weeks",
        lessons: 12,
      },
      {
        title: "JavaScript fundamentals",
        summary: "Variables, functions, conditions, loops, arrays, objects, DOM manipulation and events for interactive pages.",
        topics: ["Core syntax", "Arrays & objects", "DOM manipulation", "Events"],
        duration: "2 weeks",
        lessons: 12,
      },
      {
        title: "Frontend development",
        summary: "User-friendly interfaces built with responsive design principles, reusable components, forms and validation.",
        topics: ["Responsive design", "Reusable components", "Forms", "Client-side validation"],
        duration: "2 weeks",
        lessons: 10,
      },
      {
        title: "PHP fundamentals",
        summary: "PHP syntax, variables, data types, operators, conditions, loops, functions, arrays, forms, sessions and cookies.",
        topics: ["Syntax & types", "Functions & arrays", "Form handling", "Sessions & cookies"],
        duration: "3 weeks",
        lessons: 14,
      },
      {
        title: "Object-oriented PHP",
        summary: "Classes, objects, constructors, inheritance, polymorphism, encapsulation and abstraction for organised applications.",
        topics: ["Classes & objects", "Constructors", "Inheritance & polymorphism", "Encapsulation"],
        duration: "2 weeks",
        lessons: 12,
      },
      {
        title: "MySQL & database management",
        summary: "Database concepts and MySQL in practice — creating tables, inserting, retrieving, updating and deleting records.",
        topics: ["Tables & schemas", "SELECT & queries", "Joins", "Relational design"],
        duration: "2 weeks",
        lessons: 12,
      },
      {
        title: "PHP & MySQL connectivity",
        summary: "Connecting PHP to MySQL and building database-driven features — registration, login, CRUD, search and data management.",
        topics: ["Database connection", "CRUD operations", "Registration & login", "Search"],
        duration: "2 weeks",
        lessons: 12,
      },
      {
        title: "PHP framework development",
        summary: "An introduction to Laravel — routing, controllers, models, views, forms, authentication and MVC architecture.",
        topics: ["MVC architecture", "Routing & controllers", "Models & views", "Laravel authentication"],
        duration: "3 weeks",
        lessons: 14,
      },
      {
        title: "APIs & JSON",
        summary: "How applications communicate through APIs, exchange data as JSON, and connect a frontend to backend services.",
        topics: ["REST concepts", "JSON", "Consuming APIs", "Frontend integration"],
        duration: "1 week",
        lessons: 8,
      },
      {
        title: "Authentication & web security",
        summary: "Login systems, sessions, user roles, form validation, password handling and essential security practice.",
        topics: ["Login & sessions", "User roles", "Server-side validation", "Password handling"],
        duration: "2 weeks",
        lessons: 10,
      },
      {
        title: "Projects & career preparation",
        summary: "Full stack projects, debugging, portfolio development, Git workflows and interview-oriented preparation.",
        topics: ["Capstone project", "Debugging", "Git workflow", "Interview preparation"],
        duration: "2 weeks",
        lessons: 10,
      },
    ],
    outcomes: [
      "Frontend development fundamentals",
      "Core PHP programming",
      "MySQL database management",
      "Backend development and authentication",
      "APIs, Git and deployment",
      "Full stack projects and development skills",
    ],
    tools: [
      "HTML5 & CSS3",
      "JavaScript",
      "PHP",
      "MySQL",
      "Laravel",
      "Bootstrap",
      "VS Code",
      "Git & GitHub",
      "REST APIs & JSON",
      "phpMyAdmin",
      "CRUD Operations",
      "Responsive Web Design",
    ],
    roles: [
      "PHP Developer",
      "Full Stack Developer",
      "Backend Developer",
      "Web Developer",
      "Laravel Developer",
      "MySQL Database Developer",
      "Software Developer",
    ],
    roleDetails: [
      {
        role: "PHP Developer",
        copy: "Build dynamic websites, server-side applications, APIs and backend solutions using PHP.",
      },
      {
        role: "Full Stack Developer",
        copy: "Work across frontend, backend, databases and application functionality to deliver complete web solutions.",
      },
      {
        role: "Backend Developer",
        copy: "Create server-side applications, database-driven systems, APIs and business logic.",
      },
      {
        role: "Web Developer",
        copy: "Design and build responsive, interactive, dynamic websites across frontend and backend.",
      },
      {
        role: "Laravel Developer",
        copy: "Build structured, scalable applications with the Laravel framework and MVC architecture.",
      },
      {
        role: "MySQL Database Developer",
        copy: "Manage application databases, queries, records, relationships and data-driven functionality.",
      },
      {
        role: "Software Developer",
        copy: "Apply programming, database, API and application skills to build and maintain software.",
      },
    ],
    instructor: {
      heading: "Why learn PHP full stack development with us?",
      intro:
        "PHP is still what a large share of the web runs on, and it is best learned by shipping something that stores real data. Every concept here arrives attached to a page, a form or a table you are already working on.",
      points: [
        {
          title: "Learning by practicing",
          copy: "Move beyond theory with coding exercises, assignments, practical tasks and project-based development.",
        },
        {
          title: "Beginner-friendly program",
          copy: "Start from fundamental web concepts and progress toward frontend, backend, database and full stack work.",
        },
        {
          title: "Industry-relevant tools",
          copy: "Work with PHP, MySQL, Laravel, JavaScript, Git, GitHub, APIs and Bootstrap.",
        },
        {
          title: "Real-world projects",
          copy: "Build websites and applications that sharpen problem solving and strengthen your portfolio.",
        },
        {
          title: "Guided sessions",
          copy: "Structured classes with practical demonstrations, coding practice, debugging and doubt solving.",
        },
        {
          title: "Technology career skills",
          copy: "Programming and project skills for internships, interviews, freelancing and professional development roles.",
        },
      ],
    },
    industries: ["Digital agencies", "IT services", "E-commerce", "Freelance & contract work"],
    nextSteps: ["Laravel in depth", "REST API design", "Cloud & DevOps", "JavaScript frameworks"],
    projects: [
      {
        name: "Dynamic website with admin panel",
        summary: "A content-driven site with a protected admin area, backed by MySQL.",
        tech: ["PHP", "MySQL", "Bootstrap"],
        level: "Beginner",
        skills: ["CRUD", "Sessions", "Templating"],
        image: "/images/lab.webp",
      },
      {
        name: "User authentication system",
        summary: "Registration, login, roles and password handling built the way a real application needs it.",
        tech: ["PHP", "MySQL"],
        level: "Intermediate",
        skills: ["Authentication", "Validation", "Security practice"],
        image: "/images/cyber.webp",
      },
      {
        name: "Laravel eCommerce application",
        summary: "Products, cart and orders on an MVC structure, with authentication and a JSON API.",
        tech: ["Laravel", "PHP", "MySQL", "REST APIs"],
        level: "Advanced",
        skills: ["MVC", "Eloquent models", "API design"],
        image: "/images/classroom.webp",
      },
    ],
    related: ["full-stack-web-development", "web-development", "mern-stack-development", "web-designing"],
    keywords: [
      "best php full stack course in hoshiarpur",
      "php full stack training in hoshiarpur",
      "php certification courses",
      "laravel training hoshiarpur",
      "php mysql classes",
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
    hero: "/images/courses/shopify.webp",
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
