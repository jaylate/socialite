'use client';

import { useState, useEffect, useCallback } from 'react';
import PostCard from './PostCard';
import FeedSkeleton from './FeedSkeleton';
import { InlineError } from '@/components/error';
import { postService } from '@/lib/api';
import type { FeedProps } from '@/lib/types/components';
import type { Post } from '@/lib/types';

export default function Feed(props: FeedProps) {
  const [posts, setPosts] = useState<Post[] | null>(null);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    const loadPosts = () => {
      const fetchPosts =
        props.type === 'user' && props.username
          ? postService.getByUser(props.username)
          : postService.getAll();

      fetchPosts
        .then((data) => {
          setPosts(data);
          setErrorMessage('');
        })
        .catch(() => {
          setErrorMessage('Failed to load posts. Please try again later.');
          setPosts([]);
        });
    };

    loadPosts();
    const handlePostCreated = () => loadPosts();
    const handleAuthChange = () => loadPosts();

    window.addEventListener('post-created', handlePostCreated);
    window.addEventListener('auth-change', handleAuthChange);

    return () => {
      window.removeEventListener('post-created', handlePostCreated);
      window.removeEventListener('auth-change', handleAuthChange);
    };
  }, []);

  if (posts === null) {
    return <FeedSkeleton />;
  }

  return (
    <>
      <InlineError message={errorMessage} className="mt-10" />
      {posts.length > 0 ? (
        <div className="layout-feed">
          {posts.map((post) => (
            <div key={post.id} className="animate-fade-in-up">
              <PostCard {...post} />
            </div>
          ))}
        </div>
      ) : (
        <div className="layout-feed text-muted">No posts yet</div>
      )}
    </>
  );
}
