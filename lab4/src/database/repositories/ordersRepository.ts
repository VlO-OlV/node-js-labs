import { IDatabase, IMain } from 'pg-promise';
import { OrderStatus } from '../models/Order';

export class OrdersRepository {

    constructor(private db: IDatabase<any>, private pgp: IMain) { }

    create(newItem: Omit<{ id: number; customer_name: string; status: OrderStatus; }, 'id'>): Promise<{ id: number; customer_name: string; status: OrderStatus; }> {
        return this.db.one('INSERT INTO orders(customer_name, status) VALUES(${customerName}, ${status}) RETURNING *', newItem);
    }

    deleteById(id: number): Promise<void> {
        return this.db.none('DELETE FROM orders WHERE id = $1', id);
    }

    updateById(id: number, status: OrderStatus): Promise<void> {
        return this.db.none(`UPDATE orders SET status = $1 WHERE id = $2`, [status, id]);
    }

    findById(id: number): Promise<{ id: number; customer_name: string; status: OrderStatus; } | null> {
        return this.db.oneOrNone('SELECT * FROM orders WHERE id = $1', id);
    }

    find(): Promise<{ id: number; customer_name: string; status: OrderStatus; }[]> {
        return this.db.any('SELECT * FROM orders');
    }
}