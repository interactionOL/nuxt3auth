using Microsoft.EntityFrameworkCore;
using System.Configuration;
using TodoApi.Models;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllers();
builder.Services.AddDbContext<TodoContext>(opt =>
    {
        opt.UseSqlite( builder.Configuration.GetConnectionString( "DefaultConnection" ) );
    } );
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddCors( options =>
{
    options.AddPolicy( "MyCorsPolicy", policy =>
    {
        policy
            .AllowAnyOrigin()
              .AllowAnyHeader()                   // Allow all headers
              .AllowAnyMethod();                  // Allow all methods
    } );
} );


builder.Services.AddAuthentication("Bearer")
    .AddJwtBearer("Bearer", options =>
    {
        options.Authority = "https://demo.duendesoftware.com";
        options.TokenValidationParameters = new Microsoft.IdentityModel.Tokens.TokenValidationParameters
        {
            ValidateAudience = false
        };
    } );

builder.Services.AddAuthorization( options =>
{
    options.AddPolicy( "ApiScope", policy =>
    {
        policy.RequireAuthenticatedUser();
    } );
} );

var app = builder.Build();


if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseCors( "MyCorsPolicy" );

app.UseAuthorization();

app.MapControllers();

using (var scope = app.Services.CreateScope())
{
    var services = scope.ServiceProvider;
    var context = services.GetRequiredService<TodoContext>();
    context.Database.EnsureCreated(); // This is where ensureDbCreated might be called
}

app.Run();
