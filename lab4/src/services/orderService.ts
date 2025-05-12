import { db } from 'src/database/client';
import { Order, OrderStatus } from 'src/database/models/Order';
import { OrderItem } from 'src/database/models/OrderItem';

export const getAllOrders = (): Promise<Order[]> => {
    return db.order.find();
};

export const getOrderById = (id: number): Promise<Order> => {
    return db.order.findById(id);
};

export const createOrder = (order: Order): Promise<Order> => {
    return db.order.create(order);
};

export const addOrderItem = (orderItem: Omit<OrderItem, 'id'>): Promise<void> => {
    return db.orderItem.create(orderItem);
};

export const updateOrderStatus = (orderId: number, status: OrderStatus): Promise<void> => {
    return db.order.updateById(orderId, { status });
}