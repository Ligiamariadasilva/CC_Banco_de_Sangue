using DoadoresApi.Data;
using DoadoresApi.Models;

namespace DoadoresApi.Data;

public static class RotaPUT
{
    public static void Map(WebApplication app)
    {
        app.MapPut("/doadores/{id}", async (int id, Doador dadosAtualizados, AppDbContext db) =>
        {
            var doador = await db.Doadores.FindAsync(id);

            if (doador is null)
                return Results.NotFound($"Doador com ID {id} não encontrado.");

            // Validação de campos obrigatórios
            if (string.IsNullOrWhiteSpace(dadosAtualizados.Nome))
                return Results.BadRequest("O campo 'Nome' é obrigatório.");

            if (string.IsNullOrWhiteSpace(dadosAtualizados.TipoSanguineo))
                return Results.BadRequest("O campo 'TipoSanguineo' é obrigatório.");

            // Validação de tipo sanguíneo permitido
            var tiposValidos = new[] { "A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-" };
            if (!tiposValidos.Contains(dadosAtualizados.TipoSanguineo.ToUpper()))
                return Results.BadRequest("Tipo sanguíneo inválido. Utilize: A+, A-, B+, B-, AB+, AB-, O+ ou O-.");

            // Validação de data de doação (não pode ser no futuro)
            if (dadosAtualizados.DataUltimaDoacao > DateTime.Today)
                return Results.BadRequest("A data da última doação não pode ser no futuro.");

            // Atualização dos dados
            doador.Nome = dadosAtualizados.Nome;
            doador.TipoSanguineo = dadosAtualizados.TipoSanguineo;
            doador.DataUltimaDoacao = dadosAtualizados.DataUltimaDoacao;

            await db.SaveChangesAsync();
            return Results.Ok(doador);
        });
    }
}
