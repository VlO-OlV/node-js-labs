import { db } from '../database/client';
import { MenuItem } from 'src/database/models/MenuItem';

export const getAllMenuItems = (): Promise<MenuItem[]> => {
    return db.menuItem.find();
}

export const getMenuItemById = async (id: number): Promise<MenuItem> => {
    return db.menuItem.findById(id).then(item => {
        if (!item) {
            throw new Error(`Menu item with id ${id} does not exist`);
        }
        return item;
    });
};

export const createMenuItem = (menuItem: Omit<MenuItem, 'id'>): Promise<void> => {
    return db.tx(async t => {
        await t.menuItem.create(menuItem);
    });
};

export const deleteMenuItem = (menuItemId: number): Promise<void> => {
    return db.tx(async t => {
        const item = await t.menuItem.findById(menuItemId);
        if (!item) {
            throw new Error(`This item is not found`);
        }
        await t.menuItem.deleteById(menuItemId);
    });
};

export const updateMenuItem = (id: number, updatedFields: Omit<MenuItem, 'id'>): Promise<void> => {
    return db.tx(async t => {
        const existing = await t.menuItem.findById(id);
        if (!existing) {
            throw new Error('Item not found');
        }
        await t.menuItem.updateById(id, updatedFields);
    });
};