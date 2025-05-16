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
  phone: '+1234567890',
  location: 'Your City, Country',
};

export const skills: Skill[] = [
  { name: 'JavaScript' },
  { name: 'TypeScript' },
  { name: 'React' },
  { name: 'Python' },
  // Add more
];

export const experiences: Experience[] = [
  {
    id: 'exp1',
    title: 'Intern Developer',
    company: 'Some Company',
    start: '2023-01-01',
    end: '2023-06-01',
    responsibilities: [
      'Developed feature X using React',
      'Collaborated with backend team',
    ],
  },
  // More experiences
];

export const education: Education[] = [
  {
    id: 'edu1',
    degree: 'Grade 12',
    school: 'Your School Name',
    start: '2022-06-01',
    end: '2023-04-01',
    details: 'Currently enrolled, focus on science and programming.',
  },
  // More education entries
];

export const certifications: Certification[] = [
  {
    id: 'cert1',
    name: 'JavaScript Algorithms and Data Structures',
    issuer: 'freeCodeCamp',
    date: '2023-03-15',
    url: 'https://www.freecodecamp.org/certification/yourusername/javascript-algorithms-and-data-structures',
  },
  // More certifications
];

export const projects: Project[] = [
  {
    id: 'proj1',
    title: 'Personal Portfolio',
    description: 'My portfolio website built with React and TypeScript.',
    techStack: ['React', 'TypeScript', 'CSS'],
    url: 'https://github.com/TanujairamV/portfolio',
  },
  // More projects
];
