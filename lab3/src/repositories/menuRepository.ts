import { MenuItem } from 'src/models/MenuItem';
import * as fs from 'fs';
import path from 'path';

const readMenuItems = (): MenuItem[] => {
    const filePath: string = path.join(__dirname, '../data/menuItem.json');

    const jsonData: string = fs.readFileSync(filePath, 'utf8');

    return JSON.parse(jsonData);
}

const readMenuItemById = async (id: number): Promise<MenuItem> => {
    return new Promise((resolve, reject) => {
        const filePath: string = path.join(__dirname, '../data/menuItem.json');
        fs.readFile(filePath, 'utf8', (error: NodeJS.ErrnoException, data: string) => {
            if (error) {
                console.log('File read error');
                reject(error);
                return;
            }

            const menuItem: MenuItem = JSON.parse(data).find((menuItem: MenuItem) => menuItem.id === id);
            resolve(menuItem);
        });
    });
}

export const getAllMenuItems = (): MenuItem[] => {
    return readMenuItems();
};

export const getMenuItemById = async (id: number): Promise<MenuItem> => {
    return readMenuItemById(id);
}