using Microsoft.AspNetCore.Mvc;
using Socialite.Services;
using Socialite.DTOs.Posts;

namespace Socialite.Controllers;

[ApiController]
[Route("api/v1/posts")]
public class PostController : ControllerBase
{
    private readonly PostService _postService;
    private readonly LikeService _likeService;
    public PostController(
	PostService postService,
	LikeService likeService)
    {
        _postService = postService;
        _likeService = likeService;
    }

    [HttpGet]
    public async Task<ActionResult<List<PostResponseDto>>> GetAll(
	[FromQuery] int? userId,
	[FromQuery] int skip = 0,
	[FromQuery] int limit = 20)
    {
	var posts = (await _postService.GetAllAsync())
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
    public async Task<ActionResult<PostResponseDto>> Get(
	int id,
	[FromQuery] int? userId)
    {
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

    [HttpPost]
    public async Task<IActionResult> Create([FromQuery] int userId, CreatePostDto dto)
    {
        await _postService.AddAsync(userId, dto.Content);
        return Ok();
    }
    
    [HttpPut("{id}")]
    public async Task<IActionResult> Update(int id, UpdatePostDto dto)
    {
        var updated = await _postService.UpdateAsync(id, dto.Content);
        if (!updated)
            return NotFound();

        return NoContent();
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> Delete(int id)
    {
        var deleted = await _postService.DeleteAsync(id);
        if (!deleted)
            return NotFound();

        return NoContent();
    }

    [HttpGet("user/{userId}")]
    public async Task<ActionResult<List<PostResponseDto>>> GetByUser(
        int userId,
        [FromQuery] int? currentUserId,
        [FromQuery] int skip = 0,
        [FromQuery] int limit = 20)
    {
        var posts = (await _postService.GetByUserIdAsync(userId))
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
}
