'use client';

import LikeSection from './LikeSection';
import type { Post } from '@/lib/types';
import Link from 'next/link';
import { formatDistanceToNow } from 'date-fns';

export default function PostCard({
  id,
  content,
  authorName,
  authorUsername,
  likesCount,
  createdAt,
  isLikedByCurrentUser,
}: Post) {
  return (
    <article className="flex flex-col gap-2">
      <header className="flex items-center gap-4">
        <Link href={`/@${authorUsername}`} className="text-xl font-bold dark:text-neutral-100">
          {authorName ?? `@${authorUsername}`}
        </Link>

        {authorName && (
          <Link href={`/@${authorUsername}`} className="text-neutral-600 dark:text-neutral-300">
            @{authorUsername}
          </Link>
        )}
        <time dateTime={createdAt} className="text-neutral-500 dark:text-neutral-400">
          {formatDistanceToNow(new Date(createdAt), { addSuffix: true })}
        </time>
      </header>
      <Link
        href={`/post/${id}`}
        aria-label={`View post by ${authorName ?? authorUsername}`}
        className="block cursor-pointer"
      >
        <p className="px-2 text-lg break-words dark:text-neutral-300">{content}</p>
      </Link>
      <LikeSection
        postId={id}
        likesCount={likesCount}
        isLikedByCurrentUser={isLikedByCurrentUser}
      />
    </article>
  );
}
