import TopNav from "@/components/TopNav";
import Link from "next/link";

export default function Home() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', background: 'var(--bg-color)' }}>
      <TopNav />
      <main style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '64px 32px', textAlign: 'center' }}>
        <h1 className="gradient-text" style={{ fontSize: '4rem', marginBottom: '24px', maxWidth: '800px', lineHeight: '1.2' }}>
          Next-Generation AI for Smart City Environmental Control
        </h1>
        <p style={{ fontSize: '1.2rem', color: 'var(--text-muted)', maxWidth: '600px', marginBottom: '48px', lineHeight: '1.6' }}>
          VAYU AI orchestrates city-wide policy interventions and personal health guidance in real-time, powered by Nvidia Nim and dynamic environmental sensors.
        </p>
        <div style={{ display: 'flex', gap: '24px' }}>
          <Link href="/features" className="glass-card" style={{ padding: '16px 32px', fontSize: '1.1rem', textDecoration: 'none', color: 'white', background: 'rgba(255,255,255,0.05)', border: '1px solid var(--border-color)' }}>
            Explore Features
          </Link>
        </div>
      </main>
    </div>
  );
}
