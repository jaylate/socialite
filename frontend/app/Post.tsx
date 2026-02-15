'use client';

import { useState, useEffect } from 'react';

const LikeButton = ({ id, isLikedByCurrentUser: initialLiked, setLikesCount }) => {
  const [isLikedByCurrentUser, setIsLikedByCurrentUser] = useState(initialLiked);

  const handleLike = async () => {
    const previousLikeState = isLikedByCurrentUser;

    setIsLikedByCurrentUser(!isLikedByCurrentUser);
    try {
      const response = await fetch(`/api/v1/posts/${id}/likes?userId=1`, {
        method: previousLikeState ? 'DELETE' : 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (!response.ok) {
	throw new Error(`Failed to update like status`);
      }

      const likesCountResponse = await fetch(`/api/v1/posts/${id}/likes/count`);
      if (likesCountResponse.ok) {
        setLikesCount(parseInt(await likesCountResponse.text()));
      }
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
        fill={isLikedByCurrentUser ? "currentColor" : "none"}
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
};

export default function Post({ id, content, authorName, authorUsername, likesCount: initialLikesCount, isLikedByCurrentUser }) {
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
};
