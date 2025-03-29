import { SequelizeOptions } from 'sequelize-typescript';

export interface ICanDatabasesConfig {
  databaseConfiguration: ICanDatabaseConfigAttributes;
}

export type ICanDatabaseConfigAttributes = SequelizeOptions;
