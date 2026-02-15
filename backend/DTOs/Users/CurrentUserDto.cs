namespace Socialite.DTOs;

public record CurrentUserDto(
    int Id,
    string Username,
    string? Name,
    string Email,
    string? Bio,
    bool IsAdmin,
    DateTime CreatedAt,
    DateTime UpdatedAt
);
