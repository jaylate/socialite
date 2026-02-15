import Header from './Header.tsx';
import Post from './Post.tsx';

export default function Feed() {
  const fetchPosts = async () => {
    try {
      const postsResponse = await fetch(`${process.env.baseUrl}/api/v1/posts?userId=1`);
      if (!postsResponse.ok) {
        throw new Error(`HTTP error when fetching posts: ${postsResponse.status}`);
      }
      return await postsResponse.json();
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
		  id={post.id}
		  content={post.content}
	          authorName={post.authorName}
                  authorUsername={post.authorUsername}
		  likesCount={post.likesCount}
		  isLikedByCurrentUser={post.isLikedByCurrentUser}
	        />
	      ))
	    }
	  </div>
	</div>
      </div>
    </div>
  );
}
