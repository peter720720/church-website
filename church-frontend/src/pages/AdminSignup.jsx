import React, { useState } from "react";
import { motion } from "framer-motion";
import API from "../api/axios";
import { useNavigate, Link } from "react-router-dom";
import { ShieldCheck, Mail, Lock, User, Phone } from "lucide-react";

const AdminSignup = () => {
  const [formData, setFormData] = useState({ name: "", email: "", password: "", phoneNumber: "", role: "admin" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      // ✅ We send the role: "admin" directly to the signup endpoint
      const res = await API.post("/signup", formData);
      if (res.data.success) {
        navigate("/admin-portal"); // Go to admin login after signup
      }
    } catch (err) {
      setError(err.response?.data?.message || "Admin registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={pageStyle}>
      <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} style={cardStyle}>
        <div style={{ textAlign: 'center', marginBottom: '30px' }}>
          <ShieldCheck size={50} color="#eb8d1d" />
          <h2 style={{ color: 'white', marginTop: '10px' }}>Admin Registration</h2>
          <p style={{ color: '#888', fontSize: '0.8rem' }}>Create a new administrator account</p>
        </div>

        {error && <div style={errorBadge}>{error}</div>}

        <form onSubmit={handleSubmit}>
          <div style={inputGroup}><User size={18} color="#eb8d1d" style={iconStyle} /><input type="text" placeholder="Full Name" required style={inputStyle} onChange={(e) => setFormData({...formData, name: e.target.value})} /></div>
          <div style={inputGroup}><Mail size={18} color="#eb8d1d" style={iconStyle} /><input type="email" placeholder="Admin Email" required style={inputStyle} onChange={(e) => setFormData({...formData, email: e.target.value})} /></div>
          <div style={inputGroup}><Phone size={18} color="#eb8d1d" style={iconStyle} /><input type="text" placeholder="Phone Number" required style={inputStyle} onChange={(e) => setFormData({...formData, phoneNumber: e.target.value})} /></div>
          <div style={inputGroup}><Lock size={18} color="#eb8d1d" style={iconStyle} /><input type="password" placeholder="Secure Password" required style={inputStyle} onChange={(e) => setFormData({...formData, password: e.target.value})} /></div>
          
          <button type="submit" disabled={loading} style={btnStyle}>
            {loading ? "Registering..." : "Create Admin Account"}
          </button>
        </form>

        <p style={{ textAlign: 'center', marginTop: '20px', color: '#888' }}>
          Already have an account? <Link to="/admin-portal" style={{ color: '#eb8d1d', textDecoration: 'none' }}>Login here</Link>
        </p>
      </motion.div>
    </div>
  );
};

// --- STYLES ---
const pageStyle = { display: "flex", justifyContent: "center", alignItems: "center", height: "100vh", background: "#0f172a" };
const cardStyle = { background: "#1e293b", padding: "40px", borderRadius: "20px", width: "100%", maxWidth: "400px", boxShadow: "0 20px 40px rgba(0,0,0,0.3)" };
const inputGroup = { position: 'relative', marginBottom: '15px' };
const iconStyle = { position: 'absolute', left: '15px', top: '15px' };
const inputStyle = { width: "100%", padding: "12px 12px 12px 45px", borderRadius: "8px", border: "1px solid #334155", background: "#0f172a", color: "white", outline: "none" };
const btnStyle = { width: "100%", padding: "15px", background: "#eb8d1d", color: "white", border: "none", borderRadius: "8px", fontWeight: "bold", cursor: "pointer" };
const errorBadge = { background: '#451a1a', color: '#fca5a5', padding: '10px', borderRadius: '8px', marginBottom: '15px', textAlign: 'center', fontSize: '0.8rem' };

export default AdminSignup;
