import type { ButtonProps } from '@/lib/types';

export function Button({ variant = 'rounded', className = '', children, ...props }: ButtonProps) {
  const baseClasses = variant === 'rounded' ? 'btn-primary' : 'btn-card';

  return (
    <button className={`${baseClasses} ${className}`} {...props}>
      {children}
    </button>
  );
}
