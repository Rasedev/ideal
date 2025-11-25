// components/auth/EmailVerification.jsx
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Card, Spin, Alert, Button, Result } from "antd";
import { CheckCircleOutlined, CloseCircleOutlined, LoadingOutlined } from "@ant-design/icons";
import { useDispatch } from "react-redux";
import { setCurrentUser } from "../slices/userSlice";
import { apiService } from "../../services/apiService";
import { authStorage } from "../../utils/authStorage";

const EmailVerification = () => {
  const { token } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [status, setStatus] = useState('verifying'); // verifying, success, error
  const [message, setMessage] = useState('');

  useEffect(() => {
    const verifyEmail = async () => {
      try {
        console.log("🔐 Verifying email with token:", token);
        
        const response = await apiService.authentication.emailVerification(token);
        
        if (response.data.success) {
          setStatus('success');
          setMessage('Email verified successfully!');
          
          // ✅ AUTO-LOGIN AFTER VERIFICATION
          if (response.data.token && response.data.user) {
            const saved = authStorage.saveSession(response.data.token, response.data.user);
            if (saved) {
              dispatch(setCurrentUser(response.data.user));
              setTimeout(() => navigate("/", { replace: true }), 2000);
            }
          } else {
            setTimeout(() => navigate("/login", { replace: true }), 2000);
          }
        }
      } catch (error) {
        console.error("❌ Email verification failed:", error);
        setStatus('error');
        setMessage(error.response?.data?.error || 'Email verification failed');
      }
    };

    if (token) {
      verifyEmail();
    }
  }, [token, navigate, dispatch]);

  if (status === 'verifying') {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Card className="text-center p-8">
          <Spin indicator={<LoadingOutlined style={{ fontSize: 24 }} spin />} size="large" />
          <p className="mt-4 text-gray-600">Verifying your email address...</p>
        </Card>
      </div>
    );
  }

  if (status === 'success') {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Result
          icon={<CheckCircleOutlined style={{ color: '#52c41a' }} />}
          title="Email Verified Successfully!"
          subTitle={message}
          extra={[
            <Button type="primary" key="console" onClick={() => navigate("/")}>
              Go to Dashboard
            </Button>,
          ]}
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center">
      <Result
        icon={<CloseCircleOutlined style={{ color: '#ff4d4f' }} />}
        title="Verification Failed"
        subTitle={message}
        extra={[
          <Button type="primary" key="console" onClick={() => navigate("/login")}>
            Go to Login
          </Button>,
          <Button key="buy" onClick={() => navigate("/registration")}>
            Register Again
          </Button>,
        ]}
      />
    </div>
  );
};

export default EmailVerification;