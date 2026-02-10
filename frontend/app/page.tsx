import Header from './Header.tsx';
import Post from './Post.tsx';

export default function Feed() {
  const posts = [{
    id: 1,
    name: "John Doe",
    username: "john",
    text: "Aspernatur dolorem eaque fuga quis quisquam deserunt quis. Deleniti perferendis voluptatibus accusantium a fugit. Occaecati illum necessitatibus maxime similique. Facilis est omnis eveniet ullam et beatae. Esse ut illo ad quis et dignissimos atque culpa.",
    likesCount: 1000
  }, {
    id: 2,
    name: "Another Guy",
    username: "huh",
    text: "Hello",
    likesCount: 69
  }];
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
	      posts.map(post =>
		<Post
		  key={post.id}
	          name={post.name}
                  username={post.username}
		  text={post.text}
		  likesCount={post.likesCount}
	        />
	      )
	    }
	  </div>
	</div>
      </div>
    </div>
  );
}
