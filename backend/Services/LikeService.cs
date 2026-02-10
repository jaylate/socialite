using Socialite.Models;

namespace Socialite.Services;

public static class LikeService
{
    private static readonly List<Like> Likes;

    static LikeService()
    {
        Likes = new List<Like>
        {
            new Like { Id = 1, UserId = 2, PostId = 1 }
        };
    }

    public static List<Like> GetAll() => Likes;

    public static List<Like> GetByPost(int postId) =>
        Likes.Where(l => l.PostId == postId).ToList();

    public static bool IsLiked(int userId, int postId) =>
        Likes.Any(l => l.UserId == userId && l.PostId == postId);

    public static int GetCount(int postId) =>
        Likes.Count(l => l.PostId == postId);

    public static Like? Add(int userId, int postId)
    {
        if (IsLiked(userId, postId))
            return null;

        var like = new Like
        {
            Id = Likes.Count == 0 ? 1 : Likes.Max(l => l.Id) + 1,
            UserId = userId,
            PostId = postId
        };

        Likes.Add(like);
        return like;
    }

    public static bool Delete(int userId, int postId)
    {
        var like = Likes.FirstOrDefault(
            l => l.UserId == userId && l.PostId == postId
        );

        if (like is null)
            return false;

        Likes.Remove(like);
        return true;
    }
}