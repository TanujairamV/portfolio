export interface Socials {
  github?: string;
  linkedin?: string;
  email?: string;
  phone?: string;
  location?: string;
}

export interface Skill {
  name: string;
}

export interface Experience {
  id: string;
  title: string;
  company: string;
  start: string; // e.g. "2023-01-01"
  end?: string;  // e.g. "2023-06-01" or undefined for current
  responsibilities: string[];
}

export interface Education {
  id: string;
  degree: string;
  school: string;
  start: string;
  end: string;
  details: string;
}

export interface Certification {
  id: string;
  name: string;
  issuer: string;
  date: string;
  url: string;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  techStack: string[];
  url?: string;
}

export const socials: Socials = {
  github: 'https://github.com/TanujairamV',
  linkedin: 'https://linkedin.com/in/tanujairam',
  email: 'tanujairam.v@gmail.com',
  phone: '+91-9876543210',
  location: 'Chennai, India',
};

export const skills: Skill[] = [
  { name: 'JavaScript' },
  { name: 'TypeScript' },
  { name: 'React' },
  { name: 'Python' },
  { name: 'HTML5' },
  { name: 'CSS3' },
  { name: 'TailwindCSS' },
  { name: 'Framer Motion' },
  { name: 'Node.js' },
  { name: 'Git' },
];

export const experiences: Experience[] = [
  {
    id: 'exp1',
    title: 'Frontend Developer Intern',
    company: 'Tech Solutions Pvt Ltd',
    start: '2024-01-01',
    end: '2024-04-30',
    responsibilities: [
      'Developed interactive UIs using React and TailwindCSS',
      'Collaborated with designers to implement pixel-perfect pages',
      'Optimized web applications for performance and scalability',
    ],
  },
  {
    id: 'exp2',
    title: 'Open Source Contributor',
    company: 'GitHub',
    start: '2023-06-15',
    responsibilities: [
      'Contributed bug fixes to popular repositories',
      'Reviewed and merged community pull requests',
    ],
  },
];

export const education: Education[] = [
  {
    id: 'edu1',
    degree: '12th Grade (CBSE)',
    school: 'ABC Senior Secondary School',
    start: '2022-06-01',
    end: '2023-05-01',
    details: 'Science stream with Computer Science. Member of coding club.',
  },
  {
    id: 'edu2',
    degree: '10th Grade (CBSE)',
    school: 'ABC Senior Secondary School',
    start: '2020-06-01',
    end: '2021-05-01',
    details: 'Scored 95% overall, topped in Computer Science.',
  },
];

export const certifications: Certification[] = [
  {
    id: 'cert1',
    name: 'JavaScript Algorithms and Data Structures',
    issuer: 'freeCodeCamp',
    date: '2023-03-15',
    url: 'https://www.freecodecamp.org/certification/fcc123/javascript-algorithms-and-data-structures',
  },
  {
    id: 'cert2',
    name: 'Responsive Web Design',
    issuer: 'freeCodeCamp',
    date: '2023-02-10',
    url: 'https://www.freecodecamp.org/certification/fcc123/responsive-web-design',
  },
];

export const projects: Project[] = [
  {
    id: 'proj1',
    title: 'Personal Portfolio',
    description: 'A modern responsive portfolio website to showcase my projects and skills.',
    techStack: ['React', 'TypeScript', 'TailwindCSS', 'Framer Motion'],
    url: 'https://github.com/TanujairamV/portfolio',
  },
  {
    id: 'proj2',
    title: 'Weather App',
    description: 'A real-time weather dashboard consuming OpenWeatherMap API.',
    techStack: ['React', 'CSS', 'API'],
    url: 'https://github.com/TanujairamV/weather-app',
  },
  {
    id: 'proj3',
    title: 'Markdown Blog',
    description: 'A static blog generator that renders markdown files as blog posts.',
    techStack: ['Node.js', 'Express', 'React'],
    url: 'https://github.com/TanujairamV/markdown-blog',
  },
  {
    id: 'proj4',
    title: 'Task Tracker',
    description: 'A simple task tracker with CRUD operations and local storage support.',
    techStack: ['JavaScript', 'HTML', 'CSS'],
    url: 'https://github.com/TanujairamV/task-tracker',
  },
  {
    id: 'proj5',
    title: 'Portfolio Starter Template',
    description: 'A customizable React portfolio template for developers.',
    techStack: ['React', 'TypeScript', 'Vite'],
    url: 'https://github.com/TanujairamV/portfolio-template',
  },
];
