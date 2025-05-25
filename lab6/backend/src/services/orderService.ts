import { OrderStatus } from '../database/models/Order';
import { CreateOrderItemDto, OrderItemDto, orderItemsRepository } from '../database/repositories/orderItemsRepository';
import { CreateOrderDto, OrderDto, ordersRepository } from '../database/repositories/ordersRepository';
import { sequelize } from '../database/client';
import { Transaction } from 'sequelize';

export const getAllOrders = async (): Promise<OrderDto[]> => {
    return ordersRepository.findAll({ include: [orderItemsRepository] });
};

export const getOrderById = async (id: number): Promise<OrderDto | null> => {
    const order = await ordersRepository.findOne({ where: { id }, include: [orderItemsRepository] });
    if (!order) {
        throw new Error('Order with such id not found');
    }
    return order;
};

export const createOrder = async (order: CreateOrderDto): Promise<OrderDto> => {
    return await sequelize.transaction(async (t: Transaction) => {
        return await ordersRepository.create(order, { transaction: t });
    })
};

export const addOrderItem = async (orderItem: CreateOrderItemDto): Promise<OrderItemDto> => {
    return await sequelize.transaction(async (t: Transaction) => {

        return orderItemsRepository.create(orderItem, { transaction: t });
    });
};

export const updateOrderStatus = async (orderId: number, status: OrderStatus): Promise<void> => {
    return await sequelize.transaction(async (t: Transaction) => {
        const order = await ordersRepository.findByPk(orderId, { transaction: t });
        if (!order) {
            throw new Error('Order with such id not found');
        }
        await order.update({ status }, { transaction: t });
    });
};