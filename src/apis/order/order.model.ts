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
  declare customer_name: string;

  @Column({ type: DataType.STRING, allowNull: false })
  declare status: string;

  @Column({ type: DataType.DECIMAL, allowNull: false })
  declare total_amount: number;

  @HasMany(() => OrderItem)
  order_items: OrderItem[];

  @CreatedAt
  @Default(DataType.NOW)
  @Column({ type: DataType.DATE })
  declare created_at: Date;

  @UpdatedAt
  @Default(DataType.NOW)
  @Column({ type: DataType.DATE })
  declare updated_at: Date;
}
