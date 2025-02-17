import express from 'express';
import * as dotenv from 'dotenv';

const app = express();

dotenv.config({
  path: __dirname + '/.env',
});

const port = process.env.PORT || 3000;

app.get('/', (request, response) => {
  response.send('Hello world!');
});

app.listen(port, () => console.log(`Running on port ${port}`));