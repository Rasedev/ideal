// components/Team/TeamSection.jsx
import React, { useState, useEffect } from 'react';

const TeamSection = () => {
  const [advisors, setAdvisors] = useState([]);
  const [teamInfo, setTeamInfo] = useState(null);

  useEffect(() => {
    fetchTeamData();
  }, []);

  const fetchTeamData = async () => {
    try {
      const [advisorsResponse, infoResponse] = await Promise.all([
        fetch('/api/advisors'),
        fetch('/api/team-info')
      ]);
      
      const advisorsData = await advisorsResponse.json();
      const infoData = await infoResponse.json();
      
      setAdvisors(advisorsData);
      setTeamInfo(infoData);
    } catch (error) {
      console.error('Error fetching team data:', error);
      setAdvisors([
        {
          id: 1,
          name: "Mike Jowling",
          position: "SOUR TERRA BY",
          image: "/images/team/mike.jpg",
          description: "Creative Corporate, Community Company Profile, Agency and editor."
        }
      ]);
      setTeamInfo({
        title: "Meet Our Advisors",
        description: "I like the geometric visual, bold type, easy grid and the well balanced whitespace. Gallery Photo"
      });
    }
  };

  if (!teamInfo) {
    return (
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-64 mx-auto mb-4"></div>
            <div className="h-4 bg-gray-200 rounded w-96 mx-auto mb-8"></div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="bg-white rounded-lg p-6">
                  <div className="h-48 bg-gray-200 rounded mb-4"></div>
                  <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                  <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            {teamInfo.title}
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            {teamInfo.description}
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {advisors.map((advisor) => (
            <div key={advisor.id} className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
              <div className="h-48 bg-gradient-to-r from-blue-400 to-purple-500"></div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-800 mb-1">
                  {advisor.name}
                </h3>
                <p className="text-blue-600 font-semibold mb-3">
                  {advisor.position}
                </p>
                <p className="text-gray-600 text-sm">
                  {advisor.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TeamSection;