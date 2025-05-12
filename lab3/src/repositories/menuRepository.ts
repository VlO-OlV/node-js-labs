import { MenuItem } from 'src/models/MenuItem';
import * as fs from 'fs';
import path from 'path';

export const readMenuItems = (): MenuItem[] => {
    const filePath: string = path.join(__dirname, '../data/menuItem.json');

    const jsonData: string = fs.readFileSync(filePath, 'utf8');

    return JSON.parse(jsonData);
}

export const readMenuItemById = async (id: number): Promise<MenuItem> => {
    return new Promise((resolve, reject) => {
        const filePath: string = path.join(__dirname, '../data/menuItem.json');

        fs.readFile(filePath, 'utf8', (error: NodeJS.ErrnoException, data: string) => {
            if (error) {
                console.log(error);
                reject(error);
                return;
            }

            const menuItem: MenuItem = JSON.parse(data).find((menuItem: MenuItem) => menuItem.id === id);
            resolve(menuItem);
        });
    });
}

export const createMenuItem = async (menuItem: MenuItem): Promise<void> => {
    return new Promise((resolve, reject) => {
        const filePath: string = path.join(__dirname, '/../data/menuItem.json');
        const jsonData: Promise<string> = fs.promises.readFile(filePath, 'utf8');

        jsonData.then((data: string) => {
            const menu: MenuItem[] = JSON.parse(data);

            menuItem.id = Math.max(...menu.map((item: MenuItem) => item.id)) + 1;
            menu.push(menuItem);

            fs.promises.writeFile(filePath, JSON.stringify(menu, null, 4), 'utf8').then(() => {
                resolve();
            });
        }).catch((error) => {
            console.warn(error);
            reject(error);
        });
    });
}

export const deleteMenuItem = async (menuItemId: number): Promise<void> => {
    return new Promise((resolve, reject) => {
        const filePath: string = path.join(__dirname, '../data/menuItem.json');

        fs.readFile(filePath, 'utf8', (error: NodeJS.ErrnoException, data: string) => {
            if (error) {
                console.log(error);
                reject(error);
                return;
            }

            const menu: MenuItem[] = JSON.parse(data);

            const menuItem: MenuItem = menu.find((menuItem: MenuItem) => menuItem.id === menuItemId);

            menu.splice(menu.indexOf(menuItem), 1);

            fs.writeFile(filePath, JSON.stringify(menu, null, 4), 'utf8', ((error: NodeJS.ErrnoException) => {
                if (error) {
                    console.log(error);
                    reject(error);
                    return;
                }

                resolve();
            }));
        });
    });
}