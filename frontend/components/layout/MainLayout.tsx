import type { MainLayoutProps } from '@/lib/types';
import Header from './Header';

export function MainLayout({ children, className = '' }: MainLayoutProps) {
  return (
    <>
      <Header />
      <div className={`layout-content ${className}`}>{children}</div>
    </>
  );
}
