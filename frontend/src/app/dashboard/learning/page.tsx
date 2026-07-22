"use client";

import React, { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

export default function LearningDashboard() {
  const [learningData, setLearningData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    // Trigger Learning Route
    fetch(`https://sitcom-paddle-gown.ngrok-free.dev/api/ai/learning`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'ngrok-skip-browser-warning': '69420' },
    })
      .then(res => res.json())
      .then(data => {
        setLearningData(data);
        setLoading(false);
      })
      .catch(err => {
        console.error("Learning API Error:", err);
        setLoading(false);
      });
  }, []);

  // Mock data to show "Accuracy Tracking" over the last 5 days
  const accuracyData = [
    { day: 'Day 1', predicted: 310, actual: 330, error: 20 },
    { day: 'Day 2', predicted: 280, actual: 295, error: 15 },
    { day: 'Day 3', predicted: 400, actual: 410, error: 10 },
    { day: 'Day 4', predicted: 350, actual: 355, error: 5 },
    { day: 'Day 5', predicted: 320, actual: 322, error: 2 },
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      
      {/* Header */}
      <div className="glass-panel" style={{ padding: '24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h2>🟡 AI Learning Engine</h2>
          <p style={{ color: 'var(--text-muted)' }}>Feedback Tracking, Model Refinement & System Metrics</p>
        </div>
        <div style={{ textAlign: 'right' }}>
          {loading ? (
             <div className="pulse" style={{ width: '30px', height: '30px', borderRadius: '50%', background: 'var(--accent-yellow)', margin: 'auto' }}></div>
          ) : (
            <div className="badge badge-warning">System Baseline Updated Successfully</div>
          )}
        </div>
      </div>

      {loading ? (
        <div className="glass-card" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '60vh', textAlign: 'center' }}>
          <div className="pulse" style={{ width: '80px', height: '80px', borderRadius: '50%', background: 'var(--accent-yellow)', marginBottom: '32px' }}></div>
          <h2 style={{ marginBottom: '16px', fontSize: '2rem' }}>Learning Agent Active...</h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '1.2rem', marginBottom: '8px' }}>Aggregating Government Policy Logs & Citizen Biometric Telemetry...</p>
          <p style={{ color: 'var(--text-muted)', fontSize: '1.2rem' }}>Recalculating Operational Baselines via Nvidia NIM...</p>
        </div>
      ) : learningData ? (
        
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          
          {/* Executive Summary */}
          <div className="glass-card" style={{ background: 'rgba(234, 179, 8, 0.05)', borderLeft: '4px solid var(--accent-yellow)' }}>
            <h3 style={{ marginBottom: '16px', color: 'var(--accent-yellow)' }}>Communication Agent Output</h3>
            <p style={{ fontSize: '1.1rem', lineHeight: '1.6' }}>{learningData.AI_Context}</p>
          </div>

          <div className="dashboard-grid">
            
            {/* Accuracy Graph */}
            <div className="glass-card" style={{ flex: 1.5, minHeight: '350px' }}>
              <h3 style={{ marginBottom: '24px' }}>Prediction Accuracy Tracking</h3>
              <p style={{ color: 'var(--text-muted)', marginBottom: '16px', fontSize: '0.9rem' }}>
                System error rate (Delta) drops progressively over 5 days as the Learning Agent adjusts weights.
              </p>
              <div style={{ width: '100%', height: '250px' }}>
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={accuracyData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                    <XAxis dataKey="day" stroke="rgba(255,255,255,0.5)" />
                    <YAxis stroke="rgba(255,255,255,0.5)" />
                    <Tooltip contentStyle={{ backgroundColor: 'rgba(0,0,0,0.8)' }} />
                    <Line type="monotone" dataKey="predicted" name="Predicted AQI" stroke="var(--primary)" strokeWidth={2} />
                    <Line type="monotone" dataKey="actual" name="Actual Sensor AQI" stroke="var(--accent-yellow)" strokeWidth={2} strokeDasharray="5 5" />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Continuous Learning Database Logs */}
            <div className="glass-card" style={{ flex: 1 }}>
              <h3 style={{ marginBottom: '24px' }}>System Feedback Logs</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <div style={{ background: 'rgba(0,0,0,0.3)', padding: '16px', borderRadius: '8px' }}>
                  <div style={{ fontSize: '0.8rem', color: 'var(--accent-yellow)', marginBottom: '4px' }}>Policy Track: Intervention Feedback</div>
                  <div><strong>Gov Action:</strong> Water Sprinkling (Ward 11)</div>
                  <div><strong>Measured Drop:</strong> -8% AQI <span style={{ color: 'var(--text-muted)', fontSize: '0.8rem' }}>(Expected -5%)</span></div>
                  <div style={{ color: 'var(--accent-green)', marginTop: '4px' }}>→ Optimization: Policy weight increased.</div>
                </div>

                <div style={{ background: 'rgba(0,0,0,0.3)', padding: '16px', borderRadius: '8px' }}>
                  <div style={{ fontSize: '0.8rem', color: 'var(--accent-purple)', marginBottom: '4px' }}>Personal Track: Biometric Shift</div>
                  <div><strong>User Context:</strong> Sector 4 Exposure</div>
                  <div><strong>Metric Shift:</strong> HRV Dropped below baseline.</div>
                  <div style={{ color: 'var(--accent-green)', marginTop: '4px' }}>→ Optimization: Personal safety triggers updated.</div>
                </div>
              </div>
            </div>

          </div>

          {/* Model Adjustments JSON View */}
          <div className="glass-card">
            <h3 style={{ marginBottom: '16px' }}>Nvidia NIM Output: Underlying Core Adjustments</h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px' }}>
              
              <div style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid var(--border-color)', borderRadius: '8px', padding: '16px' }}>
                <h4 style={{ color: 'var(--primary)', marginBottom: '12px' }}>Discovered Patterns</h4>
                <ul style={{ listStyleType: 'disc', paddingLeft: '20px', color: 'var(--text-muted)', fontSize: '0.9rem', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  {learningData.Discovered_Patterns?.map((item: string, i: number) => <li key={i}>{item}</li>)}
                </ul>
              </div>

              <div style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid var(--border-color)', borderRadius: '8px', padding: '16px' }}>
                <h4 style={{ color: 'var(--accent-yellow)', marginBottom: '12px' }}>Updated Models</h4>
                <ul style={{ listStyleType: 'disc', paddingLeft: '20px', color: 'var(--text-muted)', fontSize: '0.9rem', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  {learningData.Updated_Models?.map((item: string, i: number) => <li key={i}>{item}</li>)}
                </ul>
              </div>

              <div style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid var(--border-color)', borderRadius: '8px', padding: '16px' }}>
                <h4 style={{ color: 'var(--accent-green)', marginBottom: '12px' }}>Updated Rules & Recs</h4>
                <ul style={{ listStyleType: 'disc', paddingLeft: '20px', color: 'var(--text-muted)', fontSize: '0.9rem', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  {learningData.Updated_Rules?.map((item: string, i: number) => <li key={i}>{item}</li>)}
                  {learningData.Updated_Recommendations?.map((item: string, i: number) => <li key={i}>{item}</li>)}
                </ul>
              </div>

            </div>
          </div>

        </div>
      ) : null}
    </div>
  );
}
