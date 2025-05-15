interface SkillChipProps {
  skill: string;
}

const SkillChip = ({ skill }: SkillChipProps) => {
  return (
    <span className="inline-block bg-foreground/10 text-foreground px-3 py-1 rounded-full text-sm font-space-grotesk mr-2 mb-2 bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400 dark:from-white dark:to-gray-400">
      {skill}
    </span>
  );
};

export default SkillChip;
