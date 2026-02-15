using System.ComponentModel.DataAnnotations;

namespace Socialite.Models;

public class Post
{
    public int Id { get; set; }
    public int UserId { get; set; }
    public User User { get; set; } = null!;
    public ICollection<Like> Likes { get; set; } = new List<Like>();

    // TODO: Add file support in the future
    [Required]
    [StringLength(2000, MinimumLength = 1)]
    public required string Content { get; set; }

    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    public DateTime UpdatedAt { get; set; } = DateTime.UtcNow;
}
