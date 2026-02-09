using Socialite.Models;

namespace Socialite.Services;

public class PostService
{
    private static List<Post> Posts { get; }
    private static int _nextId = 3;

    static PostService()
    {
        Posts = new List<Post>
        {
            new Post { Id = 1, UserId = 1, Content = "Hello, World!" },
            new Post { Id = 2, UserId = 2, Content = "Hello, Another World!" }
        };
    }

    public static List<Post> GetAll() => Posts;

    public static Post? Get(int id) => Posts.FirstOrDefault(p => p.Id == id);

    public static Post Add(int userId, string content)
    {
        var post = new Post
        {
            Id = _nextId++,
            UserId = userId,
            Content = content,
            CreatedAt = DateTime.UtcNow,
            UpdatedAt = DateTime.UtcNow
        };

        Posts.Add(post);
        return post;
    }

    public static bool Update(int id, string content)
    {
        var post = Get(id);
        if (post is null)
            return false;

        post.Content = content;
        post.UpdatedAt = DateTime.UtcNow;
        return true;
    }

    public static bool Delete(int id)
    {
        var post = Get(id);
        if (post is null)
            return false;

        Posts.Remove(post);
        return true;
    }
}