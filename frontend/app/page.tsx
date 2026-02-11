import Header from './Header.tsx';
import Post from './Post.tsx';

export default function Feed() {
  const fetchPosts = async () => {
    try {
      const postsResponse = await fetch(`${process.env.baseUrl}/api/v1/posts`);
      if (!postsResponse.ok) {
        throw new Error(`HTTP error: ${postsResponse.status}`);
      }
      const posts = await postsResponse.json();

      const postsData = await Promise.all(
	posts.map(async post => {
	  const userResponse = await fetch(`${process.env.baseUrl}/api/v1/users/${post.userId}`);
	  const userData = await userResponse.json();

	  const likesResponse = await fetch(`${process.env.baseUrl}/api/v1/likes/${post.id}`);
	  const likesData = await likesResponse.text();

	  return {
	    id: post.id,
	    fullname: userData.name,
	    username: userData.username,
	    content: post.content,
	    likesCount: Number(likesData) ?? 0,
	  };
        })
      );

      return postsData;
    } catch (error) {
      console.error("Failed to fetch posts:", error);
      throw error;
    }
  };

  return (
    <div className="mx-auto max-w-7xl">
      <Header />
      <div className="px-50">
        <div className="mx-auto">
	  <div>
	    <textarea className="rounded-2xl border-2 border-neutral-200 shadow-xl focus:outline-none focus:border-neutral-200 focus:shadow-xl/20 dark:border-neutral-400 dark:bg-neutral-200 w-full h-50 text-xl pt-3 pl-4 resize-none" placeholder="Post"></textarea>
	    <div className="flex justify-between">
	      <div>
	      </div>
              <button className="justify-end rounded-full bg-neutral-950 py-3 px-6 mt-3 mx-1 text-neutral-200 font-bold">Post</button>
	    </div>
	  </div>
	  <div className="flex-col mt-10 space-y-5">
	    {
	      fetchPosts().then(posts => posts.map(post =>
		<Post
		  key={post.id}
	          fullname={post.fullname}
                  username={post.username}
		  content={post.content}
		  likesCount={post.likesCount}
	        />
	      ))
	    }
	  </div>
	</div>
      </div>
    </div>
  );
}
