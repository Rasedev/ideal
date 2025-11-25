// hooks/useAttendance.js
import { useDispatch, useSelector } from 'react-redux';
import { useCallback } from 'react';
import {
  fetchAttendance,
  markAttendance,
  fetchAttendanceStats,
  generateAttendanceReport,
  setFilters,
  clearError
} from '../slices/attendanceSlice';

export const useAttendance = () => {
  const dispatch = useDispatch();
  const {
    attendance,
    stats,
    report,
    loading,
    error,
    filters
  } = useSelector(state => state.attendance);

  const loadAttendance = useCallback((filters = {}) => {
    dispatch(fetchAttendance(filters));
  }, [dispatch]);

  const loadStats = useCallback((filters = {}) => {
    dispatch(fetchAttendanceStats(filters));
  }, [dispatch]);

  const markEmployeeAttendance = useCallback((attendanceData) => {
    return dispatch(markAttendance(attendanceData)).unwrap();
  }, [dispatch]);

  const generateReport = useCallback((reportParams) => {
    return dispatch(generateAttendanceReport(reportParams)).unwrap();
  }, [dispatch]);

  const updateFilters = useCallback((newFilters) => {
    dispatch(setFilters(newFilters));
  }, [dispatch]);

  const resetError = useCallback(() => {
    dispatch(clearError());
  }, [dispatch]);

  return {
    // State
    attendance,
    stats,
    report,
    loading,
    error,
    filters,
    
    // Actions
    loadAttendance,
    loadStats,
    markEmployeeAttendance,
    generateReport,
    updateFilters,
    resetError
  };
};