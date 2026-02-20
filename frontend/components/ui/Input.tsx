import type { InputProps } from '@/lib/types';

export function Input({ className = '', ...props }: InputProps) {
  return <input className={`input-field ${className}`} {...props} />;
}
