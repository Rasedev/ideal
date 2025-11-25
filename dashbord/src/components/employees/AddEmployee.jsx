



///////////////////////TOP FINAL///////////////////////////////




import React, { useState } from "react";
import {
  Layout,
  Form,
  Input,
  Select,
  DatePicker,
  Button,
  Upload,
  message,
  Card,
  Row,
  Col,
  Typography,
  Steps,
  Divider,
  Space,
  Avatar,
  Progress
} from "antd";
import { 
  UploadOutlined, 
  UserOutlined, 
  SolutionOutlined,
  TeamOutlined,
  ArrowLeftOutlined,
  PlusOutlined 
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { useEmployees } from "../hooks/useEmployees";
import axios from "axios";
import dayjs from "dayjs";

const { Title, Text } = Typography;
const { Option } = Select;
const { TextArea } = Input;
const { Step } = Steps;

export default function AddEmployee() {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [fileList, setFileList] = useState([]);
  const [currentStep, setCurrentStep] = useState(0);
  const [previewImage, setPreviewImage] = useState("");
  const [formValues, setFormValues] = useState({}); // Store form values

  const steps = [
    {
      title: 'Personal Info',
      icon: <UserOutlined />,
      fields: ['firstName', 'email', 'dob'] // Only required fields for validation
    },
    {
      title: 'Employment Details',
      icon: <SolutionOutlined />,
      fields: ['position', 'department'] // Only required fields for validation
    },
    {
      title: 'Review & Submit',
      icon: <TeamOutlined />,
      fields: []
    }
  ];

  const beforeUpload = (file) => {
    const isImage = file.type.startsWith('image/');
    if (!isImage) {
      message.error('You can only upload image files!');
      return false;
    }
    
    const isLt5M = file.size / 1024 / 1024 < 5;
    if (!isLt5M) {
      message.error('Image must be smaller than 5MB!');
      return false;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      setPreviewImage(e.target.result);
    };
    reader.readAsDataURL(file);

    setFileList([file]);
    return false;
  };

  const handleRemove = () => {
    setFileList([]);
    setPreviewImage("");
  };

  const nextStep = async () => {
    try {
      // Get current step fields and validate them
      const currentStepFields = steps[currentStep].fields;
      const values = await form.validateFields(currentStepFields);
      
      // Update form values state
      setFormValues(prev => ({ ...prev, ...values }));
      
      setCurrentStep(currentStep + 1);
    } catch (error) {
      console.log('Validation Failed:', error);
      message.error('Please fill in all required fields before proceeding.');
    }
  };

  const prevStep = () => {
    setCurrentStep(currentStep - 1);
  };

  const handleFinish = async () => {
    try {
      // Get ALL current form values (not just validated ones)
      const currentFormValues = form.getFieldsValue(true);
      const allValues = { ...formValues, ...currentFormValues };
      
      console.log("✅ Final Form Values:", allValues);
      setLoading(true);

      const formData = new FormData();

      // ✅ EXPLICITLY ADD ALL REQUIRED FIELDS
      formData.append("firstName", allValues.firstName);
      formData.append("email", allValues.email);
      formData.append("position", allValues.position);
      formData.append("department", allValues.department);
      
      // ✅ ADD OTHER FIELDS IF THEY EXIST
      if (allValues.lastName) formData.append("lastName", allValues.lastName);
      if (allValues.phone) formData.append("phone", allValues.phone);
      if (allValues.fatherName) formData.append("fatherName", allValues.fatherName);
      if (allValues.birthplace) formData.append("birthplace", allValues.birthplace);
      if (allValues.nidNumber) formData.append("nidNumber", allValues.nidNumber);
      if (allValues.address) formData.append("address", allValues.address);
      if (allValues.educationalQualification) formData.append("educationalQualification", allValues.educationalQualification);
      if (allValues.description) formData.append("description", allValues.description);
      
      // ✅ ADD DATES
      if (allValues.dob) formData.append("dob", allValues.dob.format('YYYY-MM-DD'));
      if (allValues.joinDate) formData.append("joinDate", allValues.joinDate.format('YYYY-MM-DD'));
      
      // ✅ ADD EMPLOYMENT TYPE
      if (allValues.employmentType) formData.append("employmentType", allValues.employmentType);

      // ✅ ADD FILE
      if (fileList.length > 0) {
        formData.append("image", fileList[0]);
      }

      // Debug: Log FormData contents
      console.log("📦 FormData contents:");
      for (let [key, value] of formData.entries()) {
        console.log(`${key}:`, value);
      }

      const token = localStorage.getItem("token");
      
      // ✅ FIXED ENDPOINT
      const response = await axios.post(
        "http://localhost:3000/api/v1/employee/createemployee", // Fixed endpoint
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`
          }
        }
      );

      if (response.data.success) {
        message.success("🎉 Employee created successfully!");
        form.resetFields();
        setFileList([]);
        setPreviewImage("");
        setFormValues({});
        setCurrentStep(0);
        navigate("/allemployee");
      }
    } catch (error) {
      console.error("❌ Error:", error);
      if (error.response?.data?.message) {
        message.error(error.response.data.message);
      } else if (error.errorFields) {
        message.error('Please fill in all required fields correctly.');
      } else {
        message.error("Failed to create employee. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  const formContent = [
    // Step 0: Personal Information
    <div key="step0">
      <Row gutter={[24, 16]}>
        <Col xs={24} lg={8}>
          <div className="text-center mb-6">
            <div className="relative inline-block">
              <Avatar
                size={120}
                src={previewImage}
                icon={<UserOutlined />}
                className="border-4 border-white shadow-lg"
              />
              <Upload
                beforeUpload={beforeUpload}
                onRemove={handleRemove}
                fileList={fileList}
                accept="image/*"
                maxCount={1}
                showUploadList={false}
                className="absolute bottom-0 right-0"
              >
                <Button 
                  type="primary" 
                  shape="circle" 
                  size="small"
                  icon={<PlusOutlined />}
                  className="shadow-lg"
                />
              </Upload>
            </div>
            <Text type="secondary" className="block mt-2">
              Click + to upload profile photo
            </Text>
          </div>
        </Col>
        
        <Col xs={24} lg={16}>
          <Row gutter={[16, 16]}>
            <Col xs={24} md={12}>
              <Form.Item
                name="firstName"
                label="First Name"
                rules={[{ required: true, message: "Please enter first name" }]}
              >
                <Input 
                  size="large" 
                  placeholder="Enter first name" 
                  prefix={<UserOutlined />}
                />
              </Form.Item>
            </Col>

            <Col xs={24} md={12}>
              <Form.Item name="lastName" label="Last Name">
                <Input 
                  size="large" 
                  placeholder="Enter last name" 
                />
              </Form.Item>
            </Col>

            <Col xs={24} md={12}>
              <Form.Item
                name="email"
                label="Email Address"
                rules={[
                  { required: true, message: "Please enter email" },
                  { type: "email", message: "Please enter valid email" }
                ]}
              >
                <Input 
                  size="large" 
                  placeholder="employee@company.com" 
                  type="email"
                />
              </Form.Item>
            </Col>

            <Col xs={24} md={12}>
              <Form.Item name="phone" label="Phone Number">
                <Input 
                  size="large" 
                  placeholder="+1 (555) 123-4567" 
                />
              </Form.Item>
            </Col>

            <Col xs={24} md={12}>
              <Form.Item name="fatherName" label="Father's Name">
                <Input 
                  size="large" 
                  placeholder="Enter father's name" 
                />
              </Form.Item>
            </Col>

            <Col xs={24} md={12}>
              <Form.Item 
                name="dob" 
                label="Date of Birth"
                rules={[{ required: true, message: "Please select date of birth" }]}
              >
                <DatePicker 
                  style={{ width: "100%" }} 
                  size="large"
                  format="YYYY-MM-DD"
                />
              </Form.Item>
            </Col>

            <Col xs={24}>
              <Form.Item name="address" label="Address">
                <TextArea 
                  rows={3} 
                  placeholder="Enter complete address" 
                  showCount 
                  maxLength={200}
                />
              </Form.Item>
            </Col>
          </Row>
        </Col>
      </Row>
    </div>,

    // Step 1: Employment Details
    <div key="step1">
      <Row gutter={[16, 16]}>
        <Col xs={24} md={12}>
          <Form.Item
            name="position"
            label="Job Position"
            rules={[{ required: true, message: "Please enter position" }]}
          >
            <Input 
              size="large" 
              placeholder="e.g., Software Engineer" 
            />
          </Form.Item>
        </Col>

        <Col xs={24} md={12}>
          <Form.Item
            name="department"
            label="Department"
            rules={[{ required: true, message: "Please select department" }]}
          >
            <Select size="large" placeholder="Select department">
              <Option value="HR">Human Resources</Option>
              <Option value="IT">Information Technology</Option>
              <Option value="Finance">Finance</Option>
              <Option value="Marketing">Marketing</Option>
              <Option value="Sales">Sales</Option>
              <Option value="Operations">Operations</Option>
              <Option value="Administration">Administration</Option>
            </Select>
          </Form.Item>
        </Col>

        <Col xs={24} md={12}>
          <Form.Item 
            name="employmentType" 
            label="Employment Type"
            rules={[{ required: true, message: "Please select employment type" }]}
          >
            <Select size="large" placeholder="Select employment type">
              <Option value="full-time">Full Time</Option>
              <Option value="part-time">Part Time</Option>
              <Option value="contract">Contract</Option>
              <Option value="intern">Internship</Option>
            </Select>
          </Form.Item>
        </Col>

        <Col xs={24} md={12}>
          <Form.Item 
            name="joinDate" 
            label="Join Date"
            rules={[{ required: true, message: "Please select join date" }]}
          >
            <DatePicker 
              style={{ width: "100%" }} 
              size="large"
              format="YYYY-MM-DD"
            />
          </Form.Item>
        </Col>

        <Col xs={24} md={12}>
          <Form.Item name="educationalQualification" label="Education">
            <Input 
              size="large" 
              placeholder="Highest qualification" 
            />
          </Form.Item>
        </Col>

        <Col xs={24} md={12}>
          <Form.Item name="nidNumber" label="National ID">
            <Input 
              size="large" 
              placeholder="Enter NID number" 
            />
          </Form.Item>
        </Col>

        <Col xs={24}>
          <Form.Item name="description" label="Additional Information">
            <TextArea 
              rows={4} 
              placeholder="Any additional information about the employee..."
              showCount 
              maxLength={500}
            />
          </Form.Item>
        </Col>
      </Row>
    </div>,

    // Step 2: Review & Submit
    <div key="step2">
      <Card title="Review Employee Information" className="mb-4">
        <Row gutter={[16, 16]}>
          <Col xs={24} md={12}>
            <div className="space-y-3">
              <div>
                <Text strong>Personal Information</Text>
                <Divider className="my-2" />
                <div className="space-y-2">
                  <div><Text type="secondary">Name:</Text> {form.getFieldValue('firstName')} {form.getFieldValue('lastName')}</div>
                  <div><Text type="secondary">Email:</Text> {form.getFieldValue('email')}</div>
                  <div><Text type="secondary">Phone:</Text> {form.getFieldValue('phone') || 'Not provided'}</div>
                  <div><Text type="secondary">Date of Birth:</Text> {form.getFieldValue('dob')?.format('YYYY-MM-DD')}</div>
                  <div><Text type="secondary">Address:</Text> {form.getFieldValue('address') || 'Not provided'}</div>
                </div>
              </div>
            </div>
          </Col>
          
          <Col xs={24} md={12}>
            <div className="space-y-3">
              <div>
                <Text strong>Employment Details</Text>
                <Divider className="my-2" />
                <div className="space-y-2">
                  <div><Text type="secondary">Position:</Text> {form.getFieldValue('position')}</div>
                  <div><Text type="secondary">Department:</Text> {form.getFieldValue('department')}</div>
                  <div><Text type="secondary">Employment Type:</Text> {form.getFieldValue('employmentType')}</div>
                  <div><Text type="secondary">Join Date:</Text> {form.getFieldValue('joinDate')?.format('YYYY-MM-DD')}</div>
                  <div><Text type="secondary">Education:</Text> {form.getFieldValue('educationalQualification') || 'Not provided'}</div>
                  <div><Text type="secondary">NID:</Text> {form.getFieldValue('nidNumber') || 'Not provided'}</div>
                </div>
              </div>
            </div>
          </Col>
        </Row>
        
        {form.getFieldValue('description') && (
          <div className="mt-4">
            <Text strong>Additional Information</Text>
            <Divider className="my-2" />
            <Text>{form.getFieldValue('description')}</Text>
          </div>
        )}
      </Card>
    </div>
  ];

  return (
    <Layout style={{ padding: 24, minHeight: "100vh", background: "#f5f5f5" }}>
      <Card 
        className="shadow-lg rounded-xl"
        styles={{ body: { padding: 0 } }}
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-800 p-6 rounded-t-xl">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Button 
                type="text" 
                icon={<ArrowLeftOutlined />} 
                onClick={() => navigate("/allemployee")}
                className="text-white hover:bg-blue-700"
                size="large"
              />
              <div>
                <Title level={3} className="!mb-1 !text-white">
                  Add New Employee
                </Title>
                <Text className="text-blue-100">
                  Complete the form to add a new team member
                </Text>
              </div>
            </div>
            <div className="text-right">
              <Text className="text-blue-200 block">Step {currentStep + 1} of {steps.length}</Text>
              <Progress 
                percent={((currentStep + 1) / steps.length) * 100} 
                showInfo={false}
                strokeColor="#ffffff"
                className="mt-1"
              />
            </div>
          </div>
        </div>

        {/* Steps */}
        <div className="p-6 border-b">
          <Steps current={currentStep} size="small">
            {steps.map((step, index) => (
              <Step key={index} title={step.title} icon={step.icon} />
            ))}
          </Steps>
        </div>

        {/* Form Content */}
        <div className="p-6">
          <Form
            form={form}
            layout="vertical"
            initialValues={{
              employmentType: "full-time",
              joinDate: dayjs()
            }}
            // Remove onFinish - we're handling submission manually
          >
            {formContent[currentStep]}

            {/* Navigation Buttons */}
            <div className="flex justify-between mt-8 pt-6 border-t">
              <Button
                size="large"
                onClick={currentStep === 0 ? () => navigate("/allemployee") : prevStep}
                disabled={loading}
              >
                {currentStep === 0 ? "Cancel" : "Previous"}
              </Button>
              
              <Space>
                {currentStep < steps.length - 1 && (
                  <Button type="primary" size="large" onClick={nextStep}>
                    Next Step
                  </Button>
                )}
                {currentStep === steps.length - 1 && (
                  <Button 
                    type="primary" 
                    size="large" 
                    onClick={handleFinish}
                    loading={loading}
                    icon={<TeamOutlined />}
                  >
                    Create Employee
                  </Button>
                )}
              </Space>
            </div>
          </Form>
        </div>
      </Card>
    </Layout>
  );
}



// components/AddEmployee.js (UPDATED VERSION)


// import React, { useState } from "react";
// import {
//   Layout,
//   Form,
//   Input,
//   Select,
//   DatePicker,
//   Button,
//   Upload,
//   message,
//   Card,
//   Row,
//   Col,
//   Typography,
//   Steps,
//   Divider,
//   Space,
//   Avatar,
//   Progress
// } from "antd";
// import { 
//   UploadOutlined, 
//   UserOutlined, 
//   SolutionOutlined,
//   TeamOutlined,
//   ArrowLeftOutlined,
//   PlusOutlined 
// } from "@ant-design/icons";
// import { useNavigate } from "react-router-dom";
// import { useEmployees } from "../hooks/useEmployees";
// import dayjs from "dayjs";

// const { Title, Text } = Typography;
// const { Option } = Select;
// const { TextArea } = Input;
// const { Step } = Steps;

// export default function AddEmployee() {
//   const [form] = Form.useForm();
//   const navigate = useNavigate();
//   const [fileList, setFileList] = useState([]);
//   const [currentStep, setCurrentStep] = useState(0);
//   const [previewImage, setPreviewImage] = useState("");
//   const [formValues, setFormValues] = useState({});

//   // ✅ USE REDUX HOOK
//   const { createEmployee, loading } = useEmployees();

//   const steps = [
//     {
//       title: 'Personal Info',
//       icon: <UserOutlined />,
//       fields: ['firstName', 'email', 'dob']
//     },
//     {
//       title: 'Employment Details',
//       icon: <SolutionOutlined />,
//       fields: ['position', 'department']
//     },
//     {
//       title: 'Review & Submit',
//       icon: <TeamOutlined />,
//       fields: []
//     }
//   ];

//   const beforeUpload = (file) => {
//     const isImage = file.type.startsWith('image/');
//     if (!isImage) {
//       message.error('You can only upload image files!');
//       return false;
//     }
    
//     const isLt5M = file.size / 1024 / 1024 < 5;
//     if (!isLt5M) {
//       message.error('Image must be smaller than 5MB!');
//       return false;
//     }

//     const reader = new FileReader();
//     reader.onload = (e) => {
//       setPreviewImage(e.target.result);
//     };
//     reader.readAsDataURL(file);

//     setFileList([file]);
//     return false;
//   };

//   const handleRemove = () => {
//     setFileList([]);
//     setPreviewImage("");
//   };

//   const nextStep = async () => {
//     try {
//       const currentStepFields = steps[currentStep].fields;
//       const values = await form.validateFields(currentStepFields);
//       setFormValues(prev => ({ ...prev, ...values }));
//       setCurrentStep(currentStep + 1);
//     } catch (error) {
//       message.error('Please fill in all required fields before proceeding.');
//     }
//   };

//   const prevStep = () => {
//     setCurrentStep(currentStep - 1);
//   };

//   const handleFinish = async () => {
//     try {
//       const currentFormValues = form.getFieldsValue(true);
//       const allValues = { ...formValues, ...currentFormValues };
      
//       const formData = new FormData();

//       // Add all form fields to FormData
//       formData.append("firstName", allValues.firstName);
//       formData.append("email", allValues.email);
//       formData.append("position", allValues.position);
//       formData.append("department", allValues.department);
      
//       if (allValues.lastName) formData.append("lastName", allValues.lastName);
//       if (allValues.phone) formData.append("phone", allValues.phone);
//       if (allValues.fatherName) formData.append("fatherName", allValues.fatherName);
//       if (allValues.birthplace) formData.append("birthplace", allValues.birthplace);
//       if (allValues.nidNumber) formData.append("nidNumber", allValues.nidNumber);
//       if (allValues.address) formData.append("address", allValues.address);
//       if (allValues.educationalQualification) formData.append("educationalQualification", allValues.educationalQualification);
//       if (allValues.description) formData.append("description", allValues.description);
      
//       if (allValues.dob) formData.append("dob", allValues.dob.format('YYYY-MM-DD'));
//       if (allValues.joinDate) formData.append("joinDate", allValues.joinDate.format('YYYY-MM-DD'));
      
//       if (allValues.employmentType) formData.append("employmentType", allValues.employmentType);

//       if (fileList.length > 0) {
//         formData.append("image", fileList[0]);
//       }

//       // ✅ USE REDUX ACTION INSTEAD OF DIRECT API CALL
//       await createEmployee(formData);

//       // Reset form and navigate on success
//       form.resetFields();
//       setFileList([]);
//       setPreviewImage("");
//       setFormValues({});
//       setCurrentStep(0);
//       navigate("/allemployee");

//     } catch (error) {
//       // Error is handled in the Redux action
//       console.error("Employee creation error:", error);
//     }
//   };

//     const formContent = [
//     // Step 0: Personal Information
//     <div key="step0">
//       <Row gutter={[24, 16]}>
//         <Col xs={24} lg={8}>
//           <div className="text-center mb-6">
//             <div className="relative inline-block">
//               <Avatar
//                 size={120}
//                 src={previewImage}
//                 icon={<UserOutlined />}
//                 className="border-4 border-white shadow-lg"
//               />
//               <Upload
//                 beforeUpload={beforeUpload}
//                 onRemove={handleRemove}
//                 fileList={fileList}
//                 accept="image/*"
//                 maxCount={1}
//                 showUploadList={false}
//                 className="absolute bottom-0 right-0"
//               >
//                 <Button 
//                   type="primary" 
//                   shape="circle" 
//                   size="small"
//                   icon={<PlusOutlined />}
//                   className="shadow-lg"
//                 />
//               </Upload>
//             </div>
//             <Text type="secondary" className="block mt-2">
//               Click + to upload profile photo
//             </Text>
//           </div>
//         </Col>
        
//         <Col xs={24} lg={16}>
//           <Row gutter={[16, 16]}>
//             <Col xs={24} md={12}>
//               <Form.Item
//                 name="firstName"
//                 label="First Name"
//                 rules={[{ required: true, message: "Please enter first name" }]}
//               >
//                 <Input 
//                   size="large" 
//                   placeholder="Enter first name" 
//                   prefix={<UserOutlined />}
//                 />
//               </Form.Item>
//             </Col>

//             <Col xs={24} md={12}>
//               <Form.Item name="lastName" label="Last Name">
//                 <Input 
//                   size="large" 
//                   placeholder="Enter last name" 
//                 />
//               </Form.Item>
//             </Col>

//             <Col xs={24} md={12}>
//               <Form.Item
//                 name="email"
//                 label="Email Address"
//                 rules={[
//                   { required: true, message: "Please enter email" },
//                   { type: "email", message: "Please enter valid email" }
//                 ]}
//               >
//                 <Input 
//                   size="large" 
//                   placeholder="employee@company.com" 
//                   type="email"
//                 />
//               </Form.Item>
//             </Col>

//             <Col xs={24} md={12}>
//               <Form.Item name="phone" label="Phone Number">
//                 <Input 
//                   size="large" 
//                   placeholder="+1 (555) 123-4567" 
//                 />
//               </Form.Item>
//             </Col>

//             <Col xs={24} md={12}>
//               <Form.Item name="fatherName" label="Father's Name">
//                 <Input 
//                   size="large" 
//                   placeholder="Enter father's name" 
//                 />
//               </Form.Item>
//             </Col>

//             <Col xs={24} md={12}>
//               <Form.Item 
//                 name="dob" 
//                 label="Date of Birth"
//                 rules={[{ required: true, message: "Please select date of birth" }]}
//               >
//                 <DatePicker 
//                   style={{ width: "100%" }} 
//                   size="large"
//                   format="YYYY-MM-DD"
//                 />
//               </Form.Item>
//             </Col>

//             <Col xs={24}>
//               <Form.Item name="address" label="Address">
//                 <TextArea 
//                   rows={3} 
//                   placeholder="Enter complete address" 
//                   showCount 
//                   maxLength={200}
//                 />
//               </Form.Item>
//             </Col>
//           </Row>
//         </Col>
//       </Row>
//     </div>,

//     // Step 1: Employment Details
//     <div key="step1">
//       <Row gutter={[16, 16]}>
//         <Col xs={24} md={12}>
//           <Form.Item
//             name="position"
//             label="Job Position"
//             rules={[{ required: true, message: "Please enter position" }]}
//           >
//             <Input 
//               size="large" 
//               placeholder="e.g., Software Engineer" 
//             />
//           </Form.Item>
//         </Col>

//         <Col xs={24} md={12}>
//           <Form.Item
//             name="department"
//             label="Department"
//             rules={[{ required: true, message: "Please select department" }]}
//           >
//             <Select size="large" placeholder="Select department">
//               <Option value="HR">Human Resources</Option>
//               <Option value="IT">Information Technology</Option>
//               <Option value="Finance">Finance</Option>
//               <Option value="Marketing">Marketing</Option>
//               <Option value="Sales">Sales</Option>
//               <Option value="Operations">Operations</Option>
//               <Option value="Administration">Administration</Option>
//             </Select>
//           </Form.Item>
//         </Col>

//         <Col xs={24} md={12}>
//           <Form.Item 
//             name="employmentType" 
//             label="Employment Type"
//             rules={[{ required: true, message: "Please select employment type" }]}
//           >
//             <Select size="large" placeholder="Select employment type">
//               <Option value="full-time">Full Time</Option>
//               <Option value="part-time">Part Time</Option>
//               <Option value="contract">Contract</Option>
//               <Option value="intern">Internship</Option>
//             </Select>
//           </Form.Item>
//         </Col>

//         <Col xs={24} md={12}>
//           <Form.Item 
//             name="joinDate" 
//             label="Join Date"
//             rules={[{ required: true, message: "Please select join date" }]}
//           >
//             <DatePicker 
//               style={{ width: "100%" }} 
//               size="large"
//               format="YYYY-MM-DD"
//             />
//           </Form.Item>
//         </Col>

//         <Col xs={24} md={12}>
//           <Form.Item name="educationalQualification" label="Education">
//             <Input 
//               size="large" 
//               placeholder="Highest qualification" 
//             />
//           </Form.Item>
//         </Col>

//         <Col xs={24} md={12}>
//           <Form.Item name="nidNumber" label="National ID">
//             <Input 
//               size="large" 
//               placeholder="Enter NID number" 
//             />
//           </Form.Item>
//         </Col>

//         <Col xs={24}>
//           <Form.Item name="description" label="Additional Information">
//             <TextArea 
//               rows={4} 
//               placeholder="Any additional information about the employee..."
//               showCount 
//               maxLength={500}
//             />
//           </Form.Item>
//         </Col>
//       </Row>
//     </div>,

//     // Step 2: Review & Submit
//     <div key="step2">
//       <Card title="Review Employee Information" className="mb-4">
//         <Row gutter={[16, 16]}>
//           <Col xs={24} md={12}>
//             <div className="space-y-3">
//               <div>
//                 <Text strong>Personal Information</Text>
//                 <Divider className="my-2" />
//                 <div className="space-y-2">
//                   <div><Text type="secondary">Name:</Text> {form.getFieldValue('firstName')} {form.getFieldValue('lastName')}</div>
//                   <div><Text type="secondary">Email:</Text> {form.getFieldValue('email')}</div>
//                   <div><Text type="secondary">Phone:</Text> {form.getFieldValue('phone') || 'Not provided'}</div>
//                   <div><Text type="secondary">Date of Birth:</Text> {form.getFieldValue('dob')?.format('YYYY-MM-DD')}</div>
//                   <div><Text type="secondary">Address:</Text> {form.getFieldValue('address') || 'Not provided'}</div>
//                 </div>
//               </div>
//             </div>
//           </Col>
          
//           <Col xs={24} md={12}>
//             <div className="space-y-3">
//               <div>
//                 <Text strong>Employment Details</Text>
//                 <Divider className="my-2" />
//                 <div className="space-y-2">
//                   <div><Text type="secondary">Position:</Text> {form.getFieldValue('position')}</div>
//                   <div><Text type="secondary">Department:</Text> {form.getFieldValue('department')}</div>
//                   <div><Text type="secondary">Employment Type:</Text> {form.getFieldValue('employmentType')}</div>
//                   <div><Text type="secondary">Join Date:</Text> {form.getFieldValue('joinDate')?.format('YYYY-MM-DD')}</div>
//                   <div><Text type="secondary">Education:</Text> {form.getFieldValue('educationalQualification') || 'Not provided'}</div>
//                   <div><Text type="secondary">NID:</Text> {form.getFieldValue('nidNumber') || 'Not provided'}</div>
//                 </div>
//               </div>
//             </div>
//           </Col>
//         </Row>
        
//         {form.getFieldValue('description') && (
//           <div className="mt-4">
//             <Text strong>Additional Information</Text>
//             <Divider className="my-2" />
//             <Text>{form.getFieldValue('description')}</Text>
//           </div>
//         )}
//       </Card>
//     </div>
//      ];

//   return (
//     <Layout style={{ padding: 24, minHeight: "100vh", background: "#f5f5f5" }}>
//       <Card className="shadow-lg rounded-xl" styles={{ body: { padding: 0 } }}>
//         {/* Header */}
//         <div className="bg-gradient-to-r from-blue-600 to-blue-800 p-6 rounded-t-xl">
//           <div className="flex items-center justify-between">
//             <div className="flex items-center space-x-4">
//               <Button 
//                 type="text" 
//                 icon={<ArrowLeftOutlined />} 
//                 onClick={() => navigate("/allemployee")}
//                 className="text-white hover:bg-blue-700"
//                 size="large"
//               />
//               <div>
//                 <Title level={3} className="!mb-1 !text-white">
//                   Add New Employee
//                 </Title>
//                 <Text className="text-blue-100">
//                   Complete the form to add a new team member
//                 </Text>
//               </div>
//             </div>
//             <div className="text-right">
//               <Text className="text-blue-200 block">Step {currentStep + 1} of {steps.length}</Text>
//               <Progress 
//                 percent={((currentStep + 1) / steps.length) * 100} 
//                 showInfo={false}
//                 strokeColor="#ffffff"
//                 className="mt-1"
//               />
//             </div>
//           </div>
//         </div>

//         {/* Steps and Form Content - Keep your existing JSX */}
//         <div className="p-6 border-b">
//           <Steps current={currentStep} size="small">
//             {steps.map((step, index) => (
//               <Step key={index} title={step.title} icon={step.icon} />
//             ))}
//           </Steps>
//         </div>

//         <div className="p-6">
//           <Form
//             form={form}
//             layout="vertical"
//             initialValues={{
//               employmentType: "full-time",
//               joinDate: dayjs()
//             }}
//           >
//             {/* Your form content JSX remains the same */}
            
//             {/* Navigation Buttons - Use loading from Redux */}
//             <div className="flex justify-between mt-8 pt-6 border-t">
//               <Button
//                 size="large"
//                 onClick={currentStep === 0 ? () => navigate("/allemployee") : prevStep}
//                 disabled={loading}
//               >
//                 {currentStep === 0 ? "Cancel" : "Previous"}
//               </Button>
              
//               <Space>
//                 {currentStep < steps.length - 1 && (
//                   <Button type="primary" size="large" onClick={nextStep}>
//                     Next Step
//                   </Button>
//                 )}
//                 {currentStep === steps.length - 1 && (
//                   <Button 
//                     type="primary" 
//                     size="large" 
//                     onClick={handleFinish}
//                     loading={loading}
//                     icon={<TeamOutlined />}
//                   >
//                     Create Employee
//                   </Button>
//                 )}
//               </Space>
//             </div>
//           </Form>
//         </div>
//       </Card>
//     </Layout>
//   );
// }





//////////////////////SINGLE FORM FINAL/////////////////////////////



// import React, { useState } from "react";
// import {
//   Layout,
//   Form,
//   Input,
//   Select,
//   DatePicker,
//   Button,
//   Upload,
//   message,
//   Card,
//   Row,
//   Col,
//   Typography,
//   Space,
//   Avatar,
//   Divider
// } from "antd";
// import { 
//   UploadOutlined, 
//   UserOutlined,
//   TeamOutlined,
//   ArrowLeftOutlined,
//   MailOutlined,
//   PhoneOutlined,
//   EnvironmentOutlined
// } from "@ant-design/icons";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";
// import dayjs from "dayjs";

// const { Title, Text } = Typography;
// const { Option } = Select;
// const { TextArea } = Input;

// export default function AddEmployee() {
//   const [form] = Form.useForm();
//   const navigate = useNavigate();
//   const [loading, setLoading] = useState(false);
//   const [fileList, setFileList] = useState([]);
//   const [previewImage, setPreviewImage] = useState("");

//   const beforeUpload = (file) => {
//     const isImage = file.type.startsWith('image/');
//     if (!isImage) {
//       message.error('You can only upload image files!');
//       return false;
//     }
    
//     const isLt5M = file.size / 1024 / 1024 < 5;
//     if (!isLt5M) {
//       message.error('Image must be smaller than 5MB!');
//       return false;
//     }

//     // Create preview
//     const reader = new FileReader();
//     reader.onload = (e) => {
//       setPreviewImage(e.target.result);
//     };
//     reader.readAsDataURL(file);

//     setFileList([file]);
//     return false;
//   };

//   const handleRemove = () => {
//     setFileList([]);
//     setPreviewImage("");
//   };

//   const handleFinish = async (values) => {
//     console.log("✅ Final Form Values:", values);
//     setLoading(true);

//     try {
//       const formData = new FormData();

//       // ✅ ADD ALL FIELDS EXPLICITLY
//       formData.append("firstName", values.firstName);
//       formData.append("email", values.email);
//       formData.append("position", values.position);
//       formData.append("department", values.department);
      
//       // Add other fields if they exist
//       if (values.lastName) formData.append("lastName", values.lastName);
//       if (values.phone) formData.append("phone", values.phone);
//       if (values.fatherName) formData.append("fatherName", values.fatherName);
//       if (values.birthplace) formData.append("birthplace", values.birthplace);
//       if (values.nidNumber) formData.append("nidNumber", values.nidNumber);
//       if (values.address) formData.append("address", values.address);
//       if (values.educationalQualification) formData.append("educationalQualification", values.educationalQualification);
//       if (values.description) formData.append("description", values.description);
      
//       // Add dates
//       if (values.dob) formData.append("dob", values.dob.format('YYYY-MM-DD'));
//       if (values.joinDate) formData.append("joinDate", values.joinDate.format('YYYY-MM-DD'));
      
//       // Add employment type
//       if (values.employmentType) formData.append("employmentType", values.employmentType);

//       // Add file if exists
//       if (fileList.length > 0) {
//         formData.append("image", fileList[0]);
//       }

//       // Debug: Log FormData contents
//       console.log("📦 FormData contents:");
//       for (let [key, value] of formData.entries()) {
//         console.log(`${key}:`, value);
//       }

//       const token = localStorage.getItem("token");
//       const response = await axios.post(
//         "http://localhost:3000/api/v1/employee/createemployee",
//         formData,
//         {
//           headers: {
//             "Content-Type": "multipart/form-data",
//             Authorization: `Bearer ${token}`
//           }
//         }
//       );

//       if (response.data.success) {
//         message.success("🎉 Employee created successfully!");
//         form.resetFields();
//         setFileList([]);
//         setPreviewImage("");
//         navigate("/allemployee");
//       }
//     } catch (error) {
//       console.error("❌ Error:", error);
//       if (error.response?.data?.message) {
//         message.error(error.response.data.message);
//       } else {
//         message.error("Failed to create employee. Please check all required fields.");
//       }
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <Layout style={{ padding: 24, minHeight: "100vh", background: "#f5f5f5" }}>
//       <Card 
//         className="shadow-lg rounded-xl"
//         styles={{ body: { padding: 0 } }}
//       >
//         {/* Header */}
//         <div className="bg-gradient-to-r from-blue-600 to-blue-800 p-6 rounded-t-xl">
//           <div className="flex items-center space-x-4">
//             <Button 
//               type="text" 
//               icon={<ArrowLeftOutlined />} 
//               onClick={() => navigate("/allemployee")}
//               className="text-white hover:bg-blue-700"
//               size="large"
//             />
//             <div>
//               <Title level={3} className="!mb-1 !text-white">
//                 Add New Employee
//               </Title>
//               <Text className="text-blue-100">
//                 Fill in all required fields to add a new team member
//               </Text>
//             </div>
//           </div>
//         </div>

//         {/* Form Content */}
//         <div className="p-6">
//           <Form
//             form={form}
//             layout="vertical"
//             onFinish={handleFinish}
//             initialValues={{
//               employmentType: "full-time",
//               joinDate: dayjs()
//             }}
//             validateMessages={{
//               required: '${label} is required!',
//               types: {
//                 email: '${label} is not a valid email!',
//               },
//             }}
//           >
//             <Row gutter={[24, 16]}>
//               {/* Profile Photo Section */}
//               <Col xs={24} lg={8}>
//                 <Card className="text-center h-full">
//                   <div className="relative inline-block mb-4">
//                     <Avatar
//                       size={140}
//                       src={previewImage}
//                       icon={<UserOutlined />}
//                       className="border-4 border-blue-100 shadow-lg"
//                     />
//                   </div>
//                   <Upload
//                     beforeUpload={beforeUpload}
//                     onRemove={handleRemove}
//                     fileList={fileList}
//                     accept="image/*"
//                     maxCount={1}
//                     showUploadList={false}
//                   >
//                     <Button 
//                       type="dashed" 
//                       icon={<UploadOutlined />}
//                       size="large"
//                     >
//                       Upload Photo
//                     </Button>
//                   </Upload>
//                   <Text type="secondary" className="block mt-2">
//                     Optional - JPG, PNG (Max 5MB)
//                   </Text>
//                 </Card>
//               </Col>
              
//               {/* Form Fields Section */}
//               <Col xs={24} lg={16}>
//                 <Row gutter={[16, 16]}>
                  
//                   {/* 🔥 REQUIRED FIELDS */}
//                   <Col xs={24}>
//                     <Divider orientation="left">
//                       <Text strong style={{ color: '#ff4d4f' }}>Required Information *</Text>
//                     </Divider>
//                   </Col>

//                   <Col xs={24} md={12}>
//                     <Form.Item
//                       name="firstName"
//                       label="First Name"
//                       rules={[{ required: true }]}
//                     >
//                       <Input 
//                         size="large" 
//                         placeholder="Enter first name" 
//                         prefix={<UserOutlined />}
//                       />
//                     </Form.Item>
//                   </Col>

//                   <Col xs={24} md={12}>
//                     <Form.Item
//                       name="email"
//                       label="Email Address"
//                       rules={[{ required: true, type: 'email' }]}
//                     >
//                       <Input 
//                         size="large" 
//                         placeholder="employee@company.com" 
//                         prefix={<MailOutlined />}
//                       />
//                     </Form.Item>
//                   </Col>

//                   <Col xs={24} md={12}>
//                     <Form.Item
//                       name="position"
//                       label="Job Position"
//                       rules={[{ required: true }]}
//                     >
//                       <Input 
//                         size="large" 
//                         placeholder="e.g., Software Engineer" 
//                       />
//                     </Form.Item>
//                   </Col>

//                   <Col xs={24} md={12}>
//                     <Form.Item
//                       name="department"
//                       label="Department"
//                       rules={[{ required: true }]}
//                     >
//                       <Select size="large" placeholder="Select department">
//                         <Option value="HR">Human Resources</Option>
//                         <Option value="IT">Information Technology</Option>
//                         <Option value="Finance">Finance</Option>
//                         <Option value="Marketing">Marketing</Option>
//                         <Option value="Sales">Sales</Option>
//                         <Option value="Operations">Operations</Option>
//                         <Option value="Administration">Administration</Option>
//                       </Select>
//                     </Form.Item>
//                   </Col>

//                   {/* Personal Information */}
//                   <Col xs={24}>
//                     <Divider orientation="left">
//                       <Text strong>Personal Information</Text>
//                     </Divider>
//                   </Col>

//                   <Col xs={24} md={12}>
//                     <Form.Item name="lastName" label="Last Name">
//                       <Input 
//                         size="large" 
//                         placeholder="Enter last name" 
//                       />
//                     </Form.Item>
//                   </Col>

//                   <Col xs={24} md={12}>
//                     <Form.Item name="phone" label="Phone Number">
//                       <Input 
//                         size="large" 
//                         placeholder="+1 (555) 123-4567" 
//                         prefix={<PhoneOutlined />}
//                       />
//                     </Form.Item>
//                   </Col>

//                   <Col xs={24} md={12}>
//                     <Form.Item name="fatherName" label="Father's Name">
//                       <Input 
//                         size="large" 
//                         placeholder="Enter father's name" 
//                       />
//                     </Form.Item>
//                   </Col>

//                   <Col xs={24} md={12}>
//                     <Form.Item 
//                       name="dob" 
//                       label="Date of Birth"
//                       rules={[{ required: true }]}
//                     >
//                       <DatePicker 
//                         style={{ width: "100%" }} 
//                         size="large"
//                         format="YYYY-MM-DD"
//                       />
//                     </Form.Item>
//                   </Col>

//                   <Col xs={24} md={12}>
//                     <Form.Item name="nidNumber" label="National ID">
//                       <Input 
//                         size="large" 
//                         placeholder="Enter NID number" 
//                       />
//                     </Form.Item>
//                   </Col>

//                   <Col xs={24} md={12}>
//                     <Form.Item name="birthplace" label="Birthplace">
//                       <Input 
//                         size="large" 
//                         placeholder="Enter birthplace" 
//                       />
//                     </Form.Item>
//                   </Col>

//                   <Col xs={24}>
//                     <Form.Item name="address" label="Address">
//                       <TextArea 
//                         rows={3} 
//                         placeholder="Enter complete address" 
//                         prefix={<EnvironmentOutlined />}
//                         showCount 
//                         maxLength={200}
//                       />
//                     </Form.Item>
//                   </Col>

//                   {/* Employment Details */}
//                   <Col xs={24}>
//                     <Divider orientation="left">
//                       <Text strong>Employment Details</Text>
//                     </Divider>
//                   </Col>

//                   <Col xs={24} md={12}>
//                     <Form.Item 
//                       name="employmentType" 
//                       label="Employment Type"
//                       rules={[{ required: true }]}
//                     >
//                       <Select size="large" placeholder="Select employment type">
//                         <Option value="full-time">Full Time</Option>
//                         <Option value="part-time">Part Time</Option>
//                         <Option value="contract">Contract</Option>
//                         <Option value="intern">Internship</Option>
//                       </Select>
//                     </Form.Item>
//                   </Col>

//                   <Col xs={24} md={12}>
//                     <Form.Item 
//                       name="joinDate" 
//                       label="Join Date"
//                       rules={[{ required: true }]}
//                     >
//                       <DatePicker 
//                         style={{ width: "100%" }} 
//                         size="large"
//                         format="YYYY-MM-DD"
//                       />
//                     </Form.Item>
//                   </Col>

//                   <Col xs={24}>
//                     <Form.Item name="educationalQualification" label="Educational Qualification">
//                       <Input 
//                         size="large" 
//                         placeholder="Highest qualification" 
//                       />
//                     </Form.Item>
//                   </Col>

//                   <Col xs={24}>
//                     <Form.Item name="description" label="Additional Information">
//                       <TextArea 
//                         rows={4} 
//                         placeholder="Any additional information about the employee..."
//                         showCount 
//                         maxLength={500}
//                       />
//                     </Form.Item>
//                   </Col>
//                 </Row>
//               </Col>
//             </Row>

//             {/* Submit Button */}
//             <div className="flex justify-end space-x-4 mt-8 pt-6 border-t">
//               <Button
//                 size="large"
//                 onClick={() => navigate("/allemployee")}
//                 disabled={loading}
//               >
//                 Cancel
//               </Button>
              
//               <Button 
//                 type="primary" 
//                 size="large" 
//                 htmlType="submit" 
//                 loading={loading}
//                 icon={<TeamOutlined />}
//                 style={{ minWidth: 150 }}
//               >
//                 Create Employee
//               </Button>
//             </div>
//           </Form>
//         </div>
//       </Card>
//     </Layout>
//   );
// }


