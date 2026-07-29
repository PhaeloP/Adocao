using Adocao.Infra.Data;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Adocao.Domain.Entities;
using Adocao.API.Dto;
using Adocao.API.Services;
using Microsoft.AspNetCore.Authorization; 

namespace Adocao.API.Controllers
{
[ApiController]
[Route("api/[controller]")]
public class UsuarioController : ControllerBase
{
private readonly AppDbContext _context;
private readonly TokenService _tokenService; 

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
    try
    {
        var usuario = new Usuario()
        {
            Nome = criarUsuarioDto.Nome,
            Sobrenome = criarUsuarioDto.Sobrenome,
            Email = criarUsuarioDto.Email,
            Senha = BCrypt.Net.BCrypt.HashPassword(criarUsuarioDto.Senha), 
            Celular = criarUsuarioDto.Celular
        };

        _context.Usuarios.Add(usuario);
        await _context.SaveChangesAsync();
        return Ok();
    }
    catch (Exception ex)
    {
        Console.WriteLine(ex);
        return BadRequest(new { mensagem = "Erro interno ao salvar no banco." });
    }
}

[HttpPut("{id}")]
public async Task<IActionResult> Atualizar(int id, [FromBody] CriarUsuarioDto usuarioDto)
{
    var usuario = await _context.Usuarios.FindAsync(id);
    if (usuario == null) return NotFound();

    usuario.Nome = usuarioDto.Nome;
    usuario.Sobrenome = usuarioDto.Sobrenome;
    usuario.Email = usuarioDto.Email;
    usuario.Senha = BCrypt.Net.BCrypt.HashPassword(usuarioDto.Senha);
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

[AllowAnonymous]
[HttpPost("login")]
public async Task<IActionResult> Login([FromBody] LoginDto loginDto)
{
    var usuario = await _context.Usuarios.FirstOrDefaultAsync(u => u.Email == loginDto.Email);
    if (usuario == null || !BCrypt.Net.BCrypt.Verify(loginDto.Senha, usuario.Senha))
    {
        return Unauthorized(new { mensagem = "E-mail ou senha inválidos." });
    }

    var token = _tokenService.GerarToken(usuario.Email, usuario.Id.ToString());
    return Ok(new
    {
        Usuario = new { usuario.Id, usuario.Nome, usuario.Sobrenome, usuario.Email },
        Token = token
    });
}

}

}