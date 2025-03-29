import { OrderItem } from './order-item.model';

export const ORDER_ITEM_REPOSITORY = 'ORDER_ITEM_REPOSITORY';

export const OrderItemRepository = {
  provide: ORDER_ITEM_REPOSITORY,
  useValue: OrderItem,
};
