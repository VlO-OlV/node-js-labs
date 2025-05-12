import { db } from '../database/client';
import { Order, OrderStatus } from 'src/database/models/Order';
import { OrderItem } from 'src/database/models/OrderItem';

export const getAllOrders = async (): Promise<Array<Order & { items: OrderItem[] }>> => {
    const order = await db.order.find();
    return Promise.all(
        order.map(async (order) => {
            const items = await db.orderItem.find(order.id);
            return { ...order, items };
        })
    );
};

export const getOrderById = async (id: number): Promise<Order & { items: OrderItem[] }> => {
    const order = await db.order.findById(id);
    const items = await db.orderItem.find(id);
    return { ...order, items };
};

export const createOrder = (order: Omit<Order, 'id'>): Promise<Order> => {
    return db.order.create(order);
};

export const addOrderItem = (orderItem: Omit<OrderItem, 'id'>): Promise<void> => {
    return db.orderItem.create(orderItem);
};

export const updateOrderStatus = (orderId: number, status: OrderStatus): Promise<void> => {
    return db.order.updateById(orderId, { status });
}