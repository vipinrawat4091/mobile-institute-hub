
import React, { createContext, useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

// Sample user data - in a real app, this would come from your backend
const MOCK_USERS = {
  "SA201": { id: 1, username: "SA201", password: "password123", role: "superadmin", name: "Alex Johnson" },
  "AD201": { id: 2, username: "AD201", password: "password123", role: "admin", name: "Jamie Smith" },
  "TC201": { id: 3, username: "TC201", password: "password123", role: "teacher", name: "Pat Williams" },
  "ST201": { id: 4, username: "ST201", password: "password123", role: "staff", name: "Morgan Lee" },
  "SD201": { id: 5, username: "SD201", password: "password123", role: "student", name: "Taylor Brown" },
  "PR201": { id: 6, username: "PR201", password: "password123", role: "parent", name: "Jordan Miller" },
};

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user is already logged in
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setCurrentUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  // Get role from username (first two letters)
  const getRoleFromUsername = (username) => {
    if (!username || username.length < 2) return null;
    
    const prefix = username.substring(0, 2).toUpperCase();
    
    switch(prefix) {
      case "SA": return "superadmin";
      case "AD": return "admin";
      case "TC": return "teacher";
      case "ST": return "staff";
      case "SD": return "student";
      case "PR": return "parent";
      default: return null;
    }
  };

  const login = (username, password) => {
    // In a real app, this would be an API call
    const user = MOCK_USERS[username];
    
    if (!user || user.password !== password) {
      toast.error("Invalid username or password");
      return false;
    }
    
    // Check if the role matches the expected role from the username
    const expectedRole = getRoleFromUsername(username);
    if (expectedRole !== user.role) {
      toast.error("User role doesn't match the expected role");
      return false;
    }

    setCurrentUser(user);
    localStorage.setItem("user", JSON.stringify(user));
    toast.success(`Welcome, ${user.name}`);
    navigate("/dashboard");
    return true;
  };

  const logout = () => {
    setCurrentUser(null);
    localStorage.removeItem("user");
    navigate("/");
  };

  const value = {
    currentUser,
    login,
    logout,
    getRoleFromUsername,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
