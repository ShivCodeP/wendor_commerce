import { Module } from '@nestjs/common';
import { CanConfigModule } from './config/config.module';
import { CanDataBasesModule } from './databases/databases.module';
import { CanAuthModule } from './auth/auth.module';

// TODO: Add authentication module

@Module({
  imports: [CanAuthModule, CanConfigModule, CanDataBasesModule],
  exports: [],
})
export class CanCoresModule {}
