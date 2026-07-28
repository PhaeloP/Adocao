using System.ComponentModel.DataAnnotations;

namespace Adocao.API.Dto
{
    public class AtualizarDivulgacaoDto
    {
        // TODO: o nome do animal deve ser obrigatorio ? se sim usar required nesse campo.
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
        [StringLength(2, MinimumLength = 2, ErrorMessage = "O estado deve conter exatamente 2 letras (ex: SP).")] // TODO: tira esse ex
        public string? Estado { get; set; } 

        // TODO: esse campos no banco aguenta 500 caracteres ?
        // TODO: Observaçao é um nome ruim pra esse campo
        [Required(ErrorMessage = "A observação com os dados de contato é obrigatória.")]
        [StringLength(500, MinimumLength = 10, ErrorMessage = "A observação de contato deve ter entre 10 e 500 caracteres.")]
        public string? Observacao { get; set; } 
    }
}