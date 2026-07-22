"use client";

import React, { useState, useEffect } from 'react';
import Chatbot from '@/components/Chatbot';

const CITIES = ["Delhi", "Mumbai", "Bangalore", "Chennai", "Kolkata"];

export default function CitizenDashboard() {
  const [city, setCity] = useState("Delhi");
  
  const [metrics, setMetrics] = useState<any>(null);
  const [loadingMetrics, setLoadingMetrics] = useState(true);
  
  const [aiAnalysis, setAiAnalysis] = useState<any>(null);
  const [loadingAi, setLoadingAi] = useState(true);

  useEffect(() => {
    setLoadingMetrics(true);
    setLoadingAi(true);
    setAiAnalysis(null);
    
    // Step 1: Fast Data Retrieval
    fetch(`https://sitcom-paddle-gown.ngrok-free.dev/api/weather?city=${city}`, { headers: { "ngrok-skip-browser-warning": "69420" } })
      .then(res => res.json())
      .then(weatherData => {
        setMetrics(weatherData);
        setLoadingMetrics(false);
        
        // Step 2: Slow AI Reasoning
        fetch(`https://sitcom-paddle-gown.ngrok-free.dev/api/ai/citizen`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', 'ngrok-skip-browser-warning': '69420' },
          body: JSON.stringify(weatherData)
        })
        .then(res => res.json())
        .then(aiData => {
          setAiAnalysis(aiData);
          setLoadingAi(false);
        })
        .catch(err => {
          console.error("AI Error:", err);
          setLoadingAi(false);
        });
        
      })
      .catch(err => {
        console.error("Weather API Error:", err);
        setLoadingMetrics(false);
      });
  }, [city]);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      
      {/* Header */}
      <div className="glass-panel" style={{ padding: '24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h2>👤 Citizen Dashboard</h2>
          <p style={{ color: 'var(--text-muted)' }}>Personal Environmental Health & Mobility</p>
          <select 
            value={city} 
            onChange={(e) => setCity(e.target.value)}
            style={{ marginTop: '12px', padding: '8px', background: 'var(--surface-dark)', color: 'white', border: '1px solid var(--border-color)', borderRadius: '8px', outline: 'none' }}
          >
            {CITIES.map(c => <option key={c} value={c}>{c}</option>)}
          </select>
        </div>
        <div style={{ textAlign: 'right' }}>
          {!loadingMetrics && metrics && (
            <>
              {loadingAi ? (
                <div style={{ fontSize: '1.2rem', color: 'var(--text-muted)' }}>Analyzing Risk...</div>
              ) : (
                <>
                  <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: aiAnalysis?.personal_health_advice?.Personal_Risk_Score > 70 ? 'var(--accent-red)' : 'var(--accent-yellow)' }}>
                    {aiAnalysis?.personal_health_advice?.Personal_Risk_Score > 70 ? 'High Risk' : 'Moderate Risk'}
                  </div>
                  <div className="badge badge-warning">Your AI Risk Score: {aiAnalysis?.personal_health_advice?.Personal_Risk_Score}/100</div>
                </>
              )}
            </>
          )}
        </div>
      </div>

      {loadingMetrics ? (
        <div className="glass-card" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '60vh', textAlign: 'center' }}>
          <div className="pulse" style={{ width: '80px', height: '80px', borderRadius: '50%', background: 'var(--primary)', marginBottom: '32px' }}></div>
          <h2 style={{ marginBottom: '16px', fontSize: '2rem' }}>Establishing Connection to VAYU AI...</h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '1.2rem', marginBottom: '8px' }}>Fetching Live Open-Meteo Data for <strong>{city}</strong></p>
          <p style={{ color: 'var(--text-muted)', fontSize: '1.2rem' }}>Generating Personal Health Advisory via Nvidia NIM...</p>
        </div>
      ) : metrics ? (
        <div className="dashboard-grid">
          {/* Left Column */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            
            {/* Personalized Advice */}
            <div className="glass-card" style={{ border: '1px solid var(--primary)', minHeight: '200px' }}>
              <h3 style={{ marginBottom: '16px', color: 'var(--primary)' }}>Personal AI Advisor (Nvidia NIM)</h3>
              {loadingAi ? (
                <div style={{ padding: '32px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '16px' }}>
                  <div className="pulse" style={{ width: '30px', height: '30px', borderRadius: '50%', background: 'var(--primary)' }}></div>
                  <div style={{ color: 'var(--text-muted)' }}>Compiling Health Assessment...</div>
                </div>
              ) : (
                <div style={{ padding: '16px', background: 'rgba(0, 210, 255, 0.05)', borderRadius: '8px' }}>
                  <p style={{ marginBottom: '12px', lineHeight: '1.6' }}>
                    "{aiAnalysis?.personal_health_advice?.AI_Coach_Message}"
                  </p>
                  <div style={{ display: 'flex', gap: '8px' }}>
                    {!aiAnalysis?.personal_health_advice?.Safe_To_Exercise_Outdoors && (
                      <span className="badge badge-danger">No Outdoor Exercise</span>
                    )}
                    {aiAnalysis?.personal_health_advice?.Mask_Recommendation && (
                       <span className="badge badge-warning">Wear {aiAnalysis?.personal_health_advice?.Mask_Recommendation} Mask</span>
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* Incident Reporter */}
            <div className="glass-card">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                <h3 style={{ margin: 0 }}>Report Pollution Incident in {city}</h3>
                <span className="badge" style={{ background: 'rgba(255,255,255,0.1)', color: 'var(--text-muted)' }}>[In Progress]</span>
              </div>
              <p style={{ color: 'var(--text-muted)', marginBottom: '16px', fontSize: '0.9rem' }}>
                Directly ping the Government Dashboard with geospatial logs.
              </p>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                <button className="btn-primary" style={{ background: 'var(--surface-dark)', border: '1px solid var(--border-color)', opacity: 0.5, cursor: 'not-allowed' }} disabled>💨 Smoke</button>
                <button className="btn-primary" style={{ background: 'var(--surface-dark)', border: '1px solid var(--border-color)', opacity: 0.5, cursor: 'not-allowed' }} disabled>🔥 Garbage Burning</button>
                <button className="btn-primary" style={{ background: 'var(--surface-dark)', border: '1px solid var(--border-color)', opacity: 0.5, cursor: 'not-allowed' }} disabled>🏗 Construction Dust</button>
                <button className="btn-primary" style={{ background: 'var(--surface-dark)', border: '1px solid var(--border-color)', opacity: 0.5, cursor: 'not-allowed' }} disabled>🚗 Idling Traffic</button>
              </div>
              <button className="btn-primary" style={{ width: '100%', marginTop: '16px', opacity: 0.5, cursor: 'not-allowed' }} disabled>Submit Incident (GPS Attached)</button>
            </div>

          </div>

          {/* Right Column */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            
            {/* Dedicated AI Chat Agent Card */}
            <div className="glass-card">
              <h3 style={{ marginBottom: '16px', color: 'var(--primary)' }}>VAYU AI Assistant</h3>
              <p style={{ color: 'var(--text-muted)', marginBottom: '16px', fontSize: '0.9rem' }}>
                Ask anything about your environment. Processed via Environment ➔ Govt ➔ Decision flow.
              </p>
              <Chatbot inline={true} contextData={{ city, aqi: metrics.aqi, role: "Citizen" }} />
            </div>

            {/* Safe Route Planner */}
            <div className="glass-card">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                <h3 style={{ margin: 0 }}>Safe Route Planner</h3>
                <span className="badge" style={{ background: 'rgba(255,255,255,0.1)', color: 'var(--text-muted)' }}>[In Progress]</span>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '16px' }}>
                <input type="text" placeholder="Start: Home" style={{ padding: '12px', borderRadius: '8px', border: '1px solid var(--border-color)', background: 'rgba(0,0,0,0.1)', color: 'var(--text-muted)', cursor: 'not-allowed' }} disabled />
                <input type="text" placeholder={`Destination: ${city} Office`} style={{ padding: '12px', borderRadius: '8px', border: '1px solid var(--border-color)', background: 'rgba(0,0,0,0.1)', color: 'var(--text-muted)', cursor: 'not-allowed' }} disabled />
              </div>
              
              <div style={{ padding: '20px', background: 'rgba(0,0,0,0.3)', borderRadius: '8px', minHeight: '150px', display: 'flex', justifyContent: 'center', alignItems: 'center', color: 'var(--text-muted)', marginBottom: '16px', flexDirection: 'column', gap: '8px', opacity: 0.5 }}>
                <div>[MapBox Safe Route Rendering]</div>
                <div style={{ fontSize: '0.8rem' }}>Live Routing via VAYU AI Optimization</div>
              </div>

              <div style={{ display: 'flex', gap: '12px', justifyContent: 'space-between', opacity: 0.5 }}>
                <div style={{ background: 'rgba(239, 68, 68, 0.1)', padding: '8px 12px', borderRadius: '6px', textAlign: 'center', flex: 1, border: '1px solid rgba(239, 68, 68, 0.2)' }}>
                  <div style={{ fontSize: '0.8rem', color: 'var(--accent-red)' }}>Fastest Route</div>
                  <strong>14 mins</strong>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Exposure: High</div>
                </div>
                <div style={{ background: 'rgba(16, 185, 129, 0.1)', padding: '8px 12px', borderRadius: '6px', textAlign: 'center', flex: 1, border: '1px solid var(--accent-green)' }}>
                  <div style={{ fontSize: '0.8rem', color: 'var(--accent-green)' }}>Safest Route</div>
                  <strong>19 mins</strong>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Exposure: Low</div>
                </div>
              </div>
            </div>

          </div>
        </div>
      ) : null}

    </div>
  );
}
