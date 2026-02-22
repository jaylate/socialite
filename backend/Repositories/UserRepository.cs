using Microsoft.EntityFrameworkCore;
using Socialite.Data;
using Socialite.Models;
using Socialite.Repositories.Interfaces;

namespace Socialite.Repositories;

public class UserRepository : IUserRepository
{
    private readonly SocialiteContext _context;

    public UserRepository(SocialiteContext context)
    {
        _context = context;
    }

    public async Task<IEnumerable<User>> GetAllAsync()
    {
        return await _context.Users
            .AsNoTracking()
            .OrderBy(u => u.Username)
            .ToListAsync();
    }

    public async Task<User?> GetByIdAsync(int id)
    {
        return await _context.Users
            .AsNoTracking()
            .FirstOrDefaultAsync(u => u.Id == id);
    }

    public async Task<User?> GetByUsernameAsync(string username)
    {
        return await _context.Users
            .AsNoTracking()
            .FirstOrDefaultAsync(u => u.Username.ToLower() == username.ToLower());
    }

    public async Task<User?> GetByEmailAsync(string email)
    {
        return await _context.Users
            .AsNoTracking()
            .FirstOrDefaultAsync(u => u.Email.ToLower() == email.ToLower());
    }

    public async Task<User> CreateAsync(User user)
    {
        user.CreatedAt = DateTime.UtcNow;
        user.UpdatedAt = DateTime.UtcNow;

        _context.Users.Add(user);
        await _context.SaveChangesAsync();
        return user;
    }

    public async Task UpdateAsync(User user)
    {
        var existingUser = await _context.Users.FindAsync(user.Id);
        if (existingUser == null)
        {
            throw new InvalidOperationException($"User with ID {user.Id} not found");
        }

        existingUser.Username = user.Username;
        existingUser.Name = user.Name;
        existingUser.Email = user.Email;
        existingUser.Bio = user.Bio;
        existingUser.IsAdmin = user.IsAdmin;
        existingUser.UpdatedAt = DateTime.UtcNow;

        if (!string.IsNullOrEmpty(user.PasswordHash))
        {
            existingUser.PasswordHash = user.PasswordHash;
        }

        await _context.SaveChangesAsync();
    }

    public async Task DeleteAsync(int id)
    {
        var user = await _context.Users.FindAsync(id);
        if (user == null)
        {
            throw new InvalidOperationException($"User with ID {id} not found");
        }

        _context.Users.Remove(user);
        await _context.SaveChangesAsync();
    }

    public async Task DeleteByUsernameAsync(string username)
    {
        var user = await _context.Users.FirstOrDefaultAsync(u => u.Username.ToLower() == username.ToLower());
        if (user == null)
        {
            throw new InvalidOperationException($"User with username '{username}' not found");
        }

        _context.Users.Remove(user);
        await _context.SaveChangesAsync();
    }

    public async Task<bool> ExistsAsync(int id)
    {
        return await _context.Users.AnyAsync(u => u.Id == id);
    }

    public async Task<bool> ExistsByUsernameAsync(string username)
    {
        return await _context.Users.AnyAsync(u => u.Username.ToLower() == username.ToLower());
    }

    public async Task<bool> UsernameExistsAsync(string username)
    {
        return await _context.Users.AnyAsync(u => u.Username.ToLower() == username.ToLower());
    }

    public async Task<bool> EmailExistsAsync(string email)
    {
        return await _context.Users.AnyAsync(u => u.Email.ToLower() == email.ToLower());
    }
}
