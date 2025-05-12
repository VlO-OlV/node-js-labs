import * as fs from 'fs';
import { Order, OrderStatus } from '../models/Order';
import path from 'path';
import { OrderItem } from '../models/OrderItem';

export const readOrders = async (): Promise<Order[]> => {
    try {
        const filePath: string = path.join(__dirname, '/../data/order.json');
        const jsonData: string = await fs.promises.readFile(filePath, 'utf8');

        return JSON.parse(jsonData)
    } catch (error) {
        console.warn(error);
    }
}

export const readOrderById = async (id: number): Promise<Order> => {
    return new Promise((resolve, reject) => {
        const filePath: string = path.join(__dirname, '/../data/order.json');
        const jsonData: Promise<string> = fs.promises.readFile(filePath, 'utf8');

        jsonData.then((data: string) => {
            const parsedOrders: Order[] = JSON.parse(data);
            resolve(parsedOrders.find((order: Order) => order.id === id));
        }).catch((error) => {
            console.warn(error);
            reject(error);
        });
    });
}

export const createOrder = async (order: Order): Promise<Order> => {
    try {
        const filePath: string = path.join(__dirname, '/../data/order.json');
        const jsonData: string = await fs.promises.readFile(filePath, 'utf8');

        const orders: Order[] = JSON.parse(jsonData);

        order.id = Math.max(...orders.map((order: Order) => order.id)) + 1;
        orders.push(order);

        await fs.promises.writeFile(filePath, JSON.stringify(orders, null, 4), 'utf8');

        return order;
    } catch (error) {
        console.warn(error);
    }
}

export const addOrderItem = (orderId: number, orderItem: OrderItem): void => {
    const filePath: string = path.join(__dirname, '/../data/order.json');
    const jsonData: string = fs.readFileSync(filePath, 'utf8');

    const orders: Order[] = JSON.parse(jsonData);

    const order: Order = orders.find((order: Order) => order.id === orderId);

    if (order.items.map((item: OrderItem) => item.menuItemId).includes(orderItem.menuItemId)) {
        order.items.find((item: OrderItem) => item.menuItemId === orderItem.menuItemId).amount = orderItem.amount;
    }
    else {
        orderItem.id = Math.max(...orders.map((order: Order) => order.items).flat().map((item: OrderItem) => item.id)) + 1;
        order.items.push(orderItem);
    }

    fs.writeFileSync(filePath, JSON.stringify(orders, null, 4), 'utf8');
}

export const updateOrderStatus = async (orderId: number, status: string): Promise<void> => {
    return new Promise((resolve, reject) => {
        const filePath: string = path.join(__dirname, '/../data/order.json');
        const jsonData: Promise<string> = fs.promises.readFile(filePath, 'utf8');

        jsonData.then((data: string) => {
            const orders: Order[] = JSON.parse(data);

            const order: Order = orders.find((order: Order) => order.id === orderId);
            order.status = Object.values(OrderStatus).find((value: string) => value === status);

            fs.promises.writeFile(filePath, JSON.stringify(orders, null, 4), 'utf8').then(() => {
                resolve();
            });
        }).catch((error) => {
            console.warn(error);
            reject(error);
        });
    });
}