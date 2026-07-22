"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";

export default function AuthGuard({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const [authorized, setAuthorized] = useState(false);

  useEffect(() => {
    const role = localStorage.getItem('userRole');

    if (!role) {
      router.push('/login');
      return;
    }

    // Role-based Access Control Routing Rules
    let isAllowed = false;

    if (role === 'superadmin') {
      isAllowed = true; // Superadmin has access to everything
    } else if (role === 'government') {
      if (pathname.includes('/government') || pathname.includes('/learning') || pathname.includes('/analytics')) {
        isAllowed = true;
      } else {
        router.push('/dashboard/government-modern');
      }
    } else if (role === 'citizen') {
      if (pathname.includes('/citizen')) {
        isAllowed = true;
      } else {
        router.push('/dashboard/citizen');
      }
    } else if (role === 'wearable') {
      if (pathname.includes('/wearable')) {
        isAllowed = true;
      } else {
        router.push('/dashboard/wearable');
      }
    }

    if (isAllowed) {
      setAuthorized(true);
    }

  }, [pathname, router]);

  if (!authorized) {
    return (
      <div style={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--bg-color)' }}>
        <div className="pulse" style={{ width: '40px', height: '40px', background: 'var(--primary)', borderRadius: '50%' }}></div>
      </div>
    );
  }

  return <>{children}</>;
}
