using Microsoft.EntityFrameworkCore;

namespace TodoApi.Models;

public class TodoContext : DbContext
{
    public TodoContext(DbContextOptions<TodoContext> options)
        : base(options)
    {
    }

    public DbSet<TodoItem> TodoItems { get; set; } = null!;


    protected override void OnModelCreating( ModelBuilder modelBuilder )
    {
        base.OnModelCreating( modelBuilder );

        modelBuilder.Entity<TodoItem>().HasData(
            new TodoItem { Id = 1, Name = "Clean Windows", IsComplete = false },
            new TodoItem { Id = 2, Name = "Wash Floors", IsComplete = false },
            new TodoItem { Id = 3, Name = "Empty Trash", IsComplete = false },
            new TodoItem { Id = 4, Name = "Load Dishwasher", IsComplete = true }
        );

    }
}

