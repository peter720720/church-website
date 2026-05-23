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
