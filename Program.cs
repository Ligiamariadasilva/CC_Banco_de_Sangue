using DoadoresApi.Data;
using DoadoresApi.Models;
using DoadoresApi.Routes;
using Microsoft.EntityFrameworkCore;


var builder = WebApplication.CreateBuilder(args);
builder.Services.AddDbContext<AppDbContext>(opt => opt.UseSqlite("Data Source=doadores.db"));
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

app.UseSwagger();
app.UseSwaggerUI();

app.MapGet("/", () => "API de Doação de Sangue");

RotaGET.Map(app);
RotaPOST.Map(app);
RotaPUT.Map(app);
RotaDELETE.Map(app);

DoacoesBancoDeDados(app);

app.Run();


void DoacoesBancoDeDados(WebApplication app)
{
    using var scope = app.Services.CreateScope();
    var context = scope.ServiceProvider.GetRequiredService<AppDbContext>();

    context.Database.Migrate();

    if (!context.Doadores.Any())
    {
        var doadoresIniciais = new List<Doador>
        {
            new() { Id = 1, Nome = "Luiz Storrer", TipoSanguineo = "O+", DataUltimaDoacao = new DateTime(2024, 5, 10) },
            new() { Id = 2, Nome = "Amanda Edling", TipoSanguineo = "A-", DataUltimaDoacao = new DateTime(2024, 3, 22) },
            new() { Id = 3, Nome = "Wellington", TipoSanguineo = "B+", DataUltimaDoacao = new DateTime(2023, 12, 5) },
            new() { Id = 4, Nome = "Ligia", TipoSanguineo = "O-", DataUltimaDoacao = new DateTime(2023, 12, 5) }
        };
        
        context.Doadores.AddRange(doadoresIniciais);

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

        context.SaveChanges();
    }
}
