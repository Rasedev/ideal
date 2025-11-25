// import React, { useState, useEffect } from 'react';
// import {
//   Table,
//   Card,
//   Input,
//   Button,
//   Space,
//   Tag,
//   Avatar,
//   Modal,
//   message,
//   Row,
//   Col,
//   Typography,
//   Descriptions,
//   Divider,
// } from 'antd';
// import {
//   SearchOutlined,
//   EyeOutlined,
//   CheckCircleOutlined,
//   CloseCircleOutlined,
//   TeamOutlined,
//   UserOutlined,
// } from '@ant-design/icons';
// import { useSelector } from 'react-redux';
// import axios from 'axios';

// const { Title } = Typography;
// const { Search } = Input;

// const newRegistrationsMember = () => {
//   const [registrations, setRegistrations] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [selectedMember, setSelectedMember] = useState(null);
//   const [detailModalVisible, setDetailModalVisible] = useState(false);
//   const [searchText, setSearchText] = useState('');
//   const currentTheme = useSelector((state) => state.theme?.currentTheme || 'light');

//   useEffect(() => {
//     fetchRegistrations();
//   }, [searchText]);

//   const fetchRegistrations = async () => {
//     setLoading(true);
//     try {
//       const token = localStorage.getItem('token');
//       const response = await axios.get('http://localhost:3000/api/v1/member/registrations', {
//         headers: { Authorization: `Bearer ${token}` },
//         params: { search: searchText, status: 'waiting' },
//       });

//       if (response.data.success) {
//         setRegistrations(response.data.registrations || []);
//       }
//     } catch (error) {
//       message.error('Failed to fetch registration requests');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleApprove = async (memberId) => {
//     try {
//       const token = localStorage.getItem('token');
//       const response = await axios.put(
//         `http://localhost:3000/api/v1/member/approve/${memberId}`,
//         {},
//         { headers: { Authorization: `Bearer ${token}` } }
//       );

//       if (response.data.success) {
//         message.success('Member approved successfully');
//         fetchRegistrations();
//       }
//     } catch (error) {
//       message.error('Failed to approve member');
//     }
//   };

//   const handleReject = async (memberId) => {
//     Modal.confirm({
//       title: 'Reject Member Registration',
//       content: 'Are you sure you want to reject this registration?',
//       okText: 'Yes, Reject',
//       okType: 'danger',
//       cancelText: 'Cancel',
//       onOk: async () => {
//         try {
//           const token = localStorage.getItem('token');
//           const response = await axios.put(
//             `http://localhost:3000/api/v1/member/reject/${memberId}`,
//             {},
//             { headers: { Authorization: `Bearer ${token}` } }
//           );

//           if (response.data.success) {
//             message.success('Member registration rejected');
//             fetchRegistrations();
//           }
//         } catch (error) {
//           message.error('Failed to reject member');
//         }
//       },
//     });
//   };

//   const showMemberDetails = (member) => {
//     setSelectedMember(member);
//     setDetailModalVisible(true);
//   };

//   const columns = [
//     {
//       title: 'Applicant',
//       dataIndex: 'firstName',
//       key: 'name',
//       render: (text, record) => (
//         <Space>
//           <Avatar src={record.profilePhoto} icon={<UserOutlined />} />
//           <div>
//             <div className="font-medium">{`${record.firstName} ${record.lastName}`}</div>
//             <div className="text-xs text-gray-500">{record.email}</div>
//           </div>
//         </Space>
//       ),
//     },
//     {
//       title: 'Contact Info',
//       dataIndex: 'phone',
//       key: 'phone',
//       render: (phone, record) => (
//         <div>
//           <div>{phone}</div>
//           <div className="text-xs text-gray-500">{record.address}</div>
//         </div>
//       ),
//     },
//     {
//       title: 'Registration Date',
//       dataIndex: 'createdAt',
//       key: 'createdAt',
//       render: (date) => new Date(date).toLocaleDateString(),
//     },
//     {
//       title: 'Status',
//       dataIndex: 'status',
//       key: 'status',
//       render: (status) => (
//         <Tag color="blue" icon={<UserOutlined />}>
//           Pending Approval
//         </Tag>
//       ),
//     },
//     {
//       title: 'Actions',
//       key: 'actions',
//       render: (_, record) => (
//         <Space size="small">
//           <Button
//             type="primary"
//             icon={<EyeOutlined />}
//             size="small"
//             onClick={() => showMemberDetails(record)}
//           >
//             View
//           </Button>
//           <Button
//             type="primary"
//             icon={<CheckCircleOutlined />}
//             size="small"
//             onClick={() => handleApprove(record._id)}
//             style={{ backgroundColor: '#52c41a', borderColor: '#52c41a' }}
//           >
//             Approve
//           </Button>
//           <Button
//             danger
//             icon={<CloseCircleOutlined />}
//             size="small"
//             onClick={() => handleReject(record._id)}
//           >
//             Reject
//           </Button>
//         </Space>
//       ),
//     },
//   ];

//   const cardClass = currentTheme === 'dark' 
//     ? 'bg-gray-800 border-gray-700' 
//     : 'bg-white';

//   return (
//     <div className="min-h-screen p-4">
//       <Card className={`shadow-xl rounded-2xl ${cardClass}`}>
//         {/* Header */}
//         <div className="text-center mb-8">
//           <Title level={2} className={currentTheme === 'dark' ? 'text-white' : 'text-gray-800'}>
//             <TeamOutlined className="mr-3" />
//             New Member Registrations
//           </Title>
//           <p className={currentTheme === 'dark' ? 'text-gray-300' : 'text-gray-600'}>
//             Review and approve new member registration requests
//           </p>
//         </div>

// // --- PROFESSIONAL UI VERSION ---

// <Search
//   placeholder="Search by name, phone, email..."
//   allowClear
//   enterButton={<Button icon={<SearchOutlined />} type="primary">Search</Button>}
//   size="large"
//   onSearch={setSearchText}
//   className="shadow-sm"
//   style={{ maxWidth: 420 }}
// />

// <Table
//   columns={columns}
//   dataSource={registrations}
//   loading={loading}
//   rowKey="_id"
//   pagination={{
//     pageSize: 10,
//     showTotal: (total) => `Total ${total} registrations`,
//   }}
//   className="mt-4 shadow-sm rounded-lg"
//   onRow={(record) => ({
//     onClick: () => showMemberDetails(record),
//   })}
// />

// <Modal
//   title={
//     <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
//       <Avatar size={60} src={selectedMember?.profilePhoto} />
//       <div>
//         <Title level={4} style={{ margin: 0 }}>{`${selectedMember?.firstName} ${selectedMember?.lastName}`}</Title>
//         <span style={{ color: "#888" }}>{selectedMember?.email}</span>
//       </div>
//     </div>
//   }
//   open={detailModalVisible}
//   onCancel={() => setDetailModalVisible(false)}
//   width={750}
//   footer={[
//     <Button key="close" onClick={() => setDetailModalVisible(false)}>Close</Button>,
//     <Button key="reject" danger icon={<CloseCircleOutlined />} onClick={() => handleReject(selectedMember._id)}>Reject</Button>,
//     <Button key="approve" type="primary" icon={<CheckCircleOutlined />} onClick={() => handleApprove(selectedMember._id)}>Approve</Button>,
//   ]}
// >
//   <Divider orientation="left">Member Information</Divider>

//   <Row gutter={[16, 16]}>
//     <Col span={12}><b>Phone:</b> {selectedMember?.phone}</Col>
//     <Col span={12}><b>Date of Birth:</b> {new Date(selectedMember?.dob).toLocaleDateString()}</Col>
//     <Col span={12}><b>NID Number:</b> {selectedMember?.nidNumber}</Col>
//     <Col span={12}><b>Father:</b> {selectedMember?.fatherName}</Col>
//     <Col span={12}><b>Mother:</b> {selectedMember?.motherName}</Col>
//     <Col span={24}><b>Address:</b> {selectedMember?.address}</Col>
//     <Col span={24}><b>Registered On:</b> {new Date(selectedMember?.createdAt).toLocaleDateString()}</Col>
//   </Row>

// </Modal>

//       </Card>
//     </div>
//   );
// };

// export default newRegistrationsMember;





/////////////////////New Code Below/////////////////////


import React, { useState, useEffect } from "react";
import {
  Table,
  Card,
  Input,
  Button,
  Space,
  Tag,
  Avatar,
  Modal,
  message,
  Row,
  Col,
  Typography,
  Divider,
} from "antd";
import {
  SearchOutlined,
  EyeOutlined,
  CheckCircleOutlined,
  CloseCircleOutlined,
  TeamOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { useSelector } from "react-redux";
import axios from "axios";

const { Title } = Typography;
const { Search } = Input;

const NewRegistrationsMember = () => {
  const [registrations, setRegistrations] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedMember, setSelectedMember] = useState(null);
  const [detailModalVisible, setDetailModalVisible] = useState(false);
  const [searchText, setSearchText] = useState("");

  // New member & plot owner modals
  const [newMemberModal, setNewMemberModal] = useState(false);
  const [newPlotOwnerModal, setNewPlotOwnerModal] = useState(false);
  const [newMemberData, setNewMemberData] = useState({});
  const [newPlotOwnerData, setNewPlotOwnerData] = useState({});

  const theme = useSelector((state) => state.theme?.currentTheme || "light");

  useEffect(() => {
    fetchRegistrations();
  }, [searchText]);

  const fetchRegistrations = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(
        "http://localhost:3000/api/v1/member/registrations",
        {
          headers: { Authorization: `Bearer ${token}` },
          params: { search: searchText, status: "waiting" },
        }
      );

      if (response.data.success) {
        setRegistrations(response.data.registrations || []);
      }
    } catch (error) {
      message.error("Failed to fetch registrations");
    } finally {
      setLoading(false);
    }
  };

  const handleApprove = async (id) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.put(
        `http://localhost:3000/api/v1/member/approve/${id}`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (response.data.success) {
        message.success("Member approved");
        fetchRegistrations();
      }
    } catch {
      message.error("Failed to approve");
    }
  };

  const handleReject = async (id) => {
    Modal.confirm({
      title: "Reject Member",
      content: "Are you sure you want to reject this member?",
      okType: "danger",
      onOk: async () => {
        try {
          const token = localStorage.getItem("token");
          const response = await axios.put(
            `http://localhost:3000/api/v1/member/reject/${id}`,
            {},
            { headers: { Authorization: `Bearer ${token}` } }
          );

          if (response.data.success) {
            message.success("Member rejected");
            fetchRegistrations();
          }
        } catch {
          message.error("Failed to reject");
        }
      },
    });
  };

  // const handleCreateMember = async () => {
  //   try {
  //     const token = localStorage.getItem("token");
  //     const response = await axios.post(
  //       "http://localhost:3000/api/v1/member/createmember",
  //       newMemberData,
  //       { headers: { Authorization: `Bearer ${token}` } }
  //     );

  //     if (response.data.success) {
  //       message.success("New member created!");
  //       setNewMemberModal(false);
  //       setNewMemberData({});
  //     }
  //   } catch {
  //     message.error("Failed to create member");
  //   }
  // };

const handleCreateMember = async () => {
  try {
    const token = localStorage.getItem("token");

    // Validation
    if (!newMemberData.firstName || !newMemberData.email || !newMemberData.phone) {
      return message.error("First name, email, and phone are required");
    }
    if (!newMemberData.image) {
      return message.error("Profile image is required");
    }

    const formData = new FormData();
    formData.append("firstName", newMemberData.firstName);
    formData.append("lastName", newMemberData.lastName || "");
    formData.append("email", newMemberData.email);
    formData.append("telephone", newMemberData.phone);
    formData.append("address", newMemberData.address || "");
    formData.append("image", newMemberData.image);

    const response = await axios.post(
      "http://localhost:3000/api/v1/member/createmember",
      formData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      }
    );

    if (response.data.success) {
      message.success("Member created successfully!");
      setNewMemberModal(false);
      setNewMemberData({});
      fetchRegistrations(); // refresh table
    }
  } catch (err) {
    console.error("Create member failed:", err);
    message.error(err.response?.data?.message || "Failed to create member");
  }
};


  const handleCreatePlotOwner = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(
        "http://localhost:3000/api/v1/plot-owner/create",
        newPlotOwnerData,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (response.data.success) {
        message.success("Plot owner added!");
        setNewPlotOwnerModal(false);
        setNewPlotOwnerData({});
      }
    } catch {
      message.error("Failed to add plot owner");
    }
  };

  const columns = [
    {
      title: "Applicant",
      key: "name",
      render: (_, record) => (
        <Space>
          <Avatar src={record.profilePhoto} icon={<UserOutlined />} />
          <div>
            <div>{record.firstName + " " + record.lastName}</div>
            <small style={{ color: "#888" }}>{record.email}</small>
          </div>
        </Space>
      ),
    },
    {
      title: "Contact",
      render: (_, record) => (
        <>
          <div>{record.phone}</div>
          <small style={{ color: "#888" }}>{record.address}</small>
        </>
      ),
    },
    {
      title: "Date",
      dataIndex: "createdAt",
      render: (d) => new Date(d).toLocaleDateString(),
    },
    {
      title: "Status",
      render: () => (
        <Tag color="processing" icon={<UserOutlined />}>
          Pending
        </Tag>
      ),
    },
    {
      title: "Actions",
      render: (_, record) => (
        <Space>
          <Button
            size="small"
            icon={<EyeOutlined />}
            onClick={() => {
              setSelectedMember(record);
              setDetailModalVisible(true);
            }}
          >
            View
          </Button>

          <Button
            size="small"
            type="primary"
            icon={<CheckCircleOutlined />}
            onClick={() => handleApprove(record._id)}
          >
            Approve
          </Button>

          <Button
            size="small"
            danger
            icon={<CloseCircleOutlined />}
            onClick={() => handleReject(record._id)}
          >
            Reject
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <div className="p-4 min-h-screen">
      <Card className={`shadow-xl rounded-2xl ${theme === "dark" ? "bg-gray-800" : "bg-white"}`}>
        <div className="text-center mb-6">
          <Title level={2}>
            <TeamOutlined /> New Member Registrations
          </Title>
          <p>Review and approve new member registrations</p>
        </div>

        {/* Top Buttons */}
        <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: 16, gap: 12 }}>
          <Button type="primary" onClick={() => setNewMemberModal(true)}>
            + Add New Member
          </Button>

          <Button type="dashed" onClick={() => setNewPlotOwnerModal(true)}>
            + Add Plot Owner
          </Button>
        </div>

        {/* Search Bar */}
        <Search
          placeholder="Search…"
          allowClear
          onSearch={setSearchText}
          style={{ maxWidth: 400, marginBottom: 16 }}
        />

        {/* Table */}
        <Table
          columns={columns}
          dataSource={registrations}
          loading={loading}
          rowKey="_id"
          pagination={{ pageSize: 10 }}
        />

        {/* Member Detail Modal */}
        <Modal
          title="Member Details"
          open={detailModalVisible}
          onCancel={() => setDetailModalVisible(false)}
          footer={null}
          width={700}
        >
          {selectedMember && (
            <>
              <Divider>Personal Information</Divider>
              <Row gutter={[16, 16]}>
                <Col span={12}>Name: {selectedMember.firstName} {selectedMember.lastName}</Col>
                <Col span={12}>Email: {selectedMember.email}</Col>
                <Col span={12}>Phone: {selectedMember.phone}</Col>
                <Col span={12}>DOB: {selectedMember.dob || "N/A"}</Col>
                <Col span={12}>NID: {selectedMember.nidNumber || "N/A"}</Col>
                <Col span={24}>Address: {selectedMember.address || "N/A"}</Col>
              </Row>
            </>
          )}
        </Modal>

        {/* New Member Modal */}
        <Modal
          title="Create New Member"
          open={newMemberModal}
          onCancel={() => setNewMemberModal(false)}
          onOk={handleCreateMember}
        >
          <Input placeholder="First Name" className="mb-2" onChange={(e) => setNewMemberData({ ...newMemberData, firstName: e.target.value })} />
          <Input placeholder="Last Name" className="mb-2" onChange={(e) => setNewMemberData({ ...newMemberData, lastName: e.target.value })} />
          <Input placeholder="Email" className="mb-2" onChange={(e) => setNewMemberData({ ...newMemberData, email: e.target.value })} />
          <Input placeholder="Phone" className="mb-2" onChange={(e) => setNewMemberData({ ...newMemberData, phone: e.target.value })} />
          <Input placeholder="Address" className="mb-2" onChange={(e) => setNewMemberData({ ...newMemberData, address: e.target.value })} />
          <input
  type="file"
  accept="image/*"
  onChange={(e) =>
    setNewMemberData({ ...newMemberData, image: e.target.files[0] })
  }
/>


        </Modal>

        {/* New Plot Owner Modal */}
        <Modal
          title="Add Plot Owner"
          open={newPlotOwnerModal}
          onCancel={() => setNewPlotOwnerModal(false)}
          onOk={handleCreatePlotOwner}
        >
          <Input placeholder="Owner Name" className="mb-2" onChange={(e) => setNewPlotOwnerData({ ...newPlotOwnerData, ownerName: e.target.value })} />
          <Input placeholder="Phone" className="mb-2" onChange={(e) => setNewPlotOwnerData({ ...newPlotOwnerData, phone: e.target.value })} />
          <Input placeholder="Plot Number" className="mb-2" onChange={(e) => setNewPlotOwnerData({ ...newPlotOwnerData, plotNumber: e.target.value })} />
          <Input placeholder="Block / Area" className="mb-2" onChange={(e) => setNewPlotOwnerData({ ...newPlotOwnerData, block: e.target.value })} />
        </Modal>
      </Card>
    </div>
  );
};

export default NewRegistrationsMember;








