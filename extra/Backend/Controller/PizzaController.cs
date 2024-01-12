using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Backend.Controller;

[ApiController]
[Route("pizza")]
public class PizzaController : ControllerBase
{
    private readonly Infrastrucutre.PizzaDb _context;
    private readonly ILogger<PizzaController> _logger;

    public PizzaController(Infrastrucutre.PizzaDb context, ILogger<PizzaController> logger)
    {
        _context = context;
        _logger = logger;
    }

    [HttpGet]
    public async Task<IActionResult> GetAll()
    {
        return Ok(await _context.Pizzas.ToListAsync());
    }

    [HttpPost]
    public async Task<IActionResult> Post([Bind("Name,Description")] Model.Pizza pizza)
    {
        await _context.Pizzas.AddAsync(pizza);
        await _context.SaveChangesAsync();

        return Created($"/pizza/{pizza.Id}", pizza);
    }

    [HttpGet("{id}")]
    public async Task<IActionResult> Get(int? id)
    {
        if (id == null) return NotFound();

        Model.Pizza? pizza = await _context.Pizzas.FirstOrDefaultAsync(p => p.Id == id);

        if (pizza == null) return NotFound();

        return Ok(pizza);
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> Put([Bind("Name,Description")][FromForm] Model.Pizza updatePizza, int? id)
    {
        Model.Pizza? pizza = await _context.Pizzas.FindAsync(id);

        if (pizza == null) return NotFound();

        pizza.Name = updatePizza.Name;
        pizza.Description = updatePizza.Description;

        await _context.SaveChangesAsync();

        return NoContent();
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> Delete(int? id)
    {
        Model.Pizza? pizza = await _context.Pizzas.FindAsync(id);

        if (pizza == null) return NotFound();

        _context.Pizzas.Remove(pizza);

        await _context.SaveChangesAsync();

        return NoContent();
    }
}
