import { MenuItem } from 'src/models/MenuItem';
import * as fs from 'fs';
import path from 'path';

const menuItems: MenuItem[] = [];
let menuItem: MenuItem;

const readMenuItems = () => {
  const filePath = path.join(__dirname, '../data/menuItem.json');
  const jsonData = fs.readFileSync(filePath, 'utf8');
  const parsedMenuItems = JSON.parse(jsonData);
  menuItems.push(...parsedMenuItems);
}

const readMenuItemById = (id: number) => {
  const filePath = path.join(__dirname, '../data/menuItem.json');
  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
      console.log('File read error');
      return;
    }
    const parsedMenuItems: MenuItem[] = JSON.parse(data);
    menuItem = parsedMenuItems.find((menuItem: MenuItem) => menuItem.id === id);
  });
}

export const getAllMenuItems = (): MenuItem[] => {
  readMenuItems();
  return [...menuItems];
};

export const getMenuItemById = (id: number): MenuItem => {
  readMenuItemById(id);
  return menuItem;
}