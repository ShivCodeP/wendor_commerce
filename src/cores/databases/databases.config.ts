import {
  ICanDatabasesConfig,
  ICanDatabaseConfigAttributes,
} from './databases.config.interface';
import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { MODELS } from 'src/include.models';
import { SequelizeOptions } from 'sequelize-typescript';

@Injectable()
export class CanDataBasesConfig implements ICanDatabasesConfig {
  private readonly logger = new Logger(CanDataBasesConfig.name);
  constructor(private configService: ConfigService) {
    this.logger.log(`Node Environment : ${this.configService.get('NODE_ENV')}`);
  }
  databaseConfiguration: SequelizeOptions;

  /**
   * Extract Database Configuration from Environment File
   */
  get dataBaseConfiguration(): ICanDatabaseConfigAttributes {
    return {
      dialect: this.configService.get('db.wendor_commerce.dialect'),
      host: this.configService.get<string>('db.wendor_commerce.host'),
      port: this.configService.get<number>('db.wendor_commerce.port'),
      username: this.configService.get<string>('db.wendor_commerce.username'),
      password: this.configService.get<string>('db.wendor_commerce.password'),
      database: this.configService.get<string>('db.wendor_commerce.database'),
      models: MODELS,
      logging: false,
      pool: {
        max: this.configService.get<number>('db.poolMax'),
        min: 5,
        acquire: this.configService.get<number>('db.connectionTimeout'), // Connection timeout in milliseconds
        idle: this.configService.get<number>('db.idleTimeout'), // Idle timeout in milliseconds
      },
    };
  }
}
