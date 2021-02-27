import { Router } from 'express';

import CreateSessionService from '../services/CreateSessionService';

const sessionsRouter = Router();

sessionsRouter.post('/', async (request, response) => {
  const { email, password } = request.body;

  const createSession = new CreateSessionService();

  const sessionCreated = await createSession.execute({ email, password });

  return response.json(sessionCreated);

  return response.status(400).json({ error: error.message });
});

export default sessionsRouter;
