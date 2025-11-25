





// import React from 'react';
// import { Button, Row, Col, Card, Statistic } from 'antd';
// import { ArrowRightOutlined, CheckCircleOutlined } from '@ant-design/icons';
// import { Link } from 'react-router-dom';
// import MainLayout from '../../layouts/MainLayout';

// const Home = () => {
//   return (
//     <MainLayout>
//       {/* Hero Section */}
//       {/* <section className="bg-gradient-to-br from-blue-50 to-indigo-100 py-20">
//         <div className="container mx-auto px-4 md-px-5 pt-28">
//           <Row gutter={[48, 48]} align="middle">
//             <Col xs={24} lg={12}>
//               <div className="text-center lg:text-left">
//                 <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 mb-6">
//                   Professional 
//                   <span className="text-blue-600"> Financial </span>
//                   Consulting
//                 </h1>
//                 <p className="text-xl text-gray-600 mb-8 leading-relaxed">
//                   Empower your business with expert financial guidance. 
//                   We provide comprehensive consulting services to help you 
//                   achieve sustainable growth and financial success.
//                 </p>
//                 <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
//                   <Link to="/register">
//                     <Button 
//                       type="primary" 
//                       size="large"
//                       className="h-14 px-8 text-lg font-semibold bg-blue-600 hover:bg-blue-700 border-none rounded-lg"
//                     >
//                       Get Started Free
//                       <ArrowRightOutlined className="ml-2" />
//                     </Button>
//                   </Link>
//                   <Link to="/login">
//                     <Button 
//                       size="large"
//                       className="h-14 px-8 text-lg font-semibold border-blue-600 text-blue-600 hover:border-blue-700 hover:text-blue-700 rounded-lg"
//                     >
//                       Sign In
//                     </Button>
//                   </Link>
//                 </div>
//               </div>
//             </Col>
//             <Col xs={24} lg={12}>
//               <div className="relative">
//                 <div className="bg-white rounded-2xl p-8 shadow-2xl">
//                   <div className="text-center">
//                     <div className="text-6xl mb-4">💼</div>
//                     <h3 className="text-2xl font-bold text-gray-900 mb-4">
//                       Ready to Transform Your Business?
//                     </h3>
//                     <p className="text-gray-600 mb-6">
//                       Join thousands of successful businesses that trust our financial expertise.
//                     </p>
//                     <div className="space-y-3 text-left">
//                       {[
//                         'No credit card required',
//                         '14-day free trial',
//                         'Cancel anytime',
//                         'Expert support included'
//                       ].map((feature, index) => (
//                         <div key={index} className="flex items-center space-x-3">
//                           <CheckCircleOutlined className="text-green-500 text-lg" />
//                           <span className="text-gray-700">{feature}</span>
//                         </div>
//                       ))}
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </Col>
//           </Row>
//         </div>
//       </section> */}

//       {/* Stats Section */}
//       <section className="py-16 bg-white">
//         <div className="container mx-auto px-4">
//           <Row gutter={[32, 32]}>
//             <Col xs={24} sm={8}>
//               <Card className="text-center border-0 shadow-lg">
//                 <Statistic
//                   title="Happy Clients"
//                   value={10000}
//                   suffix="+"
//                   valueStyle={{ color: '#1890ff' }}
//                 />
//               </Card>
//             </Col>
//             <Col xs={24} sm={8}>
//               <Card className="text-center border-0 shadow-lg">
//                 <Statistic
//                   title="Projects Completed"
//                   value={25000}
//                   suffix="+"
//                   valueStyle={{ color: '#52c41a' }}
//                 />
//               </Card>
//             </Col>
//             <Col xs={24} sm={8}>
//               <Card className="text-center border-0 shadow-lg">
//                 <Statistic
//                   title="Years Experience"
//                   value={15}
//                   suffix="+"
//                   valueStyle={{ color: '#fa8c16' }}
//                 />
//               </Card>
//             </Col>
//           </Row>
//         </div>
//       </section>

//       {/* CTA Section */}
//       <section className="py-20 bg-gray-900">
//         <div className="container mx-auto px-4 text-center">
//           <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">
//             Ready to Get Started?
//           </h2>
//           <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
//             Join our community of successful businesses and take your financial management to the next level.
//           </p>
//           <div className="flex flex-col sm:flex-row gap-4 justify-center">
//             <Link to="/register">
//               <Button 
//                 type="primary" 
//                 size="large"
//                 className="h-14 px-8 text-lg font-semibold bg-blue-600 hover:bg-blue-700 border-none rounded-lg"
//               >
//                 Create Free Account
//               </Button>
//             </Link>
//             <Link to="/login">
//               <Button 
//                 size="large"
//                 className="h-14 px-8 text-lg font-semibold border-white text-white hover:border-gray-300 hover:text-gray-300 rounded-lg"
//               >
//                 Sign In to Account
//               </Button>
//             </Link>
//           </div>
//         </div>
//       </section>
//     </MainLayout>
//   );
// };

// export default Home;





import React from 'react';
import { Button, Row, Col, Card, Statistic, Timeline } from 'antd';
import { 
  ArrowRightOutlined, 
  CheckCircleOutlined, 
  UserOutlined, 
  LogoutOutlined,
  HeartFilled,
  TeamOutlined,
  TrophyOutlined,
  GlobalOutlined
} from '@ant-design/icons';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import MainLayout from '../../layouts/MainLayout';
import HeroSlider from '../Banner/Banner';

const Home = () => {
  const { user, logout } = useAuth();

  const features = [
    {
      icon: <TeamOutlined className="text-3xl text-green-600" />,
      title: "Community Building",
      description: "Bringing people together for collective growth and social harmony."
    },
    {
      icon: <HeartFilled className="text-3xl text-red-500" />,
      title: "Social Welfare",
      description: "Providing support to underprivileged families and individuals."
    },
    {
      icon: <TrophyOutlined className="text-3xl text-blue-600" />,
      title: "Youth Development",
      description: "Empowering youth through education and skill development."
    },
    {
      icon: <GlobalOutlined className="text-3xl text-purple-600" />,
      title: "Environmental Care",
      description: "Promoting environmental awareness and sustainability."
    }
  ];

  const upcomingEvents = [
    {
      children: 'Community Health Camp - Free medical checkups',
      color: 'green'
    },
    {
      children: 'Youth Career Guidance Workshop',
      color: 'blue'
    },
    {
      children: 'Tree Plantation Drive - Green City Initiative',
      color: 'green'
    },
    {
      children: 'Elderly Support Program - Winter aid distribution',
      color: 'orange'
    },
    {
      children: 'Annual Cultural Festival 2024',
      color: 'purple'
    }
  ];

  const handleLogout = () => {
    logout();
  };

  return (
    <MainLayout>
      {/* Hero Slider Section */}
      <section className="relative">
        <HeroSlider />
        
        {/* User Info Banner */}
        {user && (
          <div className="absolute top-4 left-1/2 transform -translate-x-1/2 z-20">
            <div className="bg-white bg-opacity-90 backdrop-blur-sm rounded-full px-6 py-3 shadow-lg">
              <div className="flex items-center space-x-3">
                <UserOutlined className="text-green-600" />
                <span className="text-gray-800 font-semibold">
                  Welcome, <span className="text-green-600">{user.name}</span>
                </span>
                <Button 
                  size="small" 
                  icon={<LogoutOutlined />}
                  onClick={handleLogout}
                  className="border-green-600 text-green-600 hover:bg-green-600 hover:text-white"
                >
                  Logout
                </Button>
              </div>
            </div>
          </div>
        )}
      </section>

      {/* Mission Statement Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-4xl mx-auto mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Our <span className="text-green-600">Mission</span>
            </h2>
            <p className="text-xl text-gray-600 leading-relaxed">
              Alamgir Hossain City Welfare Association is dedicated to creating sustainable social impact 
              through community development, education, healthcare, and environmental initiatives. 
              We believe in empowering individuals and building a compassionate society.
            </p>
          </div>

          {/* Features Grid */}
          <Row gutter={[32, 32]} className="mb-16">
            {features.map((feature, index) => (
              <Col xs={24} md={12} lg={6} key={index}>
                <Card 
                  className="text-center border-0 shadow-lg hover:shadow-xl transition-all duration-300 h-full"
                  bodyStyle={{ padding: '40px 24px' }}
                >
                  <div className="mb-4">{feature.icon}</div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600">
                    {feature.description}
                  </p>
                </Card>
              </Col>
            ))}
          </Row>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-gradient-to-br from-green-50 to-blue-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Our <span className="text-green-600">Impact</span>
            </h2>
            <p className="text-xl text-gray-600">
              Making a difference in the community, one life at a time
            </p>
          </div>
          
          <Row gutter={[32, 32]}>
            <Col xs={24} sm={8}>
              <Card className="text-center border-0 shadow-lg bg-white">
                <Statistic
                  title="Community Members"
                  value={1500}
                  suffix="+"
                  valueStyle={{ color: '#10B981' }}
                  prefix={<TeamOutlined />}
                />
              </Card>
            </Col>
            <Col xs={24} sm={8}>
              <Card className="text-center border-0 shadow-lg bg-white">
                <Statistic
                  title="Projects Completed"
                  value={75}
                  suffix="+"
                  valueStyle={{ color: '#3B82F6' }}
                  prefix={<CheckCircleOutlined />}
                />
              </Card>
            </Col>
            <Col xs={24} sm={8}>
              <Card className="text-center border-0 shadow-lg bg-white">
                <Statistic
                  title="Years of Service"
                  value={12}
                  suffix="+"
                  valueStyle={{ color: '#8B5CF6' }}
                  prefix={<TrophyOutlined />}
                />
              </Card>
            </Col>
          </Row>
        </div>
      </section>

      {/* Upcoming Events & CTA Section */}
      <section className="py-20 bg-gray-900">
        <div className="container mx-auto px-4">
          <Row gutter={[48, 48]} align="middle">
            <Col xs={24} lg={12}>
              <div className="text-white">
                <h2 className="text-3xl lg:text-4xl font-bold mb-6">
                  Upcoming <span className="text-green-400">Events</span>
                </h2>
                <p className="text-xl text-gray-300 mb-8">
                  Join us in our upcoming community initiatives and make a difference
                </p>
                <Timeline items={upcomingEvents} />
              </div>
            </Col>
            
            <Col xs={24} lg={12}>
              <div className="bg-white rounded-2xl p-8 shadow-2xl">
                <div className="text-center">
                  <HeartFilled className="text-5xl text-green-600 mb-4" />
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">
                    Ready to Make a Difference?
                  </h3>
                  <p className="text-gray-600 mb-6">
                    Join Alamgir Hossain City Welfare Association and be part of our mission to create positive change.
                  </p>
                  <div className="space-y-3 text-left mb-6">
                    {[
                      'Community volunteer opportunities',
                      'Skill development programs',
                      'Social welfare initiatives',
                      'Environmental conservation projects'
                    ].map((feature, index) => (
                      <div key={index} className="flex items-center space-x-3">
                        <CheckCircleOutlined className="text-green-500 text-lg" />
                        <span className="text-gray-700">{feature}</span>
                      </div>
                    ))}
                  </div>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    {!user ? (
                      <>
                        <Link to="/register">
                          <Button 
                            type="primary" 
                            size="large"
                            className="h-12 px-6 text-base font-semibold bg-green-600 hover:bg-green-700 border-none rounded-lg"
                          >
                            Join Our Community
                          </Button>
                        </Link>
                        <Link to="/login">
                          <Button 
                            size="large"
                            className="h-12 px-6 text-base font-semibold border-green-600 text-green-600 hover:border-green-700 hover:text-green-700 rounded-lg"
                          >
                            Member Login
                          </Button>
                        </Link>
                      </>
                    ) : (
                      <Link to="/dashboard">
                        <Button 
                          type="primary" 
                          size="large"
                          className="h-12 px-6 text-base font-semibold bg-blue-600 hover:bg-blue-700 border-none rounded-lg"
                        >
                          Go to Dashboard
                        </Button>
                      </Link>
                    )}
                  </div>
                </div>
              </div>
            </Col>
          </Row>
        </div>
      </section>

      {/* Partners Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Our <span className="text-green-600">Partners</span>
            </h2>
            <p className="text-xl text-gray-600">
              Working together with organizations that share our vision
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-8 items-center opacity-60">
            {[1, 2, 3, 4, 5, 6].map((item) => (
              <div key={item} className="text-center p-4">
                <div className="h-16 bg-gray-200 rounded-lg flex items-center justify-center">
                  <span className="text-gray-500 font-semibold">Partner {item}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </MainLayout>
  );
};

export default Home;





