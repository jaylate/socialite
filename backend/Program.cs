using Microsoft.EntityFrameworkCore;
using Socialite.Data;
using Socialite.Repositories;
using Socialite.Repositories.Interfaces;
using Socialite.Services;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllers();
builder.Services.AddOpenApi();

builder.Services.AddDbContext<SocialiteContext>(options =>
    options.UseInMemoryDatabase("SocialiteDatabase"));

// Register repositories
builder.Services.AddScoped<IPostRepository, PostRepository>();
builder.Services.AddScoped<IUserRepository, UserRepository>();
builder.Services.AddScoped<ILikeRepository, LikeRepository>();

// Register services
builder.Services.AddScoped<UserService>();
builder.Services.AddScoped<PostService>();
builder.Services.AddScoped<LikeService>();

var app = builder.Build();
if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
}

using (var scope = app.Services.CreateScope())
{
    var context = scope.ServiceProvider.GetRequiredService<SocialiteContext>();
    context.Database.EnsureCreated();
}

//app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();
