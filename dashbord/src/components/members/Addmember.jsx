//////////////FIRST FINAL/////////////////////////

// import React, { useState } from 'react';
// import {
//   Card,
//   Form,
//   Input,
//   Select,
//   DatePicker,
//   Upload,
//   Button,
//   Row,
//   Col,
//   message,
//   Divider,
//   Space,
//   Switch,
//   Typography,
// } from 'antd';
// import {
//   UserOutlined,
//   MailOutlined,
//   PhoneOutlined,
//   HomeOutlined,
//   IdcardOutlined,
//   UploadOutlined,
//   TeamOutlined,
// } from '@ant-design/icons';
// import { useSelector } from 'react-redux';
// import axios from 'axios';

// const { Title, Text } = Typography;
// const { Option } = Select;
// const { TextArea } = Input;

// const AddMember = () => {
//   const [form] = Form.useForm();
//   const [loading, setLoading] = useState(false);
//   const [fileList, setFileList] = useState([]);
//   const currentTheme = useSelector((state) => state.theme?.currentTheme || 'light');

//   const roleOptions = [
//     "President", "ExecutivePresident", "VicePresident",
//     "GeneralSecretary", "JointSecretary", "OrganizingSecretary",
//     "FinanceSecretary", "PublicitySecretary", "OfficeSecretary",
//     "SocialWelfareSecretary", "LegalSecretary", "ReligiousSecretary",
//     "CulturalSecretary", "WomenAffairsSecretary", "EnvironmentalSecretary",
//     "ExecutiveMember", "Member", "PlotOwner"
//   ];

//   const membershipTypeOptions = [
//     { value: 'General', label: 'General Member' },
//     { value: 'Life', label: 'Life Member' },
//     { value: 'Honorary', label: 'Honorary Member' },
//     { value: 'Associate', label: 'Associate Member' },
//   ];

//   const handleImageChange = ({ fileList: newFileList }) => {
//     setFileList(newFileList.slice(-1));
//   };

//   const onFinish = async (values) => {
//     setLoading(true);
//     try {
//       const formData = new FormData();

//       // Append basic user data
//       Object.keys(values).forEach(key => {
//         if (values[key] !== undefined && values[key] !== null) {
//           if (key === 'dob' || key === 'membershipDate') {
//             formData.append(key, values[key].format('YYYY-MM-DD'));
//           } else {
//             formData.append(key, values[key]);
//           }
//         }
//       });

//       // Append image if exists
//       if (fileList[0]?.originFileObj) {
//         formData.append('profilePhoto', fileList[0].originFileObj);
//       }

//       const token = localStorage.getItem('token');
//       const response = await axios.post(
//         'http://localhost:3000/api/v1/member/createmember',
//         formData,
//         {
//           headers: {
//             'Content-Type': 'multipart/form-data',
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );

//       if (response.data.success) {
//         message.success('Member added successfully!');
//         form.resetFields();
//         setFileList([]);
//       }
//     } catch (error) {
//       message.error(error.response?.data?.message || 'Failed to add member');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const cardClass = currentTheme === 'dark'
//     ? 'bg-gray-800 border-gray-700'
//     : 'bg-white';

//   return (
//     <div className="min-h-screen p-4">
//       <Card className={`shadow-xl rounded-2xl ${cardClass}`}>
//         <div className="text-center mb-8">
//           <Title level={2} className={currentTheme === 'dark' ? 'text-white' : 'text-gray-800'}>
//             <TeamOutlined className="mr-3" />
//             Add New Member
//           </Title>
//           <Text className={currentTheme === 'dark' ? 'text-gray-300' : 'text-gray-600'}>
//             Fill in the member details below to register a new member
//           </Text>
//         </div>

//         <Form
//           form={form}
//           layout="vertical"
//           onFinish={onFinish}
//           size="large"
//         >
//           {/* Personal Information Section */}
//           <Divider orientation="left" className={currentTheme === 'dark' ? 'text-white' : ''}>
//             Personal Information
//           </Divider>

//           <Row gutter={[16, 16]}>
//             <Col xs={24} sm={12} md={8}>
//               <Form.Item
//                 label="First Name"
//                 name="firstName"
//                 rules={[{ required: true, message: 'Please enter first name' }]}
//               >
//                 <Input
//                   prefix={<UserOutlined />}
//                   placeholder="Enter first name"
//                 />
//               </Form.Item>
//             </Col>

//             <Col xs={24} sm={12} md={8}>
//               <Form.Item
//                 label="Last Name"
//                 name="lastName"
//                 rules={[{ required: true, message: 'Please enter last name' }]}
//               >
//                 <Input
//                   prefix={<UserOutlined />}
//                   placeholder="Enter last name"
//                 />
//               </Form.Item>
//             </Col>

//             <Col xs={24} sm={12} md={8}>
//               <Form.Item
//                 label="Email"
//                 name="email"
//                 rules={[
//                   { required: true, message: 'Please enter email' },
//                   { type: 'email', message: 'Please enter valid email' }
//                 ]}
//               >
//                 <Input
//                   prefix={<MailOutlined />}
//                   placeholder="Enter email address"
//                 />
//               </Form.Item>
//             </Col>

//             <Col xs={24} sm={12} md={8}>
//               <Form.Item
//                 label="Phone"
//                 name="phone"
//                 rules={[{ required: true, message: 'Please enter phone number' }]}
//               >
//                 <Input
//                   prefix={<PhoneOutlined />}
//                   placeholder="Enter phone number"
//                 />
//               </Form.Item>
//             </Col>

//             <Col xs={24} sm={12} md={8}>
//               <Form.Item
//                 label="Date of Birth"
//                 name="dob"
//               >
//                 <DatePicker
//                   style={{ width: '100%' }}
//                   format="YYYY-MM-DD"
//                   placeholder="Select date of birth"
//                 />
//               </Form.Item>
//             </Col>

//             <Col xs={24} sm={12} md={8}>
//               <Form.Item
//                 label="NID Number"
//                 name="nidNumber"
//               >
//                 <Input
//                   prefix={<IdcardOutlined />}
//                   placeholder="Enter NID number"
//                 />
//               </Form.Item>
//             </Col>

//             <Col xs={24} sm={12} md={8}>
//               <Form.Item
//                 label="Father's Name"
//                 name="fatherName"
//               >
//                 <Input placeholder="Enter father's name" />
//               </Form.Item>
//             </Col>

//             <Col xs={24} sm={12} md={8}>
//               <Form.Item
//                 label="Mother's Name"
//                 name="motherName"
//               >
//                 <Input placeholder="Enter mother's name" />
//               </Form.Item>
//             </Col>

//             <Col xs={24} sm={12} md={8}>
//               <Form.Item
//                 label="Birthplace"
//                 name="birthplace"
//               >
//                 <Input placeholder="Enter birthplace" />
//               </Form.Item>
//             </Col>
//           </Row>

//           {/* Address Information */}
//           <Divider orientation="left" className={currentTheme === 'dark' ? 'text-white' : ''}>
//             Address Information
//           </Divider>

//           <Row gutter={[16, 16]}>
//             <Col xs={24} sm={12}>
//               <Form.Item
//                 label="Present Address"
//                 name="presentAddress"
//               >
//                 <TextArea
//                   rows={3}
//                   placeholder="Enter present address"
//                 />
//               </Form.Item>
//             </Col>

//             <Col xs={24} sm={12}>
//               <Form.Item
//                 label="Permanent Address"
//                 name="permanentAddress"
//               >
//                 <TextArea
//                   rows={3}
//                   placeholder="Enter permanent address"
//                 />
//               </Form.Item>
//             </Col>
//           </Row>

//           {/* Membership Details */}
//           <Divider orientation="left" className={currentTheme === 'dark' ? 'text-white' : ''}>
//             Membership Details
//           </Divider>

//           <Row gutter={[16, 16]}>
//             <Col xs={24} sm={12} md={8}>
//               <Form.Item
//                 label="Role"
//                 name="role"
//                 rules={[{ required: true, message: 'Please select role' }]}
//               >
//                 <Select placeholder="Select member role">
//                   {roleOptions.map(role => (
//                     <Option key={role} value={role}>
//                       {role.replace(/([A-Z])/g, ' $1').trim()}
//                     </Option>
//                   ))}
//                 </Select>
//               </Form.Item>
//             </Col>

//             <Col xs={24} sm={12} md={8}>
//               <Form.Item
//                 label="Membership Type"
//                 name="membershipType"
//               >
//                 <Select placeholder="Select membership type">
//                   {membershipTypeOptions.map(type => (
//                     <Option key={type.value} value={type.value}>
//                       {type.label}
//                     </Option>
//                   ))}
//                 </Select>
//               </Form.Item>
//             </Col>

//             <Col xs={24} sm={12} md={8}>
//               <Form.Item
//                 label="Membership Date"
//                 name="membershipDate"
//               >
//                 <DatePicker
//                   style={{ width: '100%' }}
//                   format="YYYY-MM-DD"
//                   placeholder="Select membership date"
//                 />
//               </Form.Item>
//             </Col>
//           </Row>

//           {/* Profile Photo */}
//           <Divider orientation="left" className={currentTheme === 'dark' ? 'text-white' : ''}>
//             Profile Photo
//           </Divider>

//           <Row gutter={[16, 16]}>
//             <Col xs={24} md={12}>
//               <Form.Item label="Upload Photo">
//                 <Upload
//                   listType="picture"
//                   fileList={fileList}
//                   onChange={handleImageChange}
//                   beforeUpload={() => false}
//                   accept="image/*"
//                   maxCount={1}
//                 >
//                   <Button icon={<UploadOutlined />}>Select Image</Button>
//                 </Upload>
//               </Form.Item>
//             </Col>
//           </Row>

//           {/* Submit Button */}
//           <div className="text-center mt-8">
//             <Space size="large">
//               <Button
//                 type="primary"
//                 htmlType="submit"
//                 loading={loading}
//                 size="large"
//                 className="px-8"
//               >
//                 Add Member
//               </Button>
//               <Button
//                 size="large"
//                 onClick={() => form.resetFields()}
//                 className="px-8"
//               >
//                 Reset
//               </Button>
//             </Space>
//           </div>
//         </Form>
//       </Card>
//     </div>
//   );
// };

// export default AddMember;


// 

import React, { useState } from "react";
import {
  Card,
  Form,
  Input,
  Select,
  DatePicker,
  Upload,
  Button,
  Row,
  Col,
  message,
  Divider,
  Space,
  Typography,
  Alert,
} from "antd";
import {
  UserOutlined,
  MailOutlined,
  PhoneOutlined,
  HomeOutlined,
  IdcardOutlined,
  UploadOutlined,
  TeamOutlined,
  ExclamationCircleOutlined,
} from "@ant-design/icons";
import { useSelector, useDispatch } from "react-redux";
import { createMember } from "../slices/memberSlice";

const { Title, Text } = Typography;
const { Option } = Select;
const { TextArea } = Input;

const AddMember = () => {
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const { loading, error } = useSelector((state) => state.members);
  const [fileList, setFileList] = useState([]);
  const currentTheme = useSelector(
    (state) => state.theme?.currentTheme || "light"
  );

  const roleOptions = [
    "Member",
    "PlotOwner",
    "President",
    "ExecutivePresident",
    "VicePresident",
    "GeneralSecretary",
    "JointSecretary",
    "OrganizingSecretary",
    "FinanceSecretary",
    "PublicitySecretary",
    "OfficeSecretary",
    "SocialWelfareSecretary",
    "LegalSecretary",
    "ReligiousSecretary",
    "CulturalSecretary",
    "WomenAffairsSecretary",
    "EnvironmentalSecretary",
    "ExecutiveMember",
  ];

  const handleImageChange = ({ fileList: newFileList }) => {
    setFileList(newFileList.slice(-1));
  };

  const onFinish = async (values) => {
    try {
      const formData = new FormData();

      // Append all form values
      Object.keys(values).forEach((key) => {
        if (values[key] !== undefined && values[key] !== null) {
          if (key === "dob") {
            formData.append(key, values[key].format("YYYY-MM-DD"));
          } else {
            formData.append(key, values[key]);
          }
        }
      });

      // Append image if exists
      if (fileList[0]?.originFileObj) {
        formData.append("image", fileList[0].originFileObj);
      }

      await dispatch(createMember(formData)).unwrap();
      message.success("Member created successfully!");
      form.resetFields();
      setFileList([]);
    } catch (error) {
      message.error(error || "Failed to create member");
    }
  };

  const cardClass =
    currentTheme === "dark" ? "bg-gray-800 border-gray-700" : "bg-white";

  return (
    <div className="min-h-screen p-4">
      <Card className={`shadow-xl rounded-2xl ${cardClass}`}>
        <div className="text-center mb-8">
          <Title
            level={2}
            className={currentTheme === "dark" ? "text-white" : "text-gray-800"}
          >
            <TeamOutlined className="mr-3" />
            Add New Member
          </Title>
          <Text
            className={
              currentTheme === "dark" ? "text-gray-300" : "text-gray-600"
            }
          >
            Fill in the member details below to register a new member
          </Text>
        </div>

        {/* Error Alert */}
        {error && (
          <Alert
            message="Error"
            description={error}
            type="error"
            showIcon
            closable
            className="mb-4"
          />
        )}

        <Form form={form} layout="vertical" onFinish={onFinish} size="large">
          {/* Personal Information Section */}
          <Divider
            orientation="left"
            className={currentTheme === "dark" ? "text-white" : ""}
          >
            Personal Information
          </Divider>

          <Row gutter={[16, 16]}>
            <Col xs={24} sm={12}>
              <Form.Item
                label="First Name"
                name="firstName"
                rules={[{ required: true, message: "Please enter first name" }]}
              >
                <Input
                  prefix={<UserOutlined />}
                  placeholder="Enter first name"
                />
              </Form.Item>
            </Col>

            <Col xs={24} sm={12}>
              <Form.Item
                label="Last Name"
                name="lastName"
                rules={[{ required: true, message: "Please enter last name" }]}
              >
                <Input
                  prefix={<UserOutlined />}
                  placeholder="Enter last name"
                />
              </Form.Item>
            </Col>

            <Col xs={24} sm={12}>
              <Form.Item
                label="Email"
                name="email"
                rules={[
                  { required: true, message: "Please enter email" },
                  { type: "email", message: "Please enter valid email" },
                ]}
              >
                <Input
                  prefix={<MailOutlined />}
                  placeholder="Enter email address"
                />
              </Form.Item>
            </Col>

            <Col xs={24} sm={12}>
              <Form.Item
                label="Phone"
                name="telephone"
                rules={[
                  { required: true, message: "Please enter phone number" },
                ]}
              >
                <Input
                  prefix={<PhoneOutlined />}
                  placeholder="Enter phone number"
                />
              </Form.Item>
            </Col>

            <Col xs={24} sm={12}>
              <Form.Item label="Date of Birth" name="dob">
                <DatePicker
                  style={{ width: "100%" }}
                  format="YYYY-MM-DD"
                  placeholder="Select date of birth"
                />
              </Form.Item>
            </Col>

            <Col xs={24} sm={12}>
              <Form.Item label="ID Card Number" name="IdCardNumber">
                <Input
                  prefix={<IdcardOutlined />}
                  placeholder="Enter ID card number"
                />
              </Form.Item>
            </Col>

            <Col xs={24} sm={12}>
              <Form.Item label="Father's Name" name="fatherName">
                <Input placeholder="Enter father's name" />
              </Form.Item>
            </Col>

            <Col xs={24} sm={12}>
              <Form.Item label="Birthplace" name="birthplace">
                <Input placeholder="Enter birthplace" />
              </Form.Item>
            </Col>
          </Row>

          {/* Address Information */}
          <Divider
            orientation="left"
            className={currentTheme === "dark" ? "text-white" : ""}
          >
            Address Information
          </Divider>

          <Row gutter={[16, 16]}>
            <Col xs={24}>
              <Form.Item label="Address" name="address">
                <TextArea
                  rows={3}
                  placeholder="Enter complete address"
                  prefix={<HomeOutlined />}
                />
              </Form.Item>
            </Col>
          </Row>

          {/* Education & Role */}
          <Divider
            orientation="left"
            className={currentTheme === "dark" ? "text-white" : ""}
          >
            Additional Information
          </Divider>

          <Row gutter={[16, 16]}>
            <Col xs={24} sm={12}>
              <Form.Item
                label="Educational Qualification"
                name="educationalQualification"
              >
                <Input placeholder="Enter educational qualification" />
              </Form.Item>
            </Col>

            <Col xs={24} sm={12}>
              <Form.Item
                label="Role"
                name="role"
                rules={[{ required: true, message: "Please select role" }]}
                initialValue="Member"
              >
                <Select placeholder="Select member role">
                  {roleOptions.map((role) => (
                    <Option key={role} value={role}>
                      {role.replace(/([A-Z])/g, " $1").trim()}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>

            <Col xs={24}>
              <Form.Item label="Description" name="description">
                <TextArea
                  rows={3}
                  placeholder="Enter any additional description or notes..."
                />
              </Form.Item>
            </Col>
          </Row>

          {/* Profile Photo */}
          <Divider
            orientation="left"
            className={currentTheme === "dark" ? "text-white" : ""}
          >
            Profile Photo
          </Divider>

          <Row gutter={[16, 16]}>
            <Col xs={24} md={12}>
              <Form.Item label="Upload Photo">
                <Upload
                  listType="picture"
                  fileList={fileList}
                  onChange={handleImageChange}
                  beforeUpload={() => false}
                  accept="image/*"
                  maxCount={1}
                >
                  <Button icon={<UploadOutlined />}>Select Image</Button>
                </Upload>
                <Text type="secondary" className="mt-2 block">
                  Upload a profile photo (JPG, PNG, JPEG)
                </Text>
              </Form.Item>
            </Col>
          </Row>

          {/* Submit Button */}
          <div className="text-center mt-8">
            <Space size="large">
              <Button
                type="primary"
                htmlType="submit"
                loading={loading}
                size="large"
                className="px-8"
                icon={<UserOutlined />}
              >
                Create Member
              </Button>
              <Button
                size="large"
                onClick={() => {
                  form.resetFields();
                  setFileList([]);
                }}
                className="px-8"
              >
                Reset Form
              </Button>
            </Space>
          </div>
        </Form>
      </Card>
    </div>
  );
};

export default AddMember;
