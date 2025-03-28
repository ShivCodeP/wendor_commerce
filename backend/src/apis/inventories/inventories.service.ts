import { Injectable, Inject } from '@nestjs/common';
import { Inventories } from './inventories.model';
import { INVENTORIES_REPOSITORY } from './inventories.repository';
import { FindOptions } from 'sequelize';

@Injectable()
export class InventoriesService {
  constructor(
    @Inject(INVENTORIES_REPOSITORY)
    private readonly inventoriesRepository: typeof Inventories,
  ) {}

  async create(item: Inventories): Promise<Inventories> {
    return this.inventoriesRepository.create(item);
  }

  async findAll(filter?: FindOptions<Inventories>): Promise<Inventories[]> {
    return this.inventoriesRepository.findAll(filter);
  }

  async findOne(id: number): Promise<Inventories | null> {
    return this.inventoriesRepository.findByPk(id);
  }

  async update(id: number, item: Partial<Inventories>): Promise<[number]> {
    return this.inventoriesRepository.update(item, { where: { id } });
  }

  async delete(id: number): Promise<number> {
    return this.inventoriesRepository.destroy({ where: { id } });
  }

  async upsert(item: Inventories): Promise<Inventories> {
    return this.inventoriesRepository
      .upsert(item)
      .then(([inventory]) => inventory);
  }

  async bulkCreate(items: Inventories[]): Promise<Inventories[]> {
    return this.inventoriesRepository.bulkCreate(items);
  }

  async bulkUpdate(items: Partial<Inventories>[]): Promise<[number][]> {
    return Promise.all(
      items.map((item) =>
        this.inventoriesRepository.update(item, { where: { id: item.id } }),
      ),
    );
  }

  async bulkUpsert(items: Inventories[]): Promise<Inventories[]> {
    return Promise.all(items.map((item) => this.upsert(item)));
  }
}
