// // components/welfare/ApplyForAid.jsx
// import React, { useState, useEffect } from 'react';
// import { 
//   Card, 
//   Form, 
//   Input, 
//   Select, 
//   InputNumber, 
//   DatePicker, 
//   Button, 
//   Upload, 
//   message,
//   Steps,
//   Row,
//   Col,
//   Alert,
//   Divider
// } from 'antd';
// import { 
//   UploadOutlined, 
//   InboxOutlined,
//   InfoCircleOutlined
// } from '@ant-design/icons';
// import './ApplyForAid.css';

// const { TextArea } = Input;
// const { Option } = Select;
// const { Step } = Steps;
// const { Dragger } = Upload;

// const ApplyForAid = () => {
//   const [currentStep, setCurrentStep] = useState(0);
//   const [form] = Form.useForm();
//   const [initiatives, setInitiatives] = useState([]);
//   const [loading, setLoading] = useState(false);

//   useEffect(() => {
//     fetchInitiatives();
//   }, []);

//   const fetchInitiatives = async () => {
//     // Replace with actual API call
//     setInitiatives([
//       { id: 1, title: "Education Support Program", category: "Education" },
//       { id: 2, title: "Healthcare Assistance", category: "Healthcare" },
//       { id: 3, title: "Emergency Relief Fund", category: "Emergency" }
//     ]);
//   };

//   const steps = [
//     {
//       title: 'Program Selection',
//       content: 'Select the welfare program and provide basic information',
//     },
//     {
//       title: 'Application Details',
//       content: 'Provide detailed information about your needs',
//     },
//     {
//       title: 'Documents & Review',
//       content: 'Upload supporting documents and review your application',
//     },
//   ];

//   const handleNext = () => {
//     form.validateFields()
//       .then(() => {
//         setCurrentStep(currentStep + 1);
//       })
//       .catch(error => {
//         console.log('Validation failed:', error);
//       });
//   };

//   const handlePrev = () => {
//     setCurrentStep(currentStep - 1);
//   };

//   const handleSubmit = async (values) => {
//     setLoading(true);
//     try {
//       // API call to submit application
//       console.log('Submitting application:', values);
//       message.success('Application submitted successfully!');
//       form.resetFields();
//       setCurrentStep(0);
//     } catch (error) {
//       message.error('Failed to submit application. Please try again.');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const uploadProps = {
//     name: 'file',
//     multiple: true,
//     action: '/api/upload',
//     onChange(info) {
//       const { status } = info.file;
//       if (status !== 'uploading') {
//         console.log(info.file, info.fileList);
//       }
//       if (status === 'done') {
//         message.success(`${info.file.name} file uploaded successfully.`);
//       } else if (status === 'error') {
//         message.error(`${info.file.name} file upload failed.`);
//       }
//     },
//     onDrop(e) {
//       console.log('Dropped files', e.dataTransfer.files);
//     },
//   };

//   return (
//     <div className="apply-for-aid">
//       <Card title="Apply for Welfare Assistance">
//         <Alert
//           message="Important Information"
//           description="Please ensure all information provided is accurate. Incomplete or false information may lead to application rejection. You can save your progress and complete later."
//           type="info"
//           showIcon
//           icon={<InfoCircleOutlined />}
//           style={{ marginBottom: 24 }}
//         />

//         <Steps current={currentStep} style={{ marginBottom: 32 }}>
//           {steps.map(item => (
//             <Step key={item.title} title={item.title} description={item.content} />
//           ))}
//         </Steps>

//         <Form
//           form={form}
//           layout="vertical"
//           onFinish={handleSubmit}
//           scrollToFirstError
//         >
//           {/* Step 1: Program Selection */}
//           {currentStep === 0 && (
//             <div className="step-content">
//               <Row gutter={16}>
//                 <Col xs={24} sm={12}>
//                   <Form.Item
//                     name="initiative"
//                     label="Select Welfare Program"
//                     rules={[{ required: true, message: 'Please select a program' }]}
//                   >
//                     <Select placeholder="Choose a welfare program">
//                       {initiatives.map(initiative => (
//                         <Option key={initiative.id} value={initiative.id}>
//                           {initiative.title} - {initiative.category}
//                         </Option>
//                       ))}
//                     </Select>
//                   </Form.Item>
//                 </Col>
//                 <Col xs={24} sm={12}>
//                   <Form.Item
//                     name="category"
//                     label="Assistance Category"
//                     rules={[{ required: true, message: 'Please select category' }]}
//                   >
//                     <Select placeholder="Select assistance category">
//                       <Option value="Financial Aid">Financial Aid</Option>
//                       <Option value="Healthcare">Healthcare</Option>
//                       <Option value="Education">Education</Option>
//                       <Option value="Emergency">Emergency</Option>
//                       <Option value="Elderly Care">Elderly Care</Option>
//                     </Select>
//                   </Form.Item>
//                 </Col>
//               </Row>

//               <Form.Item
//                 name="urgency"
//                 label="Urgency Level"
//                 rules={[{ required: true, message: 'Please select urgency level' }]}
//               >
//                 <Select placeholder="How urgent is your need?">
//                   <Option value="Low">Low - Can wait 2+ weeks</Option>
//                   <Option value="Medium">Medium - Need within 2 weeks</Option>
//                   <Option value="High">High - Need within 1 week</Option>
//                   <Option value="Critical">Critical - Immediate need</Option>
//                 </Select>
//               </Form.Item>
//             </div>
//           )}

//           {/* Step 2: Application Details */}
//           {currentStep === 1 && (
//             <div className="step-content">
//               <Form.Item
//                 name="reason"
//                 label="Reason for Application"
//                 rules={[{ required: true, message: 'Please explain your situation' }]}
//               >
//                 <TextArea 
//                   rows={4} 
//                   placeholder="Please provide detailed explanation of your situation and why you need assistance..."
//                 />
//               </Form.Item>

//               <Form.Item
//                 name="amountRequested"
//                 label="Amount Requested"
//                 rules={[{ required: true, message: 'Please enter amount' }]}
//               >
//                 <InputNumber
//                   style={{ width: '100%' }}
//                   formatter={value => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
//                   parser={value => value.replace(/\$\s?|(,*)/g, '')}
//                   placeholder="Enter amount needed"
//                 />
//               </Form.Item>

//               <Divider orientation="left">Family Information</Divider>
              
//               <Row gutter={16}>
//                 <Col xs={24} sm={8}>
//                   <Form.Item
//                     name="familyDetails.totalMembers"
//                     label="Total Family Members"
//                     rules={[{ required: true, message: 'Please enter number' }]}
//                   >
//                     <InputNumber 
//                       style={{ width: '100%' }} 
//                       min={1} 
//                       placeholder="Number of members" 
//                     />
//                   </Form.Item>
//                 </Col>
//                 <Col xs={24} sm={8}>
//                   <Form.Item
//                     name="familyDetails.dependents"
//                     label="Number of Dependents"
//                     rules={[{ required: true, message: 'Please enter number' }]}
//                   >
//                     <InputNumber 
//                       style={{ width: '100%' }} 
//                       min={0} 
//                       placeholder="Children/elderly" 
//                     />
//                   </Form.Item>
//                 </Col>
//                 <Col xs={24} sm={8}>
//                   <Form.Item
//                     name="familyDetails.monthlyIncome"
//                     label="Monthly Income"
//                     rules={[{ required: true, message: 'Please enter income' }]}
//                   >
//                     <InputNumber
//                       style={{ width: '100%' }}
//                       formatter={value => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
//                       parser={value => value.replace(/\$\s?|(,*)/g, '')}
//                       placeholder="Total monthly income"
//                     />
//                   </Form.Item>
//                 </Col>
//               </Row>
//             </div>
//           )}

//           {/* Step 3: Documents & Review */}
//           {currentStep === 2 && (
//             <div className="step-content">
//               <Form.Item
//                 name="supportingDocuments"
//                 label="Supporting Documents"
//                 extra="Upload relevant documents like income proof, medical reports, bills, etc."
//               >
//                 <Dragger {...uploadProps}>
//                   <p className="ant-upload-drag-icon">
//                     <InboxOutlined />
//                   </p>
//                   <p className="ant-upload-text">Click or drag files to this area to upload</p>
//                   <p className="ant-upload-hint">
//                     Support for single or bulk upload. Strictly prohibit from uploading company data or other band files
//                   </p>
//                 </Dragger>
//               </Form.Item>

//               <Card title="Application Summary" size="small" style={{ marginTop: 24 }}>
//                 <p><strong>Please review your application before submitting:</strong></p>
//                 <ul>
//                   <li>All information provided is accurate and complete</li>
//                   <li>Supporting documents are attached</li>
//                   <li>You understand this application will be reviewed by the welfare committee</li>
//                   <li>You agree to provide additional information if requested</li>
//                 </ul>
//               </Card>
//             </div>
//           )}

//           <div className="steps-action" style={{ marginTop: 24 }}>
//             {currentStep > 0 && (
//               <Button style={{ marginRight: 8 }} onClick={handlePrev}>
//                 Previous
//               </Button>
//             )}
//             {currentStep < steps.length - 1 && (
//               <Button type="primary" onClick={handleNext}>
//                 Next
//               </Button>
//             )}
//             {currentStep === steps.length - 1 && (
//               <Button 
//                 type="primary" 
//                 htmlType="submit" 
//                 loading={loading}
//               >
//                 Submit Application
//               </Button>
//             )}
//           </div>
//         </Form>
//       </Card>
//     </div>
//   );
// };

// export default ApplyForAid;




// components/welfare/ApplyForAid.jsx
import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
// import {
//   DocumentTextIcon,
//   UserGroupIcon,
//   CurrencyDollarIcon,
//   CalendarIcon,
//   ExclamationCircleIcon,
//   CheckCircleIcon
// } from '@heroicons/react/24/outline';
import {
  FileTextOutlined,
  TeamOutlined,
  DollarOutlined,
  CalendarOutlined,
  ExclamationCircleOutlined,
  CheckCircleOutlined
} from "@ant-design/icons";

const ApplyForAid = () => {
  const [searchParams] = useSearchParams();
  const [initiatives, setInitiatives] = useState([]);
  const [selectedInitiative, setSelectedInitiative] = useState('');
  const [formData, setFormData] = useState({
    initiative: searchParams.get('initiative') || '',
    category: '',
    reason: '',
    amountRequested: '',
    urgency: 'Medium',
    familyDetails: {
      totalMembers: '',
      dependents: '',
      monthlyIncome: '',
      expenses: ''
    },
    supportingDocuments: []
  });
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    fetchInitiatives();
    if (searchParams.get('initiative')) {
      setFormData(prev => ({ ...prev, initiative: searchParams.get('initiative') }));
    }
  }, [searchParams]);

  const fetchInitiatives = async () => {
    try {
      const response = await fetch('/api/welfare/initiatives?status=Active', {
        headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
      });
      const data = await response.json();
      setInitiatives(data.initiatives || []);
    } catch (error) {
      console.error('Error fetching initiatives:', error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name.startsWith('familyDetails.')) {
      const field = name.split('.')[1];
      setFormData(prev => ({
        ...prev,
        familyDetails: { ...prev.familyDetails, [field]: value }
      }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const response = await fetch('/api/welfare/applications', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        setSubmitted(true);
      } else {
        throw new Error('Failed to submit application');
      }
    } catch (error) {
      console.error('Error submitting application:', error);
      alert('Failed to submit application. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const steps = [
    { number: 1, title: 'Program Selection', description: 'Choose welfare program' },
    { number: 2, title: 'Application Details', description: 'Provide your information' },
    { number: 3, title: 'Review & Submit', description: 'Verify and submit' }
  ];

  if (submitted) {
    return (
      <div className="min-h-screen bg-gray-50 p-6">
        <div className="max-w-2xl mx-auto">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 text-center">
            <CheckCircleOutlined className="mx-auto h-16 w-16 text-green-500 mb-4" />
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Application Submitted!</h2>
            <p className="text-gray-600 mb-6">
              Your welfare application has been successfully submitted. You will receive an update within 3-5 business days.
            </p>
            <div className="space-y-4">
              <button
                onClick={() => window.location.href = '/welfare/apply'}
                className="w-full inline-flex justify-center items-center px-6 py-3 border border-transparent rounded-lg text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 transition-colors duration-200"
              >
                Submit Another Application
              </button>
              <button
                onClick={() => window.location.href = '/welfare'}
                className="w-full inline-flex justify-center items-center px-6 py-3 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 transition-colors duration-200"
              >
                Back to Welfare Dashboard
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Apply for Welfare Assistance</h1>
          <p className="text-gray-600 mt-2">Complete the form below to apply for community welfare support</p>
        </div>

        {/* Progress Steps */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-8">
          <div className="flex items-center justify-between">
            {steps.map((stepItem, index) => (
              <div key={stepItem.number} className="flex items-center">
                <div className={`flex items-center justify-center w-8 h-8 rounded-full border-2 ${
                  step >= stepItem.number 
                    ? 'bg-blue-600 border-blue-600 text-white' 
                    : 'border-gray-300 text-gray-500'
                }`}>
                  {stepItem.number}
                </div>
                <div className="ml-3 hidden sm:block">
                  <div className={`text-sm font-medium ${
                    step >= stepItem.number ? 'text-blue-600' : 'text-gray-500'
                  }`}>
                    {stepItem.title}
                  </div>
                  <div className="text-xs text-gray-500">{stepItem.description}</div>
                </div>
                {index < steps.length - 1 && (
                  <div className={`mx-6 w-12 h-0.5 ${
                    step > stepItem.number ? 'bg-blue-600' : 'bg-gray-300'
                  }`} />
                )}
              </div>
            ))}
          </div>
        </div>

        <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          {/* Step 1: Program Selection */}
          {step === 1 && (
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Select Welfare Program *
                </label>
                <select
                  name="initiative"
                  value={formData.initiative}
                  onChange={handleInputChange}
                  required
                  className="w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                >
                  <option value="">Choose a program</option>
                  {initiatives.map(initiative => (
                    <option key={initiative._id} value={initiative._id}>
                      {initiative.title} - {initiative.category}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Assistance Category *
                </label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleInputChange}
                  required
                  className="w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                >
                  <option value="">Select category</option>
                  <option value="Financial Aid">Financial Aid</option>
                  <option value="Healthcare">Healthcare</option>
                  <option value="Education">Education</option>
                  <option value="Emergency">Emergency</option>
                  <option value="Elderly Care">Elderly Care</option>
                  <option value="Children Welfare">Children Welfare</option>
                  <option value="Disability Support">Disability Support</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Urgency Level *
                </label>
                <select
                  name="urgency"
                  value={formData.urgency}
                  onChange={handleInputChange}
                  required
                  className="w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                >
                  <option value="Low">Low - Can wait 2+ weeks</option>
                  <option value="Medium">Medium - Need within 2 weeks</option>
                  <option value="High">High - Need within 1 week</option>
                  <option value="Critical">Critical - Immediate need</option>
                </select>
              </div>
            </div>
          )}

          {/* Step 2: Application Details */}
          {step === 2 && (
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Reason for Application *
                </label>
                <textarea
                  name="reason"
                  value={formData.reason}
                  onChange={handleInputChange}
                  required
                  rows={4}
                  placeholder="Please provide detailed explanation of your situation and why you need assistance..."
                  className="w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Amount Requested (USD) *
                </label>
                <input
                  type="number"
                  name="amountRequested"
                  value={formData.amountRequested}
                  onChange={handleInputChange}
                  required
                  placeholder="Enter the amount you need"
                  className="w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Total Family Members *
                  </label>
                  <input
                    type="number"
                    name="familyDetails.totalMembers"
                    value={formData.familyDetails.totalMembers}
                    onChange={handleInputChange}
                    required
                    className="w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Number of Dependents *
                  </label>
                  <input
                    type="number"
                    name="familyDetails.dependents"
                    value={formData.familyDetails.dependents}
                    onChange={handleInputChange}
                    required
                    className="w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Monthly Income (USD) *
                  </label>
                  <input
                    type="number"
                    name="familyDetails.monthlyIncome"
                    value={formData.familyDetails.monthlyIncome}
                    onChange={handleInputChange}
                    required
                    className="w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Monthly Expenses (USD) *
                  </label>
                  <input
                    type="number"
                    name="familyDetails.expenses"
                    value={formData.familyDetails.expenses}
                    onChange={handleInputChange}
                    required
                    className="w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Step 3: Review & Submit */}
          {step === 3 && (
            <div className="space-y-6">
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <div className="flex">
                  <ExclamationCircleOutlined className="h-5 w-5 text-blue-400 mr-3 flex-shrink-0" />
                  <div>
                    <h3 className="text-sm font-medium text-blue-800">Review Your Application</h3>
                    <p className="text-sm text-blue-700 mt-1">
                      Please verify all information before submitting. Incomplete or inaccurate information may delay processing.
                    </p>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
                <div>
                  <h4 className="font-medium text-gray-900 mb-3">Program Information</h4>
                  <dl className="space-y-2">
                    <div>
                      <dt className="text-gray-600">Selected Program</dt>
                      <dd className="font-medium">
                        {initiatives.find(i => i._id === formData.initiative)?.title || 'Not selected'}
                      </dd>
                    </div>
                    <div>
                      <dt className="text-gray-600">Category</dt>
                      <dd className="font-medium">{formData.category}</dd>
                    </div>
                    <div>
                      <dt className="text-gray-600">Urgency</dt>
                      <dd className="font-medium">{formData.urgency}</dd>
                    </div>
                  </dl>
                </div>
                <div>
                  <h4 className="font-medium text-gray-900 mb-3">Financial Information</h4>
                  <dl className="space-y-2">
                    <div>
                      <dt className="text-gray-600">Amount Requested</dt>
                      <dd className="font-medium">${formData.amountRequested}</dd>
                    </div>
                    <div>
                      <dt className="text-gray-600">Family Members</dt>
                      <dd className="font-medium">{formData.familyDetails.totalMembers}</dd>
                    </div>
                    <div>
                      <dt className="text-gray-600">Monthly Income</dt>
                      <dd className="font-medium">${formData.familyDetails.monthlyIncome}</dd>
                    </div>
                  </dl>
                </div>
              </div>

              <div className="border-t border-gray-200 pt-6">
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="consent"
                    required
                    className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                  />
                  <label htmlFor="consent" className="ml-3 text-sm text-gray-700">
                    I certify that the information provided is accurate and complete to the best of my knowledge.
                  </label>
                </div>
              </div>
            </div>
          )}

          {/* Navigation Buttons */}
          <div className="flex justify-between pt-8 border-t border-gray-200">
            {step > 1 && (
              <button
                type="button"
                onClick={() => setStep(step - 1)}
                className="px-6 py-3 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 transition-colors duration-200"
              >
                Previous
              </button>
            )}
            {step < 3 ? (
              <button
                type="button"
                onClick={() => setStep(step + 1)}
                className="ml-auto px-6 py-3 border border-transparent rounded-lg text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 transition-colors duration-200"
              >
                Next
              </button>
            ) : (
              <button
                type="submit"
                disabled={loading}
                className="ml-auto px-6 py-3 border border-transparent rounded-lg text-sm font-medium text-white bg-green-600 hover:bg-green-700 disabled:opacity-50 transition-colors duration-200"
              >
                {loading ? 'Submitting...' : 'Submit Application'}
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default ApplyForAid;







