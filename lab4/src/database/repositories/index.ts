import { MenuItemsRepository } from './menuItemsRepository';
import { OrderItemsRepository } from './orderItemsRepository';
import { OrdersRepository } from './ordersRepository';

interface Extensions {
  menuItem: MenuItemsRepository,
  orderItem: OrderItemsRepository,
  order: OrdersRepository,
}

export {
  Extensions,
  MenuItemsRepository,
  OrderItemsRepository,
  OrdersRepository,
};