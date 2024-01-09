using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Backend.Controller;

[ApiController]
[Route("[controller]")]
public class PizzaController : ControllerBase
{
    private readonly Infrastrucutre.PizzaDb _context;
    private readonly ILogger<PizzaController> _logger;

    public PizzaController(Infrastrucutre.PizzaDb context, ILogger<PizzaController> logger)
    {
        _context = context;
        _logger = logger;
    }

    [HttpGet(Name = "GetPizza")]
    public async Task<IActionResult> Get()
    {
        return Ok(await _context.Pizzas.ToListAsync());
    }
}
