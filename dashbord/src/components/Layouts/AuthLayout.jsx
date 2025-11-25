
// import React from 'react';
// import { Layout, theme, ConfigProvider } from 'antd';
// import { Outlet, Navigate } from 'react-router-dom';
// import { useSelector } from 'react-redux';

// const { Content } = Layout;

// const AuthLayout = () => {
//   const {
//     token: { colorBgContainer, colorBgLayout },
//   } = theme.useToken();

//   const user = useSelector((state) => state.user?.value);
//   const token = localStorage.getItem('token');

//   // If user is already authenticated, redirect to dashboard
//   if (token && user) {
//     return <Navigate to="/" replace />;
//   }

//   return (
//     <ConfigProvider
//       theme={{
//         token: {
//           colorPrimary: '#1890ff',
//           borderRadius: 8,
//           fontSize: 14,
//         },
//         components: {
//           Layout: {
//             bodyBg: colorBgLayout,
//             headerBg: colorBgContainer,
//           },
//           Form: {
//             itemMarginBottom: 16,
//           },
//         },
//       }}
//     >
//       <Layout className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
//         {/* Background Decoration */}
//         <div className="absolute inset-0 overflow-hidden">
//           <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
//           <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
//           <div className="absolute top-40 left-40 w-80 h-80 bg-indigo-200 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000"></div>
//         </div>

//         <Content className="relative z-10 flex items-center justify-center p-4">
//           {/* Left Side - Branding/Information (Hidden on mobile) */}
//           <div className="hidden lg:flex lg:flex-1 lg:items-center lg:justify-center lg:p-8">
//             <div className="max-w-md text-center">
//               <div className="flex items-center justify-center mb-8">
//                 <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg">
//                   <span className="text-white text-2xl font-bold">AS</span>
//                 </div>
//               </div>
              
//               <h1 className="text-4xl font-bold text-gray-800 mb-4 font-railway">
//                 Association System
//               </h1>
              
//               <p className="text-lg text-gray-600 mb-8 leading-relaxed">
//                 Streamline your organization management with our comprehensive platform. 
//                 Manage members, employees, and operations efficiently.
//               </p>

//               {/* Features List */}
//               <div className="space-y-4 text-left">
//                 <div className="flex items-center space-x-3">
//                   <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
//                     <span className="text-green-600 text-sm">✓</span>
//                   </div>
//                   <span className="text-gray-700">Role-based access control</span>
//                 </div>
//                 <div className="flex items-center space-x-3">
//                   <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
//                     <span className="text-blue-600 text-sm">✓</span>
//                   </div>
//                   <span className="text-gray-700">Employee & member management</span>
//                 </div>
//                 <div className="flex items-center space-x-3">
//                   <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
//                     <span className="text-purple-600 text-sm">✓</span>
//                   </div>
//                   <span className="text-gray-700">Real-time order tracking</span>
//                 </div>
//                 <div className="flex items-center space-x-3">
//                   <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center">
//                     <span className="text-orange-600 text-sm">✓</span>
//                   </div>
//                   <span className="text-gray-700">Advanced reporting & analytics</span>
//                 </div>
//               </div>

//               {/* Testimonial */}
//               <div className="mt-12 p-6 bg-white/80 backdrop-blur-sm rounded-2xl shadow-sm border border-gray-100">
//                 <p className="text-gray-600 italic mb-4">
//                   "This platform has transformed how we manage our association. Everything is now streamlined and accessible."
//                 </p>
//                 <div className="flex items-center space-x-3">
//                   <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
//                     <span className="text-white font-semibold">JD</span>
//                   </div>
//                   <div>
//                     <p className="text-sm font-semibold text-gray-800">John Doe</p>
//                     <p className="text-xs text-gray-500">Association President</p>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>

//           {/* Right Side - Auth Forms */}
//           <div className="flex-1 max-w-md w-full">
//             <div className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-2xl border border-gray-100 overflow-hidden">
//               {/* Animated Header */}
//               <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-6 text-center relative overflow-hidden">
//                 <div className="absolute inset-0 bg-black/10"></div>
//                 <div className="relative z-10">
//                   <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mx-auto mb-4 backdrop-blur-sm">
//                     <span className="text-white text-2xl font-bold">AS</span>
//                   </div>
//                   <h2 className="text-2xl font-bold text-white mb-2 font-railway">
//                     Welcome Back
//                   </h2>
//                   <p className="text-blue-100 text-sm">
//                     Sign in to access your account
//                   </p>
//                 </div>
                
//                 {/* Floating elements */}
//                 <div className="absolute top-4 left-4 w-3 h-3 bg-white/30 rounded-full animate-pulse"></div>
//                 <div className="absolute bottom-4 right-4 w-2 h-2 bg-white/40 rounded-full animate-pulse"></div>
//               </div>

//               {/* Auth Content */}
//               <div className="p-8">
//                 <Outlet />
//               </div>

//               {/* Footer */}
//               <div className="bg-gray-50 px-8 py-4 border-t border-gray-100">
//                 <div className="flex items-center justify-between text-xs text-gray-500">
//                   <span>© 2024 Association System</span>
//                   <div className="flex space-x-4">
//                     <a href="/privacy" className="hover:text-gray-700 transition-colors">
//                       Privacy
//                     </a>
//                     <a href="/terms" className="hover:text-gray-700 transition-colors">
//                       Terms
//                     </a>
//                     <a href="/help" className="hover:text-gray-700 transition-colors">
//                       Help
//                     </a>
//                   </div>
//                 </div>
//               </div>
//             </div>

//             {/* Additional Links */}
//             <div className="mt-6 text-center">
//               <p className="text-sm text-gray-600">
//                 Need help?{' '}
//                 <a 
//                   href="mailto:support@association.com" 
//                   className="text-blue-600 hover:text-blue-700 font-medium transition-colors"
//                 >
//                   Contact Support
//                 </a>
//               </p>
//             </div>
//           </div>
//         </Content>

//         {/* Bottom Wave Decoration */}
//         <div className="absolute bottom-0 left-0 right-0">
//           <svg 
//             viewBox="0 0 1200 120" 
//             preserveAspectRatio="none" 
//             className="w-full h-16 text-white fill-current"
//           >
//             <path d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z" 
//                   opacity=".25" 
//                   className="shape-fill"
//             ></path>
//             <path d="M0,0V15.81C13,36.92,27.64,56.86,47.69,72.05,99.41,111.27,165,111,224.58,91.58c31.15-10.15,60.09-26.07,89.67-39.8,40.92-19,84.73-46,130.83-49.67,36.26-2.85,70.9,9.42,98.6,31.56,31.77,25.39,62.32,62,103.63,73,40.44,10.79,81.35-6.69,119.13-24.28s75.16-39,116.92-43.05c59.73-5.85,113.28,22.88,168.9,38.84,30.2,8.66,59,6.17,87.09-7.5,22.43-10.89,48-26.93,60.65-49.24V0Z" 
//                   opacity=".5" 
//                   className="shape-fill"
//             ></path>
//             <path d="M0,0V5.63C149.93,59,314.09,71.32,475.83,42.57c43-7.64,84.23-20.12,127.61-26.46,59-8.63,112.48,12.24,165.56,35.4C827.93,77.22,886,95.24,951.2,90c86.53-7,172.46-45.71,248.8-84.81V0Z" 
//                   className="shape-fill"
//             ></path>
//           </svg>
//         </div>
//       </Layout>

//       {/* Custom Styles for Animations */}
//       <style jsx>{`
//         @keyframes blob {
//           0% {
//             transform: translate(0px, 0px) scale(1);
//           }
//           33% {
//             transform: translate(30px, -50px) scale(1.1);
//           }
//           66% {
//             transform: translate(-20px, 20px) scale(0.9);
//           }
//           100% {
//             transform: translate(0px, 0px) scale(1);
//           }
//         }
//         .animate-blob {
//           animation: blob 7s infinite;
//         }
//         .animation-delay-2000 {
//           animation-delay: 2s;
//         }
//         .animation-delay-4000 {
//           animation-delay: 4s;
//         }
//       `}</style>
//     </ConfigProvider>
//   );
// };

// export default AuthLayout;




// import React from 'react';
// import { Layout, theme, ConfigProvider, Carousel } from 'antd';
// import { Outlet, Navigate } from 'react-router-dom';
// import { useSelector } from 'react-redux';

// const { Content } = Layout;

// const AuthLayout = () => {
//   const {
//     token: { colorBgContainer, colorBgLayout },
//   } = theme.useToken();

//   const user = useSelector((state) => state.user?.value);
//   const token = localStorage.getItem('token');

//   // If user is already authenticated, redirect to dashboard
//   if (token && user) {
//     return <Navigate to="/" replace />;
//   }

//   // Dynamic features data
//   const features = [
//         {
//       icon: '👥',
//       title: 'Member Management',
//       description: 'Efficiently manage association members and their details',
//       color: 'from-blue-500 to-blue-600'
//     },
//     {
//       icon: '💰',
//       title: 'Welfare Funds',
//       description: 'Track and manage welfare funds and donations',
//       color: 'from-green-500 to-green-600'
//     },
//     {
//       icon: '📊',
//       title: 'Activity Reports',
//       description: 'Generate comprehensive reports and analytics',
//       color: 'from-purple-500 to-purple-600'
//     },
//     {
//       icon: '🔐',
//       title: 'Role-based Access',
//       description: 'Secure access control for different user roles',
//       color: 'from-orange-500 to-orange-600'
//     }
//   ];

//   const testimonials = [
//         {
//       name: "Alamgir Hossain",
//       role: "Association President",
//       content: "This system has revolutionized how we manage our welfare activities and member services.",
//       avatar: "AH"
//     },
//     {
//       name: "Member Testimonial",
//       role: "Senior Member",
//       content: "Easy to use platform that keeps me connected with all association activities.",
//       avatar: "MT"
//     },
//     {
//       name: "Mike Chen",
//       role: "Treasurer",
//       content: "Real-time tracking and reporting made financial management so much easier.",
//       avatar: "MC"
//     }
//   ];

//   return (
//     <ConfigProvider
//       theme={{
//         token: {
//           colorPrimary: '#1890ff',
//           borderRadius: 12,
//           fontSize: 14,
//           // wireframe: false,
//         },
//         components: {
//           Layout: {
//             bodyBg: 'transparent',
//             headerBg: colorBgContainer,
//           },
//           Form: {
//             itemMarginBottom: 20,
//           },
//           Input: {
//             borderRadius: 8,
//             paddingBlock: 12,
//             paddingInline: 16,
//           },
//           Button: {
//             borderRadius: 8,
//             paddingBlock: 12,
//             fontSize: 14,
//           },
//         },
//       }}
//     >
//       <Layout className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
//         {/* Enhanced Background Animation */}
//         <div className="absolute inset-0 overflow-hidden">
//           <div className="absolute -top-40 -right-40 w-96 h-96 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-float"></div>
//           <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-float animation-delay-2000"></div>
//           <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-cyan-200 rounded-full mix-blend-multiply filter blur-3xl opacity-15 animate-float animation-delay-4000"></div>
          
//           {/* Grid Pattern */}
//           <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.1)_1px,transparent_1px)] bg-[size:64px_64px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_50%,black,transparent)]"></div>
//         </div>

//         {/* <Content className="relative z-10 flex items-center justify-center min-h-screen p-4 lg:p-8"> */}
//         <Content className="relative z-10 flex flex-col lg:flex-row items-stretch min-h-screen p-4 lg:p-10">
//           {/* Left Side - Enhanced Branding Section */}
//           <div className="hidden xl:flex xl:flex-1 xl:items-center xl:justify-center xl:pr-12">
//             <div className="max-w-2xl w-full">
//               {/* Logo & Header */}
//               <div className="text-center lg:text-left mb-12">
//                 <div className="flex items-center justify-center lg:justify-start space-x-4 mb-6">
//                   <div className="w-20 h-20 bg-gradient-to-r from-blue-600 to-purple-600 rounded-3xl flex items-center justify-center shadow-2xl shadow-blue-500/25">
//                     <span className="text-white text-3xl font-bold tracking-wider">AS</span>
//                   </div>
//                   <div>
//                     <h1 className="text-5xl font-bold text-gray-900 font-railway tracking-tight">
//                       Association
//                     </h1>
//                     <h1 className="text-5xl font-bold text-blue-600 font-railway tracking-tight">
//                       System
//                     </h1>
//                   </div>
//                 </div>
                
//                 <p className="text-xl text-gray-600 leading-relaxed max-w-2xl">
//                   Streamline your organization management with our comprehensive platform. 
//                   Manage members, employees, and operations efficiently with real-time insights.
//                 </p>
//               </div>

//               {/* Enhanced Features Grid */}
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
//                 {features.map((feature, index) => (
//                   <div 
//                     key={index}
//                     className="group bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-gray-100 hover:shadow-xl hover:scale-105 transition-all duration-300 hover:border-blue-200"
//                   >
//                     <div className={`w-14 h-14 bg-gradient-to-r ${feature.color} rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
//                       <span className="text-2xl">{feature.icon}</span>
//                     </div>
//                     <h3 className="text-lg font-semibold text-gray-900 mb-2">
//                       {feature.title}
//                     </h3>
//                     <p className="text-gray-600 text-sm leading-relaxed">
//                       {feature.description}
//                     </p>
//                   </div>
//                 ))}
//               </div>

//               {/* Enhanced Testimonials Carousel */}
//               <div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-xl border border-gray-100 overflow-hidden">
//                 <Carousel 
//                   autoplay 
//                   dots={{ className: "bottom-6" }}
//                   effect="fade"
//                   className="rounded-3xl"
//                 >
//                   {testimonials.map((testimonial, index) => (
//                     <div key={index} className="p-8">
//                       <div className="text-center">
//                         <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
//                           <span className="text-white font-bold text-lg">{testimonial.avatar}</span>
//                         </div>
//                         <p className="text-gray-700 text-lg italic leading-relaxed mb-6 px-4">
//                           "{testimonial.content}"
//                         </p>
//                         <div>
//                           <p className="font-semibold text-gray-900 text-lg">{testimonial.name}</p>
//                           <p className="text-gray-500 text-sm">{testimonial.role}</p>
//                         </div>
//                       </div>
//                     </div>
//                   ))}
//                 </Carousel>
//               </div>
//             </div>
//           </div>

//           {/* Right Side - Enhanced Auth Forms */}
//           <div className="flex-1 max-w-md w-full">
//             <div className="bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 overflow-hidden transform hover:scale-105 transition-transform duration-300">
//               {/* Enhanced Animated Header */}
//               <div className="relative overflow-hidden">
//                 <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 p-8 text-center">
//                   {/* Animated background elements */}
//                   <div className="absolute inset-0">
//                     <div className="absolute top-0 left-0 w-32 h-32 bg-white/10 rounded-full -translate-x-1/2 -translate-y-1/2"></div>
//                     <div className="absolute bottom-0 right-0 w-48 h-48 bg-white/5 rounded-full translate-x-1/3 translate-y-1/3"></div>
//                   </div>
                  
//                   <div className="relative z-10">
//                     <div className="w-20 h-20 bg-white/20 rounded-2xl flex items-center justify-center mx-auto mb-6 backdrop-blur-sm border border-white/30">
//                       <span className="text-white text-2xl font-bold tracking-wider">AS</span>
//                     </div>
//                     <h2 className="text-3xl font-bold text-white mb-3 font-railway tracking-tight">
//                       Welcome Back
//                     </h2>
//                     <p className="text-blue-100 text-lg opacity-90">
//                       Sign in to access your account
//                     </p>
//                   </div>
                  
//                   {/* Floating particles */}
//                   {[...Array(5)].map((_, i) => (
//                     <div
//                       key={i}
//                       className="absolute w-2 h-2 bg-white/40 rounded-full animate-float"
//                       style={{
//                         top: `${20 + i * 15}%`,
//                         left: `${10 + i * 20}%`,
//                         animationDelay: `${i * 0.5}s`,
//                       }}
//                     />
//                   ))}
//                 </div>
//               </div>

//               {/* Auth Content */}
//               <div className="p-8">
//                 <Outlet />
//               </div>

//               {/* Enhanced Footer */}
//               <div className="bg-gradient-to-r from-gray-50 to-gray-100 px-8 py-6 border-t border-gray-200/50">
//                 <div className="flex flex-col sm:flex-row items-center justify-between space-y-3 sm:space-y-0">
//                   <span className="text-sm text-gray-600 font-medium">
//                     © 2024 Association System
//                   </span>
//                   <div className="flex items-center space-x-6">
//                     {['Privacy', 'Terms', 'Help'].map((item) => (
//                       <a
//                         key={item}
//                         href={`/${item.toLowerCase()}`}
//                         className="text-sm text-gray-600 hover:text-blue-600 font-medium transition-colors duration-200"
//                       >
//                         {item}
//                       </a>
//                     ))}
//                   </div>
//                 </div>
//               </div>
//             </div>

//             {/* Enhanced Support Section */}
//             <div className="mt-8 text-center">
//               <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-gray-100">
//                 <h4 className="text-lg font-semibold text-gray-900 mb-3">
//                   Need Assistance?
//                 </h4>
//                 <p className="text-gray-600 mb-4">
//                   Our support team is here to help you get started
//                 </p>
//                 <a
//                   href="mailto:support@association.com"
//                   className="inline-flex items-center space-x-2 text-blue-600 hover:text-blue-700 font-semibold transition-colors duration-200 group"
//                 >
//                   <span>Contact Support</span>
//                   <span className="group-hover:translate-x-1 transition-transform duration-200">→</span>
//                 </a>
//               </div>
//             </div>
//           </div>
//         </Content>

//         {/* Enhanced Bottom Wave */}
//         <div className="absolute bottom-0 left-0 right-0 z-0">
//           <svg 
//             viewBox="0 0 1200 120" 
//             preserveAspectRatio="none" 
//             className="w-full h-20 text-white fill-current"
//           >
//             <path 
//               d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z" 
//               opacity=".25" 
//             />
//             <path 
//               d="M0,0V15.81C13,36.92,27.64,56.86,47.69,72.05,99.41,111.27,165,111,224.58,91.58c31.15-10.15,60.09-26.07,89.67-39.8,40.92-19,84.73-46,130.83-49.67,36.26-2.85,70.9,9.42,98.6,31.56,31.77,25.39,62.32,62,103.63,73,40.44,10.79,81.35-6.69,119.13-24.28s75.16-39,116.92-43.05c59.73-5.85,113.28,22.88,168.9,38.84,30.2,8.66,59,6.17,87.09-7.5,22.43-10.89,48-26.93,60.65-49.24V0Z" 
//               opacity=".5" 
//             />
//             <path 
//               d="M0,0V5.63C149.93,59,314.09,71.32,475.83,42.57c43-7.64,84.23-20.12,127.61-26.46,59-8.63,112.48,12.24,165.56,35.4C827.93,77.22,886,95.24,951.2,90c86.53-7,172.46-45.71,248.8-84.81V0Z" 
//             />
//           </svg>
//         </div>
//       </Layout>

//       {/* Enhanced Custom Styles */}
//       <style jsx>{`
//         @keyframes float {
//           0%, 100% {
//             transform: translateY(0px) rotate(0deg);
//           }
//           33% {
//             transform: translateY(-20px) rotate(120deg);
//           }
//           66% {
//             transform: translateY(10px) rotate(240deg);
//           }
//         }
//         @keyframes blob {
//           0% {
//             transform: translate(0px, 0px) scale(1);
//           }
//           33% {
//             transform: translate(30px, -50px) scale(1.1);
//           }
//           66% {
//             transform: translate(-20px, 20px) scale(0.9);
//           }
//           100% {
//             transform: translate(0px, 0px) scale(1);
//           }
//         }
//         .animate-float {
//           animation: float 6s ease-in-out infinite;
//         }
//         .animate-blob {
//           animation: blob 7s infinite;
//         }
//         .animation-delay-2000 {
//           animation-delay: 2s;
//         }
//         .animation-delay-4000 {
//           animation-delay: 4s;
//         }
//       `}</style>
//     </ConfigProvider>
//   );
// };

// export default AuthLayout;



////////////Final Version//////////////

// import React from 'react';
// import { Layout, theme, ConfigProvider, Carousel } from 'antd';
// import { Outlet, Navigate } from 'react-router-dom';
// import { useSelector } from 'react-redux';

// const { Content } = Layout;

// const AuthLayout = () => {
//   const {
//     token: { colorBgContainer },
//   } = theme.useToken();

//   const user = useSelector((state) => state.user?.value);
//   const token = localStorage.getItem('token');

//   if (token && user) {
//     return <Navigate to="/" replace />;
//   }

//   const features = [
//     {
//       icon: '👥',
//       title: 'Member Management',
//       description: 'Efficiently manage association members and their details',
//       color: 'from-blue-500 to-blue-600'
//     },
//     {
//       icon: '💰',
//       title: 'Welfare Funds',
//       description: 'Track and manage welfare funds and donations',
//       color: 'from-green-500 to-green-600'
//     },
//     {
//       icon: '📊',
//       title: 'Activity Reports',
//       description: 'Generate comprehensive reports and analytics',
//       color: 'from-purple-500 to-purple-600'
//     },
//     {
//       icon: '🔐',
//       title: 'Role-based Access',
//       description: 'Secure access control for different user roles',
//       color: 'from-orange-500 to-orange-600'
//     }
//   ];

//   const testimonials = [
//     {
//       name: "Alamgir Hossain",
//       role: "Association President",
//       content: "This system has revolutionized how we manage our welfare activities and member services.",
//       avatar: "AH"
//     },
//     {
//       name: "Member Testimonial",
//       role: "Senior Member",
//       content: "Easy to use platform that keeps me connected with all association activities.",
//       avatar: "MT"
//     }
//   ];

//   return (
//     <ConfigProvider
//       theme={{
//         token: {
//           colorPrimary: '#1890ff',
//           borderRadius: 12,
//           fontSize: 14,
//         },
//         components: {
//           Layout: {
//             bodyBg: 'transparent',
//             headerBg: colorBgContainer,
//           },
//         },
//       }}
//     >
//       <Layout className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
//         {/* Background Animation */}
//         <div className="absolute inset-0 overflow-hidden">
//           <div className="absolute -top-40 -right-40 w-96 h-96 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-float"></div>
//           <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-green-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-float animation-delay-2000"></div>
//         </div>

//         <Content className="relative z-10 flex items-center justify-center min-h-screen p-4 lg:p-8">
//           {/* Left Side - Branding Section */}
//           <div className="hidden xl:flex xl:flex-1 xl:items-center xl:justify-center xl:pr-12">
//             <div className="max-w-2xl w-full">
//               {/* Logo & Header */}
//               <div className="text-center lg:text-left mb-12">
//                 <div className="flex items-center justify-center lg:justify-start space-x-4 mb-6">
//                   <div className="w-20 h-20 bg-gradient-to-r from-green-600 to-blue-600 rounded-3xl flex items-center justify-center shadow-2xl shadow-green-500/25">
//                     <img 
//                       src="/api/placeholder/80/80" 
//                       alt="Alamgir Hossain City Kallan Samity"
//                       className="w-16 h-16 rounded-2xl object-cover"
//                       onError={(e) => {
//                         e.target.style.display = 'none';
//                         e.target.nextSibling.style.display = 'flex';
//                       }}
//                     />
//                     <div className="text-white text-xl font-bold tracking-wider hidden">AH</div>
//                   </div>
//                   <div>
//                     <h1 className="text-4xl font-bold text-gray-900 font-railway tracking-tight">
//                       Alamgir Hossain
//                     </h1>
//                     <h1 className="text-3xl font-bold text-green-600 font-railway tracking-tight">
//                       City Kallan Samity
//                     </h1>
//                     <p className="text-lg text-gray-600 mt-2">
//                       Welfare Association Management System
//                     </p>
//                   </div>
//                 </div>
//               </div>

//               {/* Features Grid */}
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
//                 {features.map((feature, index) => (
//                   <div 
//                     key={index}
//                     className="group bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300"
//                   >
//                     <div className={`w-14 h-14 bg-gradient-to-r ${feature.color} rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
//                       <span className="text-2xl">{feature.icon}</span>
//                     </div>
//                     <h3 className="text-lg font-semibold text-gray-900 mb-2">
//                       {feature.title}
//                     </h3>
//                     <p className="text-gray-600 text-sm leading-relaxed">
//                       {feature.description}
//                     </p>
//                   </div>
//                 ))}
//               </div>

//               {/* Testimonials */}
//               <div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-xl border border-gray-100 overflow-hidden">
//                 <Carousel autoplay dots={{ className: "bottom-6" }}>
//                   {testimonials.map((testimonial, index) => (
//                     <div key={index} className="p-8">
//                       <div className="text-center">
//                         <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-blue-500 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
//                           <span className="text-white font-bold text-lg">{testimonial.avatar}</span>
//                         </div>
//                         <p className="text-gray-700 text-lg italic leading-relaxed mb-6">
//                           "{testimonial.content}"
//                         </p>
//                         <div>
//                           <p className="font-semibold text-gray-900 text-lg">{testimonial.name}</p>
//                           <p className="text-gray-500 text-sm">{testimonial.role}</p>
//                         </div>
//                       </div>
//                     </div>
//                   ))}
//                 </Carousel>
//               </div>
//             </div>
//           </div>

//           {/* Right Side - Auth Forms */}
//           <div className="flex-1 max-w-md w-full">
//             <div className="bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 overflow-hidden">
//               <div className="bg-gradient-to-r from-green-600 to-blue-600 p-8 text-center">
//                 <div className="relative z-10">
//                   <div className="w-20 h-20 bg-white/20 rounded-2xl flex items-center justify-center mx-auto mb-6 backdrop-blur-sm border border-white/30">
//                     <span className="text-white text-2xl font-bold">AH</span>
//                   </div>
//                   <h2 className="text-3xl font-bold text-white mb-3">
//                     Welcome
//                   </h2>
//                   <p className="text-blue-100 text-lg opacity-90">
//                     Alamgir Hossain City Kallan Samity
//                   </p>
//                 </div>
//               </div>

//               <div className="p-8">
//                 <Outlet />
//               </div>

//               <div className="bg-gray-50 px-8 py-6 border-t border-gray-200">
//                 <div className="flex flex-col sm:flex-row items-center justify-between space-y-3 sm:space-y-0">
//                   <span className="text-sm text-gray-600">
//                     © 2024 Alamgir Hossain City Kallan Samity
//                   </span>
//                   <div className="flex items-center space-x-6">
//                     {['Privacy', 'Terms', 'Help'].map((item) => (
//                       <a
//                         key={item}
//                         href={`/${item.toLowerCase()}`}
//                         className="text-sm text-gray-600 hover:text-green-600 transition-colors"
//                       >
//                         {item}
//                       </a>
//                     ))}
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </Content>
//       </Layout>

//       <style jsx>{`
//         @keyframes float {
//           0%, 100% { transform: translateY(0px); }
//           50% { transform: translateY(-20px); }
//         }
//         .animate-float {
//           animation: float 6s ease-in-out infinite;
//         }
//         .animation-delay-2000 {
//           animation-delay: 2s;
//         }
//       `}</style>
//     </ConfigProvider>
//   );
// };

// export default AuthLayout;



// import React from 'react';
// import { Layout, theme, ConfigProvider, Carousel } from 'antd';
// import { Outlet, Navigate } from 'react-router-dom';
// import { useSelector } from 'react-redux';
// import logo from '../../assets/Ideal.png';

// const { Content } = Layout;

// const AuthLayout = () => {
//   const {
//     token: { colorBgContainer },
//   } = theme.useToken();

//   const user = useSelector((state) => state.user?.value);
//   const token = localStorage.getItem('token');

//   if (token && user) {
//     return <Navigate to="/" replace />;
//   }

//   const features = [
//     {
//       icon: '👥',
//       title: 'Member Management',
//       description: 'Efficiently manage association members and their details',
//       color: 'from-green-500 to-green-600'
//     },
//     {
//       icon: '💰',
//       title: 'Welfare Funds',
//       description: 'Track and manage welfare funds and donations',
//       color: 'from-blue-500 to-blue-600'
//     },
//     {
//       icon: '📊',
//       title: 'Activity Reports',
//       description: 'Generate comprehensive reports and analytics',
//       color: 'from-purple-500 to-purple-600'
//     },
//     {
//       icon: '🔐',
//       title: 'Role-based Access',
//       description: 'Secure access control for different user roles',
//       color: 'from-orange-500 to-orange-600'
//     }
//   ];

//   const testimonials = [
//     {
//       name: "Alamgir Hossain",
//       role: "Association President",
//       content: "This system has revolutionized how we manage our welfare activities and member services.",
//       avatar: "AH"
//     },
//     {
//       name: "Senior Member",
//       role: "Executive Committee",
//       content: "Easy to use platform that keeps me connected with all association activities.",
//       avatar: "SM"
//     },
//     {
//       name: "Treasurer",
//       role: "Finance Department",
//       content: "Real-time tracking and reporting made financial management so much easier.",
//       avatar: "TR"
//     }
//   ];

//   return (
//     <ConfigProvider
//       theme={{
//         token: {
//           colorPrimary: '#10b981',
//           borderRadius: 12,
//           fontSize: 14,
//         },
//         components: {
//           Layout: {
//             bodyBg: 'transparent',
//             headerBg: colorBgContainer,
//           },
//           Form: {
//             itemMarginBottom: 20,
//           },
//           Input: {
//             borderRadius: 8,
//             paddingBlock: 12,
//             paddingInline: 16,
//           },
//           Button: {
//             borderRadius: 8,
//             paddingBlock: 12,
//             fontSize: 14,
//           },
//         },
//       }}
//     >
//       <Layout className="min-h-screen bg-gradient-to-br from-green-50 via-white to-blue-50">
//         {/* Enhanced Background Animation */}
//         <div className="absolute inset-0 overflow-hidden">
//           <div className="absolute -top-40 -right-40 w-96 h-96 bg-green-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-float"></div>
//           <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-float animation-delay-2000"></div>
//           <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-emerald-200 rounded-full mix-blend-multiply filter blur-3xl opacity-15 animate-float animation-delay-4000"></div>
          
//           {/* Grid Pattern */}
//           <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.1)_1px,transparent_1px)] bg-[size:64px_64px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_50%,black,transparent)]"></div>
//         </div>

//         <Content className="relative z-10 flex flex-col lg:flex-row items-stretch min-h-screen p-4 lg:p-10">
//         {/* <Content className="relative z-10 flex flex-col lg:flex-row items-stretch h-screen overflow-hidden"> */}
//           {/* Left Side - Enhanced Branding Section */}
//           <div className="hidden lg:flex lg:flex-1 lg:items-center lg:justify-center lg:pr-8 xl:pr-12">
//           {/* <div className="hidden lg:flex lg:flex-1 lg:items-center lg:justify-center p-8"> */}
//             <div className="max-w-3xl w-full">
//               {/* Logo & Header */}
//               <div className="text-center lg:text-left mb-12">
//                 <div className="flex items-center justify-center lg:justify-start space-x-4 mb-6">
//                   <div className="w-20 h-20 bg-gradient-to-r from-green-600 to-blue-600 rounded-3xl flex items-center
//                    justify-center shadow-2xl shadow-green-500/25 border-4 border-white">
//                     <div className="text-white text-center">
//                       {/* <div className="text-xl font-bold leading-tight">AH</div>
//                       <div className="text-xs font-medium opacity-90">CKS</div> */}
//                       <img 
//                         src={logo} 
//                         alt="Alamgir Hossain City Kallan Samity"
//                         className="w-16 h-16 rounded-2xl object-cover inset-0 m-auto"
//                         onError={(e) => {
//                           e.target.style.display = 'none';
//                         }}
//                       />
//                     </div>
//                   </div>
//                   <div>
//                     <h1 className="text-4xl lg:text-3xl font-bold text-gray-900 font-railway tracking-tight">
//                       Alamgir Hossain  <span className="text-3xl lg:text-3xl font-bold text-green-600 font-railway tracking-tight">
//                       City Kallan Samity
//                     </span>
//                     </h1>
                    
//                     <p className="text-lg text-gray-600 mt-2 font-light">
//                       Welfare Association Management System
//                     </p>
//                   </div>
//                 </div>
                
//                 <p className="text-lg text-gray-600 leading-relaxed max-w-2xl">
//                   Streamline your welfare association management with our comprehensive platform. 
//                   Manage members, funds, and community activities efficiently with real-time insights.
//                 </p>
//               </div>

//               {/* Enhanced Features Grid */}
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
//                 {features.map((feature, index) => (
//                   <div 
//                     key={index}
//                     className="group bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-gray-100 hover:shadow-xl hover:scale-105 transition-all duration-300 hover:border-green-200"
//                   >
//                     <div className={`w-14 h-14 bg-gradient-to-r ${feature.color} rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
//                       <span className="text-2xl">{feature.icon}</span>
//                     </div>
//                     <h3 className="text-lg font-semibold text-gray-900 mb-2">
//                       {feature.title}
//                     </h3>
//                     <p className="text-gray-600 text-sm leading-relaxed">
//                       {feature.description}
//                     </p>
//                   </div>
//                 ))}
//               </div>

//               {/* Enhanced Testimonials Carousel */}
//               <div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-xl border border-gray-100 overflow-hidden">
//                 <Carousel 
//                   autoplay 
//                   dots={{ className: "bottom-6" }}
//                   effect="fade"
//                   className="rounded-3xl"
//                 >
//                   {testimonials.map((testimonial, index) => (
//                     <div key={index} className="p-8">
//                       <div className="text-center">
//                         <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-blue-500 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
//                           <span className="text-white font-bold text-lg">{testimonial.avatar}</span>
//                         </div>
//                         <p className="text-gray-700 text-lg italic leading-relaxed mb-6 px-4">
//                           "{testimonial.content}"
//                         </p>
//                         <div>
//                           <p className="font-semibold text-gray-900 text-lg">{testimonial.name}</p>
//                           <p className="text-gray-500 text-sm">{testimonial.role}</p>
//                         </div>
//                       </div>
//                     </div>
//                   ))}
//                 </Carousel>
//               </div>
//             </div>
//           </div>

//           {/* Right Side - Enhanced Auth Forms */}
//           <div className="flex-1 max-w-md w-full mx-auto lg:mx-0">
//             <div className="bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 overflow-hidden transform hover:scale-105 transition-transform duration-300">
//               {/* Enhanced Animated Header */}
//               <div className="relative overflow-hidden">
//                 <div className="bg-gradient-to-r from-green-600 via-blue-600 to-emerald-600 p-8 text-center">
//                   {/* Animated background elements */}
//                   <div className="absolute inset-0">
//                     <div className="absolute top-0 left-0 w-32 h-32 bg-white/10 rounded-full -translate-x-1/2 -translate-y-1/2"></div>
//                     <div className="absolute bottom-0 right-0 w-48 h-48 bg-white/5 rounded-full translate-x-1/3 translate-y-1/3"></div>
//                   </div>
                  
//                   <div className="relative z-10">
//                     <div className="w-20 h-20 bg-white/20 rounded-2xl flex items-center justify-center mx-auto mb-6 backdrop-blur-sm border border-white/30">
//                       <div className="text-white text-center">
//                         <div className="text-xl font-bold leading-tight">AH</div>
//                         <div className="text-xs font-medium opacity-90">CKS</div>
//                       </div>
//                     </div>
//                     <h2 className="text-3xl font-bold text-white mb-3 font-railway tracking-tight">
//                       Welcome Back
//                     </h2>
//                     <p className="text-blue-100 text-lg opacity-90">
//                       Sign in to your association account
//                     </p>
//                   </div>
                  
//                   {/* Floating particles */}
//                   {[...Array(5)].map((_, i) => (
//                     <div
//                       key={i}
//                       className="absolute w-2 h-2 bg-white/40 rounded-full animate-float"
//                       style={{
//                         top: `${20 + i * 15}%`,
//                         left: `${10 + i * 20}%`,
//                         animationDelay: `${i * 0.5}s`,
//                       }}
//                     />
//                   ))}
//                 </div>
//               </div>

//               {/* Auth Content */}
//               <div className="p-8">
//                 <Outlet />
//               </div>

//               {/* Enhanced Footer */}
//               <div className="bg-gradient-to-r from-gray-50 to-gray-100 px-8 py-6 border-t border-gray-200/50">
//                 <div className="flex flex-col sm:flex-row items-center justify-between space-y-3 sm:space-y-0">
//                   <span className="text-sm text-gray-600 font-medium">
//                     © 2025 Alamgir Hossain City Kallan Samity
//                   </span>
//                   <div className="flex items-center space-x-6">
//                     {['Privacy', 'Terms', 'Help'].map((item) => (
//                       <a
//                         key={item}
//                         href={`/${item.toLowerCase()}`}
//                         className="text-sm text-gray-600 hover:text-green-600 font-medium transition-colors duration-200"
//                       >
//                         {item}
//                       </a>
//                     ))}
//                   </div>
//                 </div>
//               </div>
//             </div>

//             {/* Enhanced Support Section */}
//             <div className="mt-8 text-center">
//               <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-gray-100">
//                 <h4 className="text-lg font-semibold text-gray-900 mb-3">
//                   Need Assistance?
//                 </h4>
//                 <p className="text-gray-600 mb-4">
//                   Our association support team is here to help you
//                 </p>
//                 <a
//                   href="mailto:support@alamgirhossain.org"
//                   className="inline-flex items-center space-x-2 text-green-600 hover:text-green-700 font-semibold transition-colors duration-200 group"
//                 >
//                   <span>Contact Association Support</span>
//                   <span className="group-hover:translate-x-1 transition-transform duration-200">→</span>
//                 </a>
//               </div>
//             </div>

     
//           </div>
//         </Content>

//         {/* Enhanced Bottom Wave */}
//         <div className="absolute bottom-0 left-0 right-0 z-0">
//           <svg 
//             viewBox="0 0 1200 120" 
//             preserveAspectRatio="none" 
//             className="w-full h-20 text-white fill-current"
//           >
//             <path 
//               d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z" 
//               opacity=".25" 
//             />
//             <path 
//               d="M0,0V15.81C13,36.92,27.64,56.86,47.69,72.05,99.41,111.27,165,111,224.58,91.58c31.15-10.15,60.09-26.07,89.67-39.8,40.92-19,84.73-46,130.83-49.67,36.26-2.85,70.9,9.42,98.6,31.56,31.77,25.39,62.32,62,103.63,73,40.44,10.79,81.35-6.69,119.13-24.28s75.16-39,116.92-43.05c59.73-5.85,113.28,22.88,168.9,38.84,30.2,8.66,59,6.17,87.09-7.5,22.43-10.89,48-26.93,60.65-49.24V0Z" 
//               opacity=".5" 
//             />
//             <path 
//               d="M0,0V5.63C149.93,59,314.09,71.32,475.83,42.57c43-7.64,84.23-20.12,127.61-26.46,59-8.63,112.48,12.24,165.56,35.4C827.93,77.22,886,95.24,951.2,90c86.53-7,172.46-45.71,248.8-84.81V0Z" 
//             />
//           </svg>
//         </div>
//       </Layout>

//       {/* Enhanced Custom Styles */}
//       {/* <style jsx>{`
//          @keyframes float {
//     0%, 100% {
//       transform: translateY(0px) rotate(0deg);
//     }
//     33% {
//       transform: translateY(-20px) rotate(120deg);
//     }
//     66% {
//       transform: translateY(10px) rotate(240deg);
//     }
//   }
//   .animate-float {
//     animation: float 6s ease-in-out infinite;
//   }
//   .animation-delay-2000 {
//     animation-delay: 2s;
//   }
//   .animation-delay-4000 {
//     animation-delay: 4s;
//   }
//       `}</style> */}
//     </ConfigProvider>
//   );
// };

// export default AuthLayout;




import React from 'react';
import { Layout, theme, ConfigProvider, Carousel } from 'antd';
import { Outlet, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import logo from '../../assets/Ideal.png';
import './authLayout.css'; // Import the CSS file

const { Content } = Layout;

const AuthLayout = () => {
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const user = useSelector((state) => state.user?.value);
  const token = localStorage.getItem('token');

  if (token && user) {
    return <Navigate to="/" replace />;
  }

  const features = [
    {
      icon: '👥',
      title: 'Member Management',
      description: 'Efficiently manage association members and their details',
      color: 'from-green-500 to-green-600'
    },
    {
      icon: '💰',
      title: 'Welfare Funds',
      description: 'Track and manage welfare funds and donations',
      color: 'from-blue-500 to-blue-600'
    },
    {
      icon: '📊',
      title: 'Activity Reports',
      description: 'Generate comprehensive reports and analytics',
      color: 'from-purple-500 to-purple-600'
    },
    {
      icon: '🔐',
      title: 'Role-based Access',
      description: 'Secure access control for different user roles',
      color: 'from-orange-500 to-orange-600'
    }
  ];

  const testimonials = [
    {
      name: "Alamgir Hossain",
      role: "Association President",
      content: "This system has revolutionized how we manage our welfare activities and member services.",
      avatar: "AH"
    },
    {
      name: "Senior Member",
      role: "Executive Committee",
      content: "Easy to use platform that keeps me connected with all association activities.",
      avatar: "SM"
    },
    {
      name: "Treasurer",
      role: "Finance Department",
      content: "Real-time tracking and reporting made financial management so much easier.",
      avatar: "TR"
    }
  ];

  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: '#10b981',
          borderRadius: 12,
          fontSize: 14,
        },
        components: {
          Layout: {
            bodyBg: 'transparent',
            headerBg: colorBgContainer,
          },
          Form: {
            itemMarginBottom: 20,
          },
          Input: {
            borderRadius: 8,
            paddingBlock: 12,
            paddingInline: 16,
          },
          Button: {
            borderRadius: 8,
            paddingBlock: 12,
            fontSize: 14,
          },
        },
      }}
    >
      <Layout className="min-h-screen bg-gradient-to-br from-green-50 via-white to-blue-50 auth-layout">
        {/* Enhanced Background Animation */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-96 h-96 bg-green-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-float"></div>
          <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-float animation-delay-2000"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-emerald-200 rounded-full mix-blend-multiply filter blur-3xl opacity-15 animate-float animation-delay-4000"></div>
          
          {/* Grid Pattern */}
          <div className="absolute inset-0 bg-grid-pattern"></div>
        </div>

        <Content className="relative z-10 flex flex-col lg:flex-row items-stretch min-h-screen p-4 lg:p-10">
          {/* Left Side - Enhanced Branding Section */}
          <div className="hidden lg:flex lg:flex-1 lg:items-center lg:justify-center lg:pr-8 xl:pr-12">
            <div className="max-w-3xl w-full">
              {/* Logo & Header */}
              <div className="text-center lg:text-left mb-12">
                <div className="flex items-center justify-center lg:justify-start space-x-4 mb-6">
                  <div className="w-20 h-20 bg-gradient-to-r from-green-600 to-blue-600 rounded-3xl flex items-center justify-center shadow-2xl shadow-green-500/25 border-4 border-white">
                    <div className="text-white text-center">
                      <img 
                        src={logo} 
                        alt="Alamgir Hossain City Kallan Samity"
                        className="w-16 h-16 rounded-2xl object-cover inset-0 m-auto"
                        onError={(e) => {
                          e.target.style.display = 'none';
                        }}
                      />
                    </div>
                  </div>
                  <div>
                    <h1 className="text-4xl lg:text-3xl font-bold text-gray-900 font-railway tracking-tight">
                      Alamgir Hossain  <span className="text-3xl lg:text-3xl font-bold text-green-600 font-railway tracking-tight">
                      City Kallan Samity
                    </span>
                    </h1>
                    
                    <p className="text-lg text-gray-600 mt-2 font-light">
                      Welfare Association Management System
                    </p>
                  </div>
                </div>
                
                <p className="text-lg text-gray-600 leading-relaxed max-w-2xl">
                  Streamline your welfare association management with our comprehensive platform. 
                  Manage members, funds, and community activities efficiently with real-time insights.
                </p>
              </div>

              {/* Enhanced Features Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
                {features.map((feature, index) => (
                  <div 
                    key={index}
                    className="group bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-gray-100 hover:shadow-xl hover:scale-105 transition-all duration-300 hover:border-green-200"
                  >
                    <div className={`w-14 h-14 bg-gradient-to-r ${feature.color} rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                      <span className="text-2xl">{feature.icon}</span>
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      {feature.title}
                    </h3>
                    <p className="text-gray-600 text-sm leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                ))}
              </div>

              {/* Enhanced Testimonials Carousel */}
              <div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-xl border border-gray-100 overflow-hidden">
                <Carousel 
                  autoplay 
                  dots={{ className: "bottom-6" }}
                  effect="fade"
                  className="rounded-3xl"
                >
                  {testimonials.map((testimonial, index) => (
                    <div key={index} className="p-8">
                      <div className="text-center">
                        <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-blue-500 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
                          <span className="text-white font-bold text-lg">{testimonial.avatar}</span>
                        </div>
                        <p className="text-gray-700 text-lg italic leading-relaxed mb-6 px-4">
                          "{testimonial.content}"
                        </p>
                        <div>
                          <p className="font-semibold text-gray-900 text-lg">{testimonial.name}</p>
                          <p className="text-gray-500 text-sm">{testimonial.role}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </Carousel>
              </div>
            </div>
          </div>

          {/* Right Side - Enhanced Auth Forms */}
          <div className="flex-1 max-w-md w-full mx-auto lg:mx-0">
            <div className="bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 overflow-hidden transform hover:scale-105 transition-transform duration-300">
              {/* Enhanced Animated Header */}
              <div className="relative overflow-hidden">
                <div className="bg-gradient-to-r from-green-600 via-blue-600 to-emerald-600 p-8 text-center">
                  {/* Animated background elements */}
                  <div className="absolute inset-0">
                    <div className="absolute top-0 left-0 w-32 h-32 bg-white/10 rounded-full -translate-x-1/2 -translate-y-1/2"></div>
                    <div className="absolute bottom-0 right-0 w-48 h-48 bg-white/5 rounded-full translate-x-1/3 translate-y-1/3"></div>
                  </div>
                  
                  <div className="relative z-10">
                    <div className="w-20 h-20 bg-white/20 rounded-2xl flex items-center justify-center mx-auto mb-6 backdrop-blur-sm border border-white/30">
                      <div className="text-white text-center">
                        <div className="text-xl font-bold leading-tight">AH</div>
                        <div className="text-xs font-medium opacity-90">CKS</div>
                      </div>
                    </div>
                    <h2 className="text-3xl font-bold text-white mb-3 font-railway tracking-tight">
                      Welcome Back
                    </h2>
                    <p className="text-blue-100 text-lg opacity-90">
                      Sign in to your association account
                    </p>
                  </div>
                  
                  {/* Floating particles */}
                  {[...Array(5)].map((_, i) => (
                    <div
                      key={i}
                      className="absolute w-2 h-2 bg-white/40 rounded-full animate-float"
                      style={{
                        top: `${20 + i * 15}%`,
                        left: `${10 + i * 20}%`,
                        animationDelay: `${i * 0.5}s`,
                      }}
                    />
                  ))}
                </div>
              </div>

              {/* Auth Content */}
              <div className="p-8">
                <Outlet />
              </div>

              {/* Enhanced Footer */}
              <div className="bg-gradient-to-r from-gray-50 to-gray-100 px-8 py-6 border-t border-gray-200/50">
                <div className="flex flex-col sm:flex-row items-center justify-between space-y-3 sm:space-y-0">
                  <span className="text-sm text-gray-600 font-medium">
                    © 2025 Alamgir Hossain City Kallan Samity
                  </span>
                  <div className="flex items-center space-x-6">
                    {['Privacy', 'Terms', 'Help'].map((item) => (
                      <a
                        key={item}
                        href={`/${item.toLowerCase()}`}
                        className="text-sm text-gray-600 hover:text-green-600 font-medium transition-colors duration-200"
                      >
                        {item}
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Enhanced Support Section */}
            <div className="mt-8 text-center">
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-gray-100">
                <h4 className="text-lg font-semibold text-gray-900 mb-3">
                  Need Assistance?
                </h4>
                <p className="text-gray-600 mb-4">
                  Our association support team is here to help you
                </p>
                <a
                  href="mailto:support@alamgirhossain.org"
                  className="inline-flex items-center space-x-2 text-green-600 hover:text-green-700 font-semibold transition-colors duration-200 group"
                >
                  <span>Contact Association Support</span>
                  <span className="group-hover:translate-x-1 transition-transform duration-200">→</span>
                </a>
              </div>
            </div>
          </div>
        </Content>

        {/* Enhanced Bottom Wave */}
        <div className="absolute bottom-0 left-0 right-0 z-0">
          <svg 
            viewBox="0 0 1200 120" 
            preserveAspectRatio="none" 
            className="w-full h-20 text-white fill-current"
          >
            <path 
              d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z" 
              opacity=".25" 
            />
            <path 
              d="M0,0V15.81C13,36.92,27.64,56.86,47.69,72.05,99.41,111.27,165,111,224.58,91.58c31.15-10.15,60.09-26.07,89.67-39.8,40.92-19,84.73-46,130.83-49.67,36.26-2.85,70.9,9.42,98.6,31.56,31.77,25.39,62.32,62,103.63,73,40.44,10.79,81.35-6.69,119.13-24.28s75.16-39,116.92-43.05c59.73-5.85,113.28,22.88,168.9,38.84,30.2,8.66,59,6.17,87.09-7.5,22.43-10.89,48-26.93,60.65-49.24V0Z" 
              opacity=".5" 
            />
            <path 
              d="M0,0V5.63C149.93,59,314.09,71.32,475.83,42.57c43-7.64,84.23-20.12,127.61-26.46,59-8.63,112.48,12.24,165.56,35.4C827.93,77.22,886,95.24,951.2,90c86.53-7,172.46-45.71,248.8-84.81V0Z" 
            />
          </svg>
        </div>
      </Layout>
    </ConfigProvider>
  );
};

export default AuthLayout;





