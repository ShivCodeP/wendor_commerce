import { Module } from '@nestjs/common';
import { CAN_DATABASES_PROVIDERS } from './databases.provider';
import { CanDataBasesConfig } from './databases.config';

@Module({
  providers: [...CAN_DATABASES_PROVIDERS, CanDataBasesConfig],
  exports: [...CAN_DATABASES_PROVIDERS],
})
export class CanDataBasesModule {}
