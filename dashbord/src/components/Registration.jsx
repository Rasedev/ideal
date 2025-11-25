
// finally


// import React, { useState } from 'react';
// import axios from 'axios';
// import { Alert, Button, Card, Form, Input } from 'antd';
// import { useNavigate } from 'react-router-dom';

// const Registration = () => {
//   const [registrationData, setRegistrationData] = useState({
//     firstName: '',
//     lastName: '',
//     email: '',
//     password: '',
//   });

//   const [success, setSuccess] = useState('');
//   const [error, setError] = useState('');
//   const navigate = useNavigate();

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setRegistrationData({ ...registrationData, [name]: value });
//     console.log(value,name);
//   };
//      console.log(registrationData)
     
//   const handleSignUp = async () => {
//     try {
//       // const response = await axios.post(
//       //   'http://localhost:3000/api/v1/authentication/registration',
//       //   registrationData
//       // );
//       const response = await axios.post(
//         'http://localhost:3000/api/v1/authentication/registration',{
//                     firstName: registrationData.firstName,
//       lastName: registrationData.lastName,
//       email: registrationData.email,
//       password: registrationData.password,
//         }
       
//       );
//          console.log(response);
//       if (response.data.success) {
//         setSuccess('Registration successful! Please check your email to verify your account.');
//         setError('');
        
//         // Simulate email verification flow
//         setTimeout(() => {
//           navigate('/login'); // Redirect to login page
//         }, 3000); // wait 3 seconds
//       } else {
//         setError(response.data.error || 'Something went wrong.');
//         setSuccess('');
//       }
//     } catch (err) {
//       setError('Cannot connect to the server. Please try again later.');
//       console.error(err);
//     }
//   };

//   return (
//     <Card title="Registration" variant="outlined" style={{ width: 600, margin: 'auto', paddingTop: '100px' }}>
//       {success && <Alert message={success} type="success" showIcon style={{ marginBottom: 16 }} />}
//       {error && <Alert message={error} type="error" showIcon style={{ marginBottom: 16 }} />}
      
//       <Form layout="vertical" style={{ maxWidth: 600 }}>
//         <Form.Item label="First Name">
//           <Input name="firstName" onChange={handleChange} />
//         </Form.Item>
//         <Form.Item label="Last Name">
//           <Input name="lastName" onChange={handleChange} />
//         </Form.Item>
//         <Form.Item label="Email">
//           <Input name="email" onChange={handleChange} />
//         </Form.Item>
//         <Form.Item label="Password">
//           <Input.Password name="password" onChange={handleChange} />
//         </Form.Item>
//         <Form.Item>
//           <Button type="primary" onClick={handleSignUp}>Sign Up</Button>
//         </Form.Item>
//       </Form>
//     </Card>
//   );
// };

// export default Registration;





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
        registrationData
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
      {checkingVerification && (
        <Spin tip="Waiting for email verification..." style={{ marginBottom: 16 }} />
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






