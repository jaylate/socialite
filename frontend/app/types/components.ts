export interface LikeButtonProps {
  id: number;
  isLikedByCurrentUser: boolean;
  setLikesCount: React.Dispatch<React.SetStateAction<number>>;
}
