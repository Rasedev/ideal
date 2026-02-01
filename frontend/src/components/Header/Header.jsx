// /////////////////////////FINAL//////////////////////////



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





// chatgpt


// import React, { useState, useEffect, useRef, useMemo } from "react";
// import { useSelector, useDispatch } from "react-redux";
// import {
//   Drawer,
//   Space,
//   Typography,
//   Alert,
//   Spin,
//   Avatar,
//   Input,
// } from "antd";
// import {
//   fetchAssociation,
//   resetAssociationError,
// } from "../Slices/associationSlice";
// import Button from "./../Button/Button";

// import {
//   ClockCircleOutlined,
//   MenuOutlined,
//   CloseOutlined,
//   EnvironmentOutlined,
//   ReloadOutlined,
//   MailOutlined,
//   SearchOutlined,
// } from "@ant-design/icons";

// const { Text, Title } = Typography;
// const { Search } = Input;

// // Header component
// export default function Header() {
//   const dispatch = useDispatch();
//   const { data: association, loading, error } = useSelector(
//     (state) => state.association
//   );

//   const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
//   const [activeMenu, setActiveMenu] = useState("home-section");
//   const [topSectionVisible, setTopSectionVisible] = useState(true);
//   const lastScrollYRef = useRef(0);
//   const headerRef = useRef(null);
//   const [searchText, setSearchText] = useState("");

//   // Fetch association data on mount
//   useEffect(() => {
//     dispatch(fetchAssociation());
//   }, [dispatch]);

//   // Scroll listener: hides the top info bar on scroll down, shows on scroll up
//   useEffect(() => {
//     if (typeof window === "undefined") return;

//     let ticking = false;

//     const handleScroll = () => {
//       if (!ticking) {
//         window.requestAnimationFrame(() => {
//           const currentY = window.scrollY || 0;
//           const lastY = lastScrollYRef.current || 0;

//           // threshold to avoid flicker
//           if (currentY - lastY > 30 && currentY > 100) {
//             setTopSectionVisible(false);
//           } else if (lastY - currentY > 10) {
//             setTopSectionVisible(true);
//           }

//           lastScrollYRef.current = currentY;
//           ticking = false;
//         });
//         ticking = true;
//       }
//     };

//     window.addEventListener("scroll", handleScroll, { passive: true });
//     return () => window.removeEventListener("scroll", handleScroll);
//   }, []);

//   const handleRetry = () => {
//     dispatch(resetAssociationError());
//     dispatch(fetchAssociation());
//   };

//   const formatPhoneNumbers = (phones) => {
//     if (!phones) return "Not Available";
//     if (Array.isArray(phones)) return phones.join(" | ");
//     return String(phones);
//   };

//   // Make contact info and navigation memoized so they don't re-create on every render
//   const contactInfo = useMemo(() => {
//     const headOfficeText = (() => {
//       if (!association) return "Address not set";
//       // association.headOffice could be string or object
//       if (typeof association.headOffice === "string") return association.headOffice;
//       if (association.headOffice && typeof association.headOffice === "object") {
//         const { addressLine, address, city, region } = association.headOffice;
//         return [addressLine || address, city, region].filter(Boolean).join(", ");
//       }
//       return association.associationAddress || "Address not set";
//     })();

//     return [
//       {
//         icon: <EnvironmentOutlined />,
//         text: headOfficeText,
//         subText:
//           (association?.headOffice && association.headOffice.city) || association?.associationCity || "-",
//         key: "address",
//       },
//       {
//         icon: <MailOutlined />,
//         text: association?.contactEmail || "email@example.com",
//         subText: formatPhoneNumbers(association?.contactPhone),
//         key: "email",
//       },
//       {
//         icon: <ClockCircleOutlined />,
//         text: association?.officeHours || "9AM - 5PM",
//         subText: association?.officeDays || "Mon - Sat",
//         key: "hours",
//       },
//     ];
//   }, [association]);

//   const navigationItems = useMemo(
//     () => [
//       { name: "HOME", id: "home-section" },
//       { name: "ASSOCIATION", id: "association-section" },
//       { name: "FINANCIAL", id: "financial-section" },
//       { name: "MEMBER", id: "member-section" },
//       { name: "PAGES", id: "pages-section" },
//       { name: "OUR WORK", id: "our-work-section" },
//       { name: "CONTACT US", id: "contact-us-section" },
//     ],
//     []
//   );

//   // Smooth scroll to section; uses the exact id provided in navigationItems
//   const handleNavClick = (id) => {
//     setActiveMenu(id);
//     setMobileMenuOpen(false);

//     if (typeof document === "undefined") return;

//     const targetElement = document.getElementById(id);
//     if (targetElement) {
//       const headerHeight = headerRef.current?.offsetHeight || 0;
//       const targetPosition = targetElement.getBoundingClientRect().top + window.scrollY - headerHeight - 8; // small offset
//       window.scrollTo({ top: targetPosition, behavior: "smooth" });
//     } else {
//       // if section not present just scroll to top or log
//       console.warn(`Target section with ID: ${id} not found.`);
//       if (id === "home-section") window.scrollTo({ top: 0, behavior: "smooth" });
//     }
//   };

//   // Error / loading UI
//   if (error && !association) {
//     return (
//       <header className="w-full bg-white shadow-sm">
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
//       {/* Top Bar - hides on scroll down */}
//       <div
//         className={`relative overflow-hidden transition-all duration-300 ease-in-out bg-gradient-to-r from-white to-slate-900 text-white ${
//           topSectionVisible ? "h-24 opacity-100" : "h-0 opacity-0"
//         }`}
//       >
//         <div className="container mx-auto px-4 h-full">
//           <div className="flex items-center h-full">
//             <div className="w-1/3 flex items-center">
//               <div className="flex items-center gap-3 w-full">
//                 <Avatar
//                   size={56}
//                   shape="square"
//                   src={association?.logo}
//                   alt={association?.associationName}
//                   className="flex-shrink-0 bg-white"
//                 >
//                   {!association?.logo && (association?.associationName?.charAt(0) || "A")}
//                 </Avatar>
//                 <div className="flex flex-col min-w-0">
//                   <Title
//                     level={4}
//                     className="!m-0 !text-slate-900 !font-bold truncate"
//                     style={{ fontSize: "clamp(1rem, 2vw, 1.25rem)", lineHeight: 1.1 }}
//                   >
//                     {association?.associationName || "AHCKS Association"}
//                   </Title>
//                   <div className="text-[#00abc9] font-medium text-xs truncate">Business & Finance Solutions</div>
//                 </div>
//               </div>
//             </div>

//             <div className="w-2/3 flex items-center">
//               <div className="grid grid-cols-3 gap-4 w-full">
//                 {contactInfo.map((item) => (
//                   <div key={item.key} className="flex items-center gap-3 min-w-0">
//                     <div className="text-[#00abc9] text-lg flex-shrink-0">{item.icon}</div>
//                     <div className="min-w-0">
//                       <div className="font-semibold text-sm truncate text-slate-900">{item.text}</div>
//                       <div className="text-xs truncate text-slate-700">{item.subText}</div>
//                     </div>
//                   </div>
//                 ))}
//               </div>

//               <div className="ml-4 flex-shrink-0">
//                 <Button
//                   title="GET A FREE QUOTE"
//                   width={200}
//                   height={44}
//                   className="cta-button"
//                   onClick={() => handleNavClick("contact-us-section")}
//                 />
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Navigation Bar */}
//       <nav className="bg-[#00abc9]">
//         <div className="container mx-auto px-4">
//           <div className="flex items-center justify-between py-3">
//             {/* Desktop navigation */}
//             <div className="hidden lg:flex items-center gap-2">
//               {navigationItems.map((item, idx) => (
//                 <button
//                   key={item.id}
//                   onClick={() => handleNavClick(item.id)}
//                   className={`px-3 py-2 rounded-md text-sm font-semibold transition-all duration-150 ${
//                     activeMenu === item.id ? "text-slate-800 bg-white/30" : "text-white hover:opacity-90"
//                   }`}
//                 >
//                   {item.name}
//                 </button>
//               ))}
//             </div>

//             {/* center search (responsive) */}
//             <div className="flex-1 px-3">
//               <Search
//                 placeholder="Search..."
//                 allowClear
//                 value={searchText}
//                 onChange={(e) => setSearchText(e.target.value)}
//                 enterButton={<SearchOutlined />}
//                 size="middle"
//               />
//             </div>

//             <div className="flex items-center gap-3">
//               <div className="hidden lg:block">
//                 <Button
//                   title="GET A FREE QUOTE"
//                   width={160}
//                   height={40}
//                   onClick={() => handleNavClick("contact-us-section")}
//                 />
//               </div>

//               <button
//                 className="lg:hidden p-2 rounded-md border border-gray-200 bg-white"
//                 onClick={() => setMobileMenuOpen(true)}
//                 aria-label="Open menu"
//               >
//                 <MenuOutlined />
//               </button>
//             </div>
//           </div>
//         </div>
//       </nav>

//       {/* Mobile Drawer */}
//       <Drawer
//         title={
//           <div className="flex items-center gap-3">
//             <Avatar size={40} shape="square" src={association?.logo} alt={association?.associationName} />
//             <div className="min-w-0">
//               <div className="font-bold truncate">{association?.associationName || "AHCKS"}</div>
//               <div className="text-xs text-gray-500 truncate">Business & Finance</div>
//             </div>
//           </div>
//         }
//         placement="right"
//         onClose={() => setMobileMenuOpen(false)}
//         open={mobileMenuOpen}
//         width={320}
//       >
//         <div className="flex flex-col h-full">
//           <div className="py-3 px-2 space-y-2">
//             {navigationItems.map((item) => (
//               <button
//                 key={item.id}
//                 onClick={() => handleNavClick(item.id)}
//                 className={`w-full text-left px-4 py-3 rounded-md font-medium ${
//                   activeMenu === item.id ? "bg-[#e6f7ff] text-[#0050b3]" : "text-slate-800 hover:bg-gray-50"
//                 }`}
//               >
//                 {item.name}
//               </button>
//             ))}
//           </div>

//           <div className="mt-auto p-4 border-t bg-gray-50">
//             <div className="space-y-3">
//               <h4 className="font-semibold text-sm text-gray-800">Contact Information</h4>
//               {contactInfo.map((item) => (
//                 <div key={item.key} className="flex items-center gap-3 p-3 bg-white rounded-md border">
//                   <div className="text-[#00abc9]">{item.icon}</div>
//                   <div className="min-w-0">
//                     <div className="font-medium truncate">{item.text}</div>
//                     <div className="text-xs text-gray-600 truncate">{item.subText}</div>
//                   </div>
//                 </div>
//               ))}

//               <div>
//                 <Button
//                   title="GET A FREE QUOTE"
//                   width="100%"
//                   height={44}
//                   onClick={() => {
//                     handleNavClick("contact-us-section");
//                     setMobileMenuOpen(false);
//                   }}
//                 />
//               </div>
//             </div>
//           </div>
//         </div>
//       </Drawer>
//     </header>
//   );
// }











