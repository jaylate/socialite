import fetchApi from './fetchApi';
import { withErrorReporting } from '@/lib/errors';
import type { User, Post, CreatePostRequest, LikeResponse } from '@/lib/types';
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
  getAll: (skip: number = 0, limit: number = 20, options?: RequestInit) =>
    withErrorReporting(
      () => fetchApi<Post[]>(`/posts?skip=${skip}&limit=${limit}`, options),
      'postService',
      'getAll'
    ),
  getById: (postId: number, options?: RequestInit) =>
    withErrorReporting(() => fetchApi<Post>(`/posts/${postId}`, options), 'postService', 'getById'),
  getByUser: (username: string, skip: number = 0, limit: number = 20, options?: RequestInit) =>
    withErrorReporting(
      () => fetchApi<Post[]>(`/posts/user/${username}?skip=${skip}&limit=${limit}`, options),
      'postService',
      'getByUser'
    ),
  getLikesForPostId: (postId: number, options?: RequestInit) =>
    withErrorReporting(
      () => fetchApi<number>(`/posts/${postId}/likes/count`, options),
      'postService',
      'getLikesForPostId'
    ),
  likePostId: (previousLikeState: boolean, postId: number, options?: RequestInit) =>
    withErrorReporting(
      () =>
        fetchApi<LikeResponse>(`/posts/${postId}/likes`, {
          method: previousLikeState ? 'DELETE' : 'POST',
          ...options,
        }),
      'postService',
      'likePostId'
    ),
  addPost: (content: CreatePostRequest, options?: RequestInit) =>
    withErrorReporting(
      () =>
        fetchApi<null>(`/posts/`, {
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
