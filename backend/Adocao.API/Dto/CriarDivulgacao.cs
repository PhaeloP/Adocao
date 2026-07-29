using System.ComponentModel.DataAnnotations; 

namespace Adocao.API.Dto
{
public class CriarDivulgacao
{
[Required(ErrorMessage = "O ID do usuário é obrigatório.")]
public int UsuarioId { get; set; } 

[Required(ErrorMessage = "O nome do animal é obrigatório.")]
[StringLength(50, ErrorMessage = "O nome do animal não pode passar de 50 caracteres.")]
public string NomeAnimal { get; set; } = string.Empty;

[Required(ErrorMessage = "A idade é obrigatória.")]
[Range(0, 20, ErrorMessage = "A idade deve ser entre 0 (filhote) e 20 anos.")]
public int Idade { get; set; }

[Required(ErrorMessage = "O porte é obrigatório.")]
public string Porte { get; set; } = string.Empty;

[Required(ErrorMessage = "O sexo é obrigatório.")]
public string Sexo { get; set; } = string.Empty;

[Required(ErrorMessage = "A cidade é obrigatória.")]
public string Cidade { get; set; } = string.Empty;

[Required(ErrorMessage = "O estado é obrigatório.")]
[StringLength(2, MinimumLength = 2, ErrorMessage = "O estado deve conter exatamente 2 letras.")]
public string Estado { get; set; } = string.Empty;

[Required(ErrorMessage = "A descrição com as características do animal é obrigatória.")]
[StringLength(500, MinimumLength = 10, ErrorMessage = "A descrição deve ter entre 10 e 500 caracteres.")]
public string Descricao { get; set; } = string.Empty;

[Required(ErrorMessage = "O contato do responsável é obrigatório.")]
[StringLength(20, MinimumLength = 8, ErrorMessage = "O contato deve ter entre 8 e 20 caracteres.")]
public string Contato { get; set; } = string.Empty;

}

}