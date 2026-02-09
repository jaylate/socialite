namespace Socialite.DTOs.Posts;

public record PostDto(
    int Id,
    int UserId,
    string Content,
    DateTime CreatedAt
);