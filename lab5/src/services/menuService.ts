import { CreateMenuItemDto, MenuItemDto, menuItemsRepository } from '../database/repositories/menuItemsRepository';

export const getAllMenuItems = (): Promise<MenuItemDto[]> => {
    return menuItemsRepository.findAll();
}

export const getMenuItemById = (id: number): Promise<MenuItemDto | null> => {
    return menuItemsRepository.findOne({ where: { id } });
};

export const createMenuItem = (menuItem: CreateMenuItemDto): Promise<MenuItemDto> => {
    return menuItemsRepository.create(menuItem);
};

export const deleteMenuItem = (menuItemId: number): Promise<number> => {
    return menuItemsRepository.destroy({ where: { id: menuItemId } });
};