import { createContext, useState, useEffect } from "react";

export const AuthContext = createContext({
  user: null,
  isAuthenticated: false,
  loading: true,
  signup: () => {},
  login: () => {},
  logout: () => {},
  updateProfile: () => {},
});

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Load user from localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem("auth_user");
    if (stored) {
      try {
        setUser(JSON.parse(stored));
      } catch {
        localStorage.removeItem("auth_user");
      }
    }
    setLoading(false);
  }, []);

  const persistUser = (nextUser) => {
    setUser(nextUser);
    if (nextUser) {
      localStorage.setItem("auth_user", JSON.stringify(nextUser));
    } else {
      localStorage.removeItem("auth_user");
    }
  };

  const signup = async (payload) => {
    // Fake async signup – swap with real API later
    const newUser = {
      id: Date.now().toString(),
      firstName: payload.firstName,
      lastName: payload.lastName,
      email: payload.email,
      userType: payload.userType,
    };
    persistUser(newUser);
    return newUser;
  };

  const login = async ({ email }) => {
    // For now, treat login as “restore same user by email”
    const stored = localStorage.getItem("auth_user");
    if (stored) {
      const parsed = JSON.parse(stored);
      if (parsed.email === email) {
        setUser(parsed);
        return parsed;
      }
    }
    const fakeUser = { id: "1", firstName: "User", lastName: "", email };
    persistUser(fakeUser);
    return fakeUser;
  };

  const logout = () => {
    persistUser(null);
  };

  const updateProfile = (updates) => {
    setUser((prev) => {
      const next = { ...(prev || {}), ...updates };
      persistUser(next);
      return next;
    });
  };

  const value = {
    user,
    isAuthenticated: !!user,
    loading,
    signup,
    login,
    logout,
    updateProfile,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
