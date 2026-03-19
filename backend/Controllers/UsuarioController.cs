using Microsoft.AspNetCore.Mvc;
using Adocao.Backend.Data;
using Adocao.Backend.Models;

namespace Adocao.Backend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class UsuarioController : ControllerBase
    {
        private readonly AppDbContext _context;

        public UsuarioController(AppDbContext context)
        {
            _context = context;
        }

        [HttpPost]
        public IActionResult CriarUsuario([FromBody] Usuario usuario)
        {
            _context.Usuarios.Add(usuario);
            _context.SaveChanges();

            return Ok(usuario);
        }
    }
}