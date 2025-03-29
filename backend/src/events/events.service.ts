import { Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { InventoriesService } from 'src/apis/inventories/inventories.service';
import { OrderItemService } from 'src/apis/order-item/order-item.service';

@Injectable()
export class EventsService {
  constructor(
    private readonly orderItemService: OrderItemService,
    private readonly inventoriesService: InventoriesService,
  ) {}

  @OnEvent('ORDER_PLACED')
  async handleOrderPlacedEvent(payload: { order_id: string }) {
    const orderItems = await this.orderItemService.findAll({
      where: { order_id: payload.order_id },
    });

    for (const item of orderItems) {
      await this.inventoriesService.decrement(
        { available_units: item.dataValues.quantity },
        { where: { id: item.dataValues.inventory_id } },
      );
    }
  }
}
