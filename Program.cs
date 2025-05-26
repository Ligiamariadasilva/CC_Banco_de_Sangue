using DoadoresApi.Data;
using DoadoresApi.Models;
using DoadoresApi.Routes;
using Microsoft.EntityFrameworkCore;


//Cria a aplicação web e configura SQLite
var builder = WebApplication.CreateBuilder(args);
builder.Services.AddDbContext<AppDbContext>(opt => opt.UseSqlite("Data Source=doadores.db"));
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

//Constrói a aplicação web
var app = builder.Build();

app.UseSwagger();
app.UseSwaggerUI();

//Define uma rota GET simples na raiz ("/"), que retorna uma mensagem.
app.MapGet("/", () => "API de Doação de Sangue");

//Mapeia as rotas separadas da aplicação, definidas nos arquivos da pasta Routes
RotaGET.Map(app);
RotaPOST.Map(app);
RotaDELETE.Map(app);

//Executa o método responsável por popular o banco de dados inicial, se estiver vazio.
DoacoesBancoDeDados(app);

//Inicia a aplicação, começando a escutar requisições.
app.Run();


void DoacoesBancoDeDados(WebApplication app)
{
    //Cria um escopo para acessar os serviços.
    using var scope = app.Services.CreateScope();
    var context = scope.ServiceProvider.GetRequiredService<AppDbContext>();

    context.Database.Migrate();

    //Se não houver nenhum doador no banco de dados, adiciona doadores iniciais.
    if (!context.Doadores.Any())
    {
        //Lista de doadores iniciais com informações pré-definidas.
        var doadoresIniciais = new List<Doador>
        {
            new() { Id = 1, Nome = "Luiz Storrer", TipoSanguineo = "O+", DataUltimaDoacao = new DateTime(2024, 5, 10) },
            new() { Id = 2, Nome = "Amanda Edling", TipoSanguineo = "A-", DataUltimaDoacao = new DateTime(2024, 3, 22) },
            new() { Id = 3, Nome = "Wellington", TipoSanguineo = "B+", DataUltimaDoacao = new DateTime(2023, 12, 5) },
            new() { Id = 4, Nome = "Ligia", TipoSanguineo = "O-", DataUltimaDoacao = new DateTime(2023, 12, 5) }
        };

        //Adiciona os doadores na tabela doadores.
        context.Doadores.AddRange(doadoresIniciais);

        //Para cada doador, verifica se ja existe no banco. Se ja existir, atualiza os dados, se não, adiciona novo.
        foreach (var doadorNovo in doadoresIniciais)
        {
            var doadorExistente = context.Doadores.Find(doadorNovo.Id);
            if (doadorExistente is not null)
            {
                doadorExistente.Nome = doadorNovo.Nome;
                doadorExistente.TipoSanguineo = doadorNovo.TipoSanguineo;
                doadorExistente.DataUltimaDoacao = doadorNovo.DataUltimaDoacao;
            }
            else
            {
                context.Doadores.Add(doadorNovo);
            }
        }

        //Salva as alterações no banco de dados
        context.SaveChanges();
    }
}
