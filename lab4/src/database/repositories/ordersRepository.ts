import { IDatabase, IMain } from 'pg-promise';
import { Order } from '../models/Order';

export class OrdersRepository {

    constructor(private db: IDatabase<any>, private pgp: IMain) {}

    create(newItem: Omit<Order, 'id'>): Promise<Order> {
        return this.db.one('INSERT INTO orders(customer_name, status) VALUES(${customerName}, ${status}) RETURNING *', newItem);
    }

    deleteById(id: number): Promise<void> {
        return this.db.none('DELETE FROM orders WHERE id = $1', +id);
    }

    updateById(id: number, updatedItem: Partial<Omit<Order, 'id'>>): Promise<void> {
        return this.db.none(`UPDATE orders SET status = $1${updatedItem.customerName ? ', customer_name = $2' : ''} WHERE id = $3`, [updatedItem.status, updatedItem.customerName, id]);
    }

    findById(id: number): Promise<Order | null> {
        return this.db.oneOrNone('SELECT * FROM orders WHERE id = $1', id);
    }

    find(): Promise<Order[]> {
        return this.db.any('SELECT * FROM orders');
    }
}