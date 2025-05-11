import { OrderItem } from './OrderItem';

export enum OrderStatus {
    NEW = 'New',
    PENDING = 'Pending',
    IN_PROGRESS = 'In Progress',
    COMPLETED = 'Completed'
}

export class Order {
    id: number;
    customerName: string;
    items: OrderItem[];
    status: OrderStatus;
}
