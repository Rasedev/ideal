//////////////////////

// import { Alert, Button } from "antd";
// import React from "react";
// import { Link } from "react-router-dom";
// import ErrorImage from "../assets/8.jpg";

// const Error = () => {
//   return (
//     <div className="flex flex-col items-center justify-center min-h-screen px-6 bg-gray-100">
//       {/* Error Illustration */}
//       <img
//         className="w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg mb-4"
//         src={ErrorImage}
//         alt="Error illustration"
//       />

//       {/* Error Alert */}
//       <Alert
//         className="w-full max-w-xs sm:max-w-sm md:max-w-md shadow-lg rounded-lg text-center"
//         message={<span className="text-xl font-semibold">Page Not Found</span>}
//         description={
//           <span className="text-gray-600 text-sm sm:text-base">
//             Sorry, the page you’re looking for doesn’t exist. You might have
//             mistyped the address or the page may have moved.
//           </span>
//         }
//         type="error"
//         showIcon
//       />

//       {/* Back to Home Button */}
//       <Button className="mt-6 w-full max-w-xs sm:max-w-sm bg-blue-600 text-white font-semibold py-3 rounded-xl hover:bg-blue-700 hover:scale-105 transition-transform">
//         <Link to="/" className="block w-full text-center">
//           Back To Home
//         </Link>
//       </Button>
//     </div>
//   );
// };

// export default Error;

import { Link } from "react-router-dom";

const Error = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-black via-gray-900 to-black text-white px-6">
      {/* Wrapper */}
      <div className="flex flex-col lg:flex-row items-center justify-between w-full max-w-5xl">
        {/* Left Side - 404 Text */}
        <div className="text-center lg:text-left">
          <h2 className="text-lg font-light tracking-widest mb-2">
            How To Fix
          </h2>
          <h1 className="text-[6rem] md:text-[10rem] font-bold">
            40<span className="opacity-50">4</span>
          </h1>
          <p className="text-2xl font-light">Error</p>
        </div>

        {/* Right Side - Distorted Text */}
        <div className="relative text-5xl font-bold uppercase distorted-wrapper">
          <div className="distorted-text">PAGE NOT FOUND</div>
          <div className="distorted-text">PAGE NOT FOUND</div>
        </div>
      </div>

      {/* Back Button */}
      <Link to="/" className="absolute bottom-10">
        <button className="px-6 py-2 border border-white text-white rounded-lg hover:bg-white hover:text-black transition-all">
          GO BACK HOME
        </button>
      </Link>
    </div>
  );
};

export default Error;
