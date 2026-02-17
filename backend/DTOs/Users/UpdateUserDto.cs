using System.ComponentModel.DataAnnotations;

namespace Socialite.DTOs;

public record UpdateUserDto(
    [Required]
    [StringLength(50, MinimumLength = 1)]
    string Username,

    [StringLength(100)]
    string? Name,

    [StringLength(500)]
    string? Bio,

    [EmailAddress]
    [StringLength(255)]
    string? Email
);
