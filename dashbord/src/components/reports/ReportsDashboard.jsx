
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  BarChartOutlined,       
  TeamOutlined,          
  DollarOutlined,         
  HeartOutlined,          
  FileTextOutlined,       
  CalendarOutlined,       
  ArrowUpOutlined,       
  ArrowDownOutlined       
} from '@ant-design/icons';

const ReportsDashboard = () => {
  const [dashboardData, setDashboardData] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const response = await fetch('/api/reports/dashboard', {
        headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
      });
      const data = await response.json();
      setDashboardData(data);
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  const StatCard = ({ title, value, change, icon: Icon, color, href }) => (
    <Link to={href} className="block">
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-all duration-200 hover:border-blue-500 group">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-600 mb-1">{title}</p>
            <p className="text-3xl font-bold text-gray-900">{value}</p>
            {change && (
              <div className={`inline-flex items-center text-sm mt-1 ${
                change > 0 ? 'text-green-600' : 'text-red-600'
              }`}>
                {change > 0 ? (
                  <ArrowUpOutlined className="w-4 h-4 mr-1" />
                ) : (
                  <ArrowDownOutlined className="w-4 h-4 mr-1" />
                )}
                {Math.abs(change)}% from last period
              </div>
            )}
          </div>
          <div className={`p-3 rounded-lg ${color} group-hover:scale-110 transition-transform duration-200`}>
            <Icon className="h-6 w-6 text-white" />
          </div>
        </div>
      </div>
    </Link>
  );

  const ReportCard = ({ report }) => (
    <div className="bg-white rounded-lg border border-gray-200 p-4 hover:shadow-md transition-shadow duration-200">
      <div className="flex items-start justify-between mb-2">
        <h4 className="font-semibold text-gray-900 text-sm">{report.title}</h4>
        <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
          {report.reportType}
        </span>
      </div>
      <div className="flex items-center text-xs text-gray-500">
        <CalendarOutlined className="w-3 h-3 mr-1" />
        {new Date(report.period.start).toLocaleDateString()} - {new Date(report.period.end).toLocaleDateString()}
      </div>
      <div className="flex items-center justify-between mt-3">
        <span className="text-xs text-gray-500">
          {new Date(report.createdAt).toLocaleDateString()}
        </span>
        <button className="text-xs text-blue-600 hover:text-blue-800 font-medium">
          View Report
        </button>
      </div>
    </div>
  );

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 p-6">
        <div className="max-w-7xl mx-auto">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-1/4 mb-6"></div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="h-32 bg-gray-200 rounded-xl"></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Reports & Analytics</h1>
          <p className="text-gray-600 mt-2">Comprehensive insights and analytics for your community</p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard
            title="Total Reports"
            value={dashboardData.stats?.totalReports || 0}
            change={12}
            icon={FileTextOutlined}
            color="bg-blue-500"
            href="/reports"
          />
          <StatCard
            title="Membership Reports"
            value={dashboardData.stats?.membershipReports || 0}
            change={8}
            icon={TeamOutlined}
            color="bg-green-500"
            href="/reports/members"
          />
          <StatCard
            title="Financial Reports"
            value={dashboardData.stats?.financialReports || 0}
            change={15}
            icon={DollarOutlined}
            color="bg-emerald-500"
            href="/reports/finance"
          />
          <StatCard
            title="Welfare Reports"
            value={dashboardData.stats?.welfareReports || 0}
            change={5}
            icon={HeartOutlined}
            color="bg-pink-500"
            href="/reports/welfare"
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Quick Actions */}
          <div className="lg:col-span-2">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">Generate New Report</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Link
                to="/reports/members/new"
                className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-all duration-200 hover:border-green-500 group"
              >
                <div className="flex items-center space-x-4">
                  <div className="p-3 rounded-lg bg-green-100 group-hover:bg-green-500 transition-colors duration-200">
                    <TeamOutlined className="h-6 w-6 text-green-600 group-hover:text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 group-hover:text-green-600 transition-colors duration-200">
                      Membership Report
                    </h3>
                    <p className="text-sm text-gray-600 mt-1">Generate membership analytics and trends</p>
                  </div>
                </div>
              </Link>

              <Link
                to="/reports/finance/new"
                className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-all duration-200 hover:border-emerald-500 group"
              >
                <div className="flex items-center space-x-4">
                  <div className="p-3 rounded-lg bg-emerald-100 group-hover:bg-emerald-500 transition-colors duration-200">
                    <DollarOutlined className="h-6 w-6 text-emerald-600 group-hover:text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 group-hover:text-emerald-600 transition-colors duration-200">
                      Financial Report
                    </h3>
                    <p className="text-sm text-gray-600 mt-1">Create financial statements and analysis</p>
                  </div>
                </div>
              </Link>

              <Link
                to="/reports/welfare/new"
                className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-all duration-200 hover:border-pink-500 group"
              >
                <div className="flex items-center space-x-4">
                  <div className="p-3 rounded-lg bg-pink-100 group-hover:bg-pink-500 transition-colors duration-200">
                    <HeartOutlined className="h-6 w-6 text-pink-600 group-hover:text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 group-hover:text-pink-600 transition-colors duration-200">
                      Welfare Report
                    </h3>
                    <p className="text-sm text-gray-600 mt-1">Generate welfare program impact reports</p>
                  </div>
                </div>
              </Link>

              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-all duration-200 hover:border-purple-500 group">
                <div className="flex items-center space-x-4">
                  <div className="p-3 rounded-lg bg-purple-100 group-hover:bg-purple-500 transition-colors duration-200">
                    <BarChartOutlined className="h-6 w-6 text-purple-600 group-hover:text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 group-hover:text-purple-600 transition-colors duration-200">
                      Custom Report
                    </h3>
                    <p className="text-sm text-gray-600 mt-1">Create customized analytics report</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Recent Reports */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">Recent Reports</h2>
              <div className="space-y-4">
                {dashboardData.recentReports?.map((report, index) => (
                  <ReportCard key={index} report={report} />
                ))}
                {(!dashboardData.recentReports || dashboardData.recentReports.length === 0) && (
                  <p className="text-gray-500 text-center py-4">No recent reports</p>
                )}
              </div>
            </div>

            {/* Quick Stats */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mt-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">Community Overview</h2>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Total Members</span>
                  <span className="font-semibold text-gray-900">
                    {dashboardData.quickStats?.totalMembers?.toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Active Initiatives</span>
                  <span className="font-semibold text-gray-900">
                    {dashboardData.quickStats?.activeInitiatives}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Total Donations</span>
                  <span className="font-semibold text-gray-900">
                    ${dashboardData.quickStats?.totalDonations?.toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Pending Applications</span>
                  <span className="font-semibold text-gray-900">
                    {dashboardData.quickStats?.pendingApplications}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReportsDashboard;