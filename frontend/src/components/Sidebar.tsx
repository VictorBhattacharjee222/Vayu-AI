"use client";

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';

export default function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const [role, setRole] = useState<string | null>(null);

  useEffect(() => {
    setRole(localStorage.getItem('userRole'));
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('userRole');
    router.push('/login');
  };

  const allNavItems = [
    { name: 'Gov (Classic)', path: '/dashboard/government', icon: '🏛', allowed: ['government', 'superadmin'] },
    { name: 'Gov (Modern)', path: '/dashboard/government-modern', icon: '📈', allowed: ['government', 'superadmin'] },
    { name: 'Citizen', path: '/dashboard/citizen', icon: '👤', allowed: ['citizen', 'superadmin'] },
    { name: 'Wearables', path: '/dashboard/wearable', icon: '⌚️', allowed: ['wearable', 'superadmin'] },
    { name: 'AI Learning Engine', path: '/dashboard/learning', icon: '🟡', allowed: ['superadmin'] },
    { name: 'Environmental Agent', path: '/dashboard/analytics', icon: '📊', allowed: ['government', 'superadmin'] },
    { name: 'Superadmin View', path: '/dashboard/superadmin', icon: '🔐', allowed: ['superadmin'] }
  ];

  // Filter items based on role
  const navItems = allNavItems.filter(item => role && item.allowed.includes(role));

  return (
    <nav className="glass-panel" style={{ width: '250px', margin: '16px', padding: '24px', display: 'flex', flexDirection: 'column' }}>
      <div style={{ marginBottom: '40px' }}>
        <h1 className="gradient-text" style={{ fontSize: '1.5rem', marginBottom: '8px' }}>VAYU AI</h1>
        <div className="badge badge-primary">Platform v1.0</div>
        
        {role && (
          <div style={{ marginTop: '16px', fontSize: '0.85rem', color: 'var(--text-muted)' }}>
            Logged in as: <strong style={{ color: 'var(--text-main)', textTransform: 'capitalize' }}>{role}</strong>
          </div>
        )}
      </div>
      
      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        {navItems.map((item) => {
          const isActive = pathname === item.path;
          return (
            <Link 
              key={item.path} 
              href={item.path} 
              className="nav-link"
              style={{ 
                padding: '12px', 
                borderRadius: '8px', 
                display: 'flex', 
                alignItems: 'center', 
                gap: '12px',
                background: isActive ? 'rgba(0, 210, 255, 0.15)' : 'transparent',
                color: isActive ? 'var(--text-main)' : 'var(--text-muted)',
                border: isActive ? '1px solid rgba(0, 210, 255, 0.3)' : '1px solid transparent',
                fontWeight: isActive ? 'bold' : 'normal'
              }}
            >
              <span style={{ fontSize: '1.2rem' }}>{item.icon}</span> {item.name}
            </Link>
          );
        })}
      </div>

      <div style={{ marginTop: 'auto', paddingTop: '24px', borderTop: '1px solid var(--border-color)', display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>AI Orchestrator: <span style={{color: 'var(--accent-green)'}}>Online</span></div>
        <button onClick={handleLogout} className="btn-primary" style={{ padding: '8px 12px', fontSize: '0.9rem', width: '100%', background: 'rgba(239, 68, 68, 0.2)', color: '#f87171', border: '1px solid #f87171' }}>
          Secure Logout
        </button>
      </div>
    </nav>
  );
}
