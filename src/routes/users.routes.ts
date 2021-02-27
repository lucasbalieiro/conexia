import { Router } from 'express';

import CreateUserService from '../services/CreateUserService';

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

  return response.status(400).json({ error: error.message });
});

export default usersRouter;
