// import React, { useState, useEffect } from 'react';
// import {
//   Table,
//   Card,
//   Input,
//   Select,
//   Button,
//   Space,
//   Tag,
//   Avatar,
//   DatePicker,
//   Row,
//   Col,
//   Typography,
//   Statistic,
//   Progress,
//   Modal,
//   message,
//   Timeline,
//   Badge,
// } from 'antd';
// import {
//   SearchOutlined,
//   FilterOutlined,
//   CheckCircleOutlined,
//   CloseCircleOutlined,
//   ClockCircleOutlined,
//   UserOutlined,
//   BarChartOutlined,
//   ExportOutlined,
//   ReloadOutlined,
// } from '@ant-design/icons';
// import { useSelector } from 'react-redux';
// import axios from 'axios';
// import dayjs from 'dayjs';

// const { Title } = Typography;
// const { Option } = Select;
// const { RangePicker } = DatePicker;

// const AttendanceSystem = () => {
//   const [attendanceData, setAttendanceData] = useState([]);
//   const [employees, setEmployees] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [selectedDate, setSelectedDate] = useState(dayjs());
//   const [filters, setFilters] = useState({});
//   const [stats, setStats] = useState({});
//   const currentTheme = useSelector((state) => state.theme?.currentTheme || 'light');

//   useEffect(() => {
//     fetchAttendanceData();
//     fetchEmployees();
//     fetchAttendanceStats();
//   }, [selectedDate, filters]);

//   const fetchAttendanceData = async () => {
//     setLoading(true);
//     try {
//       const token = localStorage.getItem('token');
//       const params = {
//         date: selectedDate.format('YYYY-MM-DD'),
//         ...filters,
//       };

//       const response = await axios.get('http://localhost:3000/api/v1/employee/attendance', {
//         headers: { Authorization: `Bearer ${token}` },
//         params,
//       });

//       if (response.data.success) {
//         setAttendanceData(response.data.attendance || []);
//       }
//     } catch (error) {
//       message.error('Failed to fetch attendance data');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const fetchEmployees = async () => {
//     try {
//       const token = localStorage.getItem('token');
//       const response = await axios.get('http://localhost:3000/api/v1/employee/all', {
//         headers: { Authorization: `Bearer ${token}` },
//         params: { limit: 1000 }
//       });

//       if (response.data.success) {
//         setEmployees(response.data.employees || []);
//       }
//     } catch (error) {
//       console.error('Failed to fetch employees');
//     }
//   };

//   const fetchAttendanceStats = async () => {
//     try {
//       const token = localStorage.getItem('token');
//       const response = await axios.get('http://localhost:3000/api/v1/employee/attendance/stats', {
//         headers: { Authorization: `Bearer ${token}` },
//         params: { date: selectedDate.format('YYYY-MM-DD') }
//       });

//       if (response.data.success) {
//         setStats(response.data.stats || {});
//       }
//     } catch (error) {
//       console.error('Failed to fetch attendance stats');
//     }
//   };

//   const handleMarkAttendance = async (employeeId, status) => {
//     try {
//       const token = localStorage.getItem('token');
//       const response = await axios.post(
//         'http://localhost:3000/api/v1/employee/attendance/mark',
//         {
//           employeeId,
//           date: selectedDate.format('YYYY-MM-DD'),
//           status,
//           checkIn: status === 'present' ? new Date().toISOString() : null,
//         },
//         { headers: { Authorization: `Bearer ${token}` } }
//       );

//       if (response.data.success) {
//         message.success(`Attendance marked as ${status}`);
//         fetchAttendanceData();
//         fetchAttendanceStats();
//       }
//     } catch (error) {
//       message.error('Failed to mark attendance');
//     }
//   };

//   const getStatusTag = (status) => {
//     const statusConfig = {
//       present: { color: 'green', icon: <CheckCircleOutlined />, text: 'Present' },
//       absent: { color: 'red', icon: <CloseCircleOutlined />, text: 'Absent' },
//       late: { color: 'orange', icon: <ClockCircleOutlined />, text: 'Late' },
//       half_day: { color: 'blue', icon: <ClockCircleOutlined />, text: 'Half Day' },
//       holiday: { color: 'purple', icon: <CheckCircleOutlined />, text: 'Holiday' },
//     };

//     const config = statusConfig[status] || { color: 'default', text: status };
//     return (
//       <Tag color={config.color} icon={config.icon}>
//         {config.text}
//       </Tag>
//     );
//   };

//   const columns = [
//     {
//       title: 'Employee',
//       dataIndex: 'employee',
//       key: 'employee',
//       render: (employee) => (
//         <Space>
//           <Avatar src={employee?.image} icon={<UserOutlined />} />
//           <div>
//             <div className="font-medium">{`${employee?.firstName} ${employee?.lastName}`}</div>
//             <div className="text-xs text-gray-500">{employee?.employeeId}</div>
//           </div>
//         </Space>
//       ),
//     },
//     {
//       title: 'Department',
//       dataIndex: 'employee',
//       key: 'department',
//       render: (employee) => <Tag>{employee?.department}</Tag>,
//     },
//     {
//       title: 'Check In',
//       dataIndex: 'checkIn',
//       key: 'checkIn',
//       render: (checkIn) => checkIn ? new Date(checkIn).toLocaleTimeString() : '-',
//     },
//     {
//       title: 'Check Out',
//       dataIndex: 'checkOut',
//       key: 'checkOut',
//       render: (checkOut) => checkOut ? new Date(checkOut).toLocaleTimeString() : '-',
//     },
//     {
//       title: 'Status',
//       dataIndex: 'status',
//       key: 'status',
//       render: (status) => getStatusTag(status),
//     },
//     {
//       title: 'Working Hours',
//       key: 'hours',
//       render: (record) => {
//         if (record.checkIn && record.checkOut) {
//           const hours = (new Date(record.checkOut) - new Date(record.checkIn)) / (1000 * 60 * 60);
//           return `${hours.toFixed(2)} hours`;
//         }
//         return '-';
//       },
//     },
//     {
//       title: 'Actions',
//       key: 'actions',
//       render: (record) => (
//         <Space size="small">
//           {!record.status && (
//             <>
//               <Button
//                 type="primary"
//                 size="small"
//                 onClick={() => handleMarkAttendance(record.employee?._id, 'present')}
//               >
//                 Present
//               </Button>
//               <Button
//                 size="small"
//                 onClick={() => handleMarkAttendance(record.employee?._id, 'absent')}
//               >
//                 Absent
//               </Button>
//             </>
//           )}
//           {record.status === 'present' && !record.checkOut && (
//             <Button
//               size="small"
//               onClick={() => handleMarkAttendance(record.employee?._id, 'checkout')}
//             >
//               Check Out
//             </Button>
//           )}
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
//         <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
//           <div>
//             <Title level={2} className={currentTheme === 'dark' ? 'text-white' : 'text-gray-800'}>
//               <BarChartOutlined className="mr-3" />
//               Attendance System
//             </Title>
//             <p className={currentTheme === 'dark' ? 'text-gray-300' : 'text-gray-600'}>
//               Manage employee attendance and track working hours
//             </p>
//           </div>
//           <Space>
//             <DatePicker
//               value={selectedDate}
//               onChange={setSelectedDate}
//               format="YYYY-MM-DD"
//             />
//             <Button 
//               type="primary" 
//               icon={<ReloadOutlined />}
//               onClick={fetchAttendanceData}
//             >
//               Refresh
//             </Button>
//           </Space>
//         </div>

//         {/* Statistics */}
//         <Row gutter={[16, 16]} className="mb-6">
//           <Col xs={24} sm={6}>
//             <Card className="text-center">
//               <Statistic
//                 title="Total Employees"
//                 value={stats.totalEmployees || 0}
//                 valueStyle={{ color: '#1890ff' }}
//               />
//             </Card>
//           </Col>
//           <Col xs={24} sm={6}>
//             <Card className="text-center">
//               <Statistic
//                 title="Present Today"
//                 value={stats.presentToday || 0}
//                 valueStyle={{ color: '#52c41a' }}
//               />
//             </Card>
//           </Col>
//           <Col xs={24} sm={6}>
//             <Card className="text-center">
//               <Statistic
//                 title="Absent Today"
//                 value={stats.absentToday || 0}
//                 valueStyle={{ color: '#ff4d4f' }}
//               />
//             </Card>
//           </Col>
//           <Col xs={24} sm={6}>
//             <Card className="text-center">
//               <Statistic
//                 title="Attendance Rate"
//                 value={stats.attendanceRate || 0}
//                 suffix="%"
//                 valueStyle={{ color: '#722ed1' }}
//               />
//             </Card>
//           </Col>
//         </Row>

//         {/* Filters */}
//         <Row gutter={[16, 16]} className="mb-6">
//           <Col xs={24} sm={12} md={8} lg={6}>
//             <Select
//               placeholder="Filter by Department"
//               style={{ width: '100%' }}
//               allowClear
//               onChange={(value) => setFilters(prev => ({ ...prev, department: value }))}
//             >
//               <Option value="HR">HR</Option>
//               <Option value="Finance">Finance</Option>
//               <Option value="IT">IT</Option>
//               <Option value="Administration">Administration</Option>
//             </Select>
//           </Col>
//           <Col xs={24} sm={12} md={8} lg={6}>
//             <Select
//               placeholder="Filter by Status"
//               style={{ width: '100%' }}
//               allowClear
//               onChange={(value) => setFilters(prev => ({ ...prev, status: value }))}
//             >
//               <Option value="present">Present</Option>
//               <Option value="absent">Absent</Option>
//               <Option value="late">Late</Option>
//               <Option value="half_day">Half Day</Option>
//             </Select>
//           </Col>
//         </Row>

//         {/* Attendance Table */}
//         <Table
//           columns={columns}
//           dataSource={attendanceData}
//           loading={loading}
//           rowKey={record => `${record.employee?._id}-${record.date}`}
//           scroll={{ x: 800 }}
//           pagination={{ pageSize: 10 }}
//           className="responsive-table"
//         />

//         {/* Recent Activity Timeline */}
//         <Card title="Today's Activity" className="mt-6">
//           <Timeline>
//             {attendanceData.slice(0, 5).map((record) => (
//               <Timeline.Item
//                 key={record._id}
//                 color={record.status === 'present' ? 'green' : record.status === 'absent' ? 'red' : 'orange'}
//                 dot={record.status === 'present' ? <CheckCircleOutlined /> : <CloseCircleOutlined />}
//               >
//                 <Space>
//                   <span className="font-medium">
//                     {`${record.employee?.firstName} ${record.employee?.lastName}`}
//                   </span>
//                   <span>marked as</span>
//                   {getStatusTag(record.status)}
//                   <span className="text-gray-500 text-sm">
//                     {record.checkIn && `at ${new Date(record.checkIn).toLocaleTimeString()}`}
//                   </span>
//                 </Space>
//               </Timeline.Item>
//             ))}
//           </Timeline>
//         </Card>
//       </Card>
//     </div>
//   );
// };

// export default AttendanceSystem;




import React, { useState, useEffect, useMemo } from 'react';
import {
  Table,
  Card,
  Input,
  Select,
  Button,
  Space,
  Tag,
  Avatar,
  DatePicker,
  Row,
  Col,
  Typography,
  Statistic,
  Modal,
  message
} from 'antd';
import {
  SearchOutlined,
  CheckCircleOutlined,
  CloseCircleOutlined,
  ClockCircleOutlined,
  UserOutlined,
  BarChartOutlined,
  ReloadOutlined,
  TeamOutlined,
  LogoutOutlined
} from '@ant-design/icons';
import { useEmployees } from '../hooks/useEmployees';
import dayjs from 'dayjs';

const { Title, Text } = Typography;
const { Option } = Select;

const AttendanceSystem = () => {
  const {
    // State
    employees,
    loading,
    attendanceDate,
    
    // Actions
    loadEmployees,
    markEmployeeAttendance,
    markEmployeeCheckOut,
    bulkMarkEmployeeAttendance,
    setAttendanceDate,
    
    // Helper Functions
    getEmployeesWithAttendance,
    getAttendanceStats,
    getFilteredEmployees,
    getDepartments
  } = useEmployees();

  const [searchText, setSearchText] = useState('');
  const [departmentFilter, setDepartmentFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [bulkModalVisible, setBulkModalVisible] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState('present');
  const [selectedDate, setSelectedDate] = useState(dayjs());

  // Load employees on component mount
  useEffect(() => {
    loadEmployees();
  }, [loadEmployees]);

  // Update Redux when date changes
  useEffect(() => {
    setAttendanceDate(selectedDate.format('YYYY-MM-DD'));
  }, [selectedDate, setAttendanceDate]);

  // Get employees with attendance
  const employeesWithAttendance = getEmployeesWithAttendance();
  
  // Get filtered employees
  const filteredEmployees = useMemo(() => {
    return getFilteredEmployees({
      searchText,
      department: departmentFilter,
      status: statusFilter
    });
  }, [getFilteredEmployees, searchText, departmentFilter, statusFilter]);

  // Get statistics
  const stats = getAttendanceStats();

  // Attendance handlers
  const handleMarkAttendance = (employeeId, status) => {
    markEmployeeAttendance({
      employeeId,
      status,
      date: selectedDate.format('YYYY-MM-DD')
    });
    message.success(`Attendance marked as ${status}`);
  };

  const handleCheckOut = (employeeId) => {
    markEmployeeCheckOut(employeeId, selectedDate.format('YYYY-MM-DD'));
    message.success('Check out recorded');
  };

  const handleBulkMark = () => {
    const absentEmployees = filteredEmployees
      .filter(emp => emp.attendance.status === 'absent')
      .map(emp => emp._id);

    if (absentEmployees.length === 0) {
      message.info('No absent employees to mark');
      return;
    }

    bulkMarkEmployeeAttendance(absentEmployees, selectedStatus, selectedDate.format('YYYY-MM-DD'));
    message.success(`Bulk marked ${absentEmployees.length} employees as ${selectedStatus}`);
    setBulkModalVisible(false);
  };

  const getStatusTag = (status) => {
    const config = {
      present: { color: 'green', icon: <CheckCircleOutlined />, text: 'Present' },
      absent: { color: 'red', icon: <CloseCircleOutlined />, text: 'Absent' },
      late: { color: 'orange', icon: <ClockCircleOutlined />, text: 'Late' },
      half_day: { color: 'blue', icon: <ClockCircleOutlined />, text: 'Half Day' },
    }[status] || { color: 'default', text: status };

    return (
      <Tag color={config.color} icon={config.icon}>
        {config.text}
      </Tag>
    );
  };

  const columns = [
    {
      title: 'Employee',
      key: 'employee',
      width: 250,
      render: (record) => (
        <Space>
          <Avatar 
            src={record.image} 
            icon={<UserOutlined />}
            style={{ backgroundColor: '#87d068' }}
          />
          <div>
            <div className="font-medium">{`${record.firstName} ${record.lastName}`}</div>
            <div className="text-xs text-gray-500">
              {record.employeeId} • {record.department}
            </div>
          </div>
        </Space>
      ),
    },
    {
      title: 'Check In',
      dataIndex: ['attendance', 'checkIn'],
      key: 'checkIn',
      render: (checkIn) => checkIn ? dayjs(checkIn).format('HH:mm') : '-',
    },
    {
      title: 'Check Out',
      dataIndex: ['attendance', 'checkOut'],
      key: 'checkOut',
      render: (checkOut) => checkOut ? dayjs(checkOut).format('HH:mm') : '-',
    },
    {
      title: 'Status',
      dataIndex: ['attendance', 'status'],
      key: 'status',
      render: (status) => getStatusTag(status),
    },
    {
      title: 'Hours',
      key: 'hours',
      render: (record) => record.attendance.workingHours > 0 ? 
        `${record.attendance.workingHours}h` : '-',
    },
    {
      title: 'Actions',
      key: 'actions',
      width: 200,
      render: (record) => (
        <Space size="small">
          {record.attendance.status === 'absent' ? (
            <>
              <Button
                type="primary"
                size="small"
                onClick={() => handleMarkAttendance(record._id, 'present')}
              >
                Present
              </Button>
              <Button
                size="small"
                onClick={() => handleMarkAttendance(record._id, 'late')}
              >
                Late
              </Button>
            </>
          ) : record.attendance.status === 'present' && !record.attendance.checkOut ? (
            <Button
              size="small"
              icon={<LogoutOutlined />}
              onClick={() => handleCheckOut(record._id)}
            >
              Check Out
            </Button>
          ) : (
            <Text type="secondary">Completed</Text>
          )}
        </Space>
      ),
    },
  ];

  return (
    <div className="min-h-screen p-6 bg-gray-50">
      {/* Header Section */}
      <div className="mb-6">
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
          <div>
            <Title level={2} className="flex items-center">
              <BarChartOutlined className="mr-3 text-blue-600" />
              Attendance System
            </Title>
            <Text type="secondary" className="text-lg">
              Employee Attendance Management
            </Text>
          </div>
          <Space>
            <DatePicker
              value={selectedDate}
              onChange={setSelectedDate}
              format="YYYY-MM-DD"
              allowClear={false}
              className="w-40"
            />
            <Button 
              type="primary" 
              icon={<ReloadOutlined />}
              onClick={loadEmployees}
              loading={loading}
            >
              Refresh
            </Button>
            <Button 
              icon={<TeamOutlined />}
              onClick={() => setBulkModalVisible(true)}
            >
              Bulk Mark
            </Button>
          </Space>
        </div>
      </div>

      {/* Statistics Cards */}
      <Row gutter={[16, 16]} className="mb-6">
        <Col xs={24} sm={12} md={6}>
          <Card className="text-center shadow-sm">
            <Statistic
              title="Total Employees"
              value={stats.totalEmployees || 0}
              prefix={<TeamOutlined />}
              valueStyle={{ color: '#1890ff' }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} md={6}>
          <Card className="text-center shadow-sm">
            <Statistic
              title="Present Today"
              value={stats.presentToday || 0}
              valueStyle={{ color: '#52c41a' }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} md={6}>
          <Card className="text-center shadow-sm">
            <Statistic
              title="Absent Today"
              value={stats.absentToday || 0}
              valueStyle={{ color: '#ff4d4f' }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} md={6}>
          <Card className="text-center shadow-sm">
            <Statistic
              title="Attendance Rate"
              value={stats.attendanceRate || 0}
              suffix="%"
              valueStyle={{ color: '#722ed1' }}
            />
          </Card>
        </Col>
      </Row>

      {/* Filters Section */}
      <Card className="mb-6 shadow-sm">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <Input
              placeholder="Search employees..."
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              prefix={<SearchOutlined />}
              size="large"
            />
          </div>
          <Select
            placeholder="Department"
            size="large"
            style={{ width: 200 }}
            value={departmentFilter}
            allowClear
            onChange={setDepartmentFilter}
          >
            <Option value="all">All Departments</Option>
            {getDepartments.map(dept => (
              <Option key={dept} value={dept}>{dept}</Option>
            ))}
          </Select>
          <Select
            placeholder="Status"
            size="large"
            style={{ width: 150 }}
            value={statusFilter}
            allowClear
            onChange={setStatusFilter}
          >
            <Option value="all">All Status</Option>
            <Option value="present">Present</Option>
            <Option value="absent">Absent</Option>
            <Option value="late">Late</Option>
            <Option value="half_day">Half Day</Option>
          </Select>
        </div>
      </Card>

      {/* Attendance Table */}
      <Card 
        title={
          <Space>
            <TeamOutlined />
            <span>Today's Attendance</span>
            <Tag color="blue">{filteredEmployees.length}</Tag>
          </Space>
        }
        className="shadow-sm"
      >
        <Table
          columns={columns}
          dataSource={filteredEmployees}
          loading={loading}
          rowKey="_id"
          scroll={{ x: 800 }}
          pagination={{ 
            pageSize: 10,
            showSizeChanger: true,
            showQuickJumper: true,
            showTotal: (total, range) => 
              `${range[0]}-${range[1]} of ${total} employees`
          }}
        />
      </Card>

      {/* Bulk Mark Modal */}
      <Modal
        title="Bulk Mark Attendance"
        open={bulkModalVisible}
        onCancel={() => setBulkModalVisible(false)}
        onOk={handleBulkMark}
        okText="Mark All"
        cancelText="Cancel"
        confirmLoading={loading}
      >
        <Space direction="vertical" style={{ width: '100%' }} size="middle">
          <div className="flex items-center">
            <Text>Mark all absent employees as:</Text>
            <Select
              value={selectedStatus}
              onChange={setSelectedStatus}
              style={{ width: 120, marginLeft: 12 }}
            >
              <Option value="present">Present</Option>
              <Option value="late">Late</Option>
              <Option value="half_day">Half Day</Option>
            </Select>
          </div>
          <Text type="secondary">
            This will mark attendance for {filteredEmployees.filter(emp => emp.attendance.status === 'absent').length} absent employees.
          </Text>
        </Space>
      </Modal>
    </div>
  );
};

export default AttendanceSystem;








