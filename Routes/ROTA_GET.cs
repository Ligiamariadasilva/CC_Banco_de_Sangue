using DoadoresApi.Data;
using DoadoresApi.Models;
using Microsoft.EntityFrameworkCore;

namespace DoadoresApi.Routes;

//Define a classe da rota como publica, para poder usar em todo o programa.
//Define tambem a classe como static para não precisar instanciar a classe.
public static class RotaGET
{
    //Metodo estatico responsavel por mapear as rotas GET.
    public static void Map(WebApplication app)
    {
        //Mapeia a rota GET para o caminho "/doadores", quando alguem acessar, irá retornar todos os doadores da tabela.
        app.MapGet("/doadores", async (AppDbContext db) =>
            await db.Doadores.ToListAsync());

        //Espera um ID na URL para retornar somente os dados especificos do doador informado no ID
        app.MapGet("/doadores/{id}", async (int id, AppDbContext db) =>
            await db.Doadores.FindAsync(id) is Doador d
                //Se o doador for encontrado, retorna HTTP 200 OK com os dados.
                ? Results.Ok(d)
                //Se não encontrar, retorna HTTP 404 Not Found.
                : Results.NotFound());
    }
}
