import { apiConfig } from '@/lib/api/config';
import { ApiError } from '@/lib/types';

const DEFAULT_TIMEOUT = 1500; // 1.5 seconds

export default async function fetchApi<T>(
  endpoint: string,
  options?: RequestInit & { timeout?: number }
): Promise<T> {
  const url = apiConfig.getApiUrl(endpoint);
  const timeout = options?.timeout ?? DEFAULT_TIMEOUT;

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeout);

  try {
    const response = await fetch(url, {
      ...options,
      credentials: 'include',
      signal: controller.signal,
      headers: {
        'Content-Type': 'application/json',
        ...options?.headers,
      },
    });

    if (!response.ok) {
      throw new ApiError(response.status, await response.text());
    }

    if (response.status === 204 || response.status === 201) {
      return null as T;
    }

    return response.json();
  } catch (error) {
    if (error instanceof ApiError) {
      throw error;
    }
    if (error instanceof Error && error.name === 'AbortError') {
      throw new ApiError(0, 'Request timed out');
    }
    throw new ApiError(0, error instanceof Error ? error.message : 'Network error');
  } finally {
    clearTimeout(timeoutId);
  }
}
