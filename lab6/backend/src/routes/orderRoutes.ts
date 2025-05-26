import { Router } from "express";
import * as orderController from "../controllers/orderController";
import { idValidation, paginationQueryValidation } from '../middleware/validation/generalValidations';
import { addOrderItemValidation, orderFiltersValidation, updateOrderValidation } from '../middleware/validation/orderValidations';
import { validationMiddleware } from '../middleware/validation/validationMiddleware';

export const router: Router = Router();

router.get('/', [...paginationQueryValidation, ...orderFiltersValidation, validationMiddleware], orderController.getAllOrders);
router.get('/:id', [idValidation, validationMiddleware], orderController.getOrderById);
router.post('/', orderController.createOrder);
router.patch('/:id', [idValidation, ...addOrderItemValidation, validationMiddleware], orderController.addOrderItem);
router.patch('/:id/status', [idValidation, ...updateOrderValidation, validationMiddleware], orderController.updateOrderStatus);
