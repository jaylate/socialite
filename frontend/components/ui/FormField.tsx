import type { FormFieldProps } from '@/lib/types';

export function FormField({ label, htmlFor, error, children }: FormFieldProps) {
  return (
    <div className="form-field">
      <label htmlFor={htmlFor} className="form-label-text">
        {label}
      </label>
      {children}
      {error && <p className="form-error-text">{error}</p>}
    </div>
  );
}
