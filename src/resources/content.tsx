import { About, Blog, Contact, Cv, Gallery, Home, Newsletter, Person, Social, Work } from "@/types";
import { Row, Text } from "@once-ui-system/core";

const person: Person = {
  firstName: "Carlos",
  lastName: "Robles",
  name: "Carlos Robles",
  role: "Full-Stack & AI Engineer",
  avatar: "/images/avatar.png",
  email: "caromamusic@gmail.com",
  location: "Europe/Madrid",
  languages: ["Spanish (Native)", "English (B2)"],
};

const newsletter: Newsletter = {
  display: false,
  title: <>Newsletter</>,
  description: <>Not available.</>,
};

const social: Social = [
  {
    name: "GitHub",
    icon: "github",
    link: "https://github.com/crm107-ua",
    essential: true,
  },
  {
    name: "LinkedIn",
    icon: "linkedin",
    link: "https://www.linkedin.com/in/carlos-robles-94105b159/",
    essential: true,
  },
  {
    name: "Email",
    icon: "email",
    link: `mailto:${person.email}`,
    essential: true,
  },
];

const home: Home = {
  path: "/",
  image: "/images/og/home.jpg",
  label: "Home",
  title: `${person.name}'s Portfolio`,
  description: `Portfolio of ${person.name}, ${person.role} based in Alicante, Spain`,
  headline: (
    <>
      Full-stack engineer building web apps and applied AI.
    </>
  ),
  featured: {
    display: true,
    title: (
      <Row gap="12" vertical="center">
        <strong className="ml-4">Warera</strong>
        <Text marginRight="4" onBackground="brand-medium">
          Featured project
        </Text>
      </Row>
    ),
    href: "/work/warera",
  },
  subline: (
    <>
      I'm Carlos, a full-stack & AI engineer in{" "}
      <Text as="span" size="xl" weight="strong">
        Alicante, Spain
      </Text>
      . I ship production web products — SaaS, platforms, and community tools — and build day to day
      with modern stacks plus AI-assisted development, from Symfony and Next.js to local LLMs and
      RAG.
    </>
  ),
};

const about: About = {
  path: "/about",
  label: "About",
  title: `About – ${person.name}`,
  description: `Meet ${person.name}, ${person.role} based in Alicante, Spain`,
  tableOfContent: {
    display: true,
    subItems: false,
  },
  avatar: {
    display: true,
  },
  calendar: {
    display: false,
    link: "",
  },
  intro: {
    display: true,
    title: "Introduction",
    description: (
      <>
        Carlos is a full-stack engineer with 2 years of professional experience building web
        applications with Symfony, Angular, Vue, and DevOps workflows. His focus is increasingly on
        applied AI: deploying local LLMs (Ollama, llama.cpp), prompt evaluation, RAG pipelines,
        and edge AI on devices like NVIDIA Jetson.
        <br />
        <br />
        Contact: {person.email} · +34 637 088 497
      </>
    ),
  },
  work: {
    display: true,
    title: "Work Experience",
    experiences: [
      {
        company: "ADSALSA Group",
        timeframe: "Sep 2024 – Apr 2026",
        role: "Full-Stack Developer — Alcoy",
        achievements: [
          <>
            Designed, built and maintained full-stack web applications end to end — REST APIs and
            business logic in Symfony (PHP), and reactive frontends in Angular and Vue.
          </>,
          <>
            Built and operated email delivery infrastructure with Postfix, handling high-volume
            sending and deliverability.
          </>,
          <>
            Developed email systems and marketing automation workflows running at scale.
          </>,
          <>
            Set up and maintained CI/CD pipelines and containerized services with Docker and GitHub
            Actions, deploying to Linux servers behind Nginx.
          </>,
          <>
            Worked with relational databases (MySQL, PostgreSQL) for application data and reporting.
          </>,
        ],
        images: [],
      },
      {
        company: "Doblemente S.L.",
        timeframe: "Sep 2019 – Mar 2020",
        role: "Backend Developer — Alcoy",
        achievements: [
          <>
            Developed and shipped web application improvements in C# / .NET, implementing backend
            features and fixing production issues.
          </>,
          <>
            Administered and optimized MySQL and PostgreSQL databases, tuning queries and schema for
            performance.
          </>,
          <>Managed and maintained the Linux servers hosting the applications.</>,
        ],
        images: [],
      },
    ],
  },
  studies: {
    display: true,
    title: "Studies",
    institutions: [
      {
        name: "University of Alicante",
        description: <>Computer Science Engineer (2020–2024)</>,
      },
      {
        name: "CIPFP Batoi, Alcoy",
        description: <>Senior Technician in Web Application Development (2018–2020)</>,
      },
    ],
  },
  technical: {
    display: true,
    title: "Technical skills",
    skills: [
      {
        title: "AI / ML",
        description: (
          <>Local LLMs, RAG pipelines, prompt evaluation, and edge AI deployments.</>
        ),
        tags: [
          { name: "Local LLMs" },
          { name: "Ollama" },
          { name: "llama.cpp" },
          { name: "RAG" },
          { name: "Prompt Evaluation" },
          { name: "Edge AI (Jetson)" },
        ],
        images: [],
      },
      {
        title: "Languages",
        tags: [
          { name: "Python" },
          { name: "C#/.NET" },
          { name: "Java" },
          { name: "TypeScript" },
          { name: "JavaScript" },
          { name: "PHP" },
        ],
        images: [],
      },
      {
        title: "Backend",
        tags: [
          { name: "Symfony" },
          { name: "Laravel" },
          { name: "Flask" },
          { name: "Node.js" },
          { name: "Spring" },
        ],
        images: [],
      },
      {
        title: "Frontend",
        tags: [
          { name: "Angular" },
          { name: "Vue" },
          { name: "React" },
          { name: "Next.js" },
        ],
        images: [],
      },
      {
        title: "Data",
        tags: [
          { name: "MySQL" },
          { name: "PostgreSQL" },
          { name: "MongoDB" },
          { name: "Redis" },
        ],
        images: [],
      },
      {
        title: "DevOps",
        tags: [
          { name: "Docker" },
          { name: "AWS" },
          { name: "Linux" },
          { name: "CI/CD" },
          { name: "GitHub Actions" },
          { name: "Nginx" },
        ],
        images: [],
      },
    ],
  },
};

const blog: Blog = {
  path: "/blog",
  label: "Blog",
  title: "Blog",
  description: `Articles by ${person.name}`,
};

const work: Work = {
  path: "/work",
  label: "Work",
  title: `Projects – ${person.name}`,
  description: `Web and AI projects by ${person.name}`,
};

const cv: Cv = {
  path: "/cv",
  label: "CV",
  title: `CV – ${person.name}`,
  description: `Resume of ${person.name}, ${person.role}`,
  file: "/cv/CV2026.pdf",
  downloadName: "Carlos-Robles-CV-2026.pdf",
};

const contact: Contact = {
  path: "/contact",
  label: "Contact",
  title: `Contact – ${person.name}`,
  description: `Contact ${person.name}, ${person.role}`,
};

const gallery: Gallery = {
  path: "/gallery",
  label: "Gallery",
  title: `Gallery – ${person.name}`,
  description: `Photo gallery by ${person.name}`,
  images: [],
};

export { person, social, newsletter, home, about, blog, work, cv, contact, gallery };
