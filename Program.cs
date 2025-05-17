using DoadoresApi.Data;
using DoadoresApi.Routes;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);
builder.Services.AddDbContext<AppDbContext>(opt => opt.UseInMemoryDatabase("DoadoresDB"));
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

app.UseSwagger();
app.UseSwaggerUI();

app.MapGet("/", () => "API de Doação de Sangue");

// Registrar rotas separadas
RotaGET.Map(app);
RotaPOST.Map(app);
RotaPUT.Map(app);
RotaDELETE.Map(app);

app.Run();
