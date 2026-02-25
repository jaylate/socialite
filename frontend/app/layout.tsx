import { AuthProvider } from '@/lib/auth/AuthContext';
import { PageLayout, MainLayout } from '@/components/layout';
import './globals.css';
import type { ReactNode } from 'react';
export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-page">
        <AuthProvider>
          <PageLayout>
            <MainLayout>{children}</MainLayout>
          </PageLayout>
        </AuthProvider>
      </body>
    </html>
  );
}
