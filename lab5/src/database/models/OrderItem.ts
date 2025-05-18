import { AllowNull, AutoIncrement, BelongsTo, Column, ForeignKey, Model, PrimaryKey, Table } from 'sequelize-typescript';
import { MenuItem } from './MenuItem';
import { Order } from './Order';

@Table({
    tableName: 'order_items',
    timestamps: false,
})
export class OrderItem extends Model {
    @AutoIncrement
    @PrimaryKey
    @Column
    id!: number;

    @AllowNull(false)
    @ForeignKey(() => Order)
    @Column({
        field: 'order_id',
    })
    orderId!: number;

    @BelongsTo(() => Order)
    order?: Order;

    @AllowNull(false)
    @ForeignKey(() => MenuItem)
    @Column({
        field: 'menu_item_id',
    })
    menuItemId!: number;

    @BelongsTo(() => MenuItem)
    menuItem?: MenuItem;

    @AllowNull(false)
    @Column
    amount!: number;
}