import { Model } from 'sequelize-typescript';
import { sequelize } from '../client';
import { Order } from '../models/Order';

export type OrderDto = Omit<Order, keyof Model> & { id: number };

export type CreateOrderDto = Omit<OrderDto, 'orderItems' | 'id'>;

export type UpdateOrderDto = Partial<CreateOrderDto>;

export const ordersRepository = sequelize.getRepository(Order);