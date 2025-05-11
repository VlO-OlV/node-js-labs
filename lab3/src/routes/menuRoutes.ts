import { Router } from "express";
import path from "path";
import { MenuItem } from "src/models/MenuItem";
import * as menuController from "../controllers/menuController";

export const router: Router = Router();

const createPath = (page: string) => path.join(__dirname, '/../views', `${page}.ejs`);

const menuItems: MenuItem[] = [{
    id: 1,
    name: 'Pizza',
    description: 'Delicious cheese pizza',
    price: 10,
    image: '/images/pizza.jpg'
}, {
    id: 2,
    name: 'Burger',
    description: 'Juicy beef burger',
    price: 8,
    image: '/images/burger.jpg'
}, {
    id: 3,
    name: 'Pizza',
    description: 'Delicious cheese pizza',
    price: 10,
    image: '/images/pizza.jpg'
}, {
    id: 4,
    name: 'Burger',
    description: 'Juicy beef burger',
    price: 8,
    image: '/images/burger.jpg'
}];

router.get('/', menuController.getAllMenuItems);

router.get('/:id', menuController.getMenuItemById);
router.post('/', (req, res) => {});
router.post('/:id/delete', (req, res) => {});
