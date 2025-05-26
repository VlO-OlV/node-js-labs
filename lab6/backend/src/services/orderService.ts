import { OrderStatus } from '../database/models/Order';
import { CreateOrderItemDto, OrderItemDto, orderItemsRepository } from '../database/repositories/orderItemsRepository';
import { CreateOrderDto, OrderDto, ordersRepository } from '../database/repositories/ordersRepository';
import { sequelize } from '../database/client';
import { Op, Transaction } from 'sequelize';
import { menuItemsRepository } from '../database/repositories/menuItemsRepository';

export const getAllOrders = async (page = 1, limit = 6, status?: OrderStatus): Promise<{ data: OrderDto[], pagination?: any }> => {
    const orders = await ordersRepository.findAndCountAll({
        where: { status: { [Op.and]: [{ [Op.ne]: 'New' }, ...(status ? [{ [Op.eq]: status }] : [])] } },
        limit,
        order: [['id', 'DESC']],
        offset: (page - 1) * limit,
        include: [orderItemsRepository],
        distinct: true,
    });

    return {
        data: orders.rows,
        pagination: {
            page,
            totalPages: Math.ceil(orders.count / limit),
            filter: status || null,
        },
    }
};

export const getOrderById = async (id: number): Promise<OrderDto | null> => {
    return ordersRepository.findOne({ where: { id }, include: [orderItemsRepository] });
};

export const createOrder = async (order: CreateOrderDto): Promise<OrderDto> => {
    return await sequelize.transaction(async (t: Transaction) => {
        return await ordersRepository.create(order, { transaction: t });
    })
};

export const addOrderItem = async (orderItem: CreateOrderItemDto): Promise<OrderItemDto> => {
    return await sequelize.transaction(async (t: Transaction) => {
        const order = await ordersRepository.findByPk(orderItem.orderId, { transaction: t });
        if (!order) {
            throw new Error(`Order with id ${orderItem.orderId} not found`);
        }

        const menuItem = await menuItemsRepository.findOne({ where: { id: orderItem.menuItemId } });
        if (!menuItem) {
            throw new Error(`Menu item with id ${orderItem.menuItemId} not found`);
        }

        const existingItem = await orderItemsRepository.findOne({ where: { orderId: orderItem.orderId, menuItemId: orderItem.menuItemId }, transaction: t });
        if (existingItem) {
            return await existingItem.update({ amount: orderItem.amount }, { transaction: t });
        }
        else {
            return orderItemsRepository.create(orderItem, { transaction: t });
        }
    });
};

export const updateOrderStatus = async (orderId: number, status: OrderStatus): Promise<void> => {
    return await sequelize.transaction(async (t: Transaction) => {
        const order = await ordersRepository.findByPk(orderId, { transaction: t });
        if (!order) {
            throw new Error('Order with id ${orderId} not found');
        }

        await order.update({ status }, { transaction: t });
    });
};