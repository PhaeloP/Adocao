import { Divulgacao } from '../../domain/entities/Divulgacao';
import { DivulgacaoRepository } from '../../domain/repositories/DivulgacaoRepository';

type Input = Omit<Divulgacao, 'id' | 'dataPublicacao'> & { dataPublicacao?: Date };

export class CreateDivulgacao {
  constructor(private repo: DivulgacaoRepository) {}

  execute(input: Input) {
    if (!input.animal || !input.porte || !input.cidade || !input.estado) {
      throw new Error('animal, porte, cidade e estado são obrigatórios');
    }

    return this.repo.create({
      ...input,
      dataPublicacao: input.dataPublicacao ?? new Date()
    });
  }
}