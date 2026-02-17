using System.ComponentModel.DataAnnotations;

namespace Socialite.DTOs.Posts;

public record CreatePostDto(
    [Required]
    [StringLength(2000, MinimumLength = 1)]
    string Content
);
