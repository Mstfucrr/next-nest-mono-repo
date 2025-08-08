import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common'
import { CourierService } from './courier.service'
import { CreateCourierDto } from './dto/create-courier.dto'
import { UpdateCourierDto } from './dto/update-courier.dto'

@Controller('courier')
export class CourierController {
  constructor(private readonly courierService: CourierService) {}

  @Post()
  create(@Body() dto: CreateCourierDto) {
    return this.courierService.create(dto)
  }

  @Get()
  findAll() {
    return this.courierService.findAll()
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.courierService.findOne(id)
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: UpdateCourierDto) {
    return this.courierService.update(id, dto)
  }
}
