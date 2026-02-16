import { postService } from '@/lib/api';
import PostComponent from './Post';
import type { Post as PostType } from '@/lib/types';

export default async function Feed() {
  let posts: PostType[];

  try {
    posts = await postService.getAll();
  } catch (error) {
    console.error('Failed to fetch posts:', error);
    return <div>Error loading posts</div>;
  }

  return (
    <div className="mt-10 flex-col space-y-5">
      {posts.map((post) => (
        <PostComponent key={post.id} {...post} />
      ))}
    </div>
  );
}
