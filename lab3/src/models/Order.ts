import { OrderItem } from './OrderItem';

export class Order {
    id: number;
    customerName: string;
    status: string;
    items: OrderItem[];
}
