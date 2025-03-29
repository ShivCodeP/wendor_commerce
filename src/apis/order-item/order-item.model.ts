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
  order_id: string;

  @ForeignKey(() => Inventories)
  @Column({ type: DataType.UUID, allowNull: false })
  inventory_id: string;

  @Column({ type: DataType.INTEGER, allowNull: false })
  quantity: number;

  @Column({ type: DataType.DECIMAL, allowNull: false })
  price: number;

  @BelongsTo(() => Order)
  order: Order;

  @CreatedAt
  @Default(DataType.NOW)
  @Column({ type: DataType.DATE })
  created_at: Date;

  @UpdatedAt
  @Default(DataType.NOW)
  @Column({ type: DataType.DATE })
  updated_at: Date;
}
