import React, { createContext, useContext, useState, useEffect } from "react";

export const AuthContext = createContext();

// Custom hook
export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  // Load user from localStorage
  useEffect(() => {
    const token = localStorage.getItem("token");
    const savedUser = localStorage.getItem("user");

    if (token && savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  // FIXED: backend sends userId → but backend expects id
  const login = (token, role, userId, customerId, name) => {
    const userObj = {
      id: userId,           // ✔ correct key (backend expects req.user.id)
      role,
      name,
      customerId,
      token,
    };

    localStorage.setItem("token", token);
    localStorage.setItem("user", JSON.stringify(userObj));

    setUser(userObj);
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
