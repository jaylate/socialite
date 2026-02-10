using Microsoft.AspNetCore.Mvc;
using Socialite.Services;
using Socialite.DTOs;

namespace Socialite.Controllers;

[ApiController]
[Route("api/v1/users")]

public class UserController : ControllerBase
{
    [HttpGet]
    public ActionResult<List<UserDto>> GetAll()
    {
        var users = UserService.GetAll()
            .Select(u => new UserDto(
                u.Id,
                u.Username,
                u.Name,
                u.Email,
                u.Bio,
                u.IsAdmin,
                u.CreatedAt
            ))
            .ToList();

        return users;
    }

    [HttpGet("{id}")]
    public ActionResult<UserDto> Get(int id)
    {
        var user = UserService.Get(id);
        if (user is null)
            return NotFound();

        return new UserDto(
            user.Id,
            user.Username,
            user.Name,
            user.Email,
            user.Bio,
            user.IsAdmin,
            user.CreatedAt
        );
    }

    [HttpPut("{id}")]
    public IActionResult Update(int id, UpdateUserDto dto)
    {
        var updated = UserService.Update(id, dto.Username, dto.Name, dto.Bio);
        if (!updated)
            return NotFound();

        return NoContent();
    }

    [HttpDelete("{id}")]
    public IActionResult Delete(int id)
    {
        var user = UserService.Get(id);
        if (user is null)
            return NotFound();
        UserService.Delete(id);
        return NoContent();
    }
}