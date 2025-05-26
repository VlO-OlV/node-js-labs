import { Request, Response } from 'express';
import * as orderService from '../services/orderService';
import { CreateOrderDto, OrderDto } from '../database/repositories/ordersRepository';
import { OrderStatus } from '../database/models/Order';
import { CreateOrderItemDto } from '../database/repositories/orderItemsRepository';

export const getAllOrders = (request: Request, response: Response) => {
    const { status, page, limit }: { status?: OrderStatus, page?: number, limit?: number } = request.query;

    orderService.getAllOrders(page, limit, status)
        .then((orders: OrderDto[]) => {
            response.status(200).json(orders.map((order: OrderDto) => {
                return {
                    id: order.id,
                    customerName: order.customerName,
                    status: order.status,
                    orderItems: order.orderItems?.map((item) => ({
                        id: item.id,
                        menuItemId: item.menuItemId,
                        amount: item.amount,
                    }))
                };
            }));
        }).catch((error) => {
            console.error(error);
            response.status(500).json({ message: 'Internal Server Error' });
        });
};

export const getOrderById = (request: Request, response: Response) => {
    const orderId: number = parseInt(request.params.id);

    orderService.getOrderById(orderId).then((order: OrderDto) => {
        response.status(200).json({
            id: order.id,
            customerName: order.customerName,
            status: order.status,
            orderItems: order.orderItems?.map((item) => ({
                id: item.id,
                menuItemId: item.menuItemId,
                amount: item.amount,
            }))
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
        response.status(200).json({ message: "Order status updated" });
    }).catch((error) => {
        console.error(error);
        response.status(500).send('Internal Server Error');
    });
};

export const createOrder = (request: Request, response: Response) => {
    const order: CreateOrderDto = {
        customerName: request.body.customerName,
        status: request.body.status,
    };

    orderService.createOrder(order).then((order: OrderDto) => {
        response.status(201).json({
            id: order.id,
            customerName: order.customerName,
            status: order.status,
            orderItems: order.orderItems?.map((item) => ({
                id: item.id,
                menuItemId: item.menuItemId,
                amount: item.amount,
            }))
        });
    }).catch((error) => {
        console.error(error);
        response.status(500).send('Internal Server Error');
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

    orderService.addOrderItem(orderItem).then(() => {
        response.status(201).json({ message: "Order item created" });
    }).catch((error) => {
        console.error(error);
        response.status(500).send('Internal Server Error');
    });;
};