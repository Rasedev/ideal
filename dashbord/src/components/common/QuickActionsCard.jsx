


// import { useEffect, useState } from "react";
// import { Card, Row, Col, Typography, Spin, Alert, Empty } from "antd";
// import * as Icons from "@ant-design/icons";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";

// const { Text } = Typography;

// const QuickActionsCard = () => {
//   const navigate = useNavigate();
//   const [actions, setActions] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [errorMsg, setErrorMsg] = useState(null);

//   useEffect(() => {
//     const fetchActions = async () => {
//       try {
//         const token = localStorage.getItem("token");
//         const res = await axios.get("http://localhost:3000/api/v1/dashboard/actions", {
//           headers: { Authorization: `Bearer ${token}` },
//         });

//         const data = res.data; // ✅ Correct Axios usage

//         if (data.success && data.data.length > 0) {
//           setActions(data.data);
//         } else {
//           setErrorMsg("No quick actions available for your role.");
//         }
//       } catch (err) {
//         console.error("QuickActions fetch error:", err);
//         setErrorMsg("Failed to load quick actions");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchActions();
//   }, []);

//   if (loading)
//     return (
//       <Card title="Quick Actions" className="shadow-sm text-center">
//         <Spin tip="Loading quick actions..." />
//       </Card>
//     );

//   if (errorMsg)
//     return (
//       <Alert
//         message="Error Loading Actions"
//         description={errorMsg}
//         type="error"
//         showIcon
//         className="shadow-sm"
//       />
//     );

//   if (actions.length === 0)
//     return (
//       <Card title="Quick Actions" className="shadow-sm text-center">
//         <Empty description="No actions found for your role" />
//       </Card>
//     );

//   return (
//     <Card title="Quick Actions" className="shadow-sm">
//       <Row gutter={[16, 16]}>
//         {actions.map((a, i) => {
//           const IconComponent = Icons[a.icon] || Icons.AppstoreOutlined;
//           return (
//             <Col xs={12} key={a._id || i}>
//               <Card
//                 hoverable
//                 onClick={() => a.path && navigate(a.path)}
//                 className="cursor-pointer text-center transition-all"
//               >
//                 <div className="text-2xl mb-1">
//                   <IconComponent />
//                 </div>
//                 <Text strong>{a.title}</Text>
//               </Card>
//             </Col>
//           );
//         })}
//       </Row>
//     </Card>
//   );
// };

// export default QuickActionsCard;





// import { useEffect, useState } from "react";
// import { Card, Row, Col, Typography, Spin, Alert, Empty } from "antd";
// import * as Icons from "@ant-design/icons";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";

// const { Text } = Typography;

// const QuickActionsCard = () => {
//   const navigate = useNavigate();
//   const [actions, setActions] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [errorMsg, setErrorMsg] = useState(null);

//   useEffect(() => {
//     const fetchActions = async () => {
//       try {
//         const token = localStorage.getItem("token");
//         const res = await axios.get("http://localhost:3000/api/v1/dashboard/actions", {
//           headers: { Authorization: `Bearer ${token}` },
//         });

//         const data = res.data;

//         if (data.success && data.data.length > 0) {
//           setActions(data.data);
//         } else {
//           setErrorMsg("No quick actions available for your role.");
//         }
//       } catch (err) {
//         console.error("QuickActions fetch error:", err);
//         setErrorMsg("Failed to load quick actions");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchActions();
//   }, []);

//   // ✅ Fixed: Use fullscreen Spin for loading state
//   if (loading)
//     return (
//       <Card title="Quick Actions" variant="outlined" className="shadow-sm">
//         <div className="text-center py-4">
//           <Spin size="large" />
//           <div className="mt-2">Loading quick actions...</div>
//         </div>
//       </Card>
//     );

//   if (errorMsg)
//     return (
//       <Alert
//         message="Error Loading Actions"
//         description={errorMsg}
//         type="error"
//         showIcon
//         className="shadow-sm"
//       />
//     );

//   if (actions.length === 0)
//     return (
//       <Card title="Quick Actions" variant="outlined" className="shadow-sm text-center">
//         <Empty description="No actions found for your role" />
//       </Card>
//     );

//   return (
//     <Card title="Quick Actions" variant="outlined" className="shadow-sm">
//       <Row gutter={[16, 16]}>
//         {actions.map((a, i) => {
//           const IconComponent = Icons[a.icon] || Icons.AppstoreOutlined;
//           return (
//             <Col xs={12} key={a._id || i}>
//               <Card
//                 hoverable
//                 onClick={() => a.path && navigate(a.path)}
//                 className="cursor-pointer text-center transition-all"
//                 variant="outlined" // ✅ Fixed: added variant
//               >
//                 <div className="text-2xl mb-1">
//                   <IconComponent />
//                 </div>
//                 <Text strong>{a.title}</Text>
//               </Card>
//             </Col>
//           );
//         })}
//       </Row>
//     </Card>
//   );
// };

// export default QuickActionsCard;







import { Card, Row, Col, Typography } from "antd";
import { 
  UserAddOutlined, 
  FileAddOutlined, 
  DollarOutlined, 
  NotificationOutlined,
  TeamOutlined,
  BarChartOutlined
} from '@ant-design/icons';
import { useNavigate } from "react-router-dom";

const { Text } = Typography;

const QuickActionsCard = () => {
  const navigate = useNavigate();

  const quickActions = [
    {
      title: "Add Member",
      icon: <UserAddOutlined className="text-blue-500" />,
      path: "/members/add",
      color: "blue",
      description: "Register new member"
    },
    {
      title: "Create Notice",
      icon: <NotificationOutlined className="text-orange-500" />,
      path: "/announcements",
      color: "orange",
      description: "Send announcement"
    },
    {
      title: "Collect Payment",
      icon: <DollarOutlined className="text-green-500" />,
      path: "/payments/subscriptions",
      color: "green",
      description: "Receive subscription"
    },
    {
      title: "New Application",
      icon: <FileAddOutlined className="text-purple-500" />,
      path: "/applications/create",
      color: "purple",
      description: "Process application"
    },
    {
      title: "Committee",
      icon: <TeamOutlined className="text-cyan-500" />,
      path: "/committee",
      color: "cyan",
      description: "Manage committee"
    },
    {
      title: "Reports",
      icon: <BarChartOutlined className="text-red-500" />,
      path: "/reports",
      color: "red",
      description: "View reports"
    }
  ];

  return (
    <Card 
      title="Quick Actions" 
      className="shadow-sm border-0"
      extra={<Text type="secondary" className="text-xs">Frequent Tasks</Text>}
    >
      <Row gutter={[12, 12]}>
        {quickActions.map((action, index) => (
          <Col xs={12} sm={8} key={index}>
            <div
              onClick={() => navigate(action.path)}
              className={`
                p-3 rounded-lg border cursor-pointer transition-all duration-200 
                hover:shadow-md hover:scale-105 hover:border-${action.color}-300
                bg-white border-gray-200 text-center group
              `}
            >
              <div className="text-2xl mb-2 group-hover:scale-110 transition-transform">
                {action.icon}
              </div>
              <Text strong className="text-sm block group-hover:text-${action.color}-600">
                {action.title}
              </Text>
              <Text type="secondary" className="text-xs block mt-1">
                {action.description}
              </Text>
            </div>
          </Col>
        ))}
      </Row>
    </Card>
  );
};

export default QuickActionsCard;





