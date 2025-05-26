import { Router } from "express";
import * as menuController from "../controllers/menuController";
import { idValidation } from '../middleware/validation/generalValidations';
import { createMenuItemValidation, updateMenuItemValidation } from '../middleware/validation/menuValidations';

export const router: Router = Router();

router.get('/', menuController.getAllMenuItems);
router.get('/:id', idValidation, menuController.getMenuItemById);
router.post('/', createMenuItemValidation, menuController.createMenuItem);
router.delete('/:id', idValidation, menuController.deleteMenuItem);
router.patch('/:id', [idValidation, ...updateMenuItemValidation], menuController.updateMenuItem);