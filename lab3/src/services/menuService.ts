import { MenuItem } from 'src/models/MenuItem';
import * as menuRepository from '../repositories/menuRepository';

export const getAllMenuItems = (): MenuItem[] => {
  return menuRepository.getAllMenuItems();
}

export const getMenuItemById = (id: number): MenuItem => {
  return menuRepository.getMenuItemById(id);
};