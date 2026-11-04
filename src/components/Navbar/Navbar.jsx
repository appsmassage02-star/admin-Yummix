import React, { useContext } from "react";
import "./Navbar.css";
import { AdminContext } from "../../context/AdminContext.jsx";
import { ShieldCheck, LogOut } from "lucide-react";

const Navbar = () => {
  const { logout, isBackendConnected } = useContext(AdminContext);

  return (
    <div className="navbar">
      <div className="navbar-logo" style={{ display: "flex", alignItems: "center", gap: "8px" }}>
        <ShieldCheck size={22} />
        <span>Yummix Super Admin</span>
        <span
          style={{
            fontSize: "11px",
            background: isBackendConnected ? "#dcfce7" : "#f3f4f6",
            color: isBackendConnected ? "#166534" : "#4b5563",
            border: `1px solid ${isBackendConnected ? "#86efac" : "#d1d5db"}`,
            padding: "2px 8px",
            borderRadius: "12px",
            fontWeight: "500",
          }}
        >
          {isBackendConnected ? "Connected" : "Isolated Mode"}
        </span>
      </div>
      <button onClick={logout}>
        <LogOut size={16} />
        Logout
      </button>
    </div>
  );
};

export default Navbar;