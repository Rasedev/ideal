import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setTransferOrders } from "./slices/transferOrdersSlice";
import {
  Table,
  Spin,
  message,
  Button,
  Typography,
  Tag,
  Row,
  Card,
  Col,
  Space,
  Modal,
  Form,
  Input,
  Dropdown,
  Select,
  Layout,
} from "antd";
import {
  DownloadOutlined,
  EditOutlined,
  DeleteOutlined,
  DownOutlined,
  CheckOutlined,
  CloseOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import axios from "axios";

const { Title, Text } = Typography;
const { Header } = Layout;

const AllTransferOrders = () => {
  const dispatch = useDispatch();
  const isMountedRef = useRef(true);
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  //const [orders, setOrders] = useState([]);
  const [pdfLoading, setPdfLoading] = useState(false);
  const [editingTransferOrder, setEditingTransferOrder] = useState(null);

  const transferOrdersData =
    useSelector((state) => state.transferOrders.transferOrders) || [];
  console.log("Transfer orders being rendered:", transferOrdersData);

  useEffect(() => {
    isMountedRef.current = true;
    fetchTransferOrders();
    return () => {
      isMountedRef.current = false;
    };
  }, []);

  const fetchTransferOrders = async () => {
    setLoading(true);
    const token = localStorage.getItem("token");
    try {
      const res = await axios.get(
        "http://localhost:3000/api/v1/transfer-order/alltransfer",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("Fetched transfer order data:", res.data);
      console.log("Fetching transfer orders with token:", token);

      const transferOrders = res.data?.data || [];
      dispatch(setTransferOrders(transferOrders));
    } catch (error) {
      console.error("Error fetching transfer orders:", error);
      message.error("Failed to load transfer orders");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(
        `http://localhost:3000/api/v1/transfer-order/delete/${id}`
      );
      message.success("Transfer order deleted successfully");
      console.log("Deleting transfer order with ID:", id);

      fetchTransferOrders();
      message.success("Employee deleted successfully");
    } catch (error) {
      message.error("Failed to delete transfer order");
      console.error("Delete error:", error.response?.data || error.message);
    }
  };

  const showEditModal = (transferOrder) => {
    setEditingTransferOrder(transferOrder);
    form.setFieldsValue(transferOrder);
    setIsModalOpen(true);
  };

  const handleEditSubmit = async (values) => {
    try {
      console.log("Submitting updated values:", values);
      await axios.put(
        `http://localhost:3000/api/v1/transfer-order/update/${editingTransferOrder._id}`,
        {
          employeeId: editingTransferOrder._id,
          currentWorkplace: values.currentWorkplace,
          newDepartment: values.newDepartment,
          sourceNumber: values.sourceNumber,
          reason: values.reason,
          ...values,
          effectiveDate: values.effectiveDate
            ? values.effectiveDate.format("YYYY-MM-DD")
            : null,
          status: values.status || "waiting",
        }
      );

      message.success("Transfer updated successfully");
      form.resetFields();
      setIsModalOpen(false);
      setEditingTransferOrder(null);
      fetchTransferOrders();
    } catch (error) {
      message.error("Failed to update transfer");
    }
  };

  const downloadTransferPdf = async () => {
    setPdfLoading(true);
    try {
      const response = await axios.get(
        "http://localhost:3000/api/v1/transfer-order/download-transfer-order",
        {
          responseType: "blob",
          headers: { Accept: "application/pdf" },
        }
      );

      const timestamp = new Date().toISOString().replace(/[:.]/g, "-");
      const filename = `transfer-orders_${timestamp}.pdf`;

      const blob = new Blob([response.data], { type: "application/pdf" });
      const url = window.URL.createObjectURL(blob);

      const link = document.createElement("a");
      link.href = url;
      link.download = filename;
      link.click();

      window.URL.revokeObjectURL(url);
    } catch (error) {
      message.error("PDF download failed");
      console.error("PDF error:", error);
    } finally {
      setPdfLoading(false);
    }
  };

  const statusTag = (status) => {
    const color =
      {
        waiting: "orange",
        approved: "green",
        rejected: "red",
      }[status] || "gray";

    return <Tag color={color}>{status.toUpperCase()}</Tag>;
  };

  const columns = [
    {
      title: (
        <span
          style={{ fontWeight: "normal", color: "#333", fontFamily: "railway" }}
        >
          ক্রমিক নং
        </span>
      ),
      render: (_, __, index) => <Text>{index + 1}</Text>,
    },
    {
      title: (
        <span
          style={{ fontWeight: "normal", color: "#333", fontFamily: "railway" }}
        >
          নিরাপত্তা প্রহরীর নাম ও তথ্য
        </span>
      ),
      render: (_, record) => {
        const emp = record.employee || {};
        return (
          <div className="font-railway">
            <Text>জনাব মোঃ</Text> {emp.firstName} {emp.lastName} <br />
            <Text>ইআরপি নং:</Text> {emp.erpNumber} <br />
            <Text>ফোন:</Text> {emp.telephone || "N/A"} <br />
            <Text>ইমেইল:</Text> {emp.email}
          </div>
        );
      },
    },
    {
      title: (
        <span
          style={{ fontWeight: "normal", color: "#333", fontFamily: "railway" }}
        >
          ছবি
        </span>
      ),
      render: (_, record) => (
        <img
          src={record.image}
          alt="Employee"
          style={{
            width: 100,
            height: 100,
            objectFit: "cover",
            borderRadius: 8,
            fontFamily: "Railway",
          }}
        />
      ),
    },
    {
      title: (
        <span
          style={{ fontWeight: "normal", color: "#333", fontFamily: "railway" }}
        >
          বর্তমান কর্মস্থল
        </span>
      ),
      dataIndex: "currentWorkplace",
      render: (text) => <span className="font-railway">{text || "N/A"}</span>,
    },
    {
      title: (
        <span
          style={{ fontWeight: "normal", color: "#333", fontFamily: "railway" }}
        >
          নতুন বিভাগ/দপ্তর
        </span>
      ),
      dataIndex: "newDepartment",
      render: (text) => <span className="font-railway">{text || "N/A"}</span>,
    },

    // {
    //   title: "Effective Date",
    //   dataIndex: "effectiveDate",
    //   render: (date) =>
    //     date ? new Date(date).toLocaleDateString() : "Not specified",
    // },
    // {
    //   title: "Source No.",
    //   dataIndex: "sourceNumber",
    //   render: (text) => text || "N/A",
    // },
    // {
    //   title: "Status",
    //   dataIndex: "status",
    //   render: statusTag,
    //   filters: [
    //     { text: "Waiting", value: "waiting" },
    //     { text: "Approved", value: "approved" },
    //     { text: "Rejected", value: "rejected" },
    //   ],
    //   onFilter: (value, record) => record.status === value,
    // },
    {
      title: "Actions",
      render: (_, record) => (
        <Space>
          <Button
            icon={<EditOutlined />}
            onClick={() => showEditModal(record)}
            className="font-railway "
          >
            Edit {editingTransferOrder?._id === record._id ? " (Editing)" : ""}
          </Button>
          <Button
            danger
            icon={<DeleteOutlined />}
            onClick={() => handleDelete(record._id)}
            className="font-railway "
          >
            Delete
          </Button>
        </Space>
      ),
    },
  ];

  return (
    // <Layout>
    //   <Header className="bg-[#FFF] p-0 ">
    //     <Title
    //       level={3}
    //       className="font-railway text-center p-5 text-[clamp(1.5rem,2vw,2rem)] font-semibold text-gray-800 ">
    //       Add New Employee
    //     </Title>
    //   </Header>

    // <div className="container mx-auto p-4 sm:px-6 lg:px-6 py-6">
    //   <div className="flex justify-end mb-4 ">
    //     <Button
    //       icon={<DownloadOutlined />}
    //       loading={pdfLoading}
    //       onClick={downloadTransferPdf}
    //     >
    //       {pdfLoading ? "Generating PDF..." : "Download PDF"}
    //     </Button>
    //   </div>

    //   <div className="text-center mb-16">
    //     <img
    //       src="/assets/images/bpdb.png"
    //       alt="BPDB Logo"
    //       style={{ width: 100 }}
    //       className="mx-auto mb-2"
    //     />
    //     <Text className="font-railway text-[16px] font-mediums" level={4}>বাংলাদেশ বিদ্যুৎ উন্নয়ন বোর্ড</Text><br/>
    //     <Text className="font-railway text-[16px] font-medium">পরিচালক,নিরাপত্তা ও অনুসন্ধান পরিদপ্তর</Text>
    //     <br />
    //     <Text className="font-railway text-[16px]">www.bpdb.gov.com</Text>
    //   </div>
    //   <div className="font-railway mb-6">
    //     <Row gutter={[16, 16]} align={"middle"}>
    //       <Col span={8}>
    //         <Text  className=" mb-4 font-railway">
    //            <span className="font-medium"  >স্মারক নাম্বার : </span> {transferOrdersData[0]?.sourceNumber || "N/A"}
    //         </Text>
    //       </Col>
    //       <Col span={8} style={{ textAlign: "center" }}>
    //         <Title level={5} className="text-center mb-4 font-railway">
    //          অফিস আদেশ
    //         </Title>
    //       </Col>
    //       <Col span={8} style={{ textAlign: "right" }}>
    //         <Text  className="font-railway">
    //        <span className="font-semibold">তারিখ : </span>
    //       {transferOrdersData[0]?.effectiveDate
    //         ? new Date(transferOrdersData[0].effectiveDate).toLocaleDateString()
    //         : "N/A"}
    //         </Text>
    //       </Col>
    //     </Row>
    //   </div>
    //   <Text className="font-railway text-center ">বোর্ডের নিরাপত্তা কাজের স্বার্থে নিম্নলিখিত নিরাপত্তা প্রহরীগণকে এত দ্বারা বদলি-পূর্বক তাদের নামের পাশে উল্লেখিত দপ্তরে পদস্থ করা হলো।</Text>

    //   <Spin spinning={loading}>
    //     <Table className="pt-3 font-railway"
    //       dataSource={transferOrdersData}
    //       columns={columns}
    //       // rowKey="_id"
    //       rowKey={(record) => record._id || record.employee?._id}
    //       bordered
    //       pagination={{ pageSize: 10 }}
    //       locale={{ emptyText: "No transfer orders available" }}

    //     />
    //   </Spin>

    //   <Modal
    //     title="Edit Employee"
    //     open={isModalOpen}
    //     onCancel={() => {
    //       setIsModalOpen(false);
    //       setEditingTransferOrder(null);
    //       form.resetFields();
    //     }}
    //     footer={null}
    //   >
    //     <Form className="max-w-2xl mx-auto bg-white shadow-lg rounded-xl p-6 space-y-5 font-railway"
    //       form={form}
    //       layout="vertical"
    //       onFinish={handleEditSubmit}
    //       //initialValues={editingEmployee}
    //     >
    //       <Form.Item name="firstName" label="Name">
    //         <Input placeholder="Enter name" />
    //       </Form.Item>
    //       <Form.Item name="email" label="Email">
    //         <Input placeholder="Enter email" />
    //       </Form.Item>
    //       <Form.Item name="currentWorkplace" label="Current Workplace">
    //         <Input />
    //       </Form.Item>
    //       <Form.Item name="newDepartment" label="New Department">
    //         <Input />
    //       </Form.Item>
    //       <Form.Item name="sourceNumber" label="Source Number">
    //         <Input />
    //       </Form.Item>
    //       <Form.Item name="status" label="Status">
    //         <Select>
    //           <Select.Option value="waiting">Waiting</Select.Option>
    //           <Select.Option value="approved">Approved</Select.Option>
    //           <Select.Option value="rejected">Rejected</Select.Option>
    //         </Select>
    //       </Form.Item>

    //       <Form.Item>
    //         <Button htmlType="submit" type="primary" block>
    //           Save Changes
    //         </Button>
    //       </Form.Item>
    //     </Form>
    //   </Modal>
    // </div>
    // </Layout>

    <Layout className="min-h-screen bg-gray-50">
      <Header className="bg-white shadow-sm">
        <Title
          level={3}
          className="text-center p-5 font-railway text-[clamp(1.5rem,2vw,2rem)] font-semibold text-gray-800"
        >
          Add New Employee
        </Title>
      </Header>

      <div className="container mx-auto p-4 sm:px-6 lg:px-6 py-6">
        <Card className="font-railway shadow-lg rounded-xl space-y-6">
          {/* Logo and Info */}
          <div className="text-center">
              {/* Download Button */}
          <div className="flex justify-end">
            <Button
              icon={<DownloadOutlined />}
              loading={pdfLoading}
              onClick={downloadTransferPdf}
              type="primary"
              className="bg-blue-600 hover:bg-blue-700 text-white"
            >
              {pdfLoading ? "Generating PDF..." : "Download PDF"}
            </Button>
          </div>
            <div className="">
            <img
              src="/assets/images/bpdb.png"
              alt="BPDB Logo"
              className="mx-auto mb-3 w-24"
            />
            <Text className="block text-lg font-semibold">
              বাংলাদেশ বিদ্যুৎ উন্নয়ন বোর্ড
            </Text>
            <Text className="block text-base">
              পরিচালক, নিরাপত্তা ও অনুসন্ধান পরিদপ্তর
            </Text>
            <Text className="block text-sm text-gray-600">
              www.bpdb.gov.com
            </Text>

            </div>
          
          </div>

          {/* Metadata Row */}
          <Row gutter={[16, 16]} align="middle">
            <Col xs={24} md={8}>
              <Text className="font-medium">
                স্মারক নাম্বার: {transferOrdersData[0]?.sourceNumber || "N/A"}
              </Text>
            </Col>
            <Col xs={24} md={8} className="text-center">
              <Title level={5} className="mb-0">
                অফিস আদেশ
              </Title>
            </Col>
            <Col xs={24} md={8} className="text-right">
              <Text className="font-semibold">
                তারিখ:{" "}
                {transferOrdersData[0]?.effectiveDate
                  ? new Date(
                      transferOrdersData[0].effectiveDate
                    ).toLocaleDateString()
                  : "N/A"}
              </Text>
            </Col>
          </Row>

          {/* Description Text */}
          <p className="text-center mt-4">
            বোর্ডের নিরাপত্তা কাজের স্বার্থে নিম্নলিখিত নিরাপত্তা প্রহরীগণকে এত
            দ্বারা বদলি-পূর্বক তাদের নামের পাশে উল্লেখিত দপ্তরে পদস্থ করা হলো।
          </p>         

          {/* Transfer Orders Table */}
          <Spin spinning={loading}>
            <div className="overflow-x-auto">
              <Table
                dataSource={transferOrdersData}
                columns={columns}
                rowKey={(record) => record._id || record.employee?._id}
                bordered
                pagination={{ pageSize: 10 }}
                locale={{ emptyText: "No transfer orders available" }}
              />
            </div>
          </Spin>

          {/* Edit Employee Modal */}
          <Modal
            title="Edit Employee"
            open={isModalOpen}
            onCancel={() => {
              setIsModalOpen(false);
              setEditingTransferOrder(null);
              form.resetFields();
            }}
            footer={null}
          >
            <Form
              form={form}
              layout="vertical"
              onFinish={handleEditSubmit}
              className="space-y-5"
            >
              <Form.Item
                name="firstName"
                label="Name"
                rules={[{ required: true }]}
              >
                <Input placeholder="Enter name" />
              </Form.Item>
              <Form.Item name="email" label="Email" rules={[{ type: "email" }]}>
                <Input placeholder="Enter email" />
              </Form.Item>
              <Form.Item name="currentWorkplace" label="Current Workplace">
                <Input />
              </Form.Item>
              <Form.Item name="newDepartment" label="New Department">
                <Input />
              </Form.Item>
              <Form.Item name="sourceNumber" label="Source Number">
                <Input />
              </Form.Item>
              <Form.Item name="status" label="Status">
                <Select placeholder="Select status">
                  <Select.Option value="waiting">Waiting</Select.Option>
                  <Select.Option value="approved">Approved</Select.Option>
                  <Select.Option value="rejected">Rejected</Select.Option>
                </Select>
              </Form.Item>
              <Form.Item>
                <Button type="primary" htmlType="submit" block>
                  Save Changes
                </Button>
              </Form.Item>
            </Form>
          </Modal>
        </Card>
      </div>
    </Layout>
  );
};

export default AllTransferOrders;

// <Dropdown
//   menu={{
//     items: [
//       {
//         key: "edit",
//         label: "Edit",
//         icon: <EditOutlined />,
//         onClick: () => showEditModal(record)
//       },
//       {
//         key: "delete",
//         label: "Delete",
//         icon: <DeleteOutlined />,
//         danger: true,
//         onClick: () => handleDelete(record._id)
//       },
//       {
//         key: "approve",
//         label: "Approve",
//         icon: <CheckOutlined />,
//         disabled: record.status === "approved"
//       },
//       {
//         key: "reject",
//         label: "Reject",
//         icon: <CloseOutlined />,
//         disabled: record.status === "rejected"
//       }
//     ]
//   }}
// >
//   <Button>Actions <DownOutlined /></Button>
// </Dropdown>
