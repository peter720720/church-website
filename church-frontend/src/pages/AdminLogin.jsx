import React, { useState } from "react";
import { motion } from "framer-motion";
import API from "../api/axios";
import { useNavigate } from "react-router-dom";
import { ShieldCheck, Lock, Mail } from "lucide-react";

const AdminLogin = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await API.post("/login", formData);
      
      // ✅ PROFESSIONAL CHECK: Verify the role sent from backend
      if (res.data.user.role === "admin") {
        localStorage.setItem("userRole", "admin");
        localStorage.setItem("isLoggedIn", "true");
        localStorage.setItem("userName", res.data.user.name);

        // ✅ FORCE REDIRECT: Uses {replace: true} to clear the history stack
        // This prevents the browser from accidentally bouncing back to /dashboard
        navigate("/admin", { replace: true }); 
      } else {
        setError("Access Denied: Restricted to Administrators only.");
      }
    } catch (err) {
      setError(err.response?.data?.message || "Invalid Admin Credentials");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={pageStyle}>
      <motion.div 
        initial={{ opacity: 0, y: -20 }} 
        animate={{ opacity: 1, y: 0 }} 
        style={cardStyle}
      >
        <div style={{ textAlign: 'center', marginBottom: '30px' }}>
          <ShieldCheck size={60} color="#eb8d1d" style={{ marginBottom: '10px' }} />
          <h2 style={{ color: 'white', letterSpacing: '2px', fontWeight: '800' }}>ADMIN PORTAL</h2>
          <p style={{ color: '#888', fontSize: '0.85rem' }}>Ecclesia Ministries Management</p>
        </div>

        {error && <div style={errorStyle}>{error}</div>}

        <form onSubmit={handleSubmit}>
          <div style={inputGroup}>
            <Mail size={18} color="#eb8d1d" style={iconStyle} />
            <input 
              type="email" 
              placeholder="Admin Email" 
              required 
              style={inputStyle}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })} 
            />
          </div>
          <div style={inputGroup}>
            <Lock size={18} color="#eb8d1d" style={iconStyle} />
            <input 
              type="password" 
              placeholder="Admin Password" 
              required 
              style={inputStyle}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })} 
            />
          </div>
          <button type="submit" disabled={loading} style={btnStyle}>
            {loading ? "Authenticating..." : "Login to Command Center"}
          </button>
        </form>
      </motion.div>
    </div>
  );
};

// --- STYLES ---
const pageStyle = { display: "flex", justifyContent: "center", alignItems: "center", height: "100vh", background: "#0f172a" };
const cardStyle = { background: "#1e293b", padding: "50px 40px", borderRadius: "20px", width: "100%", maxWidth: "400px", boxShadow: "0 20px 50px rgba(0,0,0,0.3)" };
const inputGroup = { position: 'relative', marginBottom: '20px' };
const iconStyle = { position: 'absolute', left: '15px', top: '15px' };
const inputStyle = { width: "100%", padding: "15px 15px 15px 45px", borderRadius: "10px", border: "1px solid #334155", background: "#0f172a", color: "white", outline: "none", fontSize: '1rem' };
const btnStyle = { width: "100%", padding: "15px", background: "#eb8d1d", color: "white", border: "none", borderRadius: "10px", fontWeight: "bold", cursor: "pointer", fontSize: '1.1rem', transition: '0.3s' };
const errorStyle = { background: '#7f1d1d', color: '#fecaca', padding: '12px', borderRadius: '8px', marginBottom: '20px', textAlign: 'center', fontSize: '0.9rem', border: '1px solid #991b1b' };

export default AdminLogin;
