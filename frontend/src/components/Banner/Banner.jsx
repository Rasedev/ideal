


// import React, { useRef, useEffect } from 'react';
// import { Swiper, SwiperSlide } from 'swiper/react';
// import { Autoplay, EffectFade, Pagination } from 'swiper/modules';
// import HeroImageH0 from '../../assets/H0.jpg';
// import HeroImageH1 from '../../assets/H8.jpg';
// import HeroImageH2 from '../../assets/H7.jpg';
// import HeroImageH3 from '../../assets/H6.jpg';
// // Import Swiper styles
// import 'swiper/css';
// import 'swiper/css/effect-fade';
// import 'swiper/css/pagination';

// // Import your CSS Module styles
// import styles from './Banner.module.css';

// // --- SLIDER DATA ---
// const slidesData = [
//     {
//         id: 1,
//         background: 'path/to/your/image-or-video-1.jpg', // Placeholder for the background media
//         isTextWhite: true,
//         titleLine1: '#lovedesign',
//         titleLine2: 'Surface Transport & Logistics Consulting',
//         buttonText: 'Get Started Now',
//         subtitle: ''
//     },
//     {
//         id: 2,
//         background: 'path/to/your/image-or-video-2.jpg',
//         isTextWhite: false, // Text in video appears darker
//         titleLine1: 'Grow Your Business',
//         titleLine2: 'Convert Visitors into Customers and Generate More Sales',
//         buttonText: 'Get Started Now',
//         subtitle: 'Hello Dears! We Will Help'
//     },
//     {
//         id: 3,
//         background: 'path/to/your/image-or-video-3.jpg',
//         isTextWhite: false, // Text in video appears darker/mid-tone
//         titleLine1: 'thought leadership',
//         titleLine2: 'With over 10 years of experience helping',
//         buttonText: 'PURCHASE NOW',
//         subtitle: 'Hello, We are'
//     },
// ];

// // --- SLIDER COMPONENT ---
// const Banner = () => {
//     return (
//         <div className={styles.heroContainer}>
//             <Swiper
//                 modules={[Autoplay, EffectFade, Pagination]}
//                 effect={'fade'}
//                 spaceBetween={0}
//                 slidesPerView={1}
//                 loop={true}
//                 autoplay={{
//                     delay: 5000, // Slide changes every 5 seconds
//                     disableOnInteraction: false,
//                 }}
//                 pagination={{ clickable: true }}
//                 className={styles.heroSwiper}
//             >
//                 {slidesData.map((slide, index) => (
//                     <SwiperSlide key={slide.id} className={styles.swiperSlide}>
//                         {/* Background Media (Image or Video) */}
//                         <div className={styles.slideBackground}>
//                             <img src={HeroImageH0} alt="" className="object-cover" />
//                             <img src={HeroImageH1} alt="" className="object-cover" />
//                             <img src={HeroImageH2} alt="" className="object-cover" />
//                             <img src={HeroImageH3} alt="" className="object-cover" />
//                              {/*
//                                 In a real app, you would dynamically load a <video> element here
//                                 if the background is a video, otherwise use an <img>.
//                                 For responsiveness, ensure video/image uses object-fit: cover.
//                              */}
//                             <div
//                                 style={{ 
//                                     backgroundImage: `url(${slide.background})`,
//                                     // Use a placeholder color or a real background
//                                     backgroundColor: index === 0 ? '#4a4a4a' : '#f0f0f0' 
//                                 }}
//                                 className={styles.backgroundMedia}
//                             />
//                         </div>

//                         {/* Text Overlay */}
//                         <div className={`${styles.slideContent} ${slide.isTextWhite ? styles.whiteText : styles.darkText}`}>
//                             {slide.subtitle && (
//                                 <p className={styles.subtitle}>{slide.subtitle}</p>
//                             )}
                            
//                             {/* Title lines with animation hooks */}
//                             <h1 className={styles.title}>
//                                 <span className={styles.titleLine1}>{slide.titleLine1}</span>
//                                 <span className={styles.titleLine2}>{slide.titleLine2}</span>
//                             </h1>

//                             <button className={styles.actionButton}>
//                                 {slide.buttonText}
//                             </button>
//                         </div>
//                     </SwiperSlide>
//                 ))}
//             </Swiper>
//         </div>
//     );
// };

// export default Banner;






////////////////////////FINAL////////////////////////////////////



// import React, { useState, useEffect } from 'react';
// import { Swiper, SwiperSlide } from 'swiper/react';
// import { Autoplay, EffectFade, Pagination, Navigation } from 'swiper/modules';
// import { Button } from 'antd';
// import { Link } from 'react-router-dom';
// import { ArrowRightOutlined, HeartOutlined, TeamOutlined, PlayCircleOutlined } from '@ant-design/icons';

// // Import images
// import HeroImageH0 from '../../assets/H0.jpg';
// import HeroImageH1 from '../../assets/H8.jpg';
// import HeroImageH2 from '../../assets/H7.jpg';
// import HeroImageH3 from '../../assets/H6.jpg';

// // Import Swiper styles
// import 'swiper/css';
// import 'swiper/css/effect-fade';
// import 'swiper/css/pagination';
// import 'swiper/css/navigation';

// // Import your CSS Module styles
// import styles from './Banner.module.css';

// // --- SLIDER DATA ---
// const slidesData = [
//     {
//         id: 1,
//         background: HeroImageH0,
//         titleLine1: 'Alamgir Hossain',
//         titleLine2: 'City Welfare Association',
//         subtitle: 'Building a Better Community Together',
//         buttonText: 'Join Our Mission',
//         buttonLink: '/register',
//         badge: 'Non-Profit Organization',
//         icon: <HeartOutlined />
//     },
//     {
//         id: 2,
//         background: HeroImageH1,
//         titleLine1: 'Community',
//         titleLine2: 'Development Programs',
//         subtitle: 'Empowering Local Communities',
//         buttonText: 'View Programs',
//         buttonLink: '/programs',
//         badge: 'Social Welfare',
//         icon: <TeamOutlined />
//     },
//     {
//         id: 3,
//         background: HeroImageH2,
//         titleLine1: 'Volunteer &',
//         titleLine2: 'Make a Difference',
//         subtitle: 'Your Time Can Change Lives',
//         buttonText: 'Become Volunteer',
//         buttonLink: '/volunteer',
//         badge: 'Join Us',
//         icon: <PlayCircleOutlined />
//     },
//     {
//         id: 4,
//         background: HeroImageH3,
//         titleLine1: 'Emergency Relief',
//         titleLine2: '& Support',
//         subtitle: 'Helping When It Matters Most',
//         buttonText: 'Donate Now',
//         buttonLink: '/donate',
//         badge: 'Humanitarian Aid',
//         icon: <HeartOutlined />
//     }
// ];

// const Banner = () => {
//     const [isActive, setIsActive] = useState(0);

//     return (
//         <div className={styles.heroContainer}>
//             <Swiper
//                 modules={[Autoplay, EffectFade, Pagination, Navigation]}
//                 effect={'fade'}
//                 speed={1500}
//                 spaceBetween={0}
//                 slidesPerView={1}
//                 loop={true}
//                 autoplay={{
//                     delay: 5000,
//                     disableOnInteraction: false,
//                     pauseOnMouseEnter: true,
//                 }}
//                 pagination={{
//                     clickable: true,
//                     el: `.${styles.pagination}`,
//                     bulletClass: styles.bullet,
//                     bulletActiveClass: styles.bulletActive,
//                 }}
//                 navigation={{
//                     nextEl: `.${styles.next}`,
//                     prevEl: `.${styles.prev}`,
//                 }}
//                 onSlideChange={(swiper) => setIsActive(swiper.realIndex)}
//                 className={styles.swiper}
//             >
//                 {slidesData.map((slide, index) => (
//                     <SwiperSlide key={slide.id} className={styles.slide}>
//                         <div className={styles.background}>
//                             <img 
//                                 src={slide.background} 
//                                 alt={`Slide ${index + 1}`}
//                                 className={`${styles.backgroundImage} ${isActive === index ? styles.zoom : ''}`}
//                             />
//                             <div className={styles.overlay}></div>
//                         </div>
//                            <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl content">
//                         {/* <div className={styles.content} > */}
//                             {/* Badge */}
//                             <div className={`${styles.badge} ${isActive === index ? styles.animateBadge : ''}`}>
//                                 <span className={styles.badgeIcon}>{slide.icon}</span>
//                                 {slide.badge}
//                             </div>
                            
//                             {/* Subtitle */}
//                             <p className={`${styles.subtitle} ${isActive === index ? styles.animateSubtitle : ''}`}>
//                                 {slide.subtitle}
//                             </p>
                            
//                             {/* Title */}
//                             <div className={styles.titleWrapper}>
//                                 <h1 className={styles.title}>
//                                     <span className={`${styles.titleLine1} ${isActive === index ? styles.animateTitle1 : ''}`}>
//                                         {slide.titleLine1}
//                                     </span>
//                                     <span className={`${styles.titleLine2} ${isActive === index ? styles.animateTitle2 : ''}`}>
//                                         {slide.titleLine2}
//                                     </span>
//                                 </h1>
//                             </div>

//                             {/* Buttons */}
//                             <div className={`${styles.buttons} ${isActive === index ? styles.animateButtons : ''}`}>
//                                 <Link to={slide.buttonLink}>
//                                     <Button 
//                                         type="primary" 
//                                         size="large"
//                                         className={styles.primaryBtn}
//                                         icon={<ArrowRightOutlined />}
//                                     >
//                                         {slide.buttonText}
//                                     </Button>
//                                 </Link>
//                                 <Link to="/about">
//                                     <Button 
//                                         size="large"
//                                         className={styles.secondaryBtn}
//                                     >
//                                         Learn More
//                                     </Button>
//                                 </Link>
//                             </div>
//                         </div>
//                     </SwiperSlide>
//                 ))}

//                 {/* Navigation */}
//                 <div className={`${styles.navigation} ${styles.prev}`}></div>
//                 <div className={`${styles.navigation} ${styles.next}`}></div>
                
//                 {/* Pagination */}
//                 <div className={styles.pagination}></div>
//             </Swiper>

//             {/* Scroll Indicator */}
//             <div className={styles.scrollIndicator}>
//                 <div className={styles.scrollArrow}></div>
//                 <span>Scroll Down</span>
//             </div>
//         </div>
//     );
// };

// export default Banner;






// import React, { useState } from 'react';
// import { Swiper, SwiperSlide } from 'swiper/react';
// import { Autoplay, EffectFade, Pagination, Navigation } from 'swiper/modules';
// import { Button } from 'antd';
// import { Link } from 'react-router-dom';
// import { ArrowRightOutlined, HeartOutlined, TeamOutlined, PlayCircleOutlined } from '@ant-design/icons';

// // Import images
// import HeroImageH0 from '../../assets/H0.jpg';
// import HeroImageH1 from '../../assets/H8.jpg';
// import HeroImageH2 from '../../assets/H7.jpg';
// import HeroImageH3 from '../../assets/H6.jpg';

// // Import Swiper styles
// import 'swiper/css';
// import 'swiper/css/effect-fade';
// import 'swiper/css/pagination';
// import 'swiper/css/navigation';

// // Import your CSS Module styles
// import styles from './Banner.module.css';
// // import Button from './../Button/Button';

// // --- SLIDER DATA ---
// const slidesData = [
//     {
//         id: 1,
//         background: HeroImageH0,
//         titleLine1: 'Ala<span class="highlightM">m</span>gir Hossain',
//         titleLine2: 'City Welfare Association',
//         subtitle: 'Building a Better Community Together',
//         buttonText: 'Join Our Mission',
//         buttonLink: '/register',
//         badge: 'Non-Profit Organization',
//         icon: <HeartOutlined />
//     },

//     {
//         id: 2,
//         background: HeroImageH1,
//         titleLine1: 'Community',
//         titleLine2: 'Development Programs',
//         subtitle: 'Empowering Local Communities',
//         buttonText: 'View Programs',
//         buttonLink: '/programs',
//         badge: 'Social Welfare',
//         icon: <TeamOutlined />
//     },
//     {
//         id: 3,
//         background: HeroImageH2,
//         titleLine1: 'Volunteer &',
//         titleLine2: 'Make a Difference',
//         subtitle: 'Your Time Can Change Lives',
//         buttonText: 'Become Volunteer',
//         buttonLink: '/volunteer',
//         badge: 'Join Us',
//         icon: <PlayCircleOutlined />
//     },
//     // {
//     //     id: 4,
//     //     background: HeroImageH3,
//     //     titleLine1: 'Emergency Relief',
//     //     titleLine2: '& Support',
//     //     subtitle: 'Helping When It Matters Most',
//     //     buttonText: 'Donate Now',
//     //     buttonLink: '/donate',
//     //     badge: 'Humanitarian Aid',
//     //     icon: <HeartOutlined />
//     // }
//    {
//         id: 4,
//         background: HeroImageH3,
//         titleLine1: '<span class="text-red-500">Emergency</span> Relief',
//         titleLine2: '& Support',
//         subtitle: 'Helping When It Matters Most',
//         buttonText: 'Donate Now',
//         buttonLink: '/donate',
//         badge: 'Humanitarian Aid',
//         icon: <HeartOutlined />
//     }
// ];

// const Banner = () => {
//     const [isActive, setIsActive] = useState(0);

//     return (
//         <div className={styles.heroContainer}>
//             <Swiper
//                 modules={[Autoplay, EffectFade, Pagination, Navigation]}
//                 effect={'fade'}
//                 speed={1500}
//                 spaceBetween={0}
//                 slidesPerView={1}
//                 loop={true}
//                 autoplay={{
//                     delay: 5000,
//                     disableOnInteraction: false,
//                     pauseOnMouseEnter: true,
//                 }}
//                 pagination={{
//                     clickable: true,
//                     el: `.${styles.pagination}`,
//                     bulletClass: styles.bullet,
//                     bulletActiveClass: styles.bulletActive,
//                 }}
//                 navigation={{
//                     nextEl: `.${styles.next}`,
//                     prevEl: `.${styles.prev}`,
//                 }}
//                 onSlideChange={(swiper) => setIsActive(swiper.realIndex)}
//                 className={styles.swiper}
//             >
//                 {slidesData.map((slide, index) => (
//                     <SwiperSlide key={slide.id} className={styles.slide}>
//                         <div className={styles.background}>
//                             <img 
//                                 src={slide.background} 
//                                 alt={`Slide ${index + 1}`}
//                                 className={`${styles.backgroundImage} ${isActive === index ? styles.zoom : ''}`}
//                             />
//                             <div className={styles.overlay}></div>
//                         </div>

//                         {/* Content with Tailwind Container */}
//                         <div className={`${styles.content} container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl font-montserrat`}>
//                             <div className="max-w-4xl">
//                                 {/* Badge */}
//                                 <div className={`${styles.badge} ${isActive === index ? styles.animateBadge : ''}`}>
//                                     <span className={styles.badgeIcon}>{slide.icon}</span>
//                                     {slide.badge}
//                                 </div>
                                
//                                 {/* Subtitle */}
//                                 <p className={`${styles.subtitle} ${isActive === index ? styles.animateSubtitle : ''}`}>
//                                     {slide.subtitle}
//                                 </p>
                                
//                                 {/* Title */}
//                                 {/* <div className={styles.titleWrapper}>
//                                     <h1 className={styles.title}>
//                                         <span className={`${styles.titleLine1} ${isActive === index ? styles.animateTitle1 : ''}`}>
//                                             {slide.titleLine1}
//                                         </span>
//                                         <span className={`${styles.titleLine2} ${isActive === index ? styles.animateTitle2 : ''}`}>
//                                             {slide.titleLine2}
//                                         </span>
//                                     </h1>
//                                 </div> */}
//                                 {/* Title */}
//                                 {/* Title */}
// <div className={styles.titleWrapper}>
//     <h1 className={styles.title}>
//         <span 
//             className={`${styles.titleLine1} ${isActive === index ? styles.animateTitle1 : ''}`}
//             dangerouslySetInnerHTML={{ __html: slide.titleLine1 }}
//         ></span>
//         <span className={`${styles.titleLine2} ${isActive === index ? styles.animateTitle2 : ''}`}>
//             {slide.titleLine2}
//         </span>
//     </h1>
// </div>


//                                 {/* Buttons */}
//                                 <div className={`${styles.buttons} ${isActive === index ? styles.animateButtons : ''}`}>
//                                     <Link to={slide.buttonLink}>
//                                         <Button 
//                                             type="primary" 
//                                             size="large"
//                                             className={styles.primaryBtn}
//                                             icon={<ArrowRightOutlined />}
//                                         >
//                                             {slide.buttonText}
//                                         </Button>
//                                     </Link>
//                                     <Link to="/about">
//                                         <Button 
//                                             size="large"
//                                             className={styles.secondaryBtn}
//                                         >
//                                             Learn More
//                                         </Button>
//                                         {/* <Button
//                     title="GET A FREE QUOTE"
//                     width="160px"
//                     height="40px"
//                     className="cta-button"
//                     style={{
//                       backgroundColor: "#00abc9",
//                       borderRadius: "5px",
//                       // border: "2px solid #ffffff",
//                       color: "#ffffff",
//                       fontSize: "11px",
//                       fontWeight: "600",
//                       letterSpacing: "0.5px",
//                     }}
//                     onClick={() => handleNavClick("contact-us-section")}
//                   /> */}
                                        
//                                     </Link>
//                                 </div>
//                             </div>
//                         </div>
//                     </SwiperSlide>
//                 ))}

//                 {/* Navigation */}
//                 <div className={`${styles.navigation} ${styles.prev}`}></div>
//                 <div className={`${styles.navigation} ${styles.next}`}></div>
                
//                 {/* Pagination */}
//                 <div className={styles.pagination}></div>
//             </Swiper>

//             {/* Scroll Indicator */}
//             <div className={styles.scrollIndicator}>
//                 <div className={styles.scrollArrow}></div>
//                 <span>Scroll Down</span>
//             </div>
//         </div>
//     );
// };

// export default Banner;




/////////////////////with Button//////////////////

// import React, { useState } from 'react';
// import { Swiper, SwiperSlide } from 'swiper/react';
// import { Autoplay, EffectFade, Pagination, Navigation } from 'swiper/modules';
// import { Link } from 'react-router-dom';
// import { ArrowRightOutlined, HeartOutlined, TeamOutlined, PlayCircleOutlined } from '@ant-design/icons';

// // Import images
// import HeroImageH0 from '../../assets/H0.jpg';
// import HeroImageH1 from '../../assets/H8.jpg';
// import HeroImageH2 from '../../assets/H7.jpg';
// import HeroImageH3 from '../../assets/H6.jpg';

// // Import Swiper styles
// import 'swiper/css';
// import 'swiper/css/effect-fade';
// import 'swiper/css/pagination';
// import 'swiper/css/navigation';

// // Import your CSS Module styles
// import styles from './Banner.module.css';
// import Button from '../Button/Button';

// // --- SLIDER DATA ---
// const slidesData = [
//     {
//         id: 1,
//         background: HeroImageH0,
//         titleLine1: 'Ala<span class="highlightM">m</span>gir Hossain',
//         titleLine2: 'City Welfare Association',
//         subtitle: 'Building a Better Community Together',
//         buttonText: 'Join Our Mission',
//         buttonLink: '/register',
//         badge: 'Non-Profit Organization',
//         icon: <HeartOutlined />,
//         buttonVariant: 'primary',
//         buttonIcon: <ArrowRightOutlined />
//     },
//     {
//         id: 2,
//         background: HeroImageH1,
//         titleLine1: 'Community',
//         titleLine2: 'Development Programs',
//         subtitle: 'Empowering Local Communities',
//         buttonText: 'View Programs',
//         buttonLink: '/programs',
//         badge: 'Social Welfare',
//         icon: <TeamOutlined />,
//         buttonVariant: 'primary',
//         buttonIcon: <ArrowRightOutlined />
//     },
//     {
//         id: 3,
//         background: HeroImageH2,
//         titleLine1: 'Volunteer &',
//         titleLine2: 'Make a Difference',
//         subtitle: 'Your Time Can Change Lives',
//         buttonText: 'Become Volunteer',
//         buttonLink: '/volunteer',
//         badge: 'Join Us',
//         icon: <PlayCircleOutlined />,
//         buttonVariant: 'primary',
//         buttonIcon: <ArrowRightOutlined />
//     },
//     {
//         id: 4,
//         background: HeroImageH3,
//         titleLine1: '<span class="emergencyText">Emergency</span> Relief',
//         titleLine2: '& Support',
//         subtitle: 'Helping When It Matters Most',
//         buttonText: 'Donate Now',
//         buttonLink: '/donate',
//         badge: 'Humanitarian Aid',
//         icon: <HeartOutlined />,
//         buttonVariant: 'primary',
//         buttonIcon: <ArrowRightOutlined />
//     }
// ];

// const Banner = () => {
//     const [isActive, setIsActive] = useState(0);

//     return (
//         <div className={styles.heroContainer}>
//             <Swiper
//                 modules={[Autoplay, EffectFade, Pagination, Navigation]}
//                 effect={'fade'}
//                 speed={1500}
//                 spaceBetween={0}
//                 slidesPerView={1}
//                 loop={true}
//                 autoplay={{
//                     delay: 5000,
//                     disableOnInteraction: false,
//                     pauseOnMouseEnter: true,
//                 }}
//                 pagination={{
//                     clickable: true,
//                     el: `.${styles.pagination}`,
//                     bulletClass: styles.bullet,
//                     bulletActiveClass: styles.bulletActive,
//                 }}
//                 navigation={{
//                     nextEl: `.${styles.next}`,
//                     prevEl: `.${styles.prev}`,
//                 }}
//                 onSlideChange={(swiper) => setIsActive(swiper.realIndex)}
//                 className={styles.swiper}
//             >
//                 {slidesData.map((slide, index) => (
//                     <SwiperSlide key={slide.id} className={styles.slide}>
//                         <div className={styles.background}>
//                             <img 
//                                 src={slide.background} 
//                                 alt={`Slide ${index + 1}`}
//                                 className={`${styles.backgroundImage} ${isActive === index ? styles.zoom : ''}`}
//                             />
//                             <div className={styles.overlay}></div>
//                         </div>

//                         {/* Content with Tailwind Container */}
//                         <div className={`${styles.content} container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl font-montserrat`}>
//                             <div className="max-w-4xl">
//                                 {/* Badge */}
//                                 <div className={`${styles.badge} ${isActive === index ? styles.animateBadge : ''}`}>
//                                     <span className={styles.badgeIcon}>{slide.icon}</span>
//                                     {slide.badge}
//                                 </div>
                                
//                                 {/* Subtitle */}
//                                 <p className={`${styles.subtitle} ${isActive === index ? styles.animateSubtitle : ''}`}>
//                                     {slide.subtitle}
//                                 </p>
                                
//                                 {/* Title */}
//                                 <div className={styles.titleWrapper}>
//                                     <h1 className={styles.title}>
//                                         <span 
//                                             className={`${styles.titleLine1} ${isActive === index ? styles.animateTitle1 : ''}`}
//                                             dangerouslySetInnerHTML={{ __html: slide.titleLine1 }}
//                                         ></span>
//                                         <span className={`${styles.titleLine2} ${isActive === index ? styles.animateTitle2 : ''}`}>
//                                             {slide.titleLine2}
//                                         </span>
//                                     </h1>
//                                 </div>

//                                 {/* Buttons */}
//                                 <div className={`${styles.buttons} ${isActive === index ? styles.animateButtons : ''}`}>
//                                     {/* Primary Button */}
//                                     <Button
//                                         title={slide.buttonText}
//                                         href={slide.buttonLink}
//                                         variant="primary"
//                                         icon={slide.buttonIcon}
//                                         width="220px"
//                                         height="50px"
//                                         style={{
//                                             // borderRadius: '8px',
//                                             // fontSize: '16px',
//                                             fontWeight: '600'
//                                         }}
//                                     />
                                    
//                                     {/* Secondary Button */}
//                                     <Button
//                                         title="Learn More"
//                                         href="/about"
//                                         variant="secondary"
//                                         width="160px"
//                                         height="50px"
//                                         style={{
//                                             // borderRadius: '8px',
//                                             // fontSize: '16px',
//                                             fontWeight: '600'
//                                         }}
//                                     />
//                                 </div>
//                             </div>
//                         </div>
//                     </SwiperSlide>
//                 ))}

//                 {/* Navigation */}
//                 <div className={`${styles.navigation} ${styles.prev}`}></div>
//                 <div className={`${styles.navigation} ${styles.next}`}></div>
                
//                 {/* Pagination */}
//                 <div className={styles.pagination}></div>
//             </Swiper>

//             {/* Scroll Indicator */}
//             <div className={styles.scrollIndicator}>
//                 <div className={styles.scrollArrow}></div>
//                 <span>Scroll Down</span>
//             </div>
//         </div>
//     );
// };

// export default Banner;


/////////////////with arrow add img///////////

import React, { useState, useMemo } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, EffectFade, Pagination, Navigation } from 'swiper/modules';
import { Link } from 'react-router-dom';
import { ArrowRightOutlined, HeartOutlined, TeamOutlined, PlayCircleOutlined } from '@ant-design/icons';

// Import images
import HeroImageH0 from '../../assets/H0.jpg';
import HeroImageH1 from '../../assets/H8.jpg';
import HeroImageH2 from '../../assets/H7.jpg';
import HeroImageH3 from '../../assets/H6.jpg';
import CompanyLogo from '../../assets/Ideal.png'; // Your company logo

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/effect-fade';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

// Import your CSS Module styles
import styles from './Banner.module.css';
import Button from '../Button/Button';

// --- SLIDER DATA ---
const slidesData = [
    {
        id: 1,
        background: HeroImageH0,
        titleLine1: 'Ala<span class="highlightM">m</span>gir Hossain',
        titleLine2: 'City Welfare Association',
        subtitle: 'Building a Better Community Together',
        buttonText: 'Join Our Mission',
        buttonLink: '/register',
        badge: 'Non-Profit Organization',
        icon: <HeartOutlined />,
        buttonVariant: 'primary',
        buttonIcon: <ArrowRightOutlined />
    },
    {
        id: 2,
        background: HeroImageH1,
        titleLine1: 'Community',
        titleLine2: 'Development Programs',
        subtitle: 'Empowering Local Communities',
        buttonText: 'View Programs',
        buttonLink: '/programs',
        badge: 'Social Welfare',
        icon: <TeamOutlined />,
        buttonVariant: 'primary',
        buttonIcon: <ArrowRightOutlined />
    },
    {
        id: 3,
        background: HeroImageH2,
        titleLine1: 'Volunteer &',
        titleLine2: 'Make a Difference',
        subtitle: 'Your Time Can Change Lives',
        buttonText: 'Become Volunteer',
        buttonLink: '/volunteer',
        badge: 'Join Us',
        icon: <PlayCircleOutlined />,
        buttonVariant: 'primary',
        buttonIcon: <ArrowRightOutlined />
    },
    {
        id: 4,
        background: HeroImageH3,
        titleLine1: '<span class="emergencyText">Emergency</span> Relief',
        titleLine2: '& Support',
        subtitle: 'Helping When It Matters Most',
        buttonText: 'Donate Now',
        buttonLink: '/donate',
        badge: 'Humanitarian Aid',
        icon: <HeartOutlined />,
        buttonVariant: 'primary',
        buttonIcon: <ArrowRightOutlined />
    }
];

// Helper function to calculate the next/prev slide index
const getNextSlideIndex = (currentIndex, length) => (currentIndex + 1) % length;
const getPrevSlideIndex = (currentIndex, length) => (currentIndex - 1 + length) % length;

const Banner = () => {
    const [isActive, setIsActive] = useState(0);
    
    // Calculate next and previous slide indexes based on the current active slide
    const nextIndex = useMemo(() => getNextSlideIndex(isActive, slidesData.length), [isActive]);
    const prevIndex = useMemo(() => getPrevSlideIndex(isActive, slidesData.length), [isActive]);

    return (
        <div className={styles.heroContainer}>
            <Swiper
                modules={[Autoplay, EffectFade, Pagination, Navigation]}
                effect={'fade'}
                speed={1500}
                spaceBetween={0}
                slidesPerView={1}
                loop={true}
                autoplay={{
                    delay: 5000,
                    disableOnInteraction: false,
                    pauseOnMouseEnter: true,
                }}
                pagination={{
                    clickable: true,
                    el: `.${styles.pagination}`,
                    bulletClass: styles.bullet,
                    bulletActiveClass: styles.bulletActive,
                }}
                navigation={{
                    nextEl: `.${styles.next}`,
                    prevEl: `.${styles.prev}`,
                }}
                onSlideChange={(swiper) => setIsActive(swiper.realIndex)}
                className={styles.swiper}
            >
                {slidesData.map((slide, index) => (
                    <SwiperSlide key={slide.id} className={styles.slide}>
                        <div className={styles.background}>
                            <img 
                                src={slide.background} 
                                alt={`Slide ${index + 1}`}
                                className={`${styles.backgroundImage} ${isActive === index ? styles.zoom : ''}`}
                            />
                            <div className={styles.overlay}></div>
                        </div>

                        {/* Content with Tailwind Container */}
                        <div className={`${styles.content} container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl font-montserrat`}>
                            <div className="max-w-4xl">
                                {/* Badge */}
                                <div className={`${styles.badge} ${isActive === index ? styles.animateBadge : ''}`}>
                                    <span className={styles.badgeIcon}>{slide.icon}</span>
                                    {slide.badge}
                                </div>
                                
                                {/* Subtitle */}
                                <p className={`${styles.subtitle} ${isActive === index ? styles.animateSubtitle : ''}`}>
                                    {slide.subtitle}
                                </p>
                                
                                {/* Title */}
                                <div className={styles.titleWrapper}>
                                    <h1 className={styles.title}>
                                        <span 
                                            className={`${styles.titleLine1} ${isActive === index ? styles.animateTitle1 : ''}`}
                                            dangerouslySetInnerHTML={{ __html: slide.titleLine1 }}
                                        ></span>
                                        <span className={`${styles.titleLine2} ${isActive === index ? styles.animateTitle2 : ''}`}>
                                            {slide.titleLine2}
                                        </span>
                                    </h1>
                                </div>

                                {/* Buttons */}
                                <div className={`${styles.buttons} ${isActive === index ? styles.animateButtons : ''}`}>
                                    {/* Primary Button */}
                                    <Button
                                        title={slide.buttonText}
                                        href={slide.buttonLink}
                                        variant="primary"
                                        icon={slide.buttonIcon}
                                        width="220px"
                                        height="50px"
                                        style={{
                                            fontWeight: '600'
                                        }}
                                    />
                                    
                                    {/* Secondary Button */}
                                    <Button
                                        title="Learn More"
                                        href="/about"
                                        variant="secondary"
                                        width="160px"
                                        height="50px"
                                        style={{
                                            fontWeight: '600'
                                        }}
                                    />
                                </div>
                            </div>
                        </div>
                    </SwiperSlide>
                ))}

                {/* Custom Navigation with Slide Preview on Hover */}
                <div 
                    className={`${styles.navigation} ${styles.prev}`}
                >
                    {/* Arrow Icon */}
                    {/* <svg className={styles.arrowIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg> */}
                    
                    {/* Preview Image for PREV Slide */}
                    <div className={styles.previewContainer}>
                        <img 
                            src={slidesData[prevIndex].background} 
                            alt={`Previous Slide Preview`} 
                            className={styles.previewImage}
                        />
                        <div className={styles.previewOverlay}></div>
                    </div>
                </div>

                <div 
                    className={`${styles.navigation} ${styles.next}`}
                >
                    {/* Arrow Icon */}
                    {/* <svg className={styles.arrowIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg> */}
                    
                    {/* Preview Image for NEXT Slide */}
                    <div className={styles.previewContainer}>
                        <img 
                            src={slidesData[nextIndex].background} 
                            alt={`Next Slide Preview`} 
                            className={styles.previewImage}
                        />
                        <div className={styles.previewOverlay}></div>
                    </div>
                </div>
                
                {/* Pagination */}
                <div className={styles.pagination}></div>
            </Swiper>

            {/* Scroll Indicator */}
            <div className={styles.scrollIndicator}>
                <div className={styles.scrollArrow}></div>
                <span>Scroll Down</span>
            </div>
        </div>
    );
};

export default Banner;







