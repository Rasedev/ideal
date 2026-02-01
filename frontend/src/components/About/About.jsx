// components/About/AboutSection.jsx
import React, { useState, useEffect } from 'react';
import SkillBar from './SkillBar';

const About = () => {
  const [aboutData, setAboutData] = useState(null);

  useEffect(() => {
    fetchAboutData();
  }, []);

  const fetchAboutData = async () => {
    try {
      const response = await fetch('/api/about');
      const data = await response.json();
      setAboutData(data);
    } catch (error) {
      console.error('Error fetching about data:', error);
      setAboutData({
        companyName: "MEXO DESIGN",
        title: "WHO WE ARE & WHAT WE DO",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur dolor amet ghanda tellus, quis neroi ipsum texdib laucus ligula. Curabitur quis rhoncus",
        skills: [
          { name: "Development", percentage: 90 },
          { name: "Design", percentage: 80 },
          { name: "Marketing", percentage: 70 }
        ]
      });
    }
  };

  if (!aboutData) {
    return (
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="animate-pulse">
            <div className="h-6 bg-gray-200 rounded w-48 mb-2"></div>
            <div className="h-8 bg-gray-200 rounded w-64 mb-6"></div>
            <div className="space-y-3 mb-8">
              <div className="h-4 bg-gray-200 rounded"></div>
              <div className="h-4 bg-gray-200 rounded w-5/6"></div>
            </div>
            {[...Array(3)].map((_, i) => (
              <div key={i} className="mb-4">
                <div className="h-4 bg-gray-200 rounded w-32 mb-2"></div>
                <div className="h-2 bg-gray-200 rounded-full"></div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl">
          <h2 className="text-2xl font-bold text-gray-800 mb-2">
            {aboutData.companyName}
          </h2>
          <h3 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
            {aboutData.title}
          </h3>
          <p className="text-gray-600 text-lg mb-12 leading-relaxed">
            {aboutData.description}
          </p>
          
          <div className="space-y-6">
            {aboutData.skills.map((skill, index) => (
              <SkillBar key={index} skill={skill} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;