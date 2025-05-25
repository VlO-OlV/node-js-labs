import { AllowNull, AutoIncrement, Column, DataType, HasMany, Model, PrimaryKey, Table } from 'sequelize-typescript';
import { OrderItem } from './OrderItem';

@Table({
    tableName: 'menu_items',
    timestamps: false,
})
export class MenuItem extends Model {
    @AutoIncrement
    @PrimaryKey
    @Column
    id!: number;

    @AllowNull(false)
    @Column
    name!: string;

    @Column
    description?: string;

    @AllowNull(false)
    @Column(DataType.FLOAT)
    price!: number;

    @Column
    image?: string;

    @HasMany(() => OrderItem)
    orderItems?: OrderItem[];
}