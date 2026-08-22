import { COURSES } from "@/lib/courses";
import { FOUNDER } from "@/lib/site";
import { campusHighlights, milestones, purpose, whoWeAre } from "@/data/about";

/**
 * The founder profile page.
 *
 * Almost nothing here is new copy. The story is the milestone list the /about
 * journey section already publishes, the mission and vision are the same two
 * `purpose` entries, and the quote is the one the homepage prints — so the
 * page cannot drift away from the rest of the site, and no marketing claim is
 * invented to fill a section out.
 *
 * The name, post and descriptors all come from `FOUNDER` in lib/site, so the
 * hero, the signature under the quote and the page metadata cannot disagree
 * about who this page is for.
 */

export const FOUNDER_PAGE = {
  /* ------------------------------- hero -------------------------------- */
  hero: {
    eyebrow: "Our Founder",
    name: FOUNDER.name,
    role: FOUNDER.title,
    place: FOUNDER.role,
    credentials: FOUNDER.credentials,
    /*
     * The opening line of the founder's own quote, which is the inspiring
     * statement the brief asks for — not a second one written to sit beside it.
     */
    statement:
      "We never wanted to be the biggest institute in Punjab. We wanted to be the one where a student's first job is better than the one they imagined when they walked in.",
    image: "/images/founder-gaurav.webp",
    imageAlt: "Mr. Gourav Gupta, Founder & CEO of TechCadd",
    badge: { value: "10+", label: "Years building engineers" },
    since: whoWeAre.infoCard.value,
  },

  /* ------------------------------ the story ---------------------------- */
  story: {
    eyebrow: "The story",
    heading: "The Journey Behind Techcadd",
    /* The same three paragraphs /about opens with. */
    paragraphs: whoWeAre.paragraphs,
    image: "/images/about-us.webp",
    imageAlt: "Mr. Gourav Gupta addressing students at the Hoshiarpur campus",
    /* Five turning points, straight from the journey data. */
    timeline: milestones,
  },

  /* ------------------------ vision and leadership ---------------------- */
  leadership: {
    eyebrow: "Vision & leadership",
    heading: "Leading with Purpose",
    sub: "Three commitments that decide what gets taught, who teaches it, and what a student walks out with.",
    /*
     * Mission and vision come from `purpose`; the third card is the values the
     * institute is run by, summarised rather than restated in full — the four
     * rules themselves are on /about.
     */
    cards: [
      { key: "mission", eyebrow: purpose[0].eyebrow, title: purpose[0].title, body: purpose[0].body },
      { key: "vision", eyebrow: purpose[1].eyebrow, title: purpose[1].title, body: purpose[1].body },
      {
        key: "values",
        eyebrow: "Our values",
        title: "Four rules the institute does not bend",
        body:
          "Taught by practitioners who still ship code. Built, not watched — students leave with deployed work. Honest counselling before payment, never after. And support that has no expiry date once the certificate is printed.",
      },
    ],
  },

  /* ---------------------------- achievements --------------------------- */
  achievements: {
    eyebrow: "By the numbers",
    heading: "A decade, measured",
    /*
     * `to` and `suffix` are split because a counter animates a number and
     * cannot animate "25,000+". Courses is derived rather than typed, so the
     * figure can never fall behind the catalogue.
     */
    stats: [
      { key: "students", to: 25000, suffix: "+", label: "Students Trained" },
      { key: "courses", to: COURSES.length, suffix: "+", label: "Courses Offered" },
      { key: "branches", to: 6, suffix: "", label: "Branches" },
      { key: "partners", to: 1000, suffix: "+", label: "Industry Partnerships" },
    ],
  },

  /* -------------------------- founder message -------------------------- */
  message: {
    eyebrow: "A message",
    quote: FOUNDER.quote,
    name: FOUNDER.name,
    role: FOUNDER.title,
  },

  /* ------------------------------- gallery ----------------------------- */
  gallery: {
    eyebrow: "On campus",
    heading: "Seminars, workshops and the people in them",
    /*
     * The campus highlights, plus the two seminar photographs /about opens
     * with. `span` drives the masonry: the two wide frames carry the crowd
     * shots, which lose the most when squared off.
     */
    items: [
      { src: "/images/about-us.webp", alt: "A seminar in the TechCADD auditorium", span: "wide" },
      ...campusHighlights.map((c) => ({
        src: c.image.src,
        alt: c.image.alt,
        span: "tall" as const,
      })),
      { src: "/images/about-us1.webp", alt: "A full hall during a TechCADD seminar", span: "wide" },
      { src: "/images/classroom.webp", alt: "A workshop session in progress", span: "tall" },
    ] as { src: string; alt: string; span: "wide" | "tall" }[],
  },

  /* --------------------------------- cta ------------------------------- */
  cta: {
    heading: "Start Your Learning Journey",
    sub: "Talk it through before you commit. Counselling first, payment second.",
  },
} as const;
