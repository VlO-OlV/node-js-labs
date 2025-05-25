import { Request, Response } from 'express';
import * as orderService from '../services/orderService';
import { CreateOrderDto, OrderDto } from '../database/repositories/ordersRepository';
import { OrderStatus } from '../database/models/Order';
import { CreateOrderItemDto } from '../database/repositories/orderItemsRepository';

export const getAllOrders = (request: Request, response: Response) => {
    orderService.getAllOrders().then((orders: OrderDto[]) => {
        response.status(200).json([...orders]);
    }).catch((error) => {
        console.error(error);
        response.status(500).json({ message: 'Internal Server Error'});
    });
};

export const getOrderById = (request: Request, response: Response) => {
    const orderId: number = parseInt(request.params.id);

    orderService.getOrderById(orderId).then((order: OrderDto) => {
        response.status(200).json({ ...order });
    }).catch((error) => {
        console.error(error);
        response.status(400).send({ message: 'Order with such id not found' });
    });
};

export const updateOrderStatus = (request: Request, response: Response) => {
    const orderId: number = parseInt(request.params.id);
    const status: OrderStatus = request.body.status;

    orderService.updateOrderStatus(orderId, status).then(() => {
        response.status(200).json({ message: 'Order status updated' });
    }).catch((error: Error) => {
        console.error(error);
        if (error.message.indexOf('Order') !== -1) {
            response.status(400).json({ message: error.message });
        } else {
            response.status(500).json({ message: 'Internal Server Error'});
        }
    });
};

export const createOrder = (request: Request, response: Response) => {
    const order: CreateOrderDto = {
        customerName: request.session["customerName"],
        status: OrderStatus.NEW,
    };

    orderService.createOrder(order).then((order: OrderDto) => {
        response.status(201).json({ message: 'Order created' });
    }).catch((error) => {
        console.error(error);
        response.status(500).json({ message: 'Internal Server Error'});
    });
};

export const addOrderItem = (request: Request, response: Response) => {
    const orderId: number = parseInt(request.params.id);
    const menuItemId: number = parseInt(request.body.menuItemId);
    const amount: number = parseInt(request.body.amount);

    const orderItem: CreateOrderItemDto = {
        menuItemId: menuItemId,
        amount: amount,
        orderId: orderId,
    }

    orderService.addOrderItem(orderItem);

    response.redirect('/orders/' + orderId);
};