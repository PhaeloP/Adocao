import { randomUUID } from 'crypto';
import { Divulgacao } from '../../domain/entities/Divulgacao';
import { DivulgacaoFilters, DivulgacaoRepository } from '../../domain/repositories/DivulgacaoRepository';

export class DivulgacaoRepositoryInMemory implements DivulgacaoRepository {
  private items: Divulgacao[] = [];

  async list(filters: DivulgacaoFilters): Promise<Divulgacao[]> {
    return this.items.filter((d) => {
      if (filters.porte && d.porte !== filters.porte) return false;
      if (filters.idade && d.idade !== Number(filters.idade)) return false;
      if (filters.sexo && d.sexo !== filters.sexo) return false;
      if (filters.cidade && d.cidade !== filters.cidade) return false;
      if (filters.estado && d.estado !== filters.estado) return false;
      return true;
    });
  }

  async create(data: Omit<Divulgacao, 'id'>): Promise<Divulgacao> {
    const created: Divulgacao = { id: randomUUID(), ...data };
    this.items.push(created);
    return created;
  }
}