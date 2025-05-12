import { IDatabase, IMain } from 'pg-promise';
import { OrderItem } from '../models/OrderItem';

export class OrderItemsRepository {

    constructor(private db: IDatabase<any>, private pgp: IMain) {
        /*
          If your repository needs to use helpers like ColumnSet,
          you should create it conditionally, inside the constructor,
          i.e. only once, as a singleton.
        */
    }

    create(newItem: Omit<OrderItem, 'id'>): Promise<void> {
        return this.db.one(""/*sql.add, {
            userId: +values.userId,
            productName: values.name
        }*/);
    }

    deleteById(id: number): Promise<void> {
        return this.db.result('DELETE FROM menuItems WHERE id = $1', +id);
    }

    findById(id: number): Promise<OrderItem | null> {
        return this.db.oneOrNone(""/*sql.find, {
            userId: +values.userId,
            productName: values.name
        }*/);
    }

    // Returns all product records;
    find(): Promise<OrderItem[]> {
        return this.db.any('SELECT * FROM products');
    }
}