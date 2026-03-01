using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using Socialite.Services;
using Socialite.DTOs.Posts;

namespace Socialite.Controllers;

[ApiController]
[Route("api/v1/posts")]
public class PostController : ControllerBase
{
    private readonly PostService _postService;
    private readonly LikeService _likeService;
    private readonly UserService _userService;
    public PostController(
    PostService postService,
    LikeService likeService,
    UserService userService)
    {
        _postService = postService;
        _likeService = likeService;
        _userService = userService;
    }

    [HttpGet]
    public async Task<ActionResult<List<PostResponseDto>>> GetAll(
    [FromQuery] int skip = 0,
    [FromQuery] int limit = 20)
    {
        var userId = GetCurrentUserId();
        var posts = (await _postService.GetAllAsync())
            .Skip(skip)
            .Take(limit)
            .Select(p => new PostResponseDto(
                p.Id,
                p.Content,
                p.User.Name ?? p.User.Username,
                p.User.Username,
                p.Likes.Count,
                p.CreatedAt,
        userId.HasValue ? p.Likes.Any(l => l.UserId == userId.Value) : false
            ))
            .ToList();

        return posts;
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<PostResponseDto>> Get(int id)
    {
        var userId = GetCurrentUserId();
        var post = await _postService.GetByIdAsync(id);
        if (post is null)
            return NotFound();

        return new PostResponseDto(
            post.Id,
            post.Content,
            post.User.Name ?? post.User.Username,
            post.User.Username,
            post.Likes.Count,
            post.CreatedAt,
        userId.HasValue ? post.Likes.Any(l => l.UserId == userId.Value) : false
        );
    }

    [Authorize]
    [HttpPost]
    public async Task<IActionResult> Create(CreatePostDto dto)
    {
        var userIdClaim = User.FindFirst(System.Security.Claims.ClaimTypes.NameIdentifier);
        if (userIdClaim == null)
            return Unauthorized();

        var userId = int.Parse(userIdClaim.Value);
        await _postService.AddAsync(userId, dto.Content);
        return NoContent();
    }

    [Authorize]
    [HttpPut("{id}")]
    public async Task<IActionResult> Update(int id, UpdatePostDto dto)
    {
        var userIdClaim = User.FindFirst(System.Security.Claims.ClaimTypes.NameIdentifier);
        if (userIdClaim == null) return Unauthorized();
        var requestingUserId = int.Parse(userIdClaim.Value);

        var post = await _postService.GetByIdAsync(id);
        if (post is null) return NotFound();
        if (post.UserId != requestingUserId) return Forbid();

        await _postService.UpdateAsync(id, dto.Content);
        return NoContent();
    }

    [Authorize]
    [HttpDelete("{id}")]
    public async Task<IActionResult> Delete(int id)
    {
        var userIdClaim = User.FindFirst(System.Security.Claims.ClaimTypes.NameIdentifier);
        if (userIdClaim == null) return Unauthorized();
        var requestingUserId = int.Parse(userIdClaim.Value);

        var post = await _postService.GetByIdAsync(id);
        if (post is null) return NotFound();
        if (post.UserId != requestingUserId) return Forbid();

        await _postService.DeleteAsync(id);
        return NoContent();
    }

    [HttpGet("user/{username}")]
    public async Task<ActionResult<List<PostResponseDto>>> GetByUser(
        string username,
        [FromQuery] int skip = 0,
        [FromQuery] int limit = 20)
    {
        var currentUserId = GetCurrentUserId();
        var user = await _userService.GetByUsernameAsync(username);
        if (user is null)
            return NotFound();

        var posts = (await _postService.GetByUserIdAsync(user.Id))
            .Skip(skip)
            .Take(limit)
            .Select(p => new PostResponseDto(
                p.Id,
                p.Content,
                p.User.Name ?? p.User.Username,
                p.User.Username,
                p.Likes.Count,
                p.CreatedAt,
                currentUserId.HasValue ? p.Likes.Any(l => l.UserId == currentUserId.Value) : false
            ))
            .ToList();

        return posts;
    }

    private int? GetCurrentUserId()
    {
        var claim = User.FindFirst(System.Security.Claims.ClaimTypes.NameIdentifier);
        return claim != null ? int.Parse(claim.Value) : null;
    }
}
