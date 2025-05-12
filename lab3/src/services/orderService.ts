import { Order } from 'src/models/Order';
import * as orderRepository from '../repositories/orderRepository';
import { OrderItem } from 'src/models/OrderItem';

export const getAllOrders = (): Promise<Order[]> => {
    return orderRepository.readOrders();
};

export const getOrderById = (id: number): Promise<Order> => {
    return orderRepository.readOrderById(id);
};

export const createOrder = (order: Order): Promise<Order> => {
    return orderRepository.createOrder(order);
};

export const addOrderItem = (orderId: number, orderItem: OrderItem): void => {
    return orderRepository.addOrderItem(orderId, orderItem);
};

export const updateOrderStatus = (orderId: number, status: string): Promise<void> => {
    return orderRepository.updateOrderStatus(orderId, status);
}