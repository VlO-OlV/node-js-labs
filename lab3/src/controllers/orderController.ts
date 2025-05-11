import { Request, Response } from 'express';
import * as orderService from '../services/orderService';

export const getAllOrders = (req: Request, res: Response) => {
  const orders = orderService.getAllOrders();
  orders.then((data) => {
    res.send(data);
  }).catch((error) => {
    console.error('Error fetching orders');
    res.status(500).send('Internal Server Error');
  });
};

export const getOrderById = (req: Request, res: Response) => {
  const orderId = parseInt(req.params.id);
  const order = orderService.getOrderById(orderId);
  order.then((data) => {
    if (data) {
      res.send(data);
    } else {
      res.status(404).send('Order not found');
    }
  }).catch((error) => {
    console.error('Error fetching order');
    res.status(500).send('Internal Server Error');
  });
};

export const updateOrderStatus = (req: Request, res: Response) => {};

export const createOrder = (req: Request, res: Response) => {};

export const addOrderItems = (req: Request, res: Response) => {};