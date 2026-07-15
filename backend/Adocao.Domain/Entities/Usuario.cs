namespace Adocao.Domain.Entities
{
    public class Usuario
    {
        public ICollection<Divulgacao> Divulgacoes { get; set; } = new List<Divulgacao>();
        public int Id { get; set; }
        public string Nome { get; set; } = string.Empty;
        public string Email { get; set; } = string.Empty;
        public string Senha { get; set; } = string.Empty;
        public string Celular { get; set; } = string.Empty;

    }
}
