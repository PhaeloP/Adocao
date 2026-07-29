using System.ComponentModel.DataAnnotations.Schema; 

namespace Adocao.Domain.Entities
{
public class Divulgacao
{
public int Id { get; set; } 
[Column("usuario_id")]
public int UsuarioId { get; set; }
[Column("nome_animal")]
public string NomeAnimal { get; set; } = string.Empty;
public int Idade { get; set; }
public string Porte { get; set; } = string.Empty;
public string Sexo { get; set; } = string.Empty;
public string Cidade { get; set; } = string.Empty;
public string Estado { get; set; } = string.Empty;
[Column("descricao", TypeName = "VARCHAR(500)")]
public string Descricao { get; set; } = string.Empty;
[Column("contato", TypeName = "VARCHAR(11)")]
public string Contato { get; set; } = string.Empty;
[Column("data_publicacao")]
[DatabaseGenerated(DatabaseGeneratedOption.Identity)]
public DateTime DataPublicacao { get; set; }
}
}