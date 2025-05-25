import { CreateMenuItemDto, MenuItemDto, menuItemsRepository } from '../database/repositories/menuItemsRepository';
import { sequelize } from '../database/client';
import { Transaction } from 'sequelize';

export const getAllMenuItems = (): Promise<MenuItemDto[]> => {
    return menuItemsRepository.findAll();
}

export const getMenuItemById = (id: number): Promise<MenuItemDto | null> => {
    return menuItemsRepository.findOne({ where: { id } });
};

export const createMenuItem = async (menuItem: CreateMenuItemDto): Promise<MenuItemDto> => {
    return await sequelize.transaction(async (t: Transaction) => {
        return await menuItemsRepository.create(menuItem, { transaction: t });
    });
};

export const deleteMenuItem = async (menuItemId: number): Promise<void> => {
    return await sequelize.transaction(async (t: Transaction) => {
        const item = await menuItemsRepository.findByPk(menuItemId, { transaction: t });
        if (!item) {
            throw new Error('Menu item with such id not found');
        }
        await item.destroy({ transaction: t });
    });
};

export const updateMenuItem = async (
    id: number, updatedFields: Partial<Omit<MenuItemDto, 'id'>>): Promise<void> => {
    return await sequelize.transaction(async (t: Transaction) => {
        const item = await menuItemsRepository.findByPk(id, { transaction: t });
        if (!item) {
            throw new Error(`Menu item with id ${id} does not exist`);
        }
        await item.update(updatedFields, { transaction: t });
    });
};
