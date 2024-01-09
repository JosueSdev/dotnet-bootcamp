using System.Data.Common;
using Microsoft.EntityFrameworkCore;

namespace Backend.Infrastrucutre;

public class SeedData
{
  public static void Initilize(IServiceProvider serviceProvider)
  {
    using (var context = new PizzaDb(serviceProvider.GetRequiredService<DbContextOptions<PizzaDb>>()))
    {
      if (context == null || context.Pizzas == null)
        throw new ArgumentNullException("Null Pizza Context");

      if (context.Pizzas.Any()) return;

      context.Pizzas.AddRange(
        new Model.Pizza
        {
          Name = "Margarita",
          Description = "Tasty",
        },
        new Model.Pizza
        {
          Name = "Cherry",
          Description = "Tasty",
        },
        new Model.Pizza
        {
          Name = "Hawaiian",
          Description = "Tasty",
        },
        new Model.Pizza
        {
          Name = "Pepperoni",
          Description = "Tasty",
        },
        new Model.Pizza
        {
          Name = "Veggie",
          Description = "Tasty",
        }
      );

      context.SaveChanges();
    }
  }
}