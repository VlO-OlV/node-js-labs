import { Router } from "express";
import * as orderController from "../controllers/orderController";
import { idValidation, paginationQueryValidation } from '../middleware/validation/generalValidations';
import { addOrderItemValidation, updateOrderValidation } from '../middleware/validation/orderValidations';

export const router: Router = Router();

router.get('/', paginationQueryValidation, orderController.getAllOrders);
router.get('/:id', idValidation, orderController.getOrderById);
router.post('/', orderController.createOrder);
router.patch('/:id', [idValidation, ...addOrderItemValidation], orderController.addOrderItem);
router.patch('/:id/status', [idValidation, ...updateOrderValidation], orderController.updateOrderStatus);
