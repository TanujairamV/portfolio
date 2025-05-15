import { Project } from './types';

interface ProjectCardProps {
  project: Project;
}

const ProjectCard = ({ project }: ProjectCardProps) => {
  const { name, url, tech, description } = project;

  return (
    <div className="material-card bg-background/80 backdrop-blur-md rounded-lg shadow-lg p-6 hover:scale-105 transition-transform duration-300">
      <h3 className="text-xl font-space-grotesk mb-2 bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400 dark:from-white dark:to-gray-400">
        <a href={url} target="_blank" rel="noopener noreferrer" className="hover:text-accent">
          {name}
        </a>
      </h3>
      <p className="bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400 dark:from-white dark:to-gray-400 mb-4">
        {description}
      </p>
      <div className="flex flex-wrap gap-2">
        {tech.map((t: string) => (
          <span
            key={t}
            className="inline-block bg-foreground/10 text-foreground px-3 py-1 rounded-full text-sm font-space-grotesk bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400 dark:from-white dark:to-gray-400"
          >
            {t}
          </span>
        ))}
      </div>
    </div>
  );
};

export default ProjectCard;
