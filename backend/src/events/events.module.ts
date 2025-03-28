import { Module } from '@nestjs/common';
import { EventEmitterModule } from '@nestjs/event-emitter/dist/event-emitter.module';
import { EventsService } from './events.service';

@Module({
  imports: [
    EventEmitterModule.forRoot({
      ignoreErrors: false,
    }),
  ],
  providers: [EventsService],
  exports: [EventsService],
})
export class EventsModule {}
