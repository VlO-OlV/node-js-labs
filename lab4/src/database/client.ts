import pgPromise from 'pg-promise';
import { Extensions, MenuItemsRepository, OrderItemsRepository, OrdersRepository } from './repositories';
import * as dotenv from "dotenv";

dotenv.config();

type ExtendedProtocol = pgPromise.IDatabase<Extensions> & Extensions;

const initOptions: pgPromise.IInitOptions<Extensions> = {
    extend(repos: ExtendedProtocol, dc: any) {
        repos.menuItem = new MenuItemsRepository(repos, pgp);
        repos.orderItem = new OrderItemsRepository(repos, pgp);
        repos.order = new OrdersRepository(repos, pgp);
    }
};

export const pgp: pgPromise.IMain = pgPromise({...initOptions});

export const db: ExtendedProtocol = pgp(process.env.DATABASE_URL);