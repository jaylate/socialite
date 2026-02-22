using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Socialite.Services;

namespace Socialite.Controllers;

[ApiController]
[Route("api/v1/posts/{postId}/likes")]
public class LikeController : ControllerBase
{
    private readonly LikeService _likeService;
    public LikeController(LikeService likeService)
    {
        _likeService = likeService;
    }

    [HttpGet("count")]
    public async Task<ActionResult<int>> GetCount(int postId)
    {
        return await _likeService.GetCountAsync(postId);
    }

    [Authorize]
    [HttpGet("me")]
    public async Task<ActionResult<bool>> IsLiked(int postId)
    {
        var userIdClaim = User.FindFirst(System.Security.Claims.ClaimTypes.NameIdentifier);
        if (userIdClaim == null)
            return Unauthorized();

        var userId = int.Parse(userIdClaim.Value);
        return await _likeService.IsLikedAsync(userId, postId);
    }

    [Authorize]
    [HttpPost]
    public async Task<IActionResult> Like(int postId)
    {
        var userIdClaim = User.FindFirst(System.Security.Claims.ClaimTypes.NameIdentifier);
        if (userIdClaim == null)
            return Unauthorized();

        var userId = int.Parse(userIdClaim.Value);
        var like = await _likeService.AddAsync(userId, postId);
        if (like is null)
            return Conflict("Post already liked by this user");
        return NoContent();
    }

    [Authorize]
    [HttpDelete]
    public async Task<IActionResult> Unlike(int postId)
    {
        var userIdClaim = User.FindFirst(System.Security.Claims.ClaimTypes.NameIdentifier);
        if (userIdClaim == null)
            return Unauthorized();

        var userId = int.Parse(userIdClaim.Value);
        var removed = await _likeService.DeleteAsync(userId, postId);
        if (!removed)
            return NotFound();
        return NoContent();
    }
}
