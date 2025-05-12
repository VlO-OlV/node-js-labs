import { Request, Response } from 'express';
import path from "path";
import * as menuService from '../services/menuService';
import { MenuItem } from 'src/models/MenuItem';

const createPath = (page: string) => path.join(__dirname, '/../views', `${page}.ejs`);

export const getAllMenuItems = (request: Request, response: Response) => {
    const menuItems: MenuItem[] = menuService.getAllMenuItems();

    response.render(createPath('menu'), { menu: menuItems, isAdmin: request.baseUrl.includes('admin') });
};

export const getMenuItemById = (request: Request, response: Response) => {
    const menuItemId: number = parseInt(request.params.id);

    menuService.getMenuItemById(menuItemId).then((menuItem: MenuItem) => {
        response.render(createPath('menuItem'), { menuItem: menuItem, isAdmin: request.baseUrl.includes('admin') });
    }).catch((error) => {
        console.error(error);
        response.status(500).send('Internal Server Error');
    });
};

export const createMenuItem = (request: Request, response: Response) => {
    const menuItem: MenuItem = {
        id: 0,
        name: request.body.name,
        description: request.body.description,
        image: request.body.image,
        price: parseFloat(request.body.price)
    };

    menuService.createMenuItem(menuItem).then(() => {
        response.redirect('/admin/menu');
    }).catch((error) => {
        console.error(error);
        response.status(500).send('Internal Server Error');
    });
};

export const deleteMenuItem = (request: Request, response: Response) => {
    const menuItemId: number = parseInt(request.params.id);

    menuService.deleteMenuItem(menuItemId).then(() => {
        response.redirect('/admin/menu');
    }).catch((error) => {
        console.error(error);
        response.status(500).send('Internal Server Error');
    });
};
