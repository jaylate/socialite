import type { PageLayoutProps } from '@/lib/types';

export function PageLayout({ children, className = '' }: PageLayoutProps) {
  return <div className={`layout-page ${className}`}>{children}</div>;
}
