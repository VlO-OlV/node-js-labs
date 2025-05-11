import { Router } from "express";
import path from "path";
import { MenuItem } from "src/models/MenuItem";

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

router.get('/', (req, res) => {
    res.render(createPath('menu'), { menu: menuItems });
});

router.get('/:id', (req, res) => {});
router.post('/', (req, res) => {});
router.post('/:id/delete', (req, res) => {});
