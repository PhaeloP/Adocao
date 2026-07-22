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
                NomeAnimal = Criardivulgacao.NomeAnimal, // <--- Casamento perfeito!
                Idade = Criardivulgacao.Idade.Value,
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

        [HttpPut("{id}")]
        public async Task<IActionResult> Atualizar(int id, AtualizarDivulgacaoDto dto)
        {
            var divulgacao = await _context.Divulgacoes.FindAsync(id);

            if (divulgacao == null)
                return NotFound();

            // Atualiza apenas as propriedades do animal (sem alterar o UsuarioId)
            divulgacao.NomeAnimal = dto.NomeAnimal;
            divulgacao.Idade = dto.Idade.Value; // .Value porque o DTO agora usa int?
            divulgacao.Porte = dto.Porte;
            divulgacao.Sexo = dto.Sexo;
            divulgacao.Cidade = dto.Cidade;
            divulgacao.Estado = dto.Estado;
            divulgacao.Observacao = dto.Observacao;

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
