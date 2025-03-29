import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ApisModule } from './apis/apis.module';
import { EventsModule } from './events/events.module';
import { CanCoresModule } from './cores/cores.module';
import { ThrottlerModule } from '@nestjs/throttler';

@Module({
  imports: [
    ThrottlerModule.forRoot({
      throttlers: [{ limit: 100, ttl: 60 }],
    }),
    CanCoresModule,
    ApisModule,
    EventsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
