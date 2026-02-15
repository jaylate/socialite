using System.ComponentModel.DataAnnotations;

namespace Socialite.Models;

public class User
{
    public int Id { get; set; }

    [Required]
    [StringLength(50, MinimumLength = 1)]
    public required string Username { get; set; }

    [StringLength(100)]
    public string? Name { get; set; }

    [Required]
    [EmailAddress]
    [StringLength(255)]
    public required string Email { get; set; }

    [Required]
    [StringLength(255)]
    public required string PasswordHash { get; set; }

    [StringLength(500)]
    public string? Bio { get; set; }

    public bool IsAdmin { get; set; } = false;

    public ICollection<Post> Posts { get; set; } = new List<Post>();
    public ICollection<Like> Likes { get; set; } = new List<Like>();

    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    public DateTime UpdatedAt { get; set; } = DateTime.UtcNow;
}
