import express, { Request, Response, Express } from 'express';
import * as dotenv from 'dotenv';
import * as path from 'path'
import { router as menuRouter } from './routes/menuRoutes';
import { router as orderRouter } from './routes/orderRoutes';

const app: Express = express();

const createPath = (page: string) => path.join(__dirname, '/views', `${page}.ejs`);

dotenv.config({
    path: __dirname + '/.env',
});

const port: string | number = process.env.PORT || 3000;

app.set('view engine', 'ejs');
app.use(express.static('src/public/styles'));
app.use(express.static('src/public/images'));

app.use(express.urlencoded({ extended: true }));

app.use('/menu', menuRouter);
app.use('/orders', orderRouter);
app.use('/admin/menu', menuRouter);
app.use('/admin/orders', orderRouter);

app.use((request: Request, response: Response) => {
    response.status(404).send('Page not found');
});

app.listen(port, () => console.log(`Running on port ${port}`));