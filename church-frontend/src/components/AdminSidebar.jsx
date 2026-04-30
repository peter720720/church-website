import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Users, LayoutDashboard, CreditCard, Calendar, Settings, LogOut } from 'lucide-react';

const AdminSidebar = () => {
  const location = useLocation();

  // Helper to highlight the active link
  const isActive = (path) => location.pathname === path;

  return (
    <div style={sidebarStyle}>
      <div style={logoSection}>
        <img src="/logo.jpg" alt="Logo" style={logoStyle} />
        <h3 style={{ color: 'white', fontSize: '0.8rem', letterSpacing: '2px' }}>ECCLESIA ADMIN</h3>
      </div>

      <div style={linksContainer}>
        {/* Dashboard Home */}
        <Link to="/admin" style={isActive('/admin') ? activeLinkStyle : linkStyle}>
          <LayoutDashboard size={20} /> <span>Dashboard</span>
        </Link>

        {/* ✅ THE MANAGE MEMBERS LINK GOES HERE */}
        <Link to="/admin/members" style={isActive('/admin/members') ? activeLinkStyle : linkStyle}>
          <Users size={20} /> <span>Manage Members</span>
        </Link>

        {/* Other Admin Tools */}
        <Link to="/admin/finances" style={linkStyle}>
          <CreditCard size={20} /> <span>Tithes & Giving</span>
        </Link>
        <Link to="/admin/events" style={linkStyle}>
          <Calendar size={20} /> <span>Church Events</span>
        </Link>
        <Link to="/admin/settings" style={linkStyle}>
          <Settings size={20} /> <span>Settings</span>
        </Link>
      </div>

      {/* Logout at the bottom */}
      <button style={logoutBtn} onClick={() => { localStorage.clear(); window.location.href="/login"; }}>
        <LogOut size={20} /> Logout
      </button>
    </div>
  );
};

// --- STYLES ---
const sidebarStyle = { width: '260px', height: '100vh', background: '#111', position: 'fixed', display: 'flex', flexDirection: 'column', zIndex: 100 };
const logoSection = { padding: '40px 20px', textAlign: 'center', borderBottom: '1px solid #222' };
const logoStyle = { height: '60px', width: '60px', borderRadius: '50%', marginBottom: '10px', border: '2px solid #eb8d1d', objectFit: 'cover' };
const linksContainer = { padding: '20px', flex: 1 };

const linkStyle = { 
  display: 'flex', alignItems: 'center', gap: '15px', color: '#888', 
  textDecoration: 'none', padding: '12px 15px', borderRadius: '8px', marginBottom: '8px', transition: '0.3s' 
};

const activeLinkStyle = { 
  ...linkStyle, color: 'white', background: '#eb8d1d' // Highlighted orange when active
};

const logoutBtn = { 
  background: 'none', border: 'none', color: '#ff4d4d', padding: '30px', 
  cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '10px', fontWeight: 'bold' 
};

export default AdminSidebar;
