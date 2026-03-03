import { Router } from 'express';
import { buildContainer } from '../../main/config/container';
import { auth } from '../../main/middlewares/auth';

export const routes = Router();

const { divulgacoesController, usersController, authController } = buildContainer();

routes.get('/health', (_req, res) => res.json({ ok: true }));

routes.post('/users', usersController.create);
routes.post('/auth/login', authController.loginHandler);

routes.get('/divulgacoes', divulgacoesController.list);
routes.post('/divulgacoes', auth, divulgacoesController.create);