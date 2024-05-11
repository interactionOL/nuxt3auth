using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using System.Configuration;
using TodoApi.Models;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllers();
builder.Services.AddDbContext<TodoContext>(opt =>
    {
        opt.UseSqlite( builder.Configuration.GetConnectionString( "DefaultConnection" ) );
    } );
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen( );

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


builder.Services
    .AddAuthentication("Bearer")
    .AddJwtBearer("Bearer", options =>
    {
        options.Authority = "https://demo.duendesoftware.com";
        options.TokenValidationParameters = new Microsoft.IdentityModel.Tokens.TokenValidationParameters
        {
            ValidateAudience = false
        };
        options.Events = new JwtBearerEvents
        {
            OnAuthenticationFailed = context =>
            {
                if (context.Exception.GetType() == typeof( SecurityTokenExpiredException ))
                {
                    context.Response.Headers.Add( "Token-Expired", "true" );
                    // Log the token and the exception
                    Console.WriteLine( "Token expired at {0}", ((SecurityTokenExpiredException)context.Exception).Expires );
                }

                // Log other authentication failures
                Console.WriteLine( "Authentication failed: {0}", context.Exception.Message );

                return Task.CompletedTask;
            },
            OnForbidden = context =>
            {
                Console.WriteLine( "Auth Forbidden" );
                return Task.CompletedTask;
            },
            OnTokenValidated = context =>
            {
                // Additional logging if needed for successful validation
                Console.WriteLine( "Token validated for {0}", context.Principal.Identity.Name );
                return Task.CompletedTask;
            }
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
