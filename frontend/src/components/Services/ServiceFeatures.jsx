// components/Services/ServiceFeatures.jsx
import React, { useState, useEffect } from 'react';

const ServiceFeatures = () => {
  const [features, setFeatures] = useState([]);

  useEffect(() => {
    fetchFeatures();
  }, []);

  const fetchFeatures = async () => {
    try {
      const response = await fetch('/api/features');
      const data = await response.json();
      setFeatures(data);
    } catch (error) {
      console.error('Error fetching features:', error);
      setFeatures([
        {
          title: "PHP TO THREATENS",
          items: [
            "Piano dopamine at some defined women executive pilometers",
            "our pain ranges gentle."
          ]
        },
        {
          title: "HOSTING & DOMAIN SERVICES",
          items: [
            "Piano dopamine at some defined women executive pilometers",
            "our pain ranges gentle."
          ]
        },
        {
          title: "GET PLAN YOUR BUSINESS",
          items: [
            "Piano dopamine at some defined women executive pilometers",
            "our pain ranges gentle."
          ]
        }
      ]);
    }
  };

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            GREAT PRODUCT OF COMPANY
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Not again is there anyone who loves or promises or desires to obtain pairs of books because it is pain, but because occasionally
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="bg-gray-50 rounded-lg p-6 hover:shadow-lg transition-shadow duration-300">
              <h3 className="text-xl font-bold text-gray-800 mb-4">{feature.title}</h3>
              <ul className="space-y-2">
                {feature.items.map((item, itemIndex) => (
                  <li key={itemIndex} className="flex items-start">
                    <span className="text-blue-500 mr-2">•</span>
                    <span className="text-gray-600">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServiceFeatures;