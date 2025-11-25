
/////////////////New employeeSlice.jsx file///////////////////
//////////////////////FINAL CODE/////////////////////


import { createSlice } from "@reduxjs/toolkit";


const storage = {
  get: (key, defaultValue = []) => {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : defaultValue;
    } catch (error) {
      console.error(`Error reading ${key} from localStorage:`, error);
      return defaultValue;
    }
  },
  set: (key, value) => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error(`Error saving ${key} to localStorage:`, error);
    }
  },
  remove: (key) => {
    try {
      localStorage.removeItem(key);
    } catch (error) {
      console.error(`Error removing ${key} from localStorage:`, error);
    }
  }
};

const employeeSlice = createSlice({
  name: "employees",
  initialState: {
    list: storage.get("employees", []), // All employees
    selected: storage.get("selectedEmployee", null), // Currently selected employee
    loading: false,
    error: null,
    attendance: {
      today: [], // Today's attendance records
      date: new Date().toISOString().split('T')[0], // Current date
    },
    committee: {
      members: storage.get("committeeMembers", []),
      positions: [
        'President',
        'ExecutivePresident', 
        'VicePresident',
        'VicePresident', // Second Vice President
        'GeneralSecretary',
        'JointGeneralSecretary',
        'JointGeneralSecretary', // Second Joint General Secretary
        'OrganizingSecretary',
        'FinanceSecretary',
        'PublicityAndPublicationSecretary',
        'OfficeSecretary',
        'SocialWelfareAffairsSecretary',
        'LegalAffairsSecretary',
        'ReligiousAffairsSecretary',
        'PriyaAndCulturalAffairsSecretary',
        'WomensAffairsSecretary',
        'EnvironmentalAffairsSecretary',
        'ExecutiveWorkingMember',
        'ExecutiveWorkingMember',
        'ExecutiveWorkingMember',
        'ExecutiveWorkingMember',
        'ExecutiveWorkingMember',
        'ExecutiveWorkingMember'
      ]
    }
  

  },
  
  reducers: {
    // ✅ Set loading state
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    
    // ✅ Set error state
    setError: (state, action) => {
      state.error = action.payload;
    },
    
    // ✅ Add single employee
    addEmployee: (state, action) => {
      state.list.push(action.payload);
      storage.set("employees", state.list);
    },
    
    // ✅ Set all employees (useful for initial load)
    setEmployees: (state, action) => {
      state.list = action.payload;
      storage.set("employees", state.list);
    },
    
    // ✅ Update employee
    updateEmployee: (state, action) => {
      const { id, ...updates } = action.payload;
      const index = state.list.findIndex(emp => emp._id === id);
      
      if (index !== -1) {
        state.list[index] = { ...state.list[index], ...updates };
        storage.set("employees", state.list);
      }
    },
    
    // ✅ Delete employee
    deleteEmployee: (state, action) => {
      state.list = state.list.filter(emp => emp._id !== action.payload);
      storage.set("employees", state.list);
    },
    
    // ✅ Select employee for viewing/editing
    setSelectedEmployee: (state, action) => {
      state.selected = action.payload;
      storage.set("selectedEmployee", action.payload);
    },
    
    // ✅ Clear selected employee
    clearSelectedEmployee: (state) => {
      state.selected = null;
      storage.remove("selectedEmployee");
    },
    
    // ✅ Clear all errors
    clearError: (state) => {
      state.error = null;
    },


     // ✅ NEW: Attendance reducers
    markAttendance: (state, action) => {
      const { employeeId, status, date = new Date().toISOString().split('T')[0] } = action.payload;
      
      const existingIndex = state.attendance.today.findIndex(
        record => record.employeeId === employeeId && record.date === date
      );
      
      const attendanceRecord = {
        employeeId,
        date,
        status,
        timestamp: new Date().toISOString(),
        checkIn: status === 'present' ? new Date().toISOString() : null,
        checkOut: null,
        workingHours: 0
      };
      
      if (existingIndex !== -1) {
        state.attendance.today[existingIndex] = attendanceRecord;
      } else {
        state.attendance.today.push(attendanceRecord);
      }
    },
    
    markCheckOut: (state, action) => {
      const { employeeId, date = new Date().toISOString().split('T')[0] } = action.payload;
      
      const recordIndex = state.attendance.today.findIndex(
        record => record.employeeId === employeeId && record.date === date
      );
      
      if (recordIndex !== -1 && state.attendance.today[recordIndex].checkIn) {
        const checkInTime = new Date(state.attendance.today[recordIndex].checkIn);
        const checkOutTime = new Date();
        const workingHours = ((checkOutTime - checkInTime) / (1000 * 60 * 60)).toFixed(2);
        
        state.attendance.today[recordIndex].checkOut = checkOutTime.toISOString();
        state.attendance.today[recordIndex].workingHours = parseFloat(workingHours);
      }
    },
    
    bulkMarkAttendance: (state, action) => {
      const { employeeIds, status, date = new Date().toISOString().split('T')[0] } = action.payload;
      
      employeeIds.forEach(employeeId => {
        const existingIndex = state.attendance.today.findIndex(
          record => record.employeeId === employeeId && record.date === date
        );
        
        const record = {
          employeeId,
          date,
          status,
          timestamp: new Date().toISOString(),
          checkIn: status === 'present' ? new Date().toISOString() : null,
          checkOut: null,
          workingHours: 0
        };
        
        if (existingIndex !== -1) {
          state.attendance.today[existingIndex] = record;
        } else {
          state.attendance.today.push(record);
        }
      });
    },
    
    setAttendanceDate: (state, action) => {
      state.attendance.date = action.payload;
    },
    
    clearAttendance: (state) => {
      state.attendance.today = [];
    },

    // ✅ NEW: Committee reducers
    addCommitteeMember: (state, action) => {
      const { employeeId, position, termStart, termEnd, responsibilities, status = 'active' } = action.payload;
      
      const existingIndex = state.committee.members.findIndex(
        member => member.employeeId === employeeId
      );
      
      const committeeMember = {
        employeeId,
        position,
        termStart,
        termEnd,
        responsibilities,
        status,
        joinedAt: new Date().toISOString()
      };
      
      if (existingIndex !== -1) {
        state.committee.members[existingIndex] = committeeMember;
      } else {
        state.committee.members.push(committeeMember);
      }
      storage.set("committeeMembers", state.committee.members);
    },
    
    removeCommitteeMember: (state, action) => {
      state.committee.members = state.committee.members.filter(
        member => member.employeeId !== action.payload
      );
      storage.set("committeeMembers", state.committee.members);
    },
    
    updateCommitteeMember: (state, action) => {
      const { employeeId, ...updates } = action.payload;
      const index = state.committee.members.findIndex(
        member => member.employeeId === employeeId
      );
      
      if (index !== -1) {
        state.committee.members[index] = { 
          ...state.committee.members[index], 
          ...updates 
        };
        storage.set("committeeMembers", state.committee.members);
      }
    },
    
    setCommitteeMembers: (state, action) => {
      state.committee.members = action.payload;
      storage.set("committeeMembers", state.committee.members);
    }
  




  },
});

export const { 
  setLoading,
  setError,
  addEmployee,
  setEmployees,
  updateEmployee,
  deleteEmployee,
  setSelectedEmployee,
  clearSelectedEmployee,
  clearError,
  markAttendance, 
  markCheckOut, 
  bulkMarkAttendance, 
  setAttendanceDate,
  clearAttendance,
  addCommitteeMember,
  removeCommitteeMember, 
  updateCommitteeMember,
  setCommitteeMembers,
} = employeeSlice.actions;

export default employeeSlice.reducer;





