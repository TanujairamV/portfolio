function SkillBubble({ skill, proficiency, level }) {
  return (
    <div className="flex flex-col gap-2 mb-4 w-full max-w-md">
      <div className="flex justify-between items-center">
        <span className="text-base font-inter">{skill}</span>
        <span className="text-sm font-inter opacity-70">{proficiency}</span>
      </div>
      <div className="progress-bar">
        <div className="progress-bar-fill" style={{ width: `${level}%` }}></div>
      </div>
    </div>
  );
}

export default SkillBubble;
