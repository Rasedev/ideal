// /////////////////////////FINAL//////////////////////////

// import React, { useState, useEffect } from 'react';
// import { useSelector, useDispatch } from 'react-redux';
// import {
//   Drawer, Button, Space, Typography, Alert, Spin
// } from 'antd';
// import { fetchAssociation, resetAssociationError } from '../Slices/associationSlice';
// import {
//   PhoneOutlined,
//   MailOutlined,
//   ClockCircleOutlined,
//   MenuOutlined,
//   CloseOutlined,
//   EnvironmentOutlined,
//   ReloadOutlined
// } from '@ant-design/icons';

// const { Text } = Typography;

// const Header = () => {
//   const dispatch = useDispatch();
//   const { data: association, loading, error } = useSelector((state) => state.association);
//   const [isScrolled, setIsScrolled] = useState(false);
//   const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
//   const [activeMenu, setActiveMenu] = useState('home');

//   // Fetch association data on component mount
//   useEffect(() => {
//     dispatch(fetchAssociation());
//   }, [dispatch]);

//   // Handle scroll effect with throttle
//   useEffect(() => {
//     let ticking = false;

//     const handleScroll = () => {
//       if (!ticking) {
//         requestAnimationFrame(() => {
//           setIsScrolled(window.scrollY > 50);
//           ticking = false;
//         });
//         ticking = true;
//       }
//     };

//     window.addEventListener('scroll', handleScroll, { passive: true });
//     return () => window.removeEventListener('scroll', handleScroll);
//   }, []);

//   // Retry fetching association data
//   const handleRetry = () => {
//     dispatch(resetAssociationError());
//     dispatch(fetchAssociation());
//   };

//   // Contact information configuration
//   const contactInfo = [
//     {
//       icon: <EnvironmentOutlined className="text-blue-400 text-lg" />,
//       text: association?.associationAddress || '24, Lane street',
//       subText: 'New York, USA'
//     },
//     {
//       icon: <ClockCircleOutlined className="text-blue-400 text-lg" />,
//       text: association?.officeHours || '9am - 8pm',
//       subText: 'Mon - Sat'
//     },
//     {
//       icon: <MailOutlined className="text-blue-400 text-lg" />,
//       text: association?.contactEmail || 'info@company.com',
//       subText: 'Email Us'
//     },
//     {
//       icon: <PhoneOutlined className="text-blue-400 text-lg" />,
//       text: association?.contactPhone || '+021-483-893',
//       subText: '24/7 Support'
//     }
//   ];

//   // Navigation items
//   const navigationItems = ['HOME', 'SHOP', 'NEWS', 'PAGES', 'OUR WORK', 'CONTACT US'];

//   // Error state
//   if (error && !association) {
//     return (
//       <header className="w-full bg-white">
//         <div className="max-w-7xl mx-auto px-4 py-4">
//           <Alert
//             message="Failed to Load Association Data"
//             description={error}
//             type="error"
//             action={
//               <Button size="small" onClick={handleRetry} icon={<ReloadOutlined />}>
//                 Retry
//               </Button>
//             }
//             closable
//             onClose={() => dispatch(resetAssociationError())}
//           />
//         </div>
//       </header>
//     );
//   }

//   // Loading state
//   if (loading && !association) {
//     return (
//       <header className="w-full bg-white">
//         <div className="max-w-7xl mx-auto px-4 py-8">
//           <div className="flex justify-center items-center">
//             <Space direction="vertical" align="center" size="middle">
//               <Spin size="large" />
//               <Text type="secondary">Loading association data...</Text>
//             </Space>
//           </div>
//         </div>
//       </header>
//     );
//   }

//   return (
//     <header className="w-full bg-white font-sans sticky top-0 z-50">
//       {/* Top Bar - SPLIT BACKGROUND: White Left, Dark Right */}
//      {/* Top Bar - Hides on scroll with smooth transition */}
//       <div className={`relative bg-white overflow-hidden transition-all duration-300 ease-in-out ${
//         isScrolled ? 'max-h-0 opacity-0' : 'max-h-20 opacity-100'
//       }`}>
//         {/* Split background effect */}
//         <div className="absolute inset-0 flex">
//           <div className="w-2/5 bg-white"></div>
//           <div className="w-3/5 bg-[#1f1f1f]"></div>
//         </div>

//         {/* Inner container to maintain height when visible */}
//         <div className="relative max-w-7xl mx-auto h-20">
//           <div className="flex items-center h-full">
//             {/* Left Side - White Background */}
//             <div className="w-2/5 h-full flex items-center pl-4 lg:pl-8 pr-4">
//               <div className="flex items-center justify-between w-full">
//                 {/* Company Name */}
//                 <h1 className="text-xl lg:text-2xl font-bold text-gray-900 tracking-tight">
//                   {association?.associationName || "Consulta"}
//                 </h1>

//                 {/* Business Tag */}
//                 <span className="hidden sm:inline-block text-sm font-medium text-gray-600 bg-gray-100 px-3 py-1 rounded border border-gray-200">
//                   Business, Finance
//                 </span>
//               </div>
//             </div>

//             {/* Right Side - Dark Background */}
//             <div className="w-3/5 h-full flex items-center pr-4 lg:pr-8 pl-4">
//               <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6 xl:gap-8 w-full">
//                 {contactInfo.map((item, index) => (
//                   <div key={index} className="flex items-center gap-2 lg:gap-3">
//                     {item.icon}
//                     <div className="text-white min-w-0">
//                       <div className="font-medium text-xs lg:text-sm truncate">
//                         {item.text}
//                       </div>
//                       <div className="text-gray-400 text-xs truncate">
//                         {item.subText}
//                       </div>
//                   </div>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Navigation Bar - Full White Background */}
//       <nav className={`bg-white border-b border-gray-200 transition-all duration-300 ${
//         isScrolled ? 'py-2 shadow-lg' : 'py-4'
//       }`}>
//         <div className="max-w-7xl mx-auto px-4">
//           <div className="flex items-center justify-between">
//             {/* Left Side - Empty space for balance (40%) */}
//             <div className="w-2/5 hidden lg:block"></div>

//             {/* Center - Desktop Navigation */}
//             <div className="hidden lg:flex items-center space-x-4 xl:space-x-8">
//               {navigationItems.map((item) => (
//                 <button
//                   key={item}
//                   onClick={() => setActiveMenu(item.toLowerCase().replace(' ', '-'))}
//                   className={`text-sm font-medium transition-all duration-200 px-2 py-1 rounded ${
//                     activeMenu === item.toLowerCase().replace(' ', '-')
//                       ? 'text-blue-600 font-semibold bg-blue-50'
//                       : 'text-gray-700 hover:text-blue-600 hover:bg-gray-50'
//                   }`}
//                 >
//                   {item}
//                 </button>
//               ))}
//             </div>

//             {/* Right Side - CTA Button */}
//             <div className="flex items-center flex-1 lg:flex-initial justify-end">
//               <Button
//                 type="primary"
//                 className="bg-blue-600 hover:bg-blue-700 border-none font-semibold px-4 lg:px-6 py-2 text-sm rounded-lg transition-all duration-300 shadow hover:shadow-md"
//                 size="middle"
//               >
//                 GET A FREE QUOTE
//               </Button>

//               {/* Mobile Menu Button */}
//               <button
//                 className="lg:hidden p-2 text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all duration-200 ml-2"
//                 onClick={() => setMobileMenuOpen(true)}
//                 aria-label="Open menu"
//               >
//                 <MenuOutlined className="text-xl" />
//               </button>
//             </div>
//           </div>
//         </div>
//       </nav>

//       {/* Mobile Drawer */}
//       <Drawer
//         title={
//           <div className="flex items-center justify-between border-b pb-4">
//             <div className="flex-1">
//               <div className="text-xl font-bold text-gray-800">
//                 {association?.associationName || "Consulta"}
//               </div>
//               <div className="text-sm text-gray-600">Business, Finance</div>
//             </div>
//             <button
//               onClick={() => setMobileMenuOpen(false)}
//               className="p-2 hover:bg-gray-100 rounded transition-colors"
//               aria-label="Close menu"
//             >
//               <CloseOutlined className="text-gray-600" />
//             </button>
//           </div>
//         }
//         placement="right"
//         onClose={() => setMobileMenuOpen(false)}
//         open={mobileMenuOpen}
//         width={320}
//         className="lg:hidden"
//         styles={{
//           body: { padding: 0 }
//         }}
//       >
//         <div className="flex flex-col h-full">
//           {/* Mobile Menu Items */}
//           <div className="flex-1 py-4">
//             <div className="space-y-1 px-4">
//               {navigationItems.map((item) => (
//                 <button
//                   key={item}
//                   onClick={() => {
//                     setActiveMenu(item.toLowerCase().replace(' ', '-'));
//                     setMobileMenuOpen(false);
//                   }}
//                   className={`w-full text-left px-4 py-3 rounded-lg transition-colors duration-200 font-medium ${
//                     activeMenu === item.toLowerCase().replace(' ', '-')
//                       ? 'bg-blue-50 text-blue-600 border border-blue-200'
//                       : 'text-gray-700 hover:bg-gray-50 border border-transparent'
//                   }`}
//                 >
//                   {item}
//                 </button>
//               ))}
//             </div>
//           </div>

//           {/* Mobile Contact Info & CTA */}
//           <div className="p-4 border-t space-y-4 bg-gray-50">
//             <div className="space-y-3">
//               <h4 className="font-semibold text-gray-800 text-sm">Contact Info</h4>
//               {contactInfo.map((item, index) => (
//                 <div key={index} className="flex items-center gap-3 p-2 bg-white rounded-lg border border-gray-200">
//                   <span className="text-blue-600 text-lg flex-shrink-0">
//                     {item.icon}
//                   </span>
//                   <div className="min-w-0 flex-1">
//                     <div className="font-medium text-gray-800 text-sm truncate">
//                       {item.text}
//                     </div>
//                     <div className="text-xs text-gray-600 truncate">
//                       {item.subText}
//                     </div>
//                   </div>
//                 </div>
//               ))}
//             </div>

//             {/* Mobile CTA Button */}
//             <Button
//               type="primary"
//               size="large"
//               className="w-full bg-blue-600 hover:bg-blue-700 border-none font-semibold py-3 rounded-lg transition-all duration-300"
//               onClick={() => setMobileMenuOpen(false)}
//             >
//               GET FREE QUOTE
//             </Button>
//           </div>
//         </div>
//       </Drawer>
//     </header>
//   );
// };

// export default Header;

// import React, { useState, useEffect, useRef } from "react";
// import { useSelector, useDispatch } from "react-redux";
// import { Drawer,  Space, Typography, Alert, Spin, Avatar } from "antd";
// import {
//   fetchAssociation,
//   resetAssociationError,
// } from "../Slices/associationSlice";
// import Button from './../Button/Button';
// import {
//   PhoneOutlined,
//   MailOutlined,
//   ClockCircleOutlined,
//   MenuOutlined,
//   CloseOutlined,
//   EnvironmentOutlined,
//   ReloadOutlined,
// } from "@ant-design/icons";

// const { Text, Title } = Typography;

// const Header = () => {
//   const dispatch = useDispatch();
//   const {
//     data: association,
//     loading,
//     error,
//   } = useSelector((state) => state.association);

//   const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
//   const [activeMenu, setActiveMenu] = useState("home");
//   const [topSectionVisible, setTopSectionVisible] = useState(true);
//   const [lastScrollY, setLastScrollY] = useState(0);

//   const headerRef = useRef(null);

//   // Fetch association data on component mount
//   useEffect(() => {
//     dispatch(fetchAssociation());
//   }, [dispatch]);

//   // Handle scroll effect
//   useEffect(() => {
//     let ticking = false;

//     const handleScroll = () => {
//       if (!ticking) {
//         requestAnimationFrame(() => {
//           const currentScrollY = window.scrollY;

//           if (currentScrollY > lastScrollY && currentScrollY > 100) {
//             setTopSectionVisible(false);
//           } else if (currentScrollY < lastScrollY) {
//             setTopSectionVisible(true);
//           }

//           setLastScrollY(currentScrollY);
//           ticking = false;
//         });
//         ticking = true;
//       }
//     };

//     window.addEventListener("scroll", handleScroll, { passive: true });
//     return () => window.removeEventListener("scroll", handleScroll);
//   }, [lastScrollY]);

//   // Retry fetching association data
//   const handleRetry = () => {
//     dispatch(resetAssociationError());
//     dispatch(fetchAssociation());
//   };

//   // Format phone numbers for display
//   const formatPhoneNumbers = (phones) => {
//     if (!phones || !Array.isArray(phones)) return "Not Available";
//     return phones.join(" | ");
//   };

//   // Contact information configuration - FIXED FIELD MAPPINGS
//   const contactInfo = [
//     {
//       icon: <EnvironmentOutlined />,
//       text: association?.headOffice || association?.associationAddress || "Address not set",
//       subText: "Head Office",
//       key: "address",
//     },
//     {
//       icon: <ClockCircleOutlined />,
//       text: association?.officeHours || "9:00 AM - 5:00 PM",
//       subText: "Office Hours",
//       key: "hours",
//     },
//     {
//       icon: <MailOutlined />,
//       text: association?.contactEmail || "email@example.com",
//         subText: formatPhoneNumbers(association?.contactPhone),
//       // subText: "Send Email",
//       key: "email",
//     },

//     // {
//     //   icon: <PhoneOutlined />,
//     //   text: formatPhoneNumbers(association?.contactPhone),
//     //   subText: "Call Us",
//     //   key: "phone",
//     // },
//   ];

//   // Navigation items
//   const navigationItems = [
//     { name: "HOME", id: "home-section" },
//     { name: "SHOP", id: "shop-section" },
//     { name: "NEWS", id: "news-section" },
//     { name: "PAGES", id: "pages-section" },
//     { name: "OUR WORK", id: "our-work-section" },
//     { name: "CONTACT US", id: "contact-us-section" },
//   ];

//   /**
//    * Function to handle navigation click and smooth scroll.
//    */
//   const handleNavClick = (id) => {
//     const sectionId = id.toLowerCase().replace(" ", "-");
//     setActiveMenu(sectionId);
//     setMobileMenuOpen(false);

//     const targetElement = document.getElementById(sectionId);
//     if (targetElement) {
//       const headerHeight = headerRef.current?.offsetHeight || 0;
//       const targetPosition = targetElement.offsetTop - headerHeight;

//       window.scrollTo({
//         top: targetPosition,
//         behavior: "smooth",
//       });
//     } else {
//       console.warn(`Target section with ID: ${sectionId} not found.`);
//     }
//   };

//   // Error state
//   if (error && !association) {
//     return (
//       <header className="w-full bg-white shadow-sm">
//         <div className="max-w-7xl mx-auto px-4 py-4">
//           <Alert
//             message="Failed to Load Association Data"
//             description={error}
//             type="error"
//             action={
//               <Button
//                 size="small"
//                 onClick={handleRetry}
//                 icon={<ReloadOutlined />}
//               >
//                 Retry
//               </Button>
//             }
//             closable
//             onClose={() => dispatch(resetAssociationError())}
//           />
//         </div>
//       </header>
//     );
//   }

//   // Loading state
//   if (loading && !association) {
//     return (
//       <header className="w-full bg-white shadow-sm">
//         <div className="max-w-7xl mx-auto px-4 py-8">
//           <div className="flex justify-center items-center">
//             <Space direction="vertical" align="center" size="middle">
//               <Spin size="large" />
//               <Text type="secondary">Loading association data...</Text>
//             </Space>
//           </div>
//         </div>
//       </header>
//     );
//   }

//   return (
//     <header
//       ref={headerRef}
//       className="w-full bg-white font-montserrat fixed top-0 left-0 right-0 z-50 shadow-sm"
//     >
//       {/* Top Bar - Split Background */}
//       <div
//         className={`relative bg-white border-b border-gray-200 transition-all duration-300 ease-in-out ${
//           topSectionVisible
//             ? "h-20 md:h-24 opacity-100"
//             : "h-0 opacity-0 overflow-hidden"
//         }`}
//       >
//         {/* Split background effect */}
//         <div className="absolute inset-0 flex">
//           <div className="w-2/5 bg-white"></div>
//           <div className="w-3/5 bg-gradient-to-r from-gray-900 to-black"></div>
//         </div>

//         <div className="relative max-w-7xl mx-auto h-full px-4">
//           <div className="flex items-center h-full">
//             {/* Left Side - Logo and Name */}
//             <div className="w-2/5 h-full flex items-center pr-4">
//               <div className="flex items-center gap-3 w-full">
//                 <Avatar
//                   size={{ xs: 48, sm: 52, md: 56, lg: 60 }}
//                   shape="square"
//                   src={association?.logo}
//                   alt={association?.associationName}
//                   className="border-2 border-gray-200 shadow-sm flex-shrink-0"
//                 >
//                   {!association?.logo &&
//                     (association?.associationName?.charAt(0) || "A")}
//                 </Avatar>
//                 <div className="flex flex-col min-w-0 flex-1">
//                   <Title
//                     level={4}
//                     className="!m-0 !text-gray-900 !font-bold truncate"
//                     style={{
//                       fontSize: 'clamp(1rem, 2vw, 1.5rem)',
//                       lineHeight: '1.2'
//                     }}
//                   >
//                     {association?.associationName || "AHCKS Association"}
//                   </Title>
//                   <Text
//                     className="text-[#025959] font-medium hidden sm:block text-xs md:text-sm truncate"
//                   >
//                     Business & Finance Solutions
//                   </Text>
//                 </div>
//               </div>
//             </div>

//             {/* Right Side - Contact Info */}
//             <div className="w-3/5 h-full flex items-center">
//               <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4 lg:gap-6 w-full">
//                 {contactInfo.map((item, index) => (
//                   <div
//                     key={item.key}
//                     className="flex items-center gap-2 md:gap-3 min-w-0"
//                   >
//                     <div className="text-[#00abc9] text-base md:text-lg flex-shrink-0">
//                       {item.icon}
//                     </div>
//                     <div className="text-white min-w-0 flex-1">
//                       <div className="font-normal text-xs md:text-xs tracking-[1.2px] truncate leading-tight">
//                         {item.text}
//                       </div>
//                       <div className="text-gray-300 text-xs truncate tracking-[1.2px] font-montserrat">
//                         {item.subText}
//                       </div>
//                     </div>

//                   </div>

//                 ))}
//                 {/* CTA Button - 4th column */}
//                 <div className="flex justify-end">
//                   <Button
//                     title="GET A FREE QUOTE"
//                     width="180px"
//                     height="40px"
//                     className="cta-button"
//                     style={{
//                       backgroundColor: "transparent",
//                       borderRadius: "0px",
//                       border: "2px solid #ffffff",
//                       color: "#ffffff",
//                       fontSize: "12px",
//                       fontWeight: "600",
//                       letterSpacing: "0.5px"
//                     }}
//                     onClick={() => handleNavClick("contact-us-section")}
//                   />
//              </div>

//                 {/* <Button
//               type="primary"
//               size="large"
//               className="w-full bg-blue-600 hover:bg-blue-700 border-none font-semibold py-3 h-auto rounded-lg transition-all duration-300 shadow"
//               onClick={() => {
//                 handleNavClick("contact-us-section");
//                 setMobileMenuOpen(false);
//               }}
//             >
//               GET FREE QUOTE
//             </Button> */}

//             {/* <Button
//               title=" GET FREE QUOTE"
//               width="250px"
//               height="50px"
//               className="about-button-class"
//               style={{
//                 backgroundColor: "transparent",
//                 borderRadius: "2px",
//                 border: "2px solid var(--white)",
//                 color: "var(--white)"
//               }}
//               type="link"
//               // href={resumePath}
//             /> */}

//               </div>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Navigation Bar - ALWAYS VISIBLE */}
//       <nav className="bg-white border-b border-gray-200 shadow-sm">
//         <div className="max-w-7xl mx-auto px-4">
//           <div className="flex items-center justify-between py-3">
//             {/* Logo for mobile when top section hidden */}
//             <div className="flex-1 lg:flex-none lg:w-2/5">
//               {!topSectionVisible && (
//                 <div className="flex items-center gap-3">
//                   <Avatar
//                     size={40}
//                     shape="square"
//                     src={association?.logo}
//                     alt={association?.associationName}
//                     className="border border-gray-200"
//                   >
//                     {!association?.logo && "A"}
//                   </Avatar>
//                   <Text strong className="text-gray-800 text-sm truncate hidden sm:block">
//                     {association?.associationName || "AHCKS"}
//                   </Text>
//                 </div>
//               )}
//             </div>

//             {/* Center - Desktop Navigation */}
//             <div className="hidden lg:flex items-center space-x-1 xl:space-x-2 flex-1 justify-center">
//               {navigationItems.map((item) => (
//                 <button
//                   type="button"
//                   key={item.name}
//                   onClick={() => handleNavClick(item.id)}
//                   className={`px-3 py-2 text-sm font-medium transition-all duration-200 rounded-lg min-w-[80px] text-center ${
//                     activeMenu === item.id
//                       ? "text-blue-600 font-semibold bg-blue-50 border border-blue-200"
//                       : "text-gray-700 hover:text-blue-600 hover:bg-gray-50 border border-transparent"
//                   }`}
//                 >
//                   {item.name}
//                 </button>
//               ))}
//             </div>

//             {/* Right Side - CTA Button & Mobile Menu */}
//             <div className="flex items-center gap-2 flex-1 lg:flex-initial justify-end">
//               {/* <Button
//                 type="primary"
//                 className="bg-blue-600 hover:bg-blue-700 border-none font-semibold px-4 lg:px-6 py-2 h-auto text-sm rounded-lg transition-all duration-300 shadow hover:shadow-md hidden sm:block"
//                 onClick={() => handleNavClick("contact-us-section")}
//               >
//                 GET A FREE QUOTE
//               </Button> */}

//               {/* Mobile Menu Button */}
//               <button
//                 type="button"
//                 className="lg:hidden p-2 text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all duration-200 border border-gray-200"
//                 onClick={() => setMobileMenuOpen(true)}
//                 aria-label="Open menu"
//               >
//                 <MenuOutlined className="text-lg" />
//               </button>
//             </div>
//           </div>
//         </div>
//       </nav>

//       {/* Mobile Drawer */}
//       <Drawer
//         title={
//           <div className="flex items-center gap-3 border-b pb-4">
//             <Avatar
//               size={48}
//               shape="square"
//               src={association?.logo}
//               alt={association?.associationName}
//               className="border border-gray-200"
//             >
//               {!association?.logo && "A"}
//             </Avatar>
//             <div className="flex-1 min-w-0">
//               <div className="text-lg font-bold text-gray-800 truncate">
//                 {association?.associationName || "AHCKS Association"}
//               </div>
//               <div className="text-sm text-gray-600 truncate">Business & Finance</div>
//             </div>
//             <button
//               onClick={() => setMobileMenuOpen(false)}
//               className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
//               aria-label="Close menu"
//             >
//               <CloseOutlined className="text-gray-600 text-lg" />
//             </button>
//           </div>
//         }
//         placement="right"
//         onClose={() => setMobileMenuOpen(false)}
//         open={mobileMenuOpen}
//         width={320}
//         className="lg:hidden"
//         styles={{
//           body: { padding: 0 },
//         }}
//       >
//         <div className="flex flex-col h-full">
//           {/* Mobile Menu Items */}
//           <div className="flex-1 py-4">
//             <div className="space-y-2 px-4">
//               {navigationItems.map((item) => (
//                 <button
//                   type="button"
//                   key={item.name}
//                   onClick={() => handleNavClick(item.id)}
//                   className={`w-full text-left px-4 py-3 rounded-lg transition-colors duration-200 font-medium border ${
//                     activeMenu === item.id
//                       ? "bg-blue-50 text-blue-600 border-blue-200"
//                       : "text-gray-700 hover:bg-gray-50 border-gray-200"
//                   }`}
//                 >
//                   {item.name}
//                 </button>
//               ))}
//             </div>
//           </div>

//           {/* Mobile Contact Info */}
//           <div className="p-4 border-t space-y-4 bg-gray-50">
//             <div className="space-y-3">
//               <h4 className="font-semibold text-gray-800 text-sm uppercase tracking-wide">
//                 Contact Information
//               </h4>
//               {contactInfo.map((item) => (
//                 <div
//                   key={item.key}
//                   className="flex items-center gap-3 p-3 bg-white rounded-lg border border-gray-200"
//                 >
//                   <span className="text-blue-500 text-lg flex-shrink-0">
//                     {item.icon}
//                   </span>
//                   <div className="min-w-0 flex-1">
//                     <div className="font-medium text-gray-800 text-sm truncate">
//                       {item.text}
//                     </div>
//                     <div className="text-xs text-gray-600 truncate">
//                       {item.subText}
//                     </div>
//                   </div>
//                 </div>
//               ))}
//             </div>

//             {/* Mobile CTA Button */}
//             {/* <Button
//               type="primary"
//               size="large"
//               className="w-full bg-blue-600 hover:bg-blue-700 border-none font-semibold py-3 h-auto rounded-lg transition-all duration-300 shadow"
//               onClick={() => {
//                 handleNavClick("contact-us-section");
//                 setMobileMenuOpen(false);
//               }}
//             >
//               GET FREE QUOTE
//             </Button> */}
//           </div>
//         </div>
//       </Drawer>
//     </header>
//   );
// };

// export default Header;

import React, { useState, useEffect, useRef, useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  Drawer,
  Space,
  Typography,
  Alert,
  Spin,
  Avatar,
  Input,
  Card,
  Row,
  Col,
  Select,
} from "antd";
import {
  fetchAssociation,
  resetAssociationError,
} from "../Slices/associationSlice";
import Button from "./../Button/Button";

import {
  PhoneOutlined,
  MailOutlined,
  ClockCircleOutlined,
  MenuOutlined,
  CloseOutlined,
  EnvironmentOutlined,
  ReloadOutlined,
  SearchOutlined,
  FilterOutlined,
} from "@ant-design/icons";

const { Text, Title } = Typography;
const { Search } = Input;

const Header = () => {
  const dispatch = useDispatch();
  const {
    data: association,
    loading,
    error,
  } = useSelector((state) => state.association);

  // const employees = useSelector(state => state.employees);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeMenu, setActiveMenu] = useState("home");
  const [topSectionVisible, setTopSectionVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [searchText, setSearchText] = useState("");



  const headerRef = useRef(null);

  // Fetch association data on component mount
  useEffect(() => {
    dispatch(fetchAssociation());
  }, [dispatch]);

  // Handle scroll effect
  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          const currentScrollY = window.scrollY;

          if (currentScrollY > lastScrollY && currentScrollY > 100) {
            setTopSectionVisible(false);
          } else if (currentScrollY < lastScrollY) {
            setTopSectionVisible(true);
          }

          setLastScrollY(currentScrollY);
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  // Retry fetching association data
  const handleRetry = () => {
    dispatch(resetAssociationError());
    dispatch(fetchAssociation());
  };

  // Format phone numbers for display
  const formatPhoneNumbers = (phones) => {
    if (!phones || !Array.isArray(phones)) return "Not Available";
    return phones.join(" | ");
  };

  // Contact information configuration - FIXED FIELD MAPPINGS
  const contactInfo = [
    {
      icon: <EnvironmentOutlined />,
      text:
        association?.headOffice ||
        association?.associationAddress ||
        "Address not set",
      subText: association?.headOffice?.city || "Maymensing",
      key: "address",
    },
    {
      icon: <MailOutlined />,
      text: association?.contactEmail || "email@example.com",
      subText: formatPhoneNumbers(association?.contactPhone),
      key: "email",
    },

    {
      icon: <ClockCircleOutlined />,
      text: association?.officeHours || "9AM - 5PM",
      subText: "Mon - Sat",
      key: "hours",
    },

    // {
    //   icon: <PhoneOutlined />,
    //   text: formatPhoneNumbers(association?.contactPhone),
    //   subText: "Call Us",
    //   key: "phone",
    // },
  ];

  // Navigation items
  const navigationItems = [
    { name: "HOME", id: "home-section" },
    { name: "ASSOCIATION", id: "association-section" },
    { name: "FINACIAL", id: "financial-section" },
    { name: "MEMBER", id: "home-section" },
    // { name: "EMPLOYEE", id: "shop-section" },
    // { name: "COMMITTEE", id: "news-section" },
    { name: "PAGES", id: "pages-section" },
    { name: "OUR WORK", id: "our-work-section" },
    { name: "CONTACT US", id: "contact-us-section" },
  ];

  /**
   * Function to handle navigation click and smooth scroll.
   */
  const handleNavClick = (id) => {
    const sectionId = id.toLowerCase().replace(" ", "-");
    setActiveMenu(sectionId);
    setMobileMenuOpen(false);

    const targetElement = document.getElementById(sectionId);
    if (targetElement) {
      const headerHeight = headerRef.current?.offsetHeight || 0;
      const targetPosition = targetElement.offsetTop - headerHeight;

      window.scrollTo({
        top: targetPosition,
        behavior: "smooth",
      });
    } else {
      console.warn(`Target section with ID: ${sectionId} not found.`);
    }
  };

  // Error state
  if (error && !association) {
    return (
      <header className="w-full bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <Alert
            message="Failed to Load Association Data"
            description={error}
            type="error"
            action={
              <Button
                size="small"
                onClick={handleRetry}
                icon={<ReloadOutlined />}
              >
                Retry
              </Button>
            }
            closable
            onClose={() => dispatch(resetAssociationError())}
          />
        </div>
      </header>
    );
  }

  // Loading state
  if (loading && !association) {
    return (
      <header className="w-full bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="flex justify-center items-center">
            <Space direction="vertical" align="center" size="middle">
              <Spin size="large" />
              <Text type="secondary">Loading association data...</Text>
            </Space>
          </div>
        </div>
      </header>
    );
  }

  return (
    <header
      ref={headerRef}
      className="w-full bg-white font-montserrat fixed top-0 left-0 right-0 z-50 shadow-sm"
    >
      {/* Top Bar - Split Background */}
      <div
        className={`relative bg-white  transition-all duration-300 ease-in-out ${
          topSectionVisible
            ? "h-20 md:h-24 opacity-100"
            : "h-0 opacity-0 overflow-hidden"
        }`}
      >
        {/* Split background effect */}
        <div className="absolute inset-0 flex">
          <div className="w-[35%] bg-white"></div>
          <div className="w-[65%] bg-gradient-to-r from-gray-900 to-black"></div>
        </div>

        {/* <div className="relative max-w-7xl mx-auto h-full px-4"> */}
        <div className="relative container mx-auto px-4 h-full">
          <div className="flex items-center h-full">
            {/* Left Side - Logo and Name */}
            <div className="w-[35%] h-full flex items-center">
              <div className="flex items-center gap-3 w-full">
                <Avatar
                  size={60}
                  // size={{ xs: 48, sm: 52, md: 60, lg: 60 }}
                  shape="square"
                  src={association?.logo}
                  alt={association?.associationName}
                  className=" flex-shrink-0"
                >
                  {!association?.logo &&
                    (association?.associationName?.charAt(0) || "A")}
                </Avatar>
                <div className="flex flex-col min-w-0 flex-1">
                  <Title
                    level={4}
                    className="!m-0 !text-gray-900 !font-bold truncate "
                    style={{
                      fontSize: "clamp(1rem, 2vw, 1.5rem)",
                      lineHeight: "1.2",
                    }}
                  >
                    {association?.associationName || "AHCKS Association"}
                  </Title>
                  <h2 className="text-[#00abc9] font-medium hidden sm:block text-xs md:text-xs truncate sm:pl-0 md:pl-[70px]">
                    Business & Finance Solutions.
                  </h2>
                </div>
              </div>
            </div>

            {/* Right Side - Contact Info */}
            <div className="w-[65%] h-full flex items-center">
              <div className="flex justify-between items-center w-full">
                {/* Contact Info - 3 items in a row */}
                <div className="grid grid-cols-3 gap-4 md:gap-6 lg:gap-8 flex-1">
                  {contactInfo.map((item, index) => (
                    <div
                      key={item.key}
                      className="flex items-center gap-2 md:gap-3 min-w-0"
                    >
                      <div className="text-[#00abc9] text-base md:text-lg flex-shrink-0">
                        {item.icon}
                      </div>
                      <div className="text-white min-w-0 flex-1 ">
                        <div className="font-normal text-xs md:text-xs tracking-[1.2px] truncate leading-tight">
                          {item.text}
                        </div>
                        <div className=" text-xs truncate tracking-[1.2px] font-montserrat pt-1">
                          {item.subText}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* CTA Button - Separate at the end */}
                <div className=" flex-shrink-0">
                  <Button
                    title="GET A FREE QUOTE"
                    width="200px"
                    height="45px"
                    className="cta-button font-montserrat"
                    // style={{
                    //   backgroundColor: "#00abc9",
                    //   color: "#ffffff",
                    //   fontSize: "12px",
                    //   fontWeight: "600",
                    //   letterSpacing: "0.5px",
                    // }}
                    onClick={() => handleNavClick("contact-us-section")}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Bar - ALWAYS VISIBLE */}
      <nav className="bg-[#00abc9] ">
        {/* <div className="max-w-7xl mx-auto px-4"> */}
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between py-3 tracking-[1.2px] ">
            {/* Center - Desktop Navigation */}

            <div className="hidden lg:flex items-center flex-1 justify-start gap-1">
              {navigationItems.map((item, index) => (
                <button
                  type="button"
                  key={item.name}
                  onClick={() => handleNavClick(item.id)}
                  className={`
      px-3 py-2 text-sm transition-all duration-200 rounded-lg text-center
      font-bold text-[13px]
  
       ${index === 0 ? "-ml-3" : ""} 
      
      ${
        activeMenu === item.id
          ? index === 0
            ? "text-[#000000] "
            : "text-blue-600 "
          : index === 0
          ? "text-[#000000] hover:text-white "
          : "text-white hover:text-[#000000]  "
      }
    `}
                >
                  {item.name}
                </button>
              ))}
            </div>

            {/* Logo for mobile when top section hidden */}
            <div className="flex-1 lg:flex-none lg:w-1/4">
              {/* {!topSectionVisible && (
                <div className="flex items-center gap-3">
                  <Avatar
                    size={40}
                    shape="square"
                    src={association?.logo}
                    alt={association?.associationName}
                    className="bg-transparent"
                  >
                    {!association?.logo && "A"}
                  </Avatar>
                  <Text
                    strong
                    className="text-gray-800 text-sm truncate hidden sm:block"
                  >
                    {association?.associationName || "AHCKS"}
                  </Text>
                </div>
                 

              )} */}
              <Search
                placeholder="Search..."
                allowClear
                size="large"
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
                // prefix={<SearchOutlined />}
              />
            </div>

            {/* Right Side - CTA Button & Mobile Menu */}
            <div className="flex items-center gap-2 flex-1 lg:flex-initial justify-end">
              {/* Mobile Menu Button */}
              <button
                type="button"
                className="lg:hidden p-2 text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all duration-200 border border-gray-200"
                onClick={() => setMobileMenuOpen(true)}
                aria-label="Open menu"
              >
                <MenuOutlined className="text-lg" />
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Drawer */}
      <Drawer
        title={
          <div className="flex items-center gap-3 border-b pb-4">
            <Avatar
              size={48}
              shape="square"
              src={association?.logo}
              alt={association?.associationName}
              className="border border-gray-200"
            >
              {!association?.logo && "A"}
            </Avatar>
            <div className="flex-1 min-w-0">
              <div className="text-lg font-bold text-gray-800 truncate">
                {association?.associationName || "AHCKS Association"}
              </div>
              <div className="text-sm text-gray-600 truncate">
                Business & Finance
              </div>
            </div>
            <button
              onClick={() => setMobileMenuOpen(false)}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              aria-label="Close menu"
            >
              <CloseOutlined className="text-gray-600 text-lg" />
            </button>
          </div>
        }
        placement="right"
        onClose={() => setMobileMenuOpen(false)}
        open={mobileMenuOpen}
        width={320}
        className="lg:hidden"
        styles={{
          body: { padding: 0 },
        }}
      >
        <div className="flex flex-col h-full">
          {/* Mobile Menu Items */}
          <div className="flex-1 py-4">
            <div className="space-y-2 px-4">
              {navigationItems.map((item) => (
                <button
                  type="button"
                  key={item.name}
                  onClick={() => handleNavClick(item.id)}
                  className={`w-full text-left px-4 py-3 rounded-lg transition-colors duration-200 font-medium border ${
                    activeMenu === item.id
                      ? "bg-blue-50 text-blue-600 border-blue-200"
                      : "text-gray-700 hover:bg-gray-50 border-gray-200"
                  }`}
                >
                  {item.name}
                </button>
              ))}
            </div>
          </div>

          {/* Mobile Contact Info */}
          <div className="p-4 border-t space-y-4 bg-gray-50">
            <div className="space-y-3">
              <h4 className="font-semibold text-gray-800 text-sm uppercase tracking-wide">
                Contact Information
              </h4>
              {contactInfo.map((item) => (
                <div
                  key={item.key}
                  className="flex items-center gap-3 p-3 bg-white rounded-lg border border-gray-200"
                >
                  <span className="text-blue-500 text-lg flex-shrink-0">
                    {item.icon}
                  </span>
                  <div className="min-w-0 flex-1">
                    <div className="font-medium text-gray-800 text-sm truncate">
                      {item.text}
                    </div>
                    <div className="text-xs text-gray-600 truncate">
                      {item.subText}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Mobile CTA Button */}
            <div className="mt-4">
              <Button
                title="GET A FREE QUOTE"
                width="100%"
                height="45px"
                className="cta-button-mobile"
                style={{
                  backgroundColor: "#00abc9",
                  borderRadius: "3px",
                  // border: "2px solid #000000",
                  // color: "#000000",
                  fontSize: "12px",
                  fontWeight: "600",
                }}
                onClick={() => {
                  handleNavClick("contact-us-section");
                  setMobileMenuOpen(false);
                }}
              />
            </div>
          </div>
        </div>
      </Drawer>
    </header>
  );
};

export default Header;
