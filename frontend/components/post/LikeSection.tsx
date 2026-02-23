'use client';

import { useState, useEffect } from 'react';
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
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    setIsLikedByCurrentUser(initialLiked);
  }, [initialLiked]);

  const handleLike = async () => {
    if (isLoading) return;
    setIsLoading(true);
    setHasError(false);
    const previousLikeState = isLikedByCurrentUser;
    setIsLikedByCurrentUser(!isLikedByCurrentUser);

    try {
      await postService.likePostId(previousLikeState, postId);
      // FIXME: If getLikesForPostId fails after likePostId succeeds,
      // the like exists, on the server but UI reverts to previous state.
      // Should be fixed when backend will return information
      // about like operation either by just reporting success or likes count too
      setLikesCount(await postService.getLikesForPostId(postId));
    } catch {
      setHasError(true);
      setTimeout(() => {
        setHasError(false);
        setIsLikedByCurrentUser(previousLikeState);
      }, 1000);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="flex items-center gap-2">
      <button
        type="button"
        onClick={handleLike}
        className={`cursor-pointer disabled:opacity-50 ${hasError ? 'animate-shake' : ''} text-primary`}
        disabled={isLoading || hasError}
        aria-label={isLikedByCurrentUser ? 'Unlike post' : 'Like post'}
        aria-pressed={isLikedByCurrentUser}
        aria-busy={isLoading || hasError}
      >
        <svg
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
      <span aria-label={`${likesCount} likes`} className="text-secondary py-0.5">
        {likesCount}
      </span>
    </section>
  );
}
