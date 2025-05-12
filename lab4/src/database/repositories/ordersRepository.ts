import { IDatabase, IMain } from 'pg-promise';
import { Order } from '../models/Order';

export class OrdersRepository {

    constructor(private db: IDatabase<any>, private pgp: IMain) {
        /*
          If your repository needs to use helpers like ColumnSet,
          you should create it conditionally, inside the constructor,
          i.e. only once, as a singleton.
        */
    }

    create(newItem: Omit<Order, 'id'>): Promise<Order> {
        return this.db.one(""/*sql.add, {
            userId: +values.userId,
            productName: values.name
        }*/);
    }

    deleteById(id: number): Promise<void> {
        return this.db.result('DELETE FROM menuItems WHERE id = $1', +id);
    }

    updateById(id: number, updatedItem: Partial<Omit<Order, 'id'>>): Promise<void> {
        return this.db.result(`UPDATE menuItems SET status = $1${updatedItem.customerName ? ', customer_name = $2' : ''} WHERE id = $3`, [updatedItem.status, updatedItem.customerName, id]);
    }

    findById(id: number): Promise<Order | null> {
        return this.db.oneOrNone(""/*sql.find, {
            userId: +values.userId,
            productName: values.name
        }*/);
    }

    // Returns all product records;
    find(): Promise<Order[]> {
        return this.db.any('SELECT * FROM products');
    }
}