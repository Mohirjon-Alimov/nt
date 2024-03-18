import * as express from 'express';
import { CreateBankController, GetBankByIdController, GetBankListController, SomeController } from './controllers';

const routes = express.Router();


routes.get('/bank/list', GetBankListController);
routes.get('/bank/:id', GetBankByIdController);
routes.post('/bank', CreateBankController);


routes.get('/some', SomeController)

export default routes;