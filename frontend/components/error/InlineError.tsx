import type { InlineErrorProps } from '@/lib/types';

export function InlineError({ message, className = '' }: InlineErrorProps) {
  if (!message) return null;

  return (
    <div
      className={`rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-800 dark:border-red-800 dark:bg-red-950 dark:text-red-200 ${className}`}
      role="alert"
    >
      {message}
    </div>
  );
}
