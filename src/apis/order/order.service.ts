import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { ORDER_REPOSITORY } from './order.repository';
import { Order } from './order.model';
import { Op, Sequelize } from 'sequelize';
import { OrderItem } from '../order-item/order-item.model';
import { OrderItemService } from '../order-item/order-item.service';
import { InventoriesService } from '../inventories/inventories.service';

@Injectable()
export class OrderService {
  constructor(
    @Inject(ORDER_REPOSITORY) private readonly orderRepository: typeof Order,
    private readonly orderItemService: OrderItemService,
    private readonly inventoriesService: InventoriesService,
  ) {}

  async create(dto: Order): Promise<Order> {
    const { customer_name, status, order_items } = dto;

    // Start a transaction
    const transaction = await (
      this.orderRepository.sequelize as Sequelize
    ).transaction();
    try {
      // Fetch inventory details in bulk
      const inventoryIds = order_items.map((item) => item.inventory_id);
      const inventories = await this.inventoriesService.findAll({
        where: { id: { [Op.in]: inventoryIds } },
        transaction,
      });

      // Create a Map for fast lookup
      const inventoryMap = new Map(
        inventories.map((inv) => [inv.id, inv.dataValues]),
      );

      if (inventoryMap.size !== inventoryIds.length)
        throw new BadRequestException('One or more inventory items not found');

      let total_amount = 0;

      // Validate and calculate order items
      const orderItemsToCreate = order_items.map((item) => {
        const inventory = inventoryMap.get(item.inventory_id);
        if (!inventory)
          throw new BadRequestException(
            `Invalid inventory item: ${item.inventory_id}`,
          );

        // Check stock availability
        if (inventory.available_units < item.quantity)
          throw new BadRequestException(
            `Insufficient stock for inventory ${inventory.id}`,
          );

        // Calculate price
        const price = Number(inventory.price) * item.quantity;
        total_amount += price;

        return { ...item, price };
      });

      // Step 1: Create Order
      const order = await this.orderRepository.create(
        { customer_name, status, total_amount } as Order,
        { transaction },
      );

      // Step 2: Insert Order Items with the Order's ID
      orderItemsToCreate.forEach((item) => (item.order_id = order.id));

      await this.orderItemService.bulkCreate(
        orderItemsToCreate as OrderItem[],
        { transaction },
      );

      // Step 3: Commit Transaction
      await transaction.commit();

      // Step 4: Return Order with Items
      return this.orderRepository.findByPk(order.id, {
        include: [OrderItem],
      }) as Promise<Order>;
    } catch (error) {
      // Rollback if any error occurs
      await transaction.rollback();
      throw error;
    }
  }

  async findOne(id: string): Promise<Order | null> {
    return this.orderRepository.findByPk(id, { include: { all: true } });
  }
}
