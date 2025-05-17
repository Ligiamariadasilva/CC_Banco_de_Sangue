using DoadoresApi.Data;

namespace DoadoresApi.Routes;

public static class RotaDELETE
{
    public static void Map(WebApplication app)
    {
        app.MapDelete("/doadores/{id}", async (int id, AppDbContext db) =>
        {
            var doador = await db.Doadores.FindAsync(id);
            if (doador is null) return Results.NotFound();

            db.Doadores.Remove(doador);
            await db.SaveChangesAsync();
            return Results.Ok(doador);
        });
    }
}
