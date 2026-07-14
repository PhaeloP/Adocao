namespace Adocao.API.Dto
{
    public class CriarUsuarioDto
    {
        public required string Nome { get; set; }
        public required string Email { get; set; }
        public required string Senha { get; set; }
        public required string Celular { get; set; }
    }
}
