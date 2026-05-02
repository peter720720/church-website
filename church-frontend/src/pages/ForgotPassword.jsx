import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import API from "../api/axios.js";
import { Mail, Lock, LogIn, User, Phone } from "lucide-react";
import "../styles/Auth.css";

const Auth = () => {
  const navigate = useNavigate();
  const [authMode, setAuthMode] = useState("login"); // "login", "signup", "reset"
  const [resetStep, setResetStep] = useState(1); // For reset password flow
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  // Login state
  const [loginData, setLoginData] = useState({ email: "", password: "" });

  // Signup state
  const [signupData, setSignupData] = useState({
    name: "",
    email: "",
    password: "",
    phoneNumber: "",
  });

  // Reset password state
  const [resetData, setResetData] = useState({
    email: "",
    otp: "",
    newPassword: "",
    confirmPassword: "",
  });

  // Redirect if already logged in
  useEffect(() => {
    const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
    const userRole = localStorage.getItem("userRole");
    if (isLoggedIn) {
      if (userRole === "admin") {
        navigate("/admin", { replace: true });
      } else {
        navigate("/dashboard", { replace: true });
      }
    }
  }, [navigate]);

  // --- LOGIN HANDLER ---
  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setMessage("");

    try {
      const res = await API.post("/auth/login", loginData);
      if (res.data.success) {
        localStorage.setItem("userRole", res.data.user.role);
        localStorage.setItem("userName", res.data.user.name);
        localStorage.setItem("isLoggedIn", "true");

        if (res.data.user.role === "admin") {
          navigate("/admin", { replace: true });
        } else {
          navigate("/dashboard", { replace: true });
        }
      }
    } catch (err) {
      setError(err.response?.data?.message || "Invalid email or password");
    } finally {
      setLoading(false);
    }
  };

  // --- SIGNUP HANDLER ---
  const handleSignup = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setMessage("");

    try {
      const res = await API.post("/auth/signup", signupData);
      if (res.data.success) {
        setMessage("Signup successful! You can now login.");
        setTimeout(() => {
          setAuthMode("login");
          setSignupData({ name: "", email: "", password: "", phoneNumber: "" });
          setMessage("");
        }, 1500);
      }
    } catch (err) {
      setError(err.response?.data?.message || "Signup failed");
    } finally {
      setLoading(false);
    }
  };

  // --- RESET PASSWORD STEP 1: SEND OTP ---
  const handleSendOtp = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setMessage("");

    if (!resetData.email) {
      setError("Please enter your email");
      setLoading(false);
      return;
    }

    try {
      const res = await API.post("/auth/forgot-password", {
        email: resetData.email,
      });
      setMessage(res.data.message);
      setResetStep(2);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to send OTP");
    } finally {
      setLoading(false);
    }
  };

  // --- RESET PASSWORD STEP 2: VERIFY OTP & RESET ---
  const handleResetPassword = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setMessage("");

    if (!resetData.otp) {
      setError("Please enter the OTP code");
      setLoading(false);
      return;
    }

    if (!resetData.newPassword || !resetData.confirmPassword) {
      setError("Please enter and confirm your new password");
      setLoading(false);
      return;
    }

    if (resetData.newPassword !== resetData.confirmPassword) {
      setError("Passwords do not match");
      setLoading(false);
      return;
    }

    if (resetData.newPassword.length < 6) {
      setError("Password must be at least 6 characters");
      setLoading(false);
      return;
    }

    try {
      const res = await API.post("/auth/verify-otp", {
        email: resetData.email,
        otp: resetData.otp,
        newPassword: resetData.newPassword,
      });
      setMessage(res.data.message);
      setTimeout(() => {
        setAuthMode("login");
        setResetStep(1);
        setResetData({ email: "", otp: "", newPassword: "", confirmPassword: "" });
        setMessage("");
      }, 2000);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to reset password");
    } finally {
      setLoading(false);
    }
  };

  const resetPasswordMode = () => {
    setResetStep(1);
    setResetData({ email: "", otp: "", newPassword: "", confirmPassword: "" });
    setError("");
    setMessage("");
    setAuthMode("reset");
  };

  const goBackReset = () => {
    setResetStep(1);
    setResetData({ ...resetData, otp: "", newPassword: "", confirmPassword: "" });
    setError("");
    setMessage("");
  };

  return (
    <div className="auth-container">
      <motion.div
        className="auth-card"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {/* Logo & Title */}
        <div className="auth-header">
          <img src="/logo.jpg" alt="Ecclesia Logo" className="auth-logo" />
          <h2>
            {authMode === "login" && (
              <>
                Welcome <span className="accent">Back</span>
              </>
            )}
            {authMode === "signup" && (
              <>
                Join <span className="accent">Ecclesia</span>
              </>
            )}
            {authMode === "reset" && <span>Reset Password</span>}
          </h2>
          <p>
            {authMode === "login" && "Sign in to access the member area"}
            {authMode === "signup" && "Create an account to stay connected"}
            {authMode === "reset" && "Recover your account"}
          </p>
        </div>

        {/* Tab Buttons */}
        <div className="auth-tabs">
          <button
            className={`tab-btn ${authMode === "login" ? "active" : ""}`}
            onClick={() => {
              setAuthMode("login");
              setError("");
              setMessage("");
            }}
          >
            Login
          </button>
          <button
            className={`tab-btn ${authMode === "signup" ? "active" : ""}`}
            onClick={() => {
              setAuthMode("signup");
              setError("");
              setMessage("");
            }}
          >
            Signup
          </button>
          <button
            className={`tab-btn ${authMode === "reset" ? "active" : ""}`}
            onClick={resetPasswordMode}
          >
            Reset
          </button>
        </div>

        {/* --- LOGIN FORM --- */}
        {authMode === "login" && (
          <form onSubmit={handleLogin} className="auth-form">
            {error && <div className="error-badge">{error}</div>}
            {message && <div className="success-badge">{message}</div>}

            <div className="input-group">
              <Mail size={20} className="input-icon" />
              <input
                type="email"
                placeholder="Email Address"
                required
                value={loginData.email}
                onChange={(e) =>
                  setLoginData({ ...loginData, email: e.target.value })
                }
                disabled={loading}
              />
            </div>

            <div className="input-group">
              <Lock size={20} className="input-icon" />
              <input
                type="password"
                placeholder="Password"
                required
                value={loginData.password}
                onChange={(e) =>
                  setLoginData({ ...loginData, password: e.target.value })
                }
                disabled={loading}
              />
            </div>

            <button type="submit" disabled={loading} className="btn-primary">
              <LogIn size={18} style={{ marginRight: "8px" }} />
              {loading ? "Signing in..." : "Login"}
            </button>
          </form>
        )}

        {/* --- SIGNUP FORM --- */}
        {authMode === "signup" && (
          <form onSubmit={handleSignup} className="auth-form">
            {error && <div className="error-badge">{error}</div>}
            {message && <div className="success-badge">{message}</div>}

            <div className="input-group">
              <User size={20} className="input-icon" />
              <input
                type="text"
                placeholder="Full Name"
                required
                value={signupData.name}
                onChange={(e) =>
                  setSignupData({ ...signupData, name: e.target.value })
                }
                disabled={loading}
              />
            </div>

            <div className="input-group">
              <Mail size={20} className="input-icon" />
              <input
                type="email"
                placeholder="Email Address"
                required
                value={signupData.email}
                onChange={(e) =>
                  setSignupData({ ...signupData, email: e.target.value })
                }
                disabled={loading}
              />
            </div>

            <div className="input-group">
              <Phone size={20} className="input-icon" />
              <input
                type="tel"
                placeholder="Phone Number"
                required
                value={signupData.phoneNumber}
                onChange={(e) =>
                  setSignupData({ ...signupData, phoneNumber: e.target.value })
                }
                disabled={loading}
              />
            </div>

            <div className="input-group">
              <Lock size={20} className="input-icon" />
              <input
                type="password"
                placeholder="Password"
                required
                value={signupData.password}
                onChange={(e) =>
                  setSignupData({ ...signupData, password: e.target.value })
                }
                disabled={loading}
              />
            </div>

            <button type="submit" disabled={loading} className="btn-primary">
              {loading ? "Creating account..." : "Join Ecclesia"}
            </button>
          </form>
        )}

        {/* --- RESET PASSWORD FORM (STEP 1) --- */}
        {authMode === "reset" && resetStep === 1 && (
          <form onSubmit={handleSendOtp} className="auth-form">
            {error && <div className="error-badge">{error}</div>}
            {message && <div className="success-badge">{message}</div>}

            <div className="input-group">
              <Mail size={20} className="input-icon" />
              <input
                type="email"
                placeholder="Enter your email"
                required
                value={resetData.email}
                onChange={(e) =>
                  setResetData({ ...resetData, email: e.target.value })
                }
                disabled={loading}
              />
            </div>

            <button type="submit" disabled={loading} className="btn-primary">
              {loading ? "Sending OTP..." : "Send OTP"}
            </button>
          </form>
        )}

        {/* --- RESET PASSWORD FORM (STEP 2) --- */}
        {authMode === "reset" && resetStep === 2 && (
          <form onSubmit={handleResetPassword} className="auth-form">
            <p className="info-text">
              We've sent a code to <strong>{resetData.email}</strong>
            </p>

            {error && <div className="error-badge">{error}</div>}
            {message && <div className="success-badge">{message}</div>}

            <div className="input-group">
              <input
                type="text"
                placeholder="Enter 6-digit OTP"
                maxLength="6"
                required
                value={resetData.otp}
                onChange={(e) =>
                  setResetData({ ...resetData, otp: e.target.value })
                }
                disabled={loading}
              />
            </div>

            <div className="input-group">
              <Lock size={20} className="input-icon" />
              <input
                type="password"
                placeholder="New password"
                required
                value={resetData.newPassword}
                onChange={(e) =>
                  setResetData({ ...resetData, newPassword: e.target.value })
                }
                disabled={loading}
              />
            </div>

            <div className="input-group">
              <Lock size={20} className="input-icon" />
              <input
                type="password"
                placeholder="Confirm password"
                required
                value={resetData.confirmPassword}
                onChange={(e) =>
                  setResetData({
                    ...resetData,
                    confirmPassword: e.target.value,
                  })
                }
                disabled={loading}
              />
            </div>

            <button type="submit" disabled={loading} className="btn-primary">
              {loading ? "Resetting..." : "Reset Password"}
            </button>

            <button
              type="button"
              onClick={goBackReset}
              disabled={loading}
              className="btn-secondary"
            >
              Go Back
            </button>
          </form>
        )}
      </motion.div>
    </div>
  );
};

export default Auth;
