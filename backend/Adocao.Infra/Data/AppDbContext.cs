using Adocao.Domain.Entities;
using Microsoft.EntityFrameworkCore;

namespace Adocao.Infra.Data;

public class AppDbContext : DbContext
{
    public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
    {
    }

    public DbSet<Usuario> Usuarios { get; set; }
    public DbSet<Divulgacao> Divulgacoes { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);

        modelBuilder.Entity<Usuario>(entity =>
        {
            entity.ToTable("usuario");
            entity.HasKey(x => x.Id);

        });

        modelBuilder.Entity<Divulgacao>(entity =>
        {
            entity.ToTable("divulgacao");
            entity.HasKey(x => x.Id);
        });
    }
}