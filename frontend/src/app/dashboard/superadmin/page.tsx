"use client";

import React, { useState, useEffect } from 'react';

export default function SuperadminDashboard() {
  const [users, setUsers] = useState<{ id: number, name: string, role: string, status: string, lastActive: string }[]>([]);

  useEffect(() => {
    // Mock user database loaded into state
    setUsers([
      { id: 1, name: 'Mayor Office', role: 'government', status: 'Online', lastActive: 'Just now' },
      { id: 2, name: 'Vibek Prasad', role: 'citizen', status: 'Online', lastActive: '2m ago' },
      { id: 3, name: 'Apple Watch - Vibek', role: 'wearable', status: 'Syncing', lastActive: 'Just now' },
      { id: 4, name: 'System Admin', role: 'superadmin', status: 'Online', lastActive: 'Just now' }
    ]);
  }, []);

  const handleDelete = (id: number) => {
    setUsers(users.filter(u => u.id !== id));
  };

  const handleCreate = () => {
    const roles = ['government', 'citizen', 'wearable'];
    const newRole = roles[Math.floor(Math.random() * roles.length)];
    const newUser = {
      id: Date.now(),
      name: `New ${newRole} user`,
      role: newRole,
      status: 'Offline',
      lastActive: 'Never'
    };
    setUsers([...users, newUser]);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <div className="glass-panel" style={{ padding: '24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h2>🔐 Superadmin God Mode</h2>
          <p style={{ color: 'var(--text-muted)' }}>Complete Platform Visibility & User Access Management</p>
        </div>
        <div style={{ textAlign: 'right' }}>
          <div style={{ fontSize: '2rem', fontWeight: 'bold', color: 'var(--primary)' }}>
            {users.length}
          </div>
          <div className="badge badge-primary">Total Active Sessions</div>
        </div>
      </div>

      <div className="dashboard-grid">
        <div className="glass-card" style={{ borderLeft: '4px solid var(--primary)' }}>
          <h3 style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '8px' }}>Active Gov Nodes</h3>
          <div style={{ fontSize: '2.5rem', fontWeight: 'bold' }}>{users.filter(u => u.role === 'government').length}</div>
        </div>
        <div className="glass-card" style={{ borderLeft: '4px solid var(--accent-green)' }}>
          <h3 style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '8px' }}>Active Citizen Apps</h3>
          <div style={{ fontSize: '2.5rem', fontWeight: 'bold' }}>{users.filter(u => u.role === 'citizen').length}</div>
        </div>
        <div className="glass-card" style={{ borderLeft: '4px solid #f97316' }}>
          <h3 style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '8px' }}>Active Wearables</h3>
          <div style={{ fontSize: '2.5rem', fontWeight: 'bold' }}>{users.filter(u => u.role === 'wearable').length}</div>
        </div>
      </div>

      <div className="glass-card">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
          <h3>Access Control & Session Management</h3>
          <button onClick={handleCreate} className="btn-primary" style={{ padding: '8px 16px', borderRadius: '6px' }}>+ Provision New User</button>
        </div>

        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
          <thead>
            <tr style={{ borderBottom: '1px solid var(--border-color)', color: 'var(--text-muted)' }}>
              <th style={{ padding: '12px' }}>User / Node Name</th>
              <th style={{ padding: '12px' }}>Assigned Role</th>
              <th style={{ padding: '12px' }}>Status</th>
              <th style={{ padding: '12px' }}>Last Active</th>
              <th style={{ padding: '12px', textAlign: 'right' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map(user => (
              <tr key={user.id} style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                <td style={{ padding: '16px 12px', fontWeight: 'bold' }}>{user.name}</td>
                <td style={{ padding: '16px 12px' }}>
                  <span className="badge" style={{ 
                    background: user.role === 'superadmin' ? 'rgba(255,255,255,0.1)' :
                                user.role === 'government' ? 'rgba(0, 210, 255, 0.1)' : 
                                user.role === 'citizen' ? 'rgba(16, 185, 129, 0.1)' : 'rgba(249, 115, 22, 0.1)',
                    color: user.role === 'superadmin' ? 'white' :
                           user.role === 'government' ? 'var(--primary)' : 
                           user.role === 'citizen' ? 'var(--accent-green)' : '#f97316',
                    border: '1px solid currentColor'
                  }}>
                    {user.role}
                  </span>
                </td>
                <td style={{ padding: '16px 12px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: user.status === 'Online' || user.status === 'Syncing' ? 'var(--accent-green)' : 'var(--text-muted)' }}></div>
                    {user.status}
                  </div>
                </td>
                <td style={{ padding: '16px 12px', color: 'var(--text-muted)' }}>{user.lastActive}</td>
                <td style={{ padding: '16px 12px', textAlign: 'right' }}>
                  <button onClick={() => handleDelete(user.id)} style={{ background: 'transparent', border: '1px solid #ef4444', color: '#ef4444', padding: '6px 12px', borderRadius: '4px', cursor: 'pointer' }}>
                    Revoke Access
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
    </div>
  );
}
