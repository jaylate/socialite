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

    [HttpGet("me")]
    public async Task<ActionResult<bool>> IsLiked(int postId, [FromQuery] int userId)
    {
        return await _likeService.IsLikedAsync(userId, postId);
    }
    
    [HttpPost]
    public async Task<IActionResult> Like(int postId, [FromQuery] int userId)
    {
        var like = await _likeService.AddAsync(userId, postId);

        if (like is null)
            return Conflict("Post already liked by this user");

        return CreatedAtAction(nameof(IsLiked), new { postId, userId }, null);
    }

    [HttpDelete]
    public async Task<IActionResult> Unlike(int postId, [FromQuery] int userId)
    {
        var removed = await _likeService.DeleteAsync(userId, postId);

        if (!removed)
            return NotFound();

        return NoContent();
    }
}
