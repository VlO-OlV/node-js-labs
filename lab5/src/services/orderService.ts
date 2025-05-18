import { OrderStatus } from '../database/models/Order';
import { CreateOrderItemDto, OrderItemDto, orderItemsRepository } from '../database/repositories/orderItemsRepository';
import { CreateOrderDto, OrderDto, ordersRepository } from '../database/repositories/ordersRepository';

export const getAllOrders = async (): Promise<OrderDto[]> => {
    return ordersRepository.findAll({ include: [orderItemsRepository] });
};

export const getOrderById = async (id: number): Promise<OrderDto | null> => {
    return ordersRepository.findOne({ where: { id }, include: [orderItemsRepository] });
};

export const createOrder = async (order: CreateOrderDto): Promise<OrderDto> => {
    return ordersRepository.create(order);
};

export const addOrderItem = async (orderItem: CreateOrderItemDto): Promise<OrderItemDto> => {
    return orderItemsRepository.create(orderItem);
};

export const updateOrderStatus = async (orderId: number, status: OrderStatus): Promise<void> => {
    return ordersRepository.update({ status }, {
        where: { id: orderId },
    })[1];
}