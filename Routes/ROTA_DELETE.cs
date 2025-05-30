using DoadoresApi.Data;


namespace DoadoresApi.Data;

public static class RotaDELETE
{
    public static void Map(WebApplication app)
    {
        // DELETE: /doadores/{id} → Remove um doador pelo ID
        app.MapDelete("/doadores/{id}", async (int id, AppDbContext db) =>
        {
            // Valida o ID antes de consultar
            if (id <= 0)
                return Results.BadRequest("ID inválido. O valor deve ser maior que zero.");

            var doador = await db.Doadores.FindAsync(id);

            if (doador is null)
                return Results.NotFound($"Doador com ID {id} não foi encontrado.");

            db.Doadores.Remove(doador);
            await db.SaveChangesAsync();

            return Results.Ok($"Doador com ID {id} removido com sucesso.");
        });
    }
}
