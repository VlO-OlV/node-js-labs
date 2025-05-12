import pgPromise from 'pg-promise';
import { Extensions, MenuItemsRepository, OrderItemsRepository, OrdersRepository } from './repositories';

type ExtendedProtocol = pgPromise.IDatabase<Extensions> & Extensions;

const initOptions: pgPromise.IInitOptions<Extensions> = {
    extend(repos: ExtendedProtocol, dc: any) {
        repos.menuItem = new MenuItemsRepository(repos, pgp);
        repos.orderItem = new OrderItemsRepository(repos, pgp);
        repos.order = new OrdersRepository(repos, pgp);
    }
};

const pgp: pgPromise.IMain = pgPromise({...initOptions});

const db: ExtendedProtocol = pgp(process.env.DATABASE_URL);

export {db, pgp};