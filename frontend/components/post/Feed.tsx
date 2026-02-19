import { postService } from '@/lib/api';
import PostCard from './PostCard';
import { InlineError } from '@/components/error';
import type { Post } from '@/lib/types';

export default async function Feed() {
  let posts: Post[];
  let errorMessage = '';

  try {
    posts = await postService.getAll(undefined, { next: { tags: ['posts'] } } as RequestInit);
  } catch {
    // FIXME: Backend might return more useful error in the future which may be included here
    errorMessage = 'Failed to load posts. Please try again later.';
    posts = [];
  }

  return (
    <>
      <InlineError message={errorMessage} className="mt-10" />
      {posts.length > 0 && (
        <div className="mt-10 flex-col space-y-5">
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
