import { Inventories } from './inventories.model';

export const INVENTORIES_REPOSITORY = 'INVENTORIES_REPOSITORY';

export const InventoriesRepository = {
  provide: INVENTORIES_REPOSITORY,
  useValue: Inventories,
};
