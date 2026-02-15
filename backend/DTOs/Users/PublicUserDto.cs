namespace Socialite.DTOs;

public record PublicUserDto(
    int Id,
    string Username,
    string? Name,
    string? Bio,
    DateTime CreatedAt
);
