import express, { Request, Response } from 'express';
import * as dotenv from 'dotenv';
import * as path from 'path'

const app = express();

const createPath = (page: string) => path.join(__dirname, '/views', `${page}.ejs`);

dotenv.config({
  path: __dirname + '/.env',
});

const port = process.env.PORT || 3000;

app.use(express.static('src/styles'));
app.use(express.static('src/images'));

app.get('/', (request: Request, response: Response) => {
  response.sendFile(__dirname + '/views/index.html');
});

app.get('/person/:id', (request: Request, response: Response) => {
  const personId = request.params.id;
  response.render(createPath('profile'), {});
});

app.use((request: Request, response: Response) => {
  response.status(404).send('Page not found');
});

app.listen(port, () => console.log(`Running on port ${port}`));