namespace Socialite.Models;

public class User
{
    public int Id { get; set; }

    public required string Username { get; set; }

    public string? Name { get; set; }

    public required string Email { get; set; }

    public required string PasswordHash { get; set; }

    public string? Bio { get; set; }

    public bool IsAdmin { get; set; } = false;

    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    public DateTime UpdatedAt { get; set; } = DateTime.UtcNow;
}
