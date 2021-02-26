import 'reflect-metadata';
import './database';

import express from 'express';
import routes from './routes';

const app = express();

app.use(express.json());

app.use(routes);

app.get('/', (request, response) => {
  response.json({ message: 'Welcome to conexia API' });
});

app.listen(process.env.PORT || 3333, () => {
  // eslint-disable-next-line no-console
  console.info('Server started');
});
