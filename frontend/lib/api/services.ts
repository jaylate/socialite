import { apiConfig } from './config';
import fetchApi from './fetchApi';
import { withErrorReporting } from '@/lib/errors';
import type { User, Post, CreatePostRequest } from '@/lib/types';
import type { LoginRequest, RegisterRequest, AuthResponse, UserResponse } from '@/lib/types';

async function fetchWithRetry<T>(fn: () => Promise<T>, retries = 5, delayMs = 1000): Promise<T> {
  for (let i = 0; i < retries; i++) {
    try {
      return await fn();
    } catch (e) {
      if (i === retries - 1) throw e;
      await new Promise((r) => setTimeout(r, delayMs));
    }
  }
  throw new Error('Failed after retries');
}

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
  getByUser: (username: string, options?: RequestInit) =>
    withErrorReporting(
      () => fetchApi<Post[]>(`/posts/user/${username}`, options),
      'postService',
      'getByUser'
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

export const userService = {
  getInfo: (username: string, options?: RequestInit) =>
    withErrorReporting(
      () => fetchApi<User>(`/users/${username}`, options),
      'userService',
      'getInfo'
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
  me: () =>
    withErrorReporting(
      () => fetchWithRetry(() => fetchApi<UserResponse>('/auth/me')),
      'authService',
      'me'
    ),
  logout: () =>
    withErrorReporting(
      () => fetchApi<void>('/auth/logout', { method: 'POST' }),
      'authService',
      'logout'
    ),
};
