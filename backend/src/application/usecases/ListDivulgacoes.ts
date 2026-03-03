import { DivulgacaoRepository, DivulgacaoFilters } from '../../domain/repositories/DivulgacaoRepository';

export class ListDivulgacoes {
  constructor(private repo: DivulgacaoRepository) {}

  execute(filters: DivulgacaoFilters) {
    return this.repo.list(filters);
  }
}