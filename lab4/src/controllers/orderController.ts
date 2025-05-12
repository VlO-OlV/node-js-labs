import { Request, Response } from 'express';
import path from "path";
import * as orderService from '../services/orderService';
import * as menuService from '../services/menuService';
import { Order, OrderStatus } from '../database/models/Order';
import { MenuItem } from '../database/models/MenuItem';
import { OrderItem } from 'src/database/models/OrderItem';

const createPath = (page: string) => path.join(__dirname, '/../views', `${page}.ejs`);

export const getAllOrders = (request: Request, response: Response) => {
    orderService.getAllOrders().then((orders: Array<Order & { items: OrderItem[] }>) => {
        response.render(createPath('order'), { orders: orders });
    }).catch((error) => {
        console.error(error);
        response.status(500).send('Internal Server Error');
    });
};

export const getOrderById = (request: Request, response: Response) => {
    const orderId: number = parseInt(request.params.id);

    orderService.getOrderById(orderId).then((order: Order & { items: OrderItem[] }) => {
        menuService.getAllMenuItems()
            .then((menuItems: MenuItem[]) => {
                response.render(createPath('orderItem'), { order: order, menu: menuItems, isAdmin: request.baseUrl.includes('admin') });
            })
            .catch((error) => {
                console.error(error);
                response.status(500).send('Internal Server Error');
            });
    }).catch((error) => {
        console.error(error);
        response.status(500).send('Internal Server Error');
    });
};

export const updateOrderStatus = (request: Request, response: Response) => {
    const orderId: number = parseInt(request.params.id);
    const status: OrderStatus = request.body.status;

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
    const order: Omit<Order, 'id'> = {
        customerName: request.session["customerName"],
        status: OrderStatus.NEW,
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

    const orderItem: Omit<OrderItem, 'id'> = {
        menuItemId: menuItemId,
        amount: amount,
        orderId: orderId,
    }

    orderService.addOrderItem(orderItem);

    response.redirect('/orders/' + orderId);
};