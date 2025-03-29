import { Module } from '@nestjs/common';
import { InventoriesModule } from './inventories/inventories.module';
import { OrderItemModule } from './order-item/order-item.module';
import { OrderModule } from './order/order.module';

@Module({
  imports: [InventoriesModule, OrderModule, OrderItemModule],
})
export class ApisModule {}
