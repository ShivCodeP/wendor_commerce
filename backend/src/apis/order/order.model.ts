import {
  Table,
  Column,
  Model,
  DataType,
  HasMany,
  CreatedAt,
  Default,
  UpdatedAt,
} from 'sequelize-typescript';
import { OrderItem } from '../order-item/order-item.model';

@Table({ tableName: 'orders', timestamps: true })
export class Order extends Model<Order> {
  @Column({
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
    primaryKey: true,
  })
  declare id: string;

  @Column({ type: DataType.STRING, allowNull: false })
  customer_name: string;

  @Column({ type: DataType.STRING, allowNull: false })
  status: string;

  @Column({ type: DataType.DECIMAL, allowNull: false })
  total_amount: number;

  @HasMany(() => OrderItem)
  order_items: OrderItem[];

  @CreatedAt
  @Default(DataType.NOW)
  @Column({ type: DataType.DATE })
  created_at: Date;

  @UpdatedAt
  @Default(DataType.NOW)
  @Column({ type: DataType.DATE })
  updated_at: Date;
}
