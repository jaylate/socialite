'use client';

import { useState } from 'react';
import { postService } from '@/lib/api';
import type { LikeButtonProps } from '@/lib/types';

export default function LikeButton({
  id,
  isLikedByCurrentUser: initialLiked,
  setLikesCount,
}: LikeButtonProps) {
  const [isLikedByCurrentUser, setIsLikedByCurrentUser] = useState(initialLiked);

  const handleLike = async () => {
    const previousLikeState = isLikedByCurrentUser;

    setIsLikedByCurrentUser(!isLikedByCurrentUser);
    try {
      await postService.likePostId(previousLikeState, id);

      setLikesCount(await postService.getLikesForPostId(id));
    } catch (err) {
      setIsLikedByCurrentUser(previousLikeState);
      console.error(`Error updating like status for post ${id}:`, err);
    }
  };

  return (
    <button onClick={handleLike}>
      <svg
        className="text-gray-800 dark:text-white"
        aria-hidden="true"
        xmlns="http://www.w3.org/2000/svg"
        width="20"
        height="20"
        fill={isLikedByCurrentUser ? 'currentColor' : 'none'}
        viewBox="0 0 24 24"
      >
        <path
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M12.01 6.001C6.5 1 1 8 5.782 13.001L12.011 20l6.23-7C23 8 17.5 1 12.01 6.002Z"
        />
      </svg>
    </button>
  );
}
