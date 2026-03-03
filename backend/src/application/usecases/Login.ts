import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { UserRepository } from '../../domain/repositories/UserRepository';

type Input = { email: string; senha: string };

export class Login {
  constructor(private repo: UserRepository) {}

  async execute(input: Input) {
    if (!input.email || !input.senha) throw new Error('email e senha são obrigatórios');

    const user = await this.repo.findByEmail(input.email);
    if (!user) throw new Error('credenciais inválidas');

    const ok = await bcrypt.compare(input.senha, user.senhaHash);
    if (!ok) throw new Error('credenciais inválidas');

    const secret = process.env.JWT_SECRET;
    if (!secret) throw new Error('JWT_SECRET não configurado');

    const token = jwt.sign(
      { sub: user.id, email: user.email },
      secret,
      { expiresIn: process.env.JWT_EXPIRES_IN || '1d' }
    );

    return { token, user: { id: user.id, nome: user.nome, email: user.email } };
  }
}