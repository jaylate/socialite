export function report(
  error: unknown,
  source: string,
  action: string,
  meta?: Record<string, unknown>
): void {
  if (meta) {
    console.error(`[${source}:${action}]`, error, meta);
  } else {
    console.error(`[${source}:${action}]`, error);
  }
}

export async function withErrorReporting<T>(
  fn: () => Promise<T>,
  source: string,
  action: string,
  meta?: Record<string, unknown>
): Promise<T> {
  try {
    return await fn();
  } catch (error) {
    report(error, source, action, meta);
    throw error;
  }
}
