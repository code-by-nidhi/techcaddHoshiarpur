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
    related: ["python-programming", "web-development", "digital-marketing"],
    keywords: ["generative ai course Hoshiarpur", "genai training", "llm course", "ai developer course"],
  },
];

export const AI_TOPIC_COURSES: Course[] = SPECS.map(makeCourse);
