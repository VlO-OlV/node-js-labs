import express, { Request, Response, Express } from "express";
import * as dotenv from "dotenv";
import session from "express-session";
import { router as menuRouter } from "./routes/menuRoutes";
import { router as orderRouter } from "./routes/orderRoutes";
import { sequelize } from './database/client';

const app: Express = express();

dotenv.config();

const port: string | number = process.env.PORT || 3000;

sequelize.authenticate()
    .then(() => {
        console.log('Connected to db')
        sequelize.sync({ alter: true })
    })
    .catch(error => console.error(error))

app.use(express.urlencoded({ extended: true }));

app.use(session({
    secret: "mysecretkey",
    resave: false,
    saveUninitialized: true,
}));

app.use(express.json());

app.post("/auth", (request: Request, response: Response) => {
    request.session["customerName"] = request.body.customerName;
    response.status(201).json({ message: 'Log in successful' });
});

app.use("/menu", menuRouter);
app.use("/orders", orderRouter);
app.use("/admin/menu", menuRouter);
app.use("/admin/orders", orderRouter);

app.use((request: Request, response: Response) => {
    response.status(404).json({ message: "Endpoint not found"});
});

app.listen(port, () => console.log(`Running on port ${port}`));