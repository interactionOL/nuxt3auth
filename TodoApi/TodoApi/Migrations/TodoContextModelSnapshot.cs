﻿// <auto-generated />
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using TodoApi.Models;

#nullable disable

namespace ToDoApi.Migrations
{
    [DbContext(typeof(TodoContext))]
    partial class TodoContextModelSnapshot : ModelSnapshot
    {
        protected override void BuildModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder.HasAnnotation("ProductVersion", "8.0.4");

            modelBuilder.Entity("TodoApi.Models.TodoItem", b =>
                {
                    b.Property<long>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("INTEGER");

                    b.Property<bool>("IsComplete")
                        .HasColumnType("INTEGER");

                    b.Property<string>("Name")
                        .HasColumnType("TEXT");

                    b.HasKey("Id");

                    b.ToTable("TodoItems");

                    b.HasData(
                        new
                        {
                            Id = 1L,
                            IsComplete = false,
                            Name = "Clean Windows"
                        },
                        new
                        {
                            Id = 2L,
                            IsComplete = false,
                            Name = "Wash Floors"
                        },
                        new
                        {
                            Id = 3L,
                            IsComplete = false,
                            Name = "Empty Trash"
                        },
                        new
                        {
                            Id = 4L,
                            IsComplete = true,
                            Name = "Load Dishwasher"
                        });
                });
#pragma warning restore 612, 618
        }
    }
}