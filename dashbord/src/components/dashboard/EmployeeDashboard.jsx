

// pages/EmployeeDashboard.jsx

import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { Spin } from "antd";

const EmployeeDashboard = () => {
  const data = useSelector((state) => state.user?.value || null);
  const navigate = useNavigate();

  useEffect(() => {
    if (!data) {
      navigate("/login");
    } else if (data.role !== "employee") {
      //navigate("/unauthorized");
      navigate("/");
    }
  }, [data, navigate]);

  if (!data) {
    return (
      <div className="h-screen flex justify-center items-center">
        <Spin size="large" />
      </div>
    );
  }

  return (
    <div className="p-4">
      <h1 className="text-xl font-semibold">Welcome Employee: {data.email}</h1>
      {/* Employee-specific dashboard here */}
    </div>
  );
};

export default EmployeeDashboard;

