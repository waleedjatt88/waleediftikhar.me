import React from 'react';

const SkillBall = ({ skill, index, total }) => {
  // Calculate angle for orbital positioning
  const angle = (360 / total) * index;
  
  // Different colors for variety
  const colors = [
    'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', // Purple
    'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)', // Pink
    'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)', // Blue
    'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)', // Green
    'linear-gradient(135deg, #fa709a 0%, #fee140 100%)', // Orange-Yellow
    'linear-gradient(135deg, #30cfd0 0%, #330867 100%)', // Teal-Purple
    'linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)', // Light Cyan-Pink
    'linear-gradient(135deg, #ff9a9e 0%, #fecfef 100%)', // Peach-Pink
  ];

  return (
    <div 
      className="skill-ball-orbit"
      style={{ 
        '--angle': `${angle}deg`,
        '--delay': `${index * 0.5}s`
      }}
    >
      <div 
        className="skill-ball"
        style={{ 
          background: colors[index % colors.length]
        }}
      >
        <span className="skill-ball-name">{skill.name}</span>
      </div>
    </div>
  );
};

export default SkillBall;
