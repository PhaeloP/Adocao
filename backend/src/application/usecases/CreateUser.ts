import bcrypt from 'bcryptjs';
import { UserRepository } from '../../domain/repositories/UserRepository';

type Input = { nome: string; email: string; senha: string; celular?: string };

export class CreateUser {
  constructor(private repo: UserRepository) {}

  async execute(input: Input) {
    if (!input.nome || !input.email || !input.senha) {
      throw new Error('nome, email e senha são obrigatórios');
    }

    const exists = await this.repo.findByEmail(input.email);
    if (exists) throw new Error('email já cadastrado');

    const senhaHash = await bcrypt.hash(input.senha, 10);

    const user = await this.repo.create({
      nome: input.nome,
      email: input.email,
      senhaHash,
      celular: input.celular
    });

    // nunca retorna hash
    return { id: user.id, nome: user.nome, email: user.email, celular: user.celular };
  }
}