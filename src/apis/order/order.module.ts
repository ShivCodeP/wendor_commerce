import { Module } from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderRepository } from './order.repository';
import { OrderController } from './order.controller';
import { OrderItemModule } from '../order-item/order-item.module';
import { InventoriesModule } from '../inventories/inventories.module';

@Module({
  imports: [OrderItemModule, InventoriesModule],
  providers: [OrderService, OrderRepository],
  exports: [OrderService],
  controllers: [OrderController],
})
export class OrderModule {}
