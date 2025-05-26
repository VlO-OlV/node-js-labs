import { IDatabase, IMain } from 'pg-promise';

export class OrderItemsRepository {

    constructor(private db: IDatabase<any>, private pgp: IMain) { }

    create(newItem: Omit<{ id: number; order_id: number; menu_item_id: number; amount: number; }, 'id'>): Promise<void> {
        return this.db.none('INSERT INTO order_items(amount, menu_item_id, order_id) VALUES(${amount}, ${menu_item_id}, ${order_id})', newItem);
    }

    update(id: number, updatedFields: Omit<{ id: number; order_id: number; menu_item_id: number; amount: number; }, 'id'>): Promise<void> {
        const condition = this.pgp.as.format('WHERE id = $1', [id]);
        const query = this.pgp.helpers.update(updatedFields, ['amount', 'menu_item_id', 'order_id'], 'order_items') + ' ' + condition;
        return this.db.none(query);
    }

    deleteById(id: number): Promise<void> {
        return this.db.none('DELETE FROM order_items WHERE id = $1', id);
    }

    findById(id: number): Promise<{ id: number; order_id: number; menu_item_id: number; amount: number; } | null> {
        return this.db.oneOrNone('SELECT * FROM order_items WHERE id = $1', id);
    }

    find(orderId?: number): Promise<{ id: number; order_id: number; menu_item_id: number; amount: number; }[]> {
        return this.db.any(`SELECT * FROM order_items ${orderId ? 'WHERE order_id = ${orderId}' : ''}`, { orderId });
    }
}