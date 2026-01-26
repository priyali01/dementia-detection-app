// import { createContext, useContext, useState } from "react";

// const AuthContext = createContext(null);

// export const AuthProvider = ({ children }) => {
//   const [user, setUser] = useState(null);
//   const [loading] = useState(false); // simple placeholder

//   const login = (fakeUser) => setUser(fakeUser);
//   const logout = () => setUser(null);

//   const value = {
//     user,
//     isAuthenticated: !!user,
//     loading,
//     login,
//     logout,
//   };

//   return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
// };

// export const useAuth = () => {
//   return useContext(AuthContext);
// };
