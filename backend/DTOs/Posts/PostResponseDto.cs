namespace Socialite.DTOs.Posts;

public record PostResponseDto(
    int Id,
    string Content,
    string AuthorName,
    string AuthorUsername,
    int LikesCount,
    DateTime CreatedAt,
    bool IsLikedByCurrentUser = false
);
