import express, { Request, Response, Express } from 'express';
import * as dotenv from 'dotenv';
import * as path from 'path'

const app: Express = express();

const createPath = (page: string) => path.join(__dirname, '/views', `${page}.ejs`);

dotenv.config({
    path: __dirname + '/.env',
});

const port: string | number = process.env.PORT || 3000;

app.set('view engine', 'ejs');
app.use(express.static('src/public/styles'));
app.use(express.static('src/public/images'));

app.get('/', (request: Request, response: Response) => {
    response.sendFile(__dirname + '/views/index.html');
});

app.use((request: Request, response: Response) => {
    response.status(404).send('Page not found');
});

app.listen(port, () => console.log(`Running on port ${port}`));