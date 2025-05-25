import { Model } from 'sequelize-typescript';
import { sequelize } from '../client';
import { MenuItem } from '../models/MenuItem';

export type MenuItemDto = Omit<MenuItem, keyof Model> & { id: number };

export type CreateMenuItemDto = Omit<MenuItemDto, 'orderItems' | 'id'>;

export const menuItemsRepository = sequelize.getRepository(MenuItem);

export const updateMenuItem = async (
    id: number, updatedFields: Partial<CreateMenuItemDto>
): Promise<boolean> => {
    const [affectedCount] = await menuItemsRepository.update(updatedFields, {
        where: { id },
    });
    return affectedCount > 0;
};