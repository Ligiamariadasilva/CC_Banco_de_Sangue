using DoadoresApi.Data;
using DoadoresApi.Models;

namespace DoadoresApi.Routes;

public static class RotaPOST
{
    public static void Map(WebApplication app)
    {
        app.MapPost("/doadores", async (Doador d, AppDbContext db) =>
        {
            db.Doadores.Add(d);
            await db.SaveChangesAsync();
            return Results.Created($"/doadores/{d.Id}", d);
        });
    }
}
