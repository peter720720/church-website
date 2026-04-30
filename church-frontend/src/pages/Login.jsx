import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import API from "../api/axios";
import { useNavigate, Link } from "react-router-dom";
import { Mail, Lock, LogIn } from "lucide-react";

const Login = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  // --- 1. SMART REDIRECT LOGIC ---
  useEffect(() => {
    const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
    const userRole = localStorage.getItem("userRole");

    if (isLoggedIn) {
      // ✅ If logged in user is an Admin, send them to /admin
      if (userRole === "admin") {
        navigate("/admin", { replace: true });
      } else {
        // Regular members go to the member dashboard
        navigate("/dashboard", { replace: true });
      }
    }
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const res = await API.post("/login", formData);
      
      if (res.data.success) {
        // Store session data in LocalStorage
        localStorage.setItem("userRole", res.data.user.role);
        localStorage.setItem("userName", res.data.user.name);
        localStorage.setItem("isLoggedIn", "true");

        // --- 2. SMART LOGIN REDIRECT ---
        if (res.data.user.role === "admin") {
          navigate("/admin", { replace: true });
        } else {
          navigate("/dashboard", { replace: true });
        }
      }
    } catch (err) {
      setError(err.response?.data?.message || "Invalid email or password.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div style={pageContainer}>
      <motion.div 
        initial={{ opacity: 0, y: 30 }} 
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        style={formCard}
      >
        <div style={{ textAlign: "center", marginBottom: "30px" }}>
           <img src="/logo.jpg" alt="Ecclesia Logo" style={logoStyle} />
           <h2 style={{ margin: "15px 0 5px", color: "#333", fontSize: "1.8rem", fontWeight: "800" }}>
             Welcome <span style={{ color: "#eb8d1d" }}>Back</span>
           </h2>
           <p style={{ color: "#777", fontSize: "0.95rem" }}>Sign in to access the member area</p>
        </div>

        {error && <div style={errorBadge}>{error}</div>}
        
        <form onSubmit={handleSubmit}>
          <div style={inputGroup}>
            <Mail size={20} style={iconStyle} />
            <input 
              type="email" placeholder="Email Address" required style={inputStyle}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })} 
            />
          </div>

          <div style={inputGroup}>
            <Lock size={20} style={iconStyle} />
            <input 
              type="password" placeholder="Password" required style={inputStyle}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })} 
            />
          </div>

          <div style={{ textAlign: "right", marginBottom: "25px" }}>
            <Link to="/forgot-password" style={{ color: "#888", fontSize: "0.85rem", textDecoration: "none" }}>
              Forgot Password?
            </Link>
          </div>

          <button type="submit" disabled={isLoading} style={btnStyle}>
            <LogIn size={20} style={{ marginRight: '10px' }} />
            {isLoading ? "Signing in..." : "Login"}
          </button>
        </form>

        <p style={{ textAlign: "center", marginTop: "25px", color: "#555", fontSize: "0.95rem" }}>
          New here? <Link to="/signup" style={{ color: "#eb8d1d", fontWeight: "700", textDecoration: "none" }}>Join Ecclesia</Link>
        </p>
      </motion.div>
    </div>
  );
};

// --- STYLES ---
const pageContainer = {
  display: "flex", justifyContent: "center", alignItems: "center",
  minHeight: "90vh", background: "#f8fafc", padding: "20px"
};

const formCard = {
  background: "#ffffff", padding: "45px 40px", borderRadius: "24px",
  boxShadow: "0 20px 40px rgba(0,0,0,0.08)", width: "100%", maxWidth: "420px"
};

const logoStyle = { height: "75px", width: "75px", borderRadius: "50%", border: "3px solid #eb8d1d", objectFit: "cover" };

const inputGroup = { position: "relative", marginBottom: "20px", display: "flex", alignItems: "center" };

const iconStyle = { position: "absolute", left: "16px", color: "#eb8d1d" };

const inputStyle = {
  width: "100%", padding: "14px 16px 14px 48px", borderRadius: "12px",
  border: "1.5px solid #eee", fontSize: "1rem", outline: "none", backgroundColor: "#fdfdfd"
};

const btnStyle = {
  width: "100%", padding: "15px", background: "#eb8d1d", color: "white",
  border: "none", borderRadius: "12px", fontWeight: "bold", fontSize: "1.1rem",
  cursor: "pointer", display: "flex", justifyContent: "center", alignItems: "center",
  boxShadow: "0 8px 20px rgba(235, 141, 29, 0.25)"
};

const errorBadge = {
  background: "#fff1f1", color: "#e53e3e", padding: "12px", 
  borderRadius: "10px", marginBottom: "25px", textAlign: "center", fontSize: "0.9rem", border: "1px solid #fed7d7"
};

export default Login;
