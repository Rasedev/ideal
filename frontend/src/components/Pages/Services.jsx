// components/Sections/ServicesSection.jsx
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchServices } from '../Slices/sectionsSlice';

const Services = () => {
  const dispatch = useDispatch();
  const { services, loading, error } = useSelector((state) => state.sections);

  useEffect(() => {
    dispatch(fetchServices());
  }, [dispatch]);

  const LoadingSkeleton = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
      {[...Array(4)].map((_, i) => (
        <div key={i} className="animate-pulse">
          <div className="h-48 bg-gray-200 rounded-lg mb-4"></div>
          <div className="h-6 bg-gray-200 rounded mb-2"></div>
          <div className="h-4 bg-gray-200 rounded w-3/4"></div>
        </div>
      ))}
    </div>
  );

  if (error) {
    return (
      <section id="services" className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center text-red-600">
            Error loading services: {error}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="services" className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        {loading.services ? (
          <LoadingSkeleton />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {services.map((service) => (
              <ServiceCard key={service.id} service={service} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

const ServiceCard = ({ service }) => (
  <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
    <div className="text-3xl mb-4 text-blue-600">{service.icon}</div>
    <h3 className="text-xl font-semibold text-gray-800 mb-3">
      {service.title}
    </h3>
    <p className="text-gray-600 leading-relaxed">
      {service.description}
    </p>
  </div>
);

export default Services;