using Microsoft.EntityFrameworkCore;
using DoadoresApi.Models;

namespace DoadoresApi.Data
{
    public class AppDbContext : DbContext
    {
        public DbSet<Doador> Doadores { get; set; }

        public AppDbContext(DbContextOptions<AppDbContext> options)
            : base(options) { }
    }
}
