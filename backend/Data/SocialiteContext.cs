using Microsoft.EntityFrameworkCore;
using Socialite.Models;

namespace Socialite.Data;

public class SocialiteContext : DbContext
{
    public SocialiteContext(DbContextOptions<SocialiteContext> options)
        : base(options)
    {
    }

    public DbSet<Post> Posts { get; set; } = null!;
    public DbSet<User> Users { get; set; } = null!;
    public DbSet<Like> Likes { get; set; } = null!;

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);

        // Configure relationships
        modelBuilder.Entity<Post>()
            .HasOne(p => p.User)
            .WithMany(u => u.Posts)
            .HasForeignKey(p => p.UserId)
            .OnDelete(DeleteBehavior.Cascade);

        modelBuilder.Entity<Like>()
            .HasOne(l => l.User)
            .WithMany(u => u.Likes)
            .HasForeignKey(l => l.UserId)
            .OnDelete(DeleteBehavior.Cascade);

        modelBuilder.Entity<Like>()
            .HasOne(l => l.Post)
            .WithMany(p => p.Likes)
            .HasForeignKey(l => l.PostId)
            .OnDelete(DeleteBehavior.Cascade);

        // Ensure a user can only like a post once
        modelBuilder.Entity<Like>()
            .HasIndex(l => new { l.PostId, l.UserId })
            .IsUnique();

        modelBuilder.Entity<User>().HasData(
            new User { Id = 1, Username = "admin", Name = "The Admin", Email = "admin@socialite.local", PasswordHash = "xxx", Bio = "Doing stuff that admins do", IsAdmin = true, CreatedAt = DateTime.UtcNow, UpdatedAt = DateTime.UtcNow },
            new User { Id = 2, Username = "john", Name = "John Doe", Email = "john@socialite.local", PasswordHash = "xxx", CreatedAt = DateTime.UtcNow, UpdatedAt = DateTime.UtcNow }
        );

        modelBuilder.Entity<Post>().HasData(
            new Post { Id = 1, UserId = 1, Content = "Hello, World!", CreatedAt = DateTime.UtcNow, UpdatedAt = DateTime.UtcNow },
            new Post { Id = 2, UserId = 2, Content = "Hello, Another World!", CreatedAt = DateTime.UtcNow, UpdatedAt = DateTime.UtcNow }
        );

        modelBuilder.Entity<Like>().HasData(
            new Like { Id = 1, UserId = 2, PostId = 1, CreatedAt = DateTime.UtcNow }
        );
    }
}
