// hooks/useDues.js
import { useDispatch, useSelector } from 'react-redux';
import { 
  fetchAllDues, 
  fetchMyDues, 
  createNewDues, 
  updateDues, 
  sendReminder, 
  fetchDuesStats,
  deleteDuesRecord,
  setFilters 
} from '../slices/duesSlice';

export const useDues = () => {
  const dispatch = useDispatch();
  const duesState = useSelector(state => state.dues) || {};

  const loadAllDues = (filters = {}) => {
    return dispatch(fetchAllDues(filters));
  };

  const loadMyDues = (filters = {}) => {
    return dispatch(fetchMyDues(filters));
  };

  const createDues = async (duesData) => {
    try {
      const result = await dispatch(createNewDues(duesData)).unwrap();
      return { success: true, data: result };
    } catch (error) {
      return { success: false, error: error.message };
    }
  };

  const updateDuesStatus = async (duesId, updateData) => {
    try {
      const result = await dispatch(updateDues({ duesId, updateData })).unwrap();
      return { success: true, data: result };
    } catch (error) {
      return { success: false, error: error.message };
    }
  };

  const sendDueReminder = async (duesId, reminderData = {}) => {
    try {
      const result = await dispatch(sendReminder({ duesId, reminderData })).unwrap();
      return { success: true, data: result };
    } catch (error) {
      return { success: false, error: error.message };
    }
  };

  const loadStats = () => {
    return dispatch(fetchDuesStats());
  };

  const deleteDues = async (duesId) => {
    try {
      const result = await dispatch(deleteDuesRecord(duesId)).unwrap();
      return { success: true, data: result };
    } catch (error) {
      return { success: false, error: error.message };
    }
  };

  const updateFilters = (newFilters) => {
    dispatch(setFilters(newFilters));
  };

  // return {
  //    stats: {},
  //   ...duesState,
  //   loadAllDues,
  //   loadMyDues,
  //   createDues,
  //   updateDuesStatus,
  //   sendDueReminder,
  //   loadStats,
  //   deleteDues,
  //   updateFilters
  // };

   return {
    stats: {},
    filters: {}, // ✅ FIX: Default value if missing from state
    dues: [],    // ✅ FIX: Default value
    loading: false,
    ...duesState, // This will override defaults if state exists
    loadAllDues,
    loadMyDues,
    createDues,
    updateDuesStatus,
    sendDueReminder,
    loadStats,
    deleteDues,
    updateFilters
  };



};