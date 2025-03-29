import {
  Table,
  Column,
  Model,
  DataType,
  Default,
  CreatedAt,
} from 'sequelize-typescript';

@Table({ tableName: 'api_keys', timestamps: false })
export class ApiKey extends Model<ApiKey> {
  @Column({
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
    primaryKey: true,
  })
  declare id: string;

  @Column({ type: DataType.TEXT, allowNull: false }) // Store hashed key
  declare key_hash: string;

  @Column({ type: DataType.STRING, allowNull: false }) // Associate API key with location
  declare location_id: string;

  @Default('active') // Default status is active
  @Column({ type: DataType.ENUM('active', 'inactive'), allowNull: false })
  declare status: 'active' | 'inactive';

  @CreatedAt // Automatically sets timestamp
  @Column({ type: DataType.DATE })
  declare created_at: Date;
}
