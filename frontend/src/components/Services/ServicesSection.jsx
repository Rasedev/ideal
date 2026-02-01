
// import React, { useState, useEffect } from 'react';
// import ServiceCard from './ServiceCard';
// import HandIcon from '../../assets/handshake.png';
// import Sharing from '../../assets/sharing.png';
// import Chat from '../../assets/chat.png';
// import Dollar from '../../assets/dollar.png';
// import servicebox from '../../assets/H0.jpg';
// import servicebox0 from '../../assets/H5.jpg';
// import servicebox1 from '../../assets/H6.jpg';
// import servicebox2 from '../../assets/H7.jpg';

// const Services = () => {
//   const [services, setServices] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     fetchServices();
//   }, []);

//   const fetchServices = async () => {
//     try {
//       const response = await fetch('/api/services');
//       const data = await response.json();
//       setServices(data);
//     } catch (error) {
//       console.error('Error fetching services:', error);
//       // Fallback data
//       setServices([
//         {
//     id: 1,
//     title: "FINANCIAL PLANNING",
//     description: "Temporibus autem quibusdam et aut officitis debitis aut rerum",
//     icon: HandIcon, 
//     image: servicebox 
//   },
//         {
//           id: 2,
//           title: "ASSOCITATION ADVISOR",
//           description: "Temporibus autem quibusdam et aut officitis debitis aut rerum",
//           icon: Chat,
//           image: servicebox0
//         },
//         {
//           id: 3,
//           title: "INVESTMENT ADVISOR",
//           description: "Temporibus autem quibusdam et aut officitis debitis aut rerum",
//          icon: Dollar,
//           image: servicebox1
//         },
//         {
//           id: 4,
//           title: "SAVINGS MONEY",
//           description: "Temporibus autem quibusdam et aut officitis debitis aut rerum",
//          icon: Sharing,
//           image: servicebox2
//         }
//       ]);
//     } finally {
//       setLoading(false);
//     }
//   };

//   if (loading) {
//     return (
//       <section className="py-16 bg-gray-50">
//         <div className="container mx-auto px-4">
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
//             {[...Array(4)].map((_, i) => (
//               <div key={i} className="animate-pulse">
//                 <div className="h-48 bg-gray-200 rounded-lg"></div>
//               </div>
//             ))}
//           </div>
//         </div>
//       </section>
//     );
//   }

//   return (
//     <section className="py-16 bg-gray-50">
//       <div className="container mx-auto px-4">
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
//           {services.map((service) => (
//             <ServiceCard key={service.id} service={service} />
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// };

// export default Services;








import React, { useState, useEffect } from "react";
import ServiceCard from "./ServiceCard";

// Local fallback images
import HandIcon from "../../assets/handshake.png";
import Sharing from "../../assets/sharing.png";
import Chat from "../../assets/chat.png";
import Dollar from "../../assets/dollar.png";
import servicebox from "../../assets/H0.jpg";
import servicebox0 from "../../assets/H5.jpg";
import servicebox1 from "../../assets/H6.jpg";
import servicebox2 from "../../assets/H7.jpg";

const FALLBACK_SERVICES = [
  {
    id: 1,
    title: "FINANCIAL PLANNING",
    description: "Temporibus autem quibusdam et aut officiis debitis aut rerum.",
    icon: HandIcon,
    image: servicebox,
  },
  {
    id: 2,
    title: "ASSOCIATION ADVISOR",
    description: "Temporibus autem quibusdam et aut officiis debitis aut rerum.",
    icon: Chat,
    image: servicebox0,
  },
  {
    id: 3,
    title: "INVESTMENT ADVISOR",
    description: "Temporibus autem quibusdam et aut officiis debitis aut rerum.",
    icon: Dollar,
    image: servicebox1,
  },
  {
    id: 4,
    title: "SAVINGS MONEY",
    description: "Temporibus autem quibusdam et aut officiis debitis aut rerum.",
    icon: Sharing,
    image: servicebox2,
  },
];

const Services = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    try {
      const response = await fetch("/api/services");

      if (!response.ok) throw new Error("API error");

      const data = await response.json();

      // Validate data structure before using
      if (!Array.isArray(data) || data.length === 0) {
        setServices(FALLBACK_SERVICES);
      } else {
        setServices(
          data.map((item) => ({
            ...item,
            icon: item.icon || HandIcon,
            image: item.image || servicebox,
          }))
        );
      }
    } catch (error) {
      console.error("Error fetching services:", error);
      setServices(FALLBACK_SERVICES);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section
      className="py-20 bg-gray-50"
      aria-label="Services Section"
      role="region"
    >
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800">
            Our Professional Services
          </h2>
          <p className="text-gray-500 mt-2">
            Providing world-class advisory, support, and solutions.
          </p>
        </div>

        {/* Loading skeleton */}
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className="animate-pulse bg-white p-6 rounded-xl shadow-md"
              >
                <div className="h-14 w-14 bg-gray-200 rounded-lg mb-4"></div>
                <div className="h-4 bg-gray-200 rounded mb-2"></div>
                <div className="h-3 bg-gray-200 rounded w-3/4"></div>
              </div>
            ))}
          </div>
        ) : (
          /* Real service cards */
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {services.map((service) => (
              <ServiceCard key={service.id} service={service} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default Services;









