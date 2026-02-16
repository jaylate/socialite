import PostComponent from './Post';
import type { Post as PostType } from '../types/post';

export default async function Feed() {
  try {
    const postsResponse = await fetch(`${process.env.baseUrl}/api/v1/posts?userId=1`);
    if (!postsResponse.ok) {
      throw new Error(`HTTP error when fetching posts: ${postsResponse.status}`);
    }

    const posts: PostType[] = await postsResponse.json();

    return (
      <div className="mt-10 flex-col space-y-5">
        {posts.map((post) => (
          <PostComponent key={post.id} {...post} />
        ))}
      </div>
    );
  } catch (error) {
    console.error('Failed to fetch posts:', error);
    return <div>Error loading posts</div>;
  }
}
