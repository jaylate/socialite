using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Socialite.Services;
using Socialite.DTOs;

namespace Socialite.Controllers;

[ApiController]
[Route("api/v1/users")]
[Authorize]
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
                u.Id,
                u.Username,
                u.Name,
                u.Bio,
                u.CreatedAt
            ))
            .ToList();

        return users;
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<PublicUserDto>> Get(int id)
    {
        var user = await _userService.GetByIdAsync(id);
        if (user is null)
            return NotFound();

        return new PublicUserDto(
            user.Id,
            user.Username,
            user.Name,
            user.Bio,
            user.CreatedAt
        );
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> Update(int id, UpdateUserDto dto)
    {
        var updated = await _userService.UpdateAsync(id, dto.Username, dto.Name, dto.Bio, dto.Email);
        if (!updated)
            return NotFound();

        return NoContent();
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> Delete(int id)
    {
        if (!await _userService.DeleteAsync(id))
            return NotFound();
        return NoContent();
    }
}
