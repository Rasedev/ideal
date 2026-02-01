// components/About/SkillBar.jsx
import React from 'react';

const SkillBar = ({ skill }) => {
  return (
    <div className="skill-item">
      <div className="flex justify-between items-center mb-2">
        <span className="font-semibold text-gray-800">{skill.name}</span>
        <span className="text-sm text-gray-600">{skill.percentage}%</span>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-3">
        <div 
          className="bg-gradient-to-r from-blue-500 to-purple-600 h-3 rounded-full transition-all duration-1000 ease-out"
          style={{ width: `${skill.percentage}%` }}
        ></div>
      </div>
    </div>
  );
};

export default SkillBar;