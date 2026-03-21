using Microsoft.AspNetCore.Mvc;
using Adocao.Backend.Data;
using Adocao.Backend.Models;

namespace Adocao.Backend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class DivulgacaoController : ControllerBase
    {
        private readonly AppDbContext _context;
        public DivulgacaoController(AppDbContext context)
        {
            _context = context;
        }
        [HttpPost]
        public IActionResult CriarDivulgacao(Divulgacao divulgacao) 
        {
            return Ok();
        }
    }
}