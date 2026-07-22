import Sidebar from "@/components/Sidebar";
import AuthGuard from "@/components/AuthGuard";

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <AuthGuard>
      <div style={{ display: 'flex', minHeight: '100vh', width: '100%' }}>
        <Sidebar />
        <main style={{ flex: 1, padding: '16px 32px 16px 16px', overflowY: 'auto' }}>
          {children}
        </main>
      </div>
    </AuthGuard>
  );
}
