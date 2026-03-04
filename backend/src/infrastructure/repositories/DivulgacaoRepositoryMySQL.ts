import { pool } from "../database/mysql";
import { Divulgacao } from "../../domain/entities/Divulgacao";
import {
  DivulgacaoFilters,
  DivulgacaoRepository
} from "../../domain/repositories/DivulgacaoRepository";

export class DivulgacaoRepositoryMySQL implements DivulgacaoRepository {
  async list(filters: DivulgacaoFilters): Promise<Divulgacao[]> {
    const where: string[] = [];
    const params: any[] = [];

    if (filters.porte) { where.push("porte = ?"); params.push(filters.porte); }
    if (filters.idade !== undefined) { where.push("idade = ?"); params.push(Number(filters.idade)); }
    if (filters.sexo) { where.push("sexo = ?"); params.push(filters.sexo); }
    if (filters.cidade) { where.push("cidade = ?"); params.push(filters.cidade); }
    if (filters.estado) { where.push("estado = ?"); params.push(filters.estado); }

    const sql = `
      SELECT
        id,
        nome_animal as animal,
        idade,
        porte,
        sexo,
        cidade,
        estado,
        observacao,
        data_publicacao as dataPublicacao
      FROM divulgacao
      ${where.length ? "WHERE " + where.join(" AND ") : ""}
      ORDER BY data_publicacao DESC
    `;

    const [rows] = await pool.query<any[]>(sql, params);

    return rows.map(r => ({
      id: String(r.id),
      animal: r.animal,
      idade: r.idade === null ? undefined : Number(r.idade),
      porte: r.porte,
      sexo: r.sexo ?? undefined,
      cidade: r.cidade,
      estado: r.estado,
      observacao: r.observacao ?? undefined,
      dataPublicacao: new Date(r.dataPublicacao)
    }));
  }

  async create(data: Omit<Divulgacao, "id">): Promise<Divulgacao> {
    // por enquanto, vamos “fixar” usuario_id = 1 só pra testar.
    // depois vamos pegar do JWT (sub) e usar o id do usuário logado.
    const usuarioId = 1;

    const sql = `
      INSERT INTO divulgacao
        (usuario_id, nome_animal, idade, porte, sexo, cidade, estado, observacao)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `;

    const params = [
      usuarioId,
      data.animal,
      data.idade ?? null,
      data.porte,
      data.sexo ?? null,
      data.cidade,
      data.estado,
      data.observacao ?? null
    ];

    const [result] = await pool.execute<any>(sql, params);

    const insertedId = String(result.insertId);

    return {
      id: insertedId,
      ...data,
      dataPublicacao: data.dataPublicacao ?? new Date()
    };
  }
}