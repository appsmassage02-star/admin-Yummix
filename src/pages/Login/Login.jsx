import React, { useContext, useState } from "react";
import "./Login.css";
import axios from "axios";
import { toast } from "react-toastify";
import { AdminContext } from "../../context/AdminContext.jsx";

const Login = () => {
  const { url, setToken, isBackendConnected } = useContext(AdminContext);
  const [data, setData] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);

  const onChangeHandler = (e) => setData((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    if (!isBackendConnected) {
      toast.info("No backend connected (VITE_API_URL is empty). Use Preview Mode to view the interface.");
      return;
    }
    setLoading(true);
    try {
      const response = await axios.post(`${url}/api/admin/login`, data);
      if (response.data.success) {
        localStorage.setItem("adminToken", response.data.token);
        setToken(response.data.token);
      } else {
        toast.error(response.data.message);
      }
    } catch {
      toast.error("Login failed - backend unreachable");
    } finally {
      setLoading(false);
    }
  };

  const onPreviewHandler = () => {
    localStorage.setItem("adminToken", "demo_admin_preview");
    setToken("demo_admin_preview");
  };

  return (
    <div className="admin-login">
      <form className="admin-login-form" onSubmit={onSubmitHandler}>
        <h2>Super Admin Login</h2>
        <input type="email" name="email" placeholder="Email" value={data.email} onChange={onChangeHandler} required />
        <input type="password" name="password" placeholder="Password" value={data.password} onChange={onChangeHandler} required />
        <button type="submit" disabled={loading}>{loading ? "Logging in..." : "Login"}</button>
        <button
          type="button"
          onClick={onPreviewHandler}
          style={{
            marginTop: "12px",
            background: "#4b5563",
            color: "white",
            padding: "10px",
            border: "none",
            borderRadius: "6px",
            cursor: "pointer",
            fontSize: "14px",
            width: "100%",
          }}
        >
          Preview Admin Panel (Offline Mode)
        </button>
      </form>
    </div>
  );
};

export default Login;