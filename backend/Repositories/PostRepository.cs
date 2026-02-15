using Microsoft.EntityFrameworkCore;
using Socialite.Data;
using Socialite.Models;
using Socialite.Repositories.Interfaces;

namespace Socialite.Repositories;

public class PostRepository : IPostRepository
{
    private readonly SocialiteContext _context;

    public PostRepository(SocialiteContext context)
    {
        _context = context;
    }

    public async Task<IEnumerable<Post>> GetAllAsync(int skip = 0, int take = 20)
    {
        return await _context.Posts
            .AsNoTracking()
            .Include(p => p.User)
            .Include(p => p.Likes)
            .OrderByDescending(p => p.CreatedAt)
            .Skip(skip)
            .Take(take)
            .ToListAsync();
    }

    public async Task<Post?> GetByIdAsync(int id)
    {
        return await _context.Posts
            .AsNoTracking()
            .Include(p => p.User)
            .Include(p => p.Likes)
            .FirstOrDefaultAsync(p => p.Id == id);
    }

    public async Task<IEnumerable<Post>> GetByUserIdAsync(int userId)
    {
        return await _context.Posts
            .AsNoTracking()
            .Include(p => p.User)
            .Include(p => p.Likes)
            .Where(p => p.UserId == userId)
            .OrderByDescending(p => p.CreatedAt)
            .ToListAsync();
    }

    public async Task<Post> CreateAsync(Post post)
    {
        post.CreatedAt = DateTime.UtcNow;
        post.UpdatedAt = DateTime.UtcNow;

        _context.Posts.Add(post);
        await _context.SaveChangesAsync();
        return post;
    }

    public async Task UpdateAsync(Post post)
    {
        Post? existingPost = await _context.Posts.FindAsync(post.Id);
        if (existingPost == null)
        {
            throw new InvalidOperationException($"Post with ID {post.Id} not found");
        }

        existingPost.Content = post.Content;
        existingPost.UpdatedAt = DateTime.UtcNow;

        await _context.SaveChangesAsync();
    }

    public async Task DeleteAsync(int id)
    {
        var post = await _context.Posts.FindAsync(id);
        if (post == null)
        {
            throw new InvalidOperationException($"Post with ID {id} not found");
        }

        _context.Posts.Remove(post);
        await _context.SaveChangesAsync();
    }

    public async Task<bool> ExistsAsync(int id)
    {
        return await _context.Posts.AnyAsync(p => p.Id == id);
    }
}
