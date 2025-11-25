



// import { useEffect, useState } from 'react';
// import { Button, Card, Modal, Select, Table, Tag, Typography, Spin } from 'antd';
// import axios from 'axios';
// import Title from 'antd/es/typography/Title';

// const { Text } = Typography;

// const ApproveSubCategoryStatus = () => {
//   const [allSubCategory, setAllSubCategory] = useState([]);
//   const [subCategoryName, setSubCategoryName] = useState('');
//   const [statusName, setStatusName] = useState('');
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [loading, setLoading] = useState(false);
//   const [selectedId, setSelectedId] = useState(null); // Track the selected subcategory ID

//   useEffect(() => {
//     async function getAllSubcategory() {
//       setLoading(true);
//       try {
//         const { data } = await axios.get('http://localhost:3000/api/v1/category/getallsubcategories');
//         setAllSubCategory(data);
//       } catch (error) {
//         console.error('Error fetching subcategories:', error);
//       } finally {
//         setLoading(false);
//       }
//     }
//     getAllSubcategory();
//   }, []);

//   const showModal = (item) => {
//     setSubCategoryName(item.name);
//     setSelectedId(item._id); // Store the selected subcategory ID
//     setIsModalOpen(true);
//   };

//   const handleOk = async () => {
//     try {
//       // Update the status via API
//       await axios.post('http://localhost:3000/api/v1/category/createsubcategorystatus', {
//         name: subCategoryName,
//         status: statusName,
//       });

//       // Update the local state to reflect the changes
//       setAllSubCategory((prev) =>
//         prev.map((item) =>
//           item._id === selectedId ? { ...item, status: statusName } : item
//         )
//       );

//       setIsModalOpen(false);
//     } catch (error) {
//       console.error('Error updating status:', error);
//     }
//   };

//   const handleCancel = () => {
//     setIsModalOpen(false);
//   };

//   const getStatusTag = (status) => {
//     let color;
//     switch (status) {
//       case 'approved':
//         color = 'green';
//         break;
//       case 'rejected':
//         color = 'red';
//         break;
//       case 'waiting':
//         color = 'orange';
//         break;
//       default:
//         color = 'gray';
//     }
//     return (
//       <Tag color={color} className="text-xs font-dm px-2 py-1 text-center">
//         {status?.toUpperCase() || 'UNKNOWN'}
//       </Tag>
//     );
//   };

//   const columns = [
//     {
//       title: <Text strong className="font-dm text-primary text-sm md:text-base font-bold">Sub Category Name</Text>,
//       dataIndex: 'name',
//       key: 'name',
//       render: (text) => <Text className="font-dm text-[#767676] text-xs md:text-sm">{text || 'Unnamed Subcategory'}</Text>,
//       responsive: ['xs', 'sm', 'md', 'lg'],
//     },
//     {
//       title: <Text strong className="font-dm text-primary text-sm md:text-base font-bold">Active Status</Text>,
//       dataIndex: 'isActive',
//       key: 'isActive',
//       render: (isActive) => (
//         <Tag color={isActive ? 'green' : 'red'} className="text-xs font-dm px-2 py-1 text-center">
//           {isActive ? 'Active' : 'Inactive'}
//         </Tag>
//       ),
//       responsive: ['xs', 'sm', 'md', 'lg'],
//     },
//     {
//       title: <Text strong className="font-dm text-primary text-sm md:text-base font-bold">Status</Text>,
//       dataIndex: 'status',
//       key: 'status',
//       render: (status) => getStatusTag(status),
//       responsive: ['xs', 'sm', 'md', 'lg'],
//     },
//     {
//       title: <Text strong className="font-dm text-primary text-sm md:text-base font-bold">Edit Status</Text>,
//       dataIndex: '',
//       key: 'x',
//       render: (_, record) => (
//         <Button type="primary" onClick={() => showModal(record)} className="text-xs font-dm">
//           Edit Status
//         </Button>
//       ),
//       responsive: ['xs', 'sm', 'md', 'lg'],
//     },
//   ];

//   return (
//     <div className="container mx-auto">
//        <Card  className="shadow-lg rounded-lg p-2 sm:p-4 md:p-6 lg:p-8" >
//         <Title level={3} className="font-dm font-bold " style={{ textAlign: "center", marginBottom: "30px" }}>
//         ✅ ApproveSub Category Status
//         </Title>
        
//         {loading ? (
//           <div className="flex justify-center items-center h-40">
//             <Spin size="large" />
//           </div>
//         ) : (
//           <Table
//             dataSource={allSubCategory}
//             columns={columns}
//             pagination={{ pageSize: 10 }}
//             rowKey={(record) => record._id}
//             bordered
//             className="min-w-full"
//           />
//         )}

//         <Modal
//           title={
//             <Text strong className="font-dm text-primary text-lg md:text-xl font-bold">
//               Edit Sub Category Status
//             </Text>
//           }
//           open={isModalOpen}
//           onOk={handleOk}
//           onCancel={handleCancel}
//           footer={[
//             <Button key="back" onClick={handleCancel} className="font-dm">
//               Cancel
//             </Button>,
//             <Button key="submit" type="primary" onClick={handleOk} className="font-dm">
//               Submit
//             </Button>,
//           ]}
//         >
//           <div className="space-y-4">
//             <Text strong className="font-dm text-primary text-sm md:text-base">
//               Sub Category: {subCategoryName}
//             </Text>
//             <Select
//               defaultValue="waiting"
//               style={{ width: '100%' }}
//               onChange={(value) => setStatusName(value)}
//               options={[
//                 { value: 'waiting', label: 'Waiting' },
//                 { value: 'approved', label: 'Approved' },
//                 { value: 'rejected', label: 'Rejected' },
//               ]}
//               className="font-dm"
//             />
//           </div>
//         </Modal>
//       </Card>
//     </div>
//   );
// };

// export default ApproveSubCategoryStatus;





// components/ApprovedEmployeesCards.jsx
import React, { useEffect, useState, useCallback } from "react";
import {
  Card,
  Spin,
  message,
  Typography,
  Tag,
  Row,
  Col,
  Avatar,
  Button,
  Layout
} from "antd";
import { UserOutlined, MailOutlined, IdcardOutlined, ShopOutlined } from "@ant-design/icons";
import axios from "axios";

const { Title, Text } = Typography;
const { Header } = Layout;

const ApproveSubCategoryStatus = () => {
  const [approvedEmployees, setApprovedEmployees] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchApprovedEmployees = useCallback(async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      const { data } = await axios.get(
        "http://localhost:3000/api/v1/employee/allemployee",
        { headers: { Authorization: `Bearer ${token}` } }
      );

      const employees = Array.isArray(data.employees) ? data.employees : data;
      const filteredApproved = employees.filter(
        (emp) => emp.status === "approved"
      );
      setApprovedEmployees(filteredApproved);
    } catch (error) {
      console.error("Error fetching approved employees:", error);
      message.error("Failed to load approved employees");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchApprovedEmployees();
  }, [fetchApprovedEmployees]);

  return (
    <Layout className="">
      <Header className="bg-[#FFF] p-0 ">
         <Title level={3} className="font-railway text-center p-5 text-[clamp(1.5rem,2vw,2rem)] font-semibold text-gray-800">
              Approved Employees
            </Title>
      </Header>
    <div className="container mx-auto p-4 sm:px-6 lg:px-6 py-6">
      {loading ? (
        <div className="flex justify-center items-center min-h-[300px]">
          <Spin size="large" />
        </div>
      ) : approvedEmployees.length === 0 ? (
        <div className="text-center p-8 font-railway">
          <Text strong className="text-lg">No approved employees found.</Text>
        </div>
      ) : (
        <Row gutter={[24, 24]}>
          {approvedEmployees.map((employee) => (
            <Col key={employee._id} xs={24} sm={12} md={8} lg={6}>
              <Card
                hoverable
                className="shadow-md rounded-lg overflow-hidden h-full flex flex-col font-railway"
                actions={[
                  <Button type="link" key="view-profile" onClick={() => message.info(`Viewing ${employee.firstName}'s profile`)}>
                    View Profile
                  </Button>,
                ]}
              >
                <div className="flex flex-col items-center p-4">
                  <Avatar size={100} src={employee.image} icon={<UserOutlined />} className="mb-4" />
                  <Title level={4} className="text-center font-railway">
                    {employee.firstName} {employee.lastName}
                  </Title>
                  <Tag color="green" className="mb-2 font-railway text-[15px]">
                    Approved
                  </Tag>
                  <div className="text-center">
                    <Text className="block text-gray-700 font-railway">
                      <MailOutlined className="mr-1" /> {employee.email}
                    </Text>
                    <Text className="block text-gray-700 font-railway">
                      <IdcardOutlined className="mr-1" /> ERP: {employee.erpNumber || "N/A"}
                    </Text>
                    <Text className="block text-gray-700 font-railway">
                      <ShopOutlined className="mr-1" /> Store: {employee.store?.batch || "N/A"}
                    </Text>
                  </div>
                </div>
              </Card>
            </Col>
          ))}
        </Row>
      )}
    </div>
    </Layout>
  );
};

export default ApproveSubCategoryStatus;