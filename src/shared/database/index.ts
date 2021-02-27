/* eslint-disable no-console */
import { createConnection } from 'typeorm';

createConnection()
  .then(() => {
    console.info('Successfull database connection');
  })
  .catch((error) => {
    console.info(`Error database connection: ${error.message}`);
  });
