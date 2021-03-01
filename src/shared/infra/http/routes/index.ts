import { Router } from 'express';
import usersRouter from '@modules/users/infra/http/routes/users.routes';
import sessionsRouter from '@modules/users/infra/http/routes/sessions.routes';
import passwordRouter from '@modules/users/infra/http/routes/password.routes';
import musicRouter from '@modules/users/infra/http/routes/music.routes'

const routes = Router();

routes.use('/users', usersRouter);
routes.use('/sessions', sessionsRouter);
routes.use('/passwords', passwordRouter);
routes.use('/musics', musicRouter)

export default routes;
