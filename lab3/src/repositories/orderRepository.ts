import * as fs from 'fs';
import { Order } from 'src/models/Order';
import path from 'path';

const readOrders = async (): Promise<Order[]> => {
    try {
        const filePath: string = path.join(__dirname, '/../data/order.json');
        const jsonData: string = await fs.promises.readFile(filePath, 'utf8');

        return JSON.parse(jsonData)
    } catch (error) {
        console.warn(error);
    }
}

const readOrderById = async (id: number): Promise<Order> => {
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

export const getAllOrders = async (): Promise<Order[]> => {
    return readOrders();
};

export const getOrderById = async (id: number): Promise<Order> => {
    return readOrderById(id);
};