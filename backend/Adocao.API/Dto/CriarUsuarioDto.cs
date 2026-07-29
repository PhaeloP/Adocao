using System.ComponentModel.DataAnnotations; 
namespace Adocao.API.Dto
{
public class CriarUsuarioDto
{
[Required(ErrorMessage = "O nome é obrigatório.")]
[StringLength(100, MinimumLength = 3, ErrorMessage = "O nome deve ter entre 3 e 100 caracteres.")]
public string Nome { get; set; } = string.Empty; 
[Required(ErrorMessage = "O sobrenome é obrigatório.")]
[StringLength(50, MinimumLength = 3, ErrorMessage = "O sobrenome deve ter entre 3 e 50 caracteres.")]
public string Sobrenome { get; set; } = string.Empty;
[Required(ErrorMessage = "O e-mail é obrigatório.")]
[EmailAddress(ErrorMessage = "O e-mail digitado é inválido.")]
public string Email { get; set; } = string.Empty;
[Required(ErrorMessage = "A senha é obrigatória.")]
[StringLength(20, MinimumLength = 6, ErrorMessage = "A senha deve ter entre 6 e 20 caracteres.")]
public string Senha { get; set; } = string.Empty;
[Required(ErrorMessage = "O celular é obrigatório.")]
[RegularExpression(@"^\d{11}\$", ErrorMessage = "O celular deve conter exatamente 11 dígitos numéricos (DDD + número).")]
public string Celular { get; set; } = string.Empty;
}

}