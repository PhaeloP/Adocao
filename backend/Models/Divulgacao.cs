namespace Adocao.Backend.Models
{
    public class Divulgacao
    {
        public int Id { get; set; }
        public string Animal { get; set; } = string.Empty;
        public int Idade { get; set; }
        public string Porte { get; set; } = string.Empty;
        public string Estado { get; set; } = string.Empty;
        public string Cidade { get; set; } = string.Empty;
        public string Sexo { get; set; } = string.Empty;
        public string Observacao { get; set; } = string.Empty;

        public int UsuarioId { get; set; }
        public Usuario? Usuario { get; set; }
    }
}