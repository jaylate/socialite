import { apiConfig } from '@/lib/api/config';
import { ApiError } from '@/lib/types';

export default async function fetchApi<T>(endpoint: string, options?: RequestInit): Promise<T> {
  const url = apiConfig.getApiUrl(endpoint);

  const response = await fetch(url, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...options?.headers,
    },
  });

  if (!response.ok) {
    throw { status: response.status, text: await response.text() } as ApiError;
  }

  if (response.status === 204 || response.status === 201) {
    return undefined as T; // No content to parse
  }

  return response.json();
}
