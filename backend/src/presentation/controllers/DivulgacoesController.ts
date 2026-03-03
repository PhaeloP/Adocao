import { Request, Response } from 'express';
import { ListDivulgacoes } from '../../application/usecases/ListDivulgacoes';
import { CreateDivulgacao } from '../../application/usecases/CreateDivulgacao';

export class DivulgacoesController {
  constructor(
    private listUseCase: ListDivulgacoes,
    private createUseCase: CreateDivulgacao
  ) {}

  list = async (req: Request, res: Response) => {
    const data = await this.listUseCase.execute(req.query as any);
    return res.json(data);
  };

  create = async (req: Request, res: Response) => {
    try {
      const created = await this.createUseCase.execute(req.body);
      return res.status(201).json(created);
    } catch (err: any) {
      return res.status(400).json({ error: err.message });
    }
  };
}