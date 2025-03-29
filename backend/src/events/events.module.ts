import { Module } from '@nestjs/common';
import { EventEmitterModule } from '@nestjs/event-emitter/dist/event-emitter.module';
import { EventsService } from './events.service';
import { OrderItemModule } from 'src/apis/order-item/order-item.module';
import { InventoriesModule } from 'src/apis/inventories/inventories.module';

@Module({
  imports: [
    EventEmitterModule.forRoot({
      ignoreErrors: false,
    }),
    OrderItemModule,
    InventoriesModule,
  ],
  providers: [EventsService],
  exports: [EventsService],
})
export class EventsModule {}
