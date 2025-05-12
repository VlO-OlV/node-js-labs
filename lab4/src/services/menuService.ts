import { db } from '../database/client';
import { MenuItem } from 'src/database/models/MenuItem';

export const getAllMenuItems = (): Promise<MenuItem[]> => {
    return db.menuItem.find();
}

export const getMenuItemById = (id: number): Promise<MenuItem> => {
    return db.menuItem.findById(id);
};

export const createMenuItem = (menuItem: MenuItem): Promise<void> => {
    return db.menuItem.create(menuItem);
};

export const deleteMenuItem = (menuItemId: number): Promise<void> => {
    return db.menuItem.deleteById(menuItemId);
};