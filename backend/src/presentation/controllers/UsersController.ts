import { Request, Response } from 'express';
import { CreateUser } from '../../application/usecases/CreateUser';

export class UsersController {
  constructor(private createUser: CreateUser) {}

  create = async (req: Request, res: Response) => {
    try {
      const user = await this.createUser.execute(req.body);
      return res.status(201).json(user);
    } catch (err: any) {
      return res.status(400).json({ error: err.message });
    }
  };
}