using Microsoft.EntityFrameworkCore;
using Socialite.Data;
using Socialite.Models;
using Socialite.Repositories.Interfaces;

namespace Socialite.Repositories;

public class LikeRepository : ILikeRepository
{
    private readonly SocialiteContext _context;

    public LikeRepository(SocialiteContext context)
    {
        _context = context;
    }

    public async Task<IEnumerable<Like>> GetAllAsync()
    {
        return await _context.Likes
            .AsNoTracking()
            .Include(l => l.User)
            .Include(l => l.Post)
            .OrderByDescending(l => l.CreatedAt)
            .ToListAsync();
    }

    public async Task<Like?> GetByIdAsync(int id)
    {
        return await _context.Likes
            .AsNoTracking()
            .Include(l => l.User)
            .Include(l => l.Post)
            .FirstOrDefaultAsync(l => l.Id == id);
    }

    public async Task<IEnumerable<Like>> GetByPostIdAsync(int postId)
    {
        return await _context.Likes
            .AsNoTracking()
            .Include(l => l.User)
            .Where(l => l.PostId == postId)
            .OrderByDescending(l => l.CreatedAt)
            .ToListAsync();
    }

    public async Task<IEnumerable<Like>> GetByUserIdAsync(int userId)
    {
        return await _context.Likes
            .AsNoTracking()
            .Include(l => l.Post)
            .Where(l => l.UserId == userId)
            .OrderByDescending(l => l.CreatedAt)
            .ToListAsync();
    }

    public async Task<int> GetCountByPostIdAsync(int postId)
    {
        return await _context.Likes
            .CountAsync(l => l.PostId == postId);
    }

    public async Task<bool> ExistsAsync(int postId, int userId)
    {
        return await _context.Likes
            .AnyAsync(l => l.PostId == postId && l.UserId == userId);
    }

    public async Task<Like> CreateAsync(Like like)
    {
        like.CreatedAt = DateTime.UtcNow;
        _context.Likes.Add(like);
        await _context.SaveChangesAsync();
        return like;
    }

    public async Task DeleteAsync(int id)
    {
        var like = await _context.Likes.FindAsync(id);
        if (like == null)
        {
            throw new InvalidOperationException($"Like with ID {id} not found");
        }

        _context.Likes.Remove(like);
        await _context.SaveChangesAsync();
    }

    public async Task DeleteByPostAndUserAsync(int postId, int userId)
    {
        var like = await _context.Likes
            .FirstOrDefaultAsync(l => l.PostId == postId && l.UserId == userId);

        if (like == null)
        {
            throw new InvalidOperationException("Like not found for this user and post");
        }

        _context.Likes.Remove(like);
        await _context.SaveChangesAsync();
    }
}
