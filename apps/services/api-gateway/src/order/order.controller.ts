import { OrderEntity, PaginationInput } from '@dailyshop/shared-types'
import { Body, Controller, Delete, Get, Param, Patch, Post, Query, UsePipes, ValidationPipe } from '@nestjs/common'
import { ApiExtraModels, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger'
import { PaginationQueryDto } from '../shared/dto/pagination.dto'
import { CreateOrderDto } from './dto/create-order.dto'
import { OrderPaginationQueryDto } from './dto/pagination.dto'
import { UpdateOrderDto } from './dto/update-order.dto'
import { OrderService } from './order.service'

@ApiTags('Order')
@ApiExtraModels(PaginationQueryDto)
@Controller('order')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new order' })
  @ApiResponse({ status: 201, description: 'Order created successfully' })
  @ApiResponse({ status: 400, description: 'Bad request' })
  create(@Body() dto: CreateOrderDto) {
    return this.orderService.create(dto)
  }

  @Post('bulk')
  @ApiOperation({ summary: 'Create multiple orders at once' })
  @ApiResponse({ status: 201, description: 'Orders created successfully' })
  @ApiResponse({ status: 400, description: 'Bad request' })
  createMany(@Body() dtos: CreateOrderDto[]) {
    return this.orderService.createMany(dtos)
  }

  @Get()
  @ApiOperation({ summary: 'Get all orders' })
  @ApiResponse({ status: 200, description: 'List of all orders' })
  findAll() {
    return this.orderService.findAll()
  }

  @Get('pagination')
  @UsePipes(new ValidationPipe({ transform: true, whitelist: true }))
  findAllWithPagination(@Query() payload: OrderPaginationQueryDto) {
    return this.orderService.findAllWithPagination(payload as PaginationInput<OrderEntity>)
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get order by ID' })
  @ApiResponse({ status: 200, description: 'Order found' })
  @ApiResponse({ status: 404, description: 'Order not found' })
  findOne(@Param('id') id: string) {
    return this.orderService.findOne(id)
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update order by ID' })
  @ApiResponse({ status: 200, description: 'Order updated successfully' })
  @ApiResponse({ status: 404, description: 'Order not found' })
  @ApiResponse({ status: 400, description: 'Bad request' })
  update(@Param('id') id: string, @Body() dto: UpdateOrderDto) {
    return this.orderService.update(id, dto)
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete order by ID' })
  @ApiResponse({ status: 200, description: 'Order deleted successfully' })
  @ApiResponse({ status: 404, description: 'Order not found' })
  delete(@Param('id') id: string) {
    return this.orderService.delete(id)
  }
}
