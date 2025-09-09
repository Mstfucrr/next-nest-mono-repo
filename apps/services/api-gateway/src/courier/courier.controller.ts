import { CourierEntity, PaginationInput } from '@dailyshop/shared-types'
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseBoolPipe,
  Patch,
  Post,
  Query,
  UsePipes,
  ValidationPipe
} from '@nestjs/common'
import { ApiExtraModels, ApiOperation, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger'
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
  @ApiResponse({ status: 200, description: 'List of couriers by pagination' })
  @ApiResponse({ status: 400, description: 'Bad request' })
  findAllWithPagination(@Query() payload: CourierPaginationQueryDto) {
    console.log('payload', payload)
    return this.courierService.findAllWithPagination(payload as PaginationInput<CourierEntity>)
  }

  @Get('working')
  @ApiOperation({ summary: 'Get couriers by working status' })
  @ApiResponse({ status: 200, description: 'List of couriers by working status' })
  @ApiResponse({ status: 400, description: 'Bad request' })
  @ApiQuery({
    name: 'working',
    required: false,
    type: Boolean,
    description: 'true/false. Boş bırakırsanız default true olarak döner.'
  })
  findWorkingCouriers(@Query('working', new ParseBoolPipe({ optional: true })) working?: boolean) {
    return this.courierService.findWorkingCouriers(working)
  }

  @Get('state/:state')
  @ApiOperation({ summary: 'Get couriers by state' })
  @ApiResponse({ status: 200, description: 'List of couriers by state' })
  findByState(@Param('state') state: string) {
    return this.courierService.findByState(state)
  }

  @Get('carrier-type/:carrierType')
  @ApiOperation({ summary: 'Get couriers by carrier type' })
  @ApiResponse({ status: 200, description: 'List of couriers by carrier type' })
  findByCarrierType(@Param('carrierType') carrierType: number) {
    return this.courierService.findByCarrierType(carrierType)
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

  @Delete(':id')
  @ApiOperation({ summary: 'Delete courier by ID' })
  @ApiResponse({ status: 200, description: 'Courier deleted successfully' })
  @ApiResponse({ status: 404, description: 'Courier not found' })
  delete(@Param('id') id: string) {
    return this.courierService.delete(id)
  }
}
