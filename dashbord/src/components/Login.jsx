//Fixed & Cleaned-Up Version:

// import { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { Alert, Button, Card, Form, Input, Spin } from "antd";
// import axios from "axios";
// import { useDispatch } from "react-redux";
// import { setUserInfo } from "./slices/userSlice";
// //import { addEmployee, loggedIn } from "./slices/employeeSlice";

// const Login = () => {
//   const [loginData, setLoginData] = useState({ email: "", password: "" });
//   const [message, setMessage] = useState({ type: "", text: "" });
//   const [loading, setLoading] = useState(false);

//   const navigate = useNavigate();
//   const dispatch = useDispatch();

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setLoginData((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleSignIn = async () => {
//     setLoading(true);
//     setMessage({ type: "", text: "" }); // Clear previous messages

//     try {
//       const { data } = await axios.post(
//         "http://localhost:3000/api/v1/authentication/login",
//         loginData
//       );

//       // if (data.success && data.token) {
//       //   if (data.role === "user") {
//       //     setMessage({
//       //       type: "error",
//       //       text: "This dashboard is for Admin, HR, or Employee only",
//       //     });
//       //   } else {
//       //     const user = {
//       //         email: data.email,
//       //         role: data.role,
//       //         token: data.token,
//       //         userId: data.userId,
//       //       };

//       //     localStorage.setItem("token", data.token);
//       //     localStorage.setItem("userInfo", JSON.stringify(data));
//       //     localStorage.setItem("role", data.role);

//       //     dispatch(loggedIn(data));
//       //     // dispatch(setUserInfo(data.user));
//       //     dispatch(addEmployee(data.user));

//       //     setMessage({ type: "success", text: "Login successful" });

//       //     setTimeout(() => {
//       //       navigate("/");
//       //     }, 500);
//       //   }
//       // } else {
//       //   setMessage({ type: "error", text: data.error || "Login failed" });
//       // }
//       console.log("Login response:", data);

//       if (data.success && data.token) {
//       //  // const user = data.user;
//         if (data.role === "user") {
//           setMessage({
//             type: "error",
//             text: "This dashboard is for Admin, HR, or Employee only",
//           });
//           return;

//         } else {
//           // const userInfo = {
//           //   email: data.email,
//           //   role: data.role,
//           //   token: data.token,
//           //   userId: data._id,

//           // };
//           const userInfo = {
//             email: data.user.email,
//             role: data.user.role,
//             token: data.token,
//             userId: data.user._id,
//           };

//           // Store token and user info
//           localStorage.setItem("token", data.token);
//           localStorage.setItem("userInfo", JSON.stringify(userInfo));
//           localStorage.setItem("role", data.role);

//           dispatch(setUserInfo(userInfo)); // userInfo, not full `data`
//           //dispatch(addEmployee(userInfo)); // optional, only if needed in employee state

//           setMessage({ type: "success", text: "Login successful" });

//           setTimeout(() => {
//             navigate("/");
//           }, 500);
//         }
//       }
//     } catch (err) {
//       setMessage({
//         type: "error",
//         text: err.response?.data?.error || "Login failed",
//       });
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div
//       style={{
//         display: "flex",
//         justifyContent: "center",
//         alignItems: "center",
//         minHeight: "100vh",
//       }}
//     >
//       <Card title="Login" style={{ width: 450 }}>
//         {loading && <Spin size="large" />}
//         {message.text && (
//           <Alert
//             message={message.text}
//             type={message.type}
//             style={{ marginBottom: 16 }}
//           />
//         )}

//         <Form layout="vertical">
//           <Form.Item label="Email" name="email" rules={[{ required: true }]}>
//             <Input name="email" onChange={handleChange} />
//           </Form.Item>
//           <Form.Item
//             label="Password"
//             name="password"
//             rules={[{ required: true }]}
//           >
//             <Input.Password name="password" onChange={handleChange} />
//           </Form.Item>
//           <Button type="primary" onClick={handleSignIn} block loading={loading}>
//             Sign In
//           </Button>
//         </Form>
//       </Card>
//     </div>
//   );
// };

// export default Login;

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Alert, Button, Card, Form, Input, Spin } from "antd";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setUserInfo } from "./slices/userSlice"; // Import setUserInfo

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

  const handleSignIn = async () => {
    setLoading(true);
    setMessage({ type: "", text: "" }); // Clear previous messages

    try {
      const { data } = await axios.post(
        "http://localhost:3000/api/v1/authentication/login",
        loginData
      );

      console.log("Login response:", data);
      if (data.success && data.token && data.user) {
        const { role, email, _id } = data.user;

        if (role === "user") {
          setMessage({
            type: "error",
            text: "This dashboard is for Admin, HR, or Employee only",
          });
          setLoading(false); // Make sure to set loading to false
          return;
        }

        const userInfo = {
          email,
          role,
          token: data.token,
          userId: _id,
        };

        localStorage.setItem("token", data.token);
        localStorage.setItem("userInfo", JSON.stringify(userInfo));

        //dispatch(setUserInfo(data.data.user));
        dispatch(setUserInfo(userInfo));
        setMessage({ type: "success", text: "Login successful" });

        console.log("Attempting to navigate to /");
        navigate("/");
      } else {
        setMessage({
          type: "error",
          text: data.error || "Invalid login credentials",
        });
      }
    } catch (err) {
      console.error("Frontend Login Error:", err);
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
