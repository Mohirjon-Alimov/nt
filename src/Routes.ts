import * as express from 'express';
import {
  ClientConfirmRegisterController,
  ClientListController,
  ClientLoginController,
  ClientRegisterController,
  CreateBankController,
  GetBankByIdController,
  GetBankListController,
  GetCardByIdController,
  GetCardListController,
  GetClientByIdController,
} from './controllers';
import { Transaction } from './controllers/transaction';

const routes = express.Router();


routes.get('/bank/list', GetBankListController);
routes.get('/bank/:id', GetBankByIdController);
routes.post('/bank', CreateBankController);


routes.get('/client/login', ClientLoginController);
routes.post('/client/register', ClientRegisterController);
routes.post('/client/register/confirm', ClientConfirmRegisterController);
routes.get('/client/list', ClientListController);
routes.get('/client/:id', GetClientByIdController);

routes.get('/card/list', GetCardListController);
routes.get('/card/:id', GetCardByIdController);

routes.post('/transaction', Transaction);

export default routes;