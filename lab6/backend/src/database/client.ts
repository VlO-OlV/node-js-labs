import * as dotenv from "dotenv";
import { Sequelize } from 'sequelize-typescript';
import { MenuItem } from './models/MenuItem';
import { Order } from './models/Order';
import { OrderItem } from './models/OrderItem';

dotenv.config();

export const sequelize = new Sequelize(process.env.DATABASE_URL as string, {
  repositoryMode: true,
  logging: false,
  models: [MenuItem, Order, OrderItem],
});