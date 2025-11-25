



import { useDispatch, useSelector } from 'react-redux';
import { useCallback, useMemo } from 'react';
import { 
  setLoading, 
  setError, 
  addEmployee, 
  setEmployees, 
  updateEmployee, 
  deleteEmployee,
  setSelectedEmployee,
  clearSelectedEmployee,
  markAttendance, 
  markCheckOut, 
  bulkMarkAttendance, 
  setAttendanceDate,
  clearAttendance,
  // ✅ ADD COMMITTEE ACTIONS
  addCommitteeMember,
  removeCommitteeMember,
  updateCommitteeMember,
  setCommitteeMembers
} from '../slices/employeeSlice';
import axios from 'axios';
import { message } from 'antd';

export const useEmployees = () => {
  const dispatch = useDispatch();
  
  // Get state from Redux
  const employees = useSelector(state => state.employees.list);
  const selectedEmployee = useSelector(state => state.employees.selected);
  const loading = useSelector(state => state.employees.loading);
  const error = useSelector(state => state.employees.error);
  const attendance = useSelector(state => state.employees.attendance.today);
  const attendanceDate = useSelector(state => state.employees.attendance.date);
  const committeeMembers = useSelector(state => state.employees.committee.members);
  const committeePositions = useSelector(state => state.employees.committee.positions);

  // Load all employees from API
  const loadEmployees = useCallback(async () => {
    try {
      dispatch(setLoading(true));
      const token = localStorage.getItem("token");
      const response = await axios.get(
        "http://localhost:3000/api/v1/employee/allemployee",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (response.data.success) {
        const employeesData = response.data.data.employees || [];
        dispatch(setEmployees(employeesData));
        message.success("Employees loaded successfully!");
      }
    } catch (error) {
      console.error("Fetch employees error:", error);
      dispatch(setError(error.response?.data?.message || "Failed to load employees"));
      message.error("Failed to load employees");
    } finally {
      dispatch(setLoading(false));
    }
  }, [dispatch]);

  // Create new employee
  const createEmployee = useCallback(async (employeeData) => {
    try {
      dispatch(setLoading(true));
      const token = localStorage.getItem("token");
      
      const response = await axios.post(
        "http://localhost:3000/api/v1/employee/createemployee",
        employeeData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`
          }
        }
      );

      if (response.data.success) {
        dispatch(addEmployee(response.data.data));
        message.success("Employee created successfully!");
        return response.data.data;
      }
    } catch (error) {
      console.error("Create employee error:", error);
      dispatch(setError(error.response?.data?.message || "Failed to create employee"));
      throw error;
    } finally {
      dispatch(setLoading(false));
    }
  }, [dispatch]);

  // Update employee
  const editEmployee = useCallback(async (id, employeeData) => {
    try {
      dispatch(setLoading(true));
      const token = localStorage.getItem("token");
      
      const response = await axios.put(
        `http://localhost:3000/api/v1/employee/update/${id}`,
        employeeData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.data.success) {
        dispatch(updateEmployee({ id, ...response.data.data }));
        message.success("Employee updated successfully!");
        return response.data.data;
      }
    } catch (error) {
      console.error("Update employee error:", error);
      dispatch(setError(error.response?.data?.message || "Failed to update employee"));
      throw error;
    } finally {
      dispatch(setLoading(false));
    }
  }, [dispatch]);

  // Delete employee
  const removeEmployee = useCallback(async (employeeId) => {
    try {
      dispatch(setLoading(true));
      const token = localStorage.getItem("token");
      
      const response = await axios.delete(
        `http://localhost:3000/api/v1/employee/delete/${employeeId}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (response.data.success) {
        dispatch(deleteEmployee(employeeId));
        message.success("Employee deleted successfully!");
      }
    } catch (error) {
      console.error("Delete employee error:", error);
      dispatch(setError(error.response?.data?.message || "Failed to delete employee"));
      throw error;
    } finally {
      dispatch(setLoading(false));
    }
  }, [dispatch]);

  // Select employee for viewing/editing
  const selectEmployee = useCallback((employee) => {
    dispatch(setSelectedEmployee(employee));
  }, [dispatch]);

  // Clear selected employee
  const clearSelected = useCallback(() => {
    dispatch(clearSelectedEmployee());
  }, [dispatch]);

  // ✅ Attendance Functions

  // Mark attendance for an employee
  const markEmployeeAttendance = useCallback((attendanceData) => {
    dispatch(markAttendance(attendanceData));
  }, [dispatch]);

  // Mark check out for an employee
  const markEmployeeCheckOut = useCallback((employeeId, date) => {
    dispatch(markCheckOut({ employeeId, date }));
  }, [dispatch]);

  // Bulk mark attendance for multiple employees
  const bulkMarkEmployeeAttendance = useCallback((employeeIds, status, date) => {
    dispatch(bulkMarkAttendance({ employeeIds, status, date }));
  }, [dispatch]);

  // Set attendance date
  const setAttendanceDateFilter = useCallback((date) => {
    dispatch(setAttendanceDate(date));
  }, [dispatch]);

  // Clear all attendance records
  const clearAllAttendance = useCallback(() => {
    dispatch(clearAttendance());
  }, [dispatch]);

  // ✅ Committee Functions

  // Add committee member
const addCommitteeMember = useCallback(async (committeeData) => {
  try {
    dispatch(setLoading(true));
    
    // Your existing logic to add to localStorage
    const committeeMember = {
      ...committeeData,
      joinedAt: new Date().toISOString()
    };
    
    // Dispatch to Redux
    dispatch(addCommitteeMember(committeeMember));
    
    message.success('Committee member added successfully!');
    return committeeMember;
  } catch (error) {
    console.error('Add committee member error:', error);
    dispatch(setError(error.message || 'Failed to add committee member'));
    message.error('Failed to add committee member');
    throw error; // Important: re-throw the error
  } finally {
    dispatch(setLoading(false));
  }
}, [dispatch]);

  // Remove committee member
  const removeCommitteeMember = useCallback((employeeId) => {
    dispatch(removeCommitteeMember(employeeId));
  }, [dispatch]);

  // Update committee member
  const updateCommitteeMember = useCallback((committeeData) => {
    dispatch(updateCommitteeMember(committeeData));
  }, [dispatch]);

  // Set committee members
  const setCommitteeMembersList = useCallback((members) => {
    dispatch(setCommitteeMembers(members));
  }, [dispatch]);

  // ✅ Helper Functions

  // Get employees with their attendance status
  const getEmployeesWithAttendance = useCallback(() => {
    return employees.map(employee => {
      const attendanceRecord = attendance.find(
        record => record.employeeId === employee._id && record.date === attendanceDate
      );
      
      return {
        ...employee,
        attendance: attendanceRecord || {
          employeeId: employee._id,
          date: attendanceDate,
          status: 'absent', // Default status
          checkIn: null,
          checkOut: null,
          workingHours: 0,
          timestamp: null
        }
      };
    });
  }, [employees, attendance, attendanceDate]);

  // Get attendance statistics
  const getAttendanceStats = useCallback(() => {
    const employeesWithAttendance = getEmployeesWithAttendance();
    const totalEmployees = employeesWithAttendance.length;
    
    const presentCount = employeesWithAttendance.filter(
      emp => emp.attendance.status === 'present'
    ).length;
    
    const absentCount = employeesWithAttendance.filter(
      emp => emp.attendance.status === 'absent'
    ).length;
    
    const lateCount = employeesWithAttendance.filter(
      emp => emp.attendance.status === 'late'
    ).length;
    
    const halfDayCount = employeesWithAttendance.filter(
      emp => emp.attendance.status === 'half_day'
    ).length;

    const attendanceRate = totalEmployees > 0 ? 
      ((presentCount / totalEmployees) * 100).toFixed(1) : 0;

    return {
      totalEmployees,
      presentToday: presentCount,
      absentToday: absentCount,
      lateToday: lateCount,
      halfDayToday: halfDayCount,
      attendanceRate: parseFloat(attendanceRate)
    };
  }, [getEmployeesWithAttendance]);

  // Get filtered employees based on search and filters
  const getFilteredEmployees = useCallback((filters = {}) => {
    let filtered = getEmployeesWithAttendance();

    const {
      searchText = '',
      department = 'all',
      status = 'all'
    } = filters;

    // Search filter
    if (searchText) {
      filtered = filtered.filter(emp =>
        emp.firstName?.toLowerCase().includes(searchText.toLowerCase()) ||
        emp.lastName?.toLowerCase().includes(searchText.toLowerCase()) ||
        emp.employeeId?.toLowerCase().includes(searchText.toLowerCase()) ||
        emp.department?.toLowerCase().includes(searchText.toLowerCase())
      );
    }

    // Department filter
    if (department !== 'all') {
      filtered = filtered.filter(emp => emp.department === department);
    }

    // Status filter
    if (status !== 'all') {
      filtered = filtered.filter(emp => emp.attendance.status === status);
    }

    return filtered;
  }, [getEmployeesWithAttendance]);

  // Get departments for filter dropdown
  const getDepartments = useMemo(() => {
    const departments = [...new Set(employees.map(emp => emp.department))];
    return departments.filter(dept => dept); // Remove null/undefined
  }, [employees]);
  

  // Get committee members with employee data

  const getCommitteeMembers = useCallback(() => {
    if (!committeeMembers.length || !employees.length) {
      return [];
    }
    
    return committeeMembers
      .map(committeeMember => {
        const employee = employees.find(emp => emp._id === committeeMember.employeeId);
        if (!employee) return null; // Skip if employee not found
        
        return {
          ...committeeMember,
          employee: employee
        };
      })
      .filter(member => member !== null); // Remove null entries
  }, [committeeMembers, employees]);

  // Get ALL employees with their committee status
  const getEmployeesWithCommitteeStatus = useCallback(() => {
    return employees.map(employee => {
      const committeeMember = committeeMembers.find(
        member => member.employeeId === employee._id
      );
      
      return {
        ...employee,
        committee: committeeMember || null,
        isCommitteeMember: !!committeeMember
      };
    });
  }, [employees, committeeMembers]);

  // Get employees by committee position
  const getEmployeesByCommitteePosition = useCallback((position) => {
    const allEmployees = getEmployeesWithCommitteeStatus();
    return allEmployees.filter(employee => 
      employee.committee?.position === position
    );
  }, [getEmployeesWithCommitteeStatus]);

  // Get committee statistics
  const getCommitteeStats = useCallback(() => {
    const committeeMembersWithDetails = getCommitteeMembers();
    const totalMembers = committeeMembersWithDetails.length;
    const activeMembers = committeeMembersWithDetails.filter(member => member.status === 'active').length;
    
    const positionCount = committeeMembersWithDetails.reduce((acc, member) => {
      acc[member.position] = (acc[member.position] || 0) + 1;
      return acc;
    }, {});

    // Calculate total employees
    const totalEmployees = employees.length;
    const committeePercentage = totalEmployees > 0 ? 
      ((totalMembers / totalEmployees) * 100).toFixed(1) : 0;

    return {
      totalMembers,
      activeMembers,
      inactiveMembers: totalMembers - activeMembers,
      totalEmployees,
      committeePercentage: parseFloat(committeePercentage),
      positionCount
    };
  }, [getCommitteeMembers, employees]);

  return {
    // State
    employees,
    selectedEmployee,
    loading,
    error,
    attendance,
    attendanceDate,
    committeeMembers,
    committeePositions,
    
    // Employee Actions
    loadEmployees,
    createEmployee,
    editEmployee,
    removeEmployee,
    selectEmployee,
    clearSelected,

    // Attendance Actions
    markEmployeeAttendance,
    markEmployeeCheckOut,
    bulkMarkEmployeeAttendance,
    setAttendanceDate: setAttendanceDateFilter,
    clearAllAttendance,

    // ✅ Committee Actions
    addCommitteeMember,
    removeCommitteeMember,
    updateCommitteeMember,
    setCommitteeMembers: setCommitteeMembersList,

    // Helper Functions
    getEmployeesWithAttendance,
    getAttendanceStats,
    getFilteredEmployees,
    getDepartments,
    getEmployeesWithCommitteeStatus,
    getCommitteeMembers,
    getCommitteeStats,
    getEmployeesByCommitteePosition
  };
};




