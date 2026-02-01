// components/Statistics/StatsSection.jsx
import React, { useState, useEffect } from 'react';
import CountUp from 'react-countup';

const Stats = () => {
  const [stats, setStats] = useState([]);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const response = await fetch('/api/stats');
      const data = await response.json();
      setStats(data);
    } catch (error) {
      console.error('Error fetching stats:', error);
      setStats([
        { number: 79000, label: "FUNCTIONED" },
        { number: 754, label: "FEATURING ANXIOD" },
        { number: 4000, label: "TICKETS ANSWERED" },
        { number: 1000, label: "YOU FEEL SURPRISED" }
      ]);
    }
  };

  return (
    <section className="py-16 bg-gray-900 text-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Trembling ideas and intentions always make us feel proud
          </h2>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-blue-400 mb-2">
                <CountUp end={stat.number} duration={2.5} separator="," />
              </div>
              <div className="text-gray-300 font-medium">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Stats;