"use client";

import TopNav from "@/components/TopNav";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Login() {
  const router = useRouter();

  useEffect(() => {
    // If already logged in, redirect to their dashboard
    const role = localStorage.getItem('userRole');
    if (role === 'government') router.push('/dashboard/government-modern');
    if (role === 'citizen') router.push('/dashboard/citizen');
    if (role === 'wearable') router.push('/dashboard/wearable');
    if (role === 'superadmin') router.push('/dashboard/superadmin');
  }, [router]);

  const handleLogin = (role: string) => {
    localStorage.setItem('userRole', role);
    if (role === 'government') router.push('/dashboard/government-modern');
    if (role === 'citizen') router.push('/dashboard/citizen');
    if (role === 'wearable') router.push('/dashboard/wearable');
    if (role === 'superadmin') router.push('/dashboard/superadmin');
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', background: 'var(--bg-color)' }}>
      <TopNav />
      <main style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '32px' }}>
        <div className="glass-panel" style={{ padding: '48px', width: '100%', maxWidth: '500px', borderRadius: '16px' }}>
          <h2 style={{ marginBottom: '8px', textAlign: 'center' }}>VAYU AI Access Portal</h2>
          <p style={{ color: 'var(--text-muted)', textAlign: 'center', marginBottom: '32px' }}>Please select your authorized authentication role.</p>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <button 
              onClick={() => handleLogin('government')}
              className="glass-card" 
              style={{ padding: '20px', textAlign: 'left', cursor: 'pointer', background: 'rgba(0, 210, 255, 0.05)', border: '1px solid var(--primary)', display: 'flex', alignItems: 'center', gap: '16px' }}
            >
              <span style={{ fontSize: '2rem' }}>🏛</span>
              <div>
                <strong style={{ display: 'block', fontSize: '1.2rem', color: 'var(--text-main)' }}>Login as Government</strong>
                <span style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>Access City Overview & Orchestration Command</span>
              </div>
            </button>

            <button 
              onClick={() => handleLogin('citizen')}
              className="glass-card" 
              style={{ padding: '20px', textAlign: 'left', cursor: 'pointer', background: 'rgba(16, 185, 129, 0.05)', border: '1px solid var(--accent-green)', display: 'flex', alignItems: 'center', gap: '16px' }}
            >
              <span style={{ fontSize: '2rem' }}>👤</span>
              <div>
                <strong style={{ display: 'block', fontSize: '1.2rem', color: 'var(--text-main)' }}>Login as Citizen</strong>
                <span style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>Access Personal Environmental Feed</span>
              </div>
            </button>

            <button 
              onClick={() => handleLogin('wearable')}
              className="glass-card" 
              style={{ padding: '20px', textAlign: 'left', cursor: 'pointer', background: 'rgba(249, 115, 22, 0.05)', border: '1px solid #f97316', display: 'flex', alignItems: 'center', gap: '16px' }}
            >
              <span style={{ fontSize: '2rem' }}>⌚️</span>
              <div>
                <strong style={{ display: 'block', fontSize: '1.2rem', color: 'var(--text-main)' }}>Wearable Dashboard</strong>
                <span style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>Access Real-time Biometric & Air Quality Sync</span>
              </div>
            </button>

            <button 
              onClick={() => handleLogin('superadmin')}
              className="glass-card" 
              style={{ padding: '20px', textAlign: 'left', cursor: 'pointer', background: 'rgba(255, 255, 255, 0.05)', border: '1px solid var(--border-color)', display: 'flex', alignItems: 'center', gap: '16px', marginTop: '16px' }}
            >
              <span style={{ fontSize: '2rem' }}>🔐</span>
              <div>
                <strong style={{ display: 'block', fontSize: '1.2rem', color: 'var(--text-main)' }}>Login as Superadmin</strong>
                <span style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>God Mode: View all dashboards and active sessions</span>
              </div>
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}
