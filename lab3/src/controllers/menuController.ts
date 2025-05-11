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

export const createMenuItem = (req: Request, res: Response) => { };

export const deleteMenuItem = (req: Request, res: Response) => { };