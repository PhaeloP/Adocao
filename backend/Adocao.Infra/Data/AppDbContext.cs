using Microsoft.EntityFrameworkCore;
using Adocao.Domain.Entities;

namespace Adocao.Infra.Data
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
        {
        }

        public DbSet<Usuario> Usuarios { get; set; }
        public DbSet<Divulgacao> Divulgacoes { get; set; }
    }
}