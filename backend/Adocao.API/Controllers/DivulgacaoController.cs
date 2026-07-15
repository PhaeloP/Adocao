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
                Observacao = Criardivulgacao.Observacao
            };
            _context.Divulgacoes.Add(divulgacao);
            await _context.SaveChangesAsync();
            return Ok();
        }

        [HttpDelete]
        public async Task<IActionResult> Deletar(int IdDivulgacao) 
        {
            var divulgacao = await _context.Divulgacoes.FindAsync(IdDivulgacao);
            _context.Divulgacoes.Remove(divulgacao);
            await _context.SaveChangesAsync();
            return Ok(new {id = IdDivulgacao});
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