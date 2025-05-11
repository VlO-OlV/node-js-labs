import * as orderRepository from '../repositories/orderRepository';

export const getAllOrders = () => {
  return orderRepository.getAllOrders();
};

export const getOrderById = (id: number) => {
  return orderRepository.getOrderById(id);
};