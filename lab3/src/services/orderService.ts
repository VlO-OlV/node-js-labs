import { Order } from 'src/models/Order';
import * as orderRepository from '../repositories/orderRepository';

export const getAllOrders = (): Promise<Order[]> => {
    return orderRepository.getAllOrders();
};

export const getOrderById = (id: number): Promise<Order> => {
    return orderRepository.getOrderById(id);
};