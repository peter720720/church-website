import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Menu, X, LogOut } from "lucide-react"; 
import { motion, AnimatePresence } from "framer-motion";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  
  // Check Login Status 
  const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";

  const handleLogout = () => {
    localStorage.clear(); 
    setIsOpen(false);
    navigate("/login");
  };

  return (
    <nav style={navStyle}>
      <div style={containerStyle}>
        {/* Brand Section */}
        <Link to="/" style={logoGroup}>
          <img src="/logo.jpg" alt="Logo" style={logoImg} />
          <span style={brandText}>Ecclesia</span>
        </Link>

        {/* Desktop Menu */}
        <div className="desktop-menu" style={{ display: 'flex', alignItems: 'center', gap: '30px' }}>
          <Link to="/" style={linkStyle}>Home</Link>
          
          {isLoggedIn ? (
            <>
              <Link to="/dashboard" style={linkStyle}>Dashboard</Link>
              
              {/* ✅ Admin link is REMOVED from here to keep it separate/secret */}

              <button onClick={handleLogout} style={logoutBtnStyle}>
                <LogOut size={18} /> Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" style={linkStyle}>Login</Link>
              <Link to="/signup" style={joinBtnStyle}>Join Us</Link>
            </>
          )}
        </div>

        {/* Mobile Toggle */}
        <div className="mobile-toggle" onClick={() => setIsOpen(!isOpen)} style={{ display: 'none', cursor: 'pointer' }}>
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </div>
      </div>

      {/* Animated Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div initial={{ height: 0 }} animate={{ height: 'auto' }} exit={{ height: 0 }} style={mobileMenuContainer}>
            <div style={{ padding: '20px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <Link to="/" onClick={() => setIsOpen(false)} style={linkStyle}>Home</Link>
              {isLoggedIn ? (
                <>
                  <Link to="/dashboard" onClick={() => setIsOpen(false)} style={linkStyle}>Dashboard</Link>
                  <button onClick={handleLogout} style={logoutBtnStyle}>Logout</button>
                </>
              ) : (
                <>
                  <Link to="/login" onClick={() => setIsOpen(false)} style={linkStyle}>Login</Link>
                  <Link to="/signup" onClick={() => setIsOpen(false)} style={joinBtnStyle}>Join Us</Link>
                </>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`@media (max-width: 850px) { .desktop-menu { display: none !important; } .mobile-toggle { display: block !important; } }`}</style>
    </nav>
  );
};

// --- STYLES ---
const navStyle = { background: '#fff', boxShadow: '0 2px 10px rgba(0,0,0,0.1)', position: 'sticky', top: 0, zIndex: 1000 };
const containerStyle = { display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0.8rem 5%', maxWidth: '1400px', margin: '0 auto' };
const logoGroup = { display: 'flex', alignItems: 'center', gap: '10px', textDecoration: 'none' };
const logoImg = { height: '45px', width: '45px', borderRadius: '50%', border: '2px solid #eb8d1d', objectFit: 'cover' };
const brandText = { color: '#1a1a1a', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '1px' };
const linkStyle = { color: '#444', textDecoration: 'none', fontWeight: '600', fontSize: '0.95rem' };
const joinBtnStyle = { background: '#eb8d1d', color: '#fff', padding: '10px 20px', borderRadius: '6px', textDecoration: 'none', fontWeight: 'bold' };
const logoutBtnStyle = { background: 'none', border: '1px solid #ff4d4d', color: '#ff4d4d', padding: '8px 15px', borderRadius: '6px', fontWeight: 'bold', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px' };
const mobileMenuContainer = { background: '#fff', borderTop: '1px solid #eee', overflow: 'hidden' };

export default Navbar;
