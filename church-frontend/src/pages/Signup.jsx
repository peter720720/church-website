import React, { useState } from "react";
import { motion } from "framer-motion";
import API from "../api/axios";
import { useNavigate, Link } from "react-router-dom";
import { User, Mail, Phone, Lock } from "lucide-react"; // Professional icons

const Signup = () => {
  const [formData, setFormData] = useState({ name: "", email: "", password: "", phoneNumber: "" });
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const res = await API.post("/signup", formData);
      if (res.data.success) {
        navigate("/login");
      }
    } catch (err) {
      setError(err.response?.data?.message || "Signup failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div style={pageContainer}>
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }} 
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        style={formCard}
      >
        <div style={{ textAlign: "center", marginBottom: "30px" }}>
           <img src="/logo.jpg" alt="Logo" style={logoStyle} />
           <h2 style={{ margin: "10px 0", color: "#333", fontSize: "1.8rem" }}>
             Join <span style={{ color: "#eb8d1d" }}>Ecclesia</span>
           </h2>
           <p style={{ color: "#666" }}>Create an account to stay connected</p>
        </div>

        {error && <div style={errorBadge}>{error}</div>}
        
        <form onSubmit={handleSubmit}>
          <div style={inputGroup}>
            <User size={20} style={iconStyle} />
            <input 
              type="text" placeholder="Full Name" required style={inputStyle}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })} 
            />
          </div>

          <div style={inputGroup}>
            <Mail size={20} style={iconStyle} />
            <input 
              type="email" placeholder="Email Address" required style={inputStyle}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })} 
            />
          </div>

          <div style={inputGroup}>
            <Phone size={20} style={iconStyle} />
            <input 
              type="text" placeholder="Phone Number" required style={inputStyle}
              onChange={(e) => setFormData({ ...formData, phoneNumber: e.target.value })} 
            />
          </div>

          <div style={inputGroup}>
            <Lock size={20} style={iconStyle} />
            <input 
              type="password" placeholder="Password" required style={inputStyle}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })} 
            />
          </div>

          <button type="submit" disabled={isLoading} style={btnStyle}>
            {isLoading ? "Creating Account..." : "Create Account"}
          </button>
        </form>

        <p style={{ textAlign: "center", marginTop: "20px", color: "#555" }}>
          Already a member? <Link to="/login" style={{ color: "#eb8d1d", fontWeight: "bold", textDecoration: "none" }}>Login here</Link>
        </p>
      </motion.div>
    </div>
  );
};

// --- PROFESSIONAL STYLES ---
const pageContainer = {
  display: "flex", justifyContent: "center", alignItems: "center",
  minHeight: "100vh", background: "#f4f7f6", padding: "20px"
};

const formCard = {
  background: "white", padding: "40px", borderRadius: "20px",
  boxShadow: "0 15px 35px rgba(0,0,0,0.1)", width: "100%", maxWidth: "450px"
};

const logoStyle = { height: "70px", width: "70px", borderRadius: "50%", border: "3px solid #eb8d1d", objectFit: "cover" };

const inputGroup = {
  position: "relative", marginBottom: "20px", display: "flex", alignItems: "center"
};

const iconStyle = { position: "absolute", left: "15px", color: "#eb8d1d" };

const inputStyle = {
  width: "100%", padding: "14px 14px 14px 45px", borderRadius: "10px",
  border: "1px solid #ddd", fontSize: "1rem", outline: "none", transition: "0.3s",
  backgroundColor: "#fafafa"
};

const btnStyle = {
  width: "100%", padding: "14px", background: "#eb8d1d", color: "white",
  border: "none", borderRadius: "10px", fontWeight: "bold", fontSize: "1.1rem",
  cursor: "pointer", transition: "0.3s", boxShadow: "0 5px 15px rgba(235, 141, 29, 0.3)"
};

const errorBadge = {
  background: "#ffebee", color: "#c62828", padding: "10px", 
  borderRadius: "8px", marginBottom: "20px", textAlign: "center", fontSize: "0.9rem"
};

export default Signup;
