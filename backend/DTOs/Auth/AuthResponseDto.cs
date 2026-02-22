namespace Socialite.DTOs.Auth;

public class AuthResponseDto
{
    public string? Username { get; set; }
    public string? AccessToken { get; set; }
    public int ExpiresIn { get; set; }
    public int UserId { get; set; }
    public string? Email { get; set; }
}
