import { Router, Request, Response, NextFunction } from "express";
import * as menuController from "../controllers/menuController";

export const router: Router = Router();

router.get('/', (request: Request, response: Response, next: NextFunction) => {
    if (request.baseUrl.includes('admin')) {
        return next();
    }

    if (!request.session["customerName"]) {
        return response.redirect("/");
    }

    next();
}, menuController.getAllMenuItems);
router.get('/:id', menuController.getMenuItemById);
router.post('/', menuController.createMenuItem);
router.post('/:id/delete', menuController.deleteMenuItem);
router.post('/:id/edit', menuController.editMenuItemForm);
router.post('/:id', menuController.updateMenuItem);