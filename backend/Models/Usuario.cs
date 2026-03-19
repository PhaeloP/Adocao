namespace Adocao.Backend.Models
{
    public class Usuario
    {
        public int Id { get; set; }
        public string Nome { get; set; } = string.Empty;
        public string Email { get; set; } = string.Empty;
        public string Senha { get; set; } = string.Empty;
        public string Celular { get; set; } = string.Empty;

        public List<Divulgacao> Divulgacoes { get; set; } = new();
    }
}