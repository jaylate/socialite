'use client';

import type { TextareaProps } from '@/lib/types';

export function Textarea({ className = '', footer, ...props }: TextareaProps) {
  return (
    <label className="form-label">
      <textarea className={`textarea-field ${className}`} {...props} />
      {footer}
    </label>
  );
}
