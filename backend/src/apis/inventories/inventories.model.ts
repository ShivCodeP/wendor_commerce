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
  declare name: string;

  @Column({ type: DataType.DECIMAL, allowNull: false })
  declare price: number;

  @Column({ type: DataType.INTEGER, allowNull: false })
  declare available_units: number;

  @Column({ type: DataType.STRING, allowNull: false })
  declare display_image_url: string;

  @Column({ type: DataType.ENUM('active', 'inactive'), defaultValue: 'active' })
  declare status: 'active' | 'inactive';

  @CreatedAt
  @Default(DataType.NOW)
  @Column({ type: DataType.DATE })
  declare created_at: Date;

  @UpdatedAt
  @Default(DataType.NOW)
  @Column({ type: DataType.DATE })
  declare updated_at: Date;
}
