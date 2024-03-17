import * as express from 'express';
import { CreateBankController, GetBankByIdController, GetBankListController } from './controllers';

const routes = express.Router();


routes.get('/bank/list', GetBankListController);
routes.get('/bank/:id', GetBankByIdController);
routes.post('/bank', CreateBankController);


export default routes;