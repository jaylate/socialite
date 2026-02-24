using Socialite.Models;
using Socialite.Repositories.Interfaces;

namespace Socialite.Services;

public class PostService
{
    private readonly IPostRepository _postRepository;
    private readonly IUserRepository _userRepository;

    public PostService(
    IPostRepository postRepository,
    IUserRepository userRepository)
    {
        _postRepository = postRepository;
        _userRepository = userRepository;
    }

    public async Task<IEnumerable<Post>> GetAllAsync(int skip = 0, int take = 20)
    {
        return await _postRepository.GetAllAsync(skip, take);
    }

    public async Task<IEnumerable<Post>> GetByUserIdAsync(int userId)
    {
        return await _postRepository.GetByUserIdAsync(userId);
    }

    public async Task<Post?> GetByIdAsync(int id)
    {
        return await _postRepository.GetByIdAsync(id);
    }

    public async Task<Post> AddAsync(int userId, string content)
    {
        if (!await _userRepository.ExistsAsync(userId))
        {
            throw new InvalidOperationException($"User with ID {userId} not found");
        }

        Post post = new Post
        {
            UserId = userId,
            Content = content
        };

        return await _postRepository.CreateAsync(post);
    }

    public async Task<bool> UpdateAsync(int id, string content)
    {
        Post? post = await _postRepository.GetByIdAsync(id);
        if (post is null)
        {
            return false;
        }

        post.Content = content;
        await _postRepository.UpdateAsync(post);
        return true;
    }

    public async Task<bool> DeleteAsync(int id)
    {
        if (!await _postRepository.ExistsAsync(id))
            return false;

        await _postRepository.DeleteAsync(id);
        return true;
    }
}
