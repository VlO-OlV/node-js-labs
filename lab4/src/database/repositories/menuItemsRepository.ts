import { IDatabase, IMain } from 'pg-promise';
import { MenuItem } from 'src/database/models/MenuItem';

export class MenuItemsRepository {

    constructor(private db: IDatabase<any>, private pgp: IMain) {}

    create(newItem: Omit<MenuItem, 'id'>): Promise<void> {
        return this.db.none('INSERT INTO menu_items(name, description, price, image) VALUES(${name}, ${description}, ${price}, ${image})', newItem);
    }

    deleteById(id: number): Promise<void> {
        return this.db.none('DELETE FROM menu_items WHERE id = $1', id);
    }

    findById(id: number): Promise<MenuItem | null> {
        return this.db.oneOrNone('SELECT * FROM menu_items WHERE id = $1', id);
    }

    find(): Promise<MenuItem[]> {
        return this.db.any('SELECT * FROM menu_items');
    }

    updateById(id: number, updatedFields: Partial<Omit<MenuItem, 'id'>>): Promise<void> {
        const condition = this.pgp.as.format('WHERE id = $1', [id]);
        const query = this.pgp.helpers.update(updatedFields, ['name', 'description', 'price', 'image'], 'menu_items') + ' ' + condition;
        return this.db.none(query);
    }
}