

// import { useDispatch, useSelector } from 'react-redux';
// import { 
//   fetchAllPayments, 
//   fetchMyPayments, 
//   submitNewPayment, 
//   verifyPaymentStatus, 
//   fetchPaymentStats,
//   setFilters 
// } from '../slices/paymentSlice';

// export const usePayment = () => {
//   const dispatch = useDispatch();
//   const paymentState = useSelector(state => state.payment);

//   const loadAllPayments = (filters = {}) => {
//     return dispatch(fetchAllPayments(filters));
//   };

//   const loadMyPayments = (filters = {}) => {
//     return dispatch(fetchMyPayments(filters));
//   };

//   const submitPayment = async (paymentData) => {
//     try {
//       const result = await dispatch(submitNewPayment(paymentData)).unwrap();
//       return { success: true, data: result };
//     } catch (error) {
//       return { success: false, error: error.message };
//     }
//   };

//   const verifyPayment = async (paymentId, status, rejectionReason = '') => {
//     try {
//       const result = await dispatch(verifyPaymentStatus({ 
//         paymentId, 
//         status, 
//         rejectionReason 
//       })).unwrap();
//       return { success: true, data: result };
//     } catch (error) {
//       return { success: false, error: error.message };
//     }
//   };

//   const loadStats = () => {
//     return dispatch(fetchPaymentStats());
//   };

//   const updateFilters = (newFilters) => {
//     dispatch(setFilters(newFilters));
//   };

//   return {
//     ...paymentState,
//     loadAllPayments,
//     loadMyPayments,
//     submitPayment,
//     verifyPayment,
//     loadStats,
//     updateFilters
//   };
// };





// hooks/usePayment.js
import { useDispatch, useSelector } from 'react-redux';
import { 
  fetchAllPayments, 
  fetchMyPayments, 
  submitNewPayment, 
  verifyPaymentStatus, 
  fetchPaymentStats,
  fetchPaymentOverview,
  setFilters,
  clearError
} from '../slices/paymentSlice';

export const usePayment = () => {
  const dispatch = useDispatch();
  const paymentState = useSelector(state => state.payment);

  const loadAllPayments = (filters = {}) => {
    return dispatch(fetchAllPayments(filters));
  };

  const loadMyPayments = (filters = {}) => {
    return dispatch(fetchMyPayments(filters));
  };

  const submitPayment = async (paymentData) => {
    try {
      const result = await dispatch(submitNewPayment(paymentData)).unwrap();
      return { success: true, data: result };
    } catch (error) {
      return { success: false, error: error.message || 'Failed to submit payment' };
    }
  };

  const verifyPayment = async (paymentId, status, rejectionReason = '') => {
    try {
      const result = await dispatch(verifyPaymentStatus({ 
        paymentId, 
        status, 
        rejectionReason 
      })).unwrap();
      return { success: true, data: result };
    } catch (error) {
      return { success: false, error: error.message || 'Failed to verify payment' };
    }
  };

  const loadStats = () => {
    return dispatch(fetchPaymentStats());
  };

  const loadOverview = (paymentMonth, paymentYear) => {
    return dispatch(fetchPaymentOverview({ paymentMonth, paymentYear }));
  };

  const updateFilters = (newFilters) => {
    dispatch(setFilters(newFilters));
  };

  const clearErrors = () => {
    dispatch(clearError());
  };

  return {
    ...paymentState,
    loadAllPayments,
    loadMyPayments,
    submitPayment,
    verifyPayment,
    loadStats,
    loadOverview,
    updateFilters,
    clearErrors
  };
};





