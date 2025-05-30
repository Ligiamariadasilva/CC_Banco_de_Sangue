using DoadoresApi.Data;
using DoadoresApi.Models;

namespace DoadoresApi.Data;

public static class RotaPOST
{
    public static void Map(WebApplication app)
    {
        app.MapPost("/doadores", async (Doador d, AppDbContext db) =>
        {
            // Validação de campos obrigatórios
            if (string.IsNullOrWhiteSpace(d.Nome))
                return Results.BadRequest("O campo 'Nome' é obrigatório.");

            if (string.IsNullOrWhiteSpace(d.TipoSanguineo))
                return Results.BadRequest("O campo 'TipoSanguineo' é obrigatório.");

            // Validação de tipo sanguíneo permitido
            var tiposValidos = new[] { "A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-" };
            if (!tiposValidos.Contains(d.TipoSanguineo.ToUpper()))
                return Results.BadRequest("Tipo sanguíneo inválido. Utilize: A+, A-, B+, B-, AB+, AB-, O+ ou O-.");

            // Validação de data de doação (não pode ser no futuro)
            if (d.DataUltimaDoacao > DateTime.Today)
                return Results.BadRequest("A data da última doação não pode ser no futuro.");

            db.Doadores.Add(d);
            await db.SaveChangesAsync();

            return Results.Created($"/doadores/{d.Id}", d);
        });
    }
}
