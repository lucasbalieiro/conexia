import { Router } from 'express';
import { container } from 'tsyringe';

import CreateSessionService from '@modules/users/services/CreateSessionService';

const sessionsRouter = Router();

sessionsRouter.post('/', async (request, response) => {
  const { email, password } = request.body;

  const createSession = container.resolve(CreateSessionService);

  const sessionCreated = await createSession.execute({ email, password });

  return response.json(sessionCreated);
});

export default sessionsRouter;
