import { Request, Response } from 'express';
import path from "path";
import * as orderService from '../services/orderService';
import { Order } from 'src/models/Order';

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
        response.render(createPath('orderItem'), { order: order, isAdmin: request.baseUrl.includes('admin') });
    }).catch((error) => {
        console.error(error);
        response.status(500).send('Internal Server Error');
    });
};

export const updateOrderStatus = (req: Request, res: Response) => { };

export const createOrder = (req: Request, res: Response) => { };

export const addOrderItems = (req: Request, res: Response) => { };