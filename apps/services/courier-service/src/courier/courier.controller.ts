import { CourierEntity, UpdateCourierPayload } from '@dailyshop/shared-types'
import { AppLogger } from '@dailyshop/shared-utils'
import { Controller } from '@nestjs/common'
import { MessagePattern, Payload } from '@nestjs/microservices'
import { CourierService } from './courier.service'

@Controller()
export class CourierController {
  constructor(
    private readonly courierService: CourierService,
    private readonly logger: AppLogger
  ) {}

  @MessagePattern({ cmd: 'courier-find-all' })
  findAll(): Promise<CourierEntity[]> {
    this.logger.log('Find all couriers request received')
    return this.courierService.findAll()
  }

  @MessagePattern({ cmd: 'courier-find-one' })
  findOne(@Payload() payload: { id: string }): Promise<CourierEntity | null> {
    this.logger.log(`Find courier ${payload.id}`)
    return this.courierService.findOne(payload.id)
  }

  @MessagePattern({ cmd: 'courier-update' })
  update(@Payload() payload: { id: string; data: UpdateCourierPayload }): Promise<CourierEntity> {
    this.logger.log(`Update courier ${payload.id}`)
    return this.courierService.update(payload.id, payload.data)
  }
}
