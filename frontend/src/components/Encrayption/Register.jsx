
// import React, { useState } from 'react';
// import { Form, Input, Button, Select, Checkbox, message, Steps } from 'antd';
// import { 
//   UserOutlined, 
//   MailOutlined, 
//   LockOutlined, 
//   PhoneOutlined 
// } from '@ant-design/icons';
// // Import BuildingOutlined from the correct path
// import { BuildingOutlined } from '@ant-design/icons/lib/icons';
// import { Link, useNavigate } from 'react-router-dom';
// import AuthLayout from '../../layouts/AuthLayout';

// const { Option } = Select;
// const { Step } = Steps;

// const Register = () => {
//   const [loading, setLoading] = useState(false);
//   const [currentStep, setCurrentStep] = useState(0);
//   const [form] = Form.useForm();
//   const navigate = useNavigate();

//   const steps = [
//     {
//       title: 'Personal Info',
//       content: 'personal',
//     },
//     {
//       title: 'Business Info',
//       content: 'business',
//     },
//     {
//       title: 'Account Setup',
//       content: 'account',
//     },
//   ];

//   const onFinish = async (values) => {
//     setLoading(true);
//     try {
//       // Simulate API call
//       await new Promise(resolve => setTimeout(resolve, 1500));
//       console.log('Registration values:', values);
//       message.success('Registration successful!');
//       navigate('/dashboard');
//     } catch (error) {
//       message.error('Registration failed!');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const nextStep = () => {
//     setCurrentStep(currentStep + 1);
//   };

//   const prevStep = () => {
//     setCurrentStep(currentStep - 1);
//   };

//   const renderStepContent = () => {
//     switch (currentStep) {
//       case 0:
//         return (
//           <>
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//               <Form.Item
//                 label="First Name"
//                 name="firstName"
//                 rules={[{ required: true, message: 'Please input your first name!' }]}
//               >
//                 <Input 
//                   prefix={<UserOutlined className="text-gray-400" />}
//                   placeholder="First name"
//                   className="rounded-lg py-3"
//                 />
//               </Form.Item>

//               <Form.Item
//                 label="Last Name"
//                 name="lastName"
//                 rules={[{ required: true, message: 'Please input your last name!' }]}
//               >
//                 <Input 
//                   prefix={<UserOutlined className="text-gray-400" />}
//                   placeholder="Last name"
//                   className="rounded-lg py-3"
//                 />
//               </Form.Item>
//             </div>

//             <Form.Item
//               label="Email Address"
//               name="email"
//               rules={[
//                 { required: true, message: 'Please input your email!' },
//                 { type: 'email', message: 'Please enter a valid email!' }
//               ]}
//             >
//               <Input 
//                 prefix={<MailOutlined className="text-gray-400" />}
//                 placeholder="Enter your email"
//                 className="rounded-lg py-3"
//               />
//             </Form.Item>

//             <Form.Item
//               label="Phone Number"
//               name="phone"
//               rules={[{ required: true, message: 'Please input your phone number!' }]}
//             >
//               <Input 
//                 prefix={<PhoneOutlined className="text-gray-400" />}
//                 placeholder="+1 (555) 000-0000"
//                 className="rounded-lg py-3"
//               />
//             </Form.Item>
//           </>
//         );

//       case 1:
//         return (
//           <>
//             <Form.Item
//               label="Company Name"
//               name="companyName"
//               rules={[{ required: true, message: 'Please input your company name!' }]}
//             >
//               <Input 
//                 prefix={<BuildingOutlined className="text-gray-400" />}
//                 placeholder="Your company name"
//                 className="rounded-lg py-3"
//               />
//             </Form.Item>

//             <Form.Item
//               label="Industry"
//               name="industry"
//               rules={[{ required: true, message: 'Please select your industry!' }]}
//             >
//               <Select 
//                 placeholder="Select your industry"
//                 className="rounded-lg py-2"
//                 size="large"
//               >
//                 <Option value="finance">Finance & Banking</Option>
//                 <Option value="technology">Technology</Option>
//                 <Option value="healthcare">Healthcare</Option>
//                 <Option value="retail">Retail</Option>
//                 <Option value="manufacturing">Manufacturing</Option>
//                 <Option value="other">Other</Option>
//               </Select>
//             </Form.Item>

//             <Form.Item
//               label="Company Size"
//               name="companySize"
//               rules={[{ required: true, message: 'Please select company size!' }]}
//             >
//               <Select 
//                 placeholder="Select company size"
//                 className="rounded-lg py-2"
//                 size="large"
//               >
//                 <Option value="1-10">1-10 employees</Option>
//                 <Option value="11-50">11-50 employees</Option>
//                 <Option value="51-200">51-200 employees</Option>
//                 <Option value="201-500">201-500 employees</Option>
//                 <Option value="500+">500+ employees</Option>
//               </Select>
//             </Form.Item>
//           </>
//         );

//       case 2:
//         return (
//           <>
//             <Form.Item
//               label="Password"
//               name="password"
//               rules={[
//                 { required: true, message: 'Please input your password!' },
//                 { min: 8, message: 'Password must be at least 8 characters!' }
//               ]}
//             >
//               <Input.Password
//                 prefix={<LockOutlined className="text-gray-400" />}
//                 placeholder="Create a password"
//                 className="rounded-lg py-3"
//               />
//             </Form.Item>

//             <Form.Item
//               label="Confirm Password"
//               name="confirmPassword"
//               dependencies={['password']}
//               rules={[
//                 { required: true, message: 'Please confirm your password!' },
//                 ({ getFieldValue }) => ({
//                   validator(_, value) {
//                     if (!value || getFieldValue('password') === value) {
//                       return Promise.resolve();
//                     }
//                     return Promise.reject(new Error('Passwords do not match!'));
//                   },
//                 }),
//               ]}
//             >
//               <Input.Password
//                 prefix={<LockOutlined className="text-gray-400" />}
//                 placeholder="Confirm your password"
//                 className="rounded-lg py-3"
//               />
//             </Form.Item>

//             <Form.Item
//               name="agreement"
//               valuePropName="checked"
//               rules={[
//                 {
//                   validator: (_, value) =>
//                     value ? Promise.resolve() : Promise.reject(new Error('Please accept the terms and conditions')),
//                 },
//               ]}
//             >
//               <Checkbox>
//                 I agree to the{' '}
//                 <Link to="/terms" className="text-blue-600 hover:text-blue-700">
//                   Terms & Conditions
//                 </Link>{' '}
//                 and{' '}
//                 <Link to="/privacy" className="text-blue-600 hover:text-blue-700">
//                   Privacy Policy
//                 </Link>
//               </Checkbox>
//             </Form.Item>
//           </>
//         );

//       default:
//         return null;
//     }
//   };

//   return (
//     <AuthLayout
//       title="Create Your Account"
//       subtitle="Join thousands of businesses growing with Consulta"
//     >
//       {/* Progress Steps */}
//       <div className="mb-8">
//         <Steps current={currentStep} size="small" className="custom-steps">
//           {steps.map((step, index) => (
//             <Step key={index} title={step.title} />
//           ))}
//         </Steps>
//       </div>

//       <Form
//         form={form}
//         name="register"
//         onFinish={onFinish}
//         layout="vertical"
//         size="large"
//         requiredMark={false}
//         scrollToFirstError
//       >
//         {renderStepContent()}

//         {/* Navigation Buttons */}
//         <div className="flex justify-between mt-8">
//           {currentStep > 0 && (
//             <Button
//               onClick={prevStep}
//               className="h-12 px-8 rounded-lg border-gray-300 text-gray-700 font-medium"
//             >
//               Previous
//             </Button>
//           )}
          
//           {currentStep < steps.length - 1 ? (
//             <Button
//               onClick={nextStep}
//               type="primary"
//               className="h-12 px-8 rounded-lg bg-blue-600 hover:bg-blue-700 border-none font-medium ml-auto"
//             >
//               Next
//             </Button>
//           ) : (
//             <Button
//               type="primary"
//               htmlType="submit"
//               loading={loading}
//               className="h-12 px-8 rounded-lg bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 border-none shadow-lg hover:shadow-xl transition-all duration-300 font-semibold ml-auto"
//             >
//               Create Account
//             </Button>
//           )}
//         </div>

//         {/* Login Link */}
//         <div className="text-center mt-6 pt-6 border-t">
//           <span className="text-gray-600">
//             Already have an account?{' '}
//             <Link 
//               to="/login" 
//               className="text-blue-600 hover:text-blue-700 font-semibold transition-colors"
//             >
//               Sign in here
//             </Link>
//           </span>
//         </div>
//       </Form>
//     </AuthLayout>
//   );
// };

// export default Register;



//////////////FINAL/////////////////////////


// import React, { useState } from 'react';
// import { Link } from 'react-router-dom';

// const Register = () => {
//   const [formData, setFormData] = useState({
//     name: '',
//     email: '',
//     password: '',
//     confirmPassword: ''
//   });
//   const [showPassword, setShowPassword] = useState(false);
//   const [showConfirmPassword, setShowConfirmPassword] = useState(false);

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({
//       ...formData,
//       [name]: value
//     });
//   };

//   const handleRegister = (e) => {
//     e.preventDefault();
//     // Registration logic here
//     console.log('Registration attempt:', formData);
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
//       <div className="max-w-md w-full">
//         {/* Header */}
//         <div className="text-center mb-8">
//           <h1 className="text-3xl font-bold text-gray-900 mb-2">Create Account</h1>
//           <p className="text-gray-600">Join us today! Create your account to get started.</p>
//         </div>

//         {/* Registration Form */}
//         <div className="bg-white rounded-2xl shadow-2xl p-8">
//           <form onSubmit={handleRegister}>
//             {/* Name Field */}
//             <div className="mb-6">
//               <label 
//                 htmlFor="name" 
//                 className="block text-sm font-medium text-gray-700 mb-2"
//               >
//                 Full Name
//               </label>
//               <div className="relative">
//                 <input
//                   type="text"
//                   id="name"
//                   name="name"
//                   value={formData.name}
//                   onChange={handleInputChange}
//                   required
//                   className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
//                   placeholder="Enter your full name"
//                 />
//                 <div className="absolute inset-y-0 right-0 flex items-center pr-3">
//                   <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
//                   </svg>
//                 </div>
//               </div>
//             </div>

//             {/* Email Field */}
//             <div className="mb-6">
//               <label 
//                 htmlFor="email" 
//                 className="block text-sm font-medium text-gray-700 mb-2"
//               >
//                 Email Address
//               </label>
//               <div className="relative">
//                 <input
//                   type="email"
//                   id="email"
//                   name="email"
//                   value={formData.email}
//                   onChange={handleInputChange}
//                   required
//                   className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
//                   placeholder="Enter your email"
//                 />
//                 <div className="absolute inset-y-0 right-0 flex items-center pr-3">
//                   <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
//                   </svg>
//                 </div>
//               </div>
//             </div>

//             {/* Password Field */}
//             <div className="mb-6">
//               <label 
//                 htmlFor="password" 
//                 className="block text-sm font-medium text-gray-700 mb-2"
//               >
//                 Password
//               </label>
//               <div className="relative">
//                 <input
//                   type={showPassword ? "text" : "password"}
//                   id="password"
//                   name="password"
//                   value={formData.password}
//                   onChange={handleInputChange}
//                   required
//                   className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors pr-10"
//                   placeholder="Enter your password"
//                 />
//                 <button
//                   type="button"
//                   onClick={() => setShowPassword(!showPassword)}
//                   className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 hover:text-gray-600 transition-colors"
//                   aria-label={showPassword ? "Hide password" : "Show password"}
//                 >
//                   {showPassword ? (
//                     <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
//                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
//                     </svg>
//                   ) : (
//                     <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L6.59 6.59m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
//                     </svg>
//                   )}
//                 </button>
//               </div>
//             </div>

//             {/* Confirm Password Field */}
//             <div className="mb-6">
//               <label 
//                 htmlFor="confirmPassword" 
//                 className="block text-sm font-medium text-gray-700 mb-2"
//               >
//                 Confirm Password
//               </label>
//               <div className="relative">
//                 <input
//                   type={showConfirmPassword ? "text" : "password"}
//                   id="confirmPassword"
//                   name="confirmPassword"
//                   value={formData.confirmPassword}
//                   onChange={handleInputChange}
//                   required
//                   className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors pr-10"
//                   placeholder="Confirm your password"
//                 />
//                 <button
//                   type="button"
//                   onClick={() => setShowConfirmPassword(!showConfirmPassword)}
//                   className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 hover:text-gray-600 transition-colors"
//                   aria-label={showConfirmPassword ? "Hide password" : "Show password"}
//                 >
//                   {showConfirmPassword ? (
//                     <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
//                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
//                     </svg>
//                   ) : (
//                     <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L6.59 6.59m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
//                     </svg>
//                   )}
//                 </button>
//               </div>
//             </div>

//             {/* Terms Agreement */}
//             <div className="mb-6">
//               <div className="flex items-center">
//                 <input
//                   id="terms"
//                   name="terms"
//                   type="checkbox"
//                   required
//                   className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
//                 />
//                 <label htmlFor="terms" className="ml-2 block text-sm text-gray-700">
//                   I agree to the{' '}
//                   <a href="#" className="text-blue-600 hover:text-blue-500 transition-colors">
//                     Terms of Service
//                   </a>{' '}
//                   and{' '}
//                   <a href="#" className="text-blue-600 hover:text-blue-500 transition-colors">
//                     Privacy Policy
//                   </a>
//                 </label>
//               </div>
//             </div>

//             {/* Register Button */}
//             <button
//               type="submit"
//               className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg font-semibold hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
//             >
//               Create Account
//             </button>
//           </form>

//           {/* Sign In Link */}
//           <div className="mt-6 text-center">
//             <p className="text-gray-600">
//               Already have an account?{' '}
//               <Link 
//                 to="/login" 
//                 className="font-medium text-blue-600 hover:text-blue-500 transition-colors"
//               >
//                 Sign in
//               </Link>
//             </p>
//           </div>
//         </div>

//         {/* Footer */}
//         <div className="mt-8 text-center">
//           <p className="text-gray-500 text-sm">
//             &copy; 2023 Financial Consulting. All rights reserved.
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Register;




import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { message } from 'antd';

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [loading, setLoading] = useState(false);
  const { register } = useAuth();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    
    if (formData.password !== formData.confirmPassword) {
      message.error('Passwords do not match');
      return;
    }

    setLoading(true);

    try {
      // Simulate registration
      setTimeout(() => {
        const userData = {
          name: formData.name,
          email: formData.email
        };
        
        register(userData);
        message.success('Registration successful! Please login.');
        navigate('/login'); // Redirect to login page after registration
      }, 1000);
      
    } catch (error) {
      message.error('Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleRegister}>
                 {/* Name Field */}
            <div className="mb-6">
              <label 
                htmlFor="name" 
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Full Name
              </label>
              <div className="relative">
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                  placeholder="Enter your full name"
                />
                <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                  <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
              </div>
            </div>

            {/* Email Field */}
            <div className="mb-6">
              <label 
                htmlFor="email" 
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Email Address
              </label>
              <div className="relative">
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                  placeholder="Enter your email"
                />
                <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                  <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
              </div>
            </div>

            {/* Password Field */}
            <div className="mb-6">
              <label 
                htmlFor="password" 
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors pr-10"
                  placeholder="Enter your password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 hover:text-gray-600 transition-colors"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                  ) : (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L6.59 6.59m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                    </svg>
                  )}
                </button>
              </div>
            </div>

            {/* Confirm Password Field */}
            <div className="mb-6">
              <label 
                htmlFor="confirmPassword" 
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Confirm Password
              </label>
              <div className="relative">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  id="confirmPassword"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors pr-10"
                  placeholder="Confirm your password"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 hover:text-gray-600 transition-colors"
                  aria-label={showConfirmPassword ? "Hide password" : "Show password"}
                >
                  {showConfirmPassword ? (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                  ) : (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L6.59 6.59m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                    </svg>
                  )}
                </button>
              </div>
            </div>

            {/* Terms Agreement */}
            <div className="mb-6">
              <div className="flex items-center">
                <input
                  id="terms"
                  name="terms"
                  type="checkbox"
                  required
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <label htmlFor="terms" className="ml-2 block text-sm text-gray-700">
                  I agree to the{' '}
                  <a href="#" className="text-blue-600 hover:text-blue-500 transition-colors">
                    Terms of Service
                  </a>{' '}
                  and{' '}
                  <a href="#" className="text-blue-600 hover:text-blue-500 transition-colors">
                    Privacy Policy
                  </a>
                </label>
              </div>
            </div>

      
      <button
        type="submit"
        className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg font-semibold hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors disabled:opacity-50"
        disabled={loading}
      >
        {loading ? 'Creating Account...' : 'Create Account'}
      </button>

      <div className="mt-6 text-center">
        <p className="text-gray-600">
          Already have an account?{' '}
          <Link 
            to="/login" 
            className="font-medium text-blue-600 hover:text-blue-500 transition-colors"
          >
            Sign in
          </Link>
        </p>
      </div>
    </form>
  );
};

export default Register;



