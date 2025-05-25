import { Model } from 'sequelize-typescript';
import { sequelize } from '../client';
import { OrderItem } from '../models/OrderItem';

export type OrderItemDto = Omit<OrderItem, keyof Model> & { id: number };

export type CreateOrderItemDto = Omit<OrderItemDto, 'order' | 'menuItem' | 'id'>;

export const orderItemsRepository = sequelize.getRepository(OrderItem);