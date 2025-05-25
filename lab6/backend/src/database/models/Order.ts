import { AllowNull, AutoIncrement, Column, HasMany, Model, PrimaryKey, Table } from 'sequelize-typescript';
import { OrderItem } from './OrderItem';

export enum OrderStatus {
    NEW = 'New',
    PENDING = 'Pending',
    IN_PROGRESS = 'In Progress',
    COMPLETED = 'Completed',
}

@Table({
    tableName: 'orders',
    timestamps: false,
})
export class Order extends Model {
    @AutoIncrement
    @PrimaryKey
    @Column
    id!: number;

    @AllowNull(false)
    @Column({
        field: 'customer_name',
    })
    customerName!: string;

    @AllowNull(false)
    @Column
    status!: OrderStatus;

    @HasMany(() => OrderItem)
    orderItems?: OrderItem[];
}