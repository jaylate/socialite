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
    <article className="layout-post-card">
      <header className="layout-post-header">
        <Link href={`/@${authorUsername}`} className="text-primary text-xl font-bold">
          {authorName ?? `@${authorUsername}`}
        </Link>

        {authorName && (
          <Link href={`/@${authorUsername}`} className="text-secondary">
            @{authorUsername}
          </Link>
        )}
        <time dateTime={createdAt} className="text-muted">
          {formatDistanceToNow(new Date(createdAt), { addSuffix: true })}
        </time>
      </header>
      <Link
        href={`/post/${id}`}
        aria-label={`View post by ${authorName ?? authorUsername}`}
        className="block cursor-pointer"
      >
        <p className="text-secondary px-2 text-lg break-words">{content}</p>
      </Link>
      <LikeSection
        postId={id}
        likesCount={likesCount}
        isLikedByCurrentUser={isLikedByCurrentUser}
      />
    </article>
  );
}
