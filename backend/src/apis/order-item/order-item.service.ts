import { Inject, Injectable } from '@nestjs/common';
import { OrderItem } from './order-item.model';
import { ORDER_ITEM_REPOSITORY } from './order-item.repository';
import { BulkCreateOptions, FindOptions } from 'sequelize';

@Injectable()
export class OrderItemService {
  constructor(
    @Inject(ORDER_ITEM_REPOSITORY)
    private readonly orderItemRepository: typeof OrderItem,
  ) {}

  async create(dto: OrderItem): Promise<OrderItem> {
    return this.orderItemRepository.create(dto);
  }

  async findOne(id: string): Promise<OrderItem | null> {
    return this.orderItemRepository.findByPk(id);
  }

  async bulkCreate(
    items: OrderItem[],
    options?: BulkCreateOptions<OrderItem>,
  ): Promise<OrderItem[]> {
    return this.orderItemRepository.bulkCreate(items, options);
  }

  async findAll(filter?: FindOptions<OrderItem>): Promise<OrderItem[]> {
    return this.orderItemRepository.findAll(filter);
  }
}
