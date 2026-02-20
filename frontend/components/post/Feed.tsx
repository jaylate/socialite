import PostCard from './PostCard';
import { InlineError } from '@/components/error';
import type { Post, FeedProps } from '@/lib/types';

export default async function Feed({ fetchPosts }: FeedProps) {
  let posts: Post[];
  let errorMessage = '';

  try {
    posts = await fetchPosts();
  } catch {
    errorMessage = 'Failed to load posts. Please try again later.';
    posts = [];
  }

  return (
    <>
      <InlineError message={errorMessage} className="mt-10" />
      {posts.length > 0 && (
        <div className="layout-feed">
          {posts.map((post) => (
            <div key={post.id} className="animate-fade-in-up">
              <PostCard {...post} />
            </div>
          ))}
        </div>
      )}
    </>
  );
}
