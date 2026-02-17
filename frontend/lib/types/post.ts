export type Post = {
  id: number;
  content: string;
  authorName: string;
  authorUsername: string;
  likesCount: number;
  createdAt: string; // FIXME: Should be Date
  isLikedByCurrentUser: boolean;
};

export interface CreatePostRequest {
  content: string;
}
