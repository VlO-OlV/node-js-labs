import express, { Request, Response, Express } from "express";
import * as dotenv from "dotenv";
import session from "express-session";
import { router as menuRouter } from "./routes/menuRoutes";
import { router as orderRouter } from "./routes/orderRoutes";

const app: Express = express();

dotenv.config();

const port: string | number = process.env.PORT || 3001;

app.set("view engine", "ejs");
app.use(express.static("src/public/styles"));
app.use(express.static("src/public/images"));

app.use(express.urlencoded({ extended: true }));

app.use(session({
    secret: "mysecretkey",
    resave: false,
    saveUninitialized: true,
}));

app.get("/", (request: Request, response: Response) => {
    response.sendFile(__dirname + "/views/index.html");
});

app.post("/", (request: Request, response: Response) => {
    request.session["customerName"] = request.body.customerName;
    response.redirect("/menu");
});

app.use("/menu", menuRouter);
app.use("/orders", orderRouter);
app.use("/admin/menu", menuRouter);
app.use("/admin/orders", orderRouter);

app.use((request: Request, response: Response) => {
    response.status(404).send("Page not found");
});

app.listen(port, () => console.log(`Running on port ${port}`));