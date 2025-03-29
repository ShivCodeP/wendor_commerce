import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiKeyRepository } from './auth.repository';
import { AuthController } from './auth.controller';

@Module({
  controllers: [AuthController],
  providers: [AuthService, ApiKeyRepository],
  exports: [AuthService],
})
export class CanAuthModule {}
