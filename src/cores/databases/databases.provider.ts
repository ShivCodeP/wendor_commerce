import { Sequelize } from 'sequelize-typescript';
import { SEQUALIZE_DATABASE_PROVIDER } from '../constants';
import { CanDataBasesConfig } from './databases.config';
import { Provider } from '@nestjs/common';

export const CAN_DATABASES_PROVIDERS: Provider[] = [
  {
    provide: SEQUALIZE_DATABASE_PROVIDER as string,
    useFactory: (canDataSourceConfig: CanDataBasesConfig) => {
      const sequelize = new Sequelize({
        ...canDataSourceConfig.dataBaseConfiguration,
      });
      return sequelize;
    },
    inject: [CanDataBasesConfig],
  },
];
