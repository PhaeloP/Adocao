using Microsoft.AspNetCore.Mvc;
using Adocao.Domain.Entities;
using Adocao.Infra.Data;




namespace Adocao.Controllers
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