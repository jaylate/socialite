using Socialite.Models;
using Socialite.Repositories.Interfaces;

namespace Socialite.Services;

public class UserService
{
    private readonly IUserRepository _userRepository;

    public UserService(IUserRepository userRepository)
    {
        _userRepository = userRepository;
    }

    public async Task<IEnumerable<User>> GetAllAsync()
    {
	return await _userRepository.GetAllAsync();
    }

    public async Task<User?> GetByIdAsync(int id)
    {
	return await _userRepository.GetByIdAsync(id);
    }

    public async Task<User> AddAsync(User user)
    {
        return await _userRepository.CreateAsync(user);
    }

    public async Task<bool> UpdateAsync(int id, string username, string? name, string? bio, string? email)
    {
        User? user = await _userRepository.GetByIdAsync(id);
        if (user == null)
            return false;
        
        user.Username = username;
        
        if (name is not null)
            user.Name = name;
    
        if (bio is not null)
            user.Bio = bio;

	if (email is not null)
	    user.Email = email;
    
        await _userRepository.UpdateAsync(user);
        return true;
    }

    public async Task<bool> DeleteAsync(int id)
    {
        if (!await _userRepository.ExistsAsync(id))
            return false;
    
        await _userRepository.DeleteAsync(id);
        return true;
    }
}
