import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api/axios.js";
import "../styles/ForgotPassword.css";

const ForgotPassword = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1); // Step 1: Email, Step 2: OTP, Step 3: Password
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  // Step 1: Send OTP to email
  const handleSendOtp = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setMessage("");

    if (!email) {
      setError("Please enter your email");
      setLoading(false);
      return;
    }

    try {
      const res = await API.post("/auth/forgot-password", { email });
      setMessage(res.data.message);
      setStep(2);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to send OTP");
    } finally {
      setLoading(false);
    }
  };

  // Step 2: Verify OTP and Reset Password
  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setMessage("");

    if (!otp) {
      setError("Please enter the OTP code");
      setLoading(false);
      return;
    }

    if (!newPassword || !confirmPassword) {
      setError("Please enter and confirm your new password");
      setLoading(false);
      return;
    }

    if (newPassword !== confirmPassword) {
      setError("Passwords do not match");
      setLoading(false);
      return;
    }

    if (newPassword.length < 6) {
      setError("Password must be at least 6 characters");
      setLoading(false);
      return;
    }

    try {
      const res = await API.post("/auth/verify-otp", {
        email,
        otp,
        newPassword,
      });
      setMessage(res.data.message);
      setTimeout(() => navigate("/login"), 2000);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to reset password");
    } finally {
      setLoading(false);
    }
  };

  const goBack = () => {
    setStep(1);
    setOtp("");
    setNewPassword("");
    setConfirmPassword("");
    setMessage("");
    setError("");
  };

  return (
    <div className="forgot-password-container">
      <div className="forgot-password-card">
        <h2>Reset Password</h2>

        {/* Step 1: Email Input */}
        {step === 1 && (
          <form onSubmit={handleSendOtp}>
            <div className="form-group">
              <label>Email Address</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                disabled={loading}
              />
            </div>

            {error && <p className="error-message">{error}</p>}
            {message && <p className="success-message">{message}</p>}

            <button type="submit" disabled={loading} className="btn-primary">
              {loading ? "Sending OTP..." : "Send OTP"}
            </button>

            <p className="back-link">
              <a href="/login">Back to Login</a>
            </p>
          </form>
        )}

        {/* Step 2: OTP & New Password */}
        {step === 2 && (
          <form onSubmit={handleVerifyOtp}>
            <p className="info-text">
              We've sent a code to <strong>{email}</strong>
            </p>

            <div className="form-group">
              <label>OTP Code</label>
              <input
                type="text"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                placeholder="Enter 6-digit OTP"
                maxLength="6"
                disabled={loading}
              />
            </div>

            <div className="form-group">
              <label>New Password</label>
              <input
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="Enter new password"
                disabled={loading}
              />
            </div>

            <div className="form-group">
              <label>Confirm Password</label>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Confirm new password"
                disabled={loading}
              />
            </div>

            {error && <p className="error-message">{error}</p>}
            {message && <p className="success-message">{message}</p>}

            <button type="submit" disabled={loading} className="btn-primary">
              {loading ? "Resetting..." : "Reset Password"}
            </button>

            <button
              type="button"
              onClick={goBack}
              disabled={loading}
              className="btn-secondary"
            >
              Go Back
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default ForgotPassword;
