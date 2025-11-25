



import {
  DashboardOutlined,TeamOutlined,UserOutlined,DollarOutlined,ApartmentOutlined,CrownOutlined, SettingOutlined,CheckCircleOutlined,
  FileDoneOutlined,BarChartOutlined,SafetyCertificateOutlined,UsergroupAddOutlined, SolutionOutlined,TransactionOutlined,AuditOutlined,
  SecurityScanOutlined,MessageOutlined,MailOutlined,ContactsOutlined,ProjectOutlined,CalendarOutlined, ProfileOutlined,PictureOutlined,
  PlusOutlined,NotificationOutlined,HeartOutlined,FormOutlined,FileTextOutlined,FileProtectOutlined,PhoneOutlined,
  InsuranceOutlined,
  HistoryOutlined} from "@ant-design/icons";
import { MdAnnouncement, MdLegendToggle, MdPayment, MdPermPhoneMsg, MdReport, MdSettingsApplications } from "react-icons/md";




export const menuConfig = {
  // Dashboard
  dashboard: {
    key: "/",
    icon: <DashboardOutlined />,
    label: "Dashboard",
    roles: ["admin", "hr", "employee", "member"],
  },
    Admin: {
  key: "admin-section", // ✅ changed
  icon: <UsergroupAddOutlined />,
  label: "Admin",
  roles: ["admin", "employee", "member", "Finance Secretary", "General Secretary", "President", "Office Secretary"],
  children: [
    { key: "/login", icon: <UserOutlined />, label: "Admin" },
    { key: "/user", icon: <UserOutlined />, label: "User" },
  ],
   },

  // Member Management
  members: {
    key: "members",
    icon: <TeamOutlined />,
    label: "Member ",
    roles: ["admin", "hr", "employee"],
    children: [
      { 
        key: "/addmember", 
        icon: <UserOutlined />, 
        label: "Add New Member"
      },
      { 
        key: "/allmember", 
        icon: <TeamOutlined />, 
        label: "All Members"
      },
      { 
        key: "/registrationsmember", 
        icon: <SolutionOutlined />, 
        label: "New Registrations",
        roles: ["admin", "hr"]
      },
      { 
        key: "/approvemember", 
        icon: <CheckCircleOutlined />, 
        label: "Member Approvals",
        roles: ["admin", "hr"]
      },
    ],
  },

  // Employee Management
  employees: {
    key: "employees",
    icon: <UserOutlined />,
    label: "Employee",
    roles: ["admin", "hr"],
    children: [
      { 
        key: "/addemployee", 
        icon: <UsergroupAddOutlined />, 
        label: "Add Employee"
      },
      { 
        key: "/allemployee", 
        icon: <TeamOutlined />, 
        label: "All Employees"
      },
      { 
        key: "/attendancesystem", 
        icon: <BarChartOutlined />, 
        label: "Attendance System"
      },
      { 
        key: "/performancereviews", 
        icon: <BarChartOutlined />, 
        label: "Performance Reviews"
      },
    ],
  },

   apps: {
    key: "apps",
    icon: <MessageOutlined />,
    label: "Applications",
    roles: ["admin", "hr", "employee", "member"],
    children: [
      { 
        key: "/email",
        icon: <MailOutlined />, 
        label: "Email",
        roles: ['admin', 'hr', 'employee', 'member']
      },
      { 
        key: "/chat",
        icon: <MessageOutlined />, 
        label: "Chat",
        roles: ['admin', 'hr', 'employee', 'member']
      },
      { 
        key : "contact",
        icon: <ContactsOutlined />, 
        label: "Contact",
        roles: ['admin', 'hr', 'employee', 'member']
      },
      { 
        key : "sms",
        label: "SMS",
        icon: <MdPermPhoneMsg />, 
        roles: ['admin', 'hr', 'employee', 'member']
      },
      
      { 
        key : "application",
        label: "Application",
        icon: <MdSettingsApplications />, 
        roles: ['admin', 'hr', 'employee']
      },
      // { 
      //   key: "/apps/todo", 
      //   icon: <ProjectOutlined />, 
      //   label: "Task Manager",
      //   description: "Personal tasks"
      // },
      // { 
      //   key: "/apps/calendar", 
      //   icon: <CalendarOutlined />, 
      //   label: "Calendar",
      //   description: "Event scheduling"
      // },
    ],
  },
 // Committee & Governance
  committee: {
    key: "committee",
    icon: <ApartmentOutlined />,
    label: "Committee",
    roles: ["admin", "hr", "employee"],
    children: [
            { 
        key: "/addcommittee", 
        icon: <UsergroupAddOutlined />, 
        label: "Add Committee"
      },
      { 
        key: "/allcommittee", 
        icon: <TeamOutlined />, 
        label: "All Committee"
      },
      { 
        key: "/committeemembers", 
        icon: <TeamOutlined />, 
        label: "Committee Members",
        roles: ['admin', 'hr', 'employee', 'member']
      },
      { 
        key: "/committeemeetings", 
        icon: <ApartmentOutlined />, 
        label: "Committee Meetings",
        roles: ['admin', 'hr', 'employee', 'member']
      },
      { 
        key: "/committeedecisions", 
        icon: <CheckCircleOutlined />, 
        label: "Committee Decisions",
        roles: ['admin', 'hr', 'employee', 'member']
      },
      { 
        key : "announcement ",
        icon: <MdAnnouncement />, 
        label: "Announcement",
        roles: ['admin', 'hr', 'employee']
        
      },
    ],
  },

  // Financial Management
  finance: {
    key: "finance",
    icon: <DollarOutlined />,
    label: "Financial Management",
    roles: ["admin", "hr", "employee"],
    children: [
      // Payments Section
      {
        key: "payments",
        icon: <DollarOutlined />,
        label: "Payment System",
        children: [
          { key: "/installment",
             icon: < InsuranceOutlined/> , 
             label: "Monthly Subscriptions",
             roles: ['admin', 'hr', 'employee', 'member'] },
          { key: "/paymentsdues",
             icon: < MdLegendToggle/>,  
             label: "Pending Dues",
             roles: ['admin', 'hr', 'employee', 'member'] },
          { key: "/paymentshistory",
             icon: < HistoryOutlined/>, 
              label: "Payment History",
              roles: ['admin', 'hr', 'employee', 'member'] },
        ],
      },

      // Payment Status
      {
        key: "payment-status",
        icon: <CheckCircleOutlined />,
        label: "Payment Status",
        children: [
          { key: "/paymentstatus",
            icon: <MdPayment/>, 
            label: "Payment Status" },
          { key: "/subpaymentstatus",
             icon: <MdPayment/>, 
             label: "SubPayment Status" },
        ],
      },

      // Invoice Management
      {
        key: "invoice-approve",
        icon: <FileDoneOutlined />,
        label: "Invoice Approve",
        children: [
          { key: "/invoiceapprovestatus", label: "Invoice Status" },
          { key: "/invoiceapprove", label: "Invoice Approve Status" },
        ],
      },

      // Approval System
      {
        key: "approve-status",
        icon: <CheckCircleOutlined />,
        label: "Approve Status",
        children: [
          { key: "/categorystatus", label: "Category Status" },
          { key: "/subcategorystatus", label: "SubCategory Status" },
        ],
      },

      {
        key: "approve-system",
        icon: <SecurityScanOutlined />,
        label: "Approve",
        children: [
          { key: "/approvecategorystatus", label: "Approve Category Status" },
          { key: "/approvesubcategorystatus", label: "Approve SubCategory Status" },
        ],
      },

      // Financial Reports
      {
        key: "financial-reports",
        icon: <BarChartOutlined />,
        label: "Financial Reports",
        roles: ["admin", "hr"],
        children: [
          { key: "/financialstatements",icon: <MdReport/>, label: "Financial Statements" },
          { key: "/auditreports",icon: <MdReport/>, label: "Audit Reports" },
        ],
      },
    ],
  },
  
// Association Section
association: {
  key: "association",
  icon: <ApartmentOutlined />,
  label: "Association Info",
  roles: ["admin"],
  children: [
    { key: "/aboutassociation",
      label: "About Association",
      icon: <ProfileOutlined />,
      roles: ['admin']
     },
    { key: "/associationlogo", 
      label: "Manage Logo & Branding",
      icon: <SettingOutlined/>,
      roles: ['admin']
       },
    { key: "/associationhistory",
      label: "Association History", 
      icon: <CalendarOutlined />,
       roles: ['admin'] 
    },
    { key: "/associationgallery", 
      label: "Gallery & Media", 
      icon: <PictureOutlined />,
      roles: ['admin']
     },
  ],
},
events: {
  key: "events",
  icon: <CalendarOutlined />,
  label: "Events & Activities",
  roles: ["admin", "member"],
  children: [

    { key: "/upcomingevents", 
      icon: <CalendarOutlined />,
      label: "Upcoming Events", 
      roles: ['admin']  
    },
    { key: "/pastevents", 
      label: "Past Events", 
      icon: <FileDoneOutlined />,
      roles: ['admin']
    },
    { key: "/createevents", 
      label: "Create Event", 
      icon: <PlusOutlined />,
      roles: ['admin']
     },
    { key: "galleryevents",
       label: "Event Photos",
        icon: <PictureOutlined />,
        roles: ['admin']
       },
  ],
},
community: {
  key: "community",
  icon: <MessageOutlined />,
  label: "Community Hub",
  roles: ["admin", "member"],
  children: [
    { key: "/discussions", label: "Discussion Forum", icon: <MessageOutlined /> },
    { key: "/communityannouncements", label: "Announcements", icon: <NotificationOutlined /> },
    { key: "/polls", label: "Polls & Surveys", icon: <BarChartOutlined /> },
    { key: "/feedback", label: "Feedback & Suggestions", icon: <MailOutlined /> },
  ],
},
welfare: {
  key: "welfare",
  icon: <HeartOutlined />,
  label: "Welfare Programs",
  roles: ["admin", "hr", "member"],
  children: [
    { key: "/welfareinitiatives", label: "Current Initiatives", icon: <ProjectOutlined /> },
    { key: "/welfareapply", label: "Apply for Aid", icon: <FormOutlined /> },
    { key: "/welfaredonations", label: "Donation Management", icon: <DollarOutlined /> },
    { key: "/welfarereport", label: "Program Reports", icon: <FileDoneOutlined /> },
  ],
},
reports: {
  key: "reports",
  icon: <BarChartOutlined/>,
  label: "Reports & Analytics",
  roles: ["admin", "hr", "employee", "member"],
  
  children: [
    { key: "/membersreports", label: "Membership Reports", icon: <TeamOutlined /> },
    { key: "/financereports", label: "Financial Reports", icon: <DollarOutlined /> },
    { key: "/welfarereports", label: "Welfare Reports", icon: <HeartOutlined/> },
  ],
},

// In your menuItems.js
// reports: {
//   key: "reports",
//   icon: <BarChartOutlined />,
//   label: "Reports & Analytics",
//   roles: ["admin", "hr", "employee", "member"], // Actual roles from your system
//   children: [
//     { 
//       key: "/membership", 
//       label: "Membership Reports", 
//       icon: <TeamOutlined />,
//       roles: ["admin", "hr"] // Only admin and HR can access
//     },
//     { 
//       key: "/financial", 
//       label: "Financial Reports", 
//       icon: <DollarOutlined />,
//       roles: ["admin", "hr"] // Only admin and HR can access
//     },
//     { 
//       key: "/welfare", 
//       label: "Welfare Reports", 
//       icon: <HeartOutlined />,
//       roles: ["admin", "hr", "employee"] // Broader access
//     },
//   ],
// },

legal: {
  key: "legal",
  icon: <FileDoneOutlined />,
  label: "Legal & Documentation",
  roles: ["admin"],
  children: [
    { key: "/legalconstitution", label: "Constitution / By-laws", icon: <FileTextOutlined /> },
    { key: "/legallicenses", label: "Licenses & Certificates", icon: <SafetyCertificateOutlined /> },
    { key: "/legalagreements", label: "Agreements", icon: <FileProtectOutlined/> },
  ],
},
// Admin Management
  admin: {
    key: "admin",
    icon: <CrownOutlined />,
    label: "Admin Settings",
    roles: ["admin"],
    children: [
      { 
        key: "/users", 
        icon: <UsergroupAddOutlined />, 
        label: "User Management",
        
      },
      { 
        key: "/roles", 
        icon: <SafetyCertificateOutlined />, 
        label: "Role & Permissions",
        
      },
      { 
        key: "/admindashboard", 
        icon: <DashboardOutlined />, 
        label: "Admin Dashboard",
        
      },
      { 
        key: "/audit", 
        icon: <AuditOutlined />, 
        label: "Audit Logs",
        
      },
    ],

  },
};

// export const getAllMenuItems = (userRole) => {
//   const filterByRole = (item) =>
//     !item.roles || item.roles.includes(userRole);

//   const deepFilter = (items) =>
//     items
//       .filter(filterByRole)
//       .map((item) => ({
//         ...item,
//         children: item.children ? deepFilter(item.children) : undefined,
//       }));

//   return deepFilter(Object.values(menuConfig));
// };

/**
 * Get filtered menu items based on user role
 */
export const getAllMenuItems = (userRole) => {
  const role = userRole?.toLowerCase() || "member";
  
  return Object.values(menuConfig).filter(item => 
    item.roles.includes(role)
  ).map(item => ({
    key: item.key,
    icon: item.icon,
    label: item.label,
    children: item.children ? item.children
      .filter(child => !child.roles || child.roles.includes(role))
      .map(child => ({
        key: child.key,
        label: child.label,
        icon: child.icon,
        children: child.children ? child.children
          .filter(grandChild => !grandChild.roles || grandChild.roles.includes(role))
          .map(grandChild => ({
            key: grandChild.key,
            label: grandChild.label,
            icon: grandChild.icon,
          })) : undefined,
      })) : undefined,
  }));
};


/**
 * Get ALL menu items without role filtering
 */
// export const getAllMenuItems = () => {
//   return Object.values(menuConfig).map(item => ({
//     key: item.key,
//     icon: item.icon,
//     label: item.label,
//     children: item.children ? item.children.map(child => ({
//       key: child.key,
//       label: child.label,
//       icon: child.icon,
//       children: child.children ? child.children.map(grandChild => ({
//         key: grandChild.key,
//         label: grandChild.label,
//         icon: grandChild.icon,
//       })) : undefined,
//     })) : undefined,
//   }));
// };