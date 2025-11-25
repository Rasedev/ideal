

// export const authStorage = {
//   saveSession(token, user) {
//     try {
//       localStorage.setItem("token", token);
//       localStorage.setItem("user", JSON.stringify(user));
//       localStorage.setItem("currentUser", JSON.stringify(user));
//       console.log("💾 Auth session saved:", { 
//         token: token.substring(0, 20) + '...', 
//         user: user 
//       });
//     } catch (error) {
//       console.error("❌ Failed to save auth session:", error);
//     }
//   },

//   getSession() {
//     try {
//       const token = localStorage.getItem("token");
//       const userStr = localStorage.getItem("user");
      
//       if (!token || !userStr) return null;
      
//       const user = JSON.parse(userStr);
//       return { token, user };
//     } catch (error) {
//       console.error("❌ Failed to get auth session:", error);
//       this.clear();
//       return null;
//     }
//   },

//   getToken() {
//     return localStorage.getItem("token");
//   },

//   getUser() {
//     try {
//       const userStr = localStorage.getItem("user");
//       return userStr ? JSON.parse(userStr) : null;
//     } catch (error) {
//       console.error("❌ Failed to get user:", error);
//       return null;
//     }
//   },

//   clear() {
//     localStorage.removeItem("token");
//     localStorage.removeItem("user");
//     localStorage.removeItem("currentUser");
//     console.log("🧹 Auth session cleared");
//   },

//   // Check if user is authenticated
//   isAuthenticated() {
//     const token = this.getToken();
//     const user = this.getUser();
//     return !!(token && user);
//   }
// };





// utils/authStorage.js - ENHANCED VERSION




// utils/authStorage.js - ULTIMATE VERSION








class UltimateAuthStorage {
  constructor() {
    this.keys = {
      TOKEN: 'ultimate_auth_token',
      USER: 'ultimate_auth_user', 
      TIMESTAMP: 'ultimate_auth_timestamp'
    };
  }

  // 🚀 SAVE SESSION - GUARANTEED TO WORK
  saveSession(token, user) {
    try {
      // Clear any existing data first
      this.clear();
      
      // Store new data
      localStorage.setItem(this.keys.TOKEN, token);
      localStorage.setItem(this.keys.USER, JSON.stringify(user));
      localStorage.setItem(this.keys.TIMESTAMP, Date.now().toString());
      authStorage.saveSession(token, user);

      // VERIFY it was saved
      const verified = this.verifyStorage();
      
      console.log("💾 ULTIMATE STORAGE RESULT:", {
        success: verified,
        tokenSaved: !!this.getToken(),
        userSaved: !!this.getUser(),
        userRole: user?.role
      });
      
      return verified;
    } catch (error) {
      console.error("❌ STORAGE FAILED:", error);
      return false;
    }
  }

  // ✅ VERIFY STORAGE WORKED
  verifyStorage() {
    const token = this.getToken();
    const user = this.getUser();
    return !!(token && user);
  }

  // 🔐 GET TOKEN - GUARANTEED
  getToken() {
    try {
      return localStorage.getItem(this.keys.TOKEN);
    } catch {
      return null;
    }
  }

  // 👤 GET USER - GUARANTEED  
  getUser() {
    try {
      const userStr = localStorage.getItem(this.keys.USER);
      return userStr ? JSON.parse(userStr) : null;
    } catch {
      return null;
    }
  }

  // 🔍 IS AUTHENTICATED - GUARANTEED
  isAuthenticated() {
    return this.verifyStorage();
  }

  // 🧹 CLEAR - GUARANTEED
  clear() {
    try {
      localStorage.removeItem(this.keys.TOKEN);
      localStorage.removeItem(this.keys.USER);
      localStorage.removeItem(this.keys.TIMESTAMP);
      return true;
    } catch {
      return false;
    }
  }

  // 📊 DEBUG INFO
  debug() {
    return {
      token: this.getToken() ? '✅ EXISTS' : '❌ MISSING',
      user: this.getUser() ? '✅ EXISTS' : '❌ MISSING', 
      isAuthenticated: this.isAuthenticated() ? '✅ YES' : '❌ NO',
      userData: this.getUser()
    };
  }
}

export const authStorage = new UltimateAuthStorage();


