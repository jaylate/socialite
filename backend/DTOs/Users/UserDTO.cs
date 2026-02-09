namespace Socialite.DTOs;

public record UserDto(
    int Id,
    string Username,
    string? Name,
    string Email,
    string? Bio,
    bool IsAdmin,
    DateTime CreatedAt
);