import { Router } from 'express';

import CreateUserService from '@modules/users/services/CreateUserService';

const usersRouter = Router();

usersRouter.post('/', async (request, response) => {
  const {
    name, email, password, hometown,
  } = request.body;

  const createUser = new CreateUserService();
  const createdUser = await createUser.execute({
    name, email, password, hometown,
  });

  return response.send(createdUser);
});

export default usersRouter;
