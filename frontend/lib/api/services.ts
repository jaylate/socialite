import { apiConfig } from './config';
import fetchApi from './fetchApi';
import { withErrorReporting } from '@/lib/errors';
import type { Post, CreatePostRequest } from '@/lib/types';
import type { LoginRequest, RegisterRequest, AuthResponse } from '@/lib/types';

export const postService = {
  getAll: (userId: number = apiConfig.defaultUserId, options?: RequestInit) =>
    withErrorReporting(
      () => fetchApi<Post[]>(`/posts?userId=${userId}`, options),
      'postService',
      'getAll'
    ),
  getById: (postId: number, userId: number = apiConfig.defaultUserId, options?: RequestInit) =>
    withErrorReporting(
      () => fetchApi<Post>(`/posts/${postId}?userId=${userId}`, options),
      'postService',
      'getById'
    ),
  getLikesForPostId: (
    postId: number,
    userId: number = apiConfig.defaultUserId,
    options?: RequestInit
  ) =>
    withErrorReporting(
      () => fetchApi<number>(`/posts/${postId}/likes/count?userId=${userId}`, options),
      'postService',
      'getLikesForPostId'
    ),
  likePostId: (
    previousLikeState: boolean,
    postId: number,
    userId: number = apiConfig.defaultUserId,
    options?: RequestInit
  ) =>
    withErrorReporting(
      () =>
        fetchApi<null>(`/posts/${postId}/likes?userId=${userId}`, {
          method: previousLikeState ? 'DELETE' : 'POST',
          ...options,
        }),
      'postService',
      'likePostId'
    ),
  addPost: (
    content: CreatePostRequest,
    userId: number = apiConfig.defaultUserId,
    options?: RequestInit
  ) =>
    withErrorReporting(
      () =>
        fetchApi<null>(`/posts/?userId=${userId}`, {
          method: 'POST',
          body: JSON.stringify(content),
          ...options,
        }),
      'postService',
      'addPost'
    ),
};

export const authService = {
  login: (data: LoginRequest) =>
    withErrorReporting(
      () =>
        fetchApi<AuthResponse>('/auth/login', {
          method: 'POST',
          body: JSON.stringify(data),
        }),
      'authService',
      'login'
    ),
  register: (data: RegisterRequest) =>
    withErrorReporting(
      () =>
        fetchApi<AuthResponse>('/auth/register', {
          method: 'POST',
          body: JSON.stringify(data),
        }),
      'authService',
      'register'
    ),
};
