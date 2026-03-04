import { DivulgacaoRepositoryMySQL } from "../../infrastructure/repositories/DivulgacaoRepositoryMySQL";
import { UserRepositoryMySQL } from "../../infrastructure/repositories/UserRepositoryMySQL";
const userRepo = new UserRepositoryMySQL();

import { ListDivulgacoes } from '../../application/usecases/ListDivulgacoes';
import { CreateDivulgacao } from '../../application/usecases/CreateDivulgacao';
import { CreateUser } from '../../application/usecases/CreateUser';
import { Login } from '../../application/usecases/Login';

import { DivulgacoesController } from '../../presentation/controllers/DivulgacoesController';
import { UsersController } from '../../presentation/controllers/UsersController';
import { AuthController } from '../../presentation/controllers/AuthController';

export function buildContainer() {
  const divulgacaoRepo = new DivulgacaoRepositoryMySQL();
  const userRepo = new UserRepositoryMySQL();

  const divulgacoesController = new DivulgacoesController(
    new ListDivulgacoes(divulgacaoRepo),
    new CreateDivulgacao(divulgacaoRepo)
  );

  const usersController = new UsersController(new CreateUser(userRepo));
  const authController = new AuthController(new Login(userRepo));

  return { divulgacoesController, usersController, authController };
}