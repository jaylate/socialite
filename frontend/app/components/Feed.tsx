import { postService } from '@/lib/api';
import PostCard from './PostCard';
import type { Post } from '@/lib/types';

export default async function Feed() {
  let posts: Post[];

  try {
    posts = await postService.getAll(undefined, { next: { tags: ['posts'] } } as RequestInit);
  } catch (error) {
    console.error('Failed to fetch posts:', error);
    return <div>Error loading posts</div>;
  }

  return (
    <div className="mt-10 flex-col space-y-5">
      {posts.map((post) => (
        <PostCard key={post.id} {...post} />
      ))}
    </div>
  );
}
