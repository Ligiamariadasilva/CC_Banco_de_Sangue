using DoadoresApi.Data;
using DoadoresApi.Models;
using Microsoft.EntityFrameworkCore;

namespace DoadoresApi.Routes
{
    public static class RotaGET
    {
        public static void Map(WebApplication app)
        {
            app.MapGet("/doadores", async (AppDbContext db) =>
            {
                var doadores = await db.Doadores.ToListAsync();
                return Results.Ok(doadores);
            });

            app.MapGet("/doadores/{id}", async (int id, AppDbContext db) =>
            {
                var doador = await db.Doadores.FindAsync(id);
                return doador is not null ? Results.Ok(doador) : Results.NotFound();
            });
        }
    }
}
