import TopNav from "@/components/TopNav";

export default function About() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', background: 'var(--bg-color)' }}>
      <TopNav />
      <main style={{ flex: 1, padding: '64px 32px', maxWidth: '800px', margin: '0 auto' }}>
        <h1 style={{ fontSize: '3rem', marginBottom: '24px' }}>About <span className="gradient-text">VAYU AI</span></h1>
        <div className="glass-card">
          <h2 style={{ marginBottom: '16px' }}>Our Mission</h2>
          <p style={{ color: 'var(--text-muted)', lineHeight: '1.8', marginBottom: '24px' }}>
            To protect citizens from extreme environmental hazards by bridging the gap between passive sensor data and active municipal enforcement using cutting-edge Generative AI.
          </p>
          <h2 style={{ marginBottom: '16px' }}>The Technology</h2>
          <p style={{ color: 'var(--text-muted)', lineHeight: '1.8' }}>
            Built on top of Nvidia Nemotron-3-Ultra, VAYU AI utilizes a multi-agent routing architecture to process real-time AQI and weather metrics, simulating policy impacts and generating hyper-personalized health advisories.
          </p>
        </div>
      </main>
    </div>
  );
}
