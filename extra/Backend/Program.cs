var builder = WebApplication.CreateBuilder(args);
var connectionString = builder.Configuration.GetConnectionString("Pizza") ?? "Data Source=Pizza.db";

builder.Services.AddControllers();
builder.Services.AddSqlite<Backend.Infrastrucutre.PizzaDb>(connectionString);
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen(c =>
{
    c.SwaggerDoc("v1", new Microsoft.OpenApi.Models.OpenApiInfo
    {
        Title = "Pizza API",
        Description = "Backend",
        Version = "v1"
    });
});

var app = builder.Build();

using (var scope = app.Services.CreateScope())
{
    var services = scope.ServiceProvider;

    Backend.Infrastrucutre.SeedData.Initilize(services);
}

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI(c =>
{
    c.SwaggerEndpoint("/swagger/v1/swagger.json", "Pizza API V1");
});
}

// do not wanna https for now
// app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();
