import { IsString, IsNotEmpty, IsArray, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import { CreateOrderItemDto } from '../order-item/order-item.dto';

export class CreateOrderDto {
  @ApiProperty({
    description: 'Customer name who placed the order',
    example: 'John Doe',
  })
  @IsString()
  @IsNotEmpty()
  customer_name: string;

  @ApiProperty({
    description: 'Status of the order (e.g., pending, shipped, delivered)',
    example: 'pending',
  })
  @IsString()
  @IsNotEmpty()
  status: string;

  @ApiProperty({
    description: 'List of order items included in the order',
    type: [CreateOrderItemDto],
  })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateOrderItemDto)
  order_items: CreateOrderItemDto[];
}
