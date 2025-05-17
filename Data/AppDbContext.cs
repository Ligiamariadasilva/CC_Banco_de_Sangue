using DoadoresApi.Models;
using Microsoft.EntityFrameworkCore;

namespace DoadoresApi.Data;

public class AppDbContext : DbContext
{
    public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

    public DbSet<Doador> Doadores { get; set; }
}

