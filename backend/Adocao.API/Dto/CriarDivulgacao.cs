using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Adocao.API.Dto
{
    // TODO: tirar campos nullables
    public class CriarDivulgacao
    {
        [Required(ErrorMessage = "O ID do usuário é obrigatório.")]
        public int UsuarioId { get; set; }

        [Column("nome_animal")]
        [StringLength(50, ErrorMessage = "O nome do animal não pode passar de 50 caracteres.")]
        public string? NomeAnimal { get; set; } 
        
        [Required(ErrorMessage = "A idade é obrigatória.")]
        [Range(0, 20, ErrorMessage = "A idade deve ser entre 0 (filhote) e 20 anos.")]
        public int? Idade { get; set; }

        [Required(ErrorMessage = "O porte é obrigatório.")]
        public string? Porte { get; set; } 

        [Required(ErrorMessage = "O sexo é obrigatório.")]
        public string? Sexo { get; set; } 

        [Required(ErrorMessage = "A cidade é obrigatória.")]
        public string? Cidade { get; set; }

        [Required(ErrorMessage = "O estado é obrigatório.")]
        [StringLength(2, MinimumLength = 2, ErrorMessage = "O estado deve conter exatamente 2 letras (ex: SP).")]
        public string? Estado { get; set; } 

        [Required(ErrorMessage = "A observação com os dados de contato é obrigatória.")]
        [StringLength(500, MinimumLength = 10, ErrorMessage = "A observação de contato deve ter entre 10 e 500 caracteres.")]
        public string? Observacao { get; set; } 
    }
}
