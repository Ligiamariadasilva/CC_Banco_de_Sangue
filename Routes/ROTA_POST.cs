using DoadoresApi.Data;
using DoadoresApi.Models;

namespace DoadoresApi.Routes;

//Define a classe da rota como publica, para poder usar em todo o programa.
//Define tambem a classe como static para não precisar instanciar a classe.
public static class RotaPOST
{
    //Metodo estatico responsavel por mapear a rota POST.
    public static void Map(WebApplication app)
    {
        //Mapeia a rota POST no caminho "/doadores". Quando alguém fizer uma requisição POST nesse endpoint, os dados do corpo da requisição
        //serão automaticamente convertidos em um objeto "Doador".
        app.MapPost("/doadores", async (Doador d, AppDbContext db) =>
        {
            //Adiciona o novo doador recebido na tabela de Doadores do banco de dados.
            db.Doadores.Add(d);

            //Salva alteracoes no banco de dados.
            await db.SaveChangesAsync();

            //Inclui resposta HTTP que indica que o recurso foi criado com sucesso, tambem inclui a URL do novo resurso.
            return Results.Created($"/doadores/{d.Id}", d);
        });
    }
}
