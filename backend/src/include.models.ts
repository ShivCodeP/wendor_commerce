import { Model, ModelCtor } from 'sequelize-typescript';
import { Inventories } from './apis/inventories/inventories.model';
import { ApiKey } from './cores/auth/auth.model';

export const MODELS: ModelCtor<Model<any, any>>[] = [
  // Define your models here
  Inventories,

  // Add other models from cores and apis as needed
  ApiKey,
];
