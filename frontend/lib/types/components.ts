export type LikeSectionProps = {
  postId: number;
  likesCount: number;
  isLikedByCurrentUser: boolean;
};

export interface InlineErrorProps {
  message?: string;
  className?: string;
}
