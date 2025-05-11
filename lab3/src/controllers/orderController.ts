import { Request, Response } from 'express';
import path from "path";
import * as orderService from '../services/orderService';
import * as menuService from '../services/menuService';
import { Order } from 'src/models/Order';
import { MenuItem } from 'src/models/MenuItem';

const createPath = (page: string) => path.join(__dirname, '/../views', `${page}.ejs`);

export const getAllOrders = (request: Request, response: Response) => {
    orderService.getAllOrders().then((orders: Order[]) => {
        response.render(createPath('order'), { orders: orders });
    }).catch((error) => {
        console.error(error);
        response.status(500).send('Internal Server Error');
    });
};

export const getOrderById = (request: Request, response: Response) => {
    const orderId: number = parseInt(request.params.id);

    orderService.getOrderById(orderId).then((order: Order) => {
        const menuItems: MenuItem[] = menuService.getAllMenuItems();

        response.render(createPath('orderItem'), { order: order, menu: menuItems, isAdmin: request.baseUrl.includes('admin') });
    }).catch((error) => {
        console.error(error);
        response.status(500).send('Internal Server Error');
    });
};

export const updateOrderStatus = (req: Request, res: Response) => { };

export const createOrder = (req: Request, res: Response) => { };

export const addOrderItems = (req: Request, res: Response) => { };