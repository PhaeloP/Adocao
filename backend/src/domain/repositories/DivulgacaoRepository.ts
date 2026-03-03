import { Divulgacao } from '../entities/Divulgacao';

export interface DivulgacaoFilters {
  porte?: string;
  idade?: number;
  sexo?: string;
  cidade?: string;
  estado?: string;
}

export interface DivulgacaoRepository {
  list(filters: DivulgacaoFilters): Promise<Divulgacao[]>;
  create(data: Omit<Divulgacao, 'id'>): Promise<Divulgacao>;
}