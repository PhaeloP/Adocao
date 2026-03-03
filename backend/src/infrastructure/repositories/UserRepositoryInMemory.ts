import { randomUUID } from 'crypto';
import { User } from '../../domain/entities/User';
import { UserRepository } from '../../domain/repositories/UserRepository';

export class UserRepositoryInMemory implements UserRepository {
  private items: User[] = [];

  async findByEmail(email: string): Promise<User | null> {
    return this.items.find(u => u.email === email) ?? null;
  }

  async create(data: Omit<User, 'id'>): Promise<User> {
    const created: User = { id: randomUUID(), ...data };
    this.items.push(created);
    return created;
  }
}