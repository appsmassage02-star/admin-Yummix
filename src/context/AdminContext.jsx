import { createContext, useState } from "react";

export const AdminContext = createContext(null);

const AdminContextProvider = ({ children }) => {
  const url = import.meta.env.VITE_API_URL || "";
  const [token, setToken] = useState(localStorage.getItem("adminToken") || "");

  const authHeader = () => ({ headers: { token } });

  const logout = () => {
    localStorage.removeItem("adminToken");
    setToken("");
  };

  const isBackendConnected = Boolean(url);

  const contextValue = { url, token, setToken, authHeader, logout, isBackendConnected };

  return <AdminContext.Provider value={contextValue}>{children}</AdminContext.Provider>;
};

export default AdminContextProvider;