import { Router } from "express";
import * as orderController from "../controllers/orderController";

export const router: Router = Router();

router.get('/', orderController.getAllOrders);
router.get('/:id', orderController.getOrderById);
router.post('/', orderController.createOrder);
router.post('/:id', orderController.addOrderItem);
router.post('/:id/status', orderController.updateOrderStatus);
