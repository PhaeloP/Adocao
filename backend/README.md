## Integração com MySQL

O backend foi configurado para utilizar MySQL como banco de dados.

### Configuração

A conexão com o banco é feita utilizando a biblioteca `mysql2` e variáveis de ambiente.

Arquivo `.env`:

DB_HOST=localhost
DB_USER=root
DB_PASSWORD=sua_senha
DB_NAME=adocao


### Estrutura do Banco

Database: `adocao`

Tabelas:

**usuario**

- id (INT, PK, AUTO_INCREMENT)
- nome (VARCHAR)
- email (VARCHAR, UNIQUE)
- senha (VARCHAR)
- celular (VARCHAR)

**divulgacao**

- id (INT, PK, AUTO_INCREMENT)
- usuario_id (INT, FK → usuario.id)
- nome_animal (VARCHAR)
- idade (INT)
- porte (ENUM: P, M, G)
- sexo (ENUM: M, F)
- cidade (VARCHAR)
- estado (VARCHAR)
- observacao (TEXT)
- data_publicacao (TIMESTAMP)

### Implementação no projeto

Foi criado um pool de conexão:
src/infrastructure/database/mysql.ts

Foram implementados repositories MySQL:
UserRepositoryMySQL
DivulgacaoRepositoryMySQL


O container da aplicação foi atualizado para utilizar os repositories MySQL em vez das implementações em memória.

### Resultado

A aplicação agora:

- cria usuários no MySQL
- autentica usuários utilizando dados do banco
- cria divulgações persistidas no banco
- lista divulgações diretamente do MySQL