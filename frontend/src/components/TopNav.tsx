"use client";

import React from 'react';
import Link from 'next/link';

export default function TopNav() {
  return (
    <nav className="glass-panel" style={{ padding: '16px 32px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', margin: '16px', borderRadius: '12px' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
        <h1 className="gradient-text" style={{ fontSize: '1.5rem', margin: 0 }}>VAYU AI</h1>
        <div className="badge badge-primary">Platform v1.0</div>
      </div>
      
      <div style={{ display: 'flex', gap: '24px', alignItems: 'center' }}>
        <Link href="/" className="nav-link" style={{ fontWeight: '500' }}>Home</Link>
        <Link href="/about" className="nav-link" style={{ fontWeight: '500' }}>About</Link>
        <Link href="/features" className="nav-link" style={{ fontWeight: '500' }}>Features</Link>
        <Link href="/login" className="btn-primary" style={{ textDecoration: 'none', padding: '8px 24px' }}>Login</Link>
      </div>
    </nav>
  );
}
