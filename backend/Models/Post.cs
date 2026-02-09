namespace Socialite.Models;

public class Post
{
    public int Id { get; set; }
    public int UserId { get; set; }

    // TODO: Add file support in the future
    public required string Content { get; set; }

    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    public DateTime UpdatedAt { get; set; } = DateTime.UtcNow;
}
