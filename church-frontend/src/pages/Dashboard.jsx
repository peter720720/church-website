import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, PlayCircle, Heart, MessageSquare, BookOpen, CreditCard } from 'lucide-react';
import { Link } from 'react-router-dom';

const Dashboard = () => {
  // We'll replace this with real data from your login later
  const memberName = "Brother Peter"; 

  return (
    <div style={containerStyle}>
      <motion.div 
        initial={{ opacity: 0, y: 20 }} 
        animate={{ opacity: 1, y: 0 }}
        style={welcomeSection}
      >
        <h1>Welcome Back, <span style={{ color: '#eb8d1d' }}>{memberName}</span></h1>
        <p>We are glad to have you with us today. May you be blessed.</p>
      </motion.div>

      {/* --- QUICK ACTION CARDS --- */}
      <div style={gridStyle}>
        <DashboardCard icon={<CreditCard color="#eb8d1d" />} title="Give Tithe/Offering" link="/give" />
        <DashboardCard icon={<PlayCircle color="#eb8d1d" />} title="Watch Latest Sermon" link="/sermons" />
        <DashboardCard icon={<Calendar color="#eb8d1d" />} title="Upcoming Events" link="/events" />
        <DashboardCard icon={<MessageSquare color="#eb8d1d" />} title="Prayer Requests" link="/prayer" />
        <DashboardCard icon={<BookOpen color="#eb8d1d" />} title="Bible Study Plans" link="/study" />
        <DashboardCard icon={<Heart color="#eb8d1d" />} title="Join a Ministry" link="/ministries" />
      </div>

      {/* --- FEATURED SECTION --- */}
      <div style={featuredSection}>
        <div style={featuredCard}>
          <h3>Latest Announcement</h3>
          <p>Join us this Friday for our Special Night of Grace at the Main Sanctuary.</p>
          <button style={smallBtnStyle}>Read More</button>
        </div>
      </div>
    </div>
  );
};

// Reusable Card Component
const DashboardCard = ({ icon, title, link }) => (
  <Link to={link} style={{ textDecoration: 'none' }}>
    <motion.div 
      whileHover={{ y: -5, boxShadow: "0 10px 20px rgba(0,0,0,0.1)" }}
      style={cardStyle}
    >
      <div style={{ marginBottom: '15px' }}>{icon}</div>
      <h3 style={{ fontSize: '1rem', color: '#333' }}>{title}</h3>
    </motion.div>
  </Link>
);

// --- STYLES ---
const containerStyle = { padding: '40px 5%', background: '#f8fafc', minHeight: '100vh' };
const welcomeSection = { marginBottom: '40px', textAlign: 'center' };
const gridStyle = { 
  display: 'grid', 
  gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', 
  gap: '20px', 
  marginBottom: '40px' 
};
const cardStyle = { 
  background: 'white', padding: '30px', borderRadius: '15px', 
  textAlign: 'center', boxShadow: '0 4px 6px rgba(0,0,0,0.05)', transition: '0.3s' 
};
const featuredSection = { display: 'flex', gap: '20px', flexWrap: 'wrap' };
const featuredCard = { 
  flex: 1, background: '#1a1a1a', color: 'white', 
  padding: '30px', borderRadius: '15px', minWidth: '300px' 
};
const smallBtnStyle = { 
  background: '#eb8d1d', color: 'white', border: 'none', 
  padding: '10px 20px', borderRadius: '5px', marginTop: '15px', cursor: 'pointer' 
};

export default Dashboard;
