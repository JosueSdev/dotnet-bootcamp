using Microsoft.EntityFrameworkCore;

namespace Backend.Infrastrucutre;
public class PizzaDb : DbContext
{
  public PizzaDb(DbContextOptions options) : base(options) { }
  public DbSet<Model.Pizza> Pizzas { get; set; } = null!;
}