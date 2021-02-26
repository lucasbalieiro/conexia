import express from 'express';

const app = express();

app.use(express.json());

app.get('/', (request, response) => {
  response.json({ message: 'Welcome to conexia API' });
});

app.listen(process.env.PORT || 3333, () => {
  // eslint-disable-next-line no-console
  console.info('Server started');
});
