using Socialite.Models;

namespace Socialite.Services;

public class UserService
{
    static List<User> Users { get; }
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

    public static void Add(User user)
    {
        Users.Add(user);
    }

    public static void Delete(int id)
    {
        var user = Get(id);
        if(user is null)
            return;

        Users.Remove(user);
    }

    public static void Update(User user)
    {
        var index = Users.FindIndex(p => p.Id == user.Id);
        if(index == -1)
            return;

        Users[index] = user;
    }
}
