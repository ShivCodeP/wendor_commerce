import { Injectable, PipeTransform, BadRequestException } from '@nestjs/common';
import { FindOptions } from 'sequelize';

@Injectable()
export class PaginationParserPipe implements PipeTransform {
  transform(value: any): FindOptions {
    const filters: FindOptions = {};

    // Parse limit
    if (value.limit) {
      const limit = parseInt(value.limit, 10);
      if (isNaN(limit) || limit <= 0)
        throw new BadRequestException('Invalid limit value');
      filters.limit = limit;
    }

    // Parse offset
    if (value.offset) {
      const offset = parseInt(value.offset, 10);
      if (isNaN(offset) || offset < 0)
        throw new BadRequestException('Invalid offset value');
      filters.offset = offset;
    }

    return filters;
  }
}
