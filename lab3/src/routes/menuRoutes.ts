import { Router } from "express";
import * as menuController from "../controllers/menuController";

export const router: Router = Router();

router.get('/', menuController.getAllMenuItems);

router.get('/:id', menuController.getMenuItemById);
router.post('/', (req, res) => { });
router.post('/:id/delete', (req, res) => { });
