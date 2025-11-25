// src/layouts/MobileDrawer.jsx
// import { Drawer, Menu, Avatar, Typography, Tag, Divider } from "antd";
// import { UserOutlined } from "@ant-design/icons";
// import { useSelector } from "react-redux";
// import { useLocation, useNavigate } from "react-router-dom";
// import { getMenuItems } from "../../utils/menuItems"; // same helper used by Sidebar

// const { Text } = Typography;

// const MobileDrawer = ({ visible, onClose }) => {
//   const data = useSelector((state) => state.user?.value);
//   const location = useLocation();
//   const navigate = useNavigate();

//   const menuItems = getMenuItems(data, false);

//   const handleMenuClick = ({ key }) => {
//     navigate(key);
//     onClose(); // close drawer after navigating
//   };

//   return (
//     <Drawer
//       title={
//         <div className="flex items-center space-x-3">
//           <Avatar
//             size="large"
//             icon={<UserOutlined />}
//             src={data?.profilePicture}
//             className="bg-gradient-to-r from-blue-500 to-purple-600"
//           />
//           <div>
//             <Text strong className="block">{data?.firstName} {data?.lastName}</Text>
//             <Text type="secondary" className="text-xs">{data?.email}</Text>
//             <div className="flex space-x-1 mt-1">
//               <Tag color="blue">{data?.role}</Tag>
//               <Tag color="green">{data?.status || "Active"}</Tag>
//             </div>
//           </div>
//         </div>
//       }
//       placement="left"
//       closable={true}
//       onClose={onClose}
//       open={visible}
//       Styles={{ padding: 0 }}
//       width={260}
//     >
//       <Divider className="my-0" />
//       <Menu
//         mode="inline"
//         items={menuItems}
//         selectedKeys={[location.pathname]}
//         onClick={handleMenuClick}
//         className="border-none"
//       />
//     </Drawer>
//   );
// };

// export default MobileDrawer;





import { Drawer, Menu, Avatar, Typography, Tag, Divider, Button } from "antd";
import { UserOutlined, MessageOutlined, BellOutlined } from "@ant-design/icons";
import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";

const { Text } = Typography;

const MobileDrawer = ({ visible, onClose }) => {
  const data = useSelector((state) => state.user?.value);
  const location = useLocation();
  const navigate = useNavigate();

  const menuItems = [
    {
      key: "/",
      icon: <UserOutlined />,
      label: "Dashboard",
    },
    {
      key: "/members",
      icon: <UserOutlined />,
      label: "Members",
      children: [
        { key: "/members/all", label: "All Members" },
        { key: "/members/add", label: "Add Member" },
      ],
    },
    {
      key: "/payments",
      icon: <UserOutlined />,
      label: "Payments",
      children: [
        { key: "/payments/subscriptions", label: "Subscriptions" },
        { key: "/payments/dues", label: "Pending Dues" },
      ],
    },
    {
      key: "/announcements",
      icon: <BellOutlined />,
      label: "Announcements",
    },
    {
      key: "/settings",
      icon: <UserOutlined />,
      label: "Settings",
    },
  ];

  const handleMenuClick = ({ key }) => {
    navigate(key);
    onClose();
  };

  return (
    <Drawer
      placement="left"
      closable={true}
      onClose={onClose}
      open={visible}
      width={280}
      styles={{
        body: { padding: 0 }
      }}
    >
      {/* Header */}
      <div className="p-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 bg-white bg-opacity-20 rounded-xl flex items-center justify-center">
            <span className="text-white font-bold text-lg">AH</span>
          </div>
          <div>
            <h2 className="text-lg font-bold text-white">Alamgir Hossain</h2>
            <p className="text-xs text-blue-100">City Welfare Association</p>
          </div>
        </div>
      </div>

      {/* User Info */}
      <div className="p-4 border-b border-gray-200">
        <div className="flex items-center space-x-3">
          <Avatar
            size="large"
            icon={<UserOutlined />}
            src={data?.profilePicture}
            className="bg-gradient-to-r from-blue-500 to-purple-500"
          />
          <div>
            <Text strong className="block">{data?.firstName} {data?.lastName}</Text>
            <Text type="secondary" className="text-xs block">{data?.email}</Text>
            <div className="flex space-x-1 mt-1">
              <Tag color="blue" className="text-xs">{data?.role}</Tag>
              <Tag color="green" className="text-xs">{data?.status || "Active"}</Tag>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="p-4 border-b border-gray-200">
        <div className="grid grid-cols-2 gap-2">
          <Button 
            icon={<MessageOutlined />}
            className="text-xs h-10"
            onClick={() => {
              navigate('/announcements');
              onClose();
            }}
          >
            Send Notice
          </Button>
          <Button 
            type="primary"
            className="text-xs h-10 bg-blue-600 border-0"
            onClick={() => {
              navigate('/payments/subscriptions');
              onClose();
            }}
          >
            Collect Payment
          </Button>
        </div>
      </div>

      {/* Navigation Menu */}
      <Menu
        mode="inline"
        items={menuItems}
        selectedKeys={[location.pathname]}
        onClick={handleMenuClick}
        className="border-none mt-2"
      />
    </Drawer>
  );
};

export default MobileDrawer;











