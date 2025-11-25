// import React, { useState, useEffect } from "react";
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
//   Progress,
//   Switch,
//   Tag
// } from "antd";
// import { 
//   UploadOutlined, 
//   UserOutlined, 
//   SolutionOutlined,
//   TeamOutlined,
//   ArrowLeftOutlined,
//   PlusOutlined,
//   SearchOutlined,
//   CrownOutlined
// } from "@ant-design/icons";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";
// import dayjs from "dayjs";

// const { Title, Text } = Typography;
// const { Option } = Select;
// const { TextArea } = Input;
// const { Step } = Steps;

// export default function AddCommitteeMember() {
//   const [form] = Form.useForm();
//   const navigate = useNavigate();
//   const [loading, setLoading] = useState(false);
//   const [searching, setSearching] = useState(false);
//   const [currentStep, setCurrentStep] = useState(0);
//   const [searchResults, setSearchResults] = useState([]);
//   const [selectedMember, setSelectedMember] = useState(null);

//   const committeeRoles = [
//     'President',
//     'ExecutivePresident', 
//     'VicePresident',
//     'GeneralSecretary',
//     'JointGeneralSecretary',
//     'OrganizingSecretary',
//     'FinanceSecretary',
//     'PublicityAndPublicationSecretary',
//     'OfficeSecretary',
//     'SocialWelfareAffairsSecretary',
//     'LegalAffairsSecretary',
//     'ReligiousAffairsSecretary',
//     'PriyaAndCulturalAffairsSecretary',
//     'WomensAffairsSecretary',
//     'EnvironmentalAffairsSecretary',
//     'ExecutiveWorkingMember'
//   ];

//   const steps = [
//     {
//       title: 'Select Member',
//       icon: <UserOutlined />,
//       fields: ['memberSearch']
//     },
//     {
//       title: 'Committee Role',
//       icon: <CrownOutlined />,
//       fields: ['committeeRole', 'termStart']
//     },
//     {
//       title: 'Review & Submit',
//       icon: <TeamOutlined />,
//       fields: []
//     }
//   ];

//   // Search members
//   const searchMembers = async (searchTerm) => {
//     if (!searchTerm || searchTerm.length < 2) {
//       setSearchResults([]);
//       return;
//     }

//     setSearching(true);
//     try {
//       const token = localStorage.getItem('token');
//       const response = await axios.get(
//         `http://localhost:3000/api/v1/committee/members/search?q=${searchTerm}`,
//         {
//           headers: { Authorization: `Bearer ${token}` }
//         }
//       );

//       if (response.data.success) {
//         setSearchResults(response.data.results);
//       }
//     } catch (error) {
//       console.error('Search error:', error);
//       message.error('Failed to search members');
//     } finally {
//       setSearching(false);
//     }
//   };

//   const handleMemberSelect = (member) => {
//     setSelectedMember(member);
//     form.setFieldsValue({
//       memberId: member._id,
//       memberModel: member.source,
//       memberSearch: member.displayText
//     });
//     setSearchResults([]);
//     message.success(`Selected: ${member.displayText}`);
//   };

//   const nextStep = async () => {
//     try {
//       const currentStepFields = steps[currentStep].fields;
//       const values = await form.validateFields(currentStepFields);
      
//       if (currentStep === 0 && !selectedMember) {
//         message.error('Please select a member first');
//         return;
//       }
      
//       setCurrentStep(currentStep + 1);
//     } catch (error) {
//       console.log('Validation Failed:', error);
//       message.error('Please complete all required fields before proceeding.');
//     }
//   };

//   const prevStep = () => {
//     setCurrentStep(currentStep - 1);
//   };

//   const handleFinish = async () => {
//     try {
//       const values = await form.validateFields();
//       setLoading(true);

//       const committeeData = {
//         memberId: values.memberId,
//         memberModel: values.memberModel,
//         committeeRole: values.committeeRole,
//         termStart: values.termStart.format('YYYY-MM-DD'),
//         termEnd: values.termEnd ? values.termEnd.format('YYYY-MM-DD') : null,
//         responsibilities: values.responsibilities,
//         votingRights: values.votingRights,
//         canChairMeetings: values.canChairMeetings,
//         priority: values.priority || 0,
//         notes: values.notes
//       };

//       const token = localStorage.getItem('token');
//       const response = await axios.post(
//         'http://localhost:3000/api/v1/committee/members',
//         committeeData,
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//             'Content-Type': 'application/json'
//           }
//         }
//       );

//       if (response.data.success) {
//         message.success('🎉 Committee member added successfully!');
//         form.resetFields();
//         setSelectedMember(null);
//         setSearchResults([]);
//         setCurrentStep(0);
//         navigate('/committee-members');
//       }
//     } catch (error) {
//       console.error('Error:', error);
//       if (error.response?.data?.message) {
//         message.error(error.response.data.message);
//       } else {
//         message.error('Failed to add committee member. Please try again.');
//       }
//     } finally {
//       setLoading(false);
//     }
//   };

//   const getRoleColor = (role) => {
//     const roleColors = {
//       President: 'red',
//       ExecutivePresident: 'volcano',
//       VicePresident: 'orange',
//       GeneralSecretary: 'gold',
//       JointGeneralSecretary: 'lime',
//       OrganizingSecretary: 'green',
//       FinanceSecretary: 'cyan',
//       PublicityAndPublicationSecretary: 'blue',
//       OfficeSecretary: 'purple',
//       ExecutiveWorkingMember: 'default'
//     };
//     return roleColors[role] || 'blue';
//   };

//   const formContent = [
//     // Step 0: Select Member
//     <div key="step0">
//       <Row gutter={[24, 16]}>
//         <Col xs={24}>
//           <Form.Item
//             name="memberSearch"
//             label="Search Member"
//             rules={[{ required: true, message: "Please search and select a member" }]}
//           >
//             <Input.Search
//               size="large"
//               placeholder="Search by name, email, membership ID, or employee ID..."
//               enterButton={<SearchOutlined />}
//               onSearch={searchMembers}
//               onChange={(e) => {
//                 if (e.target.value.length < 2) {
//                   setSearchResults([]);
//                 }
//               }}
//               loading={searching}
//             />
//           </Form.Item>

//           {searchResults.length > 0 && (
//             <Card 
//               title="Search Results" 
//               size="small" 
//               className="mt-4 max-h-64 overflow-y-auto"
//             >
//               <div className="space-y-2">
//                 {searchResults.map((member) => (
//                   <div
//                     key={`${member.source}-${member._id}`}
//                     className={`p-3 border rounded-lg cursor-pointer transition-all hover:bg-blue-50 hover:border-blue-300 ${
//                       selectedMember?._id === member._id ? 'bg-blue-100 border-blue-500' : ''
//                     }`}
//                     onClick={() => handleMemberSelect(member)}
//                   >
//                     <div className="flex items-center space-x-3">
//                       <Avatar 
//                         src={member.profilePhoto} 
//                         icon={<UserOutlined />}
//                         size="large"
//                       />
//                       <div className="flex-1">
//                         <div className="font-semibold">
//                           {member.firstName} {member.lastName}
//                         </div>
//                         <div className="text-sm text-gray-600">
//                           {member.email}
//                         </div>
//                         <div className="text-xs text-gray-500">
//                           {member.identifier} • {member.source}
//                           {member.position && ` • ${member.position}`}
//                           {member.department && ` • ${member.department}`}
//                         </div>
//                       </div>
//                       <Tag color={member.source === 'User' ? 'green' : 'blue'}>
//                         {member.source}
//                       </Tag>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             </Card>
//           )}

//           {selectedMember && (
//             <Card 
//               title="Selected Member" 
//               size="small" 
//               className="mt-4 bg-green-50 border-green-200"
//             >
//               <div className="flex items-center space-x-3">
//                 <Avatar 
//                   src={selectedMember.profilePhoto} 
//                   icon={<UserOutlined />}
//                   size={60}
//                 />
//                 <div>
//                   <div className="font-semibold text-lg">
//                     {selectedMember.firstName} {selectedMember.lastName}
//                   </div>
//                   <div className="text-gray-600">{selectedMember.email}</div>
//                   <div className="text-sm text-gray-500">
//                     {selectedMember.identifier} • {selectedMember.source}
//                   </div>
//                   {selectedMember.position && (
//                     <div className="text-sm text-gray-500">
//                       Position: {selectedMember.position}
//                     </div>
//                   )}
//                 </div>
//               </div>
//             </Card>
//           )}
//         </Col>
//       </Row>

//       <Form.Item name="memberId" hidden>
//         <Input />
//       </Form.Item>
//       <Form.Item name="memberModel" hidden>
//         <Input />
//       </Form.Item>
//     </div>,

//     // Step 1: Committee Role
//     <div key="step1">
//       <Row gutter={[16, 16]}>
//         <Col xs={24}>
//           <Form.Item
//             name="committeeRole"
//             label="Committee Role"
//             rules={[{ required: true, message: "Please select committee role" }]}
//           >
//             <Select 
//               size="large" 
//               placeholder="Select committee role"
//               optionLabelProp="label"
//             >
//               {committeeRoles.map(role => (
//                 <Option key={role} value={role} label={role}>
//                   <Tag color={getRoleColor(role)} className="w-full text-center">
//                     {role.replace(/([A-Z])/g, ' $1').trim()}
//                   </Tag>
//                 </Option>
//               ))}
//             </Select>
//           </Form.Item>
//         </Col>

//         <Col xs={24} md={12}>
//           <Form.Item
//             name="termStart"
//             label="Term Start Date"
//             rules={[{ required: true, message: "Please select term start date" }]}
//           >
//             <DatePicker 
//               style={{ width: "100%" }} 
//               size="large"
//               format="YYYY-MM-DD"
//             />
//           </Form.Item>
//         </Col>

//         <Col xs={24} md={12}>
//           <Form.Item name="termEnd" label="Term End Date">
//             <DatePicker 
//               style={{ width: "100%" }} 
//               size="large"
//               format="YYYY-MM-DD"
//               placeholder="Optional"
//             />
//           </Form.Item>
//         </Col>

//         <Col xs={24}>
//           <Form.Item name="responsibilities" label="Responsibilities">
//             <TextArea 
//               rows={3} 
//               placeholder="Describe the member's responsibilities and duties..."
//               showCount 
//               maxLength={500}
//             />
//           </Form.Item>
//         </Col>

//         <Col xs={24} md={12}>
//           <Form.Item 
//             name="votingRights" 
//             label="Voting Rights"
//             valuePropName="checked"
//             initialValue={true}
//           >
//             <Switch checkedChildren="Yes" unCheckedChildren="No" defaultChecked />
//           </Form.Item>
//         </Col>

//         <Col xs={24} md={12}>
//           <Form.Item 
//             name="canChairMeetings" 
//             label="Can Chair Meetings"
//             valuePropName="checked"
//             initialValue={false}
//           >
//             <Switch checkedChildren="Yes" unCheckedChildren="No" />
//           </Form.Item>
//         </Col>

//         <Col xs={24} md={12}>
//           <Form.Item name="priority" label="Display Priority">
//             <Input 
//               type="number" 
//               size="large"
//               placeholder="0"
//               min="0"
//               max="100"
//             />
//           </Form.Item>
//         </Col>

//         <Col xs={24}>
//           <Form.Item name="notes" label="Additional Notes">
//             <TextArea 
//               rows={2} 
//               placeholder="Any additional notes..."
//               showCount 
//               maxLength={200}
//             />
//           </Form.Item>
//         </Col>
//       </Row>
//     </div>,

//     // Step 2: Review & Submit
//     <div key="step2">
//       <Card title="Review Committee Member Information" className="mb-4">
//         {selectedMember && (
//           <>
//             <div className="mb-6 p-4 bg-gray-50 rounded-lg">
//               <div className="flex items-center space-x-4">
//                 <Avatar 
//                   size={80} 
//                   src={selectedMember.profilePhoto} 
//                   icon={<UserOutlined />}
//                 />
//                 <div>
//                   <Title level={4} className="!mb-1">
//                     {selectedMember.firstName} {selectedMember.lastName}
//                   </Title>
//                   <Text type="secondary">{selectedMember.email}</Text>
//                   <div className="mt-1">
//                     <Tag color={selectedMember.source === 'User' ? 'green' : 'blue'}>
//                       {selectedMember.source}
//                     </Tag>
//                     <Tag>{selectedMember.identifier}</Tag>
//                   </div>
//                 </div>
//               </div>
//             </div>

//             <Row gutter={[16, 16]}>
//               <Col xs={24} md={12}>
//                 <div className="space-y-3">
//                   <div>
//                     <Text strong>Committee Details</Text>
//                     <Divider className="my-2" />
//                     <div className="space-y-2">
//                       <div>
//                         <Text type="secondary">Role:</Text>{' '}
//                         <Tag color={getRoleColor(form.getFieldValue('committeeRole'))}>
//                           {form.getFieldValue('committeeRole')}
//                         </Tag>
//                       </div>
//                       <div>
//                         <Text type="secondary">Term Start:</Text>{' '}
//                         {form.getFieldValue('termStart')?.format('MMMM D, YYYY')}
//                       </div>
//                       <div>
//                         <Text type="secondary">Term End:</Text>{' '}
//                         {form.getFieldValue('termEnd')?.format('MMMM D, YYYY') || 'Not specified'}
//                       </div>
//                       <div>
//                         <Text type="secondary">Voting Rights:</Text>{' '}
//                         <Tag color={form.getFieldValue('votingRights') ? 'green' : 'red'}>
//                           {form.getFieldValue('votingRights') ? 'Yes' : 'No'}
//                         </Tag>
//                       </div>
//                       <div>
//                         <Text type="secondary">Can Chair Meetings:</Text>{' '}
//                         <Tag color={form.getFieldValue('canChairMeetings') ? 'green' : 'red'}>
//                           {form.getFieldValue('canChairMeetings') ? 'Yes' : 'No'}
//                         </Tag>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               </Col>
              
//               <Col xs={24} md={12}>
//                 <div className="space-y-3">
//                   <div>
//                     <Text strong>Additional Information</Text>
//                     <Divider className="my-2" />
//                     <div className="space-y-2">
//                       <div>
//                         <Text type="secondary">Priority:</Text>{' '}
//                         {form.getFieldValue('priority') || 0}
//                       </div>
//                       <div>
//                         <Text type="secondary">Responsibilities:</Text>
//                         <div className="mt-1">
//                           {form.getFieldValue('responsibilities') || 'Not specified'}
//                         </div>
//                       </div>
//                       {form.getFieldValue('notes') && (
//                         <div>
//                           <Text type="secondary">Notes:</Text>
//                           <div className="mt-1">
//                             {form.getFieldValue('notes')}
//                           </div>
//                         </div>
//                       )}
//                     </div>
//                   </div>
//                 </div>
//               </Col>
//             </Row>
//           </>
//         )}
//       </Card>
//     </div>
//   ];

//   return (
//     <Layout style={{ padding: 24, minHeight: "100vh", background: "#f5f5f5" }}>
//       <Card 
//         className="shadow-lg rounded-xl"
//         styles={{ body: { padding: 0 } }}
//       >
//         {/* Header */}
//         <div className="bg-gradient-to-r from-purple-600 to-purple-800 p-6 rounded-t-xl">
//           <div className="flex items-center justify-between">
//             <div className="flex items-center space-x-4">
//               <Button 
//                 type="text" 
//                 icon={<ArrowLeftOutlined />} 
//                 onClick={() => navigate("/committee-members")}
//                 className="text-white hover:bg-purple-700"
//                 size="large"
//               />
//               <div>
//                 <Title level={3} className="!mb-1 !text-white">
//                   Add Committee Member
//                 </Title>
//                 <Text className="text-purple-100">
//                   Add a new member to the committee
//                 </Text>
//               </div>
//             </div>
//             <div className="text-right">
//               <Text className="text-purple-200 block">Step {currentStep + 1} of {steps.length}</Text>
//               <Progress 
//                 percent={((currentStep + 1) / steps.length) * 100} 
//                 showInfo={false}
//                 strokeColor="#ffffff"
//                 className="mt-1"
//               />
//             </div>
//           </div>
//         </div>

//         {/* Steps */}
//         <div className="p-6 border-b">
//           <Steps current={currentStep} size="small">
//             {steps.map((step, index) => (
//               <Step key={index} title={step.title} icon={step.icon} />
//             ))}
//           </Steps>
//         </div>

//         {/* Form Content */}
//         <div className="p-6">
//           <Form
//             form={form}
//             layout="vertical"
//             initialValues={{
//               votingRights: true,
//               canChairMeetings: false,
//               priority: 0,
//               termStart: dayjs()
//             }}
//           >
//             {formContent[currentStep]}

//             {/* Navigation Buttons */}
//             <div className="flex justify-between mt-8 pt-6 border-t">
//               <Button
//                 size="large"
//                 onClick={currentStep === 0 ? () => navigate("/committee-members") : prevStep}
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
//                     Add to Committee
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



//////////////////////USING REDUX/////////////////////////////



// import React, { useState, useEffect, useMemo } from "react";
// import {
//   Layout,
//   Form,
//   Input,
//   Select,
//   DatePicker,
//   Button,
//   Card,
//   Row,
//   Col,
//   Typography,
//   Steps,
//   Divider,
//   Space,
//   Avatar,
//   Progress,
//   Tag,
//   message,
//   Modal,
//   Alert
// } from "antd";
// import { 
//   UserOutlined, 
//   TeamOutlined,
//   ArrowLeftOutlined,
//   PlusOutlined,
//   SearchOutlined,
//   CrownOutlined,
//   CheckCircleOutlined,
//   ExclamationCircleOutlined,
//   ReloadOutlined
// } from "@ant-design/icons";
// import { useNavigate } from "react-router-dom";
// import { useEmployees } from "../hooks/useEmployees";
// import dayjs from "dayjs";

// const { Title, Text } = Typography;
// const { Option } = Select;
// const { TextArea } = Input;
// const { Step } = Steps;

// export default function AddCommitteeMember() {
//   const [form] = Form.useForm();
//   const navigate = useNavigate();
//   const [currentStep, setCurrentStep] = useState(0);
//   const [selectedEmployee, setSelectedEmployee] = useState(null);
//   const [searchText, setSearchText] = useState('');
//   const [submitError, setSubmitError] = useState(null);
//   const [isSubmitting, setIsSubmitting] = useState(false);

//   const {
//     employees,
//     loading,
//     committeePositions,
//     addCommitteeMember,
//     getEmployeesWithCommitteeStatus,
//   } = useEmployees();

//   const committeeRoles = [
//     'President',
//     'ExecutivePresident', 
//     'VicePresident',
//     'GeneralSecretary',
//     'JointGeneralSecretary',
//     'OrganizingSecretary',
//     'FinanceSecretary',
//     'PublicityAndPublicationSecretary',
//     'OfficeSecretary',
//     'SocialWelfareAffairsSecretary',
//     'LegalAffairsSecretary',
//     'ReligiousAffairsSecretary',
//     'PriyaAndCulturalAffairsSecretary',
//     'WomensAffairsSecretary',
//     'EnvironmentalAffairsSecretary',
//     'ExecutiveWorkingMember'
//   ];

//   const steps = [
//     {
//       title: 'Select Employee',
//       icon: <UserOutlined />,
//       fields: ['employeeId']
//     },
//     {
//       title: 'Committee Details',
//       icon: <CrownOutlined />,
//       fields: ['position', 'termStart']
//     },
//     {
//       title: 'Review & Submit',
//       icon: <TeamOutlined />,
//       fields: []
//     }
//   ];

//   // Get all employees with their committee status
//   const allEmployees = getEmployeesWithCommitteeStatus();

//   // Filter employees based on search
//   const filteredEmployees = useMemo(() => {
//     if (!searchText) return allEmployees;
    
//     return allEmployees.filter(employee =>
//       employee.firstName?.toLowerCase().includes(searchText.toLowerCase()) ||
//       employee.lastName?.toLowerCase().includes(searchText.toLowerCase()) ||
//       employee.employeeId?.toLowerCase().includes(searchText.toLowerCase()) ||
//       employee.email?.toLowerCase().includes(searchText.toLowerCase())
//     );
//   }, [allEmployees, searchText]);

//   // Safe date formatting utility function
//   const formatDateSafe = (dateValue) => {
//     if (!dateValue) return null;
//     if (dayjs.isDayjs(dateValue)) {
//       return dateValue.format('YYYY-MM-DD');
//     }
//     if (typeof dateValue === 'string') {
//       return dateValue;
//     }
//     return null;
//   };

//   const handleEmployeeSelect = (employee) => {
//     setSelectedEmployee(employee);
//     form.setFieldsValue({
//       employeeId: employee._id
//     });
//     message.success(`Selected: ${employee.firstName} ${employee.lastName}`);
//   };

//   const nextStep = async () => {
//     try {
//       const currentStepFields = steps[currentStep].fields;
//       await form.validateFields(currentStepFields);
      
//       if (currentStep === 0 && !selectedEmployee) {
//         message.error('Please select an employee first');
//         return;
//       }
      
//       setCurrentStep(currentStep + 1);
//       setSubmitError(null);
//     } catch (error) {
//       console.log('Validation Failed:', error);
//       message.error('Please complete all required fields before proceeding.');
//     }
//   };

//   const prevStep = () => {
//     setCurrentStep(currentStep - 1);
//     setSubmitError(null);
//   };

//   const handleFinish = async () => {
//     setIsSubmitting(true);
//     setSubmitError(null);

//     try {
//       const values = await form.validateFields();
      
//       console.log('Form values:', values); // Debug log
      
//       // Safe date formatting - with better validation
//       const termStart = formatDateSafe(values.termStart);
//       console.log('Term Start after formatting:', termStart); // Debug log
      
//       if (!termStart) {
//         setSubmitError({
//           type: 'VALIDATION_ERROR',
//           message: 'Please select a valid term start date.'
//         });
//         setIsSubmitting(false);
//         return;
//       }

//       const committeeData = {
//         employeeId: values.employeeId,
//         position: values.position,
//         termStart: termStart,
//         termEnd: formatDateSafe(values.termEnd),
//         responsibilities: values.responsibilities,
//         status: values.status || 'active'
//       };

//       console.log('Committee data to submit:', committeeData); // Debug log

//       // Validate position availability
//       const isPositionTaken = allEmployees.some(emp => 
//         emp.committee?.position === committeeData.position && 
//         emp.committee?.status === 'active'
//       );

//       if (isPositionTaken) {
//         setSubmitError({
//           type: 'POSITION_TAKEN',
//           message: `The position "${committeeData.position}" is already assigned to another active committee member. Please choose a different position.`
//         });
//         setIsSubmitting(false);
//         return;
//       }

//       // Validate employee not already in committee
//       const isAlreadyInCommittee = allEmployees.some(emp => 
//         emp._id === committeeData.employeeId && 
//         emp.isCommitteeMember && 
//         emp.committee?.status === 'active'
//       );

//       if (isAlreadyInCommittee) {
//         setSubmitError({
//           type: 'ALREADY_IN_COMMITTEE',
//           message: 'This employee is already an active committee member. Please select a different employee.'
//         });
//         setIsSubmitting(false);
//         return;
//       }

//       // Add to committee using Redux
//       addCommitteeMember(committeeData);
      
//       message.success('🎉 Committee member added successfully!');
      
//       // Reset form and navigate after a brief delay to show success message
//       setTimeout(() => {
//         form.resetFields();
//         setSelectedEmployee(null);
//         setSearchText('');
//         setCurrentStep(0);
//         navigate('/committee-members');
//       }, 1500);
      
//     } catch (error) {
//       console.error('Submission Error:', error);
      
//       let errorMessage = 'Failed to add committee member. Please try again.';
      
//       if (error.message?.includes('network') || error.message?.includes('Network Error')) {
//         errorMessage = 'Network connection error. Please check your internet connection and try again.';
//       } else if (error.message?.includes('timeout')) {
//         errorMessage = 'Request timeout. Please try again in a moment.';
//       }

//       setSubmitError({
//         type: 'SUBMISSION_ERROR',
//         message: errorMessage,
//         details: error.message
//       });
      
//       message.error(errorMessage);
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   const handleRetry = () => {
//     setSubmitError(null);
//     handleFinish();
//   };

//   const handleResetForm = () => {
//     setSubmitError(null);
//     setCurrentStep(0);
//     form.resetFields();
//     setSelectedEmployee(null);
//   };

//   const getRoleColor = (role) => {
//     const roleColors = {
//       President: 'red',
//       ExecutivePresident: 'volcano',
//       VicePresident: 'orange',
//       GeneralSecretary: 'gold',
//       JointGeneralSecretary: 'lime',
//       OrganizingSecretary: 'green',
//       FinanceSecretary: 'cyan',
//       PublicityAndPublicationSecretary: 'blue',
//       OfficeSecretary: 'purple',
//       ExecutiveWorkingMember: 'default'
//     };
//     return roleColors[role] || 'blue';
//   };

//   // Error display component
//   const ErrorDisplay = () => {
//     if (!submitError) return null;

//     let actionButtons = [];

//     switch (submitError.type) {
//       case 'POSITION_TAKEN':
//       case 'ALREADY_IN_COMMITTEE':
//       case 'VALIDATION_ERROR':
//         actionButtons = [
//           <Button key="modify" type="primary" onClick={() => setSubmitError(null)}>
//             Modify Selection
//           </Button>
//         ];
//         break;
//       case 'SUBMISSION_ERROR':
//         actionButtons = [
//           <Button key="retry" type="primary" icon={<ReloadOutlined />} onClick={handleRetry}>
//             Try Again
//           </Button>,
//           <Button key="reset" onClick={handleResetForm}>
//             Start Over
//           </Button>
//         ];
//         break;
//       default:
//         actionButtons = [
//           <Button key="retry" type="primary" onClick={handleRetry}>
//             Try Again
//           </Button>
//         ];
//     }

//     return (
//       <Alert
//         message={
//           <div>
//             <ExclamationCircleOutlined style={{ color: '#ff4d4f', marginRight: 8 }} />
//             <strong>Unable to Add Committee Member</strong>
//           </div>
//         }
//         description={
//           <div>
//             <div style={{ marginBottom: 8 }}>{submitError.message}</div>
//             {submitError.details && (
//               <Text type="secondary" style={{ fontSize: '12px' }}>
//                 Technical details: {submitError.details}
//               </Text>
//             )}
//           </div>
//         }
//         type="error"
//         showIcon={false}
//         action={
//           <Space direction="vertical" size="small">
//             {actionButtons}
//           </Space>
//         }
//         style={{ marginBottom: 16 }}
//       />
//     );
//   };

//   const formContent = [
//     // Step 0: Select Employee
//     <div key="step0">
//       <ErrorDisplay />
      
//       <Row gutter={[24, 16]}>
//         <Col xs={24}>
//           <div className="mb-4">
//             <Input
//               placeholder="Search employees by name, ID, or email..."
//               value={searchText}
//               onChange={(e) => setSearchText(e.target.value)}
//               prefix={<SearchOutlined />}
//               size="large"
//               allowClear
//             />
//           </div>

//           <div className="max-h-96 overflow-y-auto border rounded-lg">
//             {filteredEmployees.length === 0 ? (
//               <div className="p-8 text-center">
//                 <UserOutlined style={{ fontSize: 48, color: '#d9d9d9', marginBottom: 16 }} />
//                 <Text type="secondary">No employees found matching your search</Text>
//               </div>
//             ) : (
//               filteredEmployees.map((employee) => (
//                 <div
//                   key={employee._id}
//                   className={`p-4 border-b cursor-pointer transition-all hover:bg-blue-50 ${
//                     selectedEmployee?._id === employee._id ? 'bg-blue-100 border-blue-500' : ''
//                   } ${employee.isCommitteeMember ? 'bg-orange-50' : ''}`}
//                   onClick={() => !employee.isCommitteeMember && handleEmployeeSelect(employee)}
//                 >
//                   <div className="flex items-center space-x-3">
//                     <Avatar 
//                       src={employee.image} 
//                       icon={<UserOutlined />}
//                       size="large"
//                     />
//                     <div className="flex-1">
//                       <div className="flex items-center space-x-2">
//                         <div className="font-semibold">
//                           {employee.firstName} {employee.lastName}
//                         </div>
//                         {employee.isCommitteeMember && (
//                           <Tag color="orange" icon={<CheckCircleOutlined />}>
//                             Already in Committee
//                           </Tag>
//                         )}
//                       </div>
//                       <div className="text-sm text-gray-600">
//                         {employee.email}
//                       </div>
//                       <div className="text-xs text-gray-500">
//                         {employee.employeeId} • {employee.department} • {employee.position}
//                       </div>
//                     </div>
//                     {employee.isCommitteeMember ? (
//                       <Tag color="red">Cannot Select</Tag>
//                     ) : (
//                       <Button 
//                         type="primary" 
//                         size="small"
//                         icon={<PlusOutlined />}
//                       >
//                         Select
//                       </Button>
//                     )}
//                   </div>
//                 </div>
//               ))
//             )}
//           </div>

//           {selectedEmployee && (
//             <Card 
//               title="Selected Employee" 
//               size="small" 
//               className="mt-4 bg-green-50 border-green-200"
//             >
//               <div className="flex items-center space-x-3">
//                 <Avatar 
//                   src={selectedEmployee.image} 
//                   icon={<UserOutlined />}
//                   size={60}
//                 />
//                 <div>
//                   <div className="font-semibold text-lg">
//                     {selectedEmployee.firstName} {selectedEmployee.lastName}
//                   </div>
//                   <div className="text-gray-600">{selectedEmployee.email}</div>
//                   <div className="text-sm text-gray-500">
//                     {selectedEmployee.employeeId} • {selectedEmployee.department}
//                   </div>
//                   <div className="text-sm text-gray-500">
//                     Position: {selectedEmployee.position}
//                   </div>
//                 </div>
//               </div>
//             </Card>
//           )}
//         </Col>
//       </Row>
//     </div>,

//     // Step 1: Committee Details
//     <div key="step1">
//       <ErrorDisplay />
      
//       <Row gutter={[16, 16]}>
//         <Col xs={24}>
//           <Form.Item
//             name="position"
//             label="Committee Role"
//             rules={[{ required: true, message: "Please select committee role" }]}
//           >
//             <Select 
//               size="large" 
//               placeholder="Select committee role"
//               optionLabelProp="label"
//             >
//               {committeeRoles.map(role => (
//                 <Option key={role} value={role} label={role}>
//                   <Tag color={getRoleColor(role)} className="w-full text-center">
//                     {role.replace(/([A-Z])/g, ' $1').trim()}
//                   </Tag>
//                 </Option>
//               ))}
//             </Select>
//           </Form.Item>
//         </Col>

//         <Col xs={24} md={12}>
//           <Form.Item
//             name="termStart"
//             label="Term Start Date"
//             rules={[{ required: true, message: "Please select term start date" }]}
//           >
//             <DatePicker 
//               style={{ width: "100%" }} 
//               size="large"
//               format="YYYY-MM-DD"
//               // Remove restrictive date validation to allow any date selection
//               placeholder="Select start date"
//             />
//           </Form.Item>
//         </Col>

//         <Col xs={24} md={12}>
//           <Form.Item name="termEnd" label="Term End Date">
//             <DatePicker 
//               style={{ width: "100%" }} 
//               size="large"
//               format="YYYY-MM-DD"
//               placeholder="Optional"
//               // Remove restrictive date validation
//             />
//           </Form.Item>
//         </Col>

//         <Col xs={24}>
//           <Form.Item name="responsibilities" label="Responsibilities">
//             <TextArea 
//               rows={3} 
//               placeholder="Describe the member's responsibilities and duties..."
//               showCount 
//               maxLength={500}
//             />
//           </Form.Item>
//         </Col>

//         <Col xs={24}>
//           <Form.Item
//             name="status"
//             label="Status"
//             initialValue="active"
//           >
//             <Select>
//               <Option value="active">Active</Option>
//               <Option value="inactive">Inactive</Option>
//               <Option value="suspended">Suspended</Option>
//             </Select>
//           </Form.Item>
//         </Col>
//       </Row>
//     </div>,

//     // Step 2: Review & Submit
//     <div key="step2">
//       <ErrorDisplay />
      
//       <Card title="Review Committee Member Information" className="mb-4">
//         {selectedEmployee && (
//           <>
//             <div className="mb-6 p-4 bg-gray-50 rounded-lg">
//               <div className="flex items-center space-x-4">
//                 <Avatar 
//                   size={80} 
//                   src={selectedEmployee.image} 
//                   icon={<UserOutlined />}
//                 />
//                 <div>
//                   <Title level={4} className="!mb-1">
//                     {selectedEmployee.firstName} {selectedEmployee.lastName}
//                   </Title>
//                   <Text type="secondary">{selectedEmployee.email}</Text>
//                   <div className="mt-1">
//                     <Tag>{selectedEmployee.employeeId}</Tag>
//                     <Tag>{selectedEmployee.department}</Tag>
//                   </div>
//                 </div>
//               </div>
//             </div>

//             <Row gutter={[16, 16]}>
//               <Col xs={24} md={12}>
//                 <div className="space-y-3">
//                   <div>
//                     <Text strong>Committee Details</Text>
//                     <Divider className="my-2" />
//                     <div className="space-y-2">
//                       <div>
//                         <Text type="secondary">Role:</Text>{' '}
//                         <Tag color={getRoleColor(form.getFieldValue('position'))}>
//                           {form.getFieldValue('position')}
//                         </Tag>
//                       </div>
//                       <div>
//                         <Text type="secondary">Term Start:</Text>{' '}
//                         {form.getFieldValue('termStart') ? form.getFieldValue('termStart').format('MMMM D, YYYY') : 'Not selected'}
//                       </div>
//                       <div>
//                         <Text type="secondary">Term End:</Text>{' '}
//                         {form.getFieldValue('termEnd') ? form.getFieldValue('termEnd').format('MMMM D, YYYY') : 'Not specified'}
//                       </div>
//                       <div>
//                         <Text type="secondary">Status:</Text>{' '}
//                         <Tag color={form.getFieldValue('status') === 'active' ? 'green' : 'red'}>
//                           {form.getFieldValue('status')}
//                         </Tag>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               </Col>
              
//               <Col xs={24} md={12}>
//                 <div className="space-y-3">
//                   <div>
//                     <Text strong>Additional Information</Text>
//                     <Divider className="my-2" />
//                     <div className="space-y-2">
//                       <div>
//                         <Text type="secondary">Responsibilities:</Text>
//                         <div className="mt-1">
//                           {form.getFieldValue('responsibilities') || 'Not specified'}
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               </Col>
//             </Row>
//           </>
//         )}
//       </Card>
//     </div>
//   ];

//   return (
//     <Layout style={{ padding: 24, minHeight: "100vh", background: "#f5f5f5" }}>
//       <Card 
//         className="shadow-lg rounded-xl"
//         styles={{ body: { padding: 0 } }}
//       >
//         {/* Header */}
//         <div className="bg-gradient-to-r from-purple-600 to-purple-800 p-6 rounded-t-xl">
//           <div className="flex items-center justify-between">
//             <div className="flex items-center space-x-4">
//               <Button 
//                 type="text" 
//                 icon={<ArrowLeftOutlined />} 
//                 onClick={() => navigate("/committee-members")}
//                 className="text-white hover:bg-purple-700"
//                 size="large"
//               />
//               <div>
//                 <Title level={3} className="!mb-1 !text-white">
//                   Add Committee Member
//                 </Title>
//                 <Text className="text-purple-100">
//                   Add a new member to the committee from existing employees
//                 </Text>
//               </div>
//             </div>
//             <div className="text-right">
//               <Text className="text-purple-200 block">Step {currentStep + 1} of {steps.length}</Text>
//               <Progress 
//                 percent={((currentStep + 1) / steps.length) * 100} 
//                 showInfo={false}
//                 strokeColor="#ffffff"
//                 className="mt-1"
//               />
//             </div>
//           </div>
//         </div>

//         {/* Steps */}
//         <div className="p-6 border-b">
//           <Steps current={currentStep} size="small">
//             {steps.map((step, index) => (
//               <Step key={index} title={step.title} icon={step.icon} />
//             ))}
//           </Steps>
//         </div>

//         {/* Form Content */}
//         <div className="p-6">
//           <Form
//             form={form}
//             layout="vertical"
//             initialValues={{
//               status: 'active',
//               termStart: dayjs() // This sets today's date as default
//             }}
//           >
//             {formContent[currentStep]}

//             {/* Navigation Buttons */}
//             <div className="flex justify-between mt-8 pt-6 border-t">
//               <Button
//                 size="large"
//                 onClick={currentStep === 0 ? () => navigate("/committee-members") : prevStep}
//                 disabled={isSubmitting}
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
//                     loading={isSubmitting}
//                     icon={<TeamOutlined />}
//                   >
//                     Add to Committee
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




import React, { useState, useEffect, useMemo } from "react";
import {
  Layout,
  Form,
  Input,
  Select,
  DatePicker,
  Button,
  Card,
  Row,
  Col,
  Typography,
  Steps,
  Divider,
  Space,
  Avatar,
  Progress,
  Tag,
  message,
  Modal,
  Alert
} from "antd";
import { 
  UserOutlined, 
  TeamOutlined,
  ArrowLeftOutlined,
  PlusOutlined,
  SearchOutlined,
  CrownOutlined,
  CheckCircleOutlined,
  ExclamationCircleOutlined,
  ReloadOutlined
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { useEmployees } from "../hooks/useEmployees";
import dayjs from "dayjs";

const { Title, Text } = Typography;
const { Option } = Select;
const { TextArea } = Input;
const { Step } = Steps;

export default function AddCommitteeMember() {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(0);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [searchText, setSearchText] = useState('');
  const [submitError, setSubmitError] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    employees,
    loading,
    committeePositions,
    addCommitteeMember,
    getEmployeesWithCommitteeStatus,
  } = useEmployees();

  const committeeRoles = [
    'President',
    'ExecutivePresident', 
    'VicePresident',
    'GeneralSecretary',
    'JointGeneralSecretary',
    'OrganizingSecretary',
    'FinanceSecretary',
    'PublicityAndPublicationSecretary',
    'OfficeSecretary',
    'SocialWelfareAffairsSecretary',
    'LegalAffairsSecretary',
    'ReligiousAffairsSecretary',
    'PriyaAndCulturalAffairsSecretary',
    'WomensAffairsSecretary',
    'EnvironmentalAffairsSecretary',
    'ExecutiveWorkingMember'
  ];

  const steps = [
    {
      title: 'Select Employee',
      icon: <UserOutlined />,
      fields: ['employeeId']
    },
    {
      title: 'Committee Details',
      icon: <CrownOutlined />,
      fields: ['position', 'termStart']
    },
    {
      title: 'Review & Submit',
      icon: <TeamOutlined />,
      fields: []
    }
  ];

  // Get all employees with their committee status
  const allEmployees = getEmployeesWithCommitteeStatus();

  // Filter employees based on search
  const filteredEmployees = useMemo(() => {
    if (!searchText) return allEmployees;
    
    return allEmployees.filter(employee =>
      employee.firstName?.toLowerCase().includes(searchText.toLowerCase()) ||
      employee.lastName?.toLowerCase().includes(searchText.toLowerCase()) ||
      employee.employeeId?.toLowerCase().includes(searchText.toLowerCase()) ||
      employee.email?.toLowerCase().includes(searchText.toLowerCase())
    );
  }, [allEmployees, searchText]);

  // Safe date formatting utility function
  const formatDateSafe = (dateValue) => {
    if (!dateValue) return null;
    if (dayjs.isDayjs(dateValue)) {
      return dateValue.format('YYYY-MM-DD');
    }
    if (typeof dateValue === 'string') {
      return dateValue;
    }
    return null;
  };

  const handleEmployeeSelect = (employee) => {
    setSelectedEmployee(employee);
    form.setFieldsValue({
      employeeId: employee._id
    });
    message.success(`Selected: ${employee.firstName} ${employee.lastName}`);
  };

  const nextStep = async () => {
    try {
      const currentStepFields = steps[currentStep].fields;
      await form.validateFields(currentStepFields);
      
      if (currentStep === 0 && !selectedEmployee) {
        message.error('Please select an employee first');
        return;
      }
      
      setCurrentStep(currentStep + 1);
      setSubmitError(null);
    } catch (error) {
      console.log('Validation Failed:', error);
      message.error('Please complete all required fields before proceeding.');
    }
  };

  const prevStep = () => {
    setCurrentStep(currentStep - 1);
    setSubmitError(null);
  };

  const handleFinish = async () => {
    setIsSubmitting(true);
    setSubmitError(null);

    try {
      const values = await form.validateFields();
      
      console.log('Form values:', values);
      
      // Enhanced date handling
      let termStart = null;
      if (values.termStart) {
        termStart = formatDateSafe(values.termStart);
      } else {
        // If no date selected, use today's date
        termStart = dayjs().format('YYYY-MM-DD');
      }
      
      console.log('Term Start after formatting:', termStart);

      if (!termStart) {
        setSubmitError({
          type: 'VALIDATION_ERROR',
          message: 'Please select a valid term start date.'
        });
        setIsSubmitting(false);
        return;
      }

      const committeeData = {
        employeeId: values.employeeId,
        position: values.position,
        termStart: termStart,
        termEnd: formatDateSafe(values.termEnd),
        responsibilities: values.responsibilities,
        status: values.status || 'active'
      };

      console.log('Committee data to submit:', committeeData);

      // Validate position availability
      const isPositionTaken = allEmployees.some(emp => 
        emp.committee?.position === committeeData.position && 
        emp.committee?.status === 'active'
      );

      if (isPositionTaken) {
        setSubmitError({
          type: 'POSITION_TAKEN',
          message: `The position "${committeeData.position}" is already assigned to another active committee member. Please choose a different position.`
        });
        setIsSubmitting(false);
        return;
      }

      // Validate employee not already in committee
      const isAlreadyInCommittee = allEmployees.some(emp => 
        emp._id === committeeData.employeeId && 
        emp.isCommitteeMember && 
        emp.committee?.status === 'active'
      );

      if (isAlreadyInCommittee) {
        setSubmitError({
          type: 'ALREADY_IN_COMMITTEE',
          message: 'This employee is already an active committee member. Please select a different employee.'
        });
        setIsSubmitting(false);
        return;
      }

      // Add to committee using Redux
      addCommitteeMember(committeeData);
      
      message.success('🎉 Committee member added successfully!');
      
      // Reset form and navigate after a brief delay to show success message
      setTimeout(() => {
        form.resetFields();
        setSelectedEmployee(null);
        setSearchText('');
        setCurrentStep(0);
        navigate('/committee-members');
      }, 1500);
      
    } catch (error) {
      console.error('Submission Error:', error);
      
      let errorMessage = 'Failed to add committee member. Please try again.';
      
      if (error.message?.includes('network') || error.message?.includes('Network Error')) {
        errorMessage = 'Network connection error. Please check your internet connection and try again.';
      } else if (error.message?.includes('timeout')) {
        errorMessage = 'Request timeout. Please try again in a moment.';
      }

      setSubmitError({
        type: 'SUBMISSION_ERROR',
        message: errorMessage,
        details: error.message
      });
      
      message.error(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleRetry = () => {
    setSubmitError(null);
    handleFinish();
  };

  const handleResetForm = () => {
    setSubmitError(null);
    setCurrentStep(0);
    form.resetFields();
    setSelectedEmployee(null);
    // Reset form with default values
    setTimeout(() => {
      form.setFieldsValue({
        status: 'active',
        termStart: dayjs()
      });
    }, 0);
  };

  const getRoleColor = (role) => {
    const roleColors = {
      President: 'red',
      ExecutivePresident: 'volcano',
      VicePresident: 'orange',
      GeneralSecretary: 'gold',
      JointGeneralSecretary: 'lime',
      OrganizingSecretary: 'green',
      FinanceSecretary: 'cyan',
      PublicityAndPublicationSecretary: 'blue',
      OfficeSecretary: 'purple',
      ExecutiveWorkingMember: 'default'
    };
    return roleColors[role] || 'blue';
  };

  // Error display component
  const ErrorDisplay = () => {
    if (!submitError) return null;

    let actionButtons = [];

    switch (submitError.type) {
      case 'POSITION_TAKEN':
      case 'ALREADY_IN_COMMITTEE':
      case 'VALIDATION_ERROR':
        actionButtons = [
          <Button key="modify" type="primary" onClick={() => setSubmitError(null)}>
            Modify Selection
          </Button>
        ];
        break;
      case 'SUBMISSION_ERROR':
        actionButtons = [
          <Button key="retry" type="primary" icon={<ReloadOutlined />} onClick={handleRetry}>
            Try Again
          </Button>,
          <Button key="reset" onClick={handleResetForm}>
            Start Over
          </Button>
        ];
        break;
      default:
        actionButtons = [
          <Button key="retry" type="primary" onClick={handleRetry}>
            Try Again
          </Button>
        ];
    }

    return (
      <Alert
        message={
          <div>
            <ExclamationCircleOutlined style={{ color: '#ff4d4f', marginRight: 8 }} />
            <strong>Unable to Add Committee Member</strong>
          </div>
        }
        description={
          <div>
            <div style={{ marginBottom: 8 }}>{submitError.message}</div>
            {submitError.details && (
              <Text type="secondary" style={{ fontSize: '12px' }}>
                Technical details: {submitError.details}
              </Text>
            )}
          </div>
        }
        type="error"
        showIcon={false}
        action={
          <Space direction="vertical" size="small">
            {actionButtons}
          </Space>
        }
        style={{ marginBottom: 16 }}
      />
    );
  };

  const formContent = [
    // Step 0: Select Employee
    <div key="step0">
      <ErrorDisplay />
      
      <Row gutter={[24, 16]}>
        <Col xs={24}>
          <div className="mb-4">
            <Input
              placeholder="Search employees by name, ID, or email..."
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              prefix={<SearchOutlined />}
              size="large"
              allowClear
            />
          </div>

          <div className="max-h-96 overflow-y-auto border rounded-lg">
            {filteredEmployees.length === 0 ? (
              <div className="p-8 text-center">
                <UserOutlined style={{ fontSize: 48, color: '#d9d9d9', marginBottom: 16 }} />
                <Text type="secondary">No employees found matching your search</Text>
              </div>
            ) : (
              filteredEmployees.map((employee) => (
                <div
                  key={employee._id}
                  className={`p-4 border-b cursor-pointer transition-all hover:bg-blue-50 ${
                    selectedEmployee?._id === employee._id ? 'bg-blue-100 border-blue-500' : ''
                  } ${employee.isCommitteeMember ? 'bg-orange-50' : ''}`}
                  onClick={() => !employee.isCommitteeMember && handleEmployeeSelect(employee)}
                >
                  <div className="flex items-center space-x-3">
                    <Avatar 
                      src={employee.image} 
                      icon={<UserOutlined />}
                      size="large"
                    />
                    <div className="flex-1">
                      <div className="flex items-center space-x-2">
                        <div className="font-semibold">
                          {employee.firstName} {employee.lastName}
                        </div>
                        {employee.isCommitteeMember && (
                          <Tag color="orange" icon={<CheckCircleOutlined />}>
                            Already in Committee
                          </Tag>
                        )}
                      </div>
                      <div className="text-sm text-gray-600">
                        {employee.email}
                      </div>
                      <div className="text-xs text-gray-500">
                        {employee.employeeId} • {employee.department} • {employee.position}
                      </div>
                    </div>
                    {employee.isCommitteeMember ? (
                      <Tag color="red">Cannot Select</Tag>
                    ) : (
                      <Button 
                        type="primary" 
                        size="small"
                        icon={<PlusOutlined />}
                      >
                        Select
                      </Button>
                    )}
                  </div>
                </div>
              ))
            )}
          </div>

          {selectedEmployee && (
            <Card 
              title="Selected Employee" 
              size="small" 
              className="mt-4 bg-green-50 border-green-200"
            >
              <div className="flex items-center space-x-3">
                <Avatar 
                  src={selectedEmployee.image} 
                  icon={<UserOutlined />}
                  size={60}
                />
                <div>
                  <div className="font-semibold text-lg">
                    {selectedEmployee.firstName} {selectedEmployee.lastName}
                  </div>
                  <div className="text-gray-600">{selectedEmployee.email}</div>
                  <div className="text-sm text-gray-500">
                    {selectedEmployee.employeeId} • {selectedEmployee.department}
                  </div>
                  <div className="text-sm text-gray-500">
                    Position: {selectedEmployee.position}
                  </div>
                </div>
              </div>
            </Card>
          )}
        </Col>
      </Row>
    </div>,

    // Step 1: Committee Details
    <div key="step1">
      <ErrorDisplay />
      
      <Row gutter={[16, 16]}>
        <Col xs={24}>
          <Form.Item
            name="position"
            label="Committee Role"
            rules={[{ required: true, message: "Please select committee role" }]}
          >
            <Select 
              size="large" 
              placeholder="Select committee role"
              optionLabelProp="label"
            >
              {committeeRoles.map(role => (
                <Option key={role} value={role} label={role}>
                  <Tag color={getRoleColor(role)} className="w-full text-center">
                    {role.replace(/([A-Z])/g, ' $1').trim()}
                  </Tag>
                </Option>
              ))}
            </Select>
          </Form.Item>
        </Col>

        <Col xs={24} md={12}>
          <Form.Item
            name="termStart"
            label="Term Start Date"
            rules={[{ required: true, message: "Please select term start date" }]}
            initialValue={dayjs()} // Set initial value here
          >
            <DatePicker 
              style={{ width: "100%" }} 
              size="large"
              format="YYYY-MM-DD"
              placeholder="Select start date"
            />
          </Form.Item>
        </Col>

        <Col xs={24} md={12}>
          <Form.Item name="termEnd" label="Term End Date">
            <DatePicker 
              style={{ width: "100%" }} 
              size="large"
              format="YYYY-MM-DD"
              placeholder="Optional"
            />
          </Form.Item>
        </Col>

        <Col xs={24}>
          <Form.Item name="responsibilities" label="Responsibilities">
            <TextArea 
              rows={3} 
              placeholder="Describe the member's responsibilities and duties..."
              showCount 
              maxLength={500}
            />
          </Form.Item>
        </Col>

        <Col xs={24}>
          <Form.Item
            name="status"
            label="Status"
            initialValue="active"
          >
            <Select>
              <Option value="active">Active</Option>
              <Option value="inactive">Inactive</Option>
              <Option value="suspended">Suspended</Option>
            </Select>
          </Form.Item>
        </Col>
      </Row>
    </div>,

    // Step 2: Review & Submit
    <div key="step2">
      <ErrorDisplay />
      
      <Card title="Review Committee Member Information" className="mb-4">
        {selectedEmployee && (
          <>
            <div className="mb-6 p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center space-x-4">
                <Avatar 
                  size={80} 
                  src={selectedEmployee.image} 
                  icon={<UserOutlined />}
                />
                <div>
                  <Title level={4} className="!mb-1">
                    {selectedEmployee.firstName} {selectedEmployee.lastName}
                  </Title>
                  <Text type="secondary">{selectedEmployee.email}</Text>
                  <div className="mt-1">
                    <Tag>{selectedEmployee.employeeId}</Tag>
                    <Tag>{selectedEmployee.department}</Tag>
                  </div>
                </div>
              </div>
            </div>

            <Row gutter={[16, 16]}>
              <Col xs={24} md={12}>
                <div className="space-y-3">
                  <div>
                    <Text strong>Committee Details</Text>
                    <Divider className="my-2" />
                    <div className="space-y-2">
                      <div>
                        <Text type="secondary">Role:</Text>{' '}
                        <Tag color={getRoleColor(form.getFieldValue('position'))}>
                          {form.getFieldValue('position')}
                        </Tag>
                      </div>
                      <div>
                        <Text type="secondary">Term Start:</Text>{' '}
                        {form.getFieldValue('termStart') ? form.getFieldValue('termStart').format('MMMM D, YYYY') : 'Not selected'}
                      </div>
                      <div>
                        <Text type="secondary">Term End:</Text>{' '}
                        {form.getFieldValue('termEnd') ? form.getFieldValue('termEnd').format('MMMM D, YYYY') : 'Not specified'}
                      </div>
                      <div>
                        <Text type="secondary">Status:</Text>{' '}
                        <Tag color={form.getFieldValue('status') === 'active' ? 'green' : 'red'}>
                          {form.getFieldValue('status')}
                        </Tag>
                      </div>
                    </div>
                  </div>
                </div>
              </Col>
              
              <Col xs={24} md={12}>
                <div className="space-y-3">
                  <div>
                    <Text strong>Additional Information</Text>
                    <Divider className="my-2" />
                    <div className="space-y-2">
                      <div>
                        <Text type="secondary">Responsibilities:</Text>
                        <div className="mt-1">
                          {form.getFieldValue('responsibilities') || 'Not specified'}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </Col>
            </Row>
          </>
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
        <div className="bg-gradient-to-r from-purple-600 to-purple-800 p-6 rounded-t-xl">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Button 
                type="text" 
                icon={<ArrowLeftOutlined />} 
                onClick={() => navigate("/committee-members")}
                className="text-white hover:bg-purple-700"
                size="large"
              />
              <div>
                <Title level={3} className="!mb-1 !text-white">
                  Add Committee Member
                </Title>
                <Text className="text-purple-100">
                  Add a new member to the committee from existing employees
                </Text>
              </div>
            </div>
            <div className="text-right">
              <Text className="text-purple-200 block">Step {currentStep + 1} of {steps.length}</Text>
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
              status: 'active',
              termStart: dayjs() // This sets today's date as default
            }}
          >
            {formContent[currentStep]}

            {/* Navigation Buttons */}
            <div className="flex justify-between mt-8 pt-6 border-t">
              <Button
                size="large"
                onClick={currentStep === 0 ? () => navigate("/committee-members") : prevStep}
                disabled={isSubmitting}
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
                    loading={isSubmitting}
                    icon={<TeamOutlined />}
                  >
                    Add to Committee
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





