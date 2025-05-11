import { Router, Request, Response } from "express";
import path from "path";
import * as orderController from "../controllers/orderController";

export const router: Router = Router();

const createPath = (page: string) => path.join(__dirname, '/../views', `${page}.ejs`);

router.get('/', orderController.getAllOrders);
router.get('/:id', orderController.getOrderById);
