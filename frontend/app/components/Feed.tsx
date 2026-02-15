import Post from './Post';
import type { Post } from '@/types';

export default async function Feed() {
  try {
    const postsResponse = await fetch(`${process.env.baseUrl}/api/v1/posts?userId=1`);
    if (!postsResponse.ok) {
      throw new Error(`HTTP error when fetching posts: ${postsResponse.status}`);
    }

    const posts: Post[] = await postsResponse.json();

    return (
      <div className="flex-col mt-10 space-y-5">
        {posts.map(post => (
            <Post key={post.id} {...post} />
	))};
      </div>
    );
  } catch (error) {
    console.error("Failed to fetch posts:", error);
    return (
      <div>Error loading posts</div>
    );
  }
}
