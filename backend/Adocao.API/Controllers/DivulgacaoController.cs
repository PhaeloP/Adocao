using Microsoft.AspNetCore.Mvc;
using Adocao.Domain.Entities;
using Adocao.Infra.Data;
using Adocao.API.Dto;

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
public async Task<IActionResult> Criar(CriarDivulgacao Criardivulgacao) 
{
    var divulgacao = new Divulgacao()
    {
        UsuarioId = Criardivulgacao.UsuarioId,
        NomeAnimal = Criardivulgacao.NomeAnimal, 
        Idade = Criardivulgacao.Idade,
        Porte = Criardivulgacao.Porte,
        Sexo = Criardivulgacao.Sexo,
        Cidade = Criardivulgacao.Cidade,
        Estado = Criardivulgacao.Estado,
        Descricao = Criardivulgacao.Descricao,
        Contato = Criardivulgacao.Contato
    };
    _context.Divulgacoes.Add(divulgacao);
    await _context.SaveChangesAsync();
    return Ok();
}
[HttpPut("{id}")]
public async Task<IActionResult> Atualizar(int id, AtualizarDivulgacaoDto dto)
{
    var divulgacao = await _context.Divulgacoes.FindAsync(id);

    if (divulgacao == null)
        return NotFound();
    divulgacao.NomeAnimal = dto.NomeAnimal;
    divulgacao.Idade = dto.Idade.Value; 
    divulgacao.Porte = dto.Porte;
    divulgacao.Sexo = dto.Sexo;
    divulgacao.Cidade = dto.Cidade;
    divulgacao.Estado = dto.Estado;
    divulgacao.Descricao = dto.Descricao;
    divulgacao.Contato = dto.Contato;
    try
    {
        await _context.SaveChangesAsync();
        return Ok(divulgacao);
    }
    catch (Exception ex)
    {
        Console.WriteLine(ex);
        return BadRequest(new { mensagem = "Erro ao atualizar a divulgação no banco de dados." });
    }
}
[HttpDelete("{IdDivulgacao}")]
public async Task<IActionResult> Deletar(int IdDivulgacao) 
{
    var divulgacao = await _context.Divulgacoes.FindAsync(IdDivulgacao);
    
    if (divulgacao == null)
        return NotFound();

    _context.Divulgacoes.Remove(divulgacao);
    await _context.SaveChangesAsync();
    return Ok(new { id = IdDivulgacao });
}
[HttpGet("{id}")]
public async Task<IActionResult> ListarPorId(int id) 
{
    var divulgacao = await _context.Divulgacoes.FindAsync(id);
    if (divulgacao == null) return NotFound();
    return Ok(divulgacao);
}
}
}