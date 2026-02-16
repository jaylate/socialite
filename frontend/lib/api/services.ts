import { apiConfig } from './config';
import fetchApi from './fetchApi';
import type { Post } from '@/lib/types';
import type { LoginRequest, RegisterRequest, AuthResponse } from '@/lib/types';

export const postService = {
  getAll: (userId: number = apiConfig.defaultUserId) => fetchApi<Post[]>(`/posts?userId=${userId}`),
  getById: (postId: number, userId: number = apiConfig.defaultUserId) =>
    fetchApi<Post>(`/posts/${postId}?userId=${userId}`),
  getLikesForPostId: (postId: number, userId: number = apiConfig.defaultUserId) =>
    fetchApi<number>(`/posts/${postId}/likes/count?userId=${userId}`),
  likePostId: (
    previousLikeState: boolean,
    postId: number,
    userId: number = apiConfig.defaultUserId
  ) =>
    fetchApi<null>(`/posts/${postId}/likes?userId=${userId}`, {
      method: previousLikeState ? 'DELETE' : 'POST',
    }),
};

export const authService = {
  login: (data: LoginRequest) =>
    fetchApi<AuthResponse>('/auth/login', {
      method: 'POST',
      body: JSON.stringify(data),
    }),
  register: (data: RegisterRequest) =>
    fetchApi<AuthResponse>('/auth/register', {
      method: 'POST',
      body: JSON.stringify(data),
    }),
};
