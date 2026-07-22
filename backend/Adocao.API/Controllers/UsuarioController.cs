using Adocao.Infra.Data;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Adocao.Domain.Entities;
using Adocao.API.Dto;
using Adocao.API.Services; // Adicionado para reconhecer o TokenService
using Microsoft.AspNetCore.Authorization;


namespace Adocao.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    //[Authorize] 
    public class UsuarioController : ControllerBase
    {
        private readonly AppDbContext _context;
        private readonly TokenService _tokenService; // Adicionado o serviço de token

        // O construtor agora recebe tanto o banco de dados quanto o gerador de tokens
        public UsuarioController(AppDbContext context, TokenService tokenService)
        {
            _context = context;
            _tokenService = tokenService;
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> ListarPorId(int id)
        {
            var usuario = await _context.Usuarios.FindAsync(id);
            if (usuario == null) return NotFound();

            return Ok(usuario);
        }

        [HttpGet]
        public async Task<IActionResult> Listar()
        {
            var usuarios = await _context.Usuarios.ToListAsync();
            return Ok(usuarios);
        }

       [HttpDelete("{id}")]
        public async Task<IActionResult> Deletar(int id)
        {
            var usuario = await _context.Usuarios.FindAsync(id);
            if (usuario == null) return NotFound();

            _context.Usuarios.Remove(usuario);
            await _context.SaveChangesAsync();

            return Ok();
        }
        [AllowAnonymous]
        [HttpPost]
        public async Task<IActionResult> Criar(CriarUsuarioDto criarUsuarioDto)
        {
            var usuario = new Usuario
            {
                Nome = criarUsuarioDto.Nome,
                Email = criarUsuarioDto.Email,
                Senha = criarUsuarioDto.Senha,
                Celular = criarUsuarioDto.Celular
            };

            try
            {
                _context.Usuarios.Add(usuario);
                await _context.SaveChangesAsync();
                return Ok();
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex);
                return BadRequest();
            }
        }
                    [HttpPut("{id}")]
            public async Task<IActionResult> Atualizar(int id, [FromBody] CriarUsuarioDto usuarioDto)
            {
                var usuario = await _context.Usuarios.FindAsync(id);

                if (usuario == null)
                    return NotFound();

                usuario.Nome = usuarioDto.Nome;
                usuario.Email = usuarioDto.Email;
                usuario.Senha = usuarioDto.Senha;
                usuario.Celular = usuarioDto.Celular;

                try
                {
                    await _context.SaveChangesAsync();
                    return Ok(usuario);
                }
                catch (Exception ex)
                {
                    Console.WriteLine(ex);
                    return BadRequest();
    }
}
        // NOVA ROTA: Endpoint de Login para gerar o Token JWT
        [AllowAnonymous]
        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] LoginDto loginDto)
        {
            // Busca o usuário no banco pelo e-mail e pela senha
            var usuario = await _context.Usuarios
                .FirstOrDefaultAsync(u => u.Email == loginDto.Email && u.Senha == loginDto.Senha);

            // Se não encontrar ou os dados estiverem errados, barra o acesso
            if (usuario == null)
            {
                return Unauthorized(new { mensagem = "E-mail ou senha inválidos." });
            }

            // Se der certo, gera o token dinamicamente usando o ID e o E-mail dele
            var token = _tokenService.GerarToken(usuario.Email, usuario.Id.ToString());

            // Retorna os dados básicos do usuário logado junto com o token de acesso
            return Ok(new
            {
                Usuario = new { usuario.Id, usuario.Nome, usuario.Email },
                Token = token
            });
        }
    }
}
