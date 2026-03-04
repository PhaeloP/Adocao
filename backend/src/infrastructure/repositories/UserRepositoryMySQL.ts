import { pool } from "../database/mysql";
import { User } from "../../domain/entities/User";
import { UserRepository } from "../../domain/repositories/UserRepository";

export class UserRepositoryMySQL implements UserRepository {
  async findByEmail(email: string): Promise<User | null> {
    const [rows] = await pool.query<any[]>(
      "SELECT id, nome, email, senha as senhaHash, celular FROM usuario WHERE email = ? LIMIT 1",
      [email]
    );

    const row = rows[0];
    if (!row) return null;

    return {
      id: String(row.id), // vira string no domínio, mas é INT no banco
      nome: row.nome,
      email: row.email,
      senhaHash: row.senhaHash,
      celular: row.celular ?? undefined
    };
  }

  async create(data: Omit<User, "id">): Promise<User> {
    const [result] = await pool.execute<any>(
      "INSERT INTO usuario (nome, email, senha, celular) VALUES (?, ?, ?, ?)",
      [data.nome, data.email, data.senhaHash, data.celular ?? null]
    );

    return {
      id: String(result.insertId),
      ...data
    };
  }
}