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

            modelBuilder.Entity<Divulgacao>(entity =>
            {
                entity.ToTable("divulgacao");

                entity.HasKey(d => d.Id);

                entity.Property(d => d.Id).HasColumnName("id");
                entity.Property(d => d.Animal).HasColumnName("animal");
                entity.Property(d => d.Idade).HasColumnName("idade");
                entity.Property(d => d.Porte).HasColumnName("porte");
                entity.Property(d => d.Estado).HasColumnName("estado");
                entity.Property(d => d.Cidade).HasColumnName("cidade");
                entity.Property(d => d.Sexo).HasColumnName("sexo");
                entity.Property(d => d.Observacao).HasColumnName("observacao");
                entity.Property(d => d.UsuarioId).HasColumnName("usuario_id");

                entity.HasOne<Usuario>()
                      .WithMany()
                      .HasForeignKey(d => d.UsuarioId);
            });
        });

        modelBuilder.Entity<Divulgacao>(entity =>
        {
            entity.ToTable("divulgacao");
            entity.HasKey(x => x.Id);

            entity.Property(x => x.Id).HasColumnName("id");
            entity.Property(x => x.UsuarioId).HasColumnName("usuario_id");

            entity.HasOne(x => x.Usuario)
                  .WithMany(x => x.Divulgacoes)
                  .HasForeignKey(x => x.UsuarioId);
        });
    }
}