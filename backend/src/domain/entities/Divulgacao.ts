export type Porte = 'P' | 'M' | 'G';

export interface Divulgacao {
  id: string;
  animal: string;
  idade?: number;
  porte: Porte;
  estado: string;
  cidade: string;
  sexo?: 'M' | 'F';
  observacao?: string;
  dataPublicacao: Date;
}