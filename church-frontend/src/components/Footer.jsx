import React from 'react';
import { Link } from 'react-router-dom';
// Importing brand icons from your newly installed Tabler library
import { 
  IconBrandFacebook, 
  IconBrandInstagram, 
  IconBrandTwitter, 
  IconMail, 
  IconPhone, 
  IconMapPin 
} from '@tabler/icons-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer style={footerStyle}>
      <div style={footerContainer}>
        
        {/* --- BRAND SECTION --- */}
        <div style={sectionStyle}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '15px' }}>
            <img src="/logo.jpg" alt="Logo" style={footerLogo} />
            <span style={{ fontWeight: '800', fontSize: '1.2rem', letterSpacing: '1px' }}>ECCLESIA</span>
          </div>
          <p style={{ color: '#aaa', fontSize: '0.9rem', lineHeight: '1.6' }}>
            Touching lives, transforming communities, and spreading the light of faith across the world.
          </p>
        </div>

        {/* --- QUICK LINKS --- */}
        <div style={sectionStyle}>
          <h4 style={headingStyle}>Quick Links</h4>
          <ul style={listStyle}>
            <li><Link to="/" style={linkStyle}>Home</Link></li>
            <li><Link to="/signup" style={linkStyle}>Join Us</Link></li>
            <li><Link to="/login" style={linkStyle}>Member Login</Link></li>
            <li><Link to="/dashboard" style={linkStyle}>Dashboard</Link></li>
          </ul>
        </div>

        {/* --- CONTACT INFO --- */}
        <div style={sectionStyle}>
          <h4 style={headingStyle}>Contact Us</h4>
          <div style={contactItem}><IconMapPin size={20} color="#eb8d1d" /> <span>Main Sanctuary, Nigeria</span></div>
          <div style={contactItem}><IconPhone size={20} color="#eb8d1d" /> <span>+234 123 456 7890</span></div>
          <div style={contactItem}><IconMail size={20} color="#eb8d1d" /> <span>info@ecclesia.com</span></div>
        </div>

        {/* --- SOCIAL MEDIA (Now Fixed with Tabler) --- */}
        <div style={sectionStyle}>
          <h4 style={headingStyle}>Follow Us</h4>
          <div style={{ display: 'flex', gap: '15px', marginTop: '10px' }}>
            <IconBrandFacebook style={socialIcon} size={24} />
            <IconBrandInstagram style={socialIcon} size={24} />
            <IconBrandTwitter style={socialIcon} size={24} />
          </div>
        </div>

      </div>

      <div style={bottomBar}>
        <p>&copy; {currentYear} Ecclesia Faith Assembly. All Rights Reserved.</p>
      </div>
    </footer>
  );
};

// --- STYLES ---
const footerStyle = { background: '#111', color: 'white', paddingTop: '60px' };
const footerContainer = { 
  display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', 
  gap: '40px', padding: '0 5%', maxWidth: '1200px', margin: '0 auto' 
};
const sectionStyle = { marginBottom: '30px' };
const headingStyle = { color: '#eb8d1d', marginBottom: '20px', fontSize: '1.1rem', fontWeight: '700' };
const footerLogo = { height: '40px', width: '40px', borderRadius: '50%', border: '1px solid #eb8d1d', objectFit: 'cover' };
const listStyle = { listStyle: 'none', padding: 0 };
const linkStyle = { color: '#aaa', textDecoration: 'none', fontSize: '0.9rem', display: 'block', marginBottom: '10px' };
const contactItem = { display: 'flex', alignItems: 'center', gap: '10px', color: '#aaa', fontSize: '0.9rem', marginBottom: '12px' };
const socialIcon = { cursor: 'pointer', transition: '0.3s', color: '#aaa' };
const bottomBar = { 
  borderTop: '1px solid #222', marginTop: '40px', padding: '20px', 
  textAlign: 'center', color: '#666', fontSize: '0.8rem' 
};

export default Footer;
