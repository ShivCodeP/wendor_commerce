import {
  Table,
  Column,
  Model,
  DataType,
  CreatedAt,
  UpdatedAt,
  Default,
} from 'sequelize-typescript';

@Table({ tableName: 'inventories', timestamps: true })
export class Inventories extends Model<Inventories> {
  @Column({ type: DataType.STRING, unique: true, allowNull: false })
  name: string;

  @Column({ type: DataType.DECIMAL, allowNull: false })
  price: number;

  @Column({ type: DataType.INTEGER, allowNull: false })
  available_units: number;

  @Column({ type: DataType.STRING, allowNull: false })
  display_image_url: string;

  @Column({ type: DataType.ENUM('active', 'inactive'), defaultValue: 'active' })
  status: 'active' | 'inactive';

  @CreatedAt
  @Default(DataType.NOW)
  @Column({ type: DataType.DATE })
  created_at: Date;

  @UpdatedAt
  @Default(DataType.NOW)
  @Column({ type: DataType.DATE })
  updated_at: Date;
}
