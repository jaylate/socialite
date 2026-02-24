using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using Socialite.Data;
using Socialite.DTOs.Auth;
using Socialite.Models;

namespace Socialite.Services;

public class JwtService
{
    private readonly IConfiguration _configuration;
    private readonly SocialiteContext _context;

    public JwtService(SocialiteContext context, IConfiguration configuration)
    {
        _context = context;
        _configuration = configuration;
    }

    public async Task<AuthResponseDto> AuthenticateAsync(LoginRequestDto request)
    {
        if (string.IsNullOrWhiteSpace(request.Username) || string.IsNullOrWhiteSpace(request.Password))
            return null;

        var UserAccount = await _context.Users.FirstOrDefaultAsync(x => x.Username == request.Username);
        if (UserAccount == null || !BCrypt.Net.BCrypt.Verify(request.Password, UserAccount.PasswordHash))
            return null;

        var issuer = _configuration["JwtConfig:Issuer"];
        var audience = _configuration["JwtConfig:Audience"];
        var key = _configuration["JwtConfig:Key"];
        var tokenValidityMins = _configuration.GetValue<int>("JwtConfig:TokenValidityMins");
        var tokenExpiryTimeStamp = DateTime.UtcNow.AddMinutes(tokenValidityMins);

        var tokenDescriptor = new SecurityTokenDescriptor
        {
            Subject = new ClaimsIdentity(new[]
            {
                new Claim(JwtRegisteredClaimNames.Name, request.Username),
                new Claim(ClaimTypes.NameIdentifier, UserAccount.Id.ToString())
            }),
            Issuer = issuer,
            Expires = tokenExpiryTimeStamp,
            Audience = audience,
            SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(Encoding.ASCII.GetBytes(key)),
                SecurityAlgorithms.HmacSha512Signature)
        };

        var tokenHandler = new JwtSecurityTokenHandler();
        var securityToken = tokenHandler.CreateToken(tokenDescriptor);
        var accessToken = tokenHandler.WriteToken(securityToken);

        return new AuthResponseDto
        {
            Username = UserAccount.Username,
            UserId = UserAccount.Id,
            Email = UserAccount.Email,
            AccessToken = accessToken,
            ExpiresIn = tokenValidityMins
        };

    }

    public async Task<AuthResponseDto> RegisterAsync(RegisterRequestDto request)
    {
        if (string.IsNullOrWhiteSpace(request.Username) ||
            string.IsNullOrWhiteSpace(request.Email) ||
            string.IsNullOrWhiteSpace(request.Password))
            return null;

        if (await _context.Users.AnyAsync(x => x.Username == request.Username))
            return null;

        if (await _context.Users.AnyAsync(x => x.Email == request.Email))
            return null;

        var passwordHash = BCrypt.Net.BCrypt.HashPassword(request.Password);

        var user = new User
        {
            Username = request.Username,
            Email = request.Email,
            PasswordHash = passwordHash,
            CreatedAt = DateTime.UtcNow,
            UpdatedAt = DateTime.UtcNow
        };

        _context.Users.Add(user);
        await _context.SaveChangesAsync();

        var issuer = _configuration["JwtConfig:Issuer"];
        var audience = _configuration["JwtConfig:Audience"];
        var key = _configuration["JwtConfig:Key"];
        var tokenValidityMins = _configuration.GetValue<int>("JwtConfig:TokenValidityMins");
        var tokenExpiryTimeStamp = DateTime.UtcNow.AddMinutes(tokenValidityMins);

        var tokenDescriptor = new SecurityTokenDescriptor
        {
            Subject = new ClaimsIdentity(new[]
            {
                new Claim(JwtRegisteredClaimNames.Name, request.Username),
                new Claim(ClaimTypes.NameIdentifier, user.Id.ToString())

            }),
            Issuer = issuer,
            Expires = tokenExpiryTimeStamp,
            Audience = audience,
            SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(Encoding.ASCII.GetBytes(key)),
                SecurityAlgorithms.HmacSha512Signature)
        };

        var tokenHandler = new JwtSecurityTokenHandler();
        var securityToken = tokenHandler.CreateToken(tokenDescriptor);
        var accessToken = tokenHandler.WriteToken(securityToken);

        return new AuthResponseDto
        {
            Username = user.Username,
            UserId = user.Id,
            Email = user.Email,
            AccessToken = accessToken,
            ExpiresIn = tokenValidityMins
        };
    }

    public async Task<User?> GetUserByIdAsync(int userId)
    {
        return await _context.Users.FindAsync(userId);
    }
}
