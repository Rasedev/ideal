


// AuthLayout.jsx (Modern, Cleaned Version)
import { Card, Row, Col } from 'antd'; // Removed 'import React from 'react';'
import Header from '../components/Header/Header';
import Footer from '../components/Footer/Footer';

const AuthLayout = ({ children, title, subtitle, sideImage = true }) => {
// ... The function body remains exactly the same ...
// ... because the syntax is already correct ...
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />
      
      <main className="flex-1 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto w-full">
          <Row gutter={[48, 48]} align="middle" className="min-h-[70vh]">
            {/* Left Side - Form */}
            <Col xs={24} lg={12} xl={10}>
              <div className="max-w-md mx-auto lg:mx-0 lg:max-w-full">
                <div className="text-center lg:text-left mb-8">
                  <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-3">
                    {title}
                  </h1>
                  <p className="text-lg text-gray-600">
                    {subtitle}
                  </p>
                </div>
                
                <Card 
                  className="shadow-2xl border-0 rounded-2xl overflow-hidden"
                  styles={{ padding: '40px' }}
                >
                  {children}
                </Card>
              </div>
            </Col>

            {/* Right Side - Image/Graphics */}
            {sideImage && (
              <Col xs={24} lg={12} xl={14}>
                <div className="relative h-full min-h-[400px] lg:min-h-[500px] rounded-2xl overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-600 to-purple-700 rounded-2xl">
                    <div className="absolute inset-0 flex items-center justify-center p-8">
                      <div className="text-white text-center max-w-lg">
                        <div className="text-5xl mb-6">🚀</div>
                        <h2 className="text-3xl lg:text-4xl font-bold mb-4">
                          Join Thousands of Successful Businesses
                        </h2>
                        <p className="text-xl opacity-90 mb-6">
                          Get access to premium financial consulting services and grow your business exponentially.
                        </p>
                        <div className="space-y-3 text-left">
                          {[
                            'Expert financial advisors',
                            '24/7 customer support',
                            'Secure & reliable platform',
                            'Custom business solutions'
                          ].map((feature, index) => (
                            <div key={index} className="flex items-center space-x-3">
                              <div className="w-2 h-2 bg-white rounded-full"></div>
                              <span className="text-lg">{feature}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </Col>
            )}
          </Row>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default AuthLayout;





