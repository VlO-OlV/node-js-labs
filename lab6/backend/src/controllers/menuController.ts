import { Request, Response } from 'express';
import * as menuService from '../services/menuService';
import { CreateMenuItemDto, MenuItemDto } from '../database/repositories/menuItemsRepository';

export const getAllMenuItems = (request: Request, response: Response) => {
    menuService.getAllMenuItems()
        .then((menuItems: MenuItemDto[]) => {
            response.status(200).json(menuItems.map((menuItem: MenuItemDto) => {
                return {
                    id: menuItem.id,
                    name: menuItem.name,
                    description: menuItem.description,
                    image: menuItem.image,
                    price: menuItem.price
                };
            }));
        }).catch((error) => {
            console.error(error);
            response.status(500).json({ message: 'Internal Server Error' });
        });
};

export const getMenuItemById = (request: Request, response: Response) => {
    const menuItemId: number = parseInt(request.params.id);

    menuService.getMenuItemById(menuItemId).then((menuItem: MenuItemDto) => {
        response.status(200).json({
            id: menuItem.id,
            name: menuItem.name,
            description: menuItem.description,
            image: menuItem.image,
            price: menuItem.price
        });
    }).catch((error) => {
        console.error(error);
        response.status(400).json({ message: 'Menu item with such id not found' });
    });
};

export const createMenuItem = (request: Request, response: Response) => {
    const menuItem: CreateMenuItemDto = {
        name: request.body.name,
        description: request.body.description,
        image: request.body.image,
        price: parseFloat(request.body.price)
    };

    menuService.createMenuItem(menuItem).then(() => {
        response.status(201).json({ message: "Menu item created" });
    }).catch((error) => {
        console.error(error);
        response.status(500).json({ message: 'Internal Server Error' });
    });
};

export const deleteMenuItem = (request: Request, response: Response) => {
    const menuItemId: number = parseInt(request.params.id);

    menuService.deleteMenuItem(menuItemId).then(() => {
        response.status(200).json({ message: "Menu item deleted" });
    }).catch((error: Error) => {
        console.error(error);
        if (error.message.indexOf('id') !== -1) {
            response.status(400).json({ message: error.message });
        }
        else {
            response.status(500).json({ message: 'Internal Server Error' });
        };
    });
};

export const updateMenuItem = (request: Request, response: Response) => {
    const menuItemId: number = parseInt(request.params.id);

    const updatedFields = {
        name: request.body.name,
        description: request.body.description,
        image: request.body.image,
        price: parseFloat(request.body.price),
    };

    menuService.updateMenuItem(menuItemId, updatedFields).then(() => {
        response.status(200).json({ message: "Menu item updated" });
    }).catch((error) => {
        console.error(error);
        if (error.message === 'Item not found') {
            response.status(404).json({ message: 'Menu item not found' });
        } else {
            response.status(500).json({ message: 'Internal Server Error' });
        }
    });
};