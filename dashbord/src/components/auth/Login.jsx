/////////////Final Version

// import { useState, useEffect } from "react";
// import { useNavigate, Link, useLocation } from "react-router-dom";
// import {
//   Form,
//   Input,
//   Button,
//   Alert,
//   Divider,
//   Checkbox,
//   Card,
//   Tabs,
//   Tag,
//   Spin,
//   Row,
//   Col,
//   message,
// } from "antd";
// import {
//   MailOutlined,
//   LockOutlined,
//   EyeInvisibleOutlined,
//   EyeTwoTone,
//   UserOutlined,
//   SafetyCertificateOutlined,
//   IdcardOutlined,
//   TeamOutlined,
// } from "@ant-design/icons";
// import axios from "axios";
// import { useDispatch } from "react-redux";
// import { setCurrentUser } from "../../components/slices/userSlice";

// const Login = () => {
//   const [form] = Form.useForm();
//   const [loading, setLoading] = useState(false);
//   const [alertMsg, setAlertMsg] = useState({ type: "", text: "" });
//   const [activeTab, setActiveTab] = useState("1");
//   const [userStats, setUserStats] = useState(null);
//   const [statsLoading, setStatsLoading] = useState(true);
//   const [associationRoles, setAssociationRoles] = useState([]);

//   const navigate = useNavigate();
//   const location = useLocation();
//   const dispatch = useDispatch();
//   const from = location.state?.from?.pathname || "/";
//   const onValuesChange = () => {
//   if (alertMsg.text) setAlertMsg({ type: "", text: "" });
// };

//   // 🔹 Fetch user stats
//   // useEffect(() => {
//   //   const fetchUserStats = async () => {
//   //     try {
//   //       const { data } = await axios.get("http://localhost:3000/api/v1/user/stats");
//   //       if (data.success) {
//   //         setUserStats(data.data);
//   //       }
//   //     } catch {
//   //       // fallback demo stats
//   //       setUserStats({
//   //         totalUsers: 347,
//   //         activeUsers: 289,
//   //         newUsers: 12,
//   //         onlineUsers: 45,
//   //       });
//   //     } finally {
//   //       setStatsLoading(false);
//   //     }
//   //   };

//   //   fetchUserStats();
//   // }, []);

//   // // 🔹 Fetch roles
//   // useEffect(() => {
//   //   const fetchRoles = async () => {
//   //     try {
//   //       const { data } = await axios.get("http://localhost:3000/api/v1/user/roles");
//   //       if (data.success) setAssociationRoles(data.data);
//   //     } catch (error) {
//   //       console.error("Failed to load roles:", error);
//   //     }
//   //   };
//   //   fetchRoles();
//   // }, []);

//   // 🔹 Handle login submit
//   const onFinish = async (values) => {
//     setLoading(true);
//     setAlertMsg({ type: "", text: "" });

//     try {
//       const { data } = await axios.post(
//         "http://localhost:3000/api/v1/authentication/login",
//         values
//       );

//       if (data.success && data.token && data.user) {
//         const { role, email, firstName, lastName, _id, profilePicture, designation } =
//           data.user;

//         const user = {
//           email,
//           role,
//           token: data.token,
//           userId: _id,
//           firstName,
//           lastName,
//           profilePicture,
//           designation,
//         };

//         localStorage.setItem("token", data.token);
//         localStorage.setItem("user", JSON.stringify(user));
//         dispatch(setCurrentUser(user));

//         setAlertMsg({
//           type: "success",
//           text: `Welcome back, ${firstName}${
//             designation ? ` (${designation})` : ""
//           }! Redirecting...`,
//         });

//         message.success("Welcome to Alamgir Hossain City Kallan Samity!");

//         setTimeout(() => {
//           navigate(from, { replace: true });
//         }, 1500);
//       } else {
//         setAlertMsg({
//           type: "error",
//           text: data.error || "Invalid login credentials",
//         });
//       }
//     } catch (err) {
//       console.error("Login error:", err);
//       setAlertMsg({
//         type: "error",
//         text: err.response?.data?.error || "Login failed. Please try again.",
//       });
//     } finally {
//       setLoading(false);
//     }
//   };

//   // 🔹 Quick login demo
//   // const quickLogin = (credential) => {
//   //   form.setFieldsValue({
//   //     email: credential.email,
//   //     password: credential.password,
//   //   });
//   //   setActiveTab("1");
//   //   message.info(`Demo login for ${credential.role} role`);
//   // };
//   const quickLogin = async (credential) => {
//   setActiveTab("1");
//   message.loading({ content: `Logging in as ${credential.role}...`, key: "login" });

//   try {
//     // call the same login endpoint directly
//     const { data } = await axios.post("http://localhost:3000/api/v1/authentication/login", {
//       email: credential.email,
//       password: credential.password,
//     });

//     if (data.success && data.token && data.user) {
//       const { role, email, firstName, lastName, _id, profilePicture, designation } = data.user;

//       const user = {
//         email,
//         role,
//         token: data.token,
//         userId: _id,
//         firstName,
//         lastName,
//         profilePicture,
//         designation,
//       };

//       localStorage.setItem("token", data.token);
//       localStorage.setItem("user", JSON.stringify(user));
//       dispatch(setCurrentUser(user));

//       message.success({
//         content: `Logged in as ${role}`,
//         key: "login",
//         duration: 1.5,
//       });

//       // redirect after login
//       navigate(from, { replace: true });
//     } else {
//       message.error({ content: data.error || "Login failed", key: "login" });
//     }
//   } catch (error) {
//     console.error("Demo login error:", error);
//     message.error({ content: "Unable to login. Check API or credentials.", key: "login" });
//   }
// };

//   // ✅ Tabs configuration (proper usage)
//   const tabItems = [
//     {
//       key: "1",
//       label: (
//         <span className="flex items-center">
//           <UserOutlined className="mr-2" />
//           Member Login
//         </span>
//       ),
//       children: (
//         <Form
//           form={form}
//           name="login"
//           onFinish={onFinish}
//           onValuesChange={onValuesChange}
//           layout="vertical"
//           requiredMark={false}
//           className="space-y-6 mt-4"
//         >
//           <Form.Item
//             name="email"
//             label={<span className="text-sm font-semibold text-gray-700">Email Address</span>}
//             rules={[
//               { required: true, message: "Please enter your email" },
//               { type: "email", message: "Please enter a valid email" },
//             ]}
//           >
//             <Input
//               prefix={<MailOutlined className="text-gray-400" />}
//               placeholder="Enter your registered email"
//               size="large"
//               className="rounded-xl h-12 border-gray-200 hover:border-green-300 focus:border-green-500 shadow-sm"
//             />
//           </Form.Item>

//           <Form.Item
//             name="password"
//             label={<span className="text-sm font-semibold text-gray-700">Password</span>}
//             rules={[{ required: true, message: "Please enter your password" }]}
//           >
//             <Input.Password
//               prefix={<LockOutlined className="text-gray-400" />}
//               placeholder="Enter your password"
//               size="large"
//               className="rounded-xl h-12 border-gray-200 hover:border-green-300 focus:border-green-500 shadow-sm"
//               iconRender={(visible) =>
//                 visible ? <EyeTwoTone className="text-green-500" /> : <EyeInvisibleOutlined className="text-gray-400" />
//               }
//             />
//           </Form.Item>

//           <div className="flex items-center justify-between">
//             <Form.Item name="remember" valuePropName="checked" noStyle>
//               <Checkbox className="text-gray-600 hover:text-gray-800">
//                 Remember me for 30 days
//               </Checkbox>
//             </Form.Item>
//             <Link
//               to="/forgot-password"
//               className="text-green-600 hover:text-green-700 text-sm font-semibold transition-colors duration-200"
//             >
//               Forgot password?
//             </Link>
//           </div>

//           <Form.Item>
//             <Button
//               type="primary"
//               htmlType="submit"
//               loading={loading}
//               size="large"
//               block
//               className="rounded-xl h-12 font-semibold text-base shadow-lg hover:shadow-xl transition-all duration-300 bg-gradient-to-r from-green-600 to-blue-600 border-0"
//             >
//               {loading ? "Signing In..." : "Access Member Portal"}
//             </Button>
//           </Form.Item>
//         </Form>
//       ),
//     },
//     {
//       key: "2",
//       label: (
//         <span className="flex items-center">
//           <IdcardOutlined className="mr-2" />
//           Role Demo
//         </span>
//       ),
//       children: (
//         <div className="space-y-4 mt-4">
//           <p className="text-gray-600 text-sm text-center mb-6">
//             Experience different association roles with demo credentials
//           </p>

//           {associationRoles.map((credential, index) => (
//             <div
//               key={index}
//               className="group p-4 border border-gray-200 rounded-xl hover:border-green-300 hover:shadow-md transition-all duration-300 cursor-pointer bg-white"
//               onClick={() => quickLogin(credential)}
//             >
//               <div className="flex items-center justify-between">
//                 <div className="flex items-center space-x-3">
//                   <Tag color={credential.color} className="font-semibold px-3 py-1">
//                     {credential.role}
//                   </Tag>
//                   <div>
//                     <div className="text-sm font-medium text-gray-900">
//                       {credential.designation}
//                     </div>
//                     <div className="text-xs text-gray-500">{credential.email}</div>
//                   </div>
//                 </div>
//                 <Button
//                   type="link"
//                   size="small"
//                   className="text-green-600 opacity-0 group-hover:opacity-100 transition-opacity duration-200 font-semibold"
//                 >
//                   Use →
//                 </Button>
//               </div>
//             </div>
//           ))}
//         </div>
//       ),
//     },
//   ];

//   return (
//     <div className="space-y-6">
//       {/* Header */}
//       <div className="text-center">
//         <div className="flex items-center justify-center space-x-3 mb-4">
//           <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-blue-500 rounded-2xl flex items-center justify-center">
//             <TeamOutlined className="text-white text-xl" />
//           </div>
//           <div>
//             <h3 className="text-2xl font-bold text-gray-900">Member Portal Access</h3>
//             <p className="text-gray-600 mt-1">Alamgir Hossain City Kallan Samity</p>
//           </div>
//         </div>
//       </div>

//       {/* Stats */}
//       {!statsLoading && userStats && (
//         <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-2xl p-6 border border-green-200/50 shadow-sm">
//           <h4 className="text-sm font-semibold text-gray-700 mb-3 flex items-center">
//             <SafetyCertificateOutlined className="mr-2 text-green-600" />
//             Association Overview
//           </h4>
//           <Row gutter={[16, 16]}>
//             <Col span={12}>
//               <div className="text-center">
//                 <div className="text-2xl font-bold text-green-600">{userStats.totalUsers}</div>
//                 <div className="text-xs text-gray-600">Total Members</div>
//               </div>
//             </Col>
//             <Col span={12}>
//               <div className="text-center">
//                 <div className="text-2xl font-bold text-blue-600">{userStats.activeUsers}</div>
//                 <div className="text-xs text-gray-600">Active Members</div>
//               </div>
//             </Col>
//           </Row>
//         </div>
//       )}

//       {statsLoading && (
//         <div className="flex justify-center py-4">
//           <Spin size="small" />
//         </div>
//       )}

//       {/* Message */}
//       {alertMsg.text && (
//         <Alert
//           message={alertMsg.text}
//           type={alertMsg.type}
//           showIcon
//           closable
//           className="rounded-xl border-0 shadow-sm"
//           style={{
//             backgroundColor:
//               alertMsg.type === "success" ? "#f0fdf4" : "#fef2f2",
//             border:
//               alertMsg.type === "success"
//                 ? "1px solid #bbf7d0"
//                 : "1px solid #fecaca",
//           }}
//         />
//       )}

//       {/* Tabs */}
//       <Card className="border-0 shadow-sm bg-transparent">
//         <Tabs activeKey={activeTab} onChange={setActiveTab} centered items={tabItems} />
//       </Card>

//       {/* Divider & Links */}
//       <Divider plain className="text-gray-400 text-xs before:bg-gray-200 after:bg-gray-200">
//         New to association?
//       </Divider>

//       <div className="text-center space-y-4">
//         <p className="text-gray-600">
//           Don't have an account?{" "}
//           <Link
//             to="/registration"
//             className="text-green-600 hover:text-green-700 font-semibold transition-colors duration-200 inline-flex items-center space-x-1 group"
//           >
//             <span>Register as member</span>
//             <span className="group-hover:translate-x-1 transition-transform duration-200">
//               →
//             </span>
//           </Link>
//         </p>

//         <div className="text-xs text-gray-500">
//           By signing in, you agree to our{" "}
//           <a href="/terms" className="text-green-600 hover:text-green-700 font-medium">
//             Terms of Service
//           </a>{" "}
//           and{" "}
//           <a href="/privacy" className="text-green-600 hover:text-green-700 font-medium">
//             Privacy Policy
//           </a>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Login;

/////////////////////Corrected Version/////////////////

// import { useEffect, useState } from "react";
// import { useNavigate, Link, useLocation } from "react-router-dom";
// import {
//   Form,
//   Input,
//   Button,
//   Alert,
//   Divider,
//   Checkbox,
//   Card,
//   Tabs,
//   Tag,
//   Row,
//   Col,
//   message,
// } from "antd";
// import {
//   MailOutlined,
//   LockOutlined,
//   EyeInvisibleOutlined,
//   EyeTwoTone,
//   UserOutlined,
//   SafetyCertificateOutlined,
//   IdcardOutlined,
//   TeamOutlined,
// } from "@ant-design/icons";
// import { useDispatch } from "react-redux";
// import { setCurrentUser } from "../slices/userSlice";
// import { apiService } from "../../services/apiService";

// const Login = () => {
//   const [form] = Form.useForm();
//   const [loading, setLoading] = useState(false);
//   const [alertMsg, setAlertMsg] = useState({ type: "", text: "" });
//   const [activeTab, setActiveTab] = useState("1");

//   const navigate = useNavigate();
//   const location = useLocation();
//   const dispatch = useDispatch();
//   const from = location.state?.from?.pathname || "/";

//   // Demo credentials for different roles
//   const demoCredentials = [
//     {
//       role: "Admin",
//       designation: "System Administrator",
//       email: "admin@alamgir.com",
//       password: "admin123",
//       color: "red",
//     },
//     {
//       role: "HR",
//       designation: "Human Resources",
//       email: "hr@alamgir.com",
//       password: "hr123",
//       color: "blue",
//     },
//     {
//       role: "Employee",
//       designation: "Association Employee",
//       email: "employee@alamgir.com",
//       password: "employee123",
//       color: "green",
//     },
//     {
//       role: "Member",
//       designation: "General Member",
//       email: "member@alamgir.com",
//       password: "member123",
//       color: "orange",
//     },
//   ];
// // Add this to your Login component temporarily
// useEffect(() => {
//   const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api/v1';
//   console.log("🔍 API CONFIGURATION:", {
//     baseURL: API_BASE_URL,
//     loginEndpoint: `${API_BASE_URL}/authentication/login`,
//     fullURL: 'http://localhost:3000/api/v1/authentication/login'
//   });
// }, []);
//   const onValuesChange = () => {
//     if (alertMsg.text) setAlertMsg({ type: "", text: "" });
//   };

//   // // Handle login submit using your API service
//   // const onFinish = async (values) => {
//   //   setLoading(true);
//   //   setAlertMsg({ type: "", text: "" });

//   //   try {
//   //     console.log("🚀 LOGIN STARTED with:", values);

//   //     const response = await apiService.auth.login(values);
//   //     console.log("📨 RAW RESPONSE:", response);

//   //     const { data } = response;
//   //     console.log("📦 RESPONSE DATA:", data);

//   //     if (data.success && data.token && data.user) {
//   //       console.log("✅ LOGIN SUCCESS - Storing data...");

//   //       // Store data with verification
//   //       localStorage.setItem("token", data.token);
//   //       localStorage.setItem("user", JSON.stringify(data.user));
//   //       localStorage.setItem("currentUser", JSON.stringify(data.user));

//   //       // Verify storage
//   //       const storedToken = localStorage.getItem("token");
//   //       const storedUser = localStorage.getItem("user");
//   //       console.log("💾 STORAGE VERIFICATION:", {
//   //         tokenStored: !!storedToken,
//   //         userStored: !!storedUser,
//   //         tokenLength: storedToken?.length,
//   //         userData: storedUser,
//   //       });

//   //       // Dispatch to Redux
//   //       dispatch(setCurrentUser(data.user));

//   //       console.log("🔄 REDUX DISPATCHED - Navigating...");

//   //       // Force navigation
//   //       setTimeout(() => {
//   //         window.location.href = from || "/";
//   //       }, 1000);
//   //     } else {
//   //       console.log("❌ LOGIN FAILED - No token/user in response");
//   //       setAlertMsg({
//   //         type: "error",
//   //         text: data.error || "Login failed - no token received",
//   //       });
//   //     }
//   //   } catch (err) {
//   //     console.error("💥 LOGIN ERROR:", err);
//   //     console.error("Error response:", err.response?.data);
//   //   } finally {
//   //     setLoading(false);
//   //   }
//   // };

// //   // Temporary direct fetch test - replace your onFinish with this:
// // const onFinish = async (values) => {
// //   setLoading(true);
// //   setAlertMsg({ type: "", text: "" });

// //   try {
// //     console.log("🔧 USING DIRECT FETCH...");
    
// //     const response = await fetch('http://localhost:3000/api/v1/auth/login', {
// //       method: 'POST',
// //       headers: {
// //         'Content-Type': 'application/json',
// //       },
// //       body: JSON.stringify(values)
// //     });

// //     console.log("📨 RESPONSE STATUS:", response.status);
// //     console.log("📨 RESPONSE HEADERS:", response.headers);
    
// //     const data = await response.json();
// //     console.log("📦 PARSED DATA:", data);

// //     if (data.success && data.token && data.user) {
// //       console.log("✅ DIRECT LOGIN SUCCESS");
      
// //       // Store data
// //       localStorage.setItem("token", data.token);
// //       localStorage.setItem("user", JSON.stringify(data.user));
// //       localStorage.setItem("currentUser", JSON.stringify(data.user));
      
// //       // Verify immediately
// //       console.log("🔍 STORAGE CHECK:", {
// //         token: localStorage.getItem("token"),
// //         user: localStorage.getItem("user")
// //       });

// //       dispatch(setCurrentUser(data.user));
      
// //       // Force redirect
// //       setTimeout(() => {
// //         window.location.href = '/';
// //       }, 500);
      
// //     } else {
// //       console.log("❌ DIRECT LOGIN FAILED");
// //       setAlertMsg({
// //         type: "error",
// //         text: data.error || "Login failed"
// //       });
// //     }
// //   } catch (err) {
// //     console.error("💥 DIRECT FETCH ERROR:", err);
// //     setAlertMsg({
// //       type: "error",
// //       text: "Network error - check console"
// //     });
// //   } finally {
// //     setLoading(false);
// //   }
// // };

// const onFinish = async (values) => {
//   setLoading(true);
//   setAlertMsg({ type: "", text: "" });

//   try {
//     console.log("🚀 LOGIN ATTEMPT with corrected endpoint...");
    
//     // Use the corrected apiService
//     const response = await apiService.auth.login(values);
//     const { data } = response;

//     console.log("✅ LOGIN SUCCESS:", data);

//     if (data.success && data.token && data.user) {
//       // Store data
//       localStorage.setItem("token", data.token);
//       localStorage.setItem("user", JSON.stringify(data.user));
//       localStorage.setItem("currentUser", JSON.stringify(data.user));
      
//       // Dispatch to Redux
//       dispatch(setCurrentUser(data.user));
      
//       setAlertMsg({
//         type: "success",
//         text: `Welcome back, ${data.user.firstName}! Redirecting...`,
//       });

//       // Navigate to dashboard
//       setTimeout(() => {
//         navigate(from, { replace: true });
//       }, 1000);
//     }
//   } catch (err) {
//     console.error("❌ LOGIN ERROR:", err);
//     console.error("Error details:", err.response?.data);
    
//     setAlertMsg({
//       type: "error",
//       text: err.response?.data?.error || "Login failed. Please try again."
//     });
//   } finally {
//     setLoading(false);
//   }
// };




//   // Quick login for demo using your API service
//   const quickLogin = async (credential) => {
//     setLoading(true);
//     setAlertMsg({ type: "", text: "" });

//     try {
//       const response = await apiService.auth.login({
//         email: credential.email,
//         password: credential.password,
//       });

//       const { data } = response;

//       if (data.success && data.token && data.user) {
//         const {
//           role,
//           email,
//           firstName,
//           lastName,
//           _id,
//           profilePicture,
//           designation,
//         } = data.user;

//         const user = {
//           email,
//           role,
//           token: data.token,
//           userId: _id,
//           firstName,
//           lastName,
//           profilePicture,
//           designation,
//         };

//         localStorage.setItem("token", data.token);
//         localStorage.setItem("user", JSON.stringify(user));
//         dispatch(setCurrentUser(user));

//         message.success(`Demo login successful! Welcome ${firstName}.`);

//         setTimeout(() => {
//           console.log("🔄 FORCING NAVIGATION...");

//           // Try multiple navigation approaches
//           if (from && from !== "/login") {
//             navigate(from, { replace: true });
//           } else {
//             // Default to dashboard
//             navigate("/dashboard", { replace: true });
//           }

//           // Fallback - reload if navigation fails
//           setTimeout(() => {
//             if (window.location.pathname === "/login") {
//               console.log("🔄 NAVIGATION FAILED - RELOADING");
//               window.location.href = "/";
//             }
//           }, 2000);
//         }, 1000);
//       }
//     } catch (error) {
//       console.error("Demo login error:", error);

//       // Fallback: Show error and suggest manual entry
//       setAlertMsg({
//         type: "warning",
//         text: `Demo login for ${credential.role} failed. Please enter credentials manually.`,
//       });

//       // Auto-fill the form for manual submission
//       form.setFieldsValue({
//         email: credential.email,
//         password: credential.password,
//       });
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Tabs configuration
//   const tabItems = [
//     {
//       key: "1",
//       label: (
//         <span className="flex items-center">
//           <UserOutlined className="mr-2" />
//           Member Login
//         </span>
//       ),
//       children: (
//         <Form
//           form={form}
//           name="login"
//           onFinish={onFinish}
//           onValuesChange={onValuesChange}
//           layout="vertical"
//           requiredMark={false}
//           className="space-y-6 mt-4"
//         >
//           <Form.Item
//             name="email"
//             label={
//               <span className="text-sm font-semibold text-gray-700">
//                 Email Address
//               </span>
//             }
//             rules={[
//               { required: true, message: "Please enter your email" },
//               { type: "email", message: "Please enter a valid email" },
//             ]}
//           >
//             <Input
//               prefix={<MailOutlined className="text-gray-400" />}
//               placeholder="Enter your registered email"
//               size="large"
//               className="rounded-xl h-12 border-gray-200 hover:border-green-300 focus:border-green-500 shadow-sm"
//             />
//           </Form.Item>

//           <Form.Item
//             name="password"
//             label={
//               <span className="text-sm font-semibold text-gray-700">
//                 Password
//               </span>
//             }
//             rules={[{ required: true, message: "Please enter your password" }]}
//           >
//             <Input.Password
//               prefix={<LockOutlined className="text-gray-400" />}
//               placeholder="Enter your password"
//               size="large"
//               className="rounded-xl h-12 border-gray-200 hover:border-green-300 focus:border-green-500 shadow-sm"
//               iconRender={(visible) =>
//                 visible ? (
//                   <EyeTwoTone className="text-green-500" />
//                 ) : (
//                   <EyeInvisibleOutlined className="text-gray-400" />
//                 )
//               }
//             />
//           </Form.Item>

//           <div className="flex items-center justify-between">
//             <Form.Item name="remember" valuePropName="checked" noStyle>
//               <Checkbox className="text-gray-600 hover:text-gray-800">
//                 Remember me for 30 days
//               </Checkbox>
//             </Form.Item>
//             <Link
//               to="/forgot-password"
//               className="text-green-600 hover:text-green-700 text-sm font-semibold transition-colors duration-200"
//             >
//               Forgot password?
//             </Link>
//           </div>

//           <Form.Item>
//             <Button
//               type="primary"
//               htmlType="submit"
//               loading={loading}
//               size="large"
//               block
//               className="rounded-xl h-12 font-semibold text-base shadow-lg hover:shadow-xl transition-all duration-300 bg-gradient-to-r from-green-600 to-blue-600 border-0"
//             >
//               {loading ? "Signing In..." : "Access Member Portal"}
//             </Button>
//           </Form.Item>
//         </Form>
//       ),
//     },
//     {
//       key: "2",
//       label: (
//         <span className="flex items-center">
//           <IdcardOutlined className="mr-2" />
//           Role Demo
//         </span>
//       ),
//       children: (
//         <div className="space-y-4 mt-4">
//           <p className="text-gray-600 text-sm text-center mb-6">
//             Experience different association roles with demo credentials
//           </p>

//           {demoCredentials.map((credential, index) => (
//             <div
//               key={index}
//               className="group p-4 border border-gray-200 rounded-xl hover:border-green-300 hover:shadow-md transition-all duration-300 cursor-pointer bg-white"
//               onClick={() => quickLogin(credential)}
//             >
//               <div className="flex items-center justify-between">
//                 <div className="flex items-center space-x-3">
//                   <Tag
//                     color={credential.color}
//                     className="font-semibold px-3 py-1"
//                   >
//                     {credential.role}
//                   </Tag>
//                   <div>
//                     <div className="text-sm font-medium text-gray-900">
//                       {credential.designation}
//                     </div>
//                     <div className="text-xs text-gray-500">
//                       {credential.email}
//                     </div>
//                   </div>
//                 </div>
//                 <Button
//                   type="link"
//                   size="small"
//                   className="text-green-600 opacity-0 group-hover:opacity-100 transition-opacity duration-200 font-semibold"
//                 >
//                   Use →
//                 </Button>
//               </div>
//             </div>
//           ))}
//         </div>
//       ),
//     },
//   ];

//   return (
//     <div className="space-y-6 max-w-md mx-auto p-4">
//       {/* Header */}
//       <div className="text-center">
//         <div className="flex items-center justify-center space-x-3 mb-4">
//           <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-blue-500 rounded-2xl flex items-center justify-center">
//             <TeamOutlined className="text-white text-xl" />
//           </div>
//           <div>
//             <h3 className="text-2xl font-bold text-gray-900">
//               Member Portal Access
//             </h3>
//             <p className="text-gray-600 mt-1">
//               Alamgir Hossain City Kallan Samity
//             </p>
//           </div>
//         </div>
//       </div>

//       {/* Stats Card */}
//       <Card className="border-0 shadow-sm bg-gradient-to-r from-green-50 to-blue-50">
//         <div className="text-center">
//           <h4 className="text-sm font-semibold text-gray-700 mb-3 flex items-center justify-center">
//             <SafetyCertificateOutlined className="mr-2 text-green-600" />
//             Association Management System
//           </h4>
//           <p className="text-gray-600 text-sm">
//             Secure login for members, employees, and administrators
//           </p>
//         </div>
//       </Card>

//       {/* Alert Messages */}
//       {alertMsg.text && (
//         <Alert
//           message={alertMsg.text}
//           type={alertMsg.type}
//           showIcon
//           closable
//           onClose={() => setAlertMsg({ type: "", text: "" })}
//           className="rounded-xl border-0 shadow-sm"
//         />
//       )}

//       {/* Login Form Tabs */}
//       <Card className="border-0 shadow-lg bg-white/95 backdrop-blur-sm">
//         <Tabs
//           activeKey={activeTab}
//           onChange={setActiveTab}
//           centered
//           items={tabItems}
//           className="login-tabs"
//         />
//       </Card>

//       {/* Divider & Links */}
//       <Divider
//         plain
//         className="text-gray-400 text-xs before:bg-gray-200 after:bg-gray-200"
//       >
//         New to association?
//       </Divider>

//       <div className="text-center space-y-4">
//         <p className="text-gray-600">
//           Don't have an account?{" "}
//           <Link
//             to="/registration"
//             className="text-green-600 hover:text-green-700 font-semibold transition-colors duration-200 inline-flex items-center space-x-1 group"
//           >
//             <span>Register as member</span>
//             <span className="group-hover:translate-x-1 transition-transform duration-200">
//               →
//             </span>
//           </Link>
//         </p>
//         <div className="text-xs text-gray-500">
//           By signing in, you agree to our{" "}
//           <a
//             href="/terms"
//             className="text-green-600 hover:text-green-700 font-medium"
//           >
//             Terms of Service
//           </a>{" "}
//           and{" "}
//           <a
//             href="/privacy"
//             className="text-green-600 hover:text-green-700 font-medium"
//           >
//             Privacy Policy
//           </a>
//         </div>

//               // Add this temporary button to your Login component
// <Button 
//   type="dashed" 
//   onClick={async () => {
//     try {
//       console.log("🔌 Testing backend connectivity...");
//       const response = await fetch('http://localhost:3000/api/v1/auth/login', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ email: 'test@test.com', password: 'test' })
//       });
//       console.log("🔌 Backend response status:", response.status);
//       console.log("🔌 Backend response headers:", response.headers);
//     } catch (err) {
//       console.error("🔌 Backend test failed:", err);
//     }
//   }}
// >
//   Test Backend Connection
// </Button>         


//         // Add this temporary button to your Login component
//         <div style={{ position: "fixed", top: 10, right: 10, zIndex: 10000 }}>
//           <Button
//             type="primary"
//             danger
//             onClick={() => {
//               const token = localStorage.getItem("token");
//               const user = localStorage.getItem("user");
//               console.log("🆘 MANUAL DEBUG:", { token, user });

//               if (token && user) {
//                 navigate("/");
//                 window.location.reload();
//               }
//             }}
//           >
//             🆘 Force Dashboard
//           </Button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Login;




// import axios from 'axios';
// import { useEffect, useState } from "react";
// import { useNavigate, Link, useLocation } from "react-router-dom";
// import { Form, Input, Button, Alert, Card, App, Spin } from "antd";
// import { MailOutlined, LockOutlined, TeamOutlined, LoadingOutlined } from "@ant-design/icons";
// import { useDispatch, useSelector } from "react-redux";
// import { setCurrentUser } from "../slices/userSlice";
// import { apiService } from "../../services/apiService";
// import { authStorage } from "../../utils/authStorage";

// const Login = () => {
//   const [form] = Form.useForm();
//   const [loading, setLoading] = useState(false);
//   const [alertMsg, setAlertMsg] = useState({ type: "", text: "" });
//   const [backendStatus, setBackendStatus] = useState('checking');
//   const navigate = useNavigate();
//   const location = useLocation();
//   const dispatch = useDispatch();
//   const { message } = App.useApp(); // ✅ FIXED: Use proper message API

//   const currentUser = useSelector(state => state.user?.value); // ✅ ADDED optional chaining

//    // Add this temporary test function to your Login component
// // Add this function to your Login component
// const testBackendLogin = async () => {
//   try {
//     console.log("🧪 STEP 1: Testing backend login API...");
    
//     // Test with actual credentials that should work
//     const testData = {
//       email: "rasedev32@gmail.com", // Your actual email
//       password: "nthurczmcvzgrjua"      // Your actual password
//     };
    
//     console.log("📧 Testing with:", testData.email);
    
//     const response = await axios.post('http://localhost:3000/api/v1/authentication/login', testData, {
//       headers: {
//         'Content-Type': 'application/json',
//       }
//     });
    
//     console.log("📊 Response status:", response.status);
    
//     const result = await response.json();
//     console.log("🎯 BACKEND RESPONSE:", result);
    
//     if (result.token) {
//       console.log("✅ TOKEN FOUND:", result.token.substring(0, 20) + "...");
//     } else {
//       console.log("❌ NO TOKEN FOUND in response");
//     }
    
//     if (result.user) {
//       console.log("✅ USER DATA FOUND:", result.user);
//     } else {
//       console.log("❌ NO USER DATA FOUND in response");
//     }
    
//   } catch (error) {
//     console.error("💥 TEST FAILED:", error);
//   }
// };

// // Add this button to your debug panel:
// {/* <Button size="small" onClick={testBackendLogin}>
//   Test Login API
// </Button> */}



//   // Debug logs
//   useEffect(() => {
//     console.log("🔧 LOGIN DEBUG:", {
//       currentUser: currentUser,
//       token: authStorage.getToken(),
//       isAuthenticated: authStorage.isAuthenticated(),
//       storageDebug: authStorage.debug()
//     });
//   }, [currentUser]);

//   // Check backend status and authentication on mount
//   useEffect(() => {
//     const initialize = async () => {
//       console.group("🔧 LOGIN COMPONENT INITIALIZATION");
      
//       // Check backend status
//       await checkBackendStatus();
      
//       // Check if user is already authenticated
//       if (authStorage.isAuthenticated()) {
//         const session = authStorage.getSession();
//         console.log("🔄 User already authenticated, updating Redux and redirecting...", {
//           user: session.user,
//           role: session.user.role
//         });
        
//         dispatch(setCurrentUser(session.user));
//         navigate("/", { replace: true });
//         return;
//       }
      
//       console.log("🔐 No active session found, showing login form");
//       console.groupEnd();
//     };

//     initialize();
//   }, [dispatch, navigate]);

//   // Check backend connectivity
//   const checkBackendStatus = async () => {
//     try {
//       setBackendStatus('checking');
//       console.log("🔌 Checking backend connectivity...");
      
//       const response = await fetch('http://localhost:3000/api/health', {
//         method: 'GET',
//         headers: { 'Content-Type': 'application/json' }
//       });
      
//       if (response.ok) {
//         const healthData = await response.json();
//         console.log("✅ Backend is running:", healthData);
//         setBackendStatus('online');
//         return true;
//       } else {
//         console.warn("⚠️ Backend responded with error:", response.status);
//         setBackendStatus('error');
//         return false;
//       }
//     } catch (err) {
//       console.error("❌ Backend connection failed:", err);
//       setBackendStatus('offline');
//       return false;
//     }
//   };

//   // 🎯 UPDATED: Enhanced login function that handles different response formats
//   const onFinish = async (values) => {
//     setLoading(true);
//     setAlertMsg({ type: "", text: "" });

//     try {
//       console.group("🚀 LOGIN PROCESS STARTED");
//       console.log("📧 Login attempt for:", values.email);
      
//       // Clear any existing invalid session
//       authStorage.clear();
      
//       // Attempt login
//       const response = await apiService.authentication.login(values);
//       console.log("📨 RAW LOGIN RESPONSE:", response);

//       const { data } = response;

//       // 🎯 HANDLE DIFFERENT RESPONSE FORMATS
//       let token, user;

//       // Format 1: Standard format (data.token, data.user)
//       if (data.token && data.user) {
//         token = data.token;
//         user = data.user;
//       }
//       // Format 2: Nested in data property
//       else if (data.data?.token && data.data?.user) {
//         token = data.data.token;
//         user = data.data.user;
//       }
//       // Format 3: Direct properties
//       else if (data.accessToken) {
//         token = data.accessToken;
//         user = data.user || data.userData;
//       }
//       else {
//         console.error("❌ UNKNOWN RESPONSE FORMAT:", data);
//         throw new Error("Invalid response format from server");
//       }

//       console.log("✅ EXTRACTED LOGIN DATA:", {
//         hasToken: !!token,
//         hasUser: !!user,
//         userRole: user?.role,
//         tokenPreview: token ? token.substring(0, 20) + '...' : 'null'
//       });

//       if (token && user) {
//         // ✅ Save session with enhanced storage
//         const saveSuccess = authStorage.saveSession(token, user);
        
//         if (!saveSuccess) {
//           throw new Error("Failed to save authentication data to storage");
//         }

//         // ✅ Verify storage worked
//         const storedSession = authStorage.getSession();
//         if (!storedSession) {
//           throw new Error("Authentication data not found in storage after save");
//         }

//         console.log("💾 STORAGE VERIFICATION SUCCESS:", {
//           tokenStored: !!storedSession.token,
//           userStored: !!storedSession.user,
//           userRole: storedSession.user.role
//         });

//         // ✅ Update Redux store
//         console.log("🔄 UPDATING REDUX STORE...");
//         dispatch(setCurrentUser(user));
        
//         // ✅ Show success message
//         setAlertMsg({
//           type: "success",
//           text: `Welcome back, ${user.firstName || user.name}! Redirecting to dashboard...`,
//         });

//         message.success(`Welcome to Alamgir Hossain City Kallan Samity, ${user.firstName || user.name}!`);

//         // ✅ Force navigation after short delay to ensure state is updated
//         setTimeout(() => {
//           console.log("📍 NAVIGATING TO ROOT LAYOUT...");
//           navigate("/", { replace: true });
//         }, 1000);

//       } else {
//         throw new Error("Invalid token or user data received");
//       }
      
//       console.groupEnd();

//     } catch (error) {
//       console.group("❌ LOGIN FAILED");
//       console.error("Login error details:", error);
//       console.error("Error response data:", error.response?.data);
//       console.groupEnd();

//       // Enhanced error handling with specific messages
//       let errorMessage = "Login failed. Please try again.";
      
//       if (error.code === 'ERR_NETWORK') {
//         errorMessage = "Cannot connect to server. Please check if backend is running and try again.";
//       } else if (error.response?.status === 404) {
//         errorMessage = "Login service is currently unavailable. Please try again later.";
//       } else if (error.response?.status === 401) {
//         errorMessage = error.response.data?.error || "Invalid email address or password. Please check your credentials.";
//       } else if (error.response?.data?.error) {
//         errorMessage = error.response.data.error;
//       } else if (error.message) {
//         errorMessage = error.message;
//       }

//       setAlertMsg({
//         type: "error",
//         text: errorMessage,
//       });
      
//       // Clear password field for security
//       form.setFieldsValue({ password: '' });
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleTestBackend = async () => {
//     const isOnline = await checkBackendStatus();
//     if (isOnline) {
//       message.success("✅ Backend server is running!");
//     } else {
//       message.error("❌ Cannot connect to backend server");
//     }
//   };

//   const handleDebugStorage = () => {
//     const debugInfo = authStorage.debug();
//     console.log("🛠️ STORAGE DEBUG INFO:", debugInfo);
    
//     message.info(
//       `Storage: ${debugInfo.isAuthenticated ? '✅ Authenticated' : '❌ Not authenticated'}`,
//       2
//     );
//   };

//   const getBackendStatusColor = () => {
//     switch (backendStatus) {
//       case 'online': return 'text-green-600';
//       case 'offline': return 'text-red-600';
//       case 'error': return 'text-orange-600';
//       default: return 'text-gray-600';
//     }
//   };

//   const getBackendStatusText = () => {
//     switch (backendStatus) {
//       case 'online': return 'Backend Online ✅';
//       case 'offline': return 'Backend Offline ❌';
//       case 'error': return 'Backend Error ⚠️';
//       default: return 'Checking Status...';
//     }
//   };

//   return (
//     <div className="space-y-6 max-w-md mx-auto p-4">
//       {/* Header */}
//       <div className="text-center">
//         <div className="flex items-center justify-center space-x-3 mb-4">
//           <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-blue-500 rounded-2xl flex items-center justify-center">
//             <TeamOutlined className="text-white text-xl" />
//           </div>
//           <div>
//             <h3 className="text-2xl font-bold text-gray-900">Member Portal Access</h3>
//             <p className="text-gray-600 mt-1">Alamgir Hossain City Kallan Samity</p>
//           </div>
//         </div>
        
//         {/* Backend Status Indicator */}
//         <div className={`text-sm font-medium ${getBackendStatusColor()}`}>
//           {getBackendStatusText()}
//         </div>
//       </div>

//       {/* Debug Panel - Only in development */}
//       {process.env.NODE_ENV === 'development' && (
//         <Card size="small" title="🔧 Debug Panel" className="mb-4">
//           <div className="space-y-3">
//             <div className="flex gap-2">
//               <Button size="small" onClick={handleTestBackend} disabled={backendStatus === 'checking'}>
//                 {backendStatus === 'checking' ? <LoadingOutlined /> : 'Test Backend'}
//               </Button>
//               <Button size="small" onClick={handleDebugStorage}>
//                 Check Storage
//               </Button>
//               <Button size="small" onClick={testBackendLogin}>
//   Test Login API
// </Button>
//             </div>
//             <div className="text-xs space-y-1">
//               <div className="flex justify-between">
//                 <span>Token:</span>
//                 <span className={authStorage.getToken() ? 'text-green-600 font-bold' : 'text-red-600'}>
//                   {authStorage.getToken() ? '✅ EXISTS' : '❌ MISSING'}
//                 </span>
//               </div>
//               <div className="flex justify-between">
//                 <span>User:</span>
//                 <span className={authStorage.getUser() ? 'text-green-600 font-bold' : 'text-red-600'}>
//                   {authStorage.getUser() ? '✅ EXISTS' : '❌ MISSING'}
//                 </span>
//               </div>
//               <div className="flex justify-between">
//                 <span>Status:</span>
//                 <span className={authStorage.isAuthenticated() ? 'text-green-600 font-bold' : 'text-red-600'}>
//                   {authStorage.isAuthenticated() ? '✅ AUTHENTICATED' : '❌ NOT AUTHENTICATED'}
//                 </span>
//               </div>
//             </div>
//           </div>
//         </Card>
//       )}

//       {/* Alert Messages */}
//       {alertMsg.text && (
//         <Alert
//           message={alertMsg.text}
//           type={alertMsg.type}
//           showIcon
//           closable
//           onClose={() => setAlertMsg({ type: "", text: "" })}
//           className="rounded-xl border-0 shadow-sm"
//         />
//       )}

//       {/* Login Form */}
//       <Card className="border-0 shadow-lg bg-white/95 backdrop-blur-sm">
//         <Form
//           form={form}
//           name="login"
//           onFinish={onFinish}
//           layout="vertical"
//           requiredMark={false}
//           className="space-y-6 mt-4"
//           initialValues={{
//             email: "admin@example.com", // Test email
//             password: "password123"     // Test password
//           }}
//         >
//           <Form.Item
//             name="email"
//             label={<span className="text-sm font-semibold text-gray-700">Email Address</span>}
//             rules={[
//               { required: true, message: "Please enter your email address" },
//               { type: "email", message: "Please enter a valid email address" },
//             ]}
//           >
//             <Input
//               prefix={<MailOutlined className="text-gray-400" />}
//               placeholder="Enter your registered email"
//               size="large"
//               className="rounded-xl h-12 border-gray-200 hover:border-green-300 focus:border-green-500 shadow-sm"
//               disabled={loading}
//             />
//           </Form.Item>

//           <Form.Item
//             name="password"
//             label={<span className="text-sm font-semibold text-gray-700">Password</span>}
//             rules={[{ required: true, message: "Please enter your password" }]}
//           >
//             <Input.Password
//               prefix={<LockOutlined className="text-gray-400" />}
//               placeholder="Enter your password"
//               size="large"
//               className="rounded-xl h-12 border-gray-200 hover:border-green-300 focus:border-green-500 shadow-sm"
//               disabled={loading}
//             />
//           </Form.Item>

//           <Form.Item>
//             <Button
//               type="primary"
//               htmlType="submit"
//               loading={loading}
//               size="large"
//               block
//               className="rounded-xl h-12 font-semibold text-base shadow-lg hover:shadow-xl transition-all duration-300 bg-gradient-to-r from-green-600 to-blue-600 border-0"
//               disabled={backendStatus === 'offline'}
//             >
//               {loading ? (
//                 <span className="flex items-center justify-center">
//                   <LoadingOutlined className="mr-2" />
//                   Signing In...
//                 </span>
//               ) : (
//                 "Access Member Portal"
//               )}
//             </Button>
//           </Form.Item>
//         </Form>
//       </Card>

//       {/* Additional Links */}
//       <div className="text-center space-y-3">
//         <p className="text-gray-600">
//           Don't have an account?{" "}
//           <Link to="/registration" className="text-green-600 hover:text-green-700 font-semibold">
//             Register as member
//           </Link>
//         </p>
        
//         <p className="text-gray-600">
//           <Link to="/forgot-password" className="text-blue-600 hover:text-blue-700 font-medium">
//             Forgot your password?
//           </Link>
//         </p>
//       </div>
//     </div>
//   );
// };

// export default Login;






/////////////////bpdb/////////////////////////////


import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Alert, Button, Card, Form, Input, Spin } from "antd";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setCurrentUser } from "../slices/userSlice"; 

const Login = () => {
  const [loginData, setLoginData] = useState({ email: "", password: "" });
  const [message, setMessage] = useState({ type: "", text: "" });
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLoginData((prev) => ({ ...prev, [name]: value }));
  };

  // const handleSignIn = async () => {
  //   setLoading(true);
  //   setMessage({ type: "", text: "" }); // Clear previous messages

  //   try {
  //     const { data } = await axios.post(
  //       "http://localhost:3000/api/v1/authentication/login",
  //       loginData,
  //       {
  //   email: loginData.email,
  //   password: loginData.password
  // }
  //     );

  //     console.log("Login response:", data);
  //     if (data.success && data.token && data.user) {
  //       const { role, email, _id } = data.user;

  //       if (role === "user") {
  //         setMessage({
  //           type: "error",
  //           text: "This dashboard is for Admin, HR, or Employee only",
  //         });
  //         setLoading(false); // Make sure to set loading to false
  //         return;
  //       }

  //       const userInfo = {
  //         email,
  //         role,
  //         token: data.token,
  //         userId: _id,
  //       };

  //       localStorage.setItem("token", data.token);
  //       localStorage.setItem("userInfo", JSON.stringify(userInfo));

  //       //dispatch(setUserInfo(data.data.user));
  //       dispatch(setCurrentUser(userInfo));
  //       setMessage({ type: "success", text: "Login successful" });

  //       console.log("Attempting to navigate to /");
  //       navigate("/");
  //     } else {
  //       setMessage({
  //         type: "error",
  //         text: data.error || "Invalid login credentials",
  //       });
  //     }
  //   } catch (err) {
  //     console.error("Frontend Login Error:",err.response?.data || err);
  //     setMessage({
  //       type: "error",
  //       text: err.response?.data?.error || "Login failed",
  //     });
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  const handleSignIn = async () => {
  setLoading(true);
  setMessage({ type: "", text: "" });

  try {
    const { data } = await axios.post(
      "http://localhost:3000/api/v1/authentication/login",
      {
        email: loginData.email,
        password: loginData.password
      }
    );

    console.log("Login response:", data);

    if (data.success && data.token && data.user) {
      const { role, email, id } = data.user;

      if (role === "user") {
        setMessage({
          type: "error",
          text: "This dashboard is for Admin, HR, or Employee only",
        });
        setLoading(false);
        return;
      }

      const userInfo = {
        email,
        role,
        token: data.token,
        userId: id,
      };

      localStorage.setItem("token", data.token);
      localStorage.setItem("userInfo", JSON.stringify(userInfo));

      dispatch(setCurrentUser(userInfo));
      navigate("/");
    }
  } catch (err) {
    console.error("Frontend Login Error:", err.response?.data || err);
    setMessage({
      type: "error",
      text: err.response?.data?.error || "Login failed",
    });
  } finally {
    setLoading(false);
  }
};




  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
      }}
    >
      <Card title="Login" style={{ width: 450 }}>
        {loading && <Spin size="large" />}
        {message.text && (
          <Alert
            message={message.text}
            type={message.type}
            style={{ marginBottom: 16 }}
          />
        )}

        <Form layout="vertical">
          <Form.Item
            label="Email"
            name="email"
            rules={[{ required: true, message: "Please enter your email" }]}
          >
            <Input
              name="email"
              value={loginData.email}
              onChange={handleChange}
            />
          </Form.Item>
          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true, message: "Please enter your password" }]}
          >
            <Input.Password
              name="password"
              value={loginData.password}
              onChange={handleChange}
            />
          </Form.Item>
          <Button type="primary" onClick={handleSignIn} block loading={loading}>
            Sign In
          </Button>
        </Form>
      </Card>
    </div>
  );
};
export default Login;






