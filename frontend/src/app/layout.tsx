import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "VAYU AI",
  description: "Smart City Intelligence & Personal Environmental Health Platform",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
          {children}
        </div>
      </body>
    </html>
  );
}
