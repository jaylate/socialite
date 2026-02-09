using Socialite.Models;

namespace Socialite.Services;

public class PostService
{
    static List<Post> Posts { get; }
    static PostService()
    {
	Posts = new List<Post>
	{
	    new Post { Id = 1, UserId = 1, Content = "Hello, World!" },
	    new Post { Id = 2, UserId = 2, Content = "Hello, Another World!" },

	};
    }

    public static List<Post> GetAll() => Posts;
    public static Post? Get(int id) => Posts.FirstOrDefault(p => p.Id == id);

    public static void Add(Post post)
    {
        Posts.Add(post);
    }

    public static void Delete(int id)
    {
        var post = Get(id);
        if(post is null)
            return;

        Posts.Remove(post);
    }

    public static void Update(Post post)
    {
        var index = Posts.FindIndex(p => p.Id == post.Id);
        if(index == -1)
            return;

        Posts[index] = post;
    }
}
