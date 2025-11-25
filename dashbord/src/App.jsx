  ///////////////////FINAL VERSION///////////////////////


import { createBrowserRouter, createRoutesFromElements, Outlet, Route, RouterProvider } from "react-router-dom";
import { ConfigProvider, theme,Button } from 'antd';
import { Provider, useSelector,useDispatch  } from 'react-redux';
import { SunOutlined, MoonOutlined } from '@ant-design/icons';
import store from './store';
import { toggleTheme } from './components/slices/themeSlice';

// Layout Components
import RootLayout from './components/Layouts/RootLayout';
import AuthLayout from './components/Layouts/AuthLayout';

// Auth Components
import Login from './components/auth/Login';
import Registration from './components/auth/Registration';
import ForgotPassword from './components/auth/ForgotPassword';

// Dashboard Components
import AdminDashboard from './components/dashboard/AdminDashboard';
import HRDashboard from './components/dashboard/HRDashboard';
import EmployeeDashboard from './components/dashboard/EmployeeDashboard';
import MemberDashboard from './components/dashboard/MemberDashboard';

// Management Components
import UserManagement from './components/admin/UserManagement';
import EmployeeManagement from './components/employees/EmployeeManagement';
import MemberManagement from './components/employees/MemberManagement';

// Feature Components
import ViewMap from './components/map/ViewMap';
import Settings from './components/settings/Settings';
 import Profile from './components/settings/Profile';

// Shared Components
import Unauthorized from './components/shared/Unauthorized';
import Error from './components/shared/Error';
import Loading from './components/shared/Loading';

// Route Protection
import PrivateRoute from './components/auth/PrivateRoute';
import RoleBasedRoute from './components/auth/RoleBasedRoute';
 import AddEmployee from "./components/employees/AddEmployee";
import AddMember from "./components/members/Addmember";
import AllMembers from "./components/members/AllMembers";
import RegistrationsMember from "./components/members/RegistrationsMember";
import AllEmployee from "./components/employees/AllEmployee";
import EmployeeProfile from "./components/employees/EmployeeProfile";
import AttendanceSystem from "./components/employees/AttendanceSystem";
import PerformanceReviews from "./components/employees/PerformanceReviews";
 import Email from "./components/apps/Email";
import Chat from "./components/apps/Chat";
import Contact from "./components/apps/Contact";
import SMS from "./components/apps/SMS";
import DashboardContent from './components/Layouts/DashboardContent';
import Application from "./components/apps/Application";

const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;



import MemberApprovals from './components/members/MemberApprovals';
import EmailVerification from "./components/auth/EmailVerification";
import AddCommitteeMember from "./components/committee/AddCommitteeMember";
import AllCommitteeMembers from "./components/committee/AllCommitteeMember";
import CommitteeMembers from './components/committee/CommitteeMembers';
import CommitteeMeetings from './components/committee/CommitteeMeetings';
import CommitteeDecisions from './components/committee/CommitteeDecisions';
import Announcement from './components/committee/Announcement';
import MonthlySubscriptions from './components/payment/MonthlySubscriptions';
import PendingDues from './components/payment/PendingDues';
import PaymentHistory from './components/payment/PaymentHistory';
import PaymentStatus from './components/payment/PaymentStatus';
import SubPaymentStatus from './components/payment/SubPaymentStatus';
import InvoiceStatus from "./components/payment/InvoiceStatus";
import InvoiceApproveStatus from './components/payment/InvoiceApproveStatus';
import CategoryStatus from './components/category/CategoryStatus';
import SubCategoryStatus from './components/category/SubCategoryStatus';
import ApproveCategoryStatus from './components/category/ApproveCategoryStatus';
import ApproveSubCategoryStatus from './components/category/ApproveSubCategoryStatus';
import FinancialStatements from './components/payment/FinancialStatements';
import AuditReports from './components/payment/AuditReports';
import AboutAssociation from './components/association/AboutAssociation';
import ManageLogoBranding from "./components/association/ManageLogoBranding";
import AssociationHistory from "./components/association/AssociationHistory";
import GalleryMedia from "./components/association/GalleryMedia";
import UpcomingEvents from './components/events/UpcomingEvents';
import PastEvents from './components/events/PastEvents';
import CreateEvent from './components/events/CreateEvent';
import EventPhotos from './components/events/EventPhotos';
import DiscussionForum from './components/community/DiscussionForum';
import PollsSurveys from './components/community/PollsSurveys';
import CommunityHub from './components/community/CommunityHub';
import CurrentInitiatives from "./components/welfare/CurrentInitiatives";
import ApplyForAid from "./components/welfare/ApplyForAid";
import WelfareDashboard from './components/welfare/WelfareDashboard';
import MembershipReports from './components/reports/MembershipReports';
import FinancialReports from './components/reports/FinancialReports';
import ReportsDashboard from './components/reports/ReportsDashboard';
import Constitution from './components/legal/Constitution';
import Licenses from './components/legal/Licenses';
import LegalDashboard from './components/legal/LegalDashboard';
import WelfareReports from "./components/reports/WelfareReports";
import RoleManagement from './components/admin/RoleManagement';
import AuditLogs from "./components/admin/AuditLogs";
// import Applications from "./components/apps/Application";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      {/* Public Routes */}
      <Route element={<AuthLayout />}>
        <Route path="/login" element={<Login />} />
        <Route path="/registration" element={<Registration />} />
        {/* <Route path="/email-verification/:token" element={<EmailVerification />} /> */}
        <Route path="/forgot-password" element={<ForgotPassword />} />
      </Route>

      {/* Protected Routes */}
      <Route path="/" element={<PrivateRoute><RootLayout /></PrivateRoute>}>
        {/* Dashboard - Dynamic based on role */}
        <Route index element={<RoleBasedRoute> <DashboardContent /> </RoleBasedRoute>} />
        
        {/* Admin Management */}
        <Route path="admin">
          {/* <Route path="dashboard" element={
            <RoleBasedRoute allowedRoles={['admin']}> <AdminDashboard/></RoleBasedRoute>
          } 
            /> */}
          <Route path="users" element={
            <RoleBasedRoute allowedRoles={['admin']}>
               <UserManagement />
            </RoleBasedRoute>
          } />
          <Route path="roles" element={
            <RoleBasedRoute allowedRoles={['admin']}>
              <div>Role Management Component</div>
            </RoleBasedRoute>
          } />
          <Route path="dashboard" element={
            <RoleBasedRoute allowedRoles={['admin']}>
              <f/>
            </RoleBasedRoute>
          } />
          <Route path="audit" element={
      <RoleBasedRoute allowedRoles={['admin']}>
        <AuditLogs />
      </RoleBasedRoute>
              } />
        </Route>

        {/* HR Management */}
        <Route path="hr">
          <Route path="dashboard" element={
            <RoleBasedRoute allowedRoles={['admin', 'hr']}>
              <HRDashboard />
            </RoleBasedRoute>
          } />

          <Route path="reports" element={
            <RoleBasedRoute allowedRoles={['admin', 'hr']}>
              <div>HR Reports</div>
              {/* <Route path="financial" element={<FinancialReports />} />
              <Route path="membership" element={<MembershipReports />} />
              <Route path="dashboard" element={<ReportsDashboard />} /> */}
            </RoleBasedRoute>
          } />
        </Route>

        {/* Employee Management */}
        <Route path="employees">
          <Route path="add" element={
            <RoleBasedRoute allowedRoles={['admin', 'hr']}>
              <EmployeeManagement mode="add" />
            </RoleBasedRoute>
          } />
          <Route path="all" element={
            <RoleBasedRoute allowedRoles={['admin', 'hr', 'employee']}>
              <EmployeeManagement mode="view" />
            </RoleBasedRoute>
          } />
          <Route path="attendance" element={
            <RoleBasedRoute allowedRoles={['admin', 'hr']}>
              <div>Attendance Management</div>
            </RoleBasedRoute>
          } />
        </Route>

        {/* Member Management */}
        <Route path="members">
          <Route path="add" element={
            <RoleBasedRoute allowedRoles={['admin', 'hr', 'employee']}>
              <MemberManagement mode="add" />
            </RoleBasedRoute>
          } />
          <Route path="all" element={
            <RoleBasedRoute allowedRoles={['admin', 'hr', 'employee']}>
              <MemberManagement mode="view" />
            </RoleBasedRoute>
          } />
          <Route path="registrations" element={
            <RoleBasedRoute allowedRoles={['admin', 'hr']}>
              <div>New Registrations</div>
            </RoleBasedRoute>
          } />
        </Route>

        {/* Approval System */}
        <Route path="approvals">
          <Route path="categories" element={
            <RoleBasedRoute allowedRoles={['admin', 'hr']}>
              <div>Category Approvals</div>
            </RoleBasedRoute>
          } />
          <Route path="members" element={
            <RoleBasedRoute allowedRoles={['admin', 'hr']}>
              <div>Member Approvals</div>
            </RoleBasedRoute>
          } />
        </Route>

        {/* Map & Locations */}
        <Route path="map">
          <Route path="view" element={<ViewMap apiKey={apiKey} />} />
          <Route path="plots" element={<div>Plot Allocation</div>} />
          <Route path="zones" element={<div>Zone Management</div>} />
        </Route>

        {/* Products & Services */}
        {/* <Route path="products">
          <Route path="categories" element={<div>Product Categories</div>} />
          <Route path="services" element={<div>Services Management</div>} />
        </Route> */}

        {/* Settings */}
        <Route path="settings">
          <Route path="general" element={<Settings tab="general" />} />
          <Route path="security" element={<Settings tab="security" />} />
          <Route path="profile" element={<Profile />} />
          <Route path="notifications" element={<Settings tab="notifications" />} />
        </Route>

        {/* Reports & Analytics */}
        {/* <Route path="reports">
          <Route path="membership" element={
            <RoleBasedRoute allowedRoles={['admin', 'user']}>
               <MembershipReports />
            </RoleBasedRoute>
          } />
          <Route path="financial" element={
            <RoleBasedRoute allowedRoles={['admin', 'user']}>
               <FinancialReports />
            </RoleBasedRoute>
          } />
          <Route path="welfare" element={
            <RoleBasedRoute allowedRoles={['admin', 'user',  'employee']}>
               <WelfareReports  />
            </RoleBasedRoute>
          } />

        
        </Route> */}
        

      {/* ... rest of your routes remain the same ... */}
      {/* <Route path="addemployee" element={ <RoleBasedRoute allowedRoles={['admin', 'member', 'employee']}><AddEmployee /></RoleBasedRoute>}></Route> */}
      <Route path="addemployee" element={<AddEmployee />}></Route>
      <Route path="addmember" element={<AddMember />}></Route>
      <Route path="allmember" element={<AllMembers />}></Route>
      <Route path="registrationsmember" element={<RegistrationsMember />}></Route>
      <Route path="approvemember" element={<MemberApprovals />}></Route>
      <Route path="allemployee" element={<AllEmployee />}></Route>
      <Route path="/employee/:id" element={<EmployeeProfile />} />
      <Route path="attendancesystem" element={<AttendanceSystem />}></Route>
      <Route path="performancereviews" element={<PerformanceReviews />}></Route>
      <Route path="email" element={<Email />}></Route>
      <Route path="chat" element={<Chat />}></Route>
      <Route path="contact" element={<Contact />}></Route>
      <Route path="sms" element={<SMS />}></Route>

      <Route path="addcommittee" element={<AddCommitteeMember/>}></Route>
      <Route path="allcommittee" element={<AllCommitteeMembers/>}></Route>
      {/* <Route path="application" element={<CommitteeMembers />}></Route> */}
      {/* <Route path="committeemembers" element={<Application />}></Route> */}
      <Route path="committeemembers" element={<CommitteeMembers />}></Route>
      <Route path="committeemeetings" element={<CommitteeMeetings />}></Route>
      <Route path="committeedecisions" element={<CommitteeDecisions />}></Route>

      <Route path="installment" element={<MonthlySubscriptions/>}></Route>
      <Route path="paymentsdues" element={<PendingDues/>}></Route>
      <Route path="paymentshistory" element={<PaymentHistory/>}></Route>
      <Route path="paymentstatus" element={<PaymentStatus/>}></Route>
      <Route path="subpaymentstatus" element={<SubPaymentStatus/>}></Route>
      <Route path="/invoiceapprovestatus" element={<InvoiceStatus/>}></Route>
      <Route path="/invoiceapprove" element={<InvoiceApproveStatus/>}></Route>

      <Route path="/categorystatus" element={<CategoryStatus/>}></Route>
      <Route path="/subcategorystatus" element={<SubCategoryStatus/>}></Route>
      <Route path="/approvecategorystatus" element={<ApproveCategoryStatus/>}></Route>
      <Route path="/approvesubcategorystatus" element={<ApproveSubCategoryStatus/>}></Route>
      <Route path="/financialstatements" element={<FinancialStatements/>}></Route>

      <Route path="/aboutassociation" element={<AboutAssociation/>}></Route>
      <Route path="/associationlogo" element={<ManageLogoBranding/>}></Route>
      <Route path="/associationhistory" element={<AssociationHistory/>}></Route>
      <Route path="/associationgallery" element={<GalleryMedia/>}></Route>

      <Route path="/upcomingevents" element={<UpcomingEvents/>}></Route>
      <Route path="/pastevents" element={<PastEvents/>}></Route>
      <Route path="/createevents" element={<CreateEvent/>}></Route>
      <Route path="/galleryevents" element={<EventPhotos/>}></Route>

      <Route path="/discussions" element={<DiscussionForum/>}></Route>
      <Route path="/communityannouncements" element={<Announcement/>}></Route>
      <Route path="/polls" element={<PollsSurveys/>}></Route>
      <Route path="/feedback" element={<CommunityHub/>}></Route>

      <Route path="/welfareinitiatives" element={<CurrentInitiatives/>}></Route>
      <Route path="/welfareapply" element={<ApplyForAid/>}></Route>
      {/* <Route path="/welfaredonations" element={<CommunityHub/>}></Route> */}
      <Route path="/welfarereports" element={<WelfareDashboard/>}></Route>

      {/* <Route path="/membersreports" element={<MembershipReports/>}></Route>
      <Route path="/financereports" element={<FinancialReports/>}></Route>
      <Route path="/welfarereports" element={<ReportsDashboard/>}></Route> */}

      {/* Reports Routes with Professional RBAC */}
<Route path="/membersreports"element={<RoleBasedRoute allowedRoles={['admin', 'hr', 'Finance Secretary', 'General Secretary']}><MembershipReports /> </RoleBasedRoute>}/>
<Route path="/financereports" element={<RoleBasedRoute allowedRoles={['admin', 'hr', 'Finance Secretary', 'Treasurer']}><FinancialReports /></RoleBasedRoute>} />
<Route path="/welfarereports" element={<RoleBasedRoute allowedRoles={['admin', 'hr', 'Welfare Secretary', 'employee']}><WelfareReports /></RoleBasedRoute>}/>

      <Route path="/legalconstitution" element={<Constitution/>}></Route>
      <Route path="/legallicenses" element={<Licenses/>}></Route>
      <Route path="/legalagreements" element={<LegalDashboard/>}></Route>

      {/* <Route path="/users" element={<UserManagement/>}></Route>
      <Route path="/roles" element={<RoleManagement/>}></Route>
      <Route path="/admindashboard" element={<AdminDashboard/>}></Route>
      <Route path="/audit" element={<AuditLogs/>}></Route> */}
      <Route path="/users" element={<RoleBasedRoute allowedRoles={['Admin', 'HR']}><UserManagement /></RoleBasedRoute>} />
      <Route path="/roles"  element={<RoleBasedRoute allowedRoles={['Admin']}><RoleManagement /></RoleBasedRoute>} />
      <Route path="/admindashboard" element={<RoleBasedRoute allowedRoles={['Admin']}><AdminDashboard /></RoleBasedRoute>}/>
      <Route path="/audit" element={ <RoleBasedRoute allowedRoles={['Admin']}><AuditLogs /></RoleBasedRoute>}/>





      </Route>

      {/* Error Routes */}
      <Route path="/unauthorized" element={<Unauthorized />} />
      <Route path="/loading" element={<Loading />} />
      <Route path="*" element={<Error />} />
    </Route>
  )
);

// const ThemedApp = () => {
//   const currentTheme = useSelector((state) => state.theme.currentTheme);
//   const dispatch = useDispatch();

//   const handleThemeToggle = () => {
//     dispatch(toggleTheme());
//   };

//   return (
//     <ConfigProvider
//       theme={{
//         algorithm: currentTheme === 'dark' ? theme.darkAlgorithm : theme.defaultAlgorithm,
//         token: {
//           colorPrimary: '#1890ff',
//           borderRadius: 8,
//           fontFamily: 'Inter, system-ui, sans-serif',
//         },
//         components: {
//           Layout: {
//             bodyBg: currentTheme === 'dark' ? '#1f2937' : '#f8fafc',
//             headerBg: currentTheme === 'dark' ? '#111827' : '#ffffff',
//             siderBg: currentTheme === 'dark' ? '#111827' : '#ffffff',
//           },
//           Menu: {
//             itemBorderRadius: 8,
//             subMenuItemBorderRadius: 8,
//             itemSelectedBg: 'linear-gradient(135deg, #1890ff 0%, #722ed1 100%)',
//             itemSelectedColor: '#ffffff',
//           },
//           Card: {
//             colorBgContainer: currentTheme === 'dark' ? '#1f2937' : '#ffffff',
//           },
//         },
//       }}
//     >
//       <div
//         className={`${
//           currentTheme === 'dark' ? 'theme-dark' : 'theme-light'
//         } theme-transition min-h-screen`}
//       >
//         <Button
//           type="text"
//           shape="circle"
//           icon={
//             currentTheme === 'dark' ? (
//               <SunOutlined style={{ fontSize: 20 }} />
//             ) : (
//               <MoonOutlined style={{ fontSize: 20 }} />
//             )
//           }
//           onClick={handleThemeToggle}
//           style={{
//             position: 'fixed',
//             top: 16,
//             right: 16,
//             zIndex: 2000,
//             background: 'rgba(255,255,255,0.2)',
//             backdropFilter: 'blur(6px)',
//           }}
//         />
//         <RouterProvider router={router} />
//       </div>
//     </ConfigProvider>
//   );
// };







// Main App component



// const ThemedApp = () => {
//   const currentTheme = useSelector((state) => state.theme.currentTheme);
//   const dispatch = useDispatch();

//   const handleThemeToggle = () => {
//     dispatch(toggleTheme());
//   };

//   const themeConfig = {
//     algorithm: currentTheme === 'dark' ? theme.darkAlgorithm : theme.defaultAlgorithm,
//     token: {
//       colorPrimary: '#1890ff',
//       borderRadius: 8,
//       fontFamily: 'Inter, system-ui, sans-serif',
//       colorBgContainer: currentTheme === 'dark' ? '#1f2937' : '#ffffff',
//       colorBgLayout: currentTheme === 'dark' ? '#111827' : '#f8fafc',
//       colorText: currentTheme === 'dark' ? '#f3f4f6' : '#1f2937',
//       colorTextSecondary: currentTheme === 'dark' ? '#d1d5db' : '#6b7280',
//       colorBorder: currentTheme === 'dark' ? '#374151' : '#e5e7eb',
//     },
//     components: {
//       Layout: {
//         bodyBg: currentTheme === 'dark' ? '#111827' : '#f8fafc',
//         headerBg: currentTheme === 'dark' ? '#1f2937' : '#ffffff',
//         siderBg: currentTheme === 'dark' ? '#1f2937' : '#ffffff',
//       },
//       Menu: {
//         itemBorderRadius: 8,
//         subMenuItemBorderRadius: 8,
//         itemSelectedBg: 'linear-gradient(135deg, #1890ff 0%, #722ed1 100%)',
//         itemSelectedColor: '#ffffff',
//         itemBg: currentTheme === 'dark' ? '#1f2937' : '#ffffff',
//         itemColor: currentTheme === 'dark' ? '#d1d5db' : '#374151',
//       },
//       Card: {
//         colorBgContainer: currentTheme === 'dark' ? '#1f2937' : '#ffffff',
//         colorBorderSecondary: currentTheme === 'dark' ? '#374151' : '#f0f0f0',
//       },
//       Table: {
//         colorBgContainer: currentTheme === 'dark' ? '#1f2937' : '#ffffff',
//         headerBg: currentTheme === 'dark' ? '#374151' : '#fafafa',
//         headerColor: currentTheme === 'dark' ? '#f3f4f6' : '#374151',
//         rowHoverBg: currentTheme === 'dark' ? '#374151' : '#fafafa',
//       },
//     },
//   };

//   return (
//     <ConfigProvider theme={themeConfig}>
//       <div
//         className={`${
//           currentTheme === 'dark' 
//             ? 'theme-dark bg-gray-900 text-gray-100' 
//             : 'theme-light bg-gray-50 text-gray-900'
//         } theme-transition min-h-screen`}
//       >
//         <Button
//           type="text"
//           shape="circle"
//           icon={
//             currentTheme === 'dark' ? (
//               <SunOutlined style={{ fontSize: 20 }} />
//             ) : (
//               <MoonOutlined style={{ fontSize: 20 }} />
//             )
//           }
//           onClick={handleThemeToggle}
//           className={`theme-toggle-btn ${
//             currentTheme === 'dark' 
//               ? 'bg-white text-gray-700' 
//               : 'bg-gray-700 text-yellow-400'
//           }`}
//           style={{
//             position: 'fixed',
//             top: 16,
//             right: 16,
//             zIndex: 2000,
//             backdropFilter: 'blur(6px)',
//             boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
//           }}
//         />
//         <RouterProvider router={router} />
//       </div>
//     </ConfigProvider>
//   );
// };

const ThemedApp = () => {
  const currentTheme = useSelector((state) => state.theme.currentTheme);
  const dispatch = useDispatch();

  const handleThemeToggle = () => {
    dispatch(toggleTheme());
  };

  // Complete theme configuration
  const themeConfig = {
    algorithm: currentTheme === 'dark' ? theme.darkAlgorithm : theme.defaultAlgorithm,
    token: {
      colorPrimary: '#1890ff',
      borderRadius: 8,
      fontFamily: 'Inter, system-ui, sans-serif',
      colorBgContainer: currentTheme === 'dark' ? '#1f2937' : '#ffffff',
      colorBgLayout: currentTheme === 'dark' ? '#111827' : '#f8fafc',
      colorText: currentTheme === 'dark' ? '#f3f4f6' : '#1f2937',
      colorTextSecondary: currentTheme === 'dark' ? '#d1d5db' : '#6b7280',
      colorBorder: currentTheme === 'dark' ? '#374151' : '#e5e7eb',
      colorBorderSecondary: currentTheme === 'dark' ? '#4b5563' : '#f0f0f0',
      colorBgElevated: currentTheme === 'dark' ? '#1f2937' : '#ffffff',
    },
    components: {
      // Layout components
      Layout: {
        bodyBg: currentTheme === 'dark' ? '#111827' : '#f8fafc',
        headerBg: currentTheme === 'dark' ? '#1f2937' : '#ffffff',
        siderBg: currentTheme === 'dark' ? '#1f2937' : '#ffffff',
        triggerBg: currentTheme === 'dark' ? '#1f2937' : '#ffffff',
        triggerColor: currentTheme === 'dark' ? '#f9fafb' : '#1f2937',
      },
      
      // Menu component (for sidebar)
      Menu: {
        itemBorderRadius: 8,
        subMenuItemBorderRadius: 8,
        itemSelectedBg: 'linear-gradient(135deg, #1890ff 0%, #722ed1 100%)',
        itemSelectedColor: '#ffffff',
        itemBg: currentTheme === 'dark' ? '#1f2937' : '#ffffff',
        itemColor: currentTheme === 'dark' ? '#d1d5db' : '#374151',
        itemHoverBg: currentTheme === 'dark' ? 'rgba(59, 130, 246, 0.2)' : 'rgba(59, 130, 246, 0.1)',
        itemHoverColor: currentTheme === 'dark' ? '#60a5fa' : '#2563eb',
        subMenuBg: currentTheme === 'dark' ? '#1f2937' : '#ffffff',
        popupBg: currentTheme === 'dark' ? '#1f2937' : '#ffffff',
      },
      
      // Card component
      Card: {
        colorBgContainer: currentTheme === 'dark' ? '#1f2937' : '#ffffff',
        colorBorderSecondary: currentTheme === 'dark' ? '#374151' : '#f0f0f0',
      },
      
      // Table component
      Table: {
        colorBgContainer: currentTheme === 'dark' ? '#1f2937' : '#ffffff',
        headerBg: currentTheme === 'dark' ? '#374151' : '#fafafa',
        headerColor: currentTheme === 'dark' ? '#f3f4f6' : '#374151',
        rowHoverBg: currentTheme === 'dark' ? '#374151' : '#fafafa',
        borderColor: currentTheme === 'dark' ? '#374151' : '#f0f0f0',
      },
      
      // Button component
      Button: {
        colorBgContainer: currentTheme === 'dark' ? '#374151' : '#ffffff',
        colorBorder: currentTheme === 'dark' ? '#4b5563' : '#d1d5db',
        colorText: currentTheme === 'dark' ? '#f9fafb' : '#374151',
      },
      
      // Input component
      Input: {
        colorBgContainer: currentTheme === 'dark' ? '#374151' : '#ffffff',
        colorBorder: currentTheme === 'dark' ? '#4b5563' : '#d1d5db',
        colorText: currentTheme === 'dark' ? '#f9fafb' : '#374151',
        colorTextPlaceholder: currentTheme === 'dark' ? '#9ca3af' : '#6b7280',
      },
      
      // Dropdown component
      Dropdown: {
        colorBgElevated: currentTheme === 'dark' ? '#1f2937' : '#ffffff',
      },
      
      // Modal component
      Modal: {
        colorBgElevated: currentTheme === 'dark' ? '#1f2937' : '#ffffff',
      },
      
      // Avatar component
      Avatar: {
        colorBgContainer: currentTheme === 'dark' ? '#374151' : '#f3f4f6',
      },
      
      // Badge component
      Badge: {
        colorBgContainer: currentTheme === 'dark' ? '#ef4444' : '#dc2626',
      },
    },
  };

  return (
    <ConfigProvider theme={themeConfig}>
      <div
        className={`min-h-screen transition-colors duration-300 ${
          currentTheme === 'dark' 
            ? 'bg-gray-900 text-gray-100' 
            : 'bg-gray-50 text-gray-900'
        }`}
      >
        {/* Global Theme Toggle Button */}
        <Button
          type="text"
          shape="circle"
          icon={
            currentTheme === 'dark' ? (
              <SunOutlined style={{ fontSize: 20 }} />
            ) : (
              <MoonOutlined style={{ fontSize: 20 }} />
            )
          }
          onClick={handleThemeToggle}
          className={`fixed top-8 right-8 z-50 backdrop-blur-sm ${
            currentTheme === 'dark' 
              ? 'bg-white/10 text-white-400 hover:bg-white/20' 
              : 'bg-black/10 text-gray-700 hover:bg-black/20'
          }`}
          style={{
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
          }}
        />
        
        <RouterProvider router={router} />
      </div>
    </ConfigProvider>
  );
};


function App() {
  return (
    <Provider store={store}>
      <ThemedApp />
    </Provider>
  );
}

export default App;











// import {
//   createBrowserRouter,
//   createRoutesFromElements,
//   Route,
//   RouterProvider,
// } from "react-router-dom";
// import { ConfigProvider, theme, Button } from "antd";
// import { Provider, useSelector, useDispatch } from "react-redux";
// import { SunOutlined, MoonOutlined } from "@ant-design/icons";
// import store from "./store";
// import { toggleTheme } from "./components/slices/themeSlice";

// // Layouts
// import RootLayout from "./components/Layouts/RootLayout";
// import AuthLayout from "./components/Layouts/AuthLayout";

// // Auth
// import Login from "./components/auth/Login";
// import Registration from "./components/auth/Registration";
// import ForgotPassword from "./components/auth/ForgotPassword";

// // Dashboards
// import AdminDashboard from "./components/dashboard/AdminDashboard";
// import HRDashboard from "./components/dashboard/HRDashboard";
// import EmployeeDashboard from "./components/dashboard/EmployeeDashboard";
// import MemberDashboard from "./components/dashboard/MemberDashboard";

// // Management
// import UserManagement from "./components/admin/UserManagement";
// import RoleManagement from "./components/admin/RoleManagement";
// import EmployeeManagement from "./components/employees/EmployeeManagement";
// import MemberManagement from "./components/employees/MemberManagement";

// // Route Protection
// import PrivateRoute from "./components/auth/PrivateRoute";
// import RoleBasedRoute from "./components/auth/RoleBasedRoute";

// // Shared
// import Unauthorized from "./components/shared/Unauthorized";
// import Error from "./components/shared/Error";
// import Loading from "./components/shared/Loading";

// // Additional Features
// import AddEmployee from "./components/AddEmployee";
// import AddMember from "./components/members/Addmember";
// import AllMembers from "./components/members/AllMembers";
// import RegistrationsMember from "./components/members/RegistrationsMember";
// import AllEmployee from "./components/employees/AllEmployee";
// import AttendanceSystem from "./components/employees/AttendanceSystem";
// import PerformanceReviews from "./components/employees/PerformanceReviews";
// import Email from "./components/apps/Email";
// import Chat from "./components/apps/Chat";
// import Contact from "./components/apps/Contact";
// import SMS from "./components/apps/SMS";
// import Application from "./components/apps/Application";

// // Committees
// import CommitteeMembers from "./components/committee/CommitteeMembers";
// import CommitteeMeetings from "./components/committee/CommitteeMeetings";
// import CommitteeDecisions from "./components/committee/CommitteeDecisions";
// import Announcement from "./components/committee/Announcement";

// // Payments
// import MonthlySubscriptions from "./components/payment/MonthlySubscriptions";
// import PendingDues from "./components/payment/PendingDues";
// import PaymentHistory from "./components/payment/PaymentHistory";
// import PaymentStatus from "./components/payment/PaymentStatus";
// import SubPaymentStatus from "./components/payment/SubPaymentStatus";
// import InvoiceStatus from "./components/payment/InvoiceStatus";
// import InvoiceApproveStatus from "./components/payment/InvoiceApproveStatus";
// import FinancialStatements from "./components/payment/FinancialStatements";

// // Categories
// import CategoryStatus from "./components/category/CategoryStatus";
// import SubCategoryStatus from "./components/category/SubCategoryStatus";
// import ApproveCategoryStatus from "./components/category/ApproveCategoryStatus";
// import ApproveSubCategoryStatus from "./components/category/ApproveSubCategoryStatus";

// // Association
// import AboutAssociation from "./components/association/AboutAssociation";
// import ManageLogoBranding from "./components/association/ManageLogoBranding";
// import AssociationHistory from "./components/association/AssociationHistory";
// import GalleryMedia from "./components/association/GalleryMedia";

// // Events
// import UpcomingEvents from "./components/events/UpcomingEvents";
// import PastEvents from "./components/events/PastEvents";
// import CreateEvent from "./components/events/CreateEvent";
// import EventPhotos from "./components/events/EventPhotos";

// // Community
// import DiscussionForum from "./components/community/DiscussionForum";
// import PollsSurveys from "./components/community/PollsSurveys";
// import CommunityHub from "./components/community/CommunityHub";

// // Welfare
// import CurrentInitiatives from "./components/welfare/CurrentInitiatives";
// import ApplyForAid from "./components/welfare/ApplyForAid";
// import WelfareDashboard from "./components/welfare/WelfareDashboard";

// // Reports
// import MembershipReports from "./components/reports/MembershipReports";
// import FinancialReports from "./components/reports/FinancialReports";
// import ReportsDashboard from "./components/reports/ReportsDashboard";

// // Legal
// import Constitution from "./components/legal/Constitution";
// import Licenses from "./components/legal/Licenses";
// import LegalDashboard from "./components/legal/LegalDashboard";

// // Map
// import ViewMap from "./components/map/ViewMap";

// // Settings
// import Settings from "./components/settings/Settings";
// import Profile from "./components/settings/Profile";

// // Admin
// import AuditLogs from "./components/admin/AuditLogs";

// const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;
// import MemberApprovals from './components/members/MemberApprovals';
// import AddEmployee from "./components/employees/AddEmployee";
// import MemberApprovals from './components/members/MemberApprovals';
// import EmailVerification from "./components/auth/EmailVerification";
// import AddCommitteeMember from "./components/committee/AddCommitteeMember";
// import AllCommitteeMembers from "./components/committee/AllCommitteeMember";
// import EmployeeProfile from "./components/employees/EmployeeProfile";
// import CommitteeMembers from './components/committee/CommitteeMembers';


// // ---------------------- ROUTER CONFIG ----------------------

// const router = createBrowserRouter(
//   createRoutesFromElements(
//     <Route>
//       {/* Public Routes */}
//       <Route element={<AuthLayout />}>
//         <Route path="/login" element={<Login />} />
//         <Route path="/registration" element={<Registration />} />
//         <Route path="/forgot-password" element={<ForgotPassword />} />
//       </Route>

//       {/* Protected Routes */}
//       <Route path="/" element={<PrivateRoute><RootLayout /></PrivateRoute>}>
//         <Route index element={<RoleBasedRoute />} />

//         {/* Admin */}
//         <Route path="admin">
//           <Route
//             path="dashboard"
//             element={<RoleBasedRoute allowedRoles={['admin']}><AdminDashboard /></RoleBasedRoute>}
//           />
//           <Route
//             path="users"
//             element={<RoleBasedRoute allowedRoles={['admin']}><UserManagement /></RoleBasedRoute>}
//           />
//           <Route
//             path="roles"
//             element={<RoleBasedRoute allowedRoles={['admin']}><RoleManagement /></RoleBasedRoute>}
//           />
//           <Route
//             path="audit"
//             element={<RoleBasedRoute allowedRoles={['admin']}><AuditLogs /></RoleBasedRoute>}
//           />
//         </Route>

//         {/* HR */}
//         <Route path="hr">
//           <Route
//             path="dashboard"
//             element={<RoleBasedRoute allowedRoles={['admin', 'hr']}><HRDashboard /></RoleBasedRoute>}
//           />
//         </Route>

//         {/* Employees */}
//         <Route path="employees">
//           <Route path="add" element={<EmployeeManagement mode="add" />} />
//           <Route path="all" element={<EmployeeManagement mode="view" />} />
//           <Route path="attendance" element={<AttendanceSystem />} />
//           <Route path="performance" element={<PerformanceReviews />} />
//         </Route>

//         {/* Members */}
//         <Route path="members">
//           <Route path="add" element={<MemberManagement mode="add" />} />
//           <Route path="all" element={<MemberManagement mode="view" />} />
//           <Route path="registrations" element={<RegistrationsMember />} />
//         </Route>

//         {/* Payments */}
//         <Route path="payments">
//           <Route path="installments" element={<MonthlySubscriptions />} />
//           <Route path="dues" element={<PendingDues />} />
//           <Route path="history" element={<PaymentHistory />} />
//           <Route path="status" element={<PaymentStatus />} />
//           <Route path="substatus" element={<SubPaymentStatus />} />
//           <Route path="invoice" element={<InvoiceStatus />} />
//           <Route path="invoice-approval" element={<InvoiceApproveStatus />} />
//           <Route path="financial-statements" element={<FinancialStatements />} />
//         </Route>

//         {/* Categories */}
//         <Route path="categories">
//           <Route path="status" element={<CategoryStatus />} />
//           <Route path="substatus" element={<SubCategoryStatus />} />
//           <Route path="approve" element={<ApproveCategoryStatus />} />
//           <Route path="approve-sub" element={<ApproveSubCategoryStatus />} />
//         </Route>

//         {/* Association */}
//         <Route path="association">
//           <Route path="about" element={<AboutAssociation />} />
//           <Route path="logo" element={<ManageLogoBranding />} />
//           <Route path="history" element={<AssociationHistory />} />
//           <Route path="gallery" element={<GalleryMedia />} />
//         </Route>

//         {/* Events */}
//         <Route path="events">
//           <Route path="upcoming" element={<UpcomingEvents />} />
//           <Route path="past" element={<PastEvents />} />
//           <Route path="create" element={<CreateEvent />} />
//           <Route path="photos" element={<EventPhotos />} />
//         </Route>

//         {/* Committees */}
//         <Route path="committee">
//           <Route path="members" element={<CommitteeMembers />} />
//           <Route path="meetings" element={<CommitteeMeetings />} />
//           <Route path="decisions" element={<CommitteeDecisions />} />
//           <Route path="announcements" element={<Announcement />} />
//         </Route>

//         {/* Community */}
//         <Route path="community">
//           <Route path="discussions" element={<DiscussionForum />} />
//           <Route path="polls" element={<PollsSurveys />} />
//           <Route path="hub" element={<CommunityHub />} />
//         </Route>

//         {/* Welfare */}
//         <Route path="welfare">
//           <Route path="initiatives" element={<CurrentInitiatives />} />
//           <Route path="apply" element={<ApplyForAid />} />
//           <Route path="dashboard" element={<WelfareDashboard />} />
//         </Route>

//         {/* Reports */}
//         <Route path="reports">
//           <Route path="membership" element={<MembershipReports />} />
//           <Route path="financial" element={<FinancialReports />} />
//           <Route path="dashboard" element={<ReportsDashboard />} />
//         </Route>

//         {/* Legal */}
//         <Route path="legal">
//           <Route path="constitution" element={<Constitution />} />
//           <Route path="licenses" element={<Licenses />} />
//           <Route path="agreements" element={<LegalDashboard />} />
//         </Route>

//         {/* Apps */}
//         <Route path="apps">
//           <Route path="email" element={<Email />} />
//           <Route path="chat" element={<Chat />} />
//           <Route path="contact" element={<Contact />} />
//           <Route path="sms" element={<SMS />} />
//           <Route path="application" element={<Application />} />
//         </Route>

//         {/* Map */}
//         <Route path="map/view" element={<ViewMap apiKey={apiKey} />} />

//         {/* Settings */}
//         <Route path="settings">
//           <Route path="general" element={<Settings tab="general" />} />
//           <Route path="security" element={<Settings tab="security" />} />
//           <Route path="profile" element={<Profile />} />
//           <Route path="notifications" element={<Settings tab="notifications" />} />
//         </Route>
//       </Route>

//       {/* Errors */}
//       <Route path="/unauthorized" element={<Unauthorized />} />
//       <Route path="/loading" element={<Loading />} />
//       <Route path="*" element={<Error />} />
//     </Route>
//   )
// );

// // ---------------------- THEME CONFIG ----------------------

// const ThemedApp = () => {
//   const currentTheme = useSelector((state) => state.theme.currentTheme);
//   const dispatch = useDispatch();

//   return (
//     <ConfigProvider
//       theme={{
//         algorithm: currentTheme === "dark" ? theme.darkAlgorithm : theme.defaultAlgorithm,
//         token: {
//           colorPrimary: "#1890ff",
//           borderRadius: 8,
//           fontFamily: "Inter, system-ui, sans-serif",
//         },
//         components: {
//           Layout: {
//             bodyBg: currentTheme === "dark" ? "#1f2937" : "#f8fafc",
//             headerBg: currentTheme === "dark" ? "#111827" : "#ffffff",
//             siderBg: currentTheme === "dark" ? "#111827" : "#ffffff",
//           },
//           Menu: {
//             itemBorderRadius: 8,
//             subMenuItemBorderRadius: 8,
//             itemSelectedBg: "linear-gradient(135deg, #1890ff 0%, #722ed1 100%)",
//             itemSelectedColor: "#ffffff",
//           },
//           Card: {
//             colorBgContainer: currentTheme === "dark" ? "#1f2937" : "#ffffff",
//           },
//         },
//       }}
//     >
//       <div className={`${currentTheme === "dark" ? "theme-dark" : "theme-light"} theme-transition min-h-screen`}>
//         <Button
//           type="text"
//           shape="circle"
//           icon={currentTheme === "dark" ? <SunOutlined style={{ fontSize: 20 }} /> : <MoonOutlined style={{ fontSize: 20 }} />}
//           onClick={() => dispatch(toggleTheme())}
//           style={{
//             position: "fixed",
//             top: 16,
//             right: 16,
//             zIndex: 2000,
//             background: "rgba(255,255,255,0.2)",
//             backdropFilter: "blur(6px)",
//           }}
//         />
//         <RouterProvider router={router} />
//       </div>
//     </ConfigProvider>
//   );
// };

// // ---------------------- MAIN APP ----------------------

// function App() {
//   return (
//     <Provider store={store}>
//       <ThemedApp />
//     </Provider>
//   );
// }

// export default App;















