
// import React, { useState, useEffect } from 'react';

// const Hero = () => {
//   const [heroData, setHeroData] = useState(null);

//   useEffect(() => {
//     fetchHeroData();
//   }, []);

//   const fetchHeroData = async () => {
//     try {
//       const response = await fetch('/api/hero');
//       const data = await response.json();
//       setHeroData(data);
//     } catch (error) {
//       console.error('Error fetching hero data:', error);
//       setHeroData({
//         title: "We Are help you to Grow your Business",
//         subtitle: "web design & Development",
//         description: "A BSM approach can be used to understand the impact of business needs on IT Services and infrastructure, helping in the process of planning to ensure the portfolio of Business Services and IT Services aim to support these changing needs and objectives. This approach also helps to understand how technology, including incidents,",
//         ctaText: "SEE MORE ABOUT US"
//       });
//     }
//   };

//   if (!heroData) {
//     return (
//       <section className="bg-gradient-to-r from-blue-600 to-purple-700 text-white py-20">
//         <div className="container mx-auto px-4">
//           <div className="animate-pulse">
//             <div className="h-8 bg-blue-500 rounded w-3/4 mb-4"></div>
//             <div className="h-4 bg-blue-500 rounded w-1/2 mb-6"></div>
//             <div className="space-y-2">
//               <div className="h-4 bg-blue-500 rounded"></div>
//               <div className="h-4 bg-blue-500 rounded w-5/6"></div>
//             </div>
//           </div>
//         </div>
//       </section>
//     );
//   }

//   return (
//     <section className="bg-gradient-to-r from-blue-600 to-purple-700 text-white py-20">
//       <div className="container mx-auto px-4">
//         <div className="max-w-3xl">
//           <h1 className="text-4xl md:text-5xl font-bold mb-4 leading-tight">
//             {heroData.title}
//           </h1>
//           <h2 className="text-xl md:text-2xl text-blue-200 mb-6">
//             {heroData.subtitle}
//           </h2>
//           <p className="text-lg mb-8 leading-relaxed">
//             {heroData.description}
//           </p>
//           <button className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors duration-300">
//             {heroData.ctaText}
//           </button>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default Hero;



// components/Hero/HeroSection.jsx
import React, { useState, useEffect } from 'react';

const HeroSection = () => {
  const [heroData, setHeroData] = useState(null);

  useEffect(() => {
    const fetchHeroData = async () => {
      try {
        const response = await fetch('/api/hero');
        const data = await response.json();
        setHeroData(data);
      } catch (error) {
        setHeroData({
          title: "We Are help you to Grow your Business",
          subtitle: "web design @ Development",
          description: "A BSM approach can be used to understand the impact of business needs on IT Services and infrastructure, helping in the process of planning to ensure the portfolio of Business Services and IT Services aim to support these changing needs and objectives.This approach also helps to understand how technology, including incidents,",
          ctaText: "SEE MORE ABOUT US"
        });
      }
    };

    fetchHeroData();
  }, []);

  if (!heroData) return <div className="h-96 bg-gray-200 animate-pulse"></div>;

  return (
    <section className="py-20 bg-gradient-to-r from-blue-50 to-gray-100">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
            {heroData.title}
          </h1>
          <h2 className="text-xl md:text-2xl text-blue-600 font-semibold mb-6">
            {heroData.subtitle}
          </h2>
          <p className="text-gray-700 text-lg mb-8 leading-relaxed max-w-3xl">
            {heroData.description}
          </p>
          <button className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors">
            {heroData.ctaText}
          </button>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;



