using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Socialite.DTOs.Auth;
using Socialite.Services;

namespace Socialite.Controllers;

[ApiController]
[Route("api/v1/[controller]")]
public class AuthController : ControllerBase
{
    private readonly JwtService _jwtService;

    public AuthController(JwtService jwtService) => _jwtService = jwtService;

    [AllowAnonymous]
    [HttpPost("login")]
    public async Task<ActionResult<AuthResponseDto>> Login(LoginRequestDto request)
    {
        var result = await _jwtService.AuthenticateAsync(request);

        if (result == null) return Unauthorized();

        return result;
    }

    [AllowAnonymous]
    [HttpPost("register")]
    public async Task<ActionResult<AuthResponseDto>> Register(RegisterRequestDto request)
    {
        var result = await _jwtService.RegisterAsync(request);

        if (result == null) return Unauthorized();

        return result;
    }
}
