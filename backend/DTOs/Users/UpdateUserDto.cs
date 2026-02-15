using System.ComponentModel.DataAnnotations;

namespace Socialite.DTOs;

public record UpdateUserDto(
    [property: Required]
    [property: StringLength(50, MinimumLength = 1)]
    string Username,

    [property: StringLength(100)]
    string? Name,

    [property: StringLength(500)]
    string? Bio,

    [property: EmailAddress]
    [property: StringLength(255)]
    string? Email
);
