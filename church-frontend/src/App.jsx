import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "./components/Navbar"; 
import Home from "./pages/Home";
import Auth from "./pages/ForgotPassword"; // Unified Auth Page (Login, Signup, Reset)
import Dashboard from "./pages/Dashboard"; 
import AdminDashboard from "./pages/AdminDashboard";
import ManageMembers from "./pages/ManageMembers";
import Footer from "./components/Footer";
import AdminLogin from "./pages/AdminLogin";
import AdminSignup from "./pages/AdminSignup";

// --- LAYOUT MANAGER ---
const AppLayout = ({ children, loading }) => {
  const location = useLocation();
  
  // ✅ NAVBAR & FOOTER FIX: 
  // We removed '/dashboard' so they show for members.
  // We keep '/admin' here so the Admin Panel stays clean and full-screen.
  const isManagementPage = location.pathname.includes('/admin'); 

  return (
    <>
      {!loading && !isManagementPage && <Navbar />} 
      {children}
      {!loading && !isManagementPage && <Footer />} 
    </>
  );
};

function App() {
  const [loading, setLoading] = useState(true);
  
  // Verify Admin Status
  const userRole = localStorage.getItem("userRole");
  const isAdmin = userRole === "admin";

  useEffect(() => {
    // Initial Ecclesia Splash Screen (2.5 seconds)
    const timer = setTimeout(() => setLoading(false), 2500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <Router>
      <AnimatePresence mode="wait">
        {loading ? (
          /* --- GLOBAL SPLASH LOADER --- */
          <motion.div
            key="loader"
            exit={{ opacity: 0 }}
            style={loaderStyle}
          >
            <motion.img
              src="/logo.jpg"
              alt="Ecclesia Logo"
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ repeat: Infinity, duration: 1.5 }}
              style={loaderLogo}
            />
            <h2 style={{ marginTop: '20px', letterSpacing: '4px', fontWeight: '800' }}>ECCLESIA</h2>
          </motion.div>
        ) : (
          /* --- MAIN WEBSITE CONTENT --- */
          <motion.div key="main" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <AppLayout loading={loading}>
              <Routes>
                {/* Public Access */}
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Auth />} />
                <Route path="/signup" element={<Auth />} />
                <Route path="/forgot-password" element={<Auth />} />
                <Route path="/admin-portal" element={<AdminLogin />} />
                <Route path="/admin-register-secret" element={<AdminSignup />} />
                
                {/* Member Access (Navbar/Footer now visible here) */}
                <Route path="/dashboard" element={<Dashboard />} />

                {/* Restricted Admin Access (Navbar/Footer hidden) */}
                <Route 
                  path="/admin" 
                  element={isAdmin ? <AdminDashboard /> : <Navigate to="/login" />} 
                />
                <Route 
                  path="/admin/members" 
                  element={isAdmin ? <ManageMembers /> : <Navigate to="/login" />} 
                />

                {/* Catch-all Fallback */}
                <Route path="*" element={<Navigate to="/" />} />
              </Routes>
            </AppLayout>
          </motion.div>
        )}
      </AnimatePresence>
    </Router>
  );
}

// --- STYLES ---
const loaderStyle = {
  position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh',
  backgroundColor: '#fff', display: 'flex', flexDirection: 'column',
  alignItems: 'center', justifyContent: 'center', zIndex: 9999
};
const loaderLogo = { width: '120px', height: '120px', borderRadius: '50%', border: '4px solid #eb8d1d', objectFit: 'cover' };

export default App;
