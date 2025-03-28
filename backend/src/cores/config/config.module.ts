import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import baseDevConfig from './development.config';
import baseProdConfig from './production.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      // Access the config file globally
      load: [
        process.env.NODE_ENV === 'production' ? baseProdConfig : baseDevConfig,
      ],
      isGlobal: true,
    }),
  ],
  exports: [ConfigModule],
})
export class CanConfigModule {}
