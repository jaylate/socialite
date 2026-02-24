import { AuthProvider } from '@/lib/auth/AuthContext';
import './globals.css';
import type { ReactNode } from 'react';
export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-page">
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
