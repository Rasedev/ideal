



// import { useEffect, useState } from 'react';
// import { Button, Card, Modal, Select, Table, Tag, Typography, Spin } from 'antd';
// import axios from 'axios';
// import Title from 'antd/es/typography/Title';

// const { Text } = Typography;

// const ApproveCategoryStatus = () => {
//   const [allCategory, setAllCategory] = useState([]);
//   const [categoryName, setCategoryName] = useState('');
//   const [statusName, setStatusName] = useState('');
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [loading, setLoading] = useState(false);
//   const [selectedId, setSelectedId] = useState(null); // Track the selected category ID

//   useEffect(() => {
//     async function getAllCategory() {
//       setLoading(true);
//       try {
//         const { data } = await axios.get('http://localhost:3000/api/v1/category/getallcategory');
//         setAllCategory(data);
//       } catch (error) {
//         console.error('Error fetching categories:', error);
//       } finally {
//         setLoading(false);
//       }
//     }
//     getAllCategory();
//   }, []);

//   const showModal = (item) => {
//     setCategoryName(item.name);
//     setSelectedId(item._id); // Store the selected category ID
//     setIsModalOpen(true);
//   };

//   // const handleOk = async () => {
//   //   try {
//   //     // Update the status via API
//   //     await axios.post('http://localhost:3000/api/v1/category/createcategorystatus', {
//   //       name: categoryName,
//   //       status: statusName,
//   //     });

//   //     // Update the local state to reflect the changes
//   //     setAllCategory((prev) =>
//   //       prev.map((item) =>
//   //         item._id === selectedId ? { ...item, status: statusName } : item
//   //       )
//   //     );

//   //     setIsModalOpen(false);
//   //   } catch (error) {
//   //     console.error('Error updating status:', error);
//   //   }
//   // };


//   const handleOk = async () => {
//     try {
//       // Determine new active status based on selected status
//       const newIsActive = statusName === "approved";
  
//       // Update the status via API
//       await axios.post("http://localhost:3000/api/v1/category/createcategorystatus", {
//         name: categoryName,
//         status: statusName,
//       });
  
//       // Update the local state immediately after API response
//       setAllCategory((prev) =>
//         prev.map((item) =>
//           item._id === selectedId ? { ...item, status: statusName, isActive: newIsActive } : item
//         )
//       );
  
//       setIsModalOpen(false);
//     } catch (error) {
//       console.error("Error updating status:", error);
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
//       title: <Text strong className="font-dm text-primary text-sm md:text-base font-bold">Category Name</Text>,
//       dataIndex: 'name',
//       key: 'name',
//       render: (text) => <Text className="font-dm text-[#767676] text-xs md:text-sm">{text || 'Unnamed Category'}</Text>,
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
//       <Card  className="shadow-lg rounded-lg p-2 sm:p-4 md:p-6 lg:p-8" >
//         <Title level={3} className="font-dm font-bold " style={{ textAlign: "center", marginBottom: "30px" }}>
//         ✅ Approve Category Status
//         </Title>
//         {loading ? (
//           <div className="flex justify-center items-center h-40">
//             <Spin size="large" />
//           </div>
//         ) : (
//           <Table
//             dataSource={allCategory}
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
//               Edit Category Status
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
//               Category: {categoryName}
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

// export default ApproveCategoryStatus;




// components/ApprovedEmployeesTable.jsx
import React, { useEffect, useState, useCallback } from "react";
import {
  Table,
  Spin,
  message,
  Typography,
  Tag,
  Input,
  Space,
  Button,
  Avatar,
  Layout
} from "antd";
import { UserOutlined, SearchOutlined } from "@ant-design/icons";
import axios from "axios";
import moment from "moment";

const { Title, Text } = Typography;
const { Header } = Layout;

const ApproveCategoryStatus = () => {
  const [approvedEmployees, setApprovedEmployees] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");

  const fetchApprovedEmployees = useCallback(async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      const { data } = await axios.get(
        "http://localhost:3000/api/v1/employee/allemployee", // Assuming this endpoint returns all employees
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

  const getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
      close,
    }) => (
      <div style={{ padding: 8 }} onKeyDown={(e) => e.stopPropagation()}>
        <Input
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() => confirm()}
          style={{ marginBottom: 8, display: "block" }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => confirm()}
            icon={<SearchOutlined />}
            size="small"
            style={{ width: 90 }}
          >
            Search
          </Button>
          <Button
            onClick={() => clearFilters && clearFilters()}
            size="small"
            style={{ width: 90 }}
          >
            Reset
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              confirm({ closeDropdown: false });
              setSearchText(selectedKeys[0]);
              setSearchedColumn(dataIndex);
            }}
          >
            Filter
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              close();
            }}
          >
            close
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered) => (
      <SearchOutlined style={{ color: filtered ? "#1677ff" : undefined }} />
    ),
    onFilter: (value, record) =>
      record[dataIndex]
        .toString()
        .toLowerCase()
        .includes(value.toLowerCase()),
    onFilterDropdownOpenChange: (visible) => {
      if (visible) {
        // setTimeout(() => searchInput.select(), 100);
      }
    },
    render: (text) =>
      searchedColumn === dataIndex ? (
        <Text mark>{text}</Text>
      ) : (
        text
      ),
  });

  const columns = [
    {
      title: "#",
      dataIndex: "index",
      key: "index",
      align: "center",
      render: (_, __, index) => <Text>{index + 1}</Text>,
    },
    {
      title: "Employee Info",
      key: "employeeInfo",
      ...getColumnSearchProps("firstName"),
      render: (_, record) => (
        <div className="flex items-center">
          <Avatar size={60} src={record.image} icon={<UserOutlined />} />
          <div className="ml-3">
            <Text strong>
              {record.firstName} {record.lastName}
            </Text>
            <br />
            <Text type="secondary">{record.email}</Text>
          </div>
        </div>
      ),
    },
    {
      title: "Role & Store",
      dataIndex: "role",
      key: "role",
      render: (_, record) => (
        <>
          <Tag color="blue" className="font-railway text-[15px] font-normal text-transpa">
            {record.role || "N/A"}
          </Tag>
          <br />
          <Text className="font-railway text-base font-medium">Batch: {record.store?.batch || "N/A"}</Text>
        </>
      ),
    },
    {
      title: "ERP Number",
      dataIndex: "erpNumber",
      key: "erpNumber",
      ...getColumnSearchProps("erpNumber"),
      render: (text) => <Text>{text || "N/A"}</Text>,
    },
    {
      title: "Join Date",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (text) => (text ? moment(text).format("YYYY-MM-DD") : "N/A"),
      sorter: (a, b) => moment(a.createdAt).unix() - moment(b.createdAt).unix(),
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status) => <Tag color="green">{status.toUpperCase()}</Tag>,
    },
    {
      title: "Actions",
      key: "actions",
      align: "center",
      render: (_, record) => (
        <Button type="link" onClick={() => message.info(`Viewing ${record.firstName}'s profile`)}>
          View Profile
        </Button>
      ),
    },
  ];

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
      ) : (
        <Table
          columns={columns}
          dataSource={approvedEmployees}
          rowKey="_id"
          pagination={{ pageSize: 10 }}
          scroll={{ x: "max-content" }}
          bordered
          className="font-railway"
        />
      )}
    </div>
    </Layout>
  );
};

export default ApproveCategoryStatus;