
// import React from 'react';

// const ServiceCard = ({ service }) => {
//   return (
//     <div className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow duration-300">
//       <div className="text-3xl mb-4">{service.icon}</div>
//       <h3 className="text-lg md:text-lg font-semibold text-gray-800 mb-3 text-center">{service.title}</h3>
//       <p className="text-gray-600 leading-relaxed">{service.description}</p>
//     </div>
//   );
// };

// export default ServiceCard;





import React from 'react';

const ServiceCard = ({ service }) => {
  const isImageIcon = typeof service.icon === 'string' && service.icon.includes('.');

  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden group">
      <div className="relative h-48 bg-gray-200 ">
        {/* Image placeholder or actual image */}
        <div 
          className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-105 
          group-hover:shadow-[0_0_30px_#515151_inset]" // 🌟 FIX APPLIED HERE
          style={{ backgroundImage: `url(${service.image || 'https://via.placeholder.com/400x300'})` }}
        ></div>
        
        {/* Icon overlay */}
        <div className="absolute -top-7 left-1/2 -translate-x-1/2 w-16 h-16 bg-white rounded-full shadow-md flex items-center justify-center 
        transition-all duration-300 group-hover:scale-110 z-10 group-hover:shadow-[0_0_30px_#515151_inset]">
          {isImageIcon ? (
            <img 
              src={service.icon} 
              alt={`${service.title} icon`} 
              className="w-8 h-8 object-contain" 
            />
          ) : (
            <span className="text-3xl">{service.icon}</span>
          )}
        </div>
      </div>
      
      <div className="pb-7 pt-12 text-center">
        <h3 className="text-xl md:text-[17px] font-bold text-[#282828] mb-2 uppercase tracking-tight">
          {service.title}
        </h3>
        <p className="text-[#515151] font-lato leading-relaxed text-[13px] px-6">
          {service.description}
        </p>
      </div>
    </div>
  );
};

export default ServiceCard;











// import React from 'react';

// const ServiceCard = ({ service }) => {
//   // Simple check: if the icon string contains '.', we assume it's an image path.
//   const isImageIcon = typeof service.icon === 'string' && service.icon.includes('.');

//   return (
//     <div className="bg-white rounded-lg shadow-lg  group">
//       <div className="relative h-48 bg-gray-200 ">
//         {/* Image placeholder or actual image */}
//         <div 
//           className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-105 
//           group-hover:shadow-[0_0_30px_#eeeeee_inset]" 
//           style={{ backgroundImage: `url(${service.image || 'https://via.placeholder.com/400x300'})` }}
//         ></div>
        
//         {/* Icon overlay */}
//         <div className="absolute -top-7 left-1/2 -translate-x-1/2 w-16 h-16 bg-white rounded-full shadow-md flex items-center 
//         justify-center transition-all duration-300 group-hover:scale-110">
//           {isImageIcon ? (
//             // 🛑 FIX: If it's an image path, render it in an <img> tag.
//             <img 
//               src={service.icon} 
//               alt={`${service.title} icon`} 
//               className="w-8 h-8 object-contain" // Tailwind classes for sizing the image
//             />
//           ) : (
//             // If it's an emoji or plain text, render it in a <span>.
//             <span className="text-3xl">{service.icon}</span>
//           )}
//         </div>
//       </div>
      
//       <div className="p-6 pt-12 text-center">
//         <h3 className="text-xl font-semibold text-gray-800 mb-2 uppercase tracking-wide">
//           {service.title}
//         </h3>
//         <p className="text-gray-600 leading-relaxed text-sm">
//           {service.description}
//         </p>
//       </div>
//     </div>
//   );
// };

// export default ServiceCard;








