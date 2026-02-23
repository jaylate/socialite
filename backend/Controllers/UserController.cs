using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Socialite.Services;
using Socialite.DTOs;

namespace Socialite.Controllers;

[ApiController]
[Route("api/v1/users")]
public class UserController : ControllerBase
{
    private readonly UserService _userService;
    public UserController(UserService userService)
    {
        _userService = userService;
    }

    [HttpGet]
    public async Task<ActionResult<List<PublicUserDto>>> GetAll()
    {
        var users = (await _userService.GetAllAsync())
            .Select(u => new PublicUserDto(
                u.Username,
                u.Name,
                u.Bio,
                u.CreatedAt
            ))
            .ToList();

        return users;
    }

    [HttpGet("{username}")]
    public async Task<ActionResult<PublicUserDto>> Get(string username)
    {
        var user = await _userService.GetByUsernameAsync(username);
        if (user is null)
            return NotFound();

        return new PublicUserDto(
            user.Username,
            user.Name,
            user.Bio,
            user.CreatedAt
        );
    }

    [Authorize]
    [HttpPut("{username}")]
    public async Task<IActionResult> Update(string username, UpdateUserDto dto)
    {
        var requestingUsername = User.FindFirst(System.Security.Claims.ClaimTypes.Name)?.Value;
        if (requestingUsername != username) return Forbid();

        var updated = await _userService.UpdateByUsernameAsync(username, dto.Username, dto.Name, dto.Bio, dto.Email);
        if (!updated) return NotFound();
        return NoContent();
    }

    [Authorize]
    [HttpDelete("{username}")]
    public async Task<IActionResult> Delete(string username)
    {
        var requestingUsername = User.FindFirst(System.Security.Claims.ClaimTypes.Name)?.Value;
        if (requestingUsername != username) return Forbid();

        if (!await _userService.DeleteByUsernameAsync(username)) return NotFound();
        return NoContent();
    }
}
