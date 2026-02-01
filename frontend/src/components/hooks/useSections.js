// hooks/useSections.js
import { useDispatch, useSelector } from 'react-redux';
import { 
  fetchServices,
  fetchHeroData,
  fetchAboutData,
  fetchStats,
  fetchFeatures,
  fetchTeam,
  fetchTestimonials,
  fetchNews,
  fetchFinanceData,
  fetchContactData,
  submitContactForm,
  clearError,
  clearContactSubmitStatus
} from '../Slices/sectionsSlice';

export const useSections = () => {
  const dispatch = useDispatch();
  const sections = useSelector((state) => state.sections);

  return {
    // State
    ...sections,
    
    // Actions
    fetchServices: () => dispatch(fetchServices()),
    fetchHeroData: () => dispatch(fetchHeroData()),
    fetchAboutData: () => dispatch(fetchAboutData()),
    fetchStats: () => dispatch(fetchStats()),
    fetchFeatures: () => dispatch(fetchFeatures()),
    fetchTeam: () => dispatch(fetchTeam()),
    fetchTestimonials: () => dispatch(fetchTestimonials()),
    fetchNews: () => dispatch(fetchNews()),
    fetchFinanceData: () => dispatch(fetchFinanceData()),
    fetchContactData: () => dispatch(fetchContactData()),
    submitContactForm: (formData) => dispatch(submitContactForm(formData)),
    clearError: () => dispatch(clearError()),
    clearContactSubmitStatus: () => dispatch(clearContactSubmitStatus()),
  };
};