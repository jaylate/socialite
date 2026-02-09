using Socialite.Models;

namespace Socialite.Services;

public class LikeService
{
    static List<Like> Likes { get; }
    static LikeService()
    {
	Likes = new List<Like>
	{
	    new Like { Id = 1, UserId = 2, PostId = 1 }
	};
    }

    public static List<Like> GetAll() => Likes;
    public static Like? Get(int id) => Likes.FirstOrDefault(p => p.Id == id);

    public static void Add(Like like)
    {
        Likes.Add(like);
    }

    public static void Delete(int id)
    {
        var like = Get(id);
        if(like is null)
            return;

        Likes.Remove(like);
    }

    public static void Update(Like like)
    {
        var index = Likes.FindIndex(p => p.Id == like.Id);
        if(index == -1)
            return;

        Likes[index] = like;
    }
}
