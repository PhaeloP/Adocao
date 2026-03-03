import { DivulgacaoRepositoryInMemory } from '../../infrastructure/repositories/DivulgacaoRepositoryInMemory';
import { UserRepositoryInMemory } from '../../infrastructure/repositories/UserRepositoryInMemory';

import { ListDivulgacoes } from '../../application/usecases/ListDivulgacoes';
import { CreateDivulgacao } from '../../application/usecases/CreateDivulgacao';
import { CreateUser } from '../../application/usecases/CreateUser';
import { Login } from '../../application/usecases/Login';

import { DivulgacoesController } from '../../presentation/controllers/DivulgacoesController';
import { UsersController } from '../../presentation/controllers/UsersController';
import { AuthController } from '../../presentation/controllers/AuthController';

export function buildContainer() {
  const divulgacaoRepo = new DivulgacaoRepositoryInMemory();
  const userRepo = new UserRepositoryInMemory();

  const divulgacoesController = new DivulgacoesController(
    new ListDivulgacoes(divulgacaoRepo),
    new CreateDivulgacao(divulgacaoRepo)
  );

  const usersController = new UsersController(new CreateUser(userRepo));
  const authController = new AuthController(new Login(userRepo));

  return { divulgacoesController, usersController, authController };
}