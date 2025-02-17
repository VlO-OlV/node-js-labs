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

const members = [
  { id: "1", name: "Pasha", age: 19, photo: "/pasha.jpg" },
  { id: "2", name: "Vanya", age: 18, photo: "https://upload.wikimedia.org/wikipedia/commons/9/99/Sample_User_Icon.png" },
  { id: "3", name: "Vika", age: 18, photo: "/vika.jpg" },
  { id: "4", name: "Oleh", age: 19, photo: "https://upload.wikimedia.org/wikipedia/commons/9/99/Sample_User_Icon.png" }
];

app.set('view engine', 'ejs');
app.use(express.static('src/styles'));
app.use(express.static('src/images'));

app.get('/', (request: Request, response: Response) => {
  response.sendFile(__dirname + '/views/index.html');
});

app.get('/person/:id', (request: Request, response: Response) => {
  const person = members.find(s => s.id === request.params.id);
  response.render(createPath('profile'), {person});
});

app.use((request: Request, response: Response) => {
  response.status(404).send('Page not found');
});

app.listen(port, () => console.log(`Running on port ${port}`));