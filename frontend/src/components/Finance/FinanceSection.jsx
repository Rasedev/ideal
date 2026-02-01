// components/Finance/FinanceSection.jsx
import React, { useState, useEffect } from 'react';

const FinanceSection = () => {
  const [financeData, setFinanceData] = useState(null);

  useEffect(() => {
    const fetchFinanceData = async () => {
      try {
        const response = await fetch('/api/finance');
        const data = await response.json();
        setFinanceData(data);
      } catch (error) {
        setFinanceData({
          title: "SPEND YOUR MONEY",
          subtitle: "It Save Tons of time",
          items: [
            { name: "DEPMON", type: "SUMMARY" },
            { name: "UNPATRIO", type: "SUMMARY" },
            { name: "DEERBEND", type: "SUMMARY" },
            { name: "CAdventure", type: "SUMMARY" }
          ]
        });
      }
    };

    fetchFinanceData();
  }, []);

  if (!financeData) return <div className="h-64 bg-gray-200 animate-pulse"></div>;

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            {financeData.title}
          </h2>
          <p className="text-gray-600 text-xl">
            {financeData.subtitle}
          </p>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
          {financeData.items.map((item, index) => (
            <div key={index} className="text-center p-6 border border-gray-200 rounded-lg">
              <div className="text-2xl font-bold text-gray-800 mb-2">
                {item.name}
              </div>
              <div className="text-blue-600 font-semibold text-sm">
                {item.type}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FinanceSection;