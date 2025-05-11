import { OrderItem } from './OrderItem';

export class Order {
    id: number;
    customerName: string;
    items: OrderItem[];
}