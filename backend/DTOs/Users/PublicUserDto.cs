namespace Socialite.DTOs;

public record PublicUserDto(
    string Username,
    string? Name,
    string? Bio,
    DateTime CreatedAt
);
