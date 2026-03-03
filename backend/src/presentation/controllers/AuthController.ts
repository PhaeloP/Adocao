import { Request, Response } from 'express';
import { Login } from '../../application/usecases/Login';

export class AuthController {
  constructor(private login: Login) {}

  loginHandler = async (req: Request, res: Response) => {
    try {
      const result = await this.login.execute(req.body);
      return res.json(result);
    } catch (err: any) {
      return res.status(400).json({ error: err.message });
    }
  };
}