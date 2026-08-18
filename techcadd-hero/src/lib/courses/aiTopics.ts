import { makeCourse, type Spec } from "./more";
import type { Course } from "./types";

/**
 * The AI topics the mega menu links to.
 *
 * These exist so the menu can route by slug — `/courses/${slug}` — instead of
 * pointing seven labels at one page. Same factory as the rest of the
 * catalogue, so each gets a full detail page, sitemap entry and JSON-LD.
 *
 * The curriculum here is scaffolding written to match the shape of the
 * existing courses. Review the modules, durations and outcomes against what
 * TechCadd actually teaches before this goes in front of students.
 */

/** The dedicated AI category, shared with `artificial-intelligence`. */
export const AI_CATEGORY = "AI";

const CATEGORY = AI_CATEGORY;
const HERO = "/images/ai.webp";

const SPECS: Spec[] = [
  {
    slug: "generative-ai",
    title: "Generative AI",
    short: "Build with the models that write, draw and summarise.",
    overview:
      "How generative models work and how to build on them: prompting, embeddings, fine-tuning and the guardrails a production feature needs.",
    category: CATEGORY,
    duration: "3 Months",
    level: "Beginner to Intermediate",
    hero: HERO,
    modules: [
      { title: "How generative models work", summary: "Tokens, context and why output varies.", topics: ["Tokens", "Context windows", "Temperature", "Limits"], duration: "2 weeks", lessons: 8 },
      { title: "Working with APIs", summary: "Calling models and handling their responses.", topics: ["Chat APIs", "Streaming", "Errors", "Cost control"], duration: "3 weeks", lessons: 12 },
      { title: "Embeddings & search", summary: "Making a model answer from your own content.", topics: ["Embeddings", "Vector stores", "Chunking", "Ranking"], duration: "3 weeks", lessons: 12 },
      { title: "Shipping safely", summary: "Evaluation, guardrails and review.", topics: ["Evaluation", "Guardrails", "Prompt injection", "Human review"], duration: "3 weeks", lessons: 12 },
    ],
    outcomes: ["Build features on a generative model", "Reason about cost and latency", "Ground answers in your own data", "Evaluate output quality", "Recognise where not to use a model"],
    tools: ["Python", "OpenAI API", "LangChain", "Vector databases", "Git"],
    roles: ["AI Application Developer", "Prompt Engineer", "AI Product Analyst", "Automation Developer"],
    industries: ["Product engineering", "Marketing technology", "Support automation", "Consulting"],
    nextSteps: ["Agentic AI", "RAG", "Machine Learning", "MLOps"],
    projects: [
      { name: "Content assistant", summary: "A drafting tool with tone and length controls.", tech: ["Python", "OpenAI API"], level: "Beginner", skills: ["Prompting", "APIs", "Evaluation"], image: "/images/lab.webp" },
      { name: "Document Q&A", summary: "Answers grounded in a folder of PDFs.", tech: ["Python", "Vector DB"], level: "Intermediate", skills: ["Embeddings", "Chunking", "Ranking"], image: "/images/classroom.webp" },
    ],
    related: ["artificial-intelligence", "prompt-engineering", "rag-retrieval-augmented-generation", "agentic-ai"],
    keywords: ["generative ai course Hoshiarpur", "genai training", "llm course", "ai developer course"],
  },
  {
    slug: "prompt-engineering",
    title: "Prompt Engineering",
    short: "Get reliable output from a model, repeatably.",
    overview:
      "Prompting as an engineering practice: structure, examples, evaluation and the patterns that hold up when a prompt runs a thousand times a day.",
    category: CATEGORY,
    duration: "6 Weeks",
    level: "Beginner",
    hero: HERO,
    modules: [
      { title: "Prompt structure", summary: "Instruction, context, examples, format.", topics: ["Instructions", "Context", "Few-shot", "Output format"], duration: "2 weeks", lessons: 8 },
      { title: "Patterns that work", summary: "Chaining, decomposition and self-checking.", topics: ["Chaining", "Decomposition", "Self-check", "Reflection"], duration: "2 weeks", lessons: 8 },
      { title: "Evaluating prompts", summary: "Test sets instead of impressions.", topics: ["Test sets", "Scoring", "Regression", "A/B"], duration: "2 weeks", lessons: 8 },
    ],
    outcomes: ["Write prompts that hold up in production", "Build a test set for a prompt", "Debug an unreliable prompt", "Chain steps for complex tasks", "Control output format"],
    tools: ["ChatGPT", "Claude", "Python", "Jupyter", "Git"],
    roles: ["Prompt Engineer", "AI Content Specialist", "Automation Analyst", "AI Support Designer"],
    industries: ["Marketing", "Customer support", "Operations", "Publishing"],
    nextSteps: ["Generative AI", "Agentic AI", "AI-Powered Marketing", "RAG"],
    projects: [
      { name: "Prompt test harness", summary: "Score a prompt against a fixed test set.", tech: ["Python"], level: "Beginner", skills: ["Evaluation", "Scoring", "Iteration"], image: "/images/lab.webp" },
      { name: "Support reply generator", summary: "On-brand replies with escalation rules.", tech: ["ChatGPT"], level: "Intermediate", skills: ["Chaining", "Tone", "Guardrails"], image: "/images/classroom.webp" },
    ],
    related: ["generative-ai", "chatgpt-ai-tools", "ai-powered-marketing", "artificial-intelligence"],
    keywords: ["prompt engineering course Hoshiarpur", "prompt training", "chatgpt prompt course", "ai prompting"],
  },
  {
    slug: "chatgpt-ai-tools",
    title: "ChatGPT & AI Tools",
    short: "A working toolkit for everyday professional tasks.",
    overview:
      "The current generation of AI tools applied to real work: writing, research, spreadsheets, images and meeting notes — with a clear sense of what to check.",
    category: CATEGORY,
    duration: "6 Weeks",
    level: "Beginner",
    hero: HERO,
    modules: [
      { title: "ChatGPT for daily work", summary: "Drafting, editing, summarising, planning.", topics: ["Drafting", "Summarising", "Rewriting", "Planning"], duration: "2 weeks", lessons: 8 },
      { title: "Research & data", summary: "Documents, spreadsheets and citations.", topics: ["Document Q&A", "Spreadsheets", "Citations", "Verification"], duration: "2 weeks", lessons: 8 },
      { title: "Media & automation", summary: "Images, slides and connecting tools together.", topics: ["Image tools", "Slides", "Transcription", "Automation"], duration: "2 weeks", lessons: 8 },
    ],
    outcomes: ["Use AI tools for daily work", "Check output before you rely on it", "Automate a repetitive task", "Produce images and slides", "Choose the right tool for a job"],
    tools: ["ChatGPT", "Claude", "Canva AI", "Notion AI", "Zapier"],
    roles: ["AI-Enabled Executive", "Content Specialist", "Operations Associate", "Research Assistant"],
    industries: ["Any office role", "Marketing", "Education", "Small business"],
    nextSteps: ["Prompt Engineering", "AI-Powered Marketing", "Generative AI", "Digital Marketing"],
    projects: [
      { name: "Personal automation kit", summary: "Three recurring tasks, automated end to end.", tech: ["ChatGPT", "Zapier"], level: "Beginner", skills: ["Automation", "Prompting", "Review"], image: "/images/lab.webp" },
      { name: "Research brief", summary: "A sourced brief with every claim checked.", tech: ["ChatGPT"], level: "Beginner", skills: ["Research", "Verification", "Writing"], image: "/images/classroom.webp" },
    ],
    related: ["prompt-engineering", "ai-powered-marketing", "generative-ai", "artificial-intelligence"],
    keywords: ["chatgpt course Hoshiarpur", "ai tools training", "ai for professionals", "chatgpt classes"],
  },
  {
    slug: "agentic-ai",
    title: "Agentic AI",
    short: "Systems that plan, call tools and finish a task.",
    overview:
      "Moving from single prompts to agents: tool calling, planning loops, memory, and the supervision an autonomous system needs before it touches anything real.",
    category: CATEGORY,
    duration: "3 Months",
    level: "Intermediate",
    hero: HERO,
    modules: [
      { title: "From prompts to agents", summary: "Why a loop beats a single call.", topics: ["Agent loops", "Planning", "Stop conditions", "Failure modes"], duration: "3 weeks", lessons: 12 },
      { title: "Tool calling", summary: "Giving a model access to real functions.", topics: ["Function calling", "Schemas", "Validation", "Errors"], duration: "3 weeks", lessons: 12 },
      { title: "Memory & state", summary: "What an agent remembers between steps.", topics: ["Short-term memory", "Vector memory", "State", "Context limits"], duration: "3 weeks", lessons: 12 },
      { title: "Supervision", summary: "Cost ceilings, approvals and audit trails.", topics: ["Budgets", "Approvals", "Logging", "Rollback"], duration: "3 weeks", lessons: 12 },
    ],
    outcomes: ["Build an agent that completes a multi-step task", "Expose tools safely to a model", "Manage agent memory and state", "Cap cost and runtime", "Log a run for review"],
    tools: ["Python", "LangGraph", "OpenAI API", "Vector databases", "Docker"],
    roles: ["AI Engineer", "Automation Engineer", "AI Platform Developer", "Integration Developer"],
    industries: ["Product engineering", "Operations", "Fintech", "Logistics"],
    nextSteps: ["RAG", "MLOps", "Machine Learning", "System design"],
    projects: [
      { name: "Research agent", summary: "Plans, searches, and returns a sourced summary.", tech: ["Python", "LangGraph"], level: "Intermediate", skills: ["Planning", "Tools", "Logging"], image: "/images/lab.webp" },
      { name: "Ops assistant", summary: "Runs a checklist across systems with approvals.", tech: ["Python"], level: "Advanced", skills: ["Tool calling", "Approvals", "Audit"], image: "/images/classroom.webp" },
    ],
    related: ["generative-ai", "rag-retrieval-augmented-generation", "machine-learning", "artificial-intelligence"],
    keywords: ["agentic ai course Hoshiarpur", "ai agents training", "langgraph course", "ai automation course"],
  },
  {
    slug: "ai-powered-marketing",
    title: "AI-Powered Marketing",
    short: "Campaigns planned, produced and measured with AI.",
    overview:
      "Where AI genuinely helps a marketing team: audience research, production at volume, ad iteration and reporting — with the judgement to know what still needs a human.",
    category: CATEGORY,
    duration: "3 Months",
    level: "Beginner",
    hero: HERO,
    modules: [
      { title: "Research & positioning", summary: "Audiences, competitors and messaging.", topics: ["Audience research", "Competitor scans", "Positioning", "Briefs"], duration: "3 weeks", lessons: 12 },
      { title: "Production at volume", summary: "Copy, creative and variants that stay on brand.", topics: ["Copy systems", "Creative", "Brand voice", "Variants"], duration: "3 weeks", lessons: 12 },
      { title: "Ads & optimisation", summary: "Testing and iterating with AI in the loop.", topics: ["Ad copy", "Testing", "Budgets", "Iteration"], duration: "3 weeks", lessons: 12 },
      { title: "Reporting", summary: "Turning campaign data into a decision.", topics: ["Dashboards", "Attribution", "Summaries", "Recommendations"], duration: "3 weeks", lessons: 12 },
    ],
    outcomes: ["Run research in a fraction of the time", "Produce on-brand copy at volume", "Test ad variants systematically", "Build a reporting workflow", "Judge where AI output is not good enough"],
    tools: ["ChatGPT", "Google Ads", "Meta Ads", "Canva AI", "Looker Studio"],
    roles: ["Digital Marketing Executive", "Performance Marketer", "Content Strategist", "Growth Associate"],
    industries: ["Agencies", "E-commerce", "SaaS", "Education"],
    nextSteps: ["Digital Marketing", "Google Ads", "SEO", "Prompt Engineering"],
    projects: [
      { name: "Campaign in a week", summary: "Research, copy, creative and a live test.", tech: ["ChatGPT", "Meta Ads"], level: "Beginner", skills: ["Research", "Copy", "Testing"], image: "/images/lab.webp" },
      { name: "Reporting workflow", summary: "Campaign data to a written recommendation.", tech: ["Looker Studio"], level: "Intermediate", skills: ["Analysis", "Reporting", "Writing"], image: "/images/classroom.webp" },
    ],
    related: ["digital-marketing", "google-ads", "chatgpt-ai-tools", "seo"],
    keywords: ["ai marketing course Hoshiarpur", "ai digital marketing", "ai for marketers", "marketing automation course"],
  },
  {
    slug: "rag-retrieval-augmented-generation",
    title: "RAG (Retrieval-Augmented Generation)",
    short: "Make a model answer from your documents, with sources.",
    overview:
      "Retrieval-augmented generation end to end: ingestion, chunking, embeddings, retrieval quality and citations — the architecture behind most useful AI products.",
    category: CATEGORY,
    duration: "3 Months",
    level: "Intermediate",
    hero: HERO,
    modules: [
      { title: "Why retrieval", summary: "The problem RAG actually solves.", topics: ["Hallucination", "Freshness", "Cost", "Trust"], duration: "2 weeks", lessons: 8 },
      { title: "Ingestion & chunking", summary: "Getting documents into a usable shape.", topics: ["Parsing", "Chunking", "Metadata", "Cleaning"], duration: "3 weeks", lessons: 12 },
      { title: "Embeddings & retrieval", summary: "Finding the right passage every time.", topics: ["Embeddings", "Vector search", "Hybrid search", "Re-ranking"], duration: "3 weeks", lessons: 12 },
      { title: "Answers & evaluation", summary: "Citations, refusals and measuring quality.", topics: ["Citations", "Refusals", "Eval sets", "Latency"], duration: "3 weeks", lessons: 12 },
    ],
    outcomes: ["Build a RAG pipeline end to end", "Choose a chunking strategy", "Improve retrieval quality measurably", "Cite sources in an answer", "Evaluate a RAG system"],
    tools: ["Python", "LangChain", "Pinecone", "PostgreSQL", "FastAPI"],
    roles: ["AI Engineer", "Search Engineer", "Backend Developer", "Data Engineer"],
    industries: ["Legal tech", "Healthcare", "Enterprise software", "Support"],
    nextSteps: ["Agentic AI", "Machine Learning", "Data Engineering", "MLOps"],
    projects: [
      { name: "Policy assistant", summary: "Answers from a document set, every claim cited.", tech: ["Python", "Pinecone"], level: "Intermediate", skills: ["Ingestion", "Retrieval", "Citations"], image: "/images/lab.webp" },
      { name: "Retrieval benchmark", summary: "Compare chunking and ranking strategies.", tech: ["Python"], level: "Advanced", skills: ["Evaluation", "Re-ranking", "Analysis"], image: "/images/classroom.webp" },
    ],
    related: ["generative-ai", "agentic-ai", "data-science", "machine-learning"],
    keywords: ["rag course Hoshiarpur", "retrieval augmented generation training", "vector database course", "ai search course"],
  },
  {
    slug: "ai-powered-courses",
    title: "AI-Powered Courses",
    short: "An overview of every AI track, and how to choose one.",
    overview:
      "A short orientation across the AI catalogue: what each track covers, what it assumes you already know, and which order they make sense in.",
    category: CATEGORY,
    duration: "2 Weeks",
    level: "Beginner",
    hero: HERO,
    modules: [
      { title: "The landscape", summary: "What the terms mean and how they relate.", topics: ["AI vs ML", "Generative AI", "Agents", "Data science"], duration: "1 week", lessons: 4 },
      { title: "Choosing a track", summary: "Matching a path to your background.", topics: ["Prerequisites", "Career paths", "Time commitment", "Portfolios"], duration: "1 week", lessons: 4 },
    ],
    outcomes: ["Tell the AI disciplines apart", "Pick a track that fits your background", "Plan a realistic study order", "Know what a portfolio needs"],
    tools: ["ChatGPT", "Python", "Jupyter"],
    roles: ["Career Switcher", "Student", "Working Professional"],
    industries: ["Any"],
    nextSteps: ["Artificial Intelligence", "Generative AI", "Machine Learning", "Data Science"],
    projects: [
      { name: "Learning plan", summary: "A written plan with milestones and a portfolio target.", tech: ["—"], level: "Beginner", skills: ["Planning", "Research"], image: "/images/classroom.webp" },
    ],
    related: ["artificial-intelligence", "machine-learning", "generative-ai", "data-science"],
    keywords: ["ai courses Hoshiarpur", "which ai course to choose", "ai training overview", "ai career guidance"],
  },
];

export const AI_TOPIC_COURSES: Course[] = SPECS.map(makeCourse);
