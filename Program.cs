using DoadoresApi.Data;
using DoadoresApi.Routes;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

// Configurar o DbContext com string de conexão do appsettings.json
var connectionString = builder.Configuration.GetConnectionString("DefaultConnection");
builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseMySql(connectionString, ServerVersion.AutoDetect(connectionString))
);

// Swagger
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// Construção da aplicação
var app = builder.Build();

app.UseSwagger();
app.UseSwaggerUI();

// Rota raiz
app.MapGet("/", () => "API de Doação de Sangue");

// Mapeamento das rotas da pasta Routes
RotaGET.Map(app);
RotaPOST.Map(app);
RotaDELETE.Map(app);
RotaPUT.Map(app);

// Inicia a aplicação
app.Run();
