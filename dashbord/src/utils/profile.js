export const getProfileImage = () => {
  const stored = localStorage.getItem("userProfile");
  if (!stored) return null;

  const user = JSON.parse(stored);
  return user.profilePhoto || getDefaultImageByRole(user.role);
};

export const getDefaultImageByRole = (role) => {
  const defaults = {
    admin: "/images/default-admin.png",
    hr: "/images/default-hr.png",
    employee: "/images/default-employee.png",
  };
  return defaults[role?.toLowerCase()] || "https://via.placeholder.com/64";
};



// export const getProfileName = () => {
//   const stored = localStorage.getItem("userProfile");
//   if (!stored) return "Guest";

//   const user = JSON.parse(stored);
//   return user.name || "Guest";
// }; 
// export const getProfileRole = () => {
//   const stored = localStorage.getItem("userProfile");
//   if (!stored) return "Guest";

//   const user = JSON.parse(stored);
//   return user.role || "Guest";
// };
// export const getProfileEmail = () => {
//   const stored = localStorage.getItem("userProfile");
//   if (!stored) return "Guest";
//   const user = JSON.parse(stored);
//     return user.email || "Guest";
// }
// export const getProfileId = () => {
//   const stored = localStorage.getItem("userProfile");
//   if (!stored) return null;

//   const user = JSON.parse(stored);
//   return user._id || null;
// };
// export const getProfile = () => {
//   const stored = localStorage.getItem("userProfile");
//   if (!stored) return null;

//   return JSON.parse(stored);
// };
// export const isAuthenticated = () => {
//   const token = localStorage.getItem("token");
//   return !!token;
// };
// export const logout = () => {
//   localStorage.removeItem("token");
//   localStorage.removeItem("userProfile");
//   window.location.href = "/login"; // Redirect to login page
// };
// export const getUserRole = () => {
//   const stored = localStorage.getItem("userProfile");
//   if (!stored) return null;

//   const user = JSON.parse(stored);
//   return user.role || null;
// };
// export const isAdmin = () => {
//   const role = getUserRole();
//   return role && role.toLowerCase() === "admin";
// };
// export const isHR = () => {
//   const role = getUserRole();
//   return role && role.toLowerCase() === "hr";
// };
// export const isEmployee = () => {
//   const role = getUserRole();
//   return role && role.toLowerCase() === "employee";
// };
// export const getUserName = () => {
//   const stored = localStorage.getItem("userProfile");
//   if (!stored) return "Guest";

//   const user = JSON.parse(stored);
//   return user.name || "Guest";
// };
// export const getUserEmail = () => {
//   const stored = localStorage.getItem("userProfile");
//   if (!stored) return "Guest";

//   const user = JSON.parse(stored);
//   return user.email || "Guest";
// };
// export const getUserId = () => {
//   const stored = localStorage.getItem("userProfile");
//   if (!stored) return null;

//   const user = JSON.parse(stored);
//   return user._id || null;
// };
// export const getUserProfile = () => {
//   const stored = localStorage.getItem("userProfile");
//   if (!stored) return null;

//   return JSON.parse(stored);
// };
// export const isUserAuthenticated = () => {
//   const token = localStorage.getItem("token");
//   return !!token;
// };
// export const userLogout = () => {
//   localStorage.removeItem("token");
//   localStorage.removeItem("userProfile");
//   window.location.href = "/login"; // Redirect to login page
// };


