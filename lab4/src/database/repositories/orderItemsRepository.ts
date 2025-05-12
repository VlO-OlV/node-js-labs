import { IDatabase, IMain } from 'pg-promise';
import { OrderItem } from '../models/OrderItem';

export class OrderItemsRepository {

    constructor(private db: IDatabase<any>, private pgp: IMain) {}

    create(newItem: Omit<OrderItem, 'id'>): Promise<void> {
        return this.db.none('INSERT INTO order_items(amount, menu_item_id, order_id) VALUES(${amount}, ${menuItemId}, ${orderId})', newItem);
    }

    deleteById(id: number): Promise<void> {
        return this.db.none('DELETE FROM order_items WHERE id = $1', id);
    }

    findById(id: number): Promise<OrderItem | null> {
        return this.db.oneOrNone('SELECT * FROM order_items WHERE id = $1', id);
    }

    // Returns all product records;
    find(orderId?: number): Promise<OrderItem[]> {
        return this.db.any(`SELECT * FROM order_items ${orderId ? 'WHERE order_id = ${orderId}' : ''}`, { orderId });
    }
}