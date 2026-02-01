// components/Sections/StatsSection.jsx
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchStats } from '../Slices/sectionsSlice';

const Stats = () => {
  const dispatch = useDispatch();
  const { stats, loading } = useSelector((state) => state.sections);

  useEffect(() => {
    dispatch(fetchStats());
  }, [dispatch]);

  const defaultStats = [
    { id: 1, value: "79,000", label: "FUNCTIONED" },
    { id: 2, value: "754", label: "FEATURING ANXIOD" },
    { id: 3, value: "4,000", label: "TICKETS ANSWERED" },
    { id: 4, value: "1,000", label: "YOU FEEL SURPRISED" }
  ];

  const displayStats = stats.length > 0 ? stats : defaultStats;

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
            Trembling ideas and intentions always make us feel proud
          </h2>
        </div>

        {/* Statistics Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16">
          {displayStats.map((stat) => (
            <div key={stat.id} className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-blue-600 mb-2">
                {loading.stats ? (
                  <div className="h-10 bg-gray-200 rounded animate-pulse mx-auto w-24"></div>
                ) : (
                  stat.value
                )}
              </div>
              <div className="text-gray-600 font-medium text-sm md:text-base">
                {stat.label}
              </div>
            </div>
          ))}
        </div>

        <div className="border-t border-gray-200 my-12"></div>

        {/* Company Info Section */}
        <CompanyInfo />
      </div>
    </section>
  );
};

const CompanyInfo = () => (
  <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
    <div>
      <h3 className="text-2xl font-bold text-gray-800 mb-4">
        GREAT PRODUCT OF COMPANY
      </h3>
      <p className="text-gray-600 leading-relaxed mb-8">
        Not again is there anyone who loves or promises or desires to obtain pairs of books because it is pain, but because occasionally circumstances occur in which toil and pain can procure him some great pleasure.
      </p>
      
      <div className="space-y-6">
        <ServiceItem 
          title="PHP TO THREATENS"
          items={[
            "Piano dopamine at some defined women executive pilometers",
            "our pain ranges gentle."
          ]}
        />
        <ServiceItem 
          title="HOSTING & DOMAIN SERVICES"
          items={[
            "Piano dopamine at some defined women executive pilometers",
            "our pain ranges gentle."
          ]}
        />
        <ServiceItem 
          title="GET PLAN YOUR BUSINESS"
          items={[
            "Piano dopamine at some defined women executive pilometers",
            "our pain ranges gentle."
          ]}
        />
      </div>
    </div>
    
    <div className="bg-gray-50 p-8 rounded-lg">
      <div className="aspect-video bg-gradient-to-br from-blue-100 to-purple-100 rounded-lg flex items-center justify-center">
        <span className="text-gray-500">Company Visual</span>
      </div>
    </div>
  </div>
);

const ServiceItem = ({ title, items }) => (
  <div>
    <h4 className="text-lg font-semibold text-gray-800 mb-3">
      {title}:
    </h4>
    <ul className="space-y-2">
      {items.map((item, index) => (
        <li key={index} className="flex items-start text-gray-600">
          <span className="text-blue-500 mr-2 mt-1">•</span>
          {item}
        </li>
      ))}
    </ul>
  </div>
);

export default Stats;