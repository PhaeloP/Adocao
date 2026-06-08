using Adocao.Infra.Data;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Adocao.Domain.Entities;
using Adocao.API.Dto.CriarUsuarioDto;

namespace Adocao.API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class UsuarioController : ControllerBase
{
    private readonly AppDbContext _context;

    public UsuarioController(AppDbContext context)
    {
        _context = context;
    }

    [HttpGet("{id}")]
    public async Task<IActionResult> Listar(int id )
    {
        var usuario = await _context.Usuarios.FindAsync(id);
        return Ok(usuario);
    }

    [HttpGet]
    public async Task<IActionResult> Listar()
    {
        var usuarios = await _context.Usuarios.ToListAsync();
        return Ok(usuarios);
    }

    [HttpDelete]
    public async Task<IActionResult> Deletar(int id)
    {
        var usuario = await _context.Usuarios.FindAsync(id);
        _context.Usuarios.Remove(usuario);
        await _context.SaveChangesAsync();
        return Ok();
    }

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
            
        }catch(Exception ex)
        {
            Console.WriteLine(ex);
            return BadRequest();
        }
        
        return Ok();
    }
}