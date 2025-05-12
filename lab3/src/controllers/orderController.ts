import { Request, Response } from 'express';
import path from "path";
import * as orderService from '../services/orderService';
import * as menuService from '../services/menuService';
import { Order, OrderStatus } from '../models/Order';
import { MenuItem } from '../models/MenuItem';
import { OrderItem } from 'src/models/OrderItem';

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

export const updateOrderStatus = (request: Request, response: Response) => {
    const orderId: number = parseInt(request.params.id);
    const status: string = request.body.status;

    orderService.updateOrderStatus(orderId, status).then(() => {
        if (request.baseUrl.includes('admin')) {
            response.redirect('/admin/orders');
        }
        else {
            response.redirect('/menu');
        }
    }).catch((error) => {
        console.error(error);
        response.status(500).send('Internal Server Error');
    });
};

export const createOrder = (request: Request, response: Response) => {
    const order: Order = {
        id: 0,
        customerName: request.session["customerName"],
        status: OrderStatus.NEW,
        items: []
    };

    orderService.createOrder(order).then((order: Order) => {
        response.redirect('/orders/' + order.id);
    }).catch((error) => {
        console.error(error);
        response.status(500).send('Internal Server Error');
    });
};

export const addOrderItem = (request: Request, response: Response) => {
    const orderId: number = parseInt(request.params.id);
    const menuItemId: number = parseInt(request.body.menuItemId);
    const amount: number = parseInt(request.body.amount);

    const orderItem: OrderItem = {
        id: 0,
        menuItemId: menuItemId,
        amount: amount
    }

    orderService.addOrderItem(orderId, orderItem);

    response.redirect('/orders/' + orderId);
};