import * as fs from 'fs';
import { Order } from 'src/models/Order';
import path from 'path';

const orders: Order[] = [];
let order: Order;

const readOrders = async () => {
  const filePath = path.join(__dirname, '/../data/order.json');
  const jsonData = await fs.promises.readFile(filePath, 'utf8');
  try {
    const parsedOrders = JSON.parse(jsonData);
    orders.push(...parsedOrders);
  } catch (error) {
    console.warn('File read error');
  }
}

const readOrderById = (id: number) => {
  const filePath = path.join(__dirname, '/../data/order.json');
  const jsonData = fs.promises.readFile(filePath, 'utf8');
  jsonData
    .then((data) => {
      const parsedOrders: Order[] = JSON.parse(data);
      order = parsedOrders.find((order: Order) => order.id === id);
    })
    .catch((error) => {
      console.warn('File read error');
    });
}

export const getAllOrders = async (): Promise<Order[]> => {
  await readOrders();
  return orders;
};

export const getOrderById = async (id: number): Promise<Order> => {
  await readOrderById(id);
  return order;
};