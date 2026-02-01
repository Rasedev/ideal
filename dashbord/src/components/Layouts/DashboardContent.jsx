
////////////////FINAL/////////////////////////


// import { useSelector } from "react-redux";
// import { useState, useEffect } from "react";
// // import AdminDashboard from "../dashboard/AdminDashboard";
// import HROverview from "../dashboard/HRDashboard";
// import EmployeeOverview from "../dashboard/EmployeeDashboard";
// import MemberOverview from "../dashboard/MemberDashboard";
// import Loading from "../shared/Loading";
// import { Card, Statistic, Row, Col, Typography } from "antd";
// import { UserOutlined, TeamOutlined, CheckCircleOutlined } from "@ant-design/icons";
//  import Profile from "../settings/Profile";

// const { Title } = Typography;

// const DashboardContent = () => {
//   const user = useSelector((state) => state.user.value);
//   const [dashboardStats, setDashboardStats] = useState(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     // Simulate fetching role-based dashboard data
//     const timer = setTimeout(() => {
//       setDashboardStats({
//         userCount: 150,
//         activeMembers: 120,
//         completionRate: 85
//       });
//       setLoading(false);
//     }, 1000);

//     return () => clearTimeout(timer);
//   }, []);

//   if (!user || loading) {
//     return <Loading />;
//   }

//   const renderDashboard = () => {
//     switch (user.role?.toLowerCase()) {
//       case "admin":
//         // return <AdminDashboard />;
//          return <Profile />;

//       case "hr":
//         return <HROverview />;
//       case "employee":
//         return <EmployeeOverview />;
//       case "member":
//         return <MemberOverview />;
//       default:
//         return (
//           <div className="p-6">
//             <Title level={2}>Welcome, {user.firstName}!</Title>
//             <Row gutter={16}>
//               <Col span={8}>
//                 <Card>
//                   <Statistic
//                     title="Active Users"
//                     value={dashboardStats?.userCount || 0}
//                     prefix={<UserOutlined />}
//                   />
//                 </Card>
//               </Col>
//               <Col span={8}>
//                 <Card>
//                   <Statistic
//                     title="Team Members"
//                     value={dashboardStats?.activeMembers || 0}
//                     prefix={<TeamOutlined />}
//                   />
//                 </Card>
//               </Col>
//               <Col span={8}>
//                 <Card>
//                   <Statistic
//                     title="Completion Rate"
//                     value={dashboardStats?.completionRate || 0}
//                     suffix="%"
//                     prefix={<CheckCircleOutlined />}
//                   />
//                 </Card>
//               </Col>
//             </Row>
//           </div>
//         );
//     }
//   };

//   return renderDashboard();
// };

// export default DashboardContent;





import { useSelector } from "react-redux";
import { useState, useEffect } from "react";
import AdminDashboard from "../dashboard/AdminDashboard"; 
import HRDashboard from "../dashboard/HRDashboard";
import EmployeeDashboard from "../dashboard/EmployeeDashboard";
import MemberDashboard from "../dashboard/MemberDashboard";
import Loading from "../shared/Loading";
import { Card, Statistic, Row, Col, Typography, Alert } from "antd";
import { UserOutlined, TeamOutlined, CheckCircleOutlined } from "@ant-design/icons";

const { Title } = Typography;

const DashboardContent = () => {
  const user = useSelector((state) => state.user.value);
  const [dashboardStats, setDashboardStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate fetching role-based dashboard data
    const timer = setTimeout(() => {
      setDashboardStats({
        userCount: 150,
        activeMembers: 120,
        completionRate: 85
      });
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  // Debug user data
  useEffect(() => {
    console.log("🔍 DashboardContent - Current User:", user);
    console.log("🔍 DashboardContent - User Role:", user?.role);
  }, [user]);

  if (!user || loading) {
    return <Loading />;
  }

  // Show debug info in development
  const showDebugInfo = process.env.NODE_ENV === 'development';

  const renderDashboard = () => {
    const userRole = user.role?.toLowerCase();
    console.log("🎯 Rendering dashboard for role:", userRole);

    switch (userRole) {
      case "admin":
        return <AdminDashboard />; // ✅ FIXED: Use AdminDashboard, not Profile
      case "hr":
        return <HRDashboard />;
      case "employee":
        return <EmployeeDashboard />;
      case "member":
        return <MemberDashboard />;
      default:
        return (
          <div className="p-6">
            {showDebugInfo && (
              <Alert
                message="Role Detection Info"
                description={`Current role: ${userRole || 'undefined'}. Showing default dashboard.`}
                type="info"
                showIcon
                className="mb-4"
              />
            )}
            <Title level={2}>Welcome, {user.firstName}!</Title>
            <Row gutter={16}>
              <Col span={8}>
                <Card>
                  <Statistic
                    title="Active Users"
                    value={dashboardStats?.userCount || 0}
                    prefix={<UserOutlined />}
                  />
                </Card>
              </Col>
              <Col span={8}>
                <Card>
                  <Statistic
                    title="Team Members"
                    value={dashboardStats?.activeMembers || 0}
                    prefix={<TeamOutlined />}
                  />
                </Card>
              </Col>
              <Col span={8}>
                <Card>
                  <Statistic
                    title="Completion Rate"
                    value={dashboardStats?.completionRate || 0}
                    suffix="%"
                    prefix={<CheckCircleOutlined />}
                  />
                </Card>
              </Col>
            </Row>
          </div>
        );
    }
  };

  return (
    <div>
      {/* {showDebugInfo && (
        <Alert
          message="Dashboard Loaded"
          description={`Welcome ${user.firstName} (Role: ${user.role})`}
          type="success"
          showIcon
          className="mb-4"
        />
      )} */}
      {renderDashboard()}
    </div>
  );
};

export default DashboardContent;















