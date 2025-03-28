import { ApiProperty } from '@nestjs/swagger';
import { PartialType } from '@nestjs/mapped-types';
import {
  IsString,
  IsNumber,
  IsUrl,
  IsEnum,
  Min,
  IsOptional,
  IsArray,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';

export class CreateInventoryDto {
  @ApiProperty({
    example: 'Five Star',
    description: 'Name of the inventory item',
  })
  @IsString()
  name: string;

  @ApiProperty({ example: 10, description: 'Price of the inventory item' })
  @IsNumber()
  @Min(0)
  price: number;

  @ApiProperty({ example: 20, description: 'Available units of the item' })
  @IsNumber()
  @Min(0)
  available_units: number;

  @ApiProperty({
    example: 'http://example.com/images/five_star.jpg',
    description: 'URL of the display image',
  })
  @IsUrl()
  display_image_url: string;

  @ApiProperty({
    example: 'active',
    enum: ['active', 'inactive'],
    description: 'Status of the item',
  })
  @IsEnum(['active', 'inactive'])
  status: 'active' | 'inactive';
}

export class UpdateInventoryDto extends PartialType(CreateInventoryDto) {}

export class UpsertInventoryDto extends CreateInventoryDto {
  @ApiProperty({
    example: 1,
    description: 'ID of the inventory item (required for updating)',
  })
  @IsOptional()
  id?: number;
}

export class BulkCreateInventoryDto {
  @ApiProperty({
    type: [CreateInventoryDto],
    description: 'List of inventory items to create',
  })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateInventoryDto)
  items: CreateInventoryDto[];
}

export class BulkUpdateInventoryDto {
  @ApiProperty({
    type: [UpdateInventoryDto],
    description: 'List of inventory items to update',
  })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => UpdateInventoryDto)
  items: UpdateInventoryDto[];
}

export class BulkUpsertInventoryDto {
  @ApiProperty({
    type: [UpsertInventoryDto],
    description: 'List of inventory items to upsert',
  })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => UpsertInventoryDto)
  items: UpsertInventoryDto[];
}
