using System.ComponentModel.DataAnnotations.Schema; 

namespace Adocao.Domain.Entities
{
public class Usuario
{
public int Id { get; set; } 
[Column("nome", TypeName = "VARCHAR(100)")]
public string Nome { get; set; } = string.Empty;
[Column("sobrenome", TypeName = "VARCHAR(50)")]
public string Sobrenome { get; set; } = string.Empty;
[Column("email")]
public string Email { get; set; } = string.Empty;
[Column("senha")]
public string Senha { get; set; } = string.Empty;
[Column("celular")]
public string Celular { get; set; } = string.Empty;
public ICollection<Divulgacao> Divulgacoes { get; set; } = new List<Divulgacao>();
}
}