import './globals.css';
import type { ReactNode } from 'react';

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="bg-neutral-100 dark:bg-neutral-800">{children}</body>
    </html>
  );
}
