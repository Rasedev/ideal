import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Form, Input, Select, Button, message, DatePicker, Layout,Typography } from "antd";
import axios from "axios";


const { Option } = Select;
const { Title } = Typography;
const { Header } = Layout;

const AddTransferOrder = () => {
  const [form] = Form.useForm();
  const employeeData = useSelector((state) => state.employee.value || []);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (values) => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      console.log("Current token:", token);
      const res = await axios.post(
        "http://localhost:3000/api/v1/transfer-order/createtransfer",

        {
          employeeId: values.employeeId,
          currentWorkplace: values.currentWorkplace,
          newDepartment: values.newDepartment,
          sourceNumber: values.sourceNumber,
          reason: values.reason,
          effectiveDate: values.effectiveDate
            ? new Date(values.effectiveDate)
            : new Date(),
        },
        {
          headers: {
            // "Content-Type": "multipart/form-data",
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      //console.log("Created employee:", res.data.employee);
      console.log("Fetching employees with token:", token);
      console.log("Full Axios response:", res.data);

      message.success("Transfer order created successfully!");
      form.resetFields();
    } catch (error) {
      console.error("Create transfer error:", error);
      message.error(
        error.response?.data?.error || "Failed to create transfer order"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    // <Form
    //   form={form}
    //   layout="vertical"
    //   onFinish={handleSubmit}
    //   className="max-w-xl mx-auto"
    // >
    //   <Form.Item
    //     label="Select Employee"
    //     name="employeeId"
    //     rules={[{ required: true, message: "Please select an employee" }]}
    //   >
    //     <Select placeholder="Choose employee">
    //       {employeeData.map((emp) => (
    //         <Option key={emp._id} value={emp._id}>
    //           {emp.firstName} {emp.lastName} — {emp.erpNumber}
    //         </Option>
    //       ))}
    //     </Select>
    //   </Form.Item>
    //   <Form.Item
    //     label="Current workplace/Old Dept."
    //     name="currentWorkplace"
    //     rules={[{ required: true, message: "Please enter current workplace" }]}
    //   >
    //     <Input placeholder="Current workplace/Old Dept" />
    //   </Form.Item>

    //   <Form.Item
    //     label="Transfer To New Department"
    //     name="newDepartment"
    //     rules={[{ required: true, message: "Please enter new department" }]}
    //   >
    //     <Input placeholder="New Dept" />
    //   </Form.Item>

    //   <Form.Item
    //     label="Source Number"
    //     name="sourceNumber"
    //     rules={[{ required: true, message: "Please provide a source number" }]}
    //   >
    //     <Input placeholder="Source Number" />
    //   </Form.Item>
    //   <Form.Item
    //     name="effectiveDate"
    //     label="Effective Date"
    //     rules={[{ required: true, message: "Please select an effective date" }]}
    //     initialValue={null} // Set initial value to null
    //   >
    //     <DatePicker style={{ width: "100%" }} />
    //   </Form.Item>
    //   <Form.Item
    //     label="Transfer Reason"
    //     name="reason"
    //     rules={[{ required: true, message: "Please provide a reason" }]}
    //   >
    //     <Input.TextArea rows={4} placeholder="Reason for transfer" />
    //   </Form.Item>

    //   <Form.Item>
    //     <Button type="primary" htmlType="submit" loading={loading}>
    //       Submit
    //     </Button>
    //   </Form.Item>
    // </Form>
    
    <Layout className="">
      <Header className="bg-[#FFF] p-0 ">
        <Title
          level={3}
          className="font-railway text-center p-5 text-[clamp(1.5rem,2vw,2rem)] font-semibold text-gray-800 ">
        
      Employee Transfer Form
        </Title>
      </Header>
   <div className="container mx-auto px-4 sm:px-6 lg:px-6 py-6 ">

    <Form
      form={form}
      layout="vertical"
      onFinish={handleSubmit}
      className="max-w-2xl mx-auto bg-white shadow-lg rounded-xl p-6 space-y-5"
    >


      {/* Select Employee */}
      <Form.Item
        label="Select Employee"
        name="employeeId"
        rules={[{ required: true, message: "Please select an employee" }]}
      >
        <Select placeholder="Choose employee">
          {employeeData.map((emp) => (
            <Select.Option key={emp._id} value={emp._id}>
              {emp.firstName} {emp.lastName} — {emp.erpNumber}
            </Select.Option>
          ))}
        </Select>
      </Form.Item>

      {/* Current Workplace */}
      <Form.Item
        label="Current Workplace / Old Department"
        name="currentWorkplace"
        rules={[{ required: true, message: "Please enter current workplace" }]}
      >
        <Input placeholder="Current workplace / Old department" />
      </Form.Item>

      {/* New Department */}
      <Form.Item
        label="Transfer to New Department"
        name="newDepartment"
        rules={[{ required: true, message: "Please enter new department" }]}
      >
        <Input placeholder="New department name" />
      </Form.Item>

      {/* Source Number */}
      <Form.Item
        label="Source Number"
        name="sourceNumber"
        rules={[{ required: true, message: "Please provide a source number" }]}
      >
        <Input placeholder="Source document number" />
      </Form.Item>

      {/* Effective Date */}
      <Form.Item
        label="Effective Date"
        name="effectiveDate"
        rules={[{ required: true, message: "Please select an effective date" }]}
        initialValue={null}
      >
        <DatePicker
          style={{ width: "100%" }}
          format="YYYY-MM-DD"
          placeholder="Select effective date"
        />
      </Form.Item>

      {/* Transfer Reason */}
      <Form.Item
        label="Transfer Reason"
        name="reason"
        rules={[{ required: true, message: "Please provide a reason" }]}
      >
        <Input.TextArea rows={4} placeholder="Reason for transfer" />
      </Form.Item>

      {/* Submit Button */}
      <Form.Item className="text-center">
        <Button
          type="primary"
          htmlType="submit"
          loading={loading}
          className="bg-gradient-to-r from-blue-600 to-blue-800 hover:from-blue-700 hover:to-blue-900 text-white px-6 py-2 rounded-lg shadow-lg transition duration-300 ease-in-out"
        >
          Submit Transfer Request
        </Button>
      </Form.Item>
    </Form>
   </div>

    </Layout>



  );
};

export default AddTransferOrder;
