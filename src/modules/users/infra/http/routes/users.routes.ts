import { Router } from 'express';

import UsersController from '../controllers/UsersController';

const usersRouter = Router();
const usersControlller = new UsersController();

usersRouter.post('/', usersControlller.create);

export default usersRouter;
