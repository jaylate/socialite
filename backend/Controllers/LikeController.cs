using Microsoft.AspNetCore.Mvc;
using Socialite.Services;

namespace Socialite.Controllers;

[ApiController]
[Route("api/v1/posts/{postId}/likes")]
public class LikeController : ControllerBase
{
    [HttpGet("count")]
    public ActionResult<int> GetCount(int postId)
    {
        return LikeService.GetCount(postId);
    }

    [HttpGet("me")]
    public ActionResult<bool> IsLiked(int postId, [FromQuery] int userId)
    {
        return LikeService.IsLiked(userId, postId);
    }
    
    [HttpPost]
    public IActionResult Like(int postId, [FromQuery] int userId)
    {
        var like = LikeService.Add(userId, postId);

        if (like is null)
            return Conflict("Post already liked by this user");

        return CreatedAtAction(nameof(IsLiked), new { postId, userId }, null);
    }

    [HttpDelete]
    public IActionResult Unlike(int postId, [FromQuery] int userId)
    {
        var removed = LikeService.Delete(userId, postId);

        if (!removed)
            return NotFound();

        return NoContent();
    }
}