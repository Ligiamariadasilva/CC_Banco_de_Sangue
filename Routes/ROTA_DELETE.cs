using DoadoresApi.Data;

namespace DoadoresApi.Routes;

//Define a classe da rota como publica, para poder usar em todo o programa.
//Define tambem a classe como static para não precisar instanciar a classe.
public static class RotaDELETE
{
    //Metodo estatico responsavel por mapear a rota DELETE.
    public static void Map(WebApplication app)
    {
        //Essa rota aceita um parâmetro "id" que será o identificador do doador a ser excluído.
        app.MapDelete("/doadores/{id}", async (int id, AppDbContext db) =>
        {
            //Tenta localizar no banco de dados o doador com o ID informado.
            var doador = await db.Doadores.FindAsync(id);

            //Se nao encontrou o doador, retorna o status HTTP 404 Not Found.
            if (doador is null) return Results.NotFound();

            //Se encontrou, remove o doador do banco de dados.
            db.Doadores.Remove(doador);

            //Salva alteracoes 
            await db.SaveChangesAsync();

            //Retorna o status OK e envia os dados do doador que foi excluido.
            return Results.Ok(doador);
        });
    }
}
