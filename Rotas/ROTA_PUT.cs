using DoadoresApi.Data;
using DoadoresApi.Models;

namespace DoadoresApi.Routes;

public static class RotaPUT
{
    public static void Map(WebApplication app)
    {
        app.MapPut("/doadores/{id}", async (int id, Doador input, AppDbContext db) =>
        {
            var doador = await db.Doadores.FindAsync(id);
            if (doador is null) return Results.NotFound();

            doador.Nome = input.Nome;
            doador.TipoSanguineo = input.TipoSanguineo;
            doador.DataUltimaDoacao = input.DataUltimaDoacao;

            await db.SaveChangesAsync();
            return Results.NoContent();
        });
    }
}
