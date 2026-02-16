import { ApiConfig } from '@/lib/types';

export const apiConfig: ApiConfig = {
  baseUrl: typeof window === 'undefined' ? process.env.baseUrl || '' : '',
  apiPrefix: '/api',
  version: '/v1',
  defaultUserId: 1,
  getApiUrl: (endpoint: string) => {
    return `${apiConfig.baseUrl}${apiConfig.apiPrefix}${apiConfig.version}${endpoint}`;
  },
};
