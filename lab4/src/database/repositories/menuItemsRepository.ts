import { IDatabase, IMain } from 'pg-promise';
import { MenuItem } from 'src/database/models/MenuItem';

export class MenuItemsRepository {

    constructor(private db: IDatabase<any>, private pgp: IMain) {}

    create(newItem: Omit<MenuItem, 'id'>): Promise<void> {
        return this.db.one(""/*sql.add, {
            userId: +values.userId,
            productName: values.name
        }*/);
    }

    deleteById(id: number): Promise<void> {
        return this.db.result('DELETE FROM menuItems WHERE id = $1', +id);
    }

    findById(id: number): Promise<MenuItem | null> {
        return this.db.oneOrNone(""/*sql.find, {
            userId: +values.userId,
            productName: values.name
        }*/);
    }

    // Returns all product records;
    find(): Promise<MenuItem[]> {
        return this.db.any('SELECT * FROM products');
    }
}