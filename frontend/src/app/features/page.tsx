import TopNav from "@/components/TopNav";

export default function Features() {
  const features = [
    { title: "Dynamic Policy Simulation", desc: "AI predicts the AQI reduction impact of deploying water sprinklers or restricting heavy traffic." },
    { title: "Personal AI Health Coach", desc: "Citizens receive hyper-localized risk scores and medical advisories tailored to their health profiles." },
    { title: "Safe Route Optimization", desc: "MapBox integration routes citizens away from acute pollution hotspots in real-time." },
    { title: "Multi-Agent Architecture", desc: "Separated concerns for Government, Citizen, and Analytic AI agents to ensure scalable, precise logic." }
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', background: 'var(--bg-color)' }}>
      <TopNav />
      <main style={{ flex: 1, padding: '64px 32px', maxWidth: '1000px', margin: '0 auto' }}>
        <h1 style={{ fontSize: '3rem', marginBottom: '48px', textAlign: 'center' }}>Core <span className="gradient-text">Features</span></h1>
        <div className="dashboard-grid">
          {features.map((f, i) => (
            <div key={i} className="glass-card" style={{ padding: '32px' }}>
              <h3 style={{ marginBottom: '16px', color: 'var(--primary)' }}>{f.title}</h3>
              <p style={{ color: 'var(--text-muted)', lineHeight: '1.6' }}>{f.desc}</p>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
