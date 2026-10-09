// Single source of truth for everything the site says. Edit here, not in JSX.

import profilePhoto from "@/assets/profile.webp";
import portraitPhoto from "@/assets/profile-2.jpeg";
import project1 from "@/assets/project-1.webp";
import project2 from "@/assets/project-2.webp";
import project3 from "@/assets/project-3.webp";
import project4 from "@/assets/project-4.webp";
import project5 from "@/assets/project-5.webp";
import project6 from "@/assets/project-6.webp";

export const personalInfo = {
  name: "Razan Widya Reswara",
  role: "Software Engineer",
  title: "Informatics Engineering Student",
  /** Hero introduction: short, concrete, and true to the work below it. */
  summary:
    "Informatics engineering student in Surabaya. I build web applications with React and TypeScript, and turn geospatial and economic data into dashboards people can act on.",
  tagline: "Building digital experiences with code & creativity",
  bio: "I am an informatics engineering student who focuses heavily on objectivity and rationality, always prioritizing effectiveness over social harmony. I am highly imaginative and open-minded, often exploring hidden meanings and long-term possibilities. I maintain a calm and confident demeanor, remaining composed and resilient to stress in stressful situations.",
  email: "razancollege06@gmail.com",
  location: "Surabaya, Indonesia",
  availability: "Open to opportunities",
  handle: "zan4yov",
  profileImage: profilePhoto,
  portraitImage: portraitPhoto,
};

export const socialLinks = {
  github: "https://github.com/zan4yov",
  linkedin: "https://www.linkedin.com/in/razan-reswara-376b54326/",
  twitter: "https://twitter.com/zan4yov",
  instagram: "https://instagram.com/razanvvr",
};

/**
 * Projects group into three disciplines. The grouping is derived from the
 * stack each one actually uses, and it is what the filter on the projects
 * page slices by.
 */
export type Discipline = "Web" | "Data & BI" | "Geospatial";

export interface Project {
  title: string;
  description: string;
  discipline: Discipline;
  tags: string[];
  demoUrl?: string;
  githubUrl?: string;
  image?: string;
  /** Leads the projects page at a larger plate size. */
  featured?: boolean;
}

/** Ordered strongest first — this is the running order a reader scans. */
export const projects: Project[] = [
  {
    title: "TerraTrace",
    description:
      "ESG Compliance Tracker web app with AI insights and chatbot support.",
    discipline: "Web",
    tags: ["React", "TypeScript", "Vite", "Tailwind CSS", "Supabase", "TanStack Query", "Gemini"],
    githubUrl: "https://github.com/zan4yov/TerraTrace",
    image: project5,
    featured: true,
  },
  {
    title: "Dimdimsum UMKM Website",
    description:
      "Portfolio website for Dimdimsum, a Surabaya-based food and beverage business.",
    discipline: "Web",
    tags: ["Vite", "TypeScript", "React", "shadcn/ui", "Tailwind CSS"],
    demoUrl: "https://dimdim-sum.vercel.app/",
    githubUrl: "https://github.com/zan4yov/dimdim-sum",
    image: project2,
  },
  {
    title: "Finance Tracker",
    description:
      "Personal finance tracker app to manage income, expenses, and budgets with AI advisor.",
    discipline: "Web",
    tags: ["Vite", "TypeScript", "React", "Tailwind CSS", "shadcn/ui", "Supabase"],
    image: project6,
  },
  {
    title: "Global Economic Trends Analysis",
    description:
      "Interactive Power BI dashboard analyzing world economic trends.",
    discipline: "Data & BI",
    tags: ["Power BI", "Python", "Data Analysis", "DAX"],
    githubUrl: "https://github.com/zan4yov/Global-Economic-Trends-Analysis",
    image: project4,
  },
  {
    title: "Weather API Integrated Dashboard",
    description:
      "Dashboard app fetching real-time weather data, built with Power BI.",
    discipline: "Data & BI",
    tags: ["Power BI", "DAX", "Data Visualization"],
    githubUrl: "https://github.com/zan4yov/Project-WheaterAPI",
    image: project3,
  },
  {
    title: "Mining Area Mapping",
    description:
      "Mapping project using GIS tools and satellite imagery to identify potential mining zones.",
    discipline: "Geospatial",
    tags: ["Google Earth Pro", "QGIS", "ArcGIS"],
    image: project1,
  },
];

export const disciplines: Discipline[] = ["Web", "Data & BI", "Geospatial"];

// Tech stack, grouped the way it is presented.
export interface TechGroup {
  label: string;
  items: { name: string; logo: string }[];
}

export const techGroups: TechGroup[] = [
  {
    label: "Languages",
    items: [
      { name: "C", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/c/c-original.svg" },
      { name: "C++", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/cplusplus/cplusplus-original.svg" },
      { name: "Python", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg" },
      { name: "Java", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg" },
      { name: "JavaScript", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg" },
      { name: "TypeScript", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg" },
      { name: "HTML", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg" },
      { name: "CSS", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg" },
    ],
  },
  {
    label: "Frameworks",
    items: [
      { name: "React", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" },
      { name: "Vite", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vitejs/vitejs-original.svg" },
      { name: "Node.js", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg" },
      { name: "Laravel", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/laravel/laravel-plain.svg" },
      { name: "Tailwind CSS", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg" },
    ],
  },
  {
    label: "Data & BI",
    items: [
      { name: "Power BI", logo: "https://upload.wikimedia.org/wikipedia/commons/c/cf/New_Power_BI_Logo.svg" },
      { name: "Tableau", logo: "https://cdn.worldvectorlogo.com/logos/tableau-software.svg" },
      { name: "Looker Studio", logo: "https://www.gstatic.com/analytics-suite/header/suite/v2/ic_data_studio.svg" },
    ],
  },
  {
    label: "Data & Tooling",
    items: [
      { name: "MySQL", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg" },
      { name: "Git", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg" },
      { name: "Docker", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg" },
      { name: "OpenAI", logo: "https://cdn.simpleicons.org/openai/412991" },
    ],
  },
];

export const experience = [
  {
    year: "2025 — Present",
    title: "Mining Technology Engineer",
    company: "PT Berau Coal Energy",
    description: "",
  },
];

/** Figures shown beside the portrait. */
export const facts = [
  { value: String(projects.length), label: "Projects shipped" },
  { value: "1+", label: "Years building" },
  { value: "3.58", label: "GPA out of 4.00" },
];

export const personality = [
  "Problem solver",
  "Fast learner",
  "Creative thinker",
  "Team player",
  "Continuous learner",
  "Detail-oriented",
];
