import { MenuItem } from 'src/models/MenuItem';
import * as menuRepository from '../repositories/menuRepository';

export const getAllMenuItems = (): MenuItem[] => {
    return menuRepository.readMenuItems();
}

export const getMenuItemById = (id: number): Promise<MenuItem> => {
    return menuRepository.readMenuItemById(id);
};

export const createMenuItem = (menuItem: MenuItem): Promise<void> => {
    return menuRepository.createMenuItem(menuItem);
};

export const deleteMenuItem = (menuItemId: number): Promise<void> => {
    return menuRepository.deleteMenuItem(menuItemId);
};