var builder = WebApplication.CreateBuilder(args);

builder.Services.AddOpenApi();

var app = builder.Build();
if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
}

var api = app.MapGroup("/api/v1");

// Posts endpoints
api.MapGet("/posts", () =>
{
    return "TODO";
});

api.MapPost("/posts", () =>
{
    return "TODO";
});

api.MapGet("/posts/{id}", () =>
{
    return "TODO";
});

api.MapPut("/posts/{id}", () =>
{
    return "TODO";
});

api.MapDelete("/posts/{id}", () =>
{
    return "TODO";
});

api.MapPost("/posts/{id}/like", () =>
{
    return "TODO";
});

// User endpoints
api.MapGet("/users", () =>
{
    return "TODO";
});

api.MapGet("/users/{id}", () =>
{
    return "TODO";
});

api.MapPut("/users/{id}", () =>
{
    return "TODO";
});

// Auth endpoints
api.MapPost("/auth/login", () =>
{
    return "TODO";
});

api.MapPost("/auth/register", () =>
{
    return "TODO";
});

app.Run();
