'use client';

import LikeButton from './LikeButton';
import type { Post } from '@/types';
import { useState } from 'react';

export default function Post({
  id,
  content,
  authorName,
  authorUsername,
  likesCount: initialLikesCount,
  isLikedByCurrentUser
} : Post) {
  const [likesCount, setLikesCount] = useState(initialLikesCount);

  return (
    <div className="flex-col">
      <div className="flex">
        <span className="font-bold text-xl py-1 dark:text-neutral-100">{authorName}</span>
        <span className="text-gray-600 text-md ml-4 py-1.5 dark:text-neutral-300">@{authorUsername}</span>
      </div>
      <div className="my-1 mb-3 px-2 text-[18px] dark:text-neutral-300">{content}</div>
      <div className="flex">
        <div className="flex">
          <div className="py-1">
	    <LikeButton
	      id={id}
	      isLikedByCurrentUser={isLikedByCurrentUser}
	      setLikesCount={setLikesCount}
	    />
          </div>
          <span className="ml-2 text-gray-600 dark:text-neutral-200 py-0.5">{likesCount}</span>
        </div>
      </div>
    </div>
  );
}
