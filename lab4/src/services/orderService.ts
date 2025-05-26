import { MenuItem } from 'src/database/models/MenuItem';
import { db } from '../database/client';
import { Order, OrderStatus } from 'src/database/models/Order';
import { OrderItem } from 'src/database/models/OrderItem';

export const getAllOrders = async (): Promise<Array<Order & { items: OrderItem[] }>> => {
    const ordersResult: { id: number; customer_name: string; status: OrderStatus; }[] = await db.order.find();

    const orders: Order[] = ordersResult.map((order: { id: number; customer_name: string; status: OrderStatus; }) => ({
        id: order.id,
        customerName: order.customer_name,
        status: order.status,
    }));

    return Promise.all(
        orders.map(async (order: Order) => {
            const itemsResult: { id: number; order_id: number; menu_item_id: number; amount: number; }[] = await db.orderItem.find(order.id);
            const items: OrderItem[] = itemsResult.map((item: { id: number; order_id: number; menu_item_id: number; amount: number; }) => ({
                id: item.id,
                orderId: item.order_id,
                menuItemId: item.menu_item_id,
                amount: item.amount,
            }));

            return { ...order, items };
        })
    );
};

export const getOrderById = async (id: number): Promise<Order & { items: OrderItem[] }> => {
    const orderResult: { id: number; customer_name: string; status: OrderStatus; } = await db.order.findById(id);
    if (!orderResult) {
        throw new Error(`Order with id ${id} not found`);
    }

    const order: Order = {
        id: orderResult.id,
        customerName: orderResult.customer_name,
        status: orderResult.status,
    };

    const itemsResult: { id: number; order_id: number; menu_item_id: number; amount: number; }[] = await db.orderItem.find(id);
    const items: OrderItem[] = itemsResult.map((item: { id: number; order_id: number; menu_item_id: number; amount: number; }) => ({
        id: item.id,
        orderId: item.order_id,
        menuItemId: item.menu_item_id,
        amount: item.amount,
    }));

    return { ...order, items };
};

export const createOrder = (order: Omit<Order, 'id'>): Promise<Order> => {
    return db.tx(async (transaction) => {
        const created: { id: number; customer_name: string; status: OrderStatus; } = await transaction.order.create({
            customer_name: order.customerName,
            status: order.status,
        });

        return {
            id: created.id,
            customerName: created.customer_name,
            status: created.status,
        };
    });
};

export const addOrderItem = (orderItem: Omit<OrderItem, 'id'>): Promise<void> => {
    return db.tx(async (transaction) => {
        const order: { id: number; customer_name: string; status: OrderStatus; } | null = await transaction.order.findById(orderItem.orderId);
        if (!order) {
            throw new Error(`Order with id ${orderItem.orderId} not found`);
        }

        const menuItem: MenuItem | null = await transaction.menuItem.findById(orderItem.menuItemId);
        if (!menuItem) {
            throw new Error(`Menu item with id ${orderItem.menuItemId} not found`);
        }

        const existingItems: { id: number; order_id: number; menu_item_id: number; amount: number; }[] = await transaction.orderItem.find(orderItem.orderId);
        const existingItem: { id: number; order_id: number; menu_item_id: number; amount: number; } = existingItems.find(item => item.menu_item_id === orderItem.menuItemId);
        if (existingItem) {
            const updatedItem: { id: number; order_id: number; menu_item_id: number; amount: number; } = {
                ...existingItem,
                amount: orderItem.amount
            }
            await transaction.orderItem.update(existingItem.id, updatedItem);
        }
        else {
            await transaction.orderItem.create({
                order_id: orderItem.orderId,
                menu_item_id: orderItem.menuItemId,
                amount: orderItem.amount,
            });
        }
    });
};

export const updateOrderStatus = (orderId: number, status: OrderStatus): Promise<void> => {
    return db.tx(async transaction => {
        const existingOrder: { id: number; customer_name: string; status: OrderStatus; } = await transaction.order.findById(orderId);
        if (!existingOrder) {
            throw new Error(`Order with id ${orderId} not found`);
        }

        await transaction.order.updateById(orderId, status);
    });
};