namespace Adocao.API.Dto
{
    public class LoginDto
    {
        /// <summary>
        /// Endereço de e-mail do usuário para autenticação.
        /// </summary>
        public string Email { get; set; } = string.Empty;

        /// <summary>
        /// Senha de acesso do usuário.
        /// </summary>
        public string Senha { get; set; } = string.Empty;
    }
}
