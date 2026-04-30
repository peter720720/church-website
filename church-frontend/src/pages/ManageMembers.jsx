import React, { useState, useEffect } from 'react';
import AdminSidebar from '../components/AdminSidebar';
import { Search, Trash2, Mail, Phone, User as UserIcon } from 'lucide-react';
import API from '../api/axios';

const ManageMembers = () => {
  const [members, setMembers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchMembers();
  }, []);

  const fetchMembers = async () => {
    try {
      console.log("Attempting to fetch members...");
      const res = await API.get("/admin/members"); 
      
      // ✅ DEBUGGING: Press F12 in your browser to see this
      console.log("Full Response Object:", res);

      if (res.data && res.data.members) {
        console.log("Success! Found members:", res.data.members);
        setMembers(res.data.members);
      } else {
        console.warn("Data arrived, but 'members' key was missing:", res.data);
        // Fallback: if backend sent the array directly
        if(Array.isArray(res.data)) setMembers(res.data);
      }
    } catch (err) {
      // ✅ ERROR CHECKING: Check if it's 401 (Auth) or 404 (Path)
      console.error("API Call Failed:", err.response?.status, err.response?.data || err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Remove this member from church records?")) {
      try {
        await API.delete(`/admin/member/${id}`);
        setMembers(members.filter(m => m._id !== id));
      } catch (err) {
        alert("Operation failed. Ensure you have Admin privileges.");
      }
    }
  };

  const filteredMembers = members.filter(m => 
    m.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    m.email?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: '#f8fafc' }}>
      <AdminSidebar />
      <div style={{ marginLeft: '260px', padding: '40px', width: '100%' }}>
        
        <div style={headerLayout}>
          <h2 style={{ fontWeight: '800' }}>Manage <span style={{ color: '#eb8d1d' }}>Members</span></h2>
          <div style={searchBox}>
            <Search size={18} style={{ color: '#94a3b8' }} />
            <input 
              type="text" 
              placeholder="Search by name or email..." 
              style={searchInput}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        <div style={tableCard}>
          {loading ? (
            <div style={{ textAlign: 'center', padding: '40px' }}>
               <p>Connecting to Church Database...</p>
               <p style={{ fontSize: '0.8rem', color: '#888' }}>Check console (F12) if this takes too long.</p>
            </div>
          ) : members.length === 0 ? (
            <p style={{ textAlign: 'center', padding: '40px', color: '#888' }}>No members found in the congregation.</p>
          ) : (
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={tableHeader}>
                  <th style={thStyle}>Member Name</th>
                  <th style={thStyle}>Contact Details</th>
                  <th style={thStyle}>Role</th>
                  <th style={thStyle}>Joined</th>
                  <th style={thStyle}>Action</th>
                </tr>
              </thead>
              <tbody>
                {filteredMembers.map((member) => (
                  <tr key={member._id} style={trStyle}>
                    <td style={tdStyle}>
                       <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                          <div style={avatar}><UserIcon size={18} color="#888"/></div>
                          <span style={{ fontWeight: '700' }}>{member.name}</span>
                       </div>
                    </td>
                    <td style={tdStyle}>
                      <div style={infoText}><Mail size={14}/> {member.email}</div>
                      <div style={{...infoText, marginTop: '4px'}}><Phone size={14}/> {member.phoneNumber}</div>
                    </td>
                    <td style={tdStyle}>
                       <span style={{ 
                         ...badge, 
                         background: member.role === 'admin' ? '#eb8d1d' : '#f1f5f9', 
                         color: member.role === 'admin' ? '#fff' : '#475569' 
                       }}>
                         {member.role}
                       </span>
                    </td>
                    <td style={tdStyle}>{new Date(member.createdAt).toLocaleDateString()}</td>
                    <td style={tdStyle}>
                      <button onClick={() => handleDelete(member._id)} style={deleteBtn}><Trash2 size={18}/></button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
};

// --- STYLES ---
const headerLayout = { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' };
const searchBox = { display: 'flex', alignItems: 'center', gap: '10px', background: 'white', padding: '10px 15px', borderRadius: '10px', border: '1px solid #e2e8f0' };
const searchInput = { border: 'none', outline: 'none', fontSize: '0.9rem', width: '250px' };
const tableCard = { background: 'white', borderRadius: '16px', boxShadow: '0 4px 20px rgba(0,0,0,0.05)', overflow: 'hidden' };
const tableHeader = { background: '#f8fafc', textAlign: 'left', fontSize: '0.75rem', textTransform: 'uppercase' };
const thStyle = { padding: '20px', color: '#94a3b8', fontWeight: '800' };
const tdStyle = { padding: '20px', borderBottom: '1px solid #f1f5f9' };
const trStyle = { transition: '0.2s hover' };
const avatar = { width: '40px', height: '40px', borderRadius: '50%', background: '#f1f5f9', display: 'flex', alignItems: 'center', justifyContent: 'center' };
const infoText = { display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.85rem', color: '#64748b' };
const badge = { padding: '5px 12px', borderRadius: '30px', fontSize: '0.7rem', fontWeight: '900' };
const deleteBtn = { background: '#fee2e2', color: '#ef4444', border: 'none', padding: '10px', borderRadius: '10px', cursor: 'pointer' };

export default ManageMembers;
