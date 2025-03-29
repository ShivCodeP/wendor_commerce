import { Module } from '@nestjs/common';
import { OrderItemService } from './order-item.service';
import { OrderItemRepository } from './order-item.repository';

@Module({
  providers: [OrderItemService, OrderItemRepository],
  exports: [OrderItemService],
})
export class OrderItemModule {}
