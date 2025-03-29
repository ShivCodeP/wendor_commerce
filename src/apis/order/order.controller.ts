import {
  Controller,
  Post,
  Get,
  Body,
  Param,
  UseInterceptors,
} from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { OrderService } from './order.service';
import { CreateOrderDto } from './order.dto';
import { Order } from './order.model';
import { EventEmitterInterceptor } from 'src/common/interceptors';

@ApiTags('Orders')
@Controller('orders')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Post()
  @UseInterceptors(EventEmitterInterceptor)
  @ApiOperation({ summary: 'Create an order' })
  create(@Body() createOrderDto: CreateOrderDto) {
    return this.orderService.create(createOrderDto as Order);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get an order by ID' })
  findOne(@Param('id') id: string) {
    return this.orderService.findOne(id);
  }
}
