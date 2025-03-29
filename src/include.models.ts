import { Model, ModelCtor } from 'sequelize-typescript';
import { Inventories } from './apis/inventories/inventories.model';
import { ApiKey } from './cores/auth/auth.model';
import { Order } from './apis/order/order.model';
import { OrderItem } from './apis/order-item/order-item.model';

export const MODELS: ModelCtor<Model<any, any>>[] = [
  // Define your models here
  Inventories,
  Order,
  OrderItem,

  // Add other models from cores and apis as needed
  ApiKey,
];
