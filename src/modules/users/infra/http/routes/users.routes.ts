import { Router } from 'express';
import { container } from 'tsyringe';

import CreateUserService from '@modules/users/services/CreateUserService';

const usersRouter = Router();

usersRouter.post('/', async (request, response) => {
  const {
    name, email, password, hometown,
  } = request.body;
  const createUser = container.resolve(CreateUserService);
  const createdUser = await createUser.execute({
    name, email, password, hometown,
  });

  return response.send(createdUser);
});

export default usersRouter;
