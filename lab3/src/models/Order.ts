import { OrderItem } from './OrderItem';

export enum OrderStatus {
    PENDING = 'PENDING',
    IN_PROGRESS = 'IN_PROGRESS',
    COMPLETED = 'COMPLETED',
    CANCELLED = 'CANCELLED'
}

export class Order {
    id: number;
    customerName: string;
    items: OrderItem[];
    status: OrderStatus;
}