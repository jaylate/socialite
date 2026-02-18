'use client';

import { useState } from 'react';
import { postService } from '@/lib/api';
import type { LikeSectionProps } from '@/lib/types';

export default function LikeSection({
  postId,
  likesCount: initialLikesCount,
  isLikedByCurrentUser: initialLiked,
}: LikeSectionProps) {
  const [likesCount, setLikesCount] = useState(initialLikesCount);
  const [isLikedByCurrentUser, setIsLikedByCurrentUser] = useState(initialLiked);
  const [isLoading, setIsLoading] = useState(false);

  const handleLike = async () => {
    setIsLoading(true);
    const previousLikeState = isLikedByCurrentUser;
    setIsLikedByCurrentUser(!isLikedByCurrentUser);

    try {
      await postService.likePostId(previousLikeState, postId);

      setLikesCount(await postService.getLikesForPostId(postId));
    } catch (err) {
      setIsLikedByCurrentUser(previousLikeState);
      console.error(`Error updating like status for post ${postId}:`, err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="flex items-center gap-2">
      <button
        type="button"
        onClick={handleLike}
        className="cursor-pointer disabled:opacity-50"
        disabled={isLoading}
        aria-label={isLikedByCurrentUser ? 'Unlike post' : 'Like post'}
        aria-pressed={isLikedByCurrentUser}
        aria-busy={isLoading}
      >
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
      <span
        aria-label={`${likesCount} likes`}
        className="py-0.5 text-gray-600 dark:text-neutral-200"
      >
        {likesCount}
      </span>
    </section>
  );
}
