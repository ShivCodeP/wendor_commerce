import { Module } from '@nestjs/common';
import { InventoriesService } from './inventories.service';
import { InventoriesRepository } from './inventories.repository';
import { InventoriesController } from './inventories.controller';

@Module({
  providers: [InventoriesService, InventoriesRepository],
  exports: [InventoriesService],
  controllers: [InventoriesController],
})
export class InventoriesModule {}
