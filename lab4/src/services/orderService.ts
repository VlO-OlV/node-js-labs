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
    return db.tx(async t => {
        return await t.order.create(order);
    });
};

export const addOrderItem = (orderItem: Omit<OrderItem, 'id'>): Promise<void> => {
    return db.tx(async t => {
        const order = await t.order.findById(orderItem.orderId);
        if (!order) {
            throw new Error('Order with id ${orderItem.orderId} not found');
        }
        const item = await db.orderItem.findById(orderItem.menuItemId);
        if (!item) {
            throw new Error('Menu item with id ${orderItem.menuItemId} not found');
        }
        await t.orderItem.create(orderItem);
    });
};

export const updateOrderStatus = (orderId: number, status: OrderStatus): Promise<void> => {
    return db.tx(async t => {
        const existingOrder = await t.order.findById(orderId);
        if (!existingOrder) {
            throw new Error('Order with id ${orderId} not found');
        }
        await t.order.updateById(orderId, { status });
    });
};