import React from 'react';

export default function AnalyticsDashboard() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      
      {/* Header */}
      <div className="glass-panel" style={{ padding: '24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h2>📊 System Analytics</h2>
          <p style={{ color: 'var(--text-muted)' }}>AI Model Performance & Policy Effectiveness Logs</p>
        </div>
        <div style={{ textAlign: 'right' }}>
          <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: 'var(--accent-green)' }}>92% Accuracy</div>
          <div className="badge badge-success">Model Health: Optimal</div>
        </div>
      </div>

      <div className="dashboard-grid">
        
        {/* Model Accuracy Trackers */}
        <div className="glass-card">
          <h3 style={{ marginBottom: '16px' }}>Neural Prediction Accuracy</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid var(--border-color)', paddingBottom: '12px' }}>
              <div>
                <div style={{ fontWeight: 'bold' }}>Yesterday's Forecast</div>
                <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Predicted AQI: 240</div>
              </div>
              <div style={{ textAlign: 'right' }}>
                <div style={{ fontWeight: 'bold', color: 'var(--accent-red)' }}>Actual: 245</div>
                <div style={{ fontSize: '0.85rem', color: 'var(--accent-green)' }}>Error Margin: 2%</div>
              </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid var(--border-color)', paddingBottom: '12px' }}>
              <div>
                <div style={{ fontWeight: 'bold' }}>2 Days Ago Forecast</div>
                <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Predicted AQI: 190</div>
              </div>
              <div style={{ textAlign: 'right' }}>
                <div style={{ fontWeight: 'bold', color: 'var(--accent-yellow)' }}>Actual: 182</div>
                <div style={{ fontSize: '0.85rem', color: 'var(--accent-green)' }}>Error Margin: 4.2%</div>
              </div>
            </div>

            <div style={{ marginTop: '8px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px', fontSize: '0.85rem' }}>
                <span>Overall Learning Agent Confidence</span>
                <span style={{ color: 'var(--primary)' }}>92%</span>
              </div>
              <div style={{ width: '100%', height: '6px', background: 'var(--border-color)', borderRadius: '4px' }}>
                <div style={{ width: '92%', height: '100%', background: 'var(--primary)', borderRadius: '4px' }}></div>
              </div>
            </div>

          </div>
        </div>

        {/* Policy Effectiveness */}
        <div className="glass-card" style={{ border: '1px solid var(--accent-purple)' }}>
          <h3 style={{ marginBottom: '16px', color: 'var(--accent-purple)' }}>Policy Impact Verification</h3>
          <p style={{ color: 'var(--text-muted)', marginBottom: '16px', fontSize: '0.9rem' }}>
            Measures if Government Dashboard actions successfully lowered pollution.
          </p>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div style={{ background: 'rgba(255,255,255,0.05)', padding: '16px', borderRadius: '8px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                <strong>Water Sprinkling (Ward 4)</strong>
                <span className="badge badge-success">Completed</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.9rem', color: 'var(--text-muted)' }}>
                <span>Expected Impact: -5% AQI</span>
                <span style={{ color: 'var(--accent-green)', fontWeight: 'bold' }}>Actual Impact: -6.2% AQI</span>
              </div>
            </div>

            <div style={{ background: 'rgba(255,255,255,0.05)', padding: '16px', borderRadius: '8px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                <strong>Heavy Truck Restriction</strong>
                <span className="badge badge-warning">In Progress</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.9rem', color: 'var(--text-muted)' }}>
                <span>Expected Impact: -12% AQI</span>
                <span style={{ color: 'var(--accent-yellow)', fontWeight: 'bold' }}>Current Impact: -8% AQI</span>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
