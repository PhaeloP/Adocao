
namespace Adocao.API.Dto.CriarUsuarioDto
{
    public record class CriarUsuarioDto()
    {
      public string Nome {get; set;}
      public string Email {get; set;}
      public string Senha {get; set;}
      public string Celular {get; set;}
    }
}
