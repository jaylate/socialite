import { apiConfig } from './config';
import fetchApi from './fetchApi';
import { withErrorReporting } from '@/lib/errors';
import type { User, Post, CreatePostRequest } from '@/lib/types';
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
  getByUserId: (userId: number = apiConfig.defaultUserId, options?: RequestInit) =>
    withErrorReporting(
      () => fetchApi<Post[]>(`/posts/user/${userId}?userId=${userId}`, options),
      'postService',
      'getByUserId'
    ), // FIXME: Should be getByUsername
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

export const userService = {
  getInfo: (
    // FIXME: should get username as parameter
    userId: number = apiConfig.defaultUserId,
    options?: RequestInit
  ) =>
    withErrorReporting(() => fetchApi<User>(`/users/${userId}`, options), 'userService', 'getInfo'),
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
  me: () =>
    fetchApi<{ userId: number; username: string; email: string }>('/auth/me'),
};
