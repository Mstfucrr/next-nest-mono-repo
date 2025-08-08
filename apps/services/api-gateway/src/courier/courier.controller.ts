import { UpdateCourierPayload } from '@dailyshop/shared-types'
import { Body, Controller, Get, Param, Patch } from '@nestjs/common'
import { CourierService } from './courier.service'

@Controller('courier')
export class CourierController {
  constructor(private readonly courierService: CourierService) {}

  @Get()
  findAll() {
    return this.courierService.findAll()
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.courierService.findOne(id)
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: UpdateCourierPayload) {
    return this.courierService.update(id, dto)
  }
}
