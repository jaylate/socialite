export interface Post {
  id: number;
  content: string;
  authorName: string;
  authorUsername: string;
  likesCount: number;
  isLikedByCurrentUser: boolean;
}

export interface CreatePostRequest {
  content: string;
}
