import type { CardProps } from '@/lib/types';

export function Card({ title, subtitle, titleLarge, footer, children }: CardProps) {
  return (
    <div className="card">
      <div className="mb-8 text-center">
        <h1 className={titleLarge ? 'card-title-large' : 'card-title'}>{title}</h1>
        {subtitle && <p className="card-subtitle">{subtitle}</p>}
      </div>
      {children}
      {footer && <p className="card-footer">{footer}</p>}
    </div>
  );
}
