using Socialite.Models;

namespace Socialite.Services;

public class UserService
{
    private static List<User> Users { get; }
    private static int _nextId = 3;
    static UserService()
    {
	Users = new List<User>
	    {
	        new User { Id = 1, Username = "admin", Name = "The Admin", Email = "admin@socialite.local", PasswordHash = "xxx", Bio = "Doing stuff that admins do", IsAdmin = true },
	        new User { Id = 2, Username = "john", Name = "John Doe", Email = "john@socialite.local", PasswordHash = "xxx" },
	    };
    }

    public static List<User> GetAll() => Users;
    public static User? Get(int id) => Users.FirstOrDefault(p => p.Id == id);

    public static User Add(User user)
    {
        user.Id = _nextId++;
        user.CreatedAt = DateTime.UtcNow;
        user.UpdatedAt = DateTime.UtcNow;

        Users.Add(user);
        return user;
    }

    public static void Delete(int id)
    {
        var user = Get(id);
        if(user is null)
            return;

        Users.Remove(user);
    }

    public static bool Update(int id, string username, string? name, string? bio)
    {
        var user = Get(id);
        if (user is null)
            return false;
        
        user.Username = username;
        
        if (name is not null)
            user.Name = name;

        if (bio is not null)
            user.Bio = bio;

        user.UpdatedAt = DateTime.UtcNow;
        return true;
    }
}
