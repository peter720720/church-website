// import React, { useState, useEffect } from 'react';
// import AdminSidebar from '../components/AdminSidebar'; // ✅ Corrected path
// import { Users, DollarSign, Calendar, TrendingUp } from 'lucide-react';
// import API from '../api/axios';

// const AdminDashboard = () => {
//   const [stats, setStats] = useState({ totalMembers: 0, newMembers: 0 });

//   useEffect(() => {
//     const fetchAdminData = async () => {
//       try {
//         const res = await API.get("/admin/members");
//         setStats({
//           totalMembers: res.data.count,
//           newMembers: res.data.members.filter(m => 
//             new Date(m.createdAt) > new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)
//           ).length
//         });
//       } catch (err) {
//         console.error("Error fetching admin stats", err);
//       }
//     };
//     fetchAdminData();
//   }, []);

//   return (
//     <div style={{ display: 'flex', minHeight: '100vh', background: '#f0f2f5' }}>
//       {/* Sidebar stays on the left */}
//       <AdminSidebar />

//       {/* Main Stats Area */}
//       <div style={{ flex: 1, marginLeft: '260px', padding: '40px' }}>
//         <header style={{ marginBottom: '30px' }}>
//           <h1 style={{ fontSize: '1.8rem', color: '#1a1a1a', fontWeight: '800' }}>
//             Church <span style={{ color: '#eb8d1d' }}>Management</span>
//           </h1>
//           <p style={{ color: '#666' }}>Welcome to the Ecclesia Administration Portal</p>
//         </header>

//         {/* Statistics Cards */}
//         <div style={statsGrid}>
//           <StatCard icon={<Users color="#4e73df" />} label="Total Members" value={stats.totalMembers} />
//           <StatCard icon={<TrendingUp color="#1cc88a" />} label="New (This Week)" value={stats.newMembers} />
//           <StatCard icon={<DollarSign color="#f6c23e" />} label="Monthly Tithes" value="₦0.00" />
//           <StatCard icon={<Calendar color="#e74a3b" />} label="Upcoming Events" value="0" />
//         </div>

//         {/* Action Center */}
//         <div style={actionCard}>
//           <h3 style={{ marginBottom: '20px' }}>Admin Quick Tasks</h3>
//           <div style={{ display: 'flex', gap: '15px', flexWrap: 'wrap' }}>
//             <button style={btnStyle}>Add New Event</button>
//             <button style={btnStyle}>Send Announcement</button>
//             <button style={{ ...btnStyle, background: '#333' }}>Export Member List</button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// // Sub-component for clean code
// const StatCard = ({ icon, label, value }) => (
//   <div style={cardStyle}>
//     <div>
//       <p style={{ fontSize: '0.85rem', color: '#888', fontWeight: 'bold', marginBottom: '5px', textTransform: 'uppercase' }}>{label}</p>
//       <h2 style={{ margin: 0, fontSize: '1.6rem' }}>{value}</h2>
//     </div>
//     <div style={{ background: '#f8f9fc', padding: '12px', borderRadius: '10px' }}>{icon}</div>
//   </div>
// );

// // --- STYLES ---
// const statsGrid = { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '25px' };
// const cardStyle = { background: 'white', padding: '25px', borderRadius: '15px', boxShadow: '0 4px 12px rgba(0,0,0,0.05)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' };
// const actionCard = { marginTop: '40px', background: 'white', padding: '30px', borderRadius: '15px', boxShadow: '0 4px 12px rgba(0,0,0,0.05)' };
// const btnStyle = { background: '#eb8d1d', color: 'white', border: 'none', padding: '12px 25px', borderRadius: '8px', fontWeight: 'bold', cursor: 'pointer', transition: '0.3s' };

// export default AdminDashboard;

import React, { useState, useEffect } from 'react';
import AdminSidebar from '../components/AdminSidebar';
import { Users, DollarSign, Calendar, TrendingUp } from 'lucide-react';
import API from '../api/axios';

const AdminDashboard = () => {
  const [total, setTotal] = useState(0);

  useEffect(() => {
    const fetchTotal = async () => {
      try {
        const res = await API.get("/admin/members");
        if (res.data.success) setTotal(res.data.count);
      } catch (err) { console.error(err); }
    };
    fetchTotal();
  }, []);

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: '#f0f2f5' }}>
      <AdminSidebar />
      <div style={{ flex: 1, marginLeft: '260px', padding: '40px' }}>
        <h1 style={{ fontSize: '1.8rem', fontWeight: '800', marginBottom: '30px' }}>
          Ecclesia <span style={{ color: '#eb8d1d' }}>Insights</span>
        </h1>

        <div style={statsGrid}>
          <StatCard icon={<Users color="#4e73df" />} label="Total Members" value={total} />
          <StatCard icon={<TrendingUp color="#1cc88a" />} label="Weekly Growth" value="+0" />
          <StatCard icon={<DollarSign color="#f6c23e" />} label="Monthly Tithes" value="₦0.00" />
          <StatCard icon={<Calendar color="#e74a3b" />} label="Upcoming Events" value="0" />
        </div>

        <div style={actionCard}>
          <h3>Quick Actions</h3>
          <p style={{ color: '#666', marginBottom: '20px' }}>Manage the church daily operations from here.</p>
          <div style={{ display: 'flex', gap: '15px' }}>
             <button style={btnStyle}>Add Event</button>
             <button style={{ ...btnStyle, background: '#111' }}>Send Bulk Email</button>
          </div>
        </div>
      </div>
    </div>
  );
};

const StatCard = ({ icon, label, value }) => (
  <div style={cardStyle}>
    <div>
      <p style={{ fontSize: '0.8rem', color: '#888', fontWeight: 'bold', textTransform: 'uppercase' }}>{label}</p>
      <h2 style={{ margin: '5px 0' }}>{value}</h2>
    </div>
    <div style={{ background: '#f8f9fc', padding: '12px', borderRadius: '12px' }}>{icon}</div>
  </div>
);

const statsGrid = { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '25px' };
const cardStyle = { background: 'white', padding: '25px', borderRadius: '15px', boxShadow: '0 4px 12px rgba(0,0,0,0.05)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' };
const actionCard = { marginTop: '40px', background: 'white', padding: '30px', borderRadius: '15px', boxShadow: '0 4px 12px rgba(0,0,0,0.05)' };
const btnStyle = { background: '#eb8d1d', color: 'white', border: 'none', padding: '12px 25px', borderRadius: '8px', fontWeight: 'bold', cursor: 'pointer' };

export default AdminDashboard;
