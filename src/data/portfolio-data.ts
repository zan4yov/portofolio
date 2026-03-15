// INSTRUKSI: Edit data di sini untuk mengubah konten portfolio Anda

import profilePhoto from "@/assets/profile.jpeg"; 
import project1 from "@/assets/project-1.png";
import project2 from "@/assets/project-2.png";
import project3 from "@/assets/project-3.jpeg";
import project4 from "@/assets/project-4.jpeg";
import project5 from "@/assets/project-5.png";
import project6 from "@/assets/project-6.png";

export const personalInfo = {
  name: "Razan Widya Reswara",
  title: "Computer Science Student",
  tagline: "Building digital experiences with code & creativity",
  bio: `I am an informatics engineering student who focuses heavily on objectivity and rationality, always prioritizing effectiveness over social harmony. I am highly imaginative and open-minded, often exploring hidden meanings and long-term possibilities. I maintain a calm and confident demeanor, remaining composed and resilient to stress in stressful situations.`,
  email: "razancollege06@gmail.com",
  location: "Surabaya, Indonesia",
  availability: "Open to opportunities",
  profileImage: profilePhoto,
};

export const socialLinks = {
  github: "https://github.com/zan4yov",
  linkedin: "https://www.linkedin.com/in/razan-reswara-376b54326/",
  twitter: "https://twitter.com/zan4yov",
  instagram: "https://instagram.com/razanvvr",
};

// Tech stack dengan logos
export const techStack = [
  // Programming Languages
  { name: "C", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/c/c-original.svg", category: "language" },
  { name: "C++", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/cplusplus/cplusplus-original.svg", category: "language" },
  { name: "Python", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg", category: "language" },
  { name: "Java", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg", category: "language" },
  { name: "JavaScript", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg", category: "language" },
  { name: "TypeScript", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg", category: "language" },
  { name: "HTML", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg", category: "language" },
  { name: "CSS", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg", category: "language" },

  // Frameworks & Libraries
  { name: "Laravel", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/laravel/laravel-plain.svg", category: "framework" },
  { name: "Tailwind CSS", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg", category: "framework" },
  { name: "React", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg", category: "framework" },
  { name: "Vite", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vitejs/vitejs-original.svg", category: "framework" },
  { name: "Node.js", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg", category: "framework" },

  // Analytics & BI Tools
  { name: "Power BI", logo: "https://upload.wikimedia.org/wikipedia/commons/c/cf/New_Power_BI_Logo.svg", category: "tools" },
  { name: "Tableau", logo: "https://cdn.worldvectorlogo.com/logos/tableau-software.svg", category: "tools" },
  { name: "Looker Studio", logo: "https://www.gstatic.com/analytics-suite/header/suite/v2/ic_data_studio.svg", category: "tools" },

  // Database & Tools
  { name: "MySQL", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg", category: "database" },
  { name: "Git", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg", category: "tools" },
  { name: "Docker", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg", category: "tools" },
  { name: "OpenAI", logo: "https://cdn.simpleicons.org/openai/412991", category: "tools" },
];

// Daftar project
export const projects = [
  {
    title: "Mining Area Mapping",
    description:
      "Mapping project using GIS tools and satellite imagery to identify potential mining zones.",
    tags: ["Google Earth Pro", "QGIS", "ArcGIS"],
    image: project1,
  },
  {
    title: "Portfolio Website UMKM Dimdimsum",
    description:
      "Portfolio website for Dimdimsum, a Surabaya-based food and beverage business.",
    tags: ["Vite", "TypeScript", "React", "Shadcn UI", "Tailwind CSS"],
    demoUrl: "https://dimdim-sum.vercel.app/",
    githubUrl: "https://github.com/zan4yov/dimdim-sum",
    image: project2,
  },
  {
    title: "Wheather API Integrated Dashboard",
    description:
      "Dashboard app fetching real-time weather data, built with Power BI.",
    tags: ["Power BI", "DAX", "Data Visualization"],
    githubUrl: "https://github.com/zan4yov/Project-WheaterAPI",
    image: project3,
  },
  {
    title: "Global Economic Trends Analysis",
    description:
      "Interactive Power BI dashboard analyzing world economic trends.",
    tags: ["Power BI", "Python", "Data Analysis", "DAX"],
    githubUrl: "https://github.com/zan4yov/Global-Economic-Trends-Analysis",
    image: project4,
  },
  {
    title: "TerraTrace",
    description:
      "ESG Compliance Tracker web app with AI insights and chatbot support.",
    tags: ["React", "TypeScript", "Vite", "Tailwind CSS", "Supabase", "Tanstack", "Gemini"],
    githubUrl: "https://github.com/zan4yov/TerraTrace",
    image: project5,
  },
  {
    title: "Finance Tracker",
    description:
      "Personal finance tracker app to manage income, expenses, and budgets with AI advisor",
    tags: ["Vite", "TypeScript", "React", "Tailwind CSS", "Schadcn UI", "Supabase"],
    image: project6,
  },
];


// Experience & Skills untuk About page
export const experience = [
  {
    year: "2025 - Present",
    title: "Mining Technology Engineer",
    company: "PT Berau Coal Energy",
    description:
      "",
  },
];

export const skills = {
  frontend: ["React", "Vite", "Tailwind CSS", "HTML", "CSS", "JavaScript", "TypeScript"],
backend: ["Node.js", "Laravel", "Python", "Java", "C", "C++"],
database: ["MySQL"],
tools: ["Git", "Docker", "OpenAI", "Power BI", "Tableau", "Looker Studio"],
};

// Personality traits untuk About page
export const personality = [
  "🎯 Problem solver",
  "🚀 Fast learner",
  "💡 Creative thinker",
  "🤝 Team player",
  "📚 Continuous learner",
  "⚡ Detail-oriented",
];
