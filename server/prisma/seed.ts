import { PrismaClient } from '@prisma/client';

import { readingTimeOf } from '../src/common/utils/reading-time';
import { sanitizeArticleHtml } from '../src/common/utils/sanitize';
import { slugify } from '../src/common/utils/slugify';

/**
 * Demo content for the blog.
 *
 * Idempotent throughout — every write is an upsert keyed on a slug or email, so
 * `npm run db:seed` can be run repeatedly against an existing database without
 * duplicating a single row.
 *
 * The article bodies are real editorial copy rather than lorem ipsum: the
 * reading-time figures, the table of contents and the search index are all
 * derived from this text, and placeholder filler would make every one of them
 * behave differently in development than in production.
 */

const prisma = new PrismaClient();

/* --------------------------------- authors -------------------------------- */

const AUTHORS = [
  {
    name: 'Ravi Sethi',
    role: 'Placement Lead',
    bio: 'Runs placement drives and interview preparation at TechCADD. Has sat on the hiring side of roughly 900 fresher interviews and writes about what actually gets people through them.',
    socialLinks: { linkedin: 'https://linkedin.com', x: 'https://x.com' },
  },
  {
    name: 'Dr. Neha Arora',
    role: 'AI Track Mentor',
    bio: 'Leads the AI and machine learning track. Builds production models by day and teaches the mathematics underneath them in the evening batch.',
    socialLinks: { linkedin: 'https://linkedin.com', github: 'https://github.com' },
  },
  {
    name: 'Amit Khanna',
    role: 'Full Stack Mentor',
    bio: 'Ships MERN and Next.js applications for TechCADD clients and reviews every line of student project code that goes with them.',
    socialLinks: { linkedin: 'https://linkedin.com', github: 'https://github.com' },
  },
];

/* ------------------------------- categories -------------------------------- */

const CATEGORIES = [
  { name: 'AI & Data', description: 'Machine learning, data science and the careers around them.', position: 1 },
  { name: 'Programming', description: 'Languages, fundamentals and how to actually get good at them.', position: 2 },
  { name: 'Full Stack', description: 'Front end, back end and everything between.', position: 3 },
  { name: 'Cybersecurity', description: 'Defensive practice, tooling and the security job market.', position: 4 },
  { name: 'Cloud', description: 'AWS, containers, pipelines and platform work.', position: 5 },
  { name: 'Careers', description: 'Interviews, portfolios and the first three years of a technology career.', position: 6 },
  { name: 'Placements', description: 'Drives, offers and what recruiters look for in a fresher.', position: 7 },
  { name: 'Courses', description: 'Choosing a track and getting the most out of it.', position: 8 },
  { name: 'Industry Trends', description: 'What is changing in hiring and in the stack.', position: 9 },
];

/* -------------------------------- articles --------------------------------- */

/** Small helpers, so the article bodies below stay readable as prose. */
const h2 = (text: string) => `<h2>${text}</h2>`;
const p = (text: string) => `<p>${text}</p>`;
const ul = (items: string[]) => `<ul>${items.map((i) => `<li>${i}</li>`).join('')}</ul>`;
const quote = (text: string) => `<blockquote><p>${text}</p></blockquote>`;
const code = (lang: string, body: string) =>
  `<pre><code class="language-${lang}">${body
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')}</code></pre>`;

interface SeedArticle {
  title: string;
  excerpt: string;
  category: string;
  author: string;
  tags: string[];
  image: string;
  publishedAt: string;
  featured?: boolean;
  trending?: boolean;
  views: number;
  content: string;
  seoTitle?: string;
  seoDescription?: string;
}

const ARTICLES: SeedArticle[] = [
  {
    title: 'Which AI Course Should You Actually Take After B.Tech?',
    excerpt:
      'Machine learning, deep learning, generative AI — here is how to choose the right path based on what you want to be doing in two years, not on which title sounds best.',
    category: 'AI & Data',
    author: 'Dr. Neha Arora',
    tags: ['Machine Learning', 'Careers', 'Generative AI'],
    image: '/images/ai.webp',
    publishedAt: '2026-08-04T09:00:00.000Z',
    featured: true,
    trending: true,
    views: 4820,
    seoTitle: 'Which AI Course Should You Take After B.Tech?',
    seoDescription:
      'Explore AI, machine learning and data career paths after B.Tech and discover which course fits your goals, your maths background and the job you actually want.',
    content: [
      p(
        'Every August we meet the same student. Fresh B.Tech degree, a genuine interest in AI, and a browser with eleven tabs open — each one a course promising to make them an AI engineer in twelve weeks. The question is never "should I learn AI". It is "which of these is not a waste of six months".',
      ),
      p(
        'The honest answer depends on three things: how comfortable you are with mathematics, whether you would rather build systems or find answers in data, and how long you can afford to study before you need an income.',
      ),
      h2('Start with what the job looks like, not what it is called'),
      p(
        'The titles overlap badly. Two companies will advertise "AI Engineer" for work that shares almost nothing. Rather than chase the label, look at the day.',
      ),
      ul([
        '<strong>Machine learning engineering</strong> — most of your week is software engineering. Data pipelines, model serving, latency, monitoring. You need to be a good programmer first and a modeller second.',
        '<strong>Data science</strong> — most of your week is questions. Framing them, finding the data, testing whether the answer holds. Statistics matters more here than anywhere else.',
        '<strong>Applied generative AI</strong> — retrieval, evaluation, prompt and context design, cost control. Newer, moving fastest, and the one where a good portfolio outweighs a certificate.',
      ]),
      h2('Be honest about the mathematics'),
      p(
        'You do not need a research degree. You do need to be comfortable with linear algebra, probability and the idea of a gradient — enough to know why a model is failing rather than only that it is.',
      ),
      quote(
        'If you cannot explain what your loss function is punishing, you are not tuning a model. You are guessing with extra steps.',
      ),
      p(
        'If that sounds like a wall, take a track that builds the maths alongside the code rather than one that skips it. Skipping is faster for a month and slower for a year.',
      ),
      h2('A test you can run this week'),
      p(
        'Before enrolling anywhere, spend one evening on a small, complete task: load a public dataset, train something simple, and write four sentences about why it performs the way it does.',
      ),
      code(
        'python',
        `from sklearn.datasets import load_wine
from sklearn.ensemble import RandomForestClassifier
from sklearn.model_selection import cross_val_score

X, y = load_wine(return_X_y=True)
scores = cross_val_score(RandomForestClassifier(n_estimators=200), X, y, cv=5)

print(f"accuracy: {scores.mean():.3f} (+/- {scores.std():.3f})")`,
      ),
      p(
        'If the interesting part was getting it to run, machine learning engineering will suit you. If the interesting part was wondering which features carried the signal, you are closer to data science. If you finished it and immediately wanted to wrap it in an API, that is a full stack instinct worth following.',
      ),
      h2('What we would tell our own students'),
      ul([
        'Pick one track and finish it. Two half-finished tracks are worth less than either one completed.',
        'Build three things you can demo. A model in a notebook nobody can run is not a portfolio.',
        'Learn the deployment story early. The gap between a trained model and a served model is where most freshers stall.',
      ]),
      p(
        'The right course is the one whose ending you can picture: a deployed project, an explanation you can defend, and an interview you would walk into without apologising for your background.',
      ),
    ].join(''),
  },
  {
    title: 'MERN vs MEAN in 2026: What Should Freshers Learn?',
    excerpt:
      'Both stacks still hire. The difference that matters to a fresher is not React versus Angular — it is which one gets you writing production-shaped code sooner.',
    category: 'Full Stack',
    author: 'Amit Khanna',
    tags: ['MERN', 'React', 'Angular', 'Careers'],
    image: '/images/mern.webp',
    publishedAt: '2026-07-29T09:00:00.000Z',
    trending: true,
    views: 3960,
    content: [
      p(
        'The stacks share three of their four letters. Mongo, Express and Node are common to both; the argument is only ever about React or Angular. That makes the decision smaller than the internet suggests — and it makes the wrong reasons for choosing very easy to spot.',
      ),
      h2('What actually differs'),
      ul([
        '<strong>React</strong> gives you a library and a set of decisions. Routing, forms, data fetching and state are yours to choose, which is freedom on day one and a burden in month three.',
        '<strong>Angular</strong> gives you a framework and its opinions. Routing, HTTP, forms and dependency injection ship in the box, which is a steeper first fortnight and a gentler sixth month.',
      ]),
      p(
        'Neither is more employable in the abstract. Locally, React and Next.js dominate what our hiring partners ask for; in enterprise and banking work, Angular remains steady and pays well precisely because fewer freshers learn it.',
      ),
      h2('The question worth asking instead'),
      quote('Which one will get you shipping a real feature, end to end, this month?'),
      p(
        'A fresher is not hired for knowing a framework. They are hired for having built something that works, and for being able to explain the decisions inside it. Whichever stack gets you there faster is the correct one for you.',
      ),
      h2('If you still want a recommendation'),
      p(
        'Start with React unless you have a specific reason not to — the ecosystem is larger, the job listings near Hoshiarpur and Mohali skew that way, and the transferable ideas (components, state, data flow) carry into Angular later if you need them.',
      ),
      p(
        'Then learn the parts nobody demos on YouTube: authentication that survives a refresh, pagination that does not refetch everything, error states, and a deployment that stays up when you close your laptop.',
      ),
    ].join(''),
  },
  {
    title: 'How to Make Your 6-Month Industrial Training Actually Count',
    excerpt:
      'Most students finish six months of training with a certificate and little else. The ones who finish with an offer do four things differently from week one.',
    category: 'Courses',
    author: 'Ravi Sethi',
    tags: ['Internship', 'Training', 'Careers'],
    image: '/images/classroom.webp',
    publishedAt: '2026-07-22T09:00:00.000Z',
    trending: true,
    views: 3410,
    content: [
      p(
        'Six months is long enough to change your career and short enough to disappear entirely. We have watched both happen to students of equal ability, and the difference is almost never talent.',
      ),
      h2('1. Treat week one as an audit, not an orientation'),
      p(
        'Find out what the team actually runs: the repository, the branching model, how a change reaches users. A student who understands the release path in week one is trusted with real work by week four.',
      ),
      h2('2. Keep a decision log'),
      p(
        'One line per day: what you tried, what broke, what you changed. Six months later this is the raw material for your resume, your portfolio write-ups and every behavioural question you will be asked.',
      ),
      quote('"Tell me about a difficult bug" is unanswerable from memory and trivial from notes.'),
      h2('3. Ask for the unglamorous ticket'),
      p(
        'Nobody learns a codebase from a greenfield feature. You learn it from a bug in an area nobody wants to touch — and the person who fixes it is remembered at conversion time.',
      ),
      h2('4. Leave with artefacts, not adjectives'),
      ul([
        'A merged pull request you can talk through, line by line.',
        'A deployed URL, or a recorded demo if the work is internal.',
        'A short written summary of what the system does and what you changed in it.',
        'One reference from someone who reviewed your code.',
      ]),
      p(
        'Those four beat any certificate in the room, because they are the only things an interviewer can verify in the ten minutes they have.',
      ),
    ].join(''),
  },
  {
    title: 'A Realistic First Portfolio for a Data Analytics Fresher',
    excerpt:
      'Three projects, chosen so each one proves something different — and none of them is another Titanic notebook.',
    category: 'AI & Data',
    author: 'Dr. Neha Arora',
    tags: ['Data Analytics', 'Portfolio', 'SQL'],
    image: '/images/data-science.webp',
    publishedAt: '2026-07-15T09:00:00.000Z',
    views: 2870,
    content: [
      p(
        'A portfolio is not a museum of everything you have run. It is an argument, made in three exhibits, that you can be trusted with a real question.',
      ),
      h2('Project one: a question with a defensible answer'),
      p(
        'Take a public dataset — electricity consumption, rainfall, road accidents in Punjab — and answer one specific question about it. Not "analysis of X". Something a person would ask.',
      ),
      ul([
        'State the question in the README, in one sentence.',
        'Show the cleaning you did and admit what you threw away.',
        'End with the answer and the limit of your confidence in it.',
      ]),
      h2('Project two: SQL that would survive review'),
      p(
        'Load the same data into Postgres and answer five harder questions in SQL alone. Window functions, self joins, date bucketing. Interviewers test this constantly because it is where confident-sounding candidates fall apart.',
      ),
      code(
        'sql',
        `SELECT district,
       month,
       total_units,
       LAG(total_units) OVER (PARTITION BY district ORDER BY month) AS prev_month,
       ROUND(100.0 * (total_units - LAG(total_units) OVER (PARTITION BY district ORDER BY month))
             / NULLIF(LAG(total_units) OVER (PARTITION BY district ORDER BY month), 0), 1) AS pct_change
FROM monthly_consumption
ORDER BY district, month;`,
      ),
      h2('Project three: something someone else can use'),
      p(
        'A dashboard, a small Streamlit app, a scheduled report. The point is to prove your work can leave your laptop — which is the single most common gap between a student project and a job.',
      ),
      quote('Three finished projects with honest README files beat eleven abandoned notebooks.'),
    ].join(''),
  },
  {
    title: 'Python or Java First? A Straight Answer for Beginners',
    excerpt:
      'Both are good languages and this argument wastes more beginner time than any other. Here is the decision rule we give students in counselling.',
    category: 'Programming',
    author: 'Amit Khanna',
    tags: ['Python', 'Java', 'Beginners'],
    image: '/images/lab.webp',
    publishedAt: '2026-07-08T09:00:00.000Z',
    views: 5210,
    trending: true,
    content: [
      p(
        'Ask ten developers and you will get ten confident answers, most of them autobiography. Here is the rule that has held for every batch we have taught.',
      ),
      h2('Pick Python if you want to see results this week'),
      p(
        'Less ceremony between an idea and something running. It suits data work, automation, AI, and anyone whose motivation depends on visible progress — which, honestly, is most beginners.',
      ),
      h2('Pick Java if you are aiming at campus placements'),
      p(
        'Many campus recruiters still test in Java or C++, the type system teaches you to think about structure early, and enterprise back-end work in India remains heavily Java.',
      ),
      h2('What matters far more than either'),
      ul([
        'Writing code every day, badly, for a month.',
        'Reading errors properly instead of pasting them straight into a search box.',
        'Learning one debugger well.',
        'Finishing small programs rather than starting large ones.',
      ]),
      quote('Your first language is a keyboard you learn on. Your second takes a fortnight.'),
      p(
        'Choose in an afternoon and start. Six months of consistent practice in either language will put you ahead of anyone still deciding.',
      ),
    ].join(''),
  },
  {
    title: 'What a Cybersecurity Fresher Is Actually Asked in Interviews',
    excerpt:
      'Not zero-days. The questions are about networking fundamentals, log reading and whether you can explain an attack in plain language.',
    category: 'Cybersecurity',
    author: 'Ravi Sethi',
    tags: ['Cybersecurity', 'Interviews', 'SOC'],
    image: '/images/cyber.webp',
    publishedAt: '2026-06-30T09:00:00.000Z',
    views: 2640,
    content: [
      p(
        'Students prepare for cybersecurity interviews by reading about exotic exploits. Then they are asked what happens when you type a URL into a browser, and the interview ends there.',
      ),
      h2('The fundamentals, every time'),
      ul([
        'The TCP handshake, and what a half-open connection means.',
        'DNS resolution end to end.',
        'The difference between hashing, encoding and encryption — asked constantly, failed often.',
        'What a firewall rule actually matches on.',
      ]),
      h2('Reading, not hacking'),
      p(
        'Most fresher security roles are analyst roles. The work is triage: is this alert real, what does the log say, what happened before it. Expect to be handed a short log extract and asked what you notice.',
      ),
      quote('Being able to say "I do not know, and here is how I would find out" scores higher than a confident wrong answer. Every time.'),
      h2('The lab you should be able to describe'),
      p(
        'Build a small isolated network — two virtual machines, one service, one monitoring tool. Break it, watch the logs, write up what you saw. That single exercise answers most of an interview.',
      ),
    ].join(''),
  },
  {
    title: 'How to Prepare for Your First Technical Interview',
    excerpt:
      'A four-week plan that assumes you have a job or a degree taking most of your day, and that you have never sat a technical round before.',
    category: 'Careers',
    author: 'Ravi Sethi',
    tags: ['Interviews', 'Careers', 'Preparation'],
    image: '/images/form.webp',
    publishedAt: '2026-06-24T09:00:00.000Z',
    views: 3120,
    content: [
      p(
        'Interview preparation fails for a predictable reason: people study everything a little and nothing enough. Four weeks is plenty if you spend it narrowly.',
      ),
      h2('Week 1 — your own projects'),
      p(
        'Re-read your own code. Be able to explain every decision in it, including the bad ones. More offers are lost to "I followed a tutorial" than to any algorithm question.',
      ),
      h2('Week 2 — the fundamentals of your stack'),
      p(
        'Twenty questions, answered out loud. What is the event loop, what does an index do, why is this endpoint slow. Out loud matters — writing an answer and saying it are different skills.',
      ),
      h2('Week 3 — problem solving, timed'),
      ul([
        'Arrays, strings, hash maps, two pointers. That is the fresher band.',
        'Thirty minutes each, timer visible.',
        'Say your reasoning aloud while you work.',
      ]),
      h2('Week 4 — full rehearsals'),
      p(
        'Three mock interviews with someone who will interrupt you. Then rewrite your resume so every line is something you have just proved you can discuss.',
      ),
      quote('The candidate who has rehearsed talking while thinking beats the one who has only practised thinking.'),
    ].join(''),
  },
  {
    title: 'Best Skills to Learn for Full Stack Development',
    excerpt:
      'The list is shorter than you have been told, and half of it is not a framework at all.',
    category: 'Full Stack',
    author: 'Amit Khanna',
    tags: ['Full Stack', 'Skills', 'Career Path'],
    image: '/images/digital.webp',
    publishedAt: '2026-06-17T09:00:00.000Z',
    views: 2980,
    content: [
      p(
        'Job descriptions list eighteen technologies because they are written by committee. The work needs perhaps seven things, done properly.',
      ),
      h2('The technical half'),
      ul([
        'One front-end framework, deeply. React is the safe default.',
        'HTTP as a protocol — status codes, caching, cookies, CORS. This is where most bugs live.',
        'One database, with real schema design. Indexes, joins, and why your query is slow.',
        'Authentication and sessions, built once from scratch so you understand what a library is doing for you.',
        'Deployment: a domain, HTTPS, environment variables, logs you can read after something breaks.',
      ]),
      h2('The half nobody puts on a job description'),
      ul([
        'Reading someone else\'s code without rewriting it.',
        'Writing a pull request description a reviewer can follow.',
      ]),
      quote('Frameworks change every three years. HTTP, SQL and clear writing have not changed in twenty.'),
    ].join(''),
  },
  {
    title: 'AI Engineer vs Data Scientist: Which Career Path Is Right?',
    excerpt:
      'Similar salaries, adjacent tools, very different days. Choose by which kind of problem you want to be handed on a Monday morning.',
    category: 'Careers',
    author: 'Dr. Neha Arora',
    tags: ['AI', 'Data Science', 'Career Path'],
    image: '/images/cloud.webp',
    publishedAt: '2026-06-10T09:00:00.000Z',
    views: 3380,
    content: [
      p(
        'The two roles sit close enough that people move between them, but the day-to-day differs more than the titles suggest.',
      ),
      h2('The AI engineer'),
      p(
        'Given: a model that works in a notebook. Asked: make it serve ten thousand requests a day without falling over or costing a fortune. The work is engineering — latency, batching, caching, monitoring, retraining.',
      ),
      h2('The data scientist'),
      p(
        'Given: a business question, often badly framed. Asked: find out whether the answer is real. The work is investigation — framing, experiment design, statistics, and explaining an uncomfortable result to people who wanted a different one.',
      ),
      h2('Choosing'),
      ul([
        'Enjoy making systems reliable? Engineer.',
        'Enjoy finding out whether something is true? Scientist.',
        'Enjoy explaining to non-technical people? The second pays more attention to that skill.',
      ]),
      quote('Pick the role whose failure mode you can live with: a system that fell over, or an answer that was wrong.'),
    ].join(''),
  },
  {
    title: 'How to Build a Job-Ready Developer Portfolio',
    excerpt:
      'What hiring managers open first, what they skip entirely, and how to make three projects do the work of ten.',
    category: 'Placements',
    author: 'Ravi Sethi',
    tags: ['Portfolio', 'GitHub', 'Placements'],
    image: '/images/team-photo.webp',
    publishedAt: '2026-06-03T09:00:00.000Z',
    views: 4110,
    content: [
      p(
        'We asked our hiring partners what they look at when a fresher applies. The answers were consistent, and mostly not what students expect.',
      ),
      h2('What gets opened first'),
      ul([
        'The live link. If there is not one, most reviewers stop.',
        'The README. Specifically: what it does, and how to run it.',
        'The commit history. Sixty commits over three weeks reads very differently from one commit called "final".',
      ]),
      h2('What gets skipped'),
      p(
        'Certificates, course completion badges, and long skill lists with progress bars. Nobody has ever hired on a progress bar.',
      ),
      h2('Three projects, three proofs'),
      ul([
        'One that proves you can finish — small, complete, deployed.',
        'One that proves you can handle real data — an API, a database, error states.',
        'One that proves you can work in someone else\'s code — a genuine contribution to an existing project.',
      ]),
      quote('One deployed project with an honest README beats ten repositories nobody can run.'),
      p(
        'Write each README as if the reader has four minutes, no context and no patience. That is roughly the truth.',
      ),
    ].join(''),
  },
];

/* ---------------------------------- run ------------------------------------ */

async function main(): Promise<void> {
  console.log('Seeding TechCADD blog…');

  const authors = new Map<string, string>();
  for (const author of AUTHORS) {
    const slug = slugify(author.name);
    const row = await prisma.author.upsert({
      where: { slug },
      update: { bio: author.bio, role: author.role },
      create: {
        name: author.name,
        slug,
        bio: author.bio,
        role: author.role,
        // avatars are rendered as initials by the frontend when this is empty,
        // so the seed needs no image files to look finished
        avatar: '',
        socialLinks: JSON.stringify(author.socialLinks),
      },
    });
    authors.set(author.name, row.id);
  }
  console.log(`  authors:    ${authors.size}`);

  const categories = new Map<string, string>();
  for (const category of CATEGORIES) {
    const slug = slugify(category.name);
    const row = await prisma.category.upsert({
      where: { slug },
      update: { description: category.description, position: category.position },
      create: {
        name: category.name,
        slug,
        description: category.description,
        position: category.position,
      },
    });
    categories.set(category.name, row.id);
  }
  console.log(`  categories: ${categories.size}`);

  let count = 0;
  for (const article of ARTICLES) {
    const slug = slugify(article.title);
    const content = sanitizeArticleHtml(article.content);

    const tagIds = await Promise.all(
      article.tags.map(async (name) => {
        const tag = await prisma.tag.upsert({
          where: { slug: slugify(name) },
          update: {},
          create: { name, slug: slugify(name) },
        });
        return { id: tag.id };
      }),
    );

    const data = {
      title: article.title,
      excerpt: article.excerpt,
      content,
      featuredImage: article.image,
      categoryId: categories.get(article.category)!,
      authorId: authors.get(article.author)!,
      status: 'published',
      publishedAt: new Date(article.publishedAt),
      readingTime: readingTimeOf(content),
      views: article.views,
      featured: article.featured ?? false,
      trending: article.trending ?? false,
      seoTitle: article.seoTitle ?? null,
      seoDescription: article.seoDescription ?? article.excerpt,
      seoKeywords: article.tags.join(', '),
    };

    await prisma.article.upsert({
      where: { slug },
      update: { ...data, tags: { set: tagIds } },
      create: { ...data, slug, tags: { connect: tagIds } },
    });
    count += 1;
  }
  console.log(`  articles:   ${count}`);
  console.log('Done.');
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
