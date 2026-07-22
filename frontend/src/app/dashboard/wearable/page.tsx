"use client";

import React, { useState, useEffect } from 'react';
import Chatbot from '@/components/Chatbot';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

export default function WearableDashboard() {
  const city = "Delhi"; // Mock wearable location
  const [metrics, setMetrics] = useState<any>(null);
  const [aiAnalysis, setAiAnalysis] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  // Mock Wearable Bio-Metrics
  const [hr, setHr] = useState(72);
  const [spo2, setSpo2] = useState(98);
  const [lungExposure, setLungExposure] = useState(0);

  useEffect(() => {
    // Step 1: Fast Data Retrieval
    fetch(`https://sitcom-paddle-gown.ngrok-free.dev/api/weather?city=${city}`, { headers: { "ngrok-skip-browser-warning": "69420" } })
      .then(res => res.json())
      .then(weatherData => {
        setMetrics(weatherData);
        setLungExposure(Math.round(weatherData.aqi * 0.15)); // Simulated exposure calculation
        
        // Step 2: Slow AI Reasoning
        fetch(`https://sitcom-paddle-gown.ngrok-free.dev/api/ai/citizen`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', 'ngrok-skip-browser-warning': '69420' },
          body: JSON.stringify(weatherData)
        })
        .then(res => res.json())
        .then(aiData => {
          setAiAnalysis(aiData);
          setLoading(false);
        })
        .catch(err => {
          console.error("AI Error:", err);
          setLoading(false);
        });
      });

    // Simulate real-time biometric fluctuations
    const interval = setInterval(() => {
      setHr(prev => prev + (Math.random() > 0.5 ? 1 : -1));
      if (Math.random() > 0.8) setSpo2(prev => (prev === 99 ? 98 : prev + (Math.random() > 0.5 ? 1 : -1)));
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const heartRateData = [
    { time: '08:00', hr: 68 }, { time: '09:00', hr: 75 }, { time: '10:00', hr: 82 },
    { time: '11:00', hr: 85 }, { time: '12:00', hr: hr }, { time: '13:00', hr: hr + 2 }
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', paddingBottom: '100px' }}>
      
      {/* Header */}
      <div className="glass-panel" style={{ padding: '24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h2>⌚️ Wearable Health Dashboard</h2>
          <p style={{ color: 'var(--text-muted)' }}>Real-time Biometric & Environmental Synchronization</p>
          <div style={{ marginTop: '8px', color: 'var(--accent-green)' }}>Status: Synced with Apple Watch Ultra 2</div>
        </div>
        <div style={{ textAlign: 'right' }}>
          <div style={{ fontSize: '2rem', fontWeight: 'bold', color: 'var(--primary)' }}>
            Vibek Prasad
          </div>
          <div className="badge badge-primary">Asthma Profile Active</div>
        </div>
      </div>

      {!metrics ? (
        <div className="glass-card" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '50vh' }}>
          <div className="pulse" style={{ width: '60px', height: '60px', borderRadius: '50%', background: '#f97316', marginBottom: '24px' }}></div>
          <h2>Syncing Vitals with Environment...</h2>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          
          {/* Bio-Metrics Grid */}
          <div className="dashboard-grid">
            <div className="glass-card" style={{ textAlign: 'center', borderTop: '4px solid #ef4444' }}>
              <div style={{ color: 'var(--text-muted)', marginBottom: '8px' }}>Live Heart Rate</div>
              <div style={{ fontSize: '3rem', fontWeight: 'bold', color: '#ef4444' }}>{hr} <span style={{fontSize: '1rem'}}>bpm</span></div>
            </div>
            <div className="glass-card" style={{ textAlign: 'center', borderTop: '4px solid #3b82f6' }}>
              <div style={{ color: 'var(--text-muted)', marginBottom: '8px' }}>Blood Oxygen (SpO2)</div>
              <div style={{ fontSize: '3rem', fontWeight: 'bold', color: '#3b82f6' }}>{spo2}<span style={{fontSize: '1rem'}}>%</span></div>
            </div>
            <div className="glass-card" style={{ textAlign: 'center', borderTop: '4px solid #f97316' }}>
              <div style={{ color: 'var(--text-muted)', marginBottom: '8px' }}>Est. PM2.5 Inhaled (Last 4h)</div>
              <div style={{ fontSize: '3rem', fontWeight: 'bold', color: '#f97316' }}>{lungExposure}<span style={{fontSize: '1rem'}}> μg</span></div>
            </div>
            <div className="glass-card" style={{ textAlign: 'center', borderTop: '4px solid var(--accent-yellow)' }}>
              <div style={{ color: 'var(--text-muted)', marginBottom: '8px' }}>Ambient AQI Exposure</div>
              <div style={{ fontSize: '3rem', fontWeight: 'bold', color: metrics.aqi > 150 ? 'var(--accent-red)' : 'var(--accent-yellow)' }}>{metrics.aqi}</div>
            </div>
          </div>

          <div className="dashboard-grid">
            {/* Heart Rate Trend vs AQI Warning */}
            <div className="glass-card" style={{ height: '350px', display: 'flex', flexDirection: 'column' }}>
              <h3 style={{ marginBottom: '16px' }}>Heart Rate Stress Trend</h3>
              {metrics.aqi > 200 && (
                <div style={{ marginBottom: '16px', padding: '8px', background: 'rgba(239, 68, 68, 0.1)', color: '#ef4444', borderRadius: '4px', fontSize: '0.9rem', border: '1px solid rgba(239, 68, 68, 0.3)' }}>
                  ⚠️ Elevated HR detected during outdoor commute in High AQI zone.
                </div>
              )}
              <div style={{ flex: 1, width: '100%' }}>
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={heartRateData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                    <XAxis dataKey="time" stroke="var(--text-muted)" fontSize={12} />
                    <YAxis stroke="var(--text-muted)" fontSize={12} domain={['dataMin - 10', 'dataMax + 10']} />
                    <Tooltip contentStyle={{ backgroundColor: 'var(--surface-dark)', border: '1px solid var(--border-color)' }} />
                    <Line type="monotone" dataKey="hr" stroke="#ef4444" strokeWidth={3} dot={{ r: 4, fill: '#ef4444' }} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* AI Health Recommendations */}
            <div className="glass-card">
              <h3 style={{ marginBottom: '16px' }}>AI Medical Agent Recommendations</h3>
              {loading ? (
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--text-muted)' }}>
                  <div className="pulse" style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#f97316' }}></div>
                  Analyzing biometric correlation with Nvidia NIM...
                </div>
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  <div style={{ padding: '16px', background: 'rgba(59, 130, 246, 0.1)', borderLeft: '4px solid #3b82f6', borderRadius: '4px' }}>
                    <strong>Immediate Action:</strong> {aiAnalysis?.personal_health_advice?.AI_Coach_Message}
                  </div>
                  
                  <div>
                    <h4 style={{ marginBottom: '8px', color: 'var(--text-muted)' }}>Health Precautions</h4>
                    <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                      <li style={{ marginBottom: '8px', display: 'flex', gap: '8px' }}>
                        <span style={{ color: '#10b981' }}>✓</span> {aiAnalysis?.personal_health_advice?.Safe_To_Exercise_Outdoors ? "Safe for outdoor exercise" : "Avoid outdoor exercise"}
                      </li>
                      <li style={{ marginBottom: '8px', display: 'flex', gap: '8px' }}>
                        <span style={{ color: '#10b981' }}>✓</span> Mask recommendation: {aiAnalysis?.personal_health_advice?.Mask_Recommendation}
                      </li>
                    </ul>
                  </div>
                </div>
              )}
            </div>
          </div>

        </div>
      )}

      {/* Floating Chatbot Injection */}
      {!loading && metrics && (
        <Chatbot contextData={{ city, aqi: metrics.aqi, hr, spo2, role: "Wearable User" }} />
      )}
    </div>
  );
}
