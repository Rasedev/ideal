// components/auth/ForgotPassword.jsx
// import { useState } from "react";
// import { Link } from "react-router-dom";
// import { Form, Input, Button, Alert, Steps, Card, Result } from "antd";
// import { MailOutlined, CheckCircleOutlined, SecurityScanOutlined } from "@ant-design/icons";
// import axios from "axios";

// const { Step } = Steps;

// const ForgotPassword = () => {
//   const [form] = Form.useForm();
//   const [loading, setLoading] = useState(false);
//   const [currentStep, setCurrentStep] = useState(0);
//   const [message, setMessage] = useState({ type: "", text: "" });
//   const [email, setEmail] = useState("");

//   const steps = [
//     {
//       title: 'Enter Email',
//       description: 'Provide your email address',
//     },
//     {
//       title: 'Check Email',
//       description: 'Verify reset code',
//     },
//     {
//       title: 'Reset Password',
//       description: 'Create new password',
//     },
//     {
//       title: 'Complete',
//       description: 'Password updated',
//     },
//   ];

//   const handleSendCode = async (values) => {
//     setLoading(true);
//     setMessage({ type: "", text: "" });

//     try {
//       const response = await axios.post(
//         "http://localhost:3000/api/v1/authentication/forgot-password",
//         { email: values.email }
//       );

//       if (response.data.success) {
//         setEmail(values.email);
//         setCurrentStep(1);
//         setMessage({ 
//           type: "success", 
//           text: "Password reset code has been sent to your email address." 
//         });
//       } else {
//         setMessage({
//           type: "error",
//           text: response.data.error || "Failed to send reset code. Please try again.",
//         });
//       }
//     } catch (err) {
//       console.error("Forgot password error:", err);
//       const errorMessage = err.response?.data?.error || "Failed to send reset code. Please try again.";
//       setMessage({ type: "error", text: errorMessage });
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleVerifyCode = async (values) => {
//     setLoading(true);
//     setMessage({ type: "", text: "" });

//     try {
//       const response = await axios.post(
//         "http://localhost:3000/api/v1/authentication/verify-reset-code",
//         {
//           email: email,
//           code: values.code
//         }
//       );

//       if (response.data.success) {
//         setCurrentStep(2);
//         setMessage({ 
//           type: "success", 
//           text: "Code verified successfully. You can now reset your password." 
//         });
//       } else {
//         setMessage({
//           type: "error",
//           text: response.data.error || "Invalid verification code. Please try again.",
//         });
//       }
//     } catch (err) {
//       console.error("Verify code error:", err);
//       const errorMessage = err.response?.data?.error || "Invalid verification code. Please try again.";
//       setMessage({ type: "error", text: errorMessage });
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleResetPassword = async (values) => {
//     setLoading(true);
//     setMessage({ type: "", text: "" });

//     try {
//       const response = await axios.post(
//         "http://localhost:3000/api/v1/authentication/reset-password",
//         {
//           email: email,
//           code: values.code,
//           newPassword: values.newPassword
//         }
//       );

//       if (response.data.success) {
//         setCurrentStep(3);
//         setMessage({ 
//           type: "success", 
//           text: "Password has been reset successfully." 
//         });
//       } else {
//         setMessage({
//           type: "error",
//           text: response.data.error || "Failed to reset password. Please try again.",
//         });
//       }
//     } catch (err) {
//       console.error("Reset password error:", err);
//       const errorMessage = err.response?.data?.error || "Failed to reset password. Please try again.";
//       setMessage({ type: "error", text: errorMessage });
//     } finally {
//       setLoading(false);
//     }
//   };

//   const renderStepContent = () => {
//     switch (currentStep) {
//       case 0:
//         return (
//           <Form
//             form={form}
//             name="forgotPassword"
//             onFinish={handleSendCode}
//             layout="vertical"
//             requiredMark={false}
//             className="space-y-4"
//           >
//             <div className="text-center mb-6">
//               <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
//                 <SecurityScanOutlined className="text-blue-600 text-xl" />
//               </div>
//               <h3 className="text-lg font-semibold text-gray-900 mb-2">
//                 Forgot your password?
//               </h3>
//               <p className="text-gray-600 text-sm">
//                 Enter your email address and we'll send you a code to reset your password.
//               </p>
//             </div>

//             <Form.Item
//               name="email"
//               label="Email Address"
//               rules={[
//                 { required: true, message: "Please enter your email" },
//                 { type: "email", message: "Please enter a valid email" },
//               ]}
//             >
//               <Input
//                 prefix={<MailOutlined className="text-gray-400" />}
//                 placeholder="Enter your email address"
//                 size="large"
//                 className="rounded-lg"
//               />
//             </Form.Item>

//             <Form.Item>
//               <Button
//                 type="primary"
//                 htmlType="submit"
//                 loading={loading}
//                 size="large"
//                 block
//                 className="rounded-lg h-12 font-semibold"
//               >
//                 Send Reset Code
//               </Button>
//             </Form.Item>
//           </Form>
//         );

//       case 1:
//         return (
//           <Form
//             form={form}
//             name="verifyCode"
//             onFinish={handleVerifyCode}
//             layout="vertical"
//             requiredMark={false}
//             className="space-y-4"
//           >
//             <div className="text-center mb-6">
//               <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-3">
//                 <MailOutlined className="text-orange-600 text-xl" />
//               </div>
//               <h3 className="text-lg font-semibold text-gray-900 mb-2">
//                 Check your email
//               </h3>
//               <p className="text-gray-600 text-sm">
//                 We sent a 6-digit verification code to <strong>{email}</strong>
//               </p>
//             </div>

//             <Form.Item
//               name="code"
//               label="Verification Code"
//               rules={[
//                 { required: true, message: "Please enter the verification code" },
//                 { len: 6, message: "Code must be 6 digits" },
//               ]}
//             >
//               <Input.OTP 
//                 length={6} 
//                 size="large"
//                 className="justify-center"
//               />
//             </Form.Item>

//             <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 mb-4">
//               <p className="text-blue-800 text-sm text-center">
//                 Didn't receive the code?{" "}
//                 <Button 
//                   type="link" 
//                   className="p-0 h-auto font-semibold" 
//                   onClick={() => form.submit()}
//                   loading={loading}
//                 >
//                   Resend Code
//                 </Button>
//               </p>
//             </div>

//             <Form.Item>
//               <Button
//                 type="primary"
//                 htmlType="submit"
//                 loading={loading}
//                 size="large"
//                 block
//                 className="rounded-lg h-12 font-semibold"
//               >
//                 Verify Code
//               </Button>
//             </Form.Item>
//           </Form>
//         );

//       case 2:
//         return (
//           <Form
//             form={form}
//             name="resetPassword"
//             onFinish={handleResetPassword}
//             layout="vertical"
//             requiredMark={false}
//             className="space-y-4"
//           >
//             <div className="text-center mb-6">
//               <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
//                 <CheckCircleOutlined className="text-green-600 text-xl" />
//               </div>
//               <h3 className="text-lg font-semibold text-gray-900 mb-2">
//                 Create new password
//               </h3>
//               <p className="text-gray-600 text-sm">
//                 Your new password must be different from previous used passwords.
//               </p>
//             </div>

//             <Form.Item
//               name="code"
//               label="Verification Code"
//               rules={[
//                 { required: true, message: "Please enter the verification code" },
//                 { len: 6, message: "Code must be 6 digits" },
//               ]}
//             >
//               <Input.OTP 
//                 length={6} 
//                 size="large"
//                 className="justify-center"
//               />
//             </Form.Item>

//             <Form.Item
//               name="newPassword"
//               label="New Password"
//               rules={[
//                 { required: true, message: "Please enter new password" },
//                 { min: 6, message: "Password must be at least 6 characters" },
//               ]}
//             >
//               <Input.Password
//                 placeholder="Enter new password"
//                 size="large"
//                 className="rounded-lg"
//               />
//             </Form.Item>

//             <Form.Item
//               name="confirmPassword"
//               label="Confirm New Password"
//               dependencies={['newPassword']}
//               rules={[
//                 { required: true, message: "Please confirm new password" },
//                 ({ getFieldValue }) => ({
//                   validator(_, value) {
//                     if (!value || getFieldValue('newPassword') === value) {
//                       return Promise.resolve();
//                     }
//                     return Promise.reject(new Error('Passwords do not match'));
//                   },
//                 }),
//               ]}
//             >
//               <Input.Password
//                 placeholder="Confirm new password"
//                 size="large"
//                 className="rounded-lg"
//               />
//             </Form.Item>

//             <Form.Item>
//               <Button
//                 type="primary"
//                 htmlType="submit"
//                 loading={loading}
//                 size="large"
//                 block
//                 className="rounded-lg h-12 font-semibold"
//               >
//                 Reset Password
//               </Button>
//             </Form.Item>
//           </Form>
//         );

//       case 3:
//         return (
//           <Result
//             status="success"
//             title="Password Reset Successful!"
//             subTitle="Your password has been reset successfully. You can now login with your new password."
//             extra={[
//               <Button type="primary" key="login" size="large" onClick={() => window.location.href = '/login'}>
//                 Go to Login
//               </Button>,
//               <Button key="home" size="large" onClick={() => window.location.href = '/'}>
//                 Back to Home
//               </Button>,
//             ]}
//           />
//         );

//       default:
//         return null;
//     }
//   };

//   return (
//     <div className="space-y-6">
//       {/* Header */}
//       <div className="text-center">
//         <h3 className="text-2xl font-bold text-gray-900 mb-2">
//           Reset your password
//         </h3>
//         <p className="text-gray-600">
//           Follow the steps to recover your account
//         </p>
//       </div>

//       {/* Progress Steps - Hide on completion */}
//       {currentStep < 3 && (
//         <Steps current={currentStep} size="small" className="mb-8">
//           {steps.map((step, index) => (
//             <Step key={index} title={step.title} />
//           ))}
//         </Steps>
//       )}

//       {/* Messages */}
//       {message.text && currentStep < 3 && (
//         <Alert
//           message={message.text}
//           type={message.type}
//           showIcon
//           closable
//           className="mb-4"
//         />
//       )}

//       {/* Form Content */}
//       <Card 
//         bordered={false} 
//         className="shadow-sm border-0"
//         bodyStyle={{ padding: currentStep === 3 ? '0' : '24px' }}
//       >
//         {renderStepContent()}
//       </Card>

//       {/* Back to Login */}
//       {currentStep < 3 && (
//         <div className="text-center">
//           <p className="text-gray-600">
//             Remember your password?{" "}
//             <Link
//               to="/login"
//               className="text-blue-600 hover:text-blue-700 font-semibold"
//             >
//               Back to login
//             </Link>
//           </p>
//         </div>
//       )}
//     </div>
//   );
// };

// export default ForgotPassword;







import { useState } from "react";
import { Link } from "react-router-dom";
import { Form, Input, Button, Alert, Steps, Card, Result, message } from "antd";
import { MailOutlined, CheckCircleOutlined, SecurityScanOutlined } from "@ant-design/icons";
import axios from "axios";

const { Step } = Steps;

const ForgotPassword = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [email, setEmail] = useState("");

  const steps = [
    { title: 'Enter Email', description: 'Verify identity' },
    { title: 'Reset Code', description: 'Enter verification' },
    { title: 'New Password', description: 'Set new password' },
    { title: 'Complete', description: 'Password updated' },
  ];

  const handleSendCode = async (values) => {
    setLoading(true);
    try {
      const response = await axios.post(
        "http://localhost:3000/api/v1/authentication/forgot-password",
        { email: values.email }
      );

      if (response.data.success) {
        setEmail(values.email);
        setCurrentStep(1);
        message.success("Reset code sent to your email");
      } else {
        message.error(response.data.error || "Failed to send reset code");
      }
    } catch (err) {
      message.error("Failed to send reset code. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyCode = async (values) => {
    setLoading(true);
    try {
      const response = await axios.post(
        "http://localhost:3000/api/v1/authentication/verify-reset-code",
        { email, code: values.code }
      );

      if (response.data.success) {
        setCurrentStep(2);
        message.success("Code verified successfully");
      } else {
        message.error("Invalid verification code");
      }
    } catch (err) {
      message.error("Invalid verification code");
    } finally {
      setLoading(false);
    }
  };

  const handleResetPassword = async (values) => {
    setLoading(true);
    try {
      const response = await axios.post(
        "http://localhost:3000/api/v1/authentication/reset-password",
        {
          email,
          code: values.code,
          newPassword: values.newPassword
        }
      );

      if (response.data.success) {
        setCurrentStep(3);
        message.success("Password reset successfully");
      } else {
        message.error("Failed to reset password");
      }
    } catch (err) {
      message.error("Failed to reset password");
    } finally {
      setLoading(false);
    }
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 0:
        return (
          <Form form={form} onFinish={handleSendCode} layout="vertical">
            <div className="text-center mb-6">
              <SecurityScanOutlined className="text-4xl text-blue-600 mb-4" />
              <h3 className="text-lg font-semibold">Reset Your Password</h3>
              <p className="text-gray-600">Enter your email to receive a reset code</p>
            </div>

            <Form.Item
              name="email"
              rules={[
                { required: true, message: "Please enter email" },
                { type: "email", message: "Invalid email" },
              ]}
            >
              <Input
                prefix={<MailOutlined />}
                placeholder="Enter your association email"
                size="large"
              />
            </Form.Item>

            <Button
              type="primary"
              htmlType="submit"
              loading={loading}
              size="large"
              block
            >
              Send Reset Code
            </Button>
          </Form>
        );

      case 1:
        return (
          <Form form={form} onFinish={handleVerifyCode} layout="vertical">
            <div className="text-center mb-6">
              <MailOutlined className="text-4xl text-orange-600 mb-4" />
              <h3 className="text-lg font-semibold">Check Your Email</h3>
              <p className="text-gray-600">Enter the 6-digit code sent to {email}</p>
            </div>

            <Form.Item
              name="code"
              rules={[
                { required: true, message: "Please enter code" },
                { len: 6, message: "Code must be 6 digits" },
              ]}
            >
              <Input.OTP length={6} size="large" />
            </Form.Item>

            <Button
              type="primary"
              htmlType="submit"
              loading={loading}
              size="large"
              block
            >
              Verify Code
            </Button>
          </Form>
        );

      case 2:
        return (
          <Form form={form} onFinish={handleResetPassword} layout="vertical">
            <div className="text-center mb-6">
              <CheckCircleOutlined className="text-4xl text-green-600 mb-4" />
              <h3 className="text-lg font-semibold">Create New Password</h3>
              <p className="text-gray-600">Enter your new password</p>
            </div>

            <Form.Item
              name="code"
              rules={[{ required: true, message: "Please enter code" }]}
            >
              <Input.OTP length={6} size="large" />
            </Form.Item>

            <Form.Item
              name="newPassword"
              rules={[
                { required: true, message: "Please enter password" },
                { min: 6, message: "Minimum 6 characters" },
              ]}
            >
              <Input.Password
                placeholder="New password"
                size="large"
              />
            </Form.Item>

            <Form.Item
              name="confirmPassword"
              dependencies={['newPassword']}
              rules={[
                { required: true, message: "Please confirm password" },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue('newPassword') === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject(new Error('Passwords do not match'));
                  },
                }),
              ]}
            >
              <Input.Password
                placeholder="Confirm new password"
                size="large"
              />
            </Form.Item>

            <Button
              type="primary"
              htmlType="submit"
              loading={loading}
              size="large"
              block
            >
              Reset Password
            </Button>
          </Form>
        );

      case 3:
        return (
          <Result
            status="success"
            title="Password Reset Successfully!"
            subTitle="Your password has been updated. You can now login with your new password."
            extra={[
              <Button type="primary" key="login" href="/login">
                Go to Login
              </Button>,
            ]}
          />
        );

      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h3 className="text-2xl font-bold text-gray-900">
          Alamgir Hossain City Kallan Samity
        </h3>
        <p className="text-gray-600">Password Recovery</p>
      </div>

      {currentStep < 3 && (
        <Steps current={currentStep} size="small" className="mb-6">
          {steps.map((step, index) => (
            <Step key={index} title={step.title} />
          ))}
        </Steps>
      )}

      <Card>
        {renderStepContent()}
      </Card>

      {currentStep < 3 && (
        <div className="text-center">
          <Link to="/login" className="text-green-600 font-semibold">
            Back to Login
          </Link>
        </div>
      )}
    </div>
  );
};

export default ForgotPassword;






