import { Request, Response } from 'express';
import path from "path";
import * as menuService from '../services/menuService';

const createPath = (page: string) => path.join(__dirname, '/../views', `${page}.ejs`);

export const getAllMenuItems = (req: Request, res: Response) => {
  const menuItems = menuService.getAllMenuItems();
  //res.render(createPath('menu'), { menuItems });
  res.send(menuItems);
};

export const getMenuItemById = (req: Request, res: Response) => {
  const menuItemId = parseInt(req.params.id);
  const menuItem = menuService.getMenuItemById(menuItemId);
  res.send(menuItem);
};

export const createMenuItem = (req: Request, res: Response) => {};

export const deleteMenuItem = (req: Request, res: Response) => {};