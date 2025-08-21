import { CourierEntity, PaginationInput } from '@dailyshop/shared-types'
import { Body, Controller, Get, Param, Patch, Post, Query, UsePipes, ValidationPipe } from '@nestjs/common'
import { ApiExtraModels, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger'
import { PaginationQueryDto } from '../shared/dto/pagination.dto'
import { CourierService } from './courier.service'
import { CreateCourierDto } from './dto/create-courier.dto'
import { CreateManyCouriersDto } from './dto/create-many-couriers.dto'
import { CourierPaginationQueryDto } from './dto/pagination.dto'
import { UpdateCourierDto } from './dto/update-courier.dto'

@ApiTags('Courier')
@ApiExtraModels(PaginationQueryDto)
@Controller('courier')
export class CourierController {
  constructor(private readonly courierService: CourierService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new courier' })
  @ApiResponse({ status: 201, description: 'Courier created successfully' })
  @ApiResponse({ status: 400, description: 'Bad request' })
  create(@Body() dto: CreateCourierDto) {
    return this.courierService.create(dto)
  }

  @Post('bulk')
  @ApiOperation({ summary: 'Create multiple couriers at once' })
  @ApiResponse({ status: 201, description: 'Couriers created successfully' })
  @ApiResponse({ status: 400, description: 'Bad request' })
  createMany(@Body() dto: CreateManyCouriersDto) {
    return this.courierService.createMany(dto.couriers)
  }

  @Get()
  @ApiOperation({ summary: 'Get all couriers' })
  @ApiResponse({ status: 200, description: 'List of all couriers' })
  findAll() {
    return this.courierService.findAll()
  }

  @Get('pagination')
  @UsePipes(new ValidationPipe({ transform: true, whitelist: true }))
  findAllWithPagination(@Query() payload: CourierPaginationQueryDto) {
    console.log('payload', payload)
    return this.courierService.findAllWithPagination(payload as PaginationInput<CourierEntity>)
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get courier by ID' })
  @ApiResponse({ status: 200, description: 'Courier found' })
  @ApiResponse({ status: 404, description: 'Courier not found' })
  findOne(@Param('id') id: string) {
    return this.courierService.findOne(id)
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update courier by ID' })
  @ApiResponse({ status: 200, description: 'Courier updated successfully' })
  @ApiResponse({ status: 404, description: 'Courier not found' })
  @ApiResponse({ status: 400, description: 'Bad request' })
  update(@Param('id') id: string, @Body() dto: UpdateCourierDto) {
    return this.courierService.update(id, dto)
  }
}
