using Socialite.Models;

namespace Socialite.Repositories.Interfaces;

public interface IPostRepository
{
    Task<IEnumerable<Post>> GetAllAsync(int skip = 0, int take = 20);
    Task<Post?> GetByIdAsync(int id);
    Task<IEnumerable<Post>> GetByUserIdAsync(int userId);
    Task<Post> CreateAsync(Post post);
    Task UpdateAsync(Post post);
    Task DeleteAsync(int id);
    Task<bool> ExistsAsync(int id);
}
