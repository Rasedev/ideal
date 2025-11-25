



// import { useSelector } from "react-redux";
// import EmployeeDashboard from "./EmployeeDashboard";
// import HRDashboard from "./HRDashboard";
// import AdminDashboard from "./AdminDashboard";

// const DashboardRouter = () => {
//   const user = useSelector((state) => state.user?.value);

//   if (!user) return null;

//   if (user.role === "admin") return <AdminDashboard />;
//   if (user.role === "hr") return <HRDashboard />;
//   if (user.role === "employee") return <EmployeeDashboard />;

//   return null;
// };

// export default DashboardRouter;



// components/dashboard/Dashboard.jsx
import { useSelector } from 'react-redux';
import AdminDashboard from './AdminDashboard';
import HRDashboard from './HRDashboard';
import EmployeeDashboard from './EmployeeDashboard';
import MemberDashboard from './MemberDashboard';
import Loading from '../shared/Loading';

const Dashboard = () => {
  const user = useSelector((state) => state.user.value);

  if (!user) {
    return <Loading />;
  }

  const renderDashboard = () => {
    switch (user.role) {
      case 'admin':
        return <AdminDashboard />;
      case 'hr':
        return <HRDashboard />;
      case 'employee':
        return <EmployeeDashboard />;
      case 'member':
        return <MemberDashboard />;
      default:
        return <MemberDashboard />;
    }
  };

  return renderDashboard();
};

export default Dashboard;