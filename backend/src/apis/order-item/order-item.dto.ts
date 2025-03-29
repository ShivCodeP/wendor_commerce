import { IsNotEmpty, IsNumber, IsUUID } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateOrderItemDto {
  @ApiProperty({
    description: 'UUID of the inventory item being ordered',
    example: '3b2f3bba-4b1b-46e9-91fa-5b4c60a12b3d',
  })
  @IsUUID()
  @IsNotEmpty()
  inventory_id: string;

  @ApiProperty({
    description: 'Quantity of the inventory item in the order',
    example: 2,
  })
  @IsNumber()
  quantity: number;
}
