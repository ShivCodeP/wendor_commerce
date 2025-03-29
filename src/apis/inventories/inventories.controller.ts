import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  UseGuards,
  UsePipes,
  Query,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { InventoriesService } from './inventories.service';
import {
  CreateInventoryDto,
  UpsertInventoryDto,
  BulkCreateInventoryDto,
  BulkUpdateInventoryDto,
  BulkUpsertInventoryDto,
} from './inventories.dto';
import { Inventories } from './inventories.model';
import { CanAuthGuard } from 'src/cores/auth/auth.guard';
import { PaginationParserPipe } from 'src/common/pipes';

@ApiTags('Inventories')
@Controller('inventories')
export class InventoriesController {
  constructor(private readonly inventoriesService: InventoriesService) {}

  @Post()
  @ApiOperation({ summary: 'Create an inventory item' })
  @ApiResponse({
    status: 201,
    description: 'Inventory item created successfully.',
    type: Inventories,
  })
  async create(@Body() createInventoryDto: CreateInventoryDto) {
    return this.inventoriesService.create(createInventoryDto as Inventories);
  }

  @Get()
  @UsePipes(PaginationParserPipe)
  @ApiOperation({ summary: 'Get all inventory items' })
  @ApiResponse({
    status: 200,
    description: 'Returns the list of all inventory items.',
    type: [Inventories],
  })
  async findAll(@Query() query: any): Promise<Inventories[]> {
    return this.inventoriesService.findAll(query);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get an inventory item by ID' })
  @ApiResponse({
    status: 200,
    description: 'Returns the inventory item.',
    type: Inventories,
  })
  async findOne(@Param('id') id: number) {
    return this.inventoriesService.findOne(id);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete an inventory item' })
  @ApiResponse({
    status: 200,
    description: 'Inventory item deleted successfully.',
  })
  async delete(@Param('id') id: number): Promise<number> {
    return this.inventoriesService.delete(id);
  }

  @Post('/upsert')
  @ApiOperation({ summary: 'Upsert an inventory item' })
  @ApiResponse({
    status: 200,
    description: 'Inventory item upserted successfully.',
    type: Inventories,
  })
  async upsert(@Body() upsertInventoryDto: UpsertInventoryDto) {
    return this.inventoriesService.upsert(upsertInventoryDto as Inventories);
  }

  @UseGuards(CanAuthGuard)
  @Post('/bulk-create')
  @ApiOperation({ summary: 'Bulk create inventory items' })
  @ApiResponse({
    status: 201,
    description: 'Bulk inventory items created successfully.',
    type: [Inventories],
  })
  async bulkCreate(@Body() bulkCreateInventoryDto: BulkCreateInventoryDto) {
    return this.inventoriesService.bulkCreate(
      bulkCreateInventoryDto.items as Inventories[],
    );
  }

  @UseGuards(CanAuthGuard)
  @Put('/bulk-update')
  @ApiOperation({ summary: 'Bulk update inventory items' })
  @ApiResponse({
    status: 200,
    description: 'Bulk inventory items updated successfully.',
  })
  async bulkUpdate(@Body() bulkUpdateInventoryDto: BulkUpdateInventoryDto) {
    return this.inventoriesService.bulkUpdate(bulkUpdateInventoryDto.items);
  }

  @UseGuards(CanAuthGuard)
  @Post('/bulk-upsert')
  @ApiOperation({ summary: 'Bulk upsert inventory items' })
  @ApiResponse({
    status: 200,
    description: 'Bulk inventory items upserted successfully.',
    type: [Inventories],
  })
  async bulkUpsert(@Body() bulkUpsertInventoryDto: BulkUpsertInventoryDto) {
    return this.inventoriesService.bulkUpsert(
      bulkUpsertInventoryDto.items as Inventories[],
    );
  }
}
