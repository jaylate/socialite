using System.Security.Claims;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Http;
using Socialite.DTOs.Auth;
using Socialite.Services;

namespace Socialite.Controllers;

[ApiController]
[Route("api/v1/[controller]")]
public class AuthController : ControllerBase
{
    private readonly JwtService _jwtService;

    public AuthController(JwtService jwtService) => _jwtService = jwtService;

    [HttpGet("me")]
    public async Task<ActionResult<AuthResponseDto>> GetUserInfo()
    {
        var userIdClaim = User.FindFirst(ClaimTypes.NameIdentifier);
        if (userIdClaim == null) return Unauthorized();
        var userId = int.Parse(userIdClaim.Value);
        var user = await _jwtService.GetUserByIdAsync(userId);
        if (user == null) return NotFound();
        return Ok(new AuthResponseDto
        {
            UserId = user.Id,
            Username = user.Username,
            Email = user.Email
        });
    }

    [AllowAnonymous]
    [HttpPost("login")]
    public async Task<ActionResult<AuthResponseDto>> Login(LoginRequestDto request)
    {
        var result = await _jwtService.AuthenticateAsync(request);

        if (result == null) return Unauthorized();

        SetJwtCookie(result.AccessToken, result.ExpiresIn);

        result.AccessToken = null;

        return Ok(result);
    }

    [AllowAnonymous]
    [HttpPost("register")]
    public async Task<ActionResult<AuthResponseDto>> Register(RegisterRequestDto request)
    {
        var result = await _jwtService.RegisterAsync(request);

        if (result == null) return Unauthorized();
        SetJwtCookie(result.AccessToken, result.ExpiresIn);
        result.AccessToken = null;
        return Ok(result);
    }

    private void SetJwtCookie(string token, int expiresIn)
    {
        var cookieOptions = new CookieOptions
        {
            HttpOnly = true,
            Secure = false,
            SameSite = SameSiteMode.Lax,
            Expires = DateTime.UtcNow.AddMinutes(expiresIn)
        };
        Response.Cookies.Append("jwt", token, cookieOptions);
    }
}
