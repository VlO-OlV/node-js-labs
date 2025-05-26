import { Router } from "express";
import * as menuController from "../controllers/menuController";
import { idValidation } from '../middleware/validation/generalValidations';
import { createMenuItemValidation, updateMenuItemValidation } from '../middleware/validation/menuValidations';
import { validationMiddleware } from '../middleware/validation/validationMiddleware';

export const router: Router = Router();

router.get('/', menuController.getAllMenuItems);
router.get('/:id', [idValidation, validationMiddleware], menuController.getMenuItemById);
router.post('/', [...createMenuItemValidation, validationMiddleware], menuController.createMenuItem);
router.delete('/:id', [idValidation, validationMiddleware], menuController.deleteMenuItem);
router.patch('/:id', [idValidation, ...updateMenuItemValidation, validationMiddleware], menuController.updateMenuItem);