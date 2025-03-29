import {
  Table,
  Column,
  Model,
  DataType,
  ForeignKey,
  BelongsTo,
  CreatedAt,
  Default,
  UpdatedAt,
} from 'sequelize-typescript';
import { Order } from '../order/order.model';
import { Inventories } from '../inventories/inventories.model';

@Table({ tableName: 'order_items', timestamps: true })
export class OrderItem extends Model<OrderItem> {
  @Column({
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
    primaryKey: true,
  })
  declare id: string;

  @ForeignKey(() => Order)
  @Column({ type: DataType.UUID, allowNull: false })
  declare order_id: string;

  @ForeignKey(() => Inventories)
  @Column({ type: DataType.UUID, allowNull: false })
  declare inventory_id: string;

  @Column({ type: DataType.INTEGER, allowNull: false })
  declare quantity: number;

  @Column({ type: DataType.DECIMAL, allowNull: false })
  declare price: number;

  @BelongsTo(() => Order)
  order: Order;

  @CreatedAt
  @Default(DataType.NOW)
  @Column({ type: DataType.DATE })
  declare created_at: Date;

  @UpdatedAt
  @Default(DataType.NOW)
  @Column({ type: DataType.DATE })
  declare updated_at: Date;
}
