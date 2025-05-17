using DoadoresApi.Data;
using DoadoresApi.Models;
using Microsoft.EntityFrameworkCore;

namespace DoadoresApi.Routes;

public static class RotaGET
{
    public static void Map(WebApplication app)
    {
        app.MapGet("/doadores", async (AppDbContext db) =>
            await db.Doadores.ToListAsync());

        app.MapGet("/doadores/{id}", async (int id, AppDbContext db) =>
            await db.Doadores.FindAsync(id) is Doador d
                ? Results.Ok(d)
                : Results.NotFound());
    }
}
