import { Router } from 'express';

import CreateUserService from '../services/CreateUserService';

const usersRouter = Router();

usersRouter.post('/', async (request, response) => {
  try {
    const {
      name, email, password, hometown,
    } = request.body;

    const userService = new CreateUserService();
    const createdUser = await userService.execute({
      name, email, password, hometown,
    });

    return response.send(createdUser);
  } catch (error) {
    return response.status(400).json({ error: error.message });
  }
});

export default usersRouter;
