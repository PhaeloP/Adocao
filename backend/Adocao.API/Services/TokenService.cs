using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Microsoft.IdentityModel.Tokens;

namespace Adocao.API.Services
{
    public class TokenService
    {
        private readonly IConfiguration _configuration;

        public TokenService(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        public string GerarToken(string email, string id)
        {
            var tokenHandler = new JwtSecurityTokenHandler();
            
            // Busca a chave secreta que configuramos no appsettings.json
            var key = Encoding.ASCII.GetBytes(_configuration["Jwt:Secret"]??"");

            // Define as informações que vão dentro do Token (Claims)
            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(new[]
                {
                    new Claim(ClaimTypes.NameIdentifier, id),
                    new Claim(ClaimTypes.Email, email)
                }),
                Expires = DateTime.UtcNow.AddHours(2), // O token expira em 2 horas
                SigningCredentials = new SigningCredentials(
                    new SymmetricSecurityKey(key), 
                    SecurityAlgorithms.HmacSha256Signature
                ),
                Issuer = _configuration["Jwt:Issuer"],
                Audience = _configuration["Jwt:Audience"]
            };

            var token = tokenHandler.CreateToken(tokenDescriptor);
            return tokenHandler.WriteToken(token);
        }
    }
}
