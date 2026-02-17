import { apiConfig } from './config';
import fetchApi from './fetchApi';
import type { Post, CreatePostRequest } from '@/lib/types';
import type { LoginRequest, RegisterRequest, AuthResponse } from '@/lib/types';

export const postService = {
  getAll: (userId: number = apiConfig.defaultUserId, options?: RequestInit) =>
    fetchApi<Post[]>(`/posts?userId=${userId}`, options),
  getById: (postId: number, userId: number = apiConfig.defaultUserId, options?: RequestInit) =>
    fetchApi<Post>(`/posts/${postId}?userId=${userId}`, options),
  getLikesForPostId: (
    postId: number,
    userId: number = apiConfig.defaultUserId,
    options?: RequestInit
  ) => fetchApi<number>(`/posts/${postId}/likes/count?userId=${userId}`, options),
  likePostId: (
    previousLikeState: boolean,
    postId: number,
    userId: number = apiConfig.defaultUserId,
    options?: RequestInit
  ) =>
    fetchApi<null>(`/posts/${postId}/likes?userId=${userId}`, {
      method: previousLikeState ? 'DELETE' : 'POST',
      ...options,
    }),
  addPost: (
    content: CreatePostRequest,
    userId: number = apiConfig.defaultUserId,
    options?: RequestInit
  ) =>
    fetchApi<null>(`/posts/?userId=${userId}`, {
      method: 'POST',
      body: JSON.stringify(content),
      ...options,
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
