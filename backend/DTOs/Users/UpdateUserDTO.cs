namespace Socialite.DTOs;

public record UpdateUserDto(
    string Username,
    string? Name,
    string? Bio
);
