using Microsoft.AspNetCore.Mvc;
using Socialite.Services;
using Socialite.DTOs.Posts;

namespace Socialite.Controllers;

[ApiController]
[Route("api/v1/posts")]
public class PostController : ControllerBase
{
    [HttpGet]
    public ActionResult<List<PostDto>> GetAll()
    {
        return PostService.GetAll()
            .Select(p => new PostDto(
                p.Id,
                p.UserId,
                p.Content,
                p.CreatedAt
            ))
            .ToList();
    }

    [HttpGet("{id}")]
    public ActionResult<PostDto> Get(int id)
    {
        var post = PostService.Get(id);
        if (post is null)
            return NotFound();

        return new PostDto(
            post.Id,
            post.UserId,
            post.Content,
            post.CreatedAt
        );
    }

    [HttpPost]
    public IActionResult Create([FromQuery] int userId, CreatePostDto dto)
    {
        var post = PostService.Add(userId, dto.Content);

        return CreatedAtAction(
            nameof(Get),
            new { id = post.Id },
            new PostDto(post.Id, post.UserId, post.Content, post.CreatedAt)
        );
    }
    
    [HttpPut("{id}")]
    public IActionResult Update(int id, UpdatePostDto dto)
    {
        var updated = PostService.Update(id, dto.Content);
        if (!updated)
            return NotFound();

        return NoContent();
    }

    [HttpDelete("{id}")]
    public IActionResult Delete(int id)
    {
        var deleted = PostService.Delete(id);
        if (!deleted)
            return NotFound();

        return NoContent();
    }
}