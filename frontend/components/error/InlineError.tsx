import type { InlineErrorProps } from '@/lib/types';

export function InlineError({ message, className = '' }: InlineErrorProps) {
  if (!message) return null;

  return (
    <div
      className={`border-error bg-error text-error rounded-lg border p-3 text-sm ${className}`}
      role="alert"
    >
      {message}
    </div>
  );
}
