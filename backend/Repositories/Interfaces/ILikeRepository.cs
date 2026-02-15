using Socialite.Models;

namespace Socialite.Repositories.Interfaces;

public interface ILikeRepository
{
    Task<IEnumerable<Like>> GetAllAsync();
    Task<Like?> GetByIdAsync(int id);
    Task<IEnumerable<Like>> GetByPostIdAsync(int postId);
    Task<IEnumerable<Like>> GetByUserIdAsync(int userId);
    Task<int> GetCountByPostIdAsync(int postId);
    Task<bool> ExistsAsync(int postId, int userId);
    Task<Like> CreateAsync(Like like);
    Task DeleteAsync(int id);
    Task DeleteByPostAndUserAsync(int postId, int userId);
}
