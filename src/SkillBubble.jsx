function SkillBubble({ skill, proficiency }) {
  return (
    <div className="skill-bubble">
      <span className="text-sm font-inter">{skill}</span>
      <span className="text-xs font-inter opacity-70">({proficiency})</span>
    </div>
  );
}

export default SkillBubble;
