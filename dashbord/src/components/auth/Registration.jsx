
///////////////////Corrected Version///////////////////////

// import { useState, useEffect } from "react";
// import { useNavigate, Link } from "react-router-dom";
// import { 
//   Form, 
//   Input, 
//   Button, 
//   Alert, 
//   Select, 
//   Steps, 
//   Card, 
//   Divider, 
//   message as antMessage,
//   Row,
//   Col,
//   Grid,
//   Spin
// } from "antd";
// import { 
//   MailOutlined, 
//   LockOutlined, 
//   UserOutlined, 
//   PhoneOutlined,
//   EyeInvisibleOutlined, 
//   EyeTwoTone,
//   EnvironmentOutlined,
//   ArrowLeftOutlined,
//   ArrowRightOutlined,
//   LoadingOutlined
// } from "@ant-design/icons";
// import { apiService } from "../../services/apiService"; 
// import { setCurrentUser } from "../slices/userSlice";

// const { Option } = Select;
// const { Step } = Steps;
// const { useBreakpoint } = Grid;

// const Registration = () => {
//   const [form] = Form.useForm();
//   const [loading, setLoading] = useState(false);
//   const [currentStep, setCurrentStep] = useState(0);
//   const [message, setMessage] = useState({ type: "", text: "" });
//   const [formData, setFormData] = useState({});
//   const [verificationStatus, setVerificationStatus] = useState('pending');
//   const screens = useBreakpoint();
  
//   const navigate = useNavigate();

//   const steps = [
//     { title: screens.md ? 'Account Info' : 'Account', icon: <UserOutlined /> },
//     { title: screens.md ? 'Contact Details' : 'Contact', icon: <EnvironmentOutlined /> },
//     { title: screens.md ? 'Verify Email' : 'Verify', icon: <MailOutlined /> },
//   ];

//   const associationRoles = [
//     { value: "Member", label: "👥 General Member", description: "Regular association member" },
//     { value: "ExecutiveMember", label: "💼 Executive Member", description: "Committee executive member" },
//     { value: "PlotOwner", label: "🏠 Plot Owner", description: "Association plot owner" },
//     { value: "Employee", label: "👨‍💼 Employee", description: "Association employee" },
//     { value: "President", label: "🎖️ President", description: "Association President" },
//     { value: "VicePresident", label: "🎖️ Vice President", description: "Association Vice President" },
//     { value: "GeneralSecretary", label: "📝 General Secretary", description: "General Secretary" },
//     { value: "FinanceSecretary", label: "💰 Finance Secretary", description: "Finance Secretary" },
//   ];

  
// const handleRegistrationSuccess = (responseData) => {
//   // This will be called after successful email verification
//   console.log("🎉 Registration completed successfully:", responseData);
  
//   // If registration returns token/user directly (some APIs do this)
//   if (responseData.token && responseData.user) {
//     const saved = authStorage.saveSession(responseData.token, responseData.user);
//     if (saved) {
//       console.log("✅ Auto-login after registration");
//       dispatch(setCurrentUser(responseData.user));
//       navigate("/", { replace: true });
//     }
//   }
// };

//   // Handle registration using your API service
//   const handleRegistration = async (values) => {
//     setLoading(true);
//     setMessage({ type: '', text: '' });

//     try {
//       // Basic client-side validation
//       if (values.password !== values.confirmPassword) {
//         setMessage({ type: 'error', text: 'Passwords do not match' });
//         setLoading(false);
//         return;
//       }

//       if (values.password.length < 6) {
//         setMessage({ type: 'error', text: 'Password must be at least 6 characters' });
//         setLoading(false);
//         return;
//       }

//       const registrationData = {
//         firstName: values.firstName?.trim(),
//         lastName: values.lastName?.trim(),
//         email: values.email?.toLowerCase().trim(),
//         telephone: values.telephone,
//         addressOne: values.addressOne,
//         city: values.city,
//         division: values.division,
//         password: values.password,
//         role: values.role || 'Member',
//         postCode: values.postCode,
//         addressTwo: values.addressTwo,
//         district: values.district
//       };

//       console.log("📤 Sending registration data:", registrationData);

//       // ✅ FIXED: Use the correct API service structure
//       const response = await apiService.authentication.registration(registrationData);

//       console.log("✅ Registration response:", response);

//       if (response.data.success) {
//         setMessage({ 
//           type: 'success', 
//           text: response.data.success || 'Registration successful! Please check your email for verification.' 
//         });
        
//         // Store temporary data for verification step
//         localStorage.setItem('pendingVerificationEmail', values.email);
        
//         setVerificationStatus('sent');
//         setCurrentStep(2); // Move to verification step
        
//         antMessage.success("Registration successful! Please check your email for verification.");
        
//         // Clear form data
//         setFormData({});
//         form.resetFields();
//          // ✅ CALL SUCCESS HANDLER
//       handleRegistrationSuccess(response.data);
//       }
//     } catch (error) {
//       console.error('❌ Registration error:', error);
//       const errorMessage = error.response?.data?.error || 'Registration failed. Please try again.';
//       setMessage({ type: 'error', text: errorMessage });
//       antMessage.error(errorMessage);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const onFinish = async (values) => {
//     // Combine data from all steps
//     const finalData = {
//       ...formData,
//       ...values,
//       role: values.role || formData.role || "Member",
//     };

//     console.log("🎯 Final registration data:", finalData);
//     await handleRegistration(finalData);
//   };

//   const nextStep = async () => {
//     try {
//       // Validate current step fields only
//       const currentStepFields = getCurrentStepFields();
//       const values = await form.validateFields(currentStepFields);
      
//       // Store the current step data
//       setFormData(prev => ({ ...prev, ...values }));
      
//       setCurrentStep(currentStep + 1);
//       window.scrollTo({ top: 0, behavior: 'smooth' });
//     } catch (error) {
//       console.log('Validation failed:', error);
//       antMessage.warning('Please fill in all required fields correctly.');
//     }
//   };

//   const prevStep = () => {
//     // Store current step data before going back
//     const currentStepFields = getCurrentStepFields();
//     form.validateFields(currentStepFields).then(values => {
//       setFormData(prev => ({ ...prev, ...values }));
//     }).catch(() => {
//       // Ignore validation errors when going back
//     });
    
//     setCurrentStep(currentStep - 1);
//     window.scrollTo({ top: 0, behavior: 'smooth' });
//   };

//   // Get fields for current step only
//   const getCurrentStepFields = () => {
//     switch (currentStep) {
//       case 0:
//         return ['firstName', 'lastName', 'email', 'password', 'confirmPassword', 'role'];
//       case 1:
//         return ['telephone', 'addressOne', 'city', 'division'];
//       default:
//         return [];
//     }
//   };

//   // Set form values when switching steps
//   useEffect(() => {
//     if (currentStep < 2) {
//       form.setFieldsValue(formData);
//     }
//   }, [currentStep, formData]);

//   const resendVerificationEmail = async () => {
//     try {
//       setLoading(true);
//       // Re-submit registration to resend verification email
//       const email = localStorage.getItem('pendingVerificationEmail') || formData.email;
      
//       if (!email) {
//         antMessage.error("No email found for verification resend.");
//         return;
//       }

//       const response = await apiService.authentication.registration({
//         ...formData,
//         email: email
//       });
      
//       if (response.data.success) {
//         antMessage.success("Verification email sent again!");
//       }
//     } catch (error) {
//       console.error('❌ Resend verification error:', error);
//       antMessage.error("Failed to resend verification email.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const renderStepContent = () => {
//     switch (currentStep) {
//       case 0:
//         return (
//           <div className="space-y-4 lg:space-y-6">
//             {/* Header */}
//             <div className="text-center mb-4 lg:mb-6">
//               <h3 className="text-xl lg:text-2xl font-bold text-gray-900">
//                 Join Our Association
//               </h3>
//               <p className="text-gray-600 text-sm lg:text-base">
//                 Register as a member of Alamgir Hossain City Kallan Samity
//               </p>
//             </div>

//             <Row gutter={[16, 0]}>
//               <Col xs={24} sm={12}>
//                 <Form.Item
//                   name="firstName"
//                   label="First Name"
//                   rules={[
//                     { required: true, message: "Please enter first name" },
//                     { min: 2, message: "First name must be at least 2 characters" }
//                   ]}
//                 >
//                   <Input
//                     prefix={<UserOutlined className="text-gray-400" />}
//                     placeholder="Enter your first name"
//                     size="large"
//                     className="rounded-lg lg:rounded-xl"
//                   />
//                 </Form.Item>
//               </Col>
//               <Col xs={24} sm={12}>
//                 <Form.Item
//                   name="lastName"
//                   label="Last Name"
//                   rules={[
//                     { required: true, message: "Please enter last name" },
//                     { min: 2, message: "Last name must be at least 2 characters" }
//                   ]}
//                 >
//                   <Input
//                     prefix={<UserOutlined className="text-gray-400" />}
//                     placeholder="Enter your last name"
//                     size="large"
//                     className="rounded-lg lg:rounded-xl"
//                   />
//                 </Form.Item>
//               </Col>
//             </Row>

//             <Form.Item
//               name="email"
//               label="Email Address"
//               rules={[
//                 { required: true, message: "Please enter email address" },
//                 { type: "email", message: "Please enter valid email address" },
//               ]}
//             >
//               <Input
//                 prefix={<MailOutlined className="text-gray-400" />}
//                 placeholder="your.email@example.com"
//                 size="large"
//                 className="rounded-lg lg:rounded-xl"
//               />
//             </Form.Item>

//             <Form.Item
//               name="role"
//               label="Member Type"
//               initialValue="Member"
//               rules={[{ required: true, message: "Please select member type" }]}
//             >
//               <Select 
//                 size="large" 
//                 className="rounded-lg lg:rounded-xl"
//                 placeholder="Select your member type"
//               >
//                 {associationRoles.map(role => (
//                   <Option key={role.value} value={role.value}>
//                     <div className="py-1 min-w-0">
//                       <div className="font-medium text-sm lg:text-base truncate">{role.label}</div>
//                       <div className="text-xs text-gray-500 truncate">{role.description}</div>
//                     </div>
//                   </Option>
//                 ))}
//               </Select>
//             </Form.Item>

//             <Row gutter={[16, 0]}>
//               <Col xs={24} sm={12}>
//                 <Form.Item
//                   name="password"
//                   label="Password"
//                   rules={[
//                     { required: true, message: "Please create password" },
//                     { min: 6, message: "Password must be at least 6 characters" },
//                   ]}
//                 >
//                   <Input.Password
//                     prefix={<LockOutlined className="text-gray-400" />}
//                     placeholder="Create strong password"
//                     size="large"
//                     className="rounded-lg lg:rounded-xl"
//                     iconRender={(visible) =>
//                       visible ? <EyeTwoTone className="text-green-500" /> : <EyeInvisibleOutlined className="text-gray-400" />
//                     }
//                   />
//                 </Form.Item>
//               </Col>
//               <Col xs={24} sm={12}>
//                 <Form.Item
//                   name="confirmPassword"
//                   label="Confirm Password"
//                   dependencies={['password']}
//                   rules={[
//                     { required: true, message: "Please confirm password" },
//                     ({ getFieldValue }) => ({
//                       validator(_, value) {
//                         if (!value || getFieldValue('password') === value) {
//                           return Promise.resolve();
//                         }
//                         return Promise.reject(new Error('Passwords do not match'));
//                       },
//                     }),
//                   ]}
//                 >
//                   <Input.Password
//                     prefix={<LockOutlined className="text-gray-400" />}
//                     placeholder="Confirm your password"
//                     size="large"
//                     className="rounded-lg lg:rounded-xl"
//                     iconRender={(visible) =>
//                       visible ? <EyeTwoTone className="text-green-500" /> : <EyeInvisibleOutlined className="text-gray-400" />
//                     }
//                   />
//                 </Form.Item>
//               </Col>
//             </Row>
//           </div>
//         );

//       case 1:
//         return (
//           <div className="space-y-4 lg:space-y-6">
//             <div className="text-center mb-4 lg:mb-6">
//               <h3 className="text-xl lg:text-2xl font-bold text-gray-900">
//                 Contact Information
//               </h3>
//               <p className="text-gray-600 text-sm lg:text-base">
//                 Provide your contact details
//               </p>
//             </div>

//             <Form.Item
//               name="telephone"
//               label="Phone Number"
//               rules={[
//                 { required: true, message: "Please enter phone number" },
//                 { pattern: /^[0-9+\-\s()]{10,}$/, message: "Please enter valid phone number" }
//               ]}
//             >
//               <Input
//                 prefix={<PhoneOutlined className="text-gray-400" />}
//                 placeholder="+880 1XXX-XXXXXX"
//                 size="large"
//                 className="rounded-lg lg:rounded-xl"
//               />
//             </Form.Item>

//             <Form.Item
//               name="addressOne"
//               label="Address"
//               rules={[
//                 { required: true, message: "Please enter address" },
//                 { min: 5, message: "Address should be at least 5 characters" }
//               ]}
//             >
//               <Input
//                 prefix={<EnvironmentOutlined className="text-gray-400" />}
//                 placeholder="Enter your complete address"
//                 size="large"
//                 className="rounded-lg lg:rounded-xl"
//               />
//             </Form.Item>

//             <Row gutter={[16, 0]}>
//               <Col xs={24} sm={12}>
//                 <Form.Item
//                   name="city"
//                   label="City"
//                   rules={[{ required: true, message: "Please enter city" }]}
//                 >
//                   <Input
//                     placeholder="Enter your city"
//                     size="large"
//                     className="rounded-lg lg:rounded-xl"
//                   />
//                 </Form.Item>
//               </Col>
//               <Col xs={24} sm={12}>
//                 <Form.Item
//                   name="postCode"
//                   label="Postal Code"
//                 >
//                   <Input
//                     placeholder="e.g., 1200"
//                     size="large"
//                     className="rounded-lg lg:rounded-xl"
//                   />
//                 </Form.Item>
//               </Col>
//             </Row>

//             <Form.Item
//               name="division"
//               label="Division"
//               rules={[{ required: true, message: "Please select division" }]}
//             >
//               <Select 
//                 placeholder="Select your division" 
//                 size="large" 
//                 className="rounded-lg lg:rounded-xl"
//               >
//                 <Option value="dhaka">Dhaka Division</Option>
//                 <Option value="chattogram">Chattogram Division</Option>
//                 <Option value="rajshahi">Rajshahi Division</Option>
//                 <Option value="khulna">Khulna Division</Option>
//                 <Option value="barishal">Barishal Division</Option>
//                 <Option value="sylhet">Sylhet Division</Option>
//                 <Option value="rangpur">Rangpur Division</Option>
//                 <Option value="mymensingh">Mymensingh Division</Option>
//               </Select>
//             </Form.Item>

//             <Form.Item name="addressTwo" label="Address Line 2 (Optional)">
//               <Input
//                 placeholder="Apartment, suite, unit, etc."
//                 size="large"
//                 className="rounded-lg lg:rounded-xl"
//               />
//             </Form.Item>

//             <Form.Item name="district" label="District (Optional)">
//               <Input
//                 placeholder="Enter your district"
//                 size="large"
//                 className="rounded-lg lg:rounded-xl"
//               />
//             </Form.Item>
//           </div>
//         );

//       case 2:
//         return (
//           <div className="text-center py-6 lg:py-8 px-4">
//             {verificationStatus === 'sent' && (
//               <>
//                 <div className="w-16 h-16 lg:w-20 lg:h-20 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4 lg:mb-6">
//                   <MailOutlined className="text-orange-600 text-2xl lg:text-3xl" />
//                 </div>
                
//                 <h3 className="text-xl lg:text-2xl font-bold text-gray-900 mb-3">
//                   Verify Your Email Address
//                 </h3>
                
//                 <p className="text-gray-600 mb-2 text-base lg:text-lg">
//                   We've sent a verification link to your email
//                 </p>
                
//                 <p className="text-gray-500 mb-6 lg:mb-8 text-sm lg:text-base max-w-md mx-auto">
//                   Please check your email inbox (and spam folder) for the verification link. 
//                   Click the link to verify your email address and complete your registration.
//                 </p>

//                 <Card className="bg-orange-50 border border-orange-200 rounded-xl lg:rounded-2xl mb-6 lg:mb-8 max-w-lg mx-auto">
//                   <div className="text-left">
//                     <h4 className="font-semibold text-orange-800 mb-3 text-base lg:text-lg">
//                       What happens next?
//                     </h4>
//                     <ul className="text-orange-700 space-y-2 text-xs lg:text-sm">
//                       <li className="flex items-start">
//                         <span className="w-2 h-2 bg-orange-500 rounded-full mr-3 mt-2 flex-shrink-0"></span>
//                         Check your email for verification link
//                       </li>
//                       <li className="flex items-start">
//                         <span className="w-2 h-2 bg-orange-500 rounded-full mr-3 mt-2 flex-shrink-0"></span>
//                         Click the link to verify your email
//                       </li>
//                       <li className="flex items-start">
//                         <span className="w-2 h-2 bg-orange-500 rounded-full mr-3 mt-2 flex-shrink-0"></span>
//                         You'll be redirected to login page
//                       </li>
//                       <li className="flex items-start">
//                         <span className="w-2 h-2 bg-orange-500 rounded-full mr-3 mt-2 flex-shrink-0"></span>
//                         Sign in with your credentials
//                       </li>
//                     </ul>
//                   </div>
//                 </Card>

//                 <div className="flex flex-col sm:flex-row gap-3 justify-center">
//                   <Button 
//                     onClick={resendVerificationEmail}
//                     loading={loading}
//                     size="large"
//                     className="h-12 px-6 lg:px-8 rounded-lg lg:rounded-xl border-orange-500 text-orange-600 hover:bg-orange-50 font-semibold"
//                   >
//                     {loading ? "Sending..." : "Resend Verification Email"}
//                   </Button>
//                   <Button 
//                     onClick={() => navigate('/login')}
//                     size="large"
//                     className="h-12 px-6 lg:px-8 rounded-lg lg:rounded-xl border-gray-300 hover:border-green-500 font-semibold"
//                   >
//                     Go to Login
//                   </Button>
//                 </div>

//                 <div className="mt-6 text-sm text-gray-500">
//                   <p>After clicking the verification link in your email, you can sign in.</p>
//                 </div>
//               </>
//             )}
//           </div>
//         );

//       default:
//         return null;
//     }
//   };

//   return (
//     <div className="space-y-6 lg:space-y-8 max-w-2xl mx-auto p-4">
//       {/* Enhanced Progress Steps */}
//       {currentStep < 2 && (
//         <Card className="border-0 shadow-sm bg-transparent">
//           <Steps
//             current={currentStep}
//             size={screens.md ? "default" : "small"}
//             responsive
//             className="custom-steps mb-2"
//           >
//             {steps.map((step, index) => (
//               <Step 
//                 key={index} 
//                 title={step.title} 
//                 icon={step.icon}
//               />
//             ))}
//           </Steps>
//           <div className="text-center text-xs lg:text-sm text-gray-500 mt-2">
//             Step {currentStep + 1} of {steps.length}
//           </div>
//         </Card>
//       )}

//       {/* Messages */}
//       {message.text && (
//         <Alert
//           message={message.text}
//           type={message.type}
//           showIcon
//           closable
//           onClose={() => setMessage({ type: "", text: "" })}
//           className="rounded-lg lg:rounded-xl border-0 shadow-sm mb-4 lg:mb-6"
//         />
//       )}

//       {/* Registration Form */}
//       {currentStep < 2 ? (
//         <Card className="border-0 shadow-lg bg-white/95 backdrop-blur-sm">
//           <Form
//             form={form}
//             name="register"
//             onFinish={currentStep === 1 ? onFinish : undefined}
//             layout="vertical"
//             requiredMark={false}
//             scrollToFirstError
//             size="large"
//           >
//             {renderStepContent()}

//             <div className="flex justify-between items-center mt-6 lg:mt-10 pt-4 lg:pt-6 border-t border-gray-200">
//               <Button
//                 onClick={prevStep}
//                 disabled={currentStep === 0}
//                 size="large"
//                 className="h-10 lg:h-12 px-4 lg:px-8 rounded-lg lg:rounded-xl flex items-center border-gray-300 hover:border-green-500 text-sm lg:text-base"
//                 icon={screens.sm ? <ArrowLeftOutlined /> : null}
//               >
//                 {screens.sm ? 'Previous' : <ArrowLeftOutlined />}
//               </Button>

//               {currentStep < steps.length - 2 ? (
//                 <Button
//                   type="primary"
//                   onClick={nextStep}
//                   size="large"
//                   className="h-10 lg:h-12 px-4 lg:px-8 rounded-lg lg:rounded-xl flex items-center bg-gradient-to-r from-green-600 to-blue-600 border-0 font-semibold text-sm lg:text-base"
//                   icon={screens.sm ? <ArrowRightOutlined /> : null}
//                 >
//                   {screens.sm ? 'Next Step' : <ArrowRightOutlined />}
//                 </Button>
//               ) : (
//                 <Button
//                   type="primary"
//                   htmlType="submit"
//                   loading={loading}
//                   size="large"
//                   className="h-10 lg:h-12 px-4 lg:px-8 rounded-lg lg:rounded-xl bg-gradient-to-r from-green-600 to-emerald-600 border-0 font-semibold text-sm lg:text-base"
//                 >
//                   {loading ? (
//                     <span className="flex items-center">
//                       <LoadingOutlined className="mr-2" />
//                       Submitting...
//                     </span>
//                   ) : (
//                     "Complete Registration"
//                   )}
//                 </Button>
//               )}
//             </div>
//           </Form>
//         </Card>
//       ) : (
//         <Card className="border-0 shadow-lg bg-white/95 backdrop-blur-sm">
//           {renderStepContent()}
//         </Card>
//       )}

//       {/* Terms and Login Link */}
//       {currentStep < 2 && (
//         <>
//           <Divider className="text-gray-300" />

//           <div className="text-center space-y-3 lg:space-y-4">
//             <p className="text-xs lg:text-sm text-gray-500">
//               By creating an account, you agree to our{" "}
//               <a href="/terms" className="text-green-600 hover:text-green-700 font-semibold transition-colors">
//                 Terms
//               </a>{" "}
//               and{" "}
//               <a href="/privacy" className="text-green-600 hover:text-green-700 font-semibold transition-colors">
//                 Privacy Policy
//               </a>
//             </p>

//             <p className="text-gray-600 text-sm lg:text-base">
//               Already a member?{" "}
//               <Link
//                 to="/login"
//                 className="text-green-600 hover:text-green-700 font-semibold transition-colors inline-flex items-center space-x-1 group"
//               >
//                 <span>Sign in here</span>
//                 <span className="group-hover:translate-x-1 transition-transform">→</span>
//               </Link>
//             </p>
//           </div>
//         </>
//       )}
//     </div>
//   );
// };

// export default Registration;




 


///////////Final Version///////////



// import { useState } from "react";
// import { useNavigate, Link } from "react-router-dom";
// import { 
//   Form, 
//   Input, 
//   Button, 
//   Alert, 
//   Select, 
//   Steps, 
//   Card, 
//   Divider, 
//   message as antMessage,
//   Row,
//   Col 
// } from "antd";
// import { 
//   MailOutlined, 
//   LockOutlined, 
//   UserOutlined, 
//   PhoneOutlined,
//   EyeInvisibleOutlined, 
//   EyeTwoTone,
//   EnvironmentOutlined,
//   ArrowLeftOutlined,
//   ArrowRightOutlined,
//   TeamOutlined 
// } from "@ant-design/icons";
// import axios from "axios";

// const { Option } = Select;
// const { Step } = Steps;

// const Registration = () => {
//   const [form] = Form.useForm();
//   const [loading, setLoading] = useState(false);
//   const [currentStep, setCurrentStep] = useState(0);
//   const [message, setMessage] = useState({ type: "", text: "" });
  
//   const navigate = useNavigate();

//   const steps = [
//     {
//       title: 'Account',
//       description: 'Basic information',
//       icon: <UserOutlined />
//     },
//     {
//       title: 'Contact',
//       description: 'Contact details',
//       icon: <EnvironmentOutlined />
//     },
//     {
//       title: 'Complete',
//       description: 'Registration done',
//       icon: <TeamOutlined />
//     },
//   ];

//   const associationRoles = [
//     { value: "member", label: "👥 General Member", description: "Regular association member with basic access" },
//     { value: "executive", label: "💼 Executive Member", description: "Committee member with extended privileges" },
//     { value: "volunteer", label: "🤝 Volunteer", description: "Association volunteer and helper" },
//     { value: "donor", label: "💰 Donor Member", description: "Supporting donor member" },
//   ];

//   const onFinish = async (values) => {
//     setLoading(true);
//     setMessage({ type: "", text: "" });

//     try {
//       const response = await axios.post(
//         "http://localhost:3000/api/v1/authentication/registration",
//         {
//           ...values,
//           role: values.role || "member",
//           association: "Alamgir Hossain City Kallan Samity"
//         }
//       );

//       if (response.data.success) {
//         setCurrentStep(2);
//         setMessage({ 
//           type: "success", 
//           text: "Registration submitted successfully! Our team will review your application." 
//         });

//         antMessage.success("Welcome to Alamgir Hossain City Kallan Samity!");

//         setTimeout(() => {
//           navigate('/login');
//         }, 5000);
//       } else {
//         setMessage({
//           type: "error",
//           text: response.data.error || "Registration failed. Please try again.",
//         });
//       }
//     } catch (err) {
//       console.error("Registration error:", err);
//       const errorMessage = err.response?.data?.error || 
//                           "Registration failed. Please try again.";
//       setMessage({ type: "error", text: errorMessage });
//       antMessage.error("Registration failed. Please try again.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const nextStep = async () => {
//     try {
//       const fields = currentStep === 0 
//         ? ['firstName', 'lastName', 'email', 'password', 'confirmPassword', 'role']
//         : ['telephone', 'addressOne', 'city', 'division'];
      
//       await form.validateFields(fields);
//       setCurrentStep(currentStep + 1);
//       window.scrollTo({ top: 0, behavior: 'smooth' });
//     } catch (error) {
//       antMessage.warning('Please fill in all required fields correctly.');
//     }
//   };

//   const prevStep = () => {
//     setCurrentStep(currentStep - 1);
//     window.scrollTo({ top: 0, behavior: 'smooth' });
//   };

//   const renderStepContent = () => {
//     switch (currentStep) {
//       case 0:
//         return (
//           <div className="space-y-6">
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//               <Form.Item
//                 name="firstName"
//                 label={
//                   <span className="font-semibold text-gray-700">
//                     First Name <span className="text-red-500">*</span>
//                   </span>
//                 }
//                 rules={[
//                   { required: true, message: "Please enter your first name" },
//                   { min: 2, message: "First name must be at least 2 characters" }
//                 ]}
//               >
//                 <Input
//                   prefix={<UserOutlined className="text-gray-400" />}
//                   placeholder="Enter your first name"
//                   size="large"
//                   className="rounded-xl h-12 border-gray-300 hover:border-green-400 focus:border-green-500"
//                   allowClear
//                 />
//               </Form.Item>

//               <Form.Item
//                 name="lastName"
//                 label={
//                   <span className="font-semibold text-gray-700">
//                     Last Name <span className="text-red-500">*</span>
//                   </span>
//                 }
//                 rules={[
//                   { required: true, message: "Please enter your last name" },
//                   { min: 2, message: "Last name must be at least 2 characters" }
//                 ]}
//               >
//                 <Input
//                   prefix={<UserOutlined className="text-gray-400" />}
//                   placeholder="Enter your last name"
//                   size="large"
//                   className="rounded-xl h-12 border-gray-300 hover:border-green-400 focus:border-green-500"
//                   allowClear
//                 />
//               </Form.Item>
//             </div>

//             <Form.Item
//               name="email"
//               label={
//                 <span className="font-semibold text-gray-700">
//                   Email Address <span className="text-red-500">*</span>
//                 </span>
//               }
//               rules={[
//                 { required: true, message: "Please enter your email address" },
//                 { type: "email", message: "Please enter a valid email address" },
//               ]}
//             >
//               <Input
//                 prefix={<MailOutlined className="text-gray-400" />}
//                 placeholder="your.email@example.com"
//                 size="large"
//                 className="rounded-xl h-12 border-gray-300 hover:border-green-400 focus:border-green-500"
//                 allowClear
//               />
//             </Form.Item>

//             <Form.Item
//               name="role"
//               label={
//                 <span className="font-semibold text-gray-700">
//                   Member Type <span className="text-red-500">*</span>
//                 </span>
//               }
//               initialValue="member"
//               rules={[{ required: true, message: "Please select member type" }]}
//             >
//               <Select 
//                 size="large" 
//                 className="rounded-xl h-12 border-gray-300 hover:border-green-400 focus:border-green-500"
//                 placeholder="Select your member type"
//               >
//                 {associationRoles.map(role => (
//                   <Option key={role.value} value={role.value}>
//                     <div className="py-1">
//                       <div className="font-medium">{role.label}</div>
//                       <div className="text-xs text-gray-500">{role.description}</div>
//                     </div>
//                   </Option>
//                 ))}
//               </Select>
//             </Form.Item>

//             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//               <Form.Item
//                 name="password"
//                 label={
//                   <span className="font-semibold text-gray-700">
//                     Password <span className="text-red-500">*</span>
//                   </span>
//                 }
//                 rules={[
//                   { required: true, message: "Please create a password" },
//                   { min: 6, message: "Password must be at least 6 characters" },
//                 ]}
//               >
//                 <Input.Password
//                   prefix={<LockOutlined className="text-gray-400" />}
//                   placeholder="Create strong password"
//                   size="large"
//                   className="rounded-xl h-12 border-gray-300 hover:border-green-400 focus:border-green-500"
//                   iconRender={(visible) =>
//                     visible ? <EyeTwoTone className="text-green-500" /> : <EyeInvisibleOutlined className="text-gray-400" />
//                   }
//                 />
//               </Form.Item>

//               <Form.Item
//                 name="confirmPassword"
//                 label={
//                   <span className="font-semibold text-gray-700">
//                     Confirm Password <span className="text-red-500">*</span>
//                   </span>
//                 }
//                 dependencies={['password']}
//                 rules={[
//                   { required: true, message: "Please confirm your password" },
//                   ({ getFieldValue }) => ({
//                     validator(_, value) {
//                       if (!value || getFieldValue('password') === value) {
//                         return Promise.resolve();
//                       }
//                       return Promise.reject(new Error('The two passwords do not match'));
//                     },
//                   }),
//                 ]}
//               >
//                 <Input.Password
//                   prefix={<LockOutlined className="text-gray-400" />}
//                   placeholder="Confirm your password"
//                   size="large"
//                   className="rounded-xl h-12 border-gray-300 hover:border-green-400 focus:border-green-500"
//                   iconRender={(visible) =>
//                     visible ? <EyeTwoTone className="text-green-500" /> : <EyeInvisibleOutlined className="text-gray-400" />
//                   }
//                 />
//               </Form.Item>
//             </div>
//           </div>
//         );

//       case 1:
//         return (
//           <div className="space-y-6">
//             <Form.Item
//               name="telephone"
//               label={
//                 <span className="font-semibold text-gray-700">
//                   Phone Number <span className="text-red-500">*</span>
//                 </span>
//               }
//               rules={[
//                 { required: true, message: "Please enter your phone number" },
//                 { pattern: /^[0-9+\-\s()]{10,}$/, message: "Please enter a valid phone number" }
//               ]}
//             >
//               <Input
//                 prefix={<PhoneOutlined className="text-gray-400" />}
//                 placeholder="+880 1XXX-XXXXXX"
//                 size="large"
//                 className="rounded-xl h-12 border-gray-300 hover:border-green-400 focus:border-green-500"
//                 allowClear
//               />
//             </Form.Item>

//             <Form.Item
//               name="addressOne"
//               label={
//                 <span className="font-semibold text-gray-700">
//                   Address <span className="text-red-500">*</span>
//                 </span>
//               }
//               rules={[
//                 { required: true, message: "Please enter your address" },
//                 { min: 5, message: "Address should be at least 5 characters" }
//               ]}
//             >
//               <Input
//                 prefix={<EnvironmentOutlined className="text-gray-400" />}
//                 placeholder="Enter your complete address"
//                 size="large"
//                 className="rounded-xl h-12 border-gray-300 hover:border-green-400 focus:border-green-500"
//                 allowClear
//               />
//             </Form.Item>

//             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//               <Form.Item
//                 name="city"
//                 label={
//                   <span className="font-semibold text-gray-700">
//                     City <span className="text-red-500">*</span>
//                   </span>
//                 }
//                 rules={[{ required: true, message: "Please enter your city" }]}
//               >
//                 <Input
//                   placeholder="Enter your city"
//                   size="large"
//                   className="rounded-xl h-12 border-gray-300 hover:border-green-400 focus:border-green-500"
//                   allowClear
//                 />
//               </Form.Item>

//               <Form.Item
//                 name="postCode"
//                 label={
//                   <span className="font-semibold text-gray-700">
//                     Postal Code
//                   </span>
//                 }
//               >
//                 <Input
//                   placeholder="e.g., 1200"
//                   size="large"
//                   className="rounded-xl h-12 border-gray-300 hover:border-green-400 focus:border-green-500"
//                   allowClear
//                 />
//               </Form.Item>
//             </div>

//             <Form.Item
//               name="division"
//               label={
//                 <span className="font-semibold text-gray-700">
//                   Division <span className="text-red-500">*</span>
//                 </span>
//               }
//               rules={[{ required: true, message: "Please select division" }]}
//             >
//               <Select 
//                 placeholder="Select your division" 
//                 size="large" 
//                 className="rounded-xl h-12 border-gray-300 hover:border-green-400 focus:border-green-500"
//               >
//                 <Option value="dhaka">Dhaka Division</Option>
//                 <Option value="chattogram">Chattogram Division</Option>
//                 <Option value="rajshahi">Rajshahi Division</Option>
//                 <Option value="khulna">Khulna Division</Option>
//                 <Option value="barishal">Barishal Division</Option>
//                 <Option value="sylhet">Sylhet Division</Option>
//                 <Option value="rangpur">Rangpur Division</Option>
//                 <Option value="mymensingh">Mymensingh Division</Option>
//               </Select>
//             </Form.Item>

//             <Form.Item
//               name="additionalInfo"
//               label={
//                 <span className="font-semibold text-gray-700">
//                   Additional Information
//                 </span>
//               }
//             >
//               <Input.TextArea
//                 placeholder="Any additional information you'd like to share with the association management..."
//                 rows={4}
//                 className="rounded-xl border-gray-300 hover:border-green-400 focus:border-green-500"
//               />
//             </Form.Item>
//           </div>
//         );

//       case 2:
//         return (
//           <div className="text-center py-8 px-4">
//             <div className="w-20 h-20 bg-gradient-to-r from-green-500 to-emerald-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
//               <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path>
//               </svg>
//             </div>
            
//             <h3 className="text-2xl font-bold text-gray-900 mb-3">
//               Application Submitted Successfully!
//             </h3>
            
//             <p className="text-gray-600 mb-2 text-lg">
//               Welcome to Alamgir Hossain City Kallan Samity
//             </p>
            
//             <p className="text-gray-500 mb-8 max-w-md mx-auto">
//               Thank you for your interest in joining our welfare association. 
//               Your application has been received and is under review by our executive committee.
//             </p>

//             <Card className="bg-gradient-to-r from-green-50 to-blue-50 border border-green-200 rounded-2xl mb-8 max-w-lg mx-auto">
//               <div className="text-left">
//                 <h4 className="font-semibold text-green-800 mb-3 text-lg flex items-center">
//                   <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
//                     <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
//                   </svg>
//                   What happens next?
//                 </h4>
//                 <ul className="text-green-700 space-y-2 text-sm">
//                   <li className="flex items-center">
//                     <span className="w-2 h-2 bg-green-500 rounded-full mr-3"></span>
//                     Executive committee will review your application
//                   </li>
//                   <li className="flex items-center">
//                     <span className="w-2 h-2 bg-green-500 rounded-full mr-3"></span>
//                     You'll receive a welcome email within 2-3 business days
//                   </li>
//                   <li className="flex items-center">
//                     <span className="w-2 h-2 bg-green-500 rounded-full mr-3"></span>
//                     Complete your member profile after approval
//                   </li>
//                   <li className="flex items-center">
//                     <span className="w-2 h-2 bg-green-500 rounded-full mr-3"></span>
//                     Attend our next association meeting
//                   </li>
//                 </ul>
//               </div>
//             </Card>

//             <div className="flex flex-col sm:flex-row gap-3 justify-center">
//               <Button 
//                 type="primary" 
//                 onClick={() => navigate('/login')}
//                 size="large"
//                 className="h-12 px-8 rounded-xl bg-gradient-to-r from-green-600 to-blue-600 border-0 shadow-lg hover:shadow-xl transition-all font-semibold"
//               >
//                 Go to Login
//               </Button>
//               <Button 
//                 onClick={() => {
//                   setCurrentStep(0);
//                   form.resetFields();
//                 }}
//                 size="large"
//                 className="h-12 px-8 rounded-xl border-gray-300 hover:border-green-500 font-semibold"
//               >
//                 Register Another Member
//               </Button>
//             </div>

//             <div className="mt-6 text-sm text-gray-400">
//               Redirecting to login in 5 seconds...
//             </div>
//           </div>
//         );

//       default:
//         return null;
//     }
//   };

//   return (
//     <div className="space-y-8">
//       {/* Header */}
//       <div className="text-center">
//         <h3 className="text-3xl font-bold text-gray-900 mb-3 font-railway">
//           Join Our Association
//         </h3>
//         <p className="text-gray-600 text-lg">
//           Register as a member of Alamgir Hossain City Kallan Samity
//         </p>
//       </div>

//       {/* Enhanced Progress Steps */}
//       {currentStep < 2 && (
//         <Card className="border-0 shadow-sm bg-transparent">
//           <Steps 
//             current={currentStep} 
//             className="mb-2 custom-steps"
//             responsive={false}
//           >
//             {steps.map((step, index) => (
//               <Step 
//                 key={index} 
//                 title={step.title} 
//                 description={step.description}
//                 icon={step.icon}
//               />
//             ))}
//           </Steps>
//           <div className="text-center text-sm text-gray-500 mt-2">
//             Step {currentStep + 1} of {steps.length - 1}
//           </div>
//         </Card>
//       )}

//       {/* Messages */}
//       {message.text && (
//         <Alert
//           message={message.text}
//           type={message.type}
//           showIcon
//           closable
//           className="rounded-xl border-0 shadow-sm mb-6"
//           style={{
//             backgroundColor: message.type === 'success' ? '#f0fdf4' : '#fef2f2',
//             border: message.type === 'success' ? '1px solid #bbf7d0' : '1px solid #fecaca'
//           }}
//         />
//       )}

//       {/* Registration Form */}
//       {currentStep < 2 ? (
//         <Card 
//           className="border-0 shadow-lg bg-white/95 backdrop-blur-sm"
//           bodyStyle={{ padding: '32px' }}
//         >
//           <Form
//             form={form}
//             name="register"
//             onFinish={onFinish}
//             layout="vertical"
//             requiredMark={false}
//             scrollToFirstError
//             size="large"
//           >
//             {renderStepContent()}

//             <div className="flex justify-between items-center mt-10 pt-6 border-t border-gray-200">
//               <Button
//                 onClick={prevStep}
//                 disabled={currentStep === 0}
//                 size="large"
//                 className="h-12 px-8 rounded-xl flex items-center border-gray-300 hover:border-green-500"
//                 icon={<ArrowLeftOutlined />}
//               >
//                 Previous
//               </Button>

//               {currentStep < steps.length - 2 ? (
//                 <Button
//                   type="primary"
//                   onClick={nextStep}
//                   size="large"
//                   className="h-12 px-8 rounded-xl flex items-center bg-gradient-to-r from-green-600 to-blue-600 border-0 shadow-lg hover:shadow-xl font-semibold"
//                   icon={<ArrowRightOutlined />}
//                 >
//                   Next Step
//                 </Button>
//               ) : (
//                 <Button
//                   type="primary"
//                   htmlType="submit"
//                   loading={loading}
//                   size="large"
//                   className="h-12 px-8 rounded-xl bg-gradient-to-r from-green-600 to-emerald-600 border-0 shadow-lg hover:shadow-xl font-semibold"
//                 >
//                   {loading ? "Submitting Application..." : "Complete Registration"}
//                 </Button>
//               )}
//             </div>
//           </Form>
//         </Card>
//       ) : (
//         <Card className="border-0 shadow-lg bg-white/95 backdrop-blur-sm">
//           {renderStepContent()}
//         </Card>
//       )}

//       {/* Terms and Login Link */}
//       {currentStep < 2 && (
//         <>
//           <Divider className="text-gray-300" />

//           <div className="text-center space-y-4">
//             <p className="text-sm text-gray-500">
//               By creating an account, you agree to our{" "}
//               <a href="/terms" className="text-green-600 hover:text-green-700 font-semibold transition-colors">
//                 Terms of Service
//               </a>{" "}
//               and{" "}
//               <a href="/privacy" className="text-green-600 hover:text-green-700 font-semibold transition-colors">
//                 Privacy Policy
//               </a>
//             </p>

//             <p className="text-gray-600">
//               Already a member?{" "}
//               <Link
//                 to="/login"
//                 className="text-green-600 hover:text-green-700 font-semibold transition-colors inline-flex items-center space-x-1 group"
//               >
//                 <span>Sign in here</span>
//                 <span className="group-hover:translate-x-1 transition-transform">→</span>
//               </Link>
//             </p>
//           </div>
//         </>
//       )}
//     </div>
//   );
// };

// export default Registration;










///////////////////Final //////////////////////////


// import { useState, useEffect } from "react";
// import { useNavigate, Link } from "react-router-dom";
// import { 
//   Form, 
//   Input, 
//   Button, 
//   Alert, 
//   Select, 
//   Steps, 
//   Card, 
//   Divider, 
//   message as antMessage,
//   Row,
//   Col,
//   Grid,
//   Result,
//   Spin
// } from "antd";
// import { 
//   MailOutlined, 
//   LockOutlined, 
//   UserOutlined, 
//   PhoneOutlined,
//   EyeInvisibleOutlined, 
//   EyeTwoTone,
//   EnvironmentOutlined,
//   ArrowLeftOutlined,
//   ArrowRightOutlined,
//   TeamOutlined,
//   CheckCircleOutlined,
//   LoadingOutlined
// } from "@ant-design/icons";
// import axios from "axios";

// const { Option } = Select;
// const { Step } = Steps;
// const { useBreakpoint } = Grid;

// const Registration = () => {
//   const [form] = Form.useForm();
//   const [loading, setLoading] = useState(false);
//   const [currentStep, setCurrentStep] = useState(0);
//   const [message, setMessage] = useState({ type: "", text: "" });
//   const [formData, setFormData] = useState({});
//   const [verificationStatus, setVerificationStatus] = useState('pending'); // pending, sent, verified
//   const [emailVerified, setEmailVerified] = useState(false);
//   const screens = useBreakpoint();
  
//   const navigate = useNavigate();

//   // const steps = [
//   //   {
//   //     title: 'Account',
//   //     description: screens.md ? 'Basic information' : 'Basic',
//   //     icon: <UserOutlined />
//   //   },
//   //   {
//   //     title: 'Contact',
//   //     description: screens.md ? 'Contact details' : 'Contact',
//   //     icon: <EnvironmentOutlined />
//   //   },
//   //   {
//   //     title: 'Verify',
//   //     description: screens.md ? 'Email verification' : 'Verify',
//   //     icon: <MailOutlined />
//   //   },
//   //   {
//   //     title: 'Complete',
//   //     description: screens.md ? 'Registration done' : 'Done',
//   //     icon: <TeamOutlined />
//   //   },
//   // ];

//   // Updated roles based on your backend schema
  
//   const steps = [
//   { title: screens.md ? 'Account Info' : 'Account', icon: <UserOutlined /> },
//   { title: screens.md ? 'Contact Details' : 'Contact', icon: <EnvironmentOutlined /> },
//   { title: screens.md ? 'Verify Email' : 'Verify', icon: <MailOutlined /> },
//   { title: screens.md ? 'Complete' : 'Done', icon: <TeamOutlined /> },
// ];

  
//   const associationRoles = [
//     { value: "Member", label: "👥 General Member", description: "Regular association member" },
//     { value: "ExecutiveMember", label: "💼 Executive Member", description: "Committee executive member" },
//     { value: "PlotOwner", label: "🏠 Plot Owner", description: "Association plot owner" },
//     { value: "Employee", label: "👨‍💼 Employee", description: "Association employee" },
//     { value: "President", label: "🎖️ President", description: "Association President" },
//     { value: "VicePresident", label: "🎖️ Vice President", description: "Association Vice President" },
//     { value: "GeneralSecretary", label: "📝 General Secretary", description: "General Secretary" },
//     { value: "FinanceSecretary", label: "💰 Finance Secretary", description: "Finance Secretary" },
//   ];

//   const onFinish = async (values) => {
//     setLoading(true);
//     setMessage({ type: "", text: "" });

//     try {
//       // Combine data from all steps
//       const finalData = {
//         ...formData,
//         ...values,
//         role: values.role || formData.role || "Member",
//         association: "Alamgir Hossain City Kallan Samity"
//       };

//       console.log("Submitting registration data:", finalData);

//       const response = await axios.post(
//         "http://localhost:3000/api/v1/authentication/registration",
//         finalData
//       );

//       if (response.data.success) {
//         // Store token for auto-login after verification
//         if (response.data.token) {
//           localStorage.setItem('tempAuthToken', response.data.token);
//           localStorage.setItem('tempUserData', JSON.stringify(response.data.user));
//         }
        
//         setVerificationStatus('sent');
//         setCurrentStep(2); // Move to verification step
//         setMessage({ 
//           type: "success", 
//           text: response.data.success || "Registration successful! Please check your email for verification." 
//         });

//         antMessage.success("Registration successful! Please verify your email.");
        
//         // Start checking verification status
//         checkEmailVerification(finalData.email);

//       } else {
//         setMessage({
//           type: "error",
//           text: response.data.error || "Registration failed. Please try again.",
//         });
//       }
//     } catch (err) {
//       console.error("Registration error:", err);
//       const errorMessage = err.response?.data?.error || 
//                           "Registration failed. Please try again.";
//       setMessage({ type: "error", text: errorMessage });
//       antMessage.error("Registration failed. Please try again.");
//     } finally {
//       setLoading(false);
//     }
//   };


// // // Function to check email verification status
// // const checkEmailVerification = async (email) => {
// //   const maxAttempts = 60; // 5 minutes (check every 5 seconds)
// //   let attempts = 0;
// //   const token = localStorage.getItem('tempAuthToken'); // ✅ get stored token

// //   const checkInterval = setInterval(async () => {
// //     attempts++;

// //     try {
// //       console.log(`Verification check attempt ${attempts} for email:`, email);

// //       const response = await axios.post(
// //         "http://localhost:3000/api/v1/authentication/emailverified",
// //         {},
// //         {
// //           headers: {
// //             Authorization: `Bearer ${token}`, // ✅ send Bearer token correctly
// //           },
// //         }
// //       );

// //       console.log('Verification check response:', response.data);

// //       if (response.data.success) {
// //         setVerificationStatus('verified');
// //         setEmailVerified(true);
// //         setCurrentStep(3);
// //         clearInterval(checkInterval);

// //         antMessage.success("Email verified successfully! You can now login.");

// //         // Cleanup
// //         localStorage.removeItem('tempAuthToken');
// //         localStorage.removeItem('tempUserData');

// //         setTimeout(() => navigate('/login'), 2000); // redirect after success
// //       }
// //     } catch (error) {
// //       console.log(
// //         `Verification check ${attempts} failed:`,
// //         error.response?.data || error.message
// //       );
// //     }

// //     if (attempts >= maxAttempts) {
// //       clearInterval(checkInterval);
// //       setMessage({
// //         type: "warning",
// //         text: "Verification timeout. Please check your email and click the verification link manually.",
// //       });
// //       antMessage.warning("Verification timeout. Please check your email.");
// //     }
// //   }, 5000);
// // };

// const checkEmailVerification = async (email) => {
//   const maxAttempts = 60; // 5 minutes total
//   let attempts = 0;
//   const token = localStorage.getItem('tempAuthToken');

//   if (!token) {
//     console.warn("No token found for verification check");
//     return;
//   }

//   const interval = setInterval(async () => {
//     attempts++;

//     try {
//       const res = await axios.post(
//         "http://localhost:3000/api/v1/authentication/emailverified",
//         {},
//         {
//           headers: { Authorization: `Bearer ${token}` },
//         }
//       );

//       console.log("Email verification check:", res.data);

//       if (res.data.success) {
//         clearInterval(interval);
//         setVerificationStatus('verified');
//         setEmailVerified(true);

//         // ✅ Auto move to completion step
//         setTimeout(() => {
//           setCurrentStep(3);
//           antMessage.success("Email verified successfully!");
//           localStorage.removeItem('tempAuthToken');
//           localStorage.removeItem('tempUserData');

//           // ✅ Auto redirect to login after a delay
//           setTimeout(() => navigate('/login'), 2500);
//         }, 1000);
//       }
//     } catch (err) {
//       console.log(`Verification check ${attempts} failed:`, err.response?.data || err.message);
//     }

//     if (attempts >= maxAttempts || err.response?.status === 404) {
//   clearInterval(interval);
//   setMessage({
//     type: "error",
//     text: "Verification route not found. Contact support.",
//   });
// }
//   }, 5000);
// };



//   const nextStep = async () => {
//     try {
//       // Validate current step fields only
//       const currentStepFields = getCurrentStepFields();
//       const values = await form.validateFields(currentStepFields);
      
//       // Store the current step data
//       setFormData(prev => ({ ...prev, ...values }));
      
//       setCurrentStep(currentStep + 1);
//       window.scrollTo({ top: 0, behavior: 'smooth' });
//     } catch (error) {
//       console.log('Validation failed:', error);
//       antMessage.warning('Please fill in all required fields correctly.');
//     }
//   };

//   const prevStep = () => {
//     // Store current step data before going back
//     const currentStepFields = getCurrentStepFields();
//     form.validateFields(currentStepFields).then(values => {
//       setFormData(prev => ({ ...prev, ...values }));
//     }).catch(() => {
//       // Ignore validation errors when going back
//     });
    
//     setCurrentStep(currentStep - 1);
//     window.scrollTo({ top: 0, behavior: 'smooth' });
//   };

//   // Get fields for current step only
//   const getCurrentStepFields = () => {
//     switch (currentStep) {
//       case 0:
//         return ['firstName', 'lastName', 'email', 'password', 'confirmPassword', 'role'];
//       case 1:
//         return ['telephone', 'addressOne', 'city', 'division'];
//       default:
//         return [];
//     }
//   };

//   // Set form values when switching steps
//   useEffect(() => {
//     if (currentStep < 2) {
//       form.setFieldsValue(formData);
//     }
//   }, [currentStep, formData]);

//   const resendVerificationEmail = async () => {
//     try {
//       const response = await axios.post(
//         "http://localhost:3000/api/v1/authentication/registration",
//         formData
//       );
      
//       if (response.data.success) {
//         antMessage.success("Verification email sent again!");
//       }
//     } catch (error) {
//       antMessage.error("Failed to resend verification email.");
//     }
//   };

//   const renderStepContent = () => {
//     switch (currentStep) {
//       case 0:
//         return (
//           <div className="space-y-4 lg:space-y-6">
//             {/* Header */}
//             <div className="text-center mb-4 lg:mb-6">
//               <h3 className="text-xl lg:text-2xl font-bold text-gray-900">
//                 Join Our Association
//               </h3>
//               <p className="text-gray-600 text-sm lg:text-base">
//                 Register as a member of Alamgir Hossain City Kallan Samity
//               </p>
//             </div>

//             <Row gutter={[16, 0]}>
//               <Col xs={24} sm={12}>
//                 <Form.Item
//                   name="firstName"
//                   label="First Name"
//                   rules={[
//                     { required: true, message: "Please enter first name" },
//                     { min: 2, message: "First name must be at least 2 characters" }
//                   ]}
//                 >
//                   <Input
//                     prefix={<UserOutlined className="text-gray-400" />}
//                     placeholder="Enter your first name"
//                     size="large"
//                     className="rounded-lg lg:rounded-xl"
//                   />
//                 </Form.Item>
//               </Col>
//               <Col xs={24} sm={12}>
//                 <Form.Item
//                   name="lastName"
//                   label="Last Name"
//                   rules={[
//                     { required: true, message: "Please enter last name" },
//                     { min: 2, message: "Last name must be at least 2 characters" }
//                   ]}
//                 >
//                   <Input
//                     prefix={<UserOutlined className="text-gray-400" />}
//                     placeholder="Enter your last name"
//                     size="large"
//                     className="rounded-lg lg:rounded-xl"
//                   />
//                 </Form.Item>
//               </Col>
//             </Row>

//             <Form.Item
//               name="email"
//               label="Email Address"
//               rules={[
//                 { required: true, message: "Please enter email address" },
//                 { type: "email", message: "Please enter valid email address" },
//               ]}
//             >
//               <Input
//                 prefix={<MailOutlined className="text-gray-400" />}
//                 placeholder="your.email@example.com"
//                 size="large"
//                 className="rounded-lg lg:rounded-xl"
//               />
//             </Form.Item>

//             <Form.Item
//               name="role"
//               label="Member Type"
//               initialValue="Member"
//               rules={[{ required: true, message: "Please select member type" }]}
//             >
//               <Select 
//                 size="large" 
//                 className="rounded-lg lg:rounded-xl"
//                 placeholder="Select your member type"
//                 popupClassName="min-w-max"
//               >
//                 {associationRoles.map(role => (
//                   <Option key={role.value} value={role.value}>
//                     <div className="py-1 min-w-0">
//                       <div className="font-medium text-sm lg:text-base truncate">{role.label}</div>
//                       <div className="text-xs text-gray-500 truncate">{role.description}</div>
//                     </div>
//                   </Option>
//                 ))}
//               </Select>
//             </Form.Item>

//             <Row gutter={[16, 0]}>
//               <Col xs={24} sm={12}>
//                 <Form.Item
//                   name="password"
//                   label="Password"
//                   rules={[
//                     { required: true, message: "Please create password" },
//                     { min: 6, message: "Password must be at least 6 characters" },
//                   ]}
//                 >
//                   <Input.Password
//                     prefix={<LockOutlined className="text-gray-400" />}
//                     placeholder="Create strong password"
//                     size="large"
//                     className="rounded-lg lg:rounded-xl"
//                     iconRender={(visible) =>
//                       visible ? <EyeTwoTone className="text-green-500" /> : <EyeInvisibleOutlined className="text-gray-400" />
//                     }
//                   />
//                 </Form.Item>
//               </Col>
//               <Col xs={24} sm={12}>
//                 <Form.Item
//                   name="confirmPassword"
//                   label="Confirm Password"
//                   dependencies={['password']}
//                   rules={[
//                     { required: true, message: "Please confirm password" },
//                     ({ getFieldValue }) => ({
//                       validator(_, value) {
//                         if (!value || getFieldValue('password') === value) {
//                           return Promise.resolve();
//                         }
//                         return Promise.reject(new Error('Passwords do not match'));
//                       },
//                     }),
//                   ]}
//                 >
//                   <Input.Password
//                     prefix={<LockOutlined className="text-gray-400" />}
//                     placeholder="Confirm your password"
//                     size="large"
//                     className="rounded-lg lg:rounded-xl"
//                     iconRender={(visible) =>
//                       visible ? <EyeTwoTone className="text-green-500" /> : <EyeInvisibleOutlined className="text-gray-400" />
//                     }
//                   />
//                 </Form.Item>
//               </Col>
//             </Row>
//           </div>
//         );

//       case 1:
//         return (
//           <div className="space-y-4 lg:space-y-6">
//             <div className="text-center mb-4 lg:mb-6">
//               <h3 className="text-xl lg:text-2xl font-bold text-gray-900">
//                 Contact Information
//               </h3>
//               <p className="text-gray-600 text-sm lg:text-base">
//                 Provide your contact details
//               </p>
//             </div>

//             <Form.Item
//               name="telephone"
//               label="Phone Number"
//               rules={[
//                 { required: true, message: "Please enter phone number" },
//                 { pattern: /^[0-9+\-\s()]{10,}$/, message: "Please enter valid phone number" }
//               ]}
//             >
//               <Input
//                 prefix={<PhoneOutlined className="text-gray-400" />}
//                 placeholder="+880 1XXX-XXXXXX"
//                 size="large"
//                 className="rounded-lg lg:rounded-xl"
//               />
//             </Form.Item>

//             <Form.Item
//               name="addressOne"
//               label="Address"
//               rules={[
//                 { required: true, message: "Please enter address" },
//                 { min: 5, message: "Address should be at least 5 characters" }
//               ]}
//             >
//               <Input
//                 prefix={<EnvironmentOutlined className="text-gray-400" />}
//                 placeholder="Enter your complete address"
//                 size="large"
//                 className="rounded-lg lg:rounded-xl"
//               />
//             </Form.Item>

//             <Row gutter={[16, 0]}>
//               <Col xs={24} sm={12}>
//                 <Form.Item
//                   name="city"
//                   label="City"
//                   rules={[{ required: true, message: "Please enter city" }]}
//                 >
//                   <Input
//                     placeholder="Enter your city"
//                     size="large"
//                     className="rounded-lg lg:rounded-xl"
//                   />
//                 </Form.Item>
//               </Col>
//               <Col xs={24} sm={12}>
//                 <Form.Item
//                   name="postCode"
//                   label="Postal Code"
//                 >
//                   <Input
//                     placeholder="e.g., 1200"
//                     size="large"
//                     className="rounded-lg lg:rounded-xl"
//                   />
//                 </Form.Item>
//               </Col>
//             </Row>

//             <Form.Item
//               name="division"
//               label="Division"
//               rules={[{ required: true, message: "Please select division" }]}
//             >
//               <Select 
//                 placeholder="Select your division" 
//                 size="large" 
//                 className="rounded-lg lg:rounded-xl"
//               >
//                 <Option value="dhaka">Dhaka Division</Option>
//                 <Option value="chattogram">Chattogram Division</Option>
//                 <Option value="rajshahi">Rajshahi Division</Option>
//                 <Option value="khulna">Khulna Division</Option>
//                 <Option value="barishal">Barishal Division</Option>
//                 <Option value="sylhet">Sylhet Division</Option>
//                 <Option value="rangpur">Rangpur Division</Option>
//                 <Option value="mymensingh">Mymensingh Division</Option>
//               </Select>
//             </Form.Item>

//             <Form.Item name="addressTwo" label="Address Line 2 (Optional)">
//               <Input
//                 placeholder="Apartment, suite, unit, etc."
//                 size="large"
//                 className="rounded-lg lg:rounded-xl"
//               />
//             </Form.Item>

//             <Form.Item name="district" label="District (Optional)">
//               <Input
//                 placeholder="Enter your district"
//                 size="large"
//                 className="rounded-lg lg:rounded-xl"
//               />
//             </Form.Item>
//           </div>
//         );

//       case 2:
//         return (
//           <div className="text-center py-6 lg:py-8 px-4">
//             {verificationStatus === 'sent' && (
//               <>
//                 <div className="w-16 h-16 lg:w-20 lg:h-20 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4 lg:mb-6">
//                   <MailOutlined className="text-orange-600 text-2xl lg:text-3xl" />
//                 </div>
                
//                 <h3 className="text-xl lg:text-2xl font-bold text-gray-900 mb-3">
//                   Verify Your Email Address
//                 </h3>
                
//                 <p className="text-gray-600 mb-2 text-base lg:text-lg">
//                   We've sent a verification link to your email
//                 </p>
                
//                 <p className="text-gray-500 mb-6 lg:mb-8 text-sm lg:text-base max-w-md mx-auto">
//                   Please check your email inbox (and spam folder) for the verification link. 
//                   Click the link to verify your email address and complete your registration.
//                 </p>

//                 <Card className="bg-orange-50 border border-orange-200 rounded-xl lg:rounded-2xl mb-6 lg:mb-8 max-w-lg mx-auto">
//                   <div className="text-left">
//                     <h4 className="font-semibold text-orange-800 mb-3 text-base lg:text-lg">
//                       Didn't receive the email?
//                     </h4>
//                     <ul className="text-orange-700 space-y-2 text-xs lg:text-sm">
//                       <li className="flex items-start">
//                         <span className="w-2 h-2 bg-orange-500 rounded-full mr-3 mt-2 flex-shrink-0"></span>
//                         Check your spam or junk folder
//                       </li>
//                       <li className="flex items-start">
//                         <span className="w-2 h-2 bg-orange-500 rounded-full mr-3 mt-2 flex-shrink-0"></span>
//                         Make sure you entered the correct email address
//                       </li>
//                       <li className="flex items-start">
//                         <span className="w-2 h-2 bg-orange-500 rounded-full mr-3 mt-2 flex-shrink-0"></span>
//                         Wait a few minutes and try again
//                       </li>
//                     </ul>
//                   </div>
//                 </Card>

//                 <div className="flex flex-col sm:flex-row gap-3 justify-center">
//                   <Button 
//                     onClick={resendVerificationEmail}
//                     size="large"
//                     className="h-12 px-6 lg:px-8 rounded-lg lg:rounded-xl border-orange-500 text-orange-600 hover:bg-orange-50 font-semibold"
//                   >
//                     Resend Verification Email
//                   </Button>
//                   <Button 
//                     onClick={() => navigate('/login')}
//                     size="large"
//                     className="h-12 px-6 lg:px-8 rounded-lg lg:rounded-xl border-gray-300 hover:border-green-500 font-semibold"
//                   >
//                     Go to Login
//                   </Button>
//                 </div>

//                 <div className="mt-6 flex items-center justify-center space-x-2">
//                   <Spin indicator={<LoadingOutlined style={{ fontSize: 16 }} spin />} />
//                   <span className="text-sm text-gray-500">Waiting for email verification...</span>
//                 </div>
//               </>
//             )}

//             {verificationStatus === 'verified' && (
//               <>
//                 <div className="w-16 h-16 lg:w-20 lg:h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4 lg:mb-6">
//                   <CheckCircleOutlined className="text-green-600 text-2xl lg:text-3xl" />
//                 </div>
                
//                 <h3 className="text-xl lg:text-2xl font-bold text-gray-900 mb-3">
//                   Email Verified Successfully!
//                 </h3>
                
//                 <p className="text-gray-600 mb-2 text-base lg:text-lg">
//                   Your email has been verified
//                 </p>
                
//                 <p className="text-gray-500 mb-6 lg:mb-8 text-sm lg:text-base max-w-md mx-auto">
//                   Thank you for verifying your email address. You are now being redirected to your dashboard.
//                 </p>

//                 <div className="flex justify-center">
//                   <Spin size="large" />
//                 </div>
//               </>
//             )}
//           </div>
//         );

//       case 3:
//         return (
//           <Result
//             status="success"
//             title="Registration Completed Successfully!"
//             subTitle="Your account has been created and verified. You can now access all features of the association system."
//             extra={[
//               <Button 
//                 type="primary" 
//                 key="dashboard" 
//                 onClick={() => navigate('/')}
//                 size="large"
//               >
//                 Go to Dashboard
//               </Button>,
//               <Button 
//                 key="login" 
//                 onClick={() => navigate('/login')}
//                 size="large"
//               >
//                 Sign In
//               </Button>,
//             ]}
//           />
//         );

//       default:
//         return null;
//     }
//   };

//   return (
//     <div className="space-y-6 lg:space-y-8">
//       {/* Enhanced Progress Steps */}
//       {currentStep < 3 && (
//         <Card className="border-0 shadow-sm bg-transparent" styles={{ bodyStyle: { padding: '16px lg:20px' } }}>
//           {/* <Steps 
//             current={currentStep} 
//             className="custom-steps mb-2"
//             size={screens.md ? "default" : "small"}
//             responsive={false}
//           > */}
//           <Steps
//   current={currentStep}
//   size={screens.md ? "default" : "small"}
//   direction={screens.md ? "horizontal" : "vertical"} // ✅ auto change direction
//   responsive
//   className="custom-steps mb-2"
// >
//             {steps.map((step, index) => (
//               <Step 
//                 key={index} 
//                 title={step.title} 
//                 description={screens.md ? step.description : null}
//                 icon={step.icon}
//               />
//             ))}
//           </Steps>
//           <div className="text-center text-xs lg:text-sm text-gray-500 mt-2">
//             Step {currentStep + 1} of {steps.length - 1}
//           </div>
//         </Card>
//       )}

//       {/* Messages */}
//       {message.text && (
//         <Alert
//           message={message.text}
//           type={message.type}
//           showIcon
//           closable
//           className="rounded-lg lg:rounded-xl border-0 shadow-sm mb-4 lg:mb-6"
//           style={{
//             backgroundColor: message.type === 'success' ? '#f0fdf4' : 
//                             message.type === 'warning' ? '#fffbeb' : '#fef2f2',
//             border: message.type === 'success' ? '1px solid #bbf7d0' : 
//                    message.type === 'warning' ? '1px solid #fed7aa' : '1px solid #fecaca'
//           }}
//         />
//       )}

//       {/* Registration Form */}
//       {currentStep < 2 ? (
//         <Card 
//           className="border-0 shadow-lg bg-white/95 backdrop-blur-sm"
//           styles={{ padding: '20px lg:32px' }}
//         >
//           <Form
//             form={form}
//             name="register"
//             onFinish={currentStep === 1 ? onFinish : undefined}
//             layout="vertical"
//             requiredMark={false}
//             scrollToFirstError
//             size="large"
//           >
//             {renderStepContent()}

//             <div className="flex justify-between items-center mt-6 lg:mt-10 pt-4 lg:pt-6 border-t border-gray-200">
//               <Button
//                 onClick={prevStep}
//                 disabled={currentStep === 0}
//                 size="large"
//                 className="h-10 lg:h-12 px-4 lg:px-8 rounded-lg lg:rounded-xl flex items-center border-gray-300 hover:border-green-500 text-sm lg:text-base"
//                 icon={screens.sm ? <ArrowLeftOutlined /> : null}
//               >
//                 {screens.sm ? 'Previous' : <ArrowLeftOutlined />}
//               </Button>

//               {currentStep < steps.length - 3 ? (
//                 <Button
//                   type="primary"
//                   onClick={nextStep}
//                   size="large"
//                   className="h-10 lg:h-12 px-4 lg:px-8 rounded-lg lg:rounded-xl flex items-center bg-gradient-to-r from-green-600 to-blue-600 border-0 font-semibold text-sm lg:text-base"
//                   icon={screens.sm ? <ArrowRightOutlined /> : null}
//                 >
//                   {screens.sm ? 'Next Step' : <ArrowRightOutlined />}
//                 </Button>
//               ) : (
//                 <Button
//                   type="primary"
//                   htmlType="submit"
//                   loading={loading}
//                   size="large"
//                   className="h-10 lg:h-12 px-4 lg:px-8 rounded-lg lg:rounded-xl bg-gradient-to-r from-green-600 to-emerald-600 border-0 font-semibold text-sm lg:text-base"
//                 >
//                   {loading ? "Submitting..." : "Complete Registration"}
//                 </Button>
//               )}
//             </div>
//           </Form>
//         </Card>
//       ) : (
//         <Card className="border-0 shadow-lg bg-white/95 backdrop-blur-sm">
//           {renderStepContent()}
//         </Card>
//       )}

//       {/* Terms and Login Link */}
//       {currentStep < 2 && (
//         <>
//           <Divider className="text-gray-300" />

//           <div className="text-center space-y-3 lg:space-y-4">
//             <p className="text-xs lg:text-sm text-gray-500">
//               By creating an account, you agree to our{" "}
//               <a href="/terms" className="text-green-600 hover:text-green-700 font-semibold transition-colors">
//                 Terms
//               </a>{" "}
//               and{" "}
//               <a href="/privacy" className="text-green-600 hover:text-green-700 font-semibold transition-colors">
//                 Privacy Policy
//               </a>
//             </p>

//             <p className="text-gray-600 text-sm lg:text-base">
//               Already a member?{" "}
//               <Link
//                 to="/login"
//                 className="text-green-600 hover:text-green-700 font-semibold transition-colors inline-flex items-center space-x-1 group"
//               >
//                 <span>Sign in here</span>
//                 <span className="group-hover:translate-x-1 transition-transform">→</span>
//               </Link>
//             </p>
//           </div>
//         </>
//       )}
//     </div>
//   );
// };

// export default Registration;





////////////////////bpdb/////////////////////

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Alert, Button, Card, Form, Input, Spin } from 'antd';
import { useNavigate } from 'react-router-dom';

const Registration = () => {
  const [registrationData, setRegistrationData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
  });

  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');
  const [checkingVerification, setCheckingVerification] = useState(false);
  const [registeredEmail, setRegisteredEmail] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setRegistrationData({ ...registrationData, [name]: value });
  };

  const handleSignUp = async () => {
    try {
      const response = await axios.post(
        'http://localhost:3000/api/v1/authentication/registration',
        registrationData,
        { headers: { "Content-Type": "application/json" } }
      );

      if (response.data.success) {
        setSuccess('Registration successful! Please check your email to verify your account.');
        setTimeout(() => {
              navigate('/login');
            }, 2000);
        setError('');
        setRegisteredEmail(registrationData.email);
        setCheckingVerification(true);
      } else {
        setError(response.data.error || 'Something went wrong.');
        setSuccess('');
      }
    } catch (err) {
  console.error("Registration error:", err);

  if (err.response && err.response.data && err.response.data.error) {
    // Handle server-side validation errors
    setError(err.response.data.error);
  } else {
    // Fallback message for network/server crash
    setError("Cannot connect to the server. Please try again later.");
  }
}

  };

  // Polling to check email verification status
  useEffect(() => {
    let interval;

    if (checkingVerification && registeredEmail) {
      interval = setInterval(async () => {
        try {
          const response = await axios.get(`http://localhost:3000/api/v1/authentication/check-verification?email=${registeredEmail}`);
          if (response.data.verified) {
            clearInterval(interval);
            setCheckingVerification(false);
            setSuccess('Email verified successfully! Redirecting to login...');
            setTimeout(() => {
              navigate('/login');
            }, 2000);
          }
        } catch (err) {
          console.error('Verification check failed:', err);
        }
      }, 5000); // check every 5 seconds
    }

    return () => clearInterval(interval);
  }, [checkingVerification, registeredEmail, navigate]);

  return (
    <Card title="Registration" variant="outlined" style={{ width: 600, margin: 'auto', paddingTop: '100px' }}>
      {success && <Alert message={success} type="success" showIcon style={{ marginBottom: 16 }} />}
      {error && <Alert message={error} type="error" showIcon style={{ marginBottom: 16 }} />}
      {/* {checkingVerification && (
        <Spin tip="Waiting for email verification..." style={{ marginBottom: 16 }} />
      )} */}
      {checkingVerification ? (
  <Spin tip="Waiting for email verification...">
    <div style={{ height: 200 }} />
  </Spin>
) : (
  <Form layout="vertical" style={{ maxWidth: 600 }}>
    ...
  </Form>
)}


      <Form layout="vertical" style={{ maxWidth: 600 }}>
        <Form.Item label="First Name">
          <Input name="firstName" onChange={handleChange} />
        </Form.Item>
        <Form.Item label="Last Name">
          <Input name="lastName" onChange={handleChange} />
        </Form.Item>
        <Form.Item label="Email">
          <Input name="email" onChange={handleChange} />
        </Form.Item>
        <Form.Item label="Password">
          <Input.Password name="password" onChange={handleChange} />
        </Form.Item>
        <Form.Item>
          <Button type="primary" onClick={handleSignUp} disabled={checkingVerification}>
            Sign Up
          </Button>
        </Form.Item>
      </Form>
    </Card>
  );
};

export default Registration;


