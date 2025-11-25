// import { useDispatch, useSelector } from "react-redux";
// import { useEffect, useRef, useState } from "react";
// import { setEmployees, deleteEmployee } from "./slices/employeeSlice";
// import axios from "axios";
// import {
//   Button,
//   Space,
//   Table,
//   message,
//   Typography,
//   Spin,
//   Card,
//   Modal,
//   Form,
//   Input,
//   Tag,
// } from "antd";
// import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
// import moment from "moment";

// const { Title, Text } = Typography;

// const AllEmployee = () => {
//   const dispatch = useDispatch();
//   const isMountedRef = useRef(true);
//   const [form] = Form.useForm();
//   const [loading, setLoading] = useState(false);
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [editingEmployee, setEditingEmployee] = useState(null);

//   const employeeData = useSelector((state) => state.employee.value) || [];
//   // const employees = useSelector((state) => state.employee.value);
//   // console.log("Employees:", employees);

//   useEffect(() => {
//     isMountedRef.current = true;
//     fetchAllEmployees();
//     return () => {
//       isMountedRef.current = false;
//     };
//   }, []);

//   const fetchAllEmployees = async () => {
//     // const token = user?.token;
//     // if (!token) {
//       //   message.error("You are not logged in or your session has expired.");
//       //   return;
//       // }
//     setLoading(true);
//     const token = localStorage.getItem("token");
//     try {
//       const { data } = await axios.get(
//         "http://localhost:3000/api/v1/employee/allemployee",
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );
//       console.log("Fetched employee data:", data);
//       console.log("Fetching employees with token:", token);

//       const employees = Array.isArray(data) ? data : data.employees || [];
//       dispatch(setEmployees(employees));
//     } catch (error) {
//       console.error("Error fetching employees:", error);
//       message.error("Failed to load employees");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleDelete = async (id) => {
//     try {
//       await axios.delete(`http://localhost:3000/api/v1/employee/delete/${id}`);
//       message.success("Employee deleted successfully");
//       console.log("Deleting employee with ID:", id);

//       fetchAllEmployees();
//       // message.success("Employee deleted successfully");
//     } catch (error) {
//       message.error("Failed to delete employee");
//       console.error("Delete error:", error.response?.data || error.message);
//     }
//   };

//   const showEditModal = (employee) => {
//     setEditingEmployee(employee);
//     form.setFieldsValue(employee); // ✅ Set form fields manually
//     setIsModalOpen(true);
//   };

//   const handleEditSubmit = async (values) => {
//     try {
//       console.log("Submitting updated values:", values);
//       await axios.put(`http://localhost:3000/api/v1/employee/update/${editingEmployee._id}`,
//         {
//           ...values,
//           firstName: values.firstName,
//           email: values.email,
//           address: values.address,
//           telephone: values.telephone,
//           fatherName: values.fatherName,
//           birthplace: values.birthplace,
//           dob: values.dob,
//           erpNumber: values.erpNumber,
//           jobIdCardNumber: values.jobIdCardNumber,
//           educationalQualification: values.educationalQualification,
//           image: values.image,
//           employmentHistory: values.employmentHistory || [],
//           // employmentHistory: values.employmentHistory.map((item) => ({
//           //   position: item.position,
//           //   startDate: item.startDate ? moment(item.startDate).toISOString() : null,
//           //   endDate: item.endDate ? moment(item.endDate).toISOString() : null,
//           // })),,
//           store: values.store || {},
//           description: values.description,

//         },
//         {
//           headers: {
//             Authorization: `Bearer ${localStorage.getItem("token")}`,
//           },
//         }
//       );

//       message.success("Employee updated successfully");

//       form.resetFields();
//       setIsModalOpen(false);
//       setEditingEmployee(null);
//       fetchAllEmployees();
//     } catch (error) {
//       console.error("Failed to update employee:", error);
//       message.error("Failed to update employee");
//     }
//   };

//   const columns = [
//     {
//       title: "#",
//       dataIndex: "index",
//       key: "index",
//       align: "center",
//       render: (_, __, index) => <Text strong>{index + 1}</Text>,
//     },
//     // {
//     //   title: "Employee Info",
//     //   key: "employeeInfo",
//     //   render: (_, record) => (
//     //     <div>
//     //       <strong>ID:</strong> {record._id} <br />
//     //       <Text strong>
//     //         Name: {record.firstName} {record.lastName}
//     //       </Text>
//     //       <br />
//     //       <Text type="secondary">
//     //       <strong>S/O:</strong>   {record.fatherName || "N/A"} · <strong>Born in:</strong>{" "} {record.birthplace || "N/A"}
//     //       </Text>
//     //       <br />
//     //       <Text strong type="secondary">Address: {record.address || "N/A"}</Text>
//     //       <br />
//     //       <Text strong type="secondary">Phone: {record.telephone || "N/A"}</Text>
//     //       <br />
//     //       <Text strong type="secondary">Email: {record.email || "N/A"}</Text>

//     //       <br />
//     //       <Text strong type="secondary">Status: {record.status || "N/A"}</Text>
//     //       <br />
//     //       <Text strong type="secondary">
//     //         Role: <Tag color="blue">{record.role || "N/A"}</Tag>
//     //       </Text>

//     //     </div>
//     //   ),
//     // },
//     {
//       title: "Employee Info",
//       key: "employeeInfo",
//       render: (_, record) => (
//         <div style={{ paddingLeft: 20 }}>
//           <ul style={{ paddingLeft: 0, listStyle: "none" }}>
//             <li>
//               <Text strong>ID:</Text> {record._id || "N/A"}
//             </li>
//             <li>
//               <Text strong>Name:</Text> {record.firstName} {record.lastName}
//             </li>
//             <li>
//               <Text strong>S/O:</Text> {record.fatherName || "N/A"}
//             </li>
//             <li>
//               <Text strong>Born in:</Text> {record.birthplace || "N/A"}
//             </li>
//             <li>
//               <Text strong>Address:</Text> {record.address || "N/A"}
//             </li>
//             <li>
//               <Text strong>Phone:</Text> {record.telephone || "N/A"}
//             </li>
//             <li>
//               <Text strong>Email:</Text> {record.email || "N/A"}
//             </li>
//             <li>
//               <Text strong>Status:</Text> {record.status || "N/A"}
//             </li>
//             <li>
//               <Text strong>Role:</Text>{" "}
//               <Tag color="blue">{record.role || "N/A"}</Tag>
//             </li>
//           </ul>
//         </div>
//       ),
//     },

//     {
//       title: (
//         <span className="font-dm text-primary text-base font-bold">
//           Employee Image
//         </span>
//       ),
//       dataIndex: "image",
//       key: "image",
//       align: "center",
//       responsive: ["sm", "md", "lg"],
//       render: (_, record) => (
//         <img
//           className="block mx-auto my-3"
//           style={{
//             width: "120px",
//             height: "120px",
//             objectFit: "cover",
//             borderRadius: "8px",
//           }}
//           src={record.image} // ← Fix here
//           alt="Employee"
//         />
//       ),
//     },

//     {
//       title: "Employment History / Joining Date",
//       dataIndex: "employmentHistory",
//       key: "employmentHistory",
//       // render: (history = [], record) => (
//       //   <div style={{ paddingLeft: 20 }}>
//       //     <ul>
//       //       {history.map((item, idx) => (
//       //         <li key={idx} style={{ marginBottom: 0 }}>
//       //           <Text strong>Position:</Text> {item.position || "N/A"}
//       //           <br />
//       //           <Text strong>Joining Date:</Text>{" "}
//       //           {item.startDate
//       //             ? moment(item.startDate).format("YYYY-MM-DD")
//       //             : "N/A"}
//       //           <br />
//       //           <Text strong>Job End:</Text>{" "}
//       //           {item.endDate
//       //             ? moment(item.endDate).format("YYYY-MM-DD")
//       //             : "N/A"}
//       //         </li>
//       //       ))}
//       //     </ul>
//       //     <Text strong>ERP Number:</Text> {record.erpNumber || "N/A"} <br />
//       //     <Text strong>Job ID Card No:</Text> {record.jobIdCardNumber || "N/A"}{" "}
//       //     <br />
//       //     <Text strong>Qualification:</Text>{" "}
//       //     {record.educationalQualification || "N/A"}
//       //   </div>
//       // ),
//       render: (_, record) => (
//     record.employmentHistory?.map((item, idx) => (
//       <div key={idx}>
//         <Text strong>Position:</Text> {item.position}<br />
//         <Text strong>Start:</Text> {item.startDate ? moment(item.startDate).format('YYYY-MM-DD') : 'N/A'}<br />
//         <Text strong>End:</Text> {item.endDate ? moment(item.endDate).format('YYYY-MM-DD') : 'Present'}
//       </div>
//     ))
//   )

//     },

//     {
//       title: "Store",
//       dataIndex: "store",
//       key: "store",
//       render: (store) => store?.batch || "N/A",
//     },

//     {
//       title: "Actions",
//       key: "actions",
//       align: "center",
//       render: (_, record) => (
//         <Space>
//           <Button
//             type="primary"
//             icon={<EditOutlined />}
//             onClick={() => showEditModal(record)}
//           >
//             Edit {editingEmployee?._id === record._id ? " (Editing)" : ""}
//           </Button>
//           <Button
//             danger
//             icon={<DeleteOutlined />}
//             onClick={() => handleDelete(record._id)}
//           >
//             Delete
//           </Button>
//         </Space>
//       ),
//     },
//   ];

//   return (
//     <div className="container mx-auto p-4">
//       <Card className="shadow-md">
//         <Title level={3} className="text-center mb-4">
//           All Employees
//         </Title>

//         {loading ? (
//           <div
//             className="flex justify-center items-center"
//             style={{ minHeight: 200 }}
//           >
//             <Spin size="large" />
//           </div>
//         ) : (
//           <Table
//             columns={columns}
//             dataSource={employeeData}
//             //dataSource={employees }
//             rowKey={(record) => record._id}
//             pagination={{ pageSize: 8 }}
//             scroll={{ x: "max-content" }}
//             bordered
//           />
//         )}

//         <Modal
//           title="Edit Employee"
//           open={isModalOpen}
//           onCancel={() => {
//             setIsModalOpen(false);
//             setEditingEmployee(null);
//             form.resetFields();
//           }}
//           footer={null}
//         >
//           <Form
//             form={form}
//             layout="vertical"
//             onFinish={handleEditSubmit}
//             //initialValues={editingEmployee}
//           >
//             <Form.Item name="firstName" label="Name">
//               <Input placeholder="Enter name" />
//             </Form.Item>
//             <Form.Item name="email" label="Email">
//               <Input placeholder="Enter email" />
//             </Form.Item>
//             <Form.Item name="address" label="Address">
//               <Input placeholder="Enter address" />
//             </Form.Item>
//             <Form.Item name="telephone" label="Telephone">
//               <Input placeholder="Enter telephone" />
//             </Form.Item>
//             <Form.Item name="fatherName" label="Father Name">
//               <Input placeholder="Enter father name" />
//             </Form.Item>
//             <Form.Item name="birthplace" label="Birthplace">
//               <Input placeholder="Enter birthplace" />
//             </Form.Item>
//             <Form.Item name="dob" label="Date of Birth">
//               <Input placeholder="Enter date of birth" />
//             </Form.Item>
//             <Form.Item name="erpNumber" label="ERP Number">
//               <Input placeholder="Enter ERP number" />
//             </Form.Item>
//             <Form.Item name="email" label="Email">
//               <Input placeholder="Enter email" />
//             </Form.Item>
//             <Form.Item name="jobIdCardNumber" label="Job ID Card Number">
//               <Input placeholder="Enter job ID card number" />
//             </Form.Item>
//             <Form.Item name="educationalQualification" label="Educational Qualification">
//               <Input placeholder="Enter educational qualification" />
//             </Form.Item>

//             <Form.Item name="employmentHistory" label="Employment History">
//               <Input placeholder="Enter employment history" />
//             </Form.Item>
//             <Form.Item name="store" label="Store">
//               <Input placeholder="Enter store" />
//             </Form.Item>
//             <Form.Item name="image" label="Photo URL">
//               <Input placeholder="Enter image URL" />
//             </Form.Item>
//             <Form.Item>
//               <Button htmlType="submit" type="primary" block>
//                 Save Changes
//               </Button>
//             </Form.Item>
//           </Form>
//         </Modal>
//       </Card>
//     </div>
//   );
// };

// export default AllEmployee;

//////////Final Version///////////////////

// import { useDispatch, useSelector } from "react-redux";
// import { useEffect, useRef, useState } from "react";
// import { setEmployees } from "./slices/employeeSlice";
// import axios from "axios";
// import { MdArrowOutward } from "react-icons/md";
// import {Button,Space,Table,message,Typography,Spin,Card,Modal,Form,Input,Tag,DatePicker,Select,Upload,Row,Col,} from "antd";
// import {EditOutlined,DeleteOutlined,UploadOutlined,TeamOutlined,} from "@ant-design/icons";
// import moment from "moment";

// const { Title, Text } = Typography;
// const { Option } = Select;

// const AllEmployee = () => {
//   const dispatch = useDispatch();
//   const isMountedRef = useRef(true);
//   const [form] = Form.useForm();
//   const [loading, setLoading] = useState(false);
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [editingEmployee, setEditingEmployee] = useState(null);
//   const [storeOptions, setStoreOptions] = useState([]);
//   const [imageFile, setImageFile] = useState(null);
//   const [employeeStats, setEmployeeStats] = useState({
//     total: 0,
//     inactive: 0,
//     newlyJoined: 0,
//   });

//   const employeeData = useSelector((state) => state.employee.value) || [];

//   useEffect(() => {
//     isMountedRef.current = true;
//     fetchAllEmployees();
//     fetchStores();
//     return () => {
//       isMountedRef.current = false;
//     };
//   }, []);

//   const fetchStores = async () => {
//     try {
//       const token = localStorage.getItem("token");
//       const { data } = await axios.get(
//         "http://localhost:3000/api/v1/hr/allhr",
//         {
//           headers: { Authorization: `Bearer ${token}` },
//         }
//       );
//       const options = data.map((store) => ({
//         label: store.batch,
//         value: store._id,
//       }));
//       setStoreOptions(options);
//     } catch (err) {
//       console.error("Failed to fetch stores:", err);
//     }
//   };

//   // const fetchAllEmployees = async () => {
//   //   setLoading(true);
//   //   const token = localStorage.getItem("token");
//   //   try {
//   //     const { data } = await axios.get(
//   //       "http://localhost:3000/api/v1/employee/allemployee",
//   //       { headers: { Authorization: `Bearer ${token}` } }
//   //     );

//   //     const employees = Array.isArray(data) ? data : data.employees || [];
//   //     dispatch(setEmployees(employees));
//   //   } catch (error) {
//   //     console.error("Error fetching employees:", error);
//   //     message.error("Failed to load employees");
//   //   } finally {
//   //     setLoading(false);
//   //   }
//   // };

//   const fetchAllEmployees = async () => {
//     setLoading(true);
//     const token = localStorage.getItem("token");
//     try {
//       const { data } = await axios.get(
//         "http://localhost:3000/api/v1/employee/allemployee",
//         { headers: { Authorization: `Bearer ${token}` } }
//       );

//       const employees = Array.isArray(data.employees) ? data.employees : data;

//       // Extract and set summary stats
//       setEmployeeStats({
//         total: data.summary?.total || employees.length,
//         inactive:
//           data.summary?.inactive ||
//           employees.filter((e) => e.status === "inactive").length,
//         newlyJoined:
//           data.summary?.newlyJoined ||
//           employees.filter(
//             (e) =>
//               moment().diff(moment(e.createdAt || e.joinedDate), "days") <= 30
//           ).length,
//       });

//       dispatch(setEmployees(employees));
//     } catch (error) {
//       console.error("Error fetching employees:", error);
//       message.error("Failed to load employees");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleDelete = async (id) => {
//     try {
//       const token = localStorage.getItem("token");
//       await axios.delete(`http://localhost:3000/api/v1/employee/delete/${id}`, {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       message.success("Employee deleted successfully");
//       fetchAllEmployees();
//     } catch (error) {
//       message.error("Failed to delete employee");
//     }
//   };

//   const showEditModal = (employee) => {
//     setEditingEmployee(employee);

//     // Format dates for form
//     const formattedEmployee = {
//       ...employee,
//       dob: employee.dob ? moment(employee.dob) : null,
//       employmentHistory:
//         employee.employmentHistory?.map((item) => ({
//           ...item,
//           startDate: item.startDate ? moment(item.startDate) : null,
//           endDate: item.endDate ? moment(item.endDate) : null,
//         })) || [],
//     };

//     form.setFieldsValue(formattedEmployee);
//     setIsModalOpen(true);
//   };

//   const handleEditSubmit = async (values) => {
//     console.log("Submitting updated values:", values);
//     try {
//       const token = localStorage.getItem("token");
//       const formData = new FormData();

//       // Convert moment objects to strings
//       const processedValues = {
//         ...values,
//         dob: values.dob?.format("YYYY-MM-DD"),
//         employmentHistory: values.employmentHistory?.map((item) => ({
//           ...item,
//           startDate: item.startDate?.format("YYYY-MM-DD"),
//           endDate: item.endDate?.format("YYYY-MM-DD"),
//         })),
//       };

//       // Append all values to formData
//       Object.entries(processedValues).forEach(([key, value]) => {
//         if (key === "employmentHistory") {
//           formData.append(key, JSON.stringify(value));
//         } else {
//           formData.append(key, value);
//         }
//       });

//       if (imageFile) {
//         formData.append("image", imageFile);
//       }

//       // Use correct endpoint with employee ID
//       console.log("Updating employee with ID:", editingEmployee?._id),
//       await axios.put(
//         `http://localhost:3000/api/v1/employee/update/${editingEmployee._id}`,
//         formData,
//         {
//           headers: {
//             "Content-Type": "multipart/form-data",
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );

//       message.success("Employee updated successfully");
//       form.resetFields();
//       setIsModalOpen(false);
//       setEditingEmployee(null);
//       setImageFile(null);
//       fetchAllEmployees();
//     } catch (error) {
//       console.error("Failed to update employee:", error);
//       message.error("Failed to update employee");
//     }
//   };

//   const handleImageChange = ({ file }) => {
//     setImageFile(file);
//   };

//   const columns = [
//     {
//       title: "#",
//       dataIndex: "index",
//       key: "index",
//       align: "center",
//       render: (_, __, index) => <Text strong>{index + 1}</Text>,
//     },
//     {
//       title: "Employee Info",
//       key: "employeeInfo",
//       render: (_, record) => (
//         <div
//           style={{
//             paddingLeft: 0,
//             fontFamily: "Railway",
//             fontSize: "15px",
//             lineHeight: "25px",
//             textTransform: "capitalize",
//           }}
//         >
//           <ul style={{ paddingLeft: 0, listStyle: "none" }}>
//             <li>
//               <Text strong>Name:</Text> {record.firstName} {record.lastName}
//             </li>
//             <li>
//               <Text strong>S/O:</Text> {record.fatherName || "N/A"}
//             </li>
//             <li>
//               <Text strong>Dob:</Text> {record.dob ? moment(record.dob).format("YYYY-MM-DD") : "N/A"}
//                {/* {record.dob || "N/A"} */}
//             </li>
//             <li>
//               <Text strong>Born in:</Text> {record.birthplace || "N/A"}
//             </li>
//             <li>
//               <Text strong>Address:</Text> {record.address || "N/A"}
//             </li>
//             <li>
//               <Text strong>Phone:</Text> {record.telephone || "N/A"}
//             </li>
//             <li style={{ textTransform: "none" }}>
//               <Text strong>Email:</Text> {record.email || "N/A"}
//             </li>
//             <li>
//               <Text strong>Status:</Text> {record.status || "N/A"}
//             </li>
//             <li>
//               <Text strong>ID:</Text> {record._id || "N/A"}
//             </li>
//           </ul>
//         </div>
//       ),
//     },
//     {
//       title: "Employee Image",
//       dataIndex: "image",
//       key: "image",
//       //align: "center",
//       render: (_, record) => (
//         <img
//           className="block mx-auto my-3"
//           style={{
//             width: "150px",
//             height: "180px",
//             objectFit: "cover",
//             borderRadius: "8px",
//             backdropFilter: "blur(5px)",
//             boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
//           }}
//           src={record.image}
//           alt="Employee"
//         />
//       ),
//     },
//     {
//       title: "Employment History",
//       key: "employmentHistory",
//       render: (_, record) => (
//         <div
//           style={{
//             paddingLeft: 0,
//             fontFamily: "Railway",
//             fontSize: "15px",
//             lineHeight: "25px",
//             textTransform: "capitalize",
//           }}
//         >
//           {record.employmentHistory?.map((item, idx) => (
//             <div key={idx}>
//               <Text strong>Position:</Text> {item.position || "N/A"}
//               <br />
//               <Text strong>Joining Date:</Text>{" "}
//               {item.startDate
//                 ? moment(item.startDate).format("YYYY-MM-DD")
//                 : "N/A"}
//               <br />
//               <Text strong>Job End:</Text>{" "}
//               {item.endDate
//                 ? moment(item.endDate).format("YYYY-MM-DD")
//                 : "Present"}
//               {/* <br /><br /> */}
//             </div>
//           ))}
//           <Text strong>ERP Number:</Text> {record.erpNumber || "N/A"} <br />
//           <Text strong>Job ID Card No:</Text> {record.jobIdCardNumber || "N/A"}{" "}
//           <br />
//           <Text strong>Qualification:</Text>{" "}
//           {record.educationalQualification || "N/A"}
//         </div>
//       ),
//     },
//     {
//       title: "Store",
//       dataIndex: "store",
//       key: "store",
//       // render: (store) => store?.batch || "N/A",
//       render: (_, record) => (
//         <div
//           style={{
//             paddingLeft: 0,
//             fontFamily: "Railway",
//             fontSize: "15px",
//             lineHeight: "27px",
//           }}
//         >
//           <li>
//             <Text strong>Batch :</Text> {record.store?.batch || "N/A"}
//             <br />
//             <Text strong>Role :</Text>{" "}
//             <Tag
//               color="blue"
//               style={{
//                 fontFamily: "Railway",
//                 borderRadius: "3px",
//                 fontSize: "14px",
//                 textTransform: "capitalize",
//               }}
//             >
//               {record.role || "N/A"}
//             </Tag>
//           </li>
//         </div>
//       ),
//     },
//     {
//       title: "Actions",
//       key: "actions",
//       align: "center",
//       render: (_, record) => (
//         <Space>
//           <Button
//             type="primary"
//             icon={<EditOutlined />}
//             onClick={() => showEditModal(record)}
//             className="font-railway"
//           >
//             Edit
//           </Button>
//           <Button
//             danger
//             icon={<DeleteOutlined />}
//             onClick={() => handleDelete(record._id)}
//             className="font-railway "
//           >
//             Delete
//           </Button>
//         </Space>
//       ),
//     },
//   ];

//   return (
//     <div className="container mx-auto p-4 ">
//       <Card className="shadow-md font-railway">
//         <Row gutter={[16, 16]}>
//           <Col xs={24} sm={12} md={18}>
//             <Title level={3} className="text-center mb-4 font-railway">
//               All Employees
//             </Title>
//             <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
//               {[
//                 {
//                   title: "Employees",
//                   label: "Total number of all employees",
//                   value: employeeStats.total,
//                   icon: <MdArrowOutward className="text-lg text-gray-400" />,
//                 },
//                 {
//                   title: "Inactive",
//                   label: "Currently not active",
//                   value: employeeStats.inactive,
//                   icon: <MdArrowOutward className="text-lg text-gray-400" />,
//                 },
//                 {
//                   title: "Newly Joined",
//                   label: "Recently added employees",
//                   value: employeeStats.newlyJoined,
//                   icon: <MdArrowOutward className="text-lg text-gray-400" />,
//                 },
//               ].map((stat, index) => (
//                 <Card
//                   key={index}
//                   className="bg-[#1f1f1f] text-white p-4 relative"
//                 >
//                   <div className="flex items-center justify-between mb-2">
//                     <div className="text-sm text-gray-500 uppercase">
//                       {stat.title}
//                     </div>
//                     {stat.icon}
//                   </div>
//                   <div className="text-xl font-semibold">{stat.value}</div>
//                   <div className="text-gray-400">{stat.label}</div>
//                 </Card>
//               ))}
//             </div>

//             {loading ? (
//               <div className="flex justify-center items-center min-h-[200px]">
//                 <Spin size="large" />
//               </div>
//             ) : (
//               <Table
//                 columns={columns}
//                 dataSource={employeeData}
//                 rowKey={(record) => record._id}
//                 pagination={{ pageSize: 8 }}
//                 scroll={{ x: "max-content" }}
//                 bordered
//                 className="font-railway"
//               />
//             )}

//             <Modal
//               title="Edit Employee"
//               open={isModalOpen}
//               onCancel={() => {
//                 setIsModalOpen(false);
//                 setEditingEmployee(null);
//                 form.resetFields();
//                 setImageFile(null);
//               }}
//               footer={null}
//               width={800}
//             >
//               <Form
//                 form={form}
//                 layout="vertical"
//                 onFinish={handleEditSubmit}
//                 className="font-railway"
//               >
//                 <Row gutter={[16, 16]}>
//                   <Col xs={24} sm={12} md={8}>
//                     <Form.Item name="firstName" label="Name">
//                       <Input placeholder="Enter name" />
//                     </Form.Item>
//                   </Col>
//                   <Col xs={24} sm={12} md={8}>
//                     <Form.Item name="email" label="Email">
//                       <Input placeholder="Enter email" />
//                     </Form.Item>
//                   </Col>

//                   <Col xs={24} sm={12} md={8}>
//                     <Form.Item name="address" label="Address">
//                       <Input placeholder="Enter address" />
//                     </Form.Item>
//                   </Col>
//                   <Col xs={24} sm={12} md={8}>
//                     <Form.Item name="telephone" label="Telephone">
//                       <Input placeholder="Enter telephone" />
//                     </Form.Item>
//                   </Col>

//                   <Col xs={24} sm={12} md={8}>
//                     <Form.Item name="fatherName" label="Father Name">
//                       <Input placeholder="Enter father name" />
//                     </Form.Item>
//                   </Col>
//                   <Col xs={24} sm={12} md={8}>
//                     <Form.Item name="birthplace" label="Birthplace">
//                       <Input placeholder="Enter birthplace" />
//                     </Form.Item>
//                   </Col>

//                   <Col xs={24} sm={12} md={8}>
//                     <Form.Item name="dob" label="Date of Birth">
//                       <DatePicker
//                         format="YYYY-MM-DD"
//                         style={{ width: "100%" }}
//                       />
//                     </Form.Item>
//                   </Col>
//                   <Col xs={24} sm={12} md={8}>
//                     <Form.Item name="erpNumber" label="ERP Number">
//                       <Input placeholder="Enter ERP number" />
//                     </Form.Item>
//                   </Col>

//                   <Col xs={24} sm={12} md={8}>
//                     <Form.Item
//                       name="jobIdCardNumber"
//                       label="Job ID Card Number"
//                     >
//                       <Input placeholder="Enter job ID card number" />
//                     </Form.Item>
//                   </Col>
//                   <Col xs={24} sm={12} md={8}>
//                     <Form.Item
//                       name="educationalQualification"
//                       label="Educational Qualification"
//                     >
//                       <Input placeholder="Enter educational qualification" />
//                     </Form.Item>
//                   </Col>

//                   <Col xs={24} sm={12} md={8}>
//                     <Form.Item name="store" label="Store">
//                       <Select
//                         placeholder="Select store"
//                         options={storeOptions}
//                       />
//                     </Form.Item>
//                   </Col>
//                   <Col xs={24} sm={12} md={8}>
//                     <Form.Item label="Upload New Image">
//                       <Upload
//                         beforeUpload={() => false}
//                         onChange={handleImageChange}
//                         showUploadList={false}
//                       >
//                         <Button icon={<UploadOutlined />}>Select Image</Button>
//                       </Upload>
//                     </Form.Item>
//                   </Col>
//                 </Row>

//                 <Form.List name="employmentHistory">
//                   {(fields, { add, remove }) => (
//                     <>
//                       {fields.map(({ key, name, ...restField }) => (
//                         <div key={key} className="mb-4 p-3 border rounded">
//                           <Row gutter={[16, 16]}>
//                             <Col xs={24} sm={12} md={8}>
//                               <Form.Item
//                                 {...restField}
//                                 name={[name, "position"]}
//                                 label="Position"
//                                 rules={[{ required: true }]}
//                               >
//                                 <Input placeholder="Position" />
//                               </Form.Item>
//                             </Col>
//                           </Row>

//                           <Row gutter={[16, 16]}>
//                             <Col xs={24} sm={12} md={8}>
//                               <Form.Item
//                                 {...restField}
//                                 name={[name, "startDate"]}
//                                 label="Start Date"
//                                 rules={[{ required: true }]}
//                               >
//                                 <DatePicker
//                                   format="YYYY-MM-DD"
//                                   style={{ width: "100%" }}
//                                 />
//                               </Form.Item>
//                             </Col>
//                             <Col xs={24} sm={12} md={8}>
//                               <Form.Item
//                                 {...restField}
//                                 name={[name, "endDate"]}
//                                 label="End Date"
//                               >
//                                 <DatePicker
//                                   format="YYYY-MM-DD"
//                                   style={{ width: "100%" }}
//                                 />
//                               </Form.Item>
//                             </Col>
//                           </Row>

//                           <Button
//                             danger
//                             onClick={() => remove(name)}
//                             className="mt-2"
//                           >
//                             Remove
//                           </Button>
//                         </div>
//                       ))}

//                       <Button
//                         type="dashed"
//                         onClick={() => add()}
//                         block
//                         className="mt-2"
//                       >
//                         + Add Employment Entry
//                       </Button>
//                     </>
//                   )}
//                 </Form.List>

//                 <Form.Item className="mt-6">
//                   <Button htmlType="submit" type="primary" block>
//                     Save Changes
//                   </Button>
//                 </Form.Item>
//               </Form>
//             </Modal>
//           </Col>
//           <Col xs={24} sm={8} md={6}>
//             profile
//           </Col>
//         </Row>
//       </Card>
//     </div>
//   );
// };

// export default AllEmployee;

////////Final Version2///////////////////

// import { useDispatch, useSelector } from "react-redux";
// import { useEffect, useRef, useState } from "react";
// import { setEmployees } from "./slices/employeeSlice";
// import axios from "axios";
// import { MdArrowOutward } from "react-icons/md";
// import {
//   Button,
//   Space,
//   Table,
//   message,
//   Typography,
//   Spin,
//   Card,
//   Modal,
//   Form,
//   Input,
//   Tag,
//   DatePicker,
//   Select,
//   Upload,
//   Row,
//   Col,
//   Avatar, // Import Avatar for profile image
// } from "antd";
// import {EditOutlined,DeleteOutlined,UploadOutlined,MailOutlined,PhoneOutlined,LinkedinOutlined,FacebookOutlined,TwitterOutlined,InstagramOutlined,GlobalOutlined,TeamOutlined} from "@ant-design/icons";
// import moment from "moment";

// const { Title, Text } = Typography;
// const { Option } = Select;

// const AllEmployee = () => {
//   const dispatch = useDispatch();
//   const isMountedRef = useRef(true);
//   const [form] = Form.useForm();
//   const [loading, setLoading] = useState(false);
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [editingEmployee, setEditingEmployee] = useState(null);
//   const [selectedEmployeeProfile, setSelectedEmployeeProfile] = useState(null); // New state for selected profile
//   const [storeOptions, setStoreOptions] = useState([]);
//   const [imageFile, setImageFile] = useState(null);
//   const [employeeStats, setEmployeeStats] = useState({
//     total: 0,
//     inactive: 0,
//     newlyJoined: 0,
//   });

//   const employeeData = useSelector((state) => state.employee.value) || [];

//   useEffect(() => {
//     isMountedRef.current = true;
//     fetchAllEmployees();
//     fetchStores();
//     return () => {
//       isMountedRef.current = false;
//     };
//   }, []);

//   const fetchStores = async () => {
//     try {
//       const token = localStorage.getItem("token");
//       const { data } = await axios.get(
//         "http://localhost:3000/api/v1/hr/allhr",
//         {
//           headers: { Authorization: `Bearer ${token}` },
//         }
//       );
//       const options = data.map((store) => ({
//         label: store.batch,
//         value: store._id,
//       }));
//       setStoreOptions(options);
//     } catch (err) {
//       console.error("Failed to fetch stores:", err);
//     }
//   };

//   const fetchAllEmployees = async () => {
//     setLoading(true);
//     const token = localStorage.getItem("token");
//     try {
//       const { data } = await axios.get(
//         "http://localhost:3000/api/v1/employee/allemployee",
//         { headers: { Authorization: `Bearer ${token}` } }
//       );

//       const employees = Array.isArray(data.employees) ? data.employees : data;

//       // Set initial selected employee to the first one if available
//       if (employees.length > 0 && !selectedEmployeeProfile) {
//         setSelectedEmployeeProfile(employees[0]);
//       }

//       // Extract and set summary stats
//       setEmployeeStats({
//         total: data.summary?.total || employees.length,
//         inactive:
//           data.summary?.inactive ||
//           employees.filter((e) => e.status === "inactive").length,
//         newlyJoined:
//           data.summary?.newlyJoined ||
//           employees.filter(
//             (e) =>
//               moment().diff(moment(e.createdAt || e.joinedDate), "days") <= 30
//           ).length,
//       });

//       dispatch(setEmployees(employees));
//     } catch (error) {
//       console.error("Error fetching employees:", error);
//       message.error("Failed to load employees");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleDelete = async (id) => {
//     try {
//       const token = localStorage.getItem("token");
//       await axios.delete(`http://localhost:3000/api/v1/employee/delete/${id}`, {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       message.success("Employee deleted successfully");
//       fetchAllEmployees();
//     } catch (error) {
//       message.error("Failed to delete employee");
//     }
//   };

//   const showEditModal = (employee) => {
//     setEditingEmployee(employee);

//     // Format dates for form
//     const formattedEmployee = {
//       ...employee,
//       dob: employee.dob ? moment(employee.dob) : null,
//       employmentHistory:
//         employee.employmentHistory?.map((item) => ({
//           ...item,
//           startDate: item.startDate ? moment(item.startDate) : null,
//           endDate: item.endDate ? moment(item.endDate) : null,
//         })) || [],
//     };

//     form.setFieldsValue(formattedEmployee);
//     setIsModalOpen(true);
//   };

//   const handleEditSubmit = async (values) => {
//     console.log("Submitting updated values:", values);
//     try {
//       const token = localStorage.getItem("token");
//       const formData = new FormData();

//       // Convert moment objects to strings
//       const processedValues = {
//         ...values,
//         dob: values.dob?.format("YYYY-MM-DD"),
//         employmentHistory: values.employmentHistory?.map((item) => ({
//           ...item,
//           startDate: item.startDate?.format("YYYY-MM-DD"),
//           endDate: item.endDate?.format("YYYY-MM-DD"),
//         })),
//       };

//       // Append all values to formData
//       Object.entries(processedValues).forEach(([key, value]) => {
//         if (key === "employmentHistory") {
//           formData.append(key, JSON.stringify(value));
//         } else {
//           formData.append(key, value);
//         }
//       });

//       if (imageFile) {
//         formData.append("image", imageFile);
//       }

//       await axios.put(
//         `http://localhost:3000/api/v1/employee/update/${editingEmployee._id}`,
//         formData,
//         console.log("Updating employee with ID:", editingEmployee?._id),
//         {
//           headers: {
//             "Content-Type": "multipart/form-data",
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );

//       message.success("Employee updated successfully");
//       form.resetFields();
//       setIsModalOpen(false);
//       setEditingEmployee(null);
//       setImageFile(null);
//       fetchAllEmployees();
//     } catch (error) {
//       console.error("Failed to update employee:", error);
//       message.error("Failed to update employee");
//     }
//   };

//   const handleImageChange = ({ file }) => {
//     setImageFile(file);
//   };

//   const columns = [
//     {
//       title: "#",
//       dataIndex: "index",
//       key: "index",
//       align: "center",
//       render: (_, __, index) => <Text strong>{index + 1}</Text>,
//     },
//     {
//       title: "Employee Info",
//       key: "employeeInfo",
//       render: (_, record) => (
//         <div
//           style={{
//             paddingLeft: 0,
//             fontFamily: "Railway",
//             fontSize: "15px",
//             lineHeight: "25px",
//             textTransform: "capitalize",
//           }}
//         >
//           <ul style={{ paddingLeft: 0, listStyle: "none" }}>
//             <li>
//               <Text strong>Name:</Text> {record.firstName} {record.lastName}
//             </li>
//             <li>
//               <Text strong>S/O:</Text> {record.fatherName || "N/A"}
//             </li>
//             <li>
//               <Text strong>Dob:</Text> {record.dob || "N/A"}
//             </li>
//             <li>
//               <Text strong>Born in:</Text> {record.birthplace || "N/A"}
//             </li>
//             <li>
//               <Text strong>Address:</Text> {record.address || "N/A"}
//             </li>
//             <li>
//               <Text strong>Phone:</Text> {record.telephone || "N/A"}
//             </li>
//             <li style={{ textTransform: "none" }}>
//               <Text strong>Email:</Text> {record.email || "N/A"}
//             </li>
//             <li>
//               <Text strong>Status:</Text> {record.status || "N/A"}
//             </li>
//             <li>
//               <Text strong>ID:</Text> {record._id || "N/A"}
//             </li>
//           </ul>
//         </div>
//       ),
//     },
//     {
//       title: "Employee Image",
//       dataIndex: "image",
//       key: "image",
//       render: (_, record) => (
//         <img
//           className="block mx-auto my-3"
//           style={{
//             width: "150px",
//             height: "180px",
//             objectFit: "cover",
//             borderRadius: "8px",
//             backdropFilter: "blur(5px)",
//             boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
//           }}
//           src={record.image}
//           alt="Employee"
//         />
//       ),
//     },
//     {
//       title: "Employment History",
//       key: "employmentHistory",
//       render: (_, record) => (
//         <div
//           style={{
//             paddingLeft: 0,
//             fontFamily: "Railway",
//             fontSize: "15px",
//             lineHeight: "25px",
//             textTransform: "capitalize",
//           }}
//         >
//           {record.employmentHistory?.map((item, idx) => (
//             <div key={idx}>
//               <Text strong>Position:</Text> {item.position || "N/A"}
//               <br />
//               <Text strong>Joining Date:</Text>{" "}
//               {item.startDate
//                 ? moment(item.startDate).format("YYYY-MM-DD")
//                 : "N/A"}
//               <br />
//               <Text strong>Job End:</Text>{" "}
//               {item.endDate
//                 ? moment(item.endDate).format("YYYY-MM-DD")
//                 : "Present"}
//             </div>
//           ))}
//           <Text strong>ERP Number:</Text> {record.erpNumber || "N/A"} <br />
//           <Text strong>Job ID Card No:</Text> {record.jobIdCardNumber || "N/A"}{" "}
//           <br />
//           <Text strong>Qualification:</Text>{" "}
//           {record.educationalQualification || "N/A"}
//         </div>
//       ),
//     },
//     {
//       title: "Store",
//       dataIndex: "store",
//       key: "store",
//       render: (_, record) => (
//         <div
//           style={{
//             paddingLeft: 0,
//             fontFamily: "Railway",
//             fontSize: "15px",
//             lineHeight: "27px",
//           }}
//         >
//           <li>
//             <Text strong>Batch :</Text> {record.store?.batch || "N/A"}
//             <br />
//             <Text strong>Role :</Text>{" "}
//             <Tag
//               color="blue"
//               style={{
//                 fontFamily: "Railway",
//                 borderRadius: "3px",
//                 fontSize: "14px",
//                 textTransform: "capitalize",
//               }}
//             >
//               {record.role || "N/A"}
//             </Tag>
//           </li>
//         </div>
//       ),
//     },
//     {
//       title: "Actions",
//       key: "actions",
//       align: "center",
//       render: (_, record) => (
//         <Space>
//           <Button
//             type="primary"
//             icon={<EditOutlined />}
//             onClick={() => showEditModal(record)}
//             className="font-railway"
//           >
//             Edit
//           </Button>
//           <Button
//             danger
//             icon={<DeleteOutlined />}
//             onClick={() => handleDelete(record._id)}
//             className="font-railway "
//           >
//             Delete
//           </Button>
//         </Space>
//       ),
//     },
//   ];

//   return (
//     <div className="container mx-auto p-4 ">
//       <Card className="shadow-md font-railway">
//         <Row gutter={[16, 16]}>
//           <Col xs={24} sm={12} md={18}>
//             <Title level={3} className="text-center mb-4 font-railway">
//               All Employees
//             </Title>
//             <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
//               {[
//                 {
//                   title: "Employees",
//                   label: "Total number of all employees",
//                   value: employeeStats.total,
//                   icon: <MdArrowOutward className="text-lg text-gray-400" />,
//                 },
//                 {
//                   title: "Inactive",
//                   label: "Currently not active",
//                   value: employeeStats.inactive,
//                   icon: <MdArrowOutward className="text-lg text-gray-400" />,
//                 },
//                 {
//                   title: "Newly Joined",
//                   label: "Recently added employees",
//                   value: employeeStats.newlyJoined,
//                   icon: <MdArrowOutward className="text-lg text-gray-400" />,
//                 },
//               ].map((stat, index) => (
//                 <Card
//                   key={index}
//                   className="bg-[#1f1f1f] text-white p-4 relative"
//                 >
//                   <div className="flex items-center justify-between mb-2">
//                     <div className="text-sm text-gray-500 uppercase">
//                       {stat.title}
//                     </div>
//                     {stat.icon}
//                   </div>
//                   <div className="text-xl font-semibold">{stat.value}</div>
//                   <div className="text-gray-400">{stat.label}</div>
//                 </Card>
//               ))}
//             </div>

//             {loading ? (
//               <div className="flex justify-center items-center min-h-[200px]">
//                 <Spin size="large" />
//               </div>
//             ) : (
//               <Table
//                 columns={columns}
//                 dataSource={employeeData}
//                 rowKey={(record) => record._id}
//                 pagination={{ pageSize: 8 }}
//                 scroll={{ x: "max-content" }}
//                 bordered
//                 className="font-railway"
//                 onRow={(record, rowIndex) => {
//                   return {
//                     onClick: (event) => {
//                       setSelectedEmployeeProfile(record); // Set selected employee on row click
//                     },
//                   };
//                 }}
//               />
//             )}

//             <Modal
//               title="Edit Employee"
//               open={isModalOpen}
//               onCancel={() => {
//                 setIsModalOpen(false);
//                 setEditingEmployee(null);
//                 form.resetFields();
//                 setImageFile(null);
//               }}
//               footer={null}
//               width={800}
//             >
//               <Form
//                 form={form}
//                 layout="vertical"
//                 onFinish={handleEditSubmit}
//                 className="font-railway"
//               >
//                 <Row gutter={[16, 16]}>
//                   <Col xs={24} sm={12} md={8}>
//                     <Form.Item name="firstName" label="Name">
//                       <Input placeholder="Enter name" />
//                     </Form.Item>
//                   </Col>
//                   <Col xs={24} sm={12} md={8}>
//                     <Form.Item name="email" label="Email">
//                       <Input placeholder="Enter email" />
//                     </Form.Item>
//                   </Col>

//                   <Col xs={24} sm={12} md={8}>
//                     <Form.Item name="address" label="Address">
//                       <Input placeholder="Enter address" />
//                     </Form.Item>
//                   </Col>
//                   <Col xs={24} sm={12} md={8}>
//                     <Form.Item name="telephone" label="Telephone">
//                       <Input placeholder="Enter telephone" />
//                     </Form.Item>
//                   </Col>

//                   <Col xs={24} sm={12} md={8}>
//                     <Form.Item name="fatherName" label="Father Name">
//                       <Input placeholder="Enter father name" />
//                     </Form.Item>
//                   </Col>
//                   <Col xs={24} sm={12} md={8}>
//                     <Form.Item name="birthplace" label="Birthplace">
//                       <Input placeholder="Enter birthplace" />
//                     </Form.Item>
//                   </Col>

//                   <Col xs={24} sm={12} md={8}>
//                     <Form.Item name="dob" label="Date of Birth">
//                       <DatePicker
//                         format="YYYY-MM-DD"
//                         style={{ width: "100%" }}
//                       />
//                     </Form.Item>
//                   </Col>
//                   <Col xs={24} sm={12} md={8}>
//                     <Form.Item name="erpNumber" label="ERP Number">
//                       <Input placeholder="Enter ERP number" />
//                     </Form.Item>
//                   </Col>

//                   <Col xs={24} sm={12} md={8}>
//                     <Form.Item
//                       name="jobIdCardNumber"
//                       label="Job ID Card Number"
//                     >
//                       <Input placeholder="Enter job ID card number" />
//                     </Form.Item>
//                   </Col>
//                   <Col xs={24} sm={12} md={8}>
//                     <Form.Item
//                       name="educationalQualification"
//                       label="Educational Qualification"
//                     >
//                       <Input placeholder="Enter educational qualification" />
//                     </Form.Item>
//                   </Col>

//                   <Col xs={24} sm={12} md={8}>
//                     <Form.Item name="store" label="Store">
//                       <Select
//                         placeholder="Select store"
//                         options={storeOptions}
//                       />
//                     </Form.Item>
//                   </Col>
//                   <Col xs={24} sm={12} md={8}>
//                     <Form.Item label="Upload New Image">
//                       <Upload
//                         beforeUpload={() => false}
//                         onChange={handleImageChange}
//                         showUploadList={false}
//                       >
//                         <Button icon={<UploadOutlined />}>Select Image</Button>
//                       </Upload>
//                     </Form.Item>
//                   </Col>
//                 </Row>

//                 <Form.List name="employmentHistory">
//                   {(fields, { add, remove }) => (
//                     <>
//                       {fields.map(({ key, name, ...restField }) => (
//                         <div key={key} className="mb-4 p-3 border rounded">
//                           <Row gutter={[16, 16]}>
//                             <Col xs={24} sm={12} md={8}>
//                               <Form.Item
//                                 {...restField}
//                                 name={[name, "position"]}
//                                 label="Position"
//                                 rules={[{ required: true }]}
//                               >
//                                 <Input placeholder="Position" />
//                               </Form.Item>
//                             </Col>
//                           </Row>

//                           <Row gutter={[16, 16]}>
//                             <Col xs={24} sm={12} md={8}>
//                               <Form.Item
//                                 {...restField}
//                                 name={[name, "startDate"]}
//                                 label="Start Date"
//                                 rules={[{ required: true }]}
//                               >
//                                 <DatePicker
//                                   format="YYYY-MM-DD"
//                                   style={{ width: "100%" }}
//                                 />
//                               </Form.Item>
//                             </Col>
//                             <Col xs={24} sm={12} md={8}>
//                               <Form.Item
//                                 {...restField}
//                                 name={[name, "endDate"]}
//                                 label="End Date"
//                               >
//                                 <DatePicker
//                                   format="YYYY-MM-DD"
//                                   style={{ width: "100%" }}
//                                 />
//                               </Form.Item>
//                             </Col>
//                           </Row>

//                           <Button
//                             danger
//                             onClick={() => remove(name)}
//                             className="mt-2"
//                           >
//                             Remove
//                           </Button>
//                         </div>
//                       ))}

//                       <Button
//                         type="dashed"
//                         onClick={() => add()}
//                         block
//                         className="mt-2"
//                       >
//                         + Add Employment Entry
//                       </Button>
//                     </>
//                   )}
//                 </Form.List>

//                 <Form.Item className="mt-6">
//                   <Button htmlType="submit" type="primary" block>
//                     Save Changes
//                   </Button>
//                 </Form.Item>
//               </Form>
//             </Modal>
//           </Col>

//           {/* Employee Profile Section */}
//           <Col xs={24} sm={12} md={6}>
//             <Card
//               className="shadow-md font-railway bg-[#1f1f1f] text-white"
//               style={{ minHeight: "100%" }}
//             >
//               {selectedEmployeeProfile ? (
//                 <div className="flex flex-col items-center p-4">
//                   <Avatar
//                     size={100}
//                     src={selectedEmployeeProfile.image}
//                     alt={`${selectedEmployeeProfile.firstName} ${selectedEmployeeProfile.lastName}`}
//                     className="mb-4"
//                   />
//                   <Title level={4} className="text-white text-center mb-1">
//                     {selectedEmployeeProfile.firstName}{" "}
//                     {selectedEmployeeProfile.lastName}
//                   </Title>
//                   <Text className="text-gray-400 text-sm mb-4">
//                     {selectedEmployeeProfile.employmentHistory?.[0]?.position ||
//                       "N/A"}
//                   </Text>
//                   <p className="text-sm text-gray-300 text-center mb-4">
//                     {selectedEmployeeProfile.bio ||
//                       "No biography available. This employee is a valuable member of our team."}
//                   </p>

//                   <div className="flex space-x-2 mb-4">
//                     <Button
//                       type="primary"
//                       icon={<MailOutlined />}
//                       className="font-railway"
//                       href={`mailto:${selectedEmployeeProfile.email}`}
//                     >
//                       Message
//                     </Button>
//                     {/* Add other buttons based on the image (e.g., calendar, phone, etc.) */}
//                     <Button
//                       type="default"
//                       icon={<PhoneOutlined />}
//                       className="font-railway"
//                       href={`tel:${selectedEmployeeProfile.telephone}`}
//                     >
//                       Call
//                     </Button>
//                     {/* Placeholder for other actions like "Calendar" or "Files" */}
//                     <Button type="default" icon={<GlobalOutlined />} className="font-railway">
//                       Website
//                     </Button>
//                   </div>

//                   <div className="w-full text-left mb-4">
//                     <Text strong className="block text-gray-300">
//                       Email:
//                     </Text>
//                     <Text className="text-gray-200">
//                       {selectedEmployeeProfile.email || "N/A"}
//                     </Text>
//                   </div>
//                   <div className="w-full text-left mb-4">
//                     <Text strong className="block text-gray-300">
//                       Phone:
//                     </Text>
//                     <Text className="text-gray-200">
//                       {selectedEmployeeProfile.telephone || "N/A"}
//                     </Text>
//                   </div>

//                   <div className="w-full text-left mb-4">
//                     <Title level={5} className="text-white mb-2">
//                       Project in Queue
//                     </Title>
//                     {/* This would ideally come from your backend, representing actual projects */}
//                     <div className="flex justify-between items-center text-sm mb-1">
//                       <Text className="text-gray-300">Concept Development</Text>
//                       <Tag color="green">New</Tag>
//                     </div>
//                     <div className="flex justify-between items-center text-sm mb-1">
//                       <Text className="text-gray-300">Scriptwriting</Text>
//                       <Tag color="green">New</Tag>
//                     </div>
//                     <div className="flex justify-between items-center text-sm mb-1">
//                       <Text className="text-gray-300">Story Boarding</Text>
//                       <Tag color="orange">Waiting</Tag>
//                     </div>
//                     <div className="flex justify-between items-center text-sm mb-1">
//                       <Text className="text-gray-300">
//                         Production Scheduling
//                       </Text>
//                       <Tag color="red">Paused</Tag>
//                     </div>
//                   </div>

//                   <div className="w-full text-left">
//                     <Title level={5} className="text-white mb-2">
//                       Social
//                     </Title>
//                     <Space size="middle">
//                       {/* You'd dynamically add these if the employee has them */}
//                       <Button
//                         type="text"
//                         icon={<FacebookOutlined />}
//                         className="text-gray-400 hover:text-blue-600"
//                         // Add href based on actual social media link from employee data
//                       />
//                       <Button
//                         type="text"
//                         icon={<TwitterOutlined />}
//                         className="text-gray-400 hover:text-blue-400"
//                       />
//                       <Button
//                         type="text"
//                         icon={<InstagramOutlined />}
//                         className="text-gray-400 hover:text-pink-500"
//                       />
//                       <Button
//                         type="text"
//                         icon={<LinkedinOutlined />}
//                         className="text-gray-400 hover:text-blue-700"
//                       />
//                       <Button
//                         type="text"
//                         icon={<GlobalOutlined />} // Example for a personal website/portfolio
//                         className="text-gray-400 hover:text-gray-200"
//                       />
//                     </Space>
//                   </div>
//                 </div>
//               ) : (
//                 <div className="flex flex-col items-center justify-center h-full text-gray-500">
//                   <TeamOutlined style={{ fontSize: "50px", marginBottom: "16px" }} />
//                   <Text>Select an employee to view their profile</Text>
//                 </div>
//               )}
//             </Card>
//           </Col>
//         </Row>
//       </Card>
//     </div>
//   );
// };

// export default AllEmployee;

//////////Final Version3///////////////////

// import { useDispatch, useSelector } from "react-redux";
// import { useEffect, useRef, useState } from "react";
// import { setEmployees } from "./slices/employeeSlice";
// import axios from "axios";
// import { MdArrowOutward } from "react-icons/md";
// import {Button,Space,Table,message, Typography,Spin,Card,Modal,Form,Input,Tag,DatePicker,Select,Upload,Row,Col, Avatar, Descriptions, } from "antd";
// import {EditOutlined, DeleteOutlined, UploadOutlined,TeamOutlined,UserOutlined, } from "@ant-design/icons";
// import moment from "moment";

// const { Title, Text } = Typography;
// const { Option } = Select;

// const AllEmployee = () => {
//   const dispatch = useDispatch();
//   const isMountedRef = useRef(true);
//   const [form] = Form.useForm();
//   const [loading, setLoading] = useState(false);
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [editingEmployee, setEditingEmployee] = useState(null);
//   const [storeOptions, setStoreOptions] = useState([]);
//   const [imageFile, setImageFile] = useState(null);
//   const [selectedEmployee, setSelectedEmployee] = useState(null); // New state for selected employee
//   const [employeeStats, setEmployeeStats] = useState({
//     total: 0,
//     inactive: 0,
//     newlyJoined: 0,
//   });

//   const employeeData = useSelector((state) => state.employee.value) || [];

//   useEffect(() => {
//     isMountedRef.current = true;
//     fetchAllEmployees();
//     fetchStores();
//     return () => {
//       isMountedRef.current = false;
//     };
//   }, []);

//   const fetchStores = async () => {
//     try {
//       const token = localStorage.getItem("token");
//       const { data } = await axios.get(
//         "http://localhost:3000/api/v1/hr/allhr",
//         {
//           headers: { Authorization: `Bearer ${token}` },
//         }
//       );
//       const options = data.map((store) => ({
//         label: store.batch,
//         value: store._id,
//       }));
//       setStoreOptions(options);
//     } catch (err) {
//       console.error("Failed to fetch stores:", err);
//     }
//   };

//   const fetchAllEmployees = async () => {
//     setLoading(true);
//     const token = localStorage.getItem("token");
//     try {
//       const { data } = await axios.get(
//         "http://localhost:3000/api/v1/employee/allemployee",
//         { headers: { Authorization: `Bearer ${token}` } }
//       );

//       const employees = Array.isArray(data.employees) ? data.employees : data;

//       // Extract and set summary stats
//       setEmployeeStats({
//         total: data.summary?.total || employees.length,
//         inactive:
//           data.summary?.inactive ||
//           employees.filter((e) => e.status === "inactive").length,
//         newlyJoined:
//           data.summary?.newlyJoined ||
//           employees.filter(
//             (e) =>
//               moment().diff(moment(e.createdAt || e.joinedDate), "days") <= 30
//           ).length,
//       });

//       dispatch(setEmployees(employees));
//     } catch (error) {
//       console.error("Error fetching employees:", error);
//       message.error("Failed to load employees");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleDelete = async (id) => {
//     try {
//       const token = localStorage.getItem("token");
//       await axios.delete(`http://localhost:3000/api/v1/employee/delete/${id}`, {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       message.success("Employee deleted successfully");
//       fetchAllEmployees();
//     } catch (error) {
//       message.error("Failed to delete employee");
//     }
//   };

//   const showEditModal = (employee) => {
//     setEditingEmployee(employee);

//     // Format dates for form
//     const formattedEmployee = {
//       ...employee,
//       dob: employee.dob ? moment(employee.dob) : null,
//       employmentHistory:
//         employee.employmentHistory?.map((item) => ({
//           ...item,
//           startDate: item.startDate ? moment(item.startDate) : null,
//           endDate: item.endDate ? moment(item.endDate) : null,
//         })) || [],
//     };

//     form.setFieldsValue(formattedEmployee);
//     setIsModalOpen(true);
//   };

//   const handleEditSubmit = async (values) => {
//     console.log("Submitting updated values:", values);
//     try {
//       const token = localStorage.getItem("token");
//       const formData = new FormData();

//       // Convert moment objects to strings
//       const processedValues = {
//         ...values,
//         dob: values.dob?.format("YYYY-MM-DD"),
//         employmentHistory: values.employmentHistory?.map((item) => ({
//           ...item,
//           startDate: item.startDate?.format("YYYY-MM-DD"),
//           endDate: item.endDate?.format("YYYY-MM-DD"),
//         })),
//       };

//       // Append all values to formData
//       Object.entries(processedValues).forEach(([key, value]) => {
//         if (key === "employmentHistory") {
//           formData.append(key, JSON.stringify(value));
//         } else {
//           formData.append(key, value);
//         }
//       });

//       if (imageFile) {
//         formData.append("image", imageFile);
//       }

//       // Use correct endpoint with employee ID
//       await axios.put(
//         `http://localhost:3000/api/v1/employee/update/${editingEmployee._id}`,
//         formData,
//         console.log("Updating employee with ID:", editingEmployee?._id),
//         {
//           headers: {
//             "Content-Type": "multipart/form-data",
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );

//       message.success("Employee updated successfully");
//       form.resetFields();
//       setIsModalOpen(false);
//       setEditingEmployee(null);
//       setImageFile(null);
//       fetchAllEmployees();
//     } catch (error) {
//       console.error("Failed to update employee:", error);
//       message.error("Failed to update employee");
//     }
//   };

//   const handleImageChange = ({ file }) => {
//     setImageFile(file);
//   };

//   // Function to handle row click and set selected employee
//   const handleRowClick = (record) => {
//     setSelectedEmployee(record);
//   };

//   const columns = [
//     {
//       title: "#",
//       dataIndex: "index",
//       key: "index",
//       align: "center",
//       render: (_, __, index) => <Text strong>{index + 1}</Text>,
//     },
//     // {
//     //   title: "Employee Info",
//     //   key: "employeeInfo",
//     //   render: (_, record) => (
//     //     <div
//     //       style={{
//     //         paddingLeft: 0,
//     //         fontFamily: "Railway",
//     //         fontSize: "15px",
//     //         lineHeight: "25px",
//     //         textTransform: "capitalize",
//     //       }}
//     //     >
//     //       <ul style={{ paddingLeft: 0, listStyle: "none" }}>
//     //         <li>
//     //           <Text strong>Name:</Text> {record.firstName} {record.lastName}
//     //         </li>
//     //         <li>
//     //           <Text strong>S/O:</Text> {record.fatherName || "N/A"}
//     //         </li>
//     //         <li>
//     //           <Text strong>Dob:</Text> {record.dob || "N/A"}
//     //         </li>
//     //         <li>
//     //           <Text strong>Born in:</Text> {record.birthplace || "N/A"}
//     //         </li>
//     //         <li>
//     //           <Text strong>Address:</Text> {record.address || "N/A"}
//     //         </li>
//     //         <li>
//     //           <Text strong>Phone:</Text> {record.telephone || "N/A"}
//     //         </li>
//     //         <li style={{ textTransform: "none" }}>
//     //           <Text strong>Email:</Text> {record.email || "N/A"}
//     //         </li>
//     //         <li>
//     //           <Text strong>Status:</Text> {record.status || "N/A"}
//     //         </li>
//     //         <li>
//     //           <Text strong>ID:</Text> {record._id || "N/A"}
//     //         </li>
//     //       </ul>
//     //     </div>
//     //   ),
//     // },

//     // {
//     //   title: "Employee Image",
//     //   dataIndex: "image",
//     //   key: "image",
//     //   render: (_, record) => (
//     //     // <img
//     //     //   className="block mx-auto my-3"
//     //     //   style={{
//     //     //     width: "150px",
//     //     //     height: "180px",
//     //     //     objectFit: "cover",
//     //     //     borderRadius: "8px",
//     //     //     backdropFilter: "blur(5px)",
//     //     //     boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
//     //     //   }}
//     //     //   src={record.image}
//     //     //   alt="Employee"
//     //     // />

//     //     // <Avatar
//     //     //   size={100}
//     //     //   src={record.image}
//     //     //   icon={<UserOutlined />}
//     //     //   alt="Employee Avatar"
//     //     //   className="mb-4"
//     //     // />

//     //   ),
//     // },

//     {
//       title: "Employment History",
//       key: "employmentHistory",
//       render: (_, record) => (
//         <div
//           style={{
//             paddingLeft: 0,
//             fontFamily: "Railway",
//             fontSize: "15px",
//             lineHeight: "25px",
//             textTransform: "capitalize",
//           }}
//         >
//           {record.employmentHistory?.map((item, idx) => (
//             <div className="mb-4" key={idx}>
//               <Avatar
//           size={100}
//           src={record.image}
//           icon={<UserOutlined />}
//           alt="Employee Avatar"
//           className="mb-4"
//         />
//         <ul style={{ paddingLeft: 0, listStyle: "none" }}>
//              <li>
//                <Text strong>Name:</Text> {record.firstName} {record.lastName}
//              </li>
// </ul>

//               <Text strong>Position:</Text> {item.position || "N/A"}

//               {/* <Text strong>Joining Date:</Text>{" "}
//               {item.startDate
//                 ? moment(item.startDate).format("YYYY-MM-DD")
//                 : "N/A"}
//               <br />
//               <Text strong>Job End:</Text>{" "}
//               {item.endDate
//                 ? moment(item.endDate).format("YYYY-MM-DD")
//                  : "Present"} */}
//             </div>
//           ))}
//           {/* <Text strong>ERP Number:</Text> {record.erpNumber || "N/A"} <br />
//           <Text strong>Job ID Card No:</Text> {record.jobIdCardNumber || "N/A"}{" "}
//           <br />
//           <Text strong>Qualification:</Text>{" "}
//           {record.educationalQualification || "N/A"} */}
//         </div>
//       ),
//     },

//     {
//       title: "Store",
//       dataIndex: "store",
//       key: "store",
//       render: (_, record) => (
//         <div
//           style={{
//             paddingLeft: 0,
//             fontFamily: "Railway",
//             fontSize: "15px",
//             lineHeight: "27px",
//           }}
//         >
//           <li>
//             <Text strong>Batch :</Text> {record.store?.batch || "N/A"}
//             <br />
//             <Text strong>Role :</Text>{" "}
//             <Tag
//               color="blue"
//               style={{
//                 fontFamily: "Railway",
//                 borderRadius: "3px",
//                 fontSize: "14px",
//                 textTransform: "capitalize",
//               }}
//             >
//               {record.role || "N/A"}
//             </Tag>
//           </li>
//         </div>
//       ),
//     },
//     {
//       title: "Actions",
//       key: "actions",
//       align: "center",
//       render: (_, record) => (
//         <Space>
//           <Button
//             type="primary"
//             icon={<EditOutlined />}
//             onClick={() => showEditModal(record)}
//             className="font-railway"
//           >
//             Edit
//           </Button>
//           <Button
//             danger
//             icon={<DeleteOutlined />}
//             onClick={() => handleDelete(record._id)}
//             className="font-railway "
//           >
//             Delete
//           </Button>
//         </Space>
//       ),
//     },
//   ];

//   return (
//     <div className="container mx-auto p-4 ">
//       <Card className="shadow-md font-railway">
//         <Row gutter={[16, 16]}>
//           <Col xs={24} sm={24} md={18}>
//             {" "}
//             {/* Adjusted md size to make space for the profile */}
//             <Title level={3} className="text-center mb-4 font-railway">
//               All Employees
//             </Title>
//             <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
//               {[
//                 {
//                   title: "Employees",
//                   label: "Total number of all employees",
//                   value: employeeStats.total,
//                   icon: <MdArrowOutward className="text-lg text-gray-400" />,
//                 },
//                 {
//                   title: "Inactive",
//                   label: "Currently not active",
//                   value: employeeStats.inactive,
//                   icon: <MdArrowOutward className="text-lg text-gray-400" />,
//                 },
//                 {
//                   title: "Newly Joined",
//                   label: "Recently added employees",
//                   value: employeeStats.newlyJoined,
//                   icon: <MdArrowOutward className="text-lg text-gray-400" />,
//                 },
//               ].map((stat, index) => (
//                 <Card
//                   key={index}
//                   className="bg-[#1f1f1f] text-white relative"
//                 >
//                   <div className="flex items-center justify-between mb-2">
//                     <div className="text-sm text-gray-500 uppercase">
//                       {stat.title}
//                     </div>
//                     {stat.icon}
//                   </div>
//                   <div className="text-xl font-semibold">{stat.value}</div>
//                   <div className="text-gray-400">{stat.label}</div>
//                 </Card>
//               ))}
//             </div>
//             {loading ? (
//               <div className="flex justify-center items-center min-h-[200px]">
//                 <Spin size="large" />
//               </div>
//             ) : (
//               <Table
//                 columns={columns}
//                 dataSource={employeeData}
//                 rowKey={(record) => record._id}
//                 pagination={{ pageSize: 8 }}
//                 scroll={{ x: "max-content" }}
//                 bordered
//                 className="font-railway"
//                 // onRow={(record) => {
//                 //   return {
//                 //     onClick: () => {
//                 //       handleRowClick(record);
//                 //     },
//                 //   };
//                 // }}
//                 onRow={(record) => ({ onClick: () => handleRowClick(record) })}
//               />
//             )}
//             <Modal
//               title="Edit Employee"
//               open={isModalOpen}
//               onCancel={() => {
//                 setIsModalOpen(false);
//                 setEditingEmployee(null);
//                 form.resetFields();
//                 setImageFile(null);
//               }}
//               footer={null}
//               width={800}
//             >
//               <Form
//                 form={form}
//                 layout="vertical"
//                 onFinish={handleEditSubmit}
//                 className="font-railway"
//               >
//                 <Row gutter={[16, 16]}>
//                   <Col xs={24} sm={12} md={8}>
//                     <Form.Item name="firstName" label="Name">
//                       <Input placeholder="Enter name" />
//                     </Form.Item>
//                   </Col>
//                   <Col xs={24} sm={12} md={8}>
//                     <Form.Item name="email" label="Email">
//                       <Input placeholder="Enter email" />
//                     </Form.Item>
//                   </Col>
//                   <Col xs={24} sm={12} md={8}>
//                     <Form.Item name="address" label="Address">
//                       <Input placeholder="Enter address" />
//                     </Form.Item>
//                   </Col>
//                   <Col xs={24} sm={12} md={8}>
//                     <Form.Item name="telephone" label="Telephone">
//                       <Input placeholder="Enter telephone" />
//                     </Form.Item>
//                   </Col>
//                   <Col xs={24} sm={12} md={8}>
//                     <Form.Item name="fatherName" label="Father Name">
//                       <Input placeholder="Enter father name" />
//                     </Form.Item>
//                   </Col>
//                   <Col xs={24} sm={12} md={8}>
//                     <Form.Item name="birthplace" label="Birthplace">
//                       <Input placeholder="Enter birthplace" />
//                     </Form.Item>
//                   </Col>
//                   <Col xs={24} sm={12} md={8}>
//                     <Form.Item name="dob" label="Date of Birth">
//                       <DatePicker
//                         format="YYYY-MM-DD"
//                         style={{ width: "100%" }}
//                       />
//                     </Form.Item>
//                   </Col>
//                   <Col xs={24} sm={12} md={8}>
//                     <Form.Item name="erpNumber" label="ERP Number">
//                       <Input placeholder="Enter ERP number" />
//                     </Form.Item>
//                   </Col>
//                   <Col xs={24} sm={12} md={8}>
//                     <Form.Item
//                       name="jobIdCardNumber"
//                       label="Job ID Card Number"
//                     >
//                       <Input placeholder="Enter job ID card number" />
//                     </Form.Item>
//                   </Col>
//                   <Col xs={24} sm={12} md={8}>
//                     <Form.Item
//                       name="educationalQualification"
//                       label="Educational Qualification"
//                     >
//                       <Input placeholder="Enter educational qualification" />
//                     </Form.Item>
//                   </Col>
//                   <Col xs={24} sm={12} md={8}>
//                     <Form.Item name="store" label="Store">
//                       <Select
//                         placeholder="Select store"
//                         options={storeOptions}
//                       />
//                     </Form.Item>
//                   </Col>
//                   <Col xs={24} sm={12} md={8}>
//                     <Form.Item label="Upload New Image">
//                       <Upload
//                         beforeUpload={() => false}
//                         onChange={handleImageChange}
//                         showUploadList={false}
//                       >
//                         <Button icon={<UploadOutlined />}>Select Image</Button>
//                       </Upload>
//                     </Form.Item>
//                   </Col>
//                 </Row>

//                 <Form.List name="employmentHistory">
//                   {(fields, { add, remove }) => (
//                     <>
//                       {fields.map(({ key, name, ...restField }) => (
//                         <div key={key} className="mb-4 p-3 border rounded">
//                           <Row gutter={[16, 16]}>
//                             <Col xs={24} sm={12} md={8}>
//                               <Form.Item
//                                 {...restField}
//                                 name={[name, "position"]}
//                                 label="Position"
//                                 rules={[{ required: true }]}
//                               >
//                                 <Input placeholder="Position" />
//                               </Form.Item>
//                             </Col>
//                           </Row>

//                           <Row gutter={[16, 16]}>
//                             <Col xs={24} sm={12} md={8}>
//                               <Form.Item
//                                 {...restField}
//                                 name={[name, "startDate"]}
//                                 label="Start Date"
//                                 rules={[{ required: true }]}
//                               >
//                                 <DatePicker
//                                   format="YYYY-MM-DD"
//                                   style={{ width: "100%" }}
//                                 />
//                               </Form.Item>
//                             </Col>
//                             <Col xs={24} sm={12} md={8}>
//                               <Form.Item
//                                 {...restField}
//                                 name={[name, "endDate"]}
//                                 label="End Date"
//                               >
//                                 <DatePicker
//                                   format="YYYY-MM-DD"
//                                   style={{ width: "100%" }}
//                                 />
//                               </Form.Item>
//                             </Col>
//                           </Row>

//                           <Button
//                             danger
//                             onClick={() => remove(name)}
//                             className="mt-2"
//                           >
//                             Remove
//                           </Button>
//                         </div>
//                       ))}

//                       <Button
//                         type="dashed"
//                         onClick={() => add()}
//                         block
//                         className="mt-2"
//                       >
//                         + Add Employment Entry
//                       </Button>
//                     </>
//                   )}
//                 </Form.List>

//                 <Form.Item className="mt-6">
//                   <Button htmlType="submit" type="primary" block>
//                     Save Changes
//                   </Button>
//                 </Form.Item>
//               </Form>
//             </Modal>
//           </Col>
//           <Col xs={24} sm={8} md={6} className="mt-[44px]">
//             <Card className="shadow-md font-railway h-full">
//               <Title level={4} className="text-center mb-4">
//                 Employee Profile
//               </Title>
//               {selectedEmployee ? (
//                 <div className="flex flex-col items-center">
//                   <Avatar
//                     size={120}
//                     src={selectedEmployee.image}
//                     icon={<UserOutlined />}
//                     alt="Employee Avatar"
//                     className="mb-4"
//                   />
//                   <Title level={5} className="text-center">
//                     {selectedEmployee.firstName} {selectedEmployee.lastName}
//                   </Title>
//                   <Text type="secondary" className="mb-4">
//                     {selectedEmployee.role || "N/A"} at{" "}
//                     {selectedEmployee.store?.batch || "N/A"}
//                   </Text>

//                   <Descriptions
//                     bordered
//                     column={1}
//                     size="small"
//                     className="w-full text-left"
//                   >
//                     <Descriptions.Item label="Email">
//                       {selectedEmployee.email || "N/A"}
//                     </Descriptions.Item>
//                     <Descriptions.Item label="Phone">
//                       {selectedEmployee.telephone || "N/A"}
//                     </Descriptions.Item>
//                     <Descriptions.Item label="Address">
//                       {selectedEmployee.address || "N/A"}
//                     </Descriptions.Item>
//                     <Descriptions.Item label="DOB">
//                       {selectedEmployee.dob || "N/A"}
//                     </Descriptions.Item>
//                     <Descriptions.Item label="Status">
//                       <Tag
//                         color={
//                           selectedEmployee.status === "active" ? "green" : "red"
//                         }
//                       >
//                         {selectedEmployee.status || "N/A"}
//                       </Tag>
//                     </Descriptions.Item>
//                     <Descriptions.Item label="ERP No.">
//                       {selectedEmployee.erpNumber || "N/A"}
//                     </Descriptions.Item>
//                     <Descriptions.Item label="Job ID Card No.">
//                       {selectedEmployee.jobIdCardNumber || "N/A"}
//                     </Descriptions.Item>
//                     <Descriptions.Item label="Qualification">
//                       {selectedEmployee.educationalQualification || "N/A"}
//                     </Descriptions.Item>
//                     {selectedEmployee.employmentHistory &&
//                       selectedEmployee.employmentHistory.length > 0 && (
//                         <Descriptions.Item label="Employment History">
//                           {selectedEmployee.employmentHistory.map(
//                             (history, index) => (
//                               <div key={index} className="mb-2">
//                                 <Text strong>{history.position}</Text> <br />
//                                 <Text type="secondary">
//                                   {moment(history.startDate).format(
//                                     "YYYY-MM-DD"
//                                   )}{" "}
//                                   -{" "}
//                                   {history.endDate
//                                     ? moment(history.endDate).format(
//                                         "YYYY-MM-DD"
//                                       )
//                                     : "Present"}
//                                 </Text>
//                               </div>
//                             )
//                           )}
//                         </Descriptions.Item>
//                       )}
//                   </Descriptions>
//                 </div>
//               ) : (
//                 <div className="flex flex-col items-center justify-center h-full text-gray-500">
//                   <TeamOutlined style={{ fontSize: "48px", marginBottom: "16px" }} />
//                   <Text>Click on an employee row to view their profile.</Text>
//                 </div>
//               )}
//             </Card>
//           </Col>
//         </Row>
//       </Card>
//     </div>

//   );
// };

// export default AllEmployee;

///////////////// Final ????????????????

import { useDispatch, useSelector } from "react-redux";
import { useEffect, useRef, useState } from "react";
import {setEmployees,setSelectedEmployee,clearSelectedEmployee,} from "./slices/employeeSlice";
import axios from "axios";
import { MdArrowOutward } from "react-icons/md";
import {Button, Space,Table,message,Typography,Spin,Card,Modal,Form,Input,Tag,DatePicker,Select,Upload,Row,Col,Avatar,Descriptions,Tooltip,Layout,} from "antd";
import {EditOutlined, DeleteOutlined,UploadOutlined,TeamOutlined,UserOutlined,InfoCircleOutlined,} from "@ant-design/icons";
import moment from "moment";
import EmployeeProfile from "./EmployeeProfile";
const { Header } = Layout;

const { Title, Text } = Typography;
const { Option } = Select;

const AllEmployee = () => {
  const dispatch = useDispatch();
  const isMountedRef = useRef(true);
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingEmployee, setEditingEmployee] = useState(null);
  const [storeOptions, setStoreOptions] = useState([]);
  const [imageFile, setImageFile] = useState(null);
  const [employeeStatus, setEmployeeStatus] = useState("Active");
  const [currentPage, setCurrentPage] = useState(1);
  const [employeeStats, setEmployeeStats] = useState({
    total: 0,
    inactive: 0,
    newlyJoined: 0,
  });
  const pageSize = 8;
  const employeeData = useSelector((state) => state.employee.value) || [];
  const selectedEmployee = useSelector((state) => state.employee.selected);

  useEffect(() => {
    isMountedRef.current = true;
    fetchAllEmployees();
    fetchStores();

    const saved = localStorage.getItem("selectedEmployee");
    if (saved) {
      dispatch(setSelectedEmployee(JSON.parse(saved)));
    }

    return () => {
      isMountedRef.current = false;
    };
  }, []);

  const fetchStores = async () => {
    try {
      const token = localStorage.getItem("token");
      const { data } = await axios.get(
        "http://localhost:3000/api/v1/hr/allhr",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      // const options = data.map((store) => ({
      //   label: store.batch,
      //   value: store._id,
      // }));

      const options = data
        .sort((a, b) => parseInt(a.batch) - parseInt(b.batch))
        .map((store) => ({
          label: store.batch,
          value: store._id,
        }));

      setStoreOptions(options);
    } catch (err) {
      console.error("Failed to fetch stores:", err);
    }
  };
  
  const fetchAllEmployees = async (preserveSelected = false) => {
    setLoading(true);
    const token = localStorage.getItem("token");
    try {
      const { data } = await axios.get(
        "http://localhost:3000/api/v1/employee/allemployee",
        { headers: { Authorization: `Bearer ${token}` } }
      );

      const employees = Array.isArray(data.employees) ? data.employees : data;

      // Extract and set summary stats
      setEmployeeStats({
        total: data.summary?.total || employees.length,
        inactive:
          data.summary?.inactive ||
          employees.filter((e) => e.status === "inactive").length,
        newlyJoined:
          data.summary?.newlyJoined ||
          employees.filter(
            (e) =>
              moment().diff(moment(e.createdAt || e.joinedDate), "days") <= 30
          ).length,
      });

      const sortedEmployees = employees.sort((a, b) => {
        const yearA = parseInt(a.store?.batch || "0");
        const yearB = parseInt(b.store?.batch || "0");
        return yearA - yearB;
      });

      dispatch(setEmployees(sortedEmployees));

      if (preserveSelected) {
      const updated = sortedEmployees.find(
        (emp) => emp._id === selectedEmployee?._id
      );
      if (updated) dispatch(setSelectedEmployee(updated));
    }

    } catch (error) {
      console.error("Error fetching employees:", error);
      message.error("Failed to load employees");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      const token = localStorage.getItem("token");
      await axios.delete(`http://localhost:3000/api/v1/employee/delete/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      message.success("Employee deleted successfully");
      fetchAllEmployees();
    } catch (error) {
      message.error("Failed to delete employee");
    }
  };

  const showEditModal = (employee) => {
    setEditingEmployee(employee);

    // Format dates for form
    const formattedEmployee = {
      ...employee,
      dob: employee.dob ? moment(employee.dob) : null,
      employmentHistory:
        employee.employmentHistory?.map((item) => ({
          ...item,
          startDate: item.startDate ? moment(item.startDate) : null,
          endDate: item.endDate ? moment(item.endDate) : null,
        })) || [],

      store: employee.store?._id || employee.store,
      status: employee.status,
      currentWorkplace: employee.currentWorkplace,
    };

    form.setFieldsValue(formattedEmployee);
    setIsModalOpen(true);
  };

  const handleEditSubmit = async (values) => {
    console.log("Submitting updated values:", values);
    try {
      const token = localStorage.getItem("token");
      const formData = new FormData();

      // Convert moment objects to strings and ensure 'store' is just the ID
      const processedValues = {
        ...values,
        dob: values.dob?.format("YYYY-MM-DD"),
        employmentHistory: values.employmentHistory?.map((item) => ({
          ...item,
          startDate: item.startDate?.format("YYYY-MM-DD"),
          endDate: item.endDate?.format("YYYY-MM-DD"),
        })),
        // Ensure 'store' is its ID
        store: values.store?.value || values.store,
        currentWorkplace: values.currentWorkplace,
      };

      // Append all values to formData
      Object.entries(processedValues).forEach(([key, value]) => {
        if (key === "employmentHistory") {
          formData.append(key, JSON.stringify(value));
        } else {
          formData.append(key, value);
        }
      });

      if (imageFile) {
        formData.append("image", imageFile);
      }

      // Use correct endpoint with employee ID
      await axios.put(
        `http://localhost:3000/api/v1/employee/update/${editingEmployee._id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      message.success("Employee updated successfully");
      form.resetFields();
      setIsModalOpen(false);
      setEditingEmployee(null);
      setImageFile(null);
      //fetchAllEmployees();
      await fetchAllEmployees(true); // pass a flag
      dispatch(setSelectedEmployee({ ...editingEmployee, ...processedValues }));
    } catch (error) {
      console.error("Failed to update employee:", error);
      message.error("Failed to update employee");
    }
  };

  const handleImageChange = ({ file }) => {
    setImageFile(file);
  };

  // const handleRowClick = (record) => {
  //   setSelectedEmployee(record);
  // };
  //   const handleRowClick = (record) => {
  //   setSelectedEmployee(record);
  //   localStorage.setItem("selectedEmployee", JSON.stringify(record));
  // };
  const handleRowClick = (record) => {
    dispatch(setSelectedEmployee(record)); // dispatch to Redux + save to localStorage
  };

  const handleStatusChange = async (newStatus) => {
    setEmployeeStatus(newStatus);

    const token = localStorage.getItem("token");
    const { data } = await axios.put(
      "http://localhost:3000/api/v1/employee/status"
      // { headers: { Authorization: `Bearer ${token}` } }
    );
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
      title: "#",
      dataIndex: "index",
      key: "index",
      align: "center",
      render: (_, __, index) => (
        <Text className="font-railway text-base">
          {/* {index + 1} */}
           {(currentPage - 1) * pageSize + index + 1}
          </Text>
      ),
    },
    {
      title: (
        <span className="font-railway text-base font-medium ">
          Info{" "}
          <Tooltip title="This shows the store the employee belongs to">
            <InfoCircleOutlined style={{ color: "#1890ff" }} />
          </Tooltip>
        </span>
      ),

      key: "employmentHistory",
      render: (_, record) => (
        <div className="font-railway text-[15px] font-medium capitalize">
          {record.employmentHistory?.map((item, idx) => (
            <div className="flex items-center" key={idx}>
              <Avatar
                size={70}
                src={record.image}
                icon={<UserOutlined />}
                alt="Employee Avatar"
                className="mb-4"
              />
              <ul style={{ paddingLeft: 15, listStyle: "none" }}>
                <li>
                  <Text strong></Text> {record.firstName} {record.lastName}
                </li>
                <li className="">
                  <Text strong></Text> {item.position || "N/A"}
                </li>
              </ul>
            </div>
          ))}
        </div>
      ),
    },

    {
      title: (
        <span className="font-railway text-base font-medium">
          Store{" "}
          <Tooltip title="This shows the store the employee belongs to">
            <InfoCircleOutlined style={{ color: "#1890ff" }} />
          </Tooltip>
        </span>
      ),
      dataIndex: "store",
      key: "store",
      render: (_, record) => (
        <div className="font-railway text-[15px] ">
          <li>
            <Text className="font-railway text-[15px] ">
              Batch : {record.store?.batch || "N/A"}
            </Text>{" "}
            {""}
            <br />
            <Text className="font-railway text-[15px] ">Role :</Text>{" "}
            <Tag className="font-railway text-[15px]  text-transpa">
              {record.role || "N/A"}
            </Tag>
          </li>
        </div>
      ),
    },

    {
      title: <span className="font-railway text-[15px]  ">Status </span>,
      dataIndex: "status",
      render: statusTag,
      filters: [
        {
          text: <span className="font-railway text-[15px] ">Approved</span>,
          value: "approved",
        },
        {
          text: <span className="font-railway text-[15px] ">Waiting</span>,
          value: "waiting",
        },
        {
          text: <span className="font-railway text-[15px] ">Rejected</span>,
          value: "rejected",
        },
      ],
      onFilter: (value, record) => record.status === value,
    },

    {
      title: (
        <span className="font-railway text-[15px]">
          Actions{" "}
          <Tooltip title="This shows the store the employee belongs to">
            <InfoCircleOutlined style={{ color: "#1890ff" }} />
          </Tooltip>
        </span>
      ),
      key: "actions",
      align: "center",
      render: (_, record) => (
        <Space>
          <Button
            type="primary"
            icon={<EditOutlined />}
            onClick={() => showEditModal(record)}
            className="font-railway"
          >
            Edit
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
    <Layout className="">
      <Header className="bg-[#FFF] p-0 ">
        <Title
          level={3}
          className="font-railway text-center p-5 text-[clamp(1.5rem,2vw,2rem)] font-semibold text-gray-800"
        >
          All Employees
        </Title>
      </Header>
      <div className="container mx-auto p-4 sm:px-6 lg:px-6 py-6">
        <Card className="shadow-md font-railway">
          <Row gutter={[8, 8]}>
            <Col xs={24} sm={24} md={16}>
              {" "}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-6 capitalize">
                {[
                  {
                    title: "Employees",
                    label: "Total number of all employees",
                    value: employeeStats.total,
                    icon: (
                      <MdArrowOutward className="text-lg text-[#000000e0]" />
                    ),
                  },
                  {
                    title: "Inactive",
                    label: "Currently not active",
                    value: employeeStats.inactive,
                    icon: (
                      <MdArrowOutward className="text-lg text-[#000000e0]" />
                    ),
                  },
                  {
                    title: "Newly Joined",
                    label: "Recently added employees",
                    value: employeeStats.newlyJoined,
                    icon: (
                      <MdArrowOutward className="text-lg text-[#000000e0]" />
                    ),
                  },
                ].map((stat, index) => (
                  <Card
                    key={index}
                    className="bg-[#aeadad1f] text-white relative"
                  >
                    <div className="flex items-center justify-between  font-railway">
                      <div className="text-sm text-[#000000e0] capitalize">
                        {stat.title}
                      </div>
                      {stat.icon}
                    </div>
                    <div className="text-xl text-[#000000e0] font-semibold">
                      {stat.value}
                    </div>
                    <div className="text-[#000000e0] font-railway">
                      {stat.label}
                    </div>
                  </Card>
                ))}
              </div>
              {loading ? (
                <div className="flex justify-center items-center min-h-[200px]">
                  <Spin size="large" />
                </div>
              ) : (
                <Table
                  columns={columns}
                  dataSource={employeeData}
                  rowKey={(record) => record._id}
                  pagination={{
                   current: currentPage,
                  //  pageSize: 8,
                   pageSize,
                   onChange: (page) => setCurrentPage(page),
                   }}
                  scroll={{ x: "max-content" }}                
                  bordered
                  className="font-railway"
                  onRow={(record) => ({
                    onClick: () => handleRowClick(record),
                  })}
                />
              )}
              <Modal
                title="Edit Employee"
                open={isModalOpen}
                onCancel={() => {
                  setIsModalOpen(false);
                  setEditingEmployee(null);
                  form.resetFields();
                  setImageFile(null);
                }}
                footer={null}
                width={800}
              >
                <Form
                  form={form}
                  layout="vertical"
                  onFinish={handleEditSubmit}
                  className="font-railway"
                >
                  <Row gutter={[16, 16]}>
                    <Col xs={24} sm={12} md={8}>
                      <Form.Item name="firstName" label="Name">
                        <Input placeholder="Enter name" />
                      </Form.Item>
                    </Col>
                    <Col xs={24} sm={12} md={8}>
                      <Form.Item name="email" label="Email">
                        <Input placeholder="Enter email" />
                      </Form.Item>
                    </Col>
                    <Col xs={24} sm={12} md={8}>
                      <Form.Item name="address" label="Address">
                        <Input placeholder="Enter address" />
                      </Form.Item>
                    </Col>
                    <Col xs={24} sm={12} md={8}>
                      <Form.Item name="telephone" label="Telephone">
                        <Input placeholder="Enter telephone" />
                      </Form.Item>
                    </Col>
                    <Col xs={24} sm={12} md={8}>
                      <Form.Item name="fatherName" label="Father Name">
                        <Input placeholder="Enter father name" />
                      </Form.Item>
                    </Col>
                    <Col xs={24} sm={12} md={8}>
                      <Form.Item name="birthplace" label="Birthplace">
                        <Input placeholder="Enter birthplace" />
                      </Form.Item>
                    </Col>
                    <Col xs={24} sm={12} md={8}>
                      <Form.Item name="dob" label="Date of Birth">
                        <DatePicker
                          format="YYYY-MM-DD"
                          style={{ width: "100%" }}
                        />
                      </Form.Item>
                    </Col>
                    <Col xs={24} sm={12} md={8}>
                      <Form.Item name="erpNumber" label="ERP Number">
                        <Input placeholder="Enter ERP number" />
                      </Form.Item>
                    </Col>
                    <Col xs={24} sm={12} md={8}>
                      <Form.Item
                        name="jobIdCardNumber"
                        label="Job ID Card Number"
                      >
                        <Input placeholder="Enter job ID card number" />
                      </Form.Item>
                    </Col>
                    <Col xs={24} sm={12} md={8}>
                      <Form.Item
                        name="educationalQualification"
                        label="Educational Qualification"
                      >
                        <Input placeholder="Enter educational qualification" />
                      </Form.Item>
                    </Col>
                    <Col xs={24} sm={12} md={8}>
                      <Form.Item name="store" label="Store">
                        <Select
                          placeholder="Select store"
                          options={storeOptions}
                        />
                      </Form.Item>
                    </Col>
                    {/* Main Status Field */}
                    <Col xs={24} sm={12} md={8}>
                      <Form.Item
                        name="status"
                        label="Employee Status"
                        className="font-railway"
                      >
                        <Select
                          placeholder="Select status"
                          className="font-railway"
                        >
                          <Option className="font-railway" value="waiting">
                            Waiting
                          </Option>
                          <Option className="font-railway" value="approved">
                            Approved
                          </Option>
                          <Option className="font-railway" value="rejected">
                            Rejected
                          </Option>
                        </Select>
                      </Form.Item>
                    </Col>
                    <Col xs={24} sm={12} md={8}>
                      <Form.Item
                        name="currentWorkplace"
                        label="Current Workplace"
                      >
                        <Input placeholder="Enter current workplace" />
                      </Form.Item>
                    </Col>
                    <Col xs={24} sm={12} md={8}>
                      <Form.Item label="Upload New Image">
                        <Upload
                          beforeUpload={() => false}
                          onChange={handleImageChange}
                          showUploadList={false}
                        >
                          <Button icon={<UploadOutlined />}>
                            Select Image
                          </Button>
                        </Upload>
                      </Form.Item>
                    </Col>
                  </Row>

                  <Form.List name="employmentHistory">
                    {(fields, { add, remove }) => (
                      <>
                        {fields.map(({ key, name, ...restField }) => (
                          <div key={key} className="mb-4 p-3 border rounded">
                            <Row gutter={[16, 16]}>
                              <Col xs={24} sm={12} md={12} className=" ">
                                <Form.Item
                                  {...restField}
                                  name={[name, "position"]}
                                  label="Position"
                                >
                                  <Input placeholder="Position" />
                                </Form.Item>
                              </Col>
                              <Col xs={24} sm={12} md={12}>
                                <Form.Item
                                  {...restField}
                                  name={[name, "startDate"]}
                                  label="Start Date"
                                >
                                  <DatePicker
                                    format="YYYY-MM-DD"
                                    style={{ width: "100%" }}
                                  />
                                </Form.Item>
                              </Col>
                              <Col xs={24} sm={12} md={12}>
                                <Form.Item
                                  {...restField}
                                  name={[name, "endDate"]}
                                  label="End Date"
                                >
                                  <DatePicker
                                    format="YYYY-MM-DD"
                                    style={{ width: "100%" }}
                                  />
                                </Form.Item>
                              </Col>
                            </Row>

                            <Button
                              danger
                              onClick={() => remove(name)}
                              className="mt-2"
                            >
                              Remove
                            </Button>
                          </div>
                        ))}

                        <Button
                          type="dashed"
                          onClick={() => add()}
                          block
                          className="mt-2"
                        >
                          + Add Employment Entry
                        </Button>
                      </>
                    )}
                  </Form.List>

                  <Form.Item className="mt-6">
                    <Button htmlType="submit" type="primary" block>
                      Save Changes
                    </Button>
                  </Form.Item>
                </Form>
              </Modal>
            </Col>
            <Col xs={24} sm={8} md={8} className="">
              <Card className="shadow-md font-railway h-full ml-[10px]">
                {/* Render the EmployeeProfile component here */}
                <EmployeeProfile
                  selectedEmployee={selectedEmployee}
                  currentStatus={employeeStatus}
                />
              </Card>
            </Col>
          </Row>
        </Card>
      </div>
    </Layout>
  );
};

export default AllEmployee;

//////VERSION 2/////

// AllEmployee.jsx

// import { useDispatch, useSelector } from "react-redux";
// import { useEffect, useRef, useState } from "react";
// import { setEmployees, setSelectedEmployee, clearSelectedEmployee } from "./slices/employeeSlice";
// import axios from "axios";
// import { MdArrowOutward } from "react-icons/md";
// import {
//   Button,
//   Space,
//   Table,
//   message,
//   Typography,
//   Spin,
//   Card,
//   Modal,
//   Form,
//   Input,
//   Tag,
//   DatePicker,
//   Select,
//   Upload,
//   Row,
//   Col,
//   Avatar,
//   Tooltip,
//   Layout,
// } from "antd";
// import {
//   EditOutlined,
//   DeleteOutlined,
//   UploadOutlined,
//   UserOutlined,
//   InfoCircleOutlined,
//   MinusCircleOutlined, // Import MinusCircleOutlined for removing items
// } from "@ant-design/icons";
// import moment from "moment";
// import EmployeeProfile from "./EmployeeProfile";

// const { Header } = Layout;
// const { Title, Text } = Typography;
// const { Option } = Select;

// const AllEmployee = () => {
//   const dispatch = useDispatch();
//   const isMountedRef = useRef(true);
//   const [form] = Form.useForm();
//   const [loading, setLoading] = useState(false);
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [editingEmployee, setEditingEmployee] = useState(null);
//   const [storeOptions, setStoreOptions] = useState([]);
//   const [imageFile, setImageFile] = useState(null);
//   const [employeeStats, setEmployeeStats] = useState({
//     total: 0,
//     inactive: 0,
//     newlyJoined: 0,
//   });

//   const employees = useSelector((state) => state.employee.value); // Get employees from Redux store
//   const selectedEmployee = useSelector((state) => state.employee.selected);

//   useEffect(() => {
//     isMountedRef.current = true;
//     fetchAllEmployees();
//     fetchStores();
//     const saved = localStorage.getItem("selectedEmployee");
//     if (saved) {
//       dispatch(setSelectedEmployee(JSON.parse(saved)));
//     }
//     return () => {
//       isMountedRef.current = false;
//     };
//   }, []);

//   const fetchStores = async () => {
//     try {
//       const token = localStorage.getItem("token");
//       const { data } = await axios.get(
//         "http://localhost:3000/api/v1/hr/allhr",
//         { headers: { Authorization: `Bearer ${token}` } }
//       );
//       const options = data.map((store) => ({ label: store.batch, value: store._id }));
//       setStoreOptions(options);
//     } catch (err) {
//       console.error("Failed to fetch stores:", err);
//     }
//   };

//   const fetchAllEmployees = async () => {
//     setLoading(true);
//     const token = localStorage.getItem("token");
//     try {
//       const { data } = await axios.get(
//         "http://localhost:3000/api/v1/employee/allemployee",
//         { headers: { Authorization: `Bearer ${token}` } }
//       );
//       const employeesData = Array.isArray(data.employees) ? data.employees : data; // Renamed to avoid conflict
//       setEmployeeStats({
//         total: data.summary?.total || employeesData.length,
//         inactive:
//           data.summary?.inactive ||
//           employeesData.filter((e) => e.status === "inactive").length,
//         newlyJoined:
//           data.summary?.newlyJoined ||
//           employeesData.filter((e) => moment().diff(moment(e.createdAt || e.joinedDate), "days") <= 30)
//             .length,
//       });
//       dispatch(setEmployees(employeesData));
//     } catch (error) {
//       console.error("Error fetching employees:", error);
//       message.error("Failed to load employees");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleDelete = async (id) => {
//     try {
//       const token = localStorage.getItem("token");
//       await axios.delete(`http://localhost:3000/api/v1/employee/delete/${id}`, {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       message.success("Employee deleted successfully");
//       fetchAllEmployees();
//     } catch (error) {
//       message.error("Failed to delete employee");
//     }
//   };

//   const showEditModal = (employee) => {
//     setEditingEmployee(employee);

//     // Format dates for form
//     const formattedEmployee = {
//       ...employee,
//       dob: employee.dob ? moment(employee.dob) : null,
//       employmentHistory:
//         employee.employmentHistory?.map((item) => ({
//           ...item,
//           startDate: item.startDate ? moment(item.startDate) : null,
//           endDate: item.endDate ? moment(item.endDate) : null,
//         })) || [],
//       // Ensure 'store' is set to its ID for the Select component
//       store: employee.store?._id || employee.store,
//       status: employee.status, // Set the main status field
//     };

//     form.setFieldsValue(formattedEmployee);
//     setIsModalOpen(true);
//   };

//   const handleEditSubmit = async (values) => {
//     console.log("Submitting updated values:", values);
//     try {
//       const token = localStorage.getItem("token");
//       const formData = new FormData();

//       // Convert moment objects to strings and ensure 'store' is just the ID
//       const processedValues = {
//         ...values,
//         dob: values.dob?.format("YYYY-MM-DD"),
//         employmentHistory: values.employmentHistory?.map((item) => ({
//           ...item,
//           startDate: item.startDate?.format("YYYY-MM-DD"),
//           endDate: item.endDate?.format("YYYY-MM-DD"),
//         })),
//         // Ensure 'store' is its ID
//         store: values.store?.value || values.store,
//       };

//       // Append all values to formData
//       Object.entries(processedValues).forEach(([key, value]) => {
//         if (key === "employmentHistory") {
//           formData.append(key, JSON.stringify(value));
//         } else {
//           formData.append(key, value);
//         }
//       });

//       if (imageFile) {
//         formData.append("image", imageFile);
//       }

//       // Use correct endpoint with employee ID
//       await axios.put(
//         `http://localhost:3000/api/v1/employee/update/${editingEmployee._id}`,
//         formData,
//         {
//           headers: {
//             "Content-Type": "multipart/form-data",
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );

//       message.success("Employee updated successfully");
//       form.resetFields();
//       setIsModalOpen(false);
//       setEditingEmployee(null);
//       setImageFile(null);
//       fetchAllEmployees();
//     } catch (error) {
//       console.error("Failed to update employee:", error);
//       message.error("Failed to update employee");
//     }
//   };

//   const handleImageChange = ({ file }) => {
//     setImageFile(file);
//   };

//   const handleRowClick = (record) => {
//     dispatch(setSelectedEmployee(record));
//     localStorage.setItem("selectedEmployee", JSON.stringify(record)); // Save to localStorage
//   };

//   const statusTag = (status) => {
//     const color =
//       {
//         waiting: "orange",
//         approved: "green",
//         rejected: "red",
//       }[status] || "gray";
//     return <Tag color={color}>{status.toUpperCase()}</Tag>;
//   };

//   const columns = [
//     {
//       title: "#",
//       dataIndex: "index",
//       key: "index",
//       align: "center",
//       render: (_, __, index) => <Text className="font-railway text-base">{index + 1}</Text>,
//     },
//     {
//       title: (
//         <span className="font-railway text-base font-medium ">
//           Info{" "}
//           <Tooltip title="This shows the store the employee belongs to">
//             {" "}
//             <InfoCircleOutlined style={{ color: "#1890ff" }} />{" "}
//           </Tooltip>
//         </span>
//       ),
//       key: "employmentHistory",
//       render: (_, record) => (
//         <div className="font-railway text-[15px] font-medium capitalize">
//           {record.employmentHistory?.map((item, idx) => (
//             <div className="flex items-center" key={idx}>
//               <Avatar
//                 size={70}
//                 src={record.image}
//                 icon={<UserOutlined />}
//                 alt="Employee Avatar"
//                 className="mb-4"
//               />
//               <ul style={{ paddingLeft: 15, listStyle: "none" }}>
//                 <li>
//                   <Text strong></Text> {record.firstName} {record.lastName}
//                 </li>
//                 <li className="">
//                   <Text strong></Text> {item.position || "N/A"}{" "}
//                 </li>{" "}
//               </ul>{" "}
//             </div>
//           ))}
//         </div>
//       ),
//     },
//     {
//       title: (
//         <span className="font-railway text-base font-medium">
//           Store{" "}
//           <Tooltip title="This shows the store the employee belongs to">
//             {" "}
//             <InfoCircleOutlined style={{ color: "#1890ff" }} />
//           </Tooltip>
//         </span>
//       ),
//       dataIndex: "store",
//       key: "store",
//       render: (_, record) => (
//         <div className="font-railway text-[15px] ">
//           <li>
//             {" "}
//             <Text className="font-railway text-[15px] ">
//               Batch : {record.store?.batch || "N/A"}
//             </Text>{" "}
//             {""} <br />{" "}
//             <Text className="font-railway text-[15px] ">Role :</Text>{" "}
//             <Tag className="font-railway text-[15px]  text-transpa">
//               {" "}
//               {record.role || "N/A"}{" "}
//             </Tag>
//           </li>
//         </div>
//       ),
//     },
//     {
//       title: <span className="font-railway text-[15px]  ">Status{" "}</span>,
//       dataIndex: "status",
//       render: statusTag,
//       filters: [
//         {
//           text: <span className="font-railway text-[15px] ">Approved</span>,
//           value: "approved",
//         },
//         {
//           text: <span className="font-railway text-[15px] ">Waiting</span>,
//           value: "waiting",
//         },
//         {
//           text: <span className="font-railway text-[15px] ">Rejected</span>,
//           value: "rejected",
//         },
//       ],
//       onFilter: (value, record) => record.status === value,
//     },
//     {
//       title: (
//         <span className="font-railway text-[15px]">
//           Actions{" "}
//           <Tooltip title="This shows the store the employee belongs to">
//             {" "}
//             <InfoCircleOutlined style={{ color: "#1890ff" }} />
//           </Tooltip>
//         </span>
//       ),
//       key: "actions",
//       align: "center",
//       render: (_, record) => (
//         <Space>
//           {" "}
//           <Button
//             type="primary"
//             icon={<EditOutlined />}
//             onClick={() => showEditModal(record)}
//             className="font-railway"
//           >
//             {" "}
//             Edit{" "}
//           </Button>{" "}
//           <Button
//             danger
//             icon={<DeleteOutlined />}
//             onClick={() => handleDelete(record._id)}
//             className="font-railway "
//           >
//             {" "}
//             Delete
//           </Button>{" "}
//         </Space>
//       ),
//     },
//   ];

//   return (
//     <Layout className="">
//       <Header className="bg-[#FFF] p-0 ">
//         {" "}
//         <Title
//           level={3}
//           className="font-railway text-center p-5 text-[clamp(1.5rem,2vw,2rem)] font-semibold text-gray-800"
//         >
//           {" "}
//           All Employees
//         </Title>
//       </Header>
//       <div className="container mx-auto p-4 sm:px-6 lg:px-6 py-6">
//         {" "}
//         <Card className="shadow-md font-railway">
//           <Row gutter={[8, 8]}>
//             <Col xs={24} sm={24} md={16}>
//               <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-6 capitalize">
//                 {[
//                   {
//                     title: "Employees",
//                     label: "Total number of all employees",
//                     value: employeeStats.total,
//                     icon: <MdArrowOutward className="text-lg text-[#000000e0]" />,
//                   },
//                   {
//                     title: "Inactive",
//                     label: "Currently not active",
//                     value: employeeStats.inactive,
//                     icon: <MdArrowOutward className="text-lg text-[#000000e0]" />,
//                   },
//                   {
//                     title: "Newly Joined",
//                     label: "Recently added employees",
//                     value: employeeStats.newlyJoined,
//                     icon: <MdArrowOutward className="text-lg text-[#000000e0]" />,
//                   },
//                 ].map((stat, index) => (
//                   <Card key={index} className="bg-[#aeadad1f] text-white relative">
//                     <div className="flex items-center justify-between  font-railway">
//                       <div className="text-sm text-[#000000e0] capitalize">
//                         {" "}
//                         {stat.title}{" "}
//                       </div>
//                       {stat.icon}{" "}
//                     </div>
//                     <div className="text-xl text-[#000000e0] font-semibold">
//                       {stat.value}
//                     </div>
//                     <div className="text-[#000000e0] font-railway">
//                       {stat.label}
//                     </div>{" "}
//                   </Card>
//                 ))}{" "}
//               </div>
//               {loading ? (
//                 <div className="flex justify-center items-center min-h-[200px]">
//                   {" "}
//                   <Spin size="large" />{" "}
//                 </div>
//               ) : (
//                 <Table
//                   columns={columns}
//                   dataSource={employees}
//                   rowKey={(record) => record._id}
//                   pagination={{ pageSize: 6 }}
//                   scroll={{ x: "max-content" }}
//                   bordered
//                   className="font-railway"
//                   onRow={(record) => ({ onClick: () => handleRowClick(record) })}
//                 />
//               )}{" "}
//               <Modal
//                 title="Edit Employee"
//                 open={isModalOpen}
//                 onCancel={() => {
//                   setIsModalOpen(false);
//                   setEditingEmployee(null);
//                   form.resetFields();
//                   setImageFile(null);
//                 }}
//                 footer={null}
//                 width={800}
//               >
//                 {" "}
//                 <Form
//                   form={form}
//                   layout="vertical"
//                   onFinish={handleEditSubmit}
//                   className="font-railway"
//                 >
//                   {" "}
//                   <Row gutter={[16, 16]}>
//                     <Col xs={24} sm={12} md={8}>
//                       <Form.Item name="firstName" label="Name">
//                         {" "}
//                         <Input placeholder="Enter name" />{" "}
//                       </Form.Item>{" "}
//                     </Col>{" "}
//                     <Col xs={24} sm={12} md={8}>
//                       <Form.Item name="email" label="Email">
//                         {" "}
//                         <Input placeholder="Enter email" />{" "}
//                       </Form.Item>{" "}
//                     </Col>{" "}
//                     <Col xs={24} sm={12} md={8}>
//                       <Form.Item name="address" label="Address">
//                         {" "}
//                         <Input placeholder="Enter address" />{" "}
//                       </Form.Item>{" "}
//                     </Col>{" "}
//                     <Col xs={24} sm={12} md={8}>
//                       <Form.Item name="telephone" label="Telephone">
//                         {" "}
//                         <Input placeholder="Enter telephone" />{" "}
//                       </Form.Item>{" "}
//                     </Col>{" "}
//                     <Col xs={24} sm={12} md={8}>
//                       <Form.Item name="fatherName" label="Father Name">
//                         {" "}
//                         <Input placeholder="Enter father name" />{" "}
//                       </Form.Item>{" "}
//                     </Col>{" "}
//                     <Col xs={24} sm={12} md={8}>
//                       <Form.Item name="birthplace" label="Birthplace">
//                         {" "}
//                         <Input placeholder="Enter birthplace" />{" "}
//                       </Form.Item>{" "}
//                     </Col>{" "}
//                     <Col xs={24} sm={12} md={8}>
//                       <Form.Item name="dob" label="Date of Birth">
//                         {" "}
//                         <DatePicker
//                           format="YYYY-MM-DD"
//                           style={{ width: "100%" }}
//                         />{" "}
//                       </Form.Item>{" "}
//                     </Col>{" "}
//                     <Col xs={24} sm={12} md={8}>
//                       <Form.Item name="erpNumber" label="ERP Number">
//                         {" "}
//                         <Input placeholder="Enter ERP number" />{" "}
//                       </Form.Item>{" "}
//                     </Col>{" "}
//                     <Col xs={24} sm={12} md={8}>
//                       <Form.Item
//                         name="jobIdCardNumber"
//                         label="Job ID Card Number"
//                       >
//                         {" "}
//                         <Input placeholder="Enter job ID card number" />{" "}
//                       </Form.Item>{" "}
//                     </Col>{" "}
//                     <Col xs={24} sm={12} md={8}>
//                       <Form.Item
//                         name="educationalQualification"
//                         label="Educational Qualification"
//                       >
//                         {" "}
//                         <Input placeholder="Enter educational qualification" />{" "}
//                       </Form.Item>{" "}
//                     </Col>{" "}
//                     <Col xs={24} sm={12} md={8}>
//                       <Form.Item name="store" label="Store">
//                         {" "}
//                         <Select
//                           placeholder="Select store"
//                           options={storeOptions}
//                         />{" "}
//                       </Form.Item>{" "}
//                     </Col>{" "}
//                     {/* Main Status Field */}{" "}
//                     <Col xs={24} sm={12} md={8}>
//                       <Form.Item name="status" label="Employee Status" className="font-railway">
//                         {" "}
//                         <Select placeholder="Select status" className="font-railway">
//                           {" "}
//                           <Option className="font-railway" value="waiting">
//                             Waiting
//                           </Option>{" "}
//                           <Option className="font-railway" value="approved">
//                             Approved
//                           </Option>{" "}
//                           <Option className="font-railway" value="rejected">
//                             Rejected
//                           </Option>{" "}
//                         </Select>{" "}
//                       </Form.Item>{" "}
//                     </Col>{" "}
//                     <Col xs={24} sm={12} md={8}>
//                       <Form.Item label="Upload New Image">
//                         {" "}
//                         <Upload
//                           beforeUpload={() => false}
//                           onChange={handleImageChange}
//                           showUploadList={false}
//                         >
//                           {" "}
//                           <Button icon={<UploadOutlined />}>Select Image</Button>{" "}
//                         </Upload>{" "}
//                       </Form.Item>{" "}
//                     </Col>{" "}
//                   </Row>
//                   <Form.List name="employmentHistory">
//                     {(fields, { add, remove }) => (
//                       <>
//                         {fields.map(({ key, name, ...restField }) => (
//                           <div key={key} className="mb-4 p-3 border rounded">
//                             <Row gutter={[16, 16]} align="bottom"> {/* Added align="bottom" for better alignment */}
//                               <Col xs={24} sm={12} md={12}>
//                                 <Form.Item
//                                   {...restField}
//                                   name={[name, "position"]}
//                                   label="Position"
//                                 >
//                                   <Input placeholder="Position" />
//                                 </Form.Item>
//                               </Col>
//                               <Col xs={24} sm={12} md={12}>
//                                 <Form.Item
//                                   {...restField}
//                                   name={[name, "startDate"]}
//                                   label="Start Date"
//                                 >
//                                   <DatePicker
//                                     format="YYYY-MM-DD"
//                                     style={{ width: "100%" }}
//                                   />
//                                 </Form.Item>
//                               </Col>
//                               <Col xs={24} sm={12} md={12}>
//                                 <Form.Item
//                                   {...restField}
//                                   name={[name, "endDate"]}
//                                   label="End Date"
//                                 >
//                                   <DatePicker format="YYYY-MM-DD" style={{ width: "100%" }} />
//                                 </Form.Item>
//                               </Col>
//                               <Col xs={24} sm={12} md={12}> {/* Added a column for the remove button */}
//                                 <Button danger onClick={() => remove(name)} icon={<MinusCircleOutlined />}>
//                                   Remove
//                                 </Button>
//                               </Col>
//                             </Row>
//                           </div>
//                         ))}
//                         <Button type="dashed" onClick={() => add()} block className="mt-2">
//                           + Add Employment Entry
//                         </Button>
//                       </>
//                     )}
//                   </Form.List>
//                   <Form.Item className="mt-6">
//                     {" "}
//                     <Button htmlType="submit" type="primary" block>
//                       {" "}
//                       Save Changes{" "}
//                     </Button>{" "}
//                   </Form.Item>{" "}
//                 </Form>
//               </Modal>{" "}
//             </Col>{" "}
//             <Col xs={24} sm={8} md={8} className="">
//               {" "}
//               <Card className="shadow-md font-railway h-full ml-[10px]">
//                 {" "}
//                 <EmployeeProfile selectedEmployee={selectedEmployee} />{" "}
//               </Card>{" "}
//             </Col>
//           </Row>
//         </Card>{" "}
//       </div>
//     </Layout>
//   );
// };
// export default AllEmployee;

///////////////// Endl ????????????????//////////////////////////

// import { useDispatch, useSelector } from "react-redux";
// import { useEffect, useRef, useState, useCallback } from "react"; // Added useCallback
// import { setEmployees } from "./slices/employeeSlice";
// import axios from "axios";
// import { MdArrowOutward } from "react-icons/md";
// import {
//   Button,
//   Space,
//   Table,
//   message,
//   Typography,
//   Spin,
//   Card,
//   Modal,
//   Form,
//   Input,
//   Tag,
//   DatePicker,
//   Select,
//   Upload,
//   Row,
//   Col,
//   Avatar,
//   // Descriptions, // Not used in this component
// } from "antd";
// import {
//   EditOutlined,
//   DeleteOutlined,
//   UploadOutlined,
//   // TeamOutlined, // Not used
//   UserOutlined,
// } from "@ant-design/icons";
// import moment from "moment";
// import EmployeeProfile from "./EmployeeProfile";

// const { Title, Text } = Typography;
// const { Option } = Select;

// const AllEmployee = () => {
//   const dispatch = useDispatch();
//   const isMountedRef = useRef(true);
//   const [form] = Form.useForm();
//   const [loading, setLoading] = useState(false);
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [editingEmployee, setEditingEmployee] = useState(null);
//   const [storeOptions, setStoreOptions] = useState([]);
//   const [imageFile, setImageFile] = useState(null);
//   const [selectedEmployee, setSelectedEmployee] = useState(null); // State to hold the currently selected employee for profile display

//   const [employeeStats, setEmployeeStats] = useState({
//     total: 0,
//     inactive: 0,
//     newlyJoined: 0,
//   });

//   const employeeData = useSelector((state) => state.employee.value) || [];

//   const fetchAllEmployees = useCallback(async () => {
//     setLoading(true);
//     const token = localStorage.getItem("token");
//     try {
//       const { data } = await axios.get(
//         "http://localhost:3000/api/v1/employee/allemployee",
//         { headers: { Authorization: `Bearer ${token}` } }
//       );

//       const employees = Array.isArray(data.employees) ? data.employees : data;

//       // Extract and set summary stats
//       setEmployeeStats({
//         total: data.summary?.total || employees.length,
//         inactive:
//           data.summary?.inactive ||
//           employees.filter((e) => e.status === "inactive").length,
//         newlyJoined:
//           data.summary?.newlyJoined ||
//           employees.filter(
//             (e) =>
//               moment().diff(moment(e.createdAt || e.joinedDate), "days") <= 30
//           ).length,
//       });

//       dispatch(setEmployees(employees));

//       // After fetching all employees, if an employee was selected/edited,
//       // update the selectedEmployee state with the latest data from Redux
//       if (selectedEmployee) {
//         const updatedSelected = employees.find(
//           (emp) => emp._id === selectedEmployee._id
//         );
//         if (updatedSelected) {
//           setSelectedEmployee(updatedSelected);
//         }
//       }
//     } catch (error) {
//       console.error("Error fetching employees:", error);
//       message.error("Failed to load employees");
//     } finally {
//       setLoading(false);
//     }
//   }, [dispatch, selectedEmployee]); // Add selectedEmployee as a dependency

//   useEffect(() => {
//     isMountedRef.current = true;
//     fetchAllEmployees();
//     fetchStores();
//     return () => {
//       isMountedRef.current = false;
//     };
//   }, []); // Depend on fetchAllEmployees

//   const fetchStores = async () => {
//     try {
//       const token = localStorage.getItem("token");
//       const { data } = await axios.get(
//         "http://localhost:3000/api/v1/hr/allhr",
//         {
//           headers: { Authorization: `Bearer ${token}` },
//         }
//       );
//       const options = data.map((store) => ({
//         label: store.batch,
//         value: store._id,
//       }));
//       setStoreOptions(options);
//     } catch (err) {
//       console.error("Failed to fetch stores:", err);
//     }
//   };

//   const handleDelete = async (id) => {
//     try {
//       const token = localStorage.getItem("token");
//       await axios.delete(`http://localhost:3000/api/v1/employee/delete/${id}`, {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       message.success("Employee deleted successfully");
//       fetchAllEmployees(); // Re-fetch to update the table and stats
//       setSelectedEmployee(null); // Clear selected employee if it was the one deleted
//     } catch (error) {
//       message.error("Failed to delete employee");
//     }
//   };

//   const showEditModal = (employee) => {
//     setEditingEmployee(employee);

//     // Format dates for form and ensure status is passed
//     const formattedEmployee = {
//       ...employee,
//       dob: employee.dob ? moment(employee.dob) : null,
//       employmentHistory:
//         employee.employmentHistory?.map((item) => ({
//           ...item,
//           startDate: item.startDate ? moment(item.startDate) : null,
//           endDate: item.endDate ? moment(item.endDate) : null,
//         })) || [],
//       // Ensure 'store' is set to its ID for the Select component
//       store: employee.store?._id || employee.store,
//       status: employee.status, // Ensure the status is pre-filled correctly
//     };

//     form.setFieldsValue(formattedEmployee);
//     setIsModalOpen(true);
//   };

//   const handleEditSubmit = async (values) => {
//     console.log("Submitting updated values:", values);
//     try {
//       const token = localStorage.getItem("token");
//       const formData = new FormData();

//       // Convert moment objects to strings and ensure 'store' is just the ID
//       const processedValues = {
//         ...values,
//         dob: values.dob?.format("YYYY-MM-DD"),
//         employmentHistory: values.employmentHistory?.map((item) => ({
//           ...item,
//           startDate: item.startDate?.format("YYYY-MM-DD"),
//           endDate: item.endDate?.format("YYYY-MM-DD"),
//         })),
//         // Ensure 'store' is its ID (it might already be if fetched from options)
//         store: values.store?.value || values.store,
//       };

//       // Append all values to formData
//       Object.entries(processedValues).forEach(([key, value]) => {
//         if (key === "employmentHistory") {
//           // Stringify array of objects
//           formData.append(key, JSON.stringify(value));
//         } else if (value !== undefined && value !== null) {
//           // Append other values, handling undefined/null
//           formData.append(key, value);
//         }
//       });

//       if (imageFile) {
//         formData.append("image", imageFile);
//       }

//       await axios.put(
//         `http://localhost:3000/api/v1/employee/update/${editingEmployee._id}`,
//         formData,
//         {
//           headers: {
//             "Content-Type": "multipart/form-data",
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );

//       message.success("Employee updated successfully");
//       form.resetFields();
//       setIsModalOpen(false);
//       setImageFile(null); // Clear image file
//       setEditingEmployee(null); // Clear editing employee

//       // After successful update, re-fetch all employees.
//       // This will ensure Redux state is updated and then setSelectedEmployee
//       // will get the latest data from the Redux store in the callback.
//       await fetchAllEmployees();

//     } catch (error) {
//       console.error("Failed to update employee:", error);
//       message.error("Failed to update employee");
//     }
//   };

//   const handleImageChange = ({ file }) => {
//     setImageFile(file);
//   };

//   const handleRowClick = (record) => {
//     setSelectedEmployee(record);
//   };

//   // This function is no longer needed as status update is handled by handleEditSubmit
//   // const handleStatusChange = async (newStatus) => {
//   //   // This logic was incorrect. Status updates should go through the form submission.
//   //   // setEmployeeStatus(newStatus); // This only updates local state in AllEmployee, not the actual employee data or backend.
//   //   // const token = localStorage.getItem("token");
//   //   // const { data } = await axios.put(
//   //   //   "http://localhost:3000/api/v1/employee/status" // This endpoint might be wrong or incomplete
//   //   // );
//   // };

//   const statusTag = (status) => {
//     const color =
//       {
//         waiting: "orange",
//         approved: "green",
//         rejected: "red",
//       }[status] || "gray";

//     return <Tag color={color}>{status.toUpperCase()}</Tag>;
//   };

//   const columns = [
//     {
//       title: "#" ,
//       dataIndex: "index",
//       key: "index",
//       align: "center",
//       render: (_, __, index) => <Text strong>{index + 1}</Text>,
//     },
//     {
//       title: "Info",
//       key: "employmentHistory",
//       render: (_, record) => (
//         <div
//           style={{
//             paddingLeft: 0,
//             fontFamily: "Railway",
//             fontSize: "15px",
//             lineHeight: "25px",
//             textTransform: "capitalize",

//           }}
//         >
//           {/* Ensure record.image is always available or use a fallback */}
//           <div className="flex items-center">
//             <Avatar
//               size={70}
//               src={record.image || <UserOutlined />} // Fallback to UserOutlined icon if no image
//               icon={!record.image && <UserOutlined />}
//               alt="Employee Avatar"
//               className="mb-4"
//             />
//             <ul style={{ paddingLeft: 15, listStyle: "none", textTransform: "capitalize" }}>
//               <li>
//                 <Text strong></Text> {record.firstName} {record.lastName}
//               </li>
//               <li className="">
//                 <Text strong></Text>{" "}
//                 {record.employmentHistory?.[0]?.position || "N/A"}
//               </li>
//             </ul>
//           </div>
//         </div>
//       ),
//     },
//     {
//       title: "Store",
//       dataIndex: "store",
//       key: "store",
//       render: (_, record) => (
//         <div
//           style={{
//             paddingLeft: 0,
//             fontFamily: "Railway",
//             fontSize: "15px",
//             lineHeight: "27px",
//           }}
//         >
//           <li>
//             <Text strong>Batch :</Text> {record.store?.batch || "N/A"}
//             <br />
//             <Text strong>Role :</Text>{" "}
//             <Tag
//               color="blue"
//               style={{
//                 fontFamily: "Railway",
//                 borderRadius: "3px",
//                 fontSize: "14px",
//                 textTransform: "capitalize",
//               }}
//             >
//               {record.role || "N/A"}
//             </Tag>
//           </li>
//         </div>
//       ),
//     },
//     {
//       title: "Status",
//       dataIndex: "status",
//       render: statusTag,
//       // filters: [
//       //   { text: "Waiting", value: "waiting" },
//       //   { text: "Approved", value: "approved" },
//       //   { text: "Rejected", value: "rejected" },
//       // ],
//       onFilter: (value, record) => record.status === value,
//     },
//     {
//       title: "Actions",
//       key: "actions",
//       align: "center",
//       render: (_, record) => (
//         <Space>
//           <Button
//             type="primary"
//             icon={<EditOutlined />}
//             onClick={() => showEditModal(record)}
//             className="font-railway"
//           >
//             Edit
//           </Button>
//           <Button
//             danger
//             icon={<DeleteOutlined />}
//             onClick={() => handleDelete(record._id)}
//             className="font-railway "
//           >
//             Delete
//           </Button>
//         </Space>
//       ),
//     },
//   ];

//   return (
//     <div className="container mx-auto p-4">
//       {/* <Card className="shadow-md font-railway  bg-[url(/assets/images/hero.jpg)] bg-no-repeat bg-cover bg-center  bg-scroll"> */}
//       <Card className="shadow-md font-railway  ">
//         <Row gutter={[16, 16]}>
//           <Col xs={24} sm={24} md={16}>
//             {/* <Title level={3} className="text-center mb-4 font-railway">
//               All Employees
//             </Title> */}
//             <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6 ">
//               {[
//                 {
//                   title: "Employees",
//                   label: "Total number of all employees",
//                   value: employeeStats.total,
//                   icon: <MdArrowOutward className="text-lg text-[#000000a6]" />,
//                 },
//                 {
//                   title: "Inactive",
//                   label: "Currently not active",
//                   value: employeeStats.inactive,
//                   icon: <MdArrowOutward className="text-lg text-[#000000a6]" />,
//                 },
//                 {
//                   title: "Newly Joined",
//                   label: "Recently added employees",
//                   value: employeeStats.newlyJoined,
//                   icon: <MdArrowOutward className="text-lg text-[#000000a6]" />,
//                 },
//               ].map((stat, index) => (
//                     <Card key={index} className="bg-[#bdc1c641]  backdrop-invert backdrop-opacity-95 text-white relative">
//                 <div className="flex items-center justify-between mb-2">
//                     <div className="text-base font-semibold text-[#000000a6] capitalize font-railway">
//                       {stat.title}
//                     </div>
//                     {stat.icon}
//                   </div>
//                   <div className="text-[#000000a6] text-xl font-semibold">{stat.value}</div>
//                   <div className="text-[#000000a6] font-semibold">{stat.label}</div>
//                 </Card>
//               ))}
//             </div>
//             {loading ? (
//               <div className="flex justify-center items-center min-h-[200px]">
//                 <Spin size="large" />
//               </div>
//             ) : (
//               <Table
//                 columns={columns}
//                 dataSource={employeeData}
//                 rowKey={(record) => record._id}
//                 pagination={{ pageSize: 8 }}
//                 scroll={{ x: "max-content" }}
//                 bordered
//                 className="font-railway my-custom-table"
//                 onRow={(record) => ({ onClick: () => handleRowClick(record) })}

//               />
//             )}
//             <Modal
//               title="Edit Employee"
//               open={isModalOpen}
//               onCancel={() => {
//                 setIsModalOpen(false);
//                 setEditingEmployee(null);
//                 form.resetFields();
//                 setImageFile(null);
//               }}
//               footer={null}
//               width={800}
//             >
//               <Form
//                 form={form}
//                 layout="vertical"
//                 onFinish={handleEditSubmit}
//                 className="font-railway"
//               >
//                 <Row gutter={[16, 16]}>
//                   <Col xs={24} sm={12} md={8}>
//                     <Form.Item name="firstName" label="Name">
//                       <Input placeholder="Enter name" />
//                     </Form.Item>
//                   </Col>
//                   <Col xs={24} sm={12} md={8}>
//                     <Form.Item name="email" label="Email">
//                       <Input placeholder="Enter email" />
//                     </Form.Item>
//                   </Col>
//                   <Col xs={24} sm={12} md={8}>
//                     <Form.Item name="address" label="Address">
//                       <Input placeholder="Enter address" />
//                     </Form.Item>
//                   </Col>
//                   <Col xs={24} sm={12} md={8}>
//                     <Form.Item name="telephone" label="Telephone">
//                       <Input placeholder="Enter telephone" />
//                     </Form.Item>
//                   </Col>
//                   <Col xs={24} sm={12} md={8}>
//                     <Form.Item name="fatherName" label="Father Name">
//                       <Input placeholder="Enter father name" />
//                     </Form.Item>
//                   </Col>
//                   <Col xs={24} sm={12} md={8}>
//                     <Form.Item name="birthplace" label="Birthplace">
//                       <Input placeholder="Enter birthplace" />
//                     </Form.Item>
//                   </Col>
//                   <Col xs={24} sm={12} md={8}>
//                     <Form.Item name="dob" label="Date of Birth">
//                       <DatePicker
//                         format="YYYY-MM-DD"
//                         style={{ width: "100%" }}
//                       />
//                     </Form.Item>
//                   </Col>
//                   <Col xs={24} sm={12} md={8}>
//                     <Form.Item name="erpNumber" label="ERP Number">
//                       <Input placeholder="Enter ERP number" />
//                     </Form.Item>
//                   </Col>
//                   <Col xs={24} sm={12} md={8}>
//                     <Form.Item
//                       name="jobIdCardNumber"
//                       label="Job ID Card Number"
//                     >
//                       <Input placeholder="Enter job ID card number" />
//                     </Form.Item>
//                   </Col>
//                   <Col xs={24} sm={12} md={8}>
//                     <Form.Item
//                       name="educationalQualification"
//                       label="Educational Qualification"
//                     >
//                       <Input placeholder="Enter educational qualification" />
//                     </Form.Item>
//                   </Col>

//                   <Col xs={24} sm={12} md={8}>
//           <Form.Item label="Employee Store (Batch)" name="store">
//             <Select
//               options={storeOptions}
//               placeholder="Select store"
//               className="rounded-lg"
//             />
//           </Form.Item>
//         </Col>
//                   {/* Main Status Field */}
//                   <Col xs={24} sm={12} md={8}>
//                     <Form.Item name="status" label="Employee Status">
//                       <Select placeholder="Select status">
//                         <Option value="waiting">Waiting</Option>
//                         <Option value="approved">Approved</Option>
//                         <Option value="rejected">Rejected</Option>
//                       </Select>
//                     </Form.Item>
//                   </Col>
//                   <Col xs={24} sm={12} md={8}>
//                     <Form.Item label="Upload New Image">
//                       <Upload
//                         beforeUpload={() => false}
//                         onChange={handleImageChange}
//                         showUploadList={false}
//                       >
//                         <Button icon={<UploadOutlined />}>Select Image</Button>
//                       </Upload>
//                     </Form.Item>
//                   </Col>
//                 </Row>

//                 <Form.List name="employmentHistory">
//                   {(fields, { add, remove }) => (
//                     <>
//                       {fields.map(({ key, name, ...restField }) => (
//                         <div key={key} className="mb-4 p-3 border rounded">
//                           <Row gutter={[16, 16]}>
//                             <Col xs={24} sm={12} md={12} className=" ">
//                               <Form.Item
//                                 {...restField}
//                                 name={[name, "position"]}
//                                 label="Position"
//                               >
//                                 <Input placeholder="Position" />
//                               </Form.Item>
//                             </Col>
//                             <Col xs={24} sm={12} md={12}>
//                               <Form.Item
//                                 {...restField}
//                                 name={[name, "startDate"]}
//                                 label="Start Date"
//                               >
//                                 <DatePicker
//                                   format="YYYY-MM-DD"
//                                   style={{ width: "100%" }}
//                                 />
//                               </Form.Item>
//                             </Col>
//                             <Col xs={24} sm={12} md={12}>
//                               <Form.Item
//                                 {...restField}
//                                 name={[name, "endDate"]}
//                                 label="End Date"
//                               >
//                                 <DatePicker
//                                   format="YYYY-MM-DD"
//                                   style={{ width: "100%" }}
//                                 />
//                               </Form.Item>
//                             </Col>
//                           </Row>

//                           <Button
//                             danger
//                             onClick={() => remove(name)}
//                             className="mt-2"
//                           >
//                             Remove
//                           </Button>
//                         </div>
//                       ))}

//                       <Button
//                         type="dashed"
//                         onClick={() => add()}
//                         block
//                         className="mt-2"
//                       >
//                         + Add Employment Entry
//                       </Button>
//                     </>
//                   )}
//                 </Form.List>

//                 <Form.Item className="mt-6">
//                   <Button htmlType="submit" type="primary" block>
//                     Save Changes
//                   </Button>
//                 </Form.Item>
//               </Form>
//             </Modal>
//           </Col>
//           <Col xs={24} sm={8} md={8} className="mt-[0px]">
//             <Card className="shadow-md font-railway h-full bg-[#bdc1c641]  backdrop-invert backdrop-opacity-95">
//               {/* <Title level={4} className="text-center mb-4">
//                 Employee Profile
//               </Title> */}
//               {/* Pass the entire selectedEmployee object */}
//               <EmployeeProfile selectedEmployee={selectedEmployee} />
//             </Card>
//           </Col>
//         </Row>
//       </Card>
//     </div>
//   );
// };

// export default AllEmployee;
