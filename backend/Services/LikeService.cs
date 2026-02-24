using Socialite.Models;
using Socialite.Repositories.Interfaces;

namespace Socialite.Services;

public class LikeService
{
    private readonly ILikeRepository _likeRepository;

    public LikeService(ILikeRepository likeRepository)
    {
        _likeRepository = likeRepository;
    }

    public async Task<IEnumerable<Like>> GetByPostAsync(int postId)
    {
        return await _likeRepository.GetByPostIdAsync(postId);
    }

    public async Task<bool> IsLikedAsync(int userId, int postId)
    {
        return await _likeRepository.ExistsAsync(postId, userId);
    }

    public async Task<int> GetCountAsync(int postId)
    {
        return await _likeRepository.GetCountByPostIdAsync(postId);
    }

    public async Task<Like?> AddAsync(int userId, int postId)
    {
        if (await IsLikedAsync(userId, postId))
            return null;

        Like like = new Like
        {
            UserId = userId,
            PostId = postId
        };

        return await _likeRepository.CreateAsync(like);
    }

    public async Task<bool> DeleteAsync(int userId, int postId)
    {
        try
        {
            await _likeRepository.DeleteByPostAndUserAsync(postId, userId);
            return true;
        }
        catch (InvalidOperationException)
        {
            return false;
        }
    }
}
