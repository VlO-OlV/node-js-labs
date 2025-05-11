import { Router } from "express";
import path from "path";
import * as orderController from "../controllers/orderController";

export const router: Router = Router();

const createPath = (page: string) => path.join(__dirname, '/../views', `${page}.ejs`);

router.get('/', orderController.getAllOrders);
router.get('/:id', orderController.getOrderById);
router.post('/', (req, res) => {});
router.post('/:id/items', (req, res) => {});
router.post('/:id/status', (req, res) => {});
