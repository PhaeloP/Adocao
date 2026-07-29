using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Adocao.Infra.Migrations
{
    /// <inheritdoc />
    public partial class AdicionarSobrenomeNoUsuario : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "Senha",
                table: "usuario",
                newName: "senha");

            migrationBuilder.RenameColumn(
                name: "Nome",
                table: "usuario",
                newName: "nome");

            migrationBuilder.RenameColumn(
                name: "Email",
                table: "usuario",
                newName: "email");

            migrationBuilder.RenameColumn(
                name: "Celular",
                table: "usuario",
                newName: "celular");

            migrationBuilder.AlterColumn<string>(
                name: "nome",
                table: "usuario",
                type: "VARCHAR(100)",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "longtext")
                .Annotation("MySql:CharSet", "utf8mb4")
                .OldAnnotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.AddColumn<string>(
                name: "sobrenome",
                table: "usuario",
                type: "VARCHAR(50)",
                nullable: false,
                defaultValue: "")
                .Annotation("MySql:CharSet", "utf8mb4");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "sobrenome",
                table: "usuario");

            migrationBuilder.RenameColumn(
                name: "senha",
                table: "usuario",
                newName: "Senha");

            migrationBuilder.RenameColumn(
                name: "nome",
                table: "usuario",
                newName: "Nome");

            migrationBuilder.RenameColumn(
                name: "email",
                table: "usuario",
                newName: "Email");

            migrationBuilder.RenameColumn(
                name: "celular",
                table: "usuario",
                newName: "Celular");

            migrationBuilder.AlterColumn<string>(
                name: "Nome",
                table: "usuario",
                type: "longtext",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "VARCHAR(100)")
                .Annotation("MySql:CharSet", "utf8mb4")
                .OldAnnotation("MySql:CharSet", "utf8mb4");
        }
    }
}
