import express, { Request, Response, Express } from 'express';
import * as dotenv from 'dotenv';
import * as path from 'path'

type Member = {
    id: string;
    name: string;
    age: number;
    photo: string;
    git: string;
}

const app: Express = express();

const createPath = (page: string) => path.join(__dirname, '/views', `${page}.ejs`);

dotenv.config({
    path: __dirname + '/.env',
});

const port: string | number = process.env.PORT || 3000;

const members: Member[] = [
    { id: "1", name: "Pasha", age: 19, photo: "/pasha.jpg", git: "https://github.com/PavloSatyrenko" },
    { id: "2", name: "Vanya", age: 18, photo: "/vanya.jpg", git: "https://github.com/VlO-OlV" },
    { id: "3", name: "Vika", age: 18, photo: "/vika.jpg", git: "https://github.com/ViktoriiaUr" },
    { id: "4", name: "Oleh", age: 19, photo: "/oleh.jpg", git: "https://github.com/esaulovolehip31" }
];

app.set('view engine', 'ejs');
app.use(express.static('src/styles'));
app.use(express.static('src/images'));

app.get('/', (request: Request, response: Response) => {
    response.sendFile(__dirname + '/views/index.html');
});

app.get('/person/:id', (request: Request, response: Response) => {
    const person: Member = members.find((member: Member) => member.id == request.params.id);
    response.render(createPath('profile'), { person });
});

app.use((request: Request, response: Response) => {
    response.status(404).send('Page not found');
});

app.listen(port, () => console.log(`Running on port ${port}`));