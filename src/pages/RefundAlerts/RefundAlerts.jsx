import React, { useContext, useEffect, useState } from "react";
import "./RefundAlerts.css";
import axios from "axios";
import { toast } from "react-toastify";
import { AdminContext } from "../../context/AdminContext.jsx";

const RefundAlerts = () => {
  const { url, authHeader, isBackendConnected } = useContext(AdminContext);
  const [alerts, setAlerts] = useState([]);

  const fetchAlerts = async () => {
    if (!url) return;
    try {
      const response = await axios.get(`${url}/api/admin/refund-alerts`, authHeader());
      if (response.data.success) setAlerts(response.data.data || []);
    } catch {
      toast.error("Failed to load refund alerts");
    }
  };

  const resolve = async (alertId) => {
    if (!url) {
      toast.info("Backend is not connected.");
      return;
    }
    try {
      const response = await axios.post(`${url}/api/admin/refund-alerts/resolve`, { alertId }, authHeader());
      if (response.data.success) {
        toast.success("Alert resolved");
        fetchAlerts();
      }
    } catch {
      toast.error("Failed to resolve alert");
    }
  };

  useEffect(() => {
    if (!url) return;
    fetchAlerts();
    const interval = setInterval(fetchAlerts, 10000);
    return () => clearInterval(interval);
  }, [url]);

  return (
    <div className="refund-alerts-page">
      <h2>Refund Failure Alerts</h2>
      {!isBackendConnected && (
        <p style={{ fontSize: "13px", color: "#6b7280", margin: "10px 0 20px" }}>
          ⚠️ وضع المعاينة: الخادم مفصول. لعرض البيانات الحية، قم بضبط متغير VITE_API_URL.
        </p>
      )}
      <div className="alert-table">
        {alerts.map((alert) => (
          <div key={alert._id} className="alert-row">
            <div className="alert-info">
              <p>{alert.message}</p>
              <span>Order #{alert.orderId?._id} · ₹{(alert.orderId?.amount || 0).toFixed(2)}</span>
              <span>Retry count: {alert.orderId?.refundRetryCount}</span>
              {alert.orderId?.refundNeedsManualReview && <span className="manual-review">Needs manual review</span>}
            </div>
            <button className="resolve-btn" onClick={() => resolve(alert._id)}>Mark Resolved</button>
          </div>
        ))}
        {alerts.length === 0 && <p className="empty-state">No unresolved refund alerts</p>}
      </div>
    </div>
  );
};

export default RefundAlerts;