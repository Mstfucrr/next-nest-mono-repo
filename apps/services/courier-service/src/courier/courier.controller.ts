import { CourierEntity, CourierResult, PaginationInput, PaginationOutput } from '@dailyshop/shared-types'
import { AppLogger } from '@dailyshop/shared-utils'
import { Controller } from '@nestjs/common'
import { MessagePattern, Payload } from '@nestjs/microservices'
import { CourierService } from './courier.service'
import { CreateCourierDto } from './dto/create-courier.dto'
import { UpdateCourierDto } from './dto/update-courier.dto'

@Controller()
export class CourierController {
  constructor(
    private readonly courierService: CourierService,
    private readonly logger: AppLogger
  ) {}

  @MessagePattern({ cmd: 'courier-create' })
  create(@Payload() payload: CreateCourierDto): Promise<CourierResult> {
    this.logger.log('Create courier request received')
    return this.courierService.create(payload)
  }

  @MessagePattern({ cmd: 'courier-create-many' })
  createMany(@Payload() payload: CreateCourierDto[]): Promise<{ message: string; couriers: CourierEntity[] }> {
    this.logger.log(`Create many couriers request received: ${payload.length} couriers`)
    return this.courierService.createMany(payload)
  }

  @MessagePattern({ cmd: 'courier-find-all' })
  findAll(): Promise<CourierEntity[]> {
    this.logger.log('Find all couriers request received')
    return this.courierService.findAll()
  }

  @MessagePattern({ cmd: 'courier-find-all-with-pagination' })
  findAllWithPagination(@Payload() payload: PaginationInput<CourierEntity>): Promise<PaginationOutput<CourierEntity>> {
    this.logger.log(`Find all couriers with pagination request received: ${JSON.stringify(payload)}`)
    console.log('payload', payload)
    return this.courierService.findAllWithPagination(payload)
  }

  @MessagePattern({ cmd: 'courier-find-one' })
  findOne(@Payload() payload: { id: string }): Promise<CourierEntity | null> {
    this.logger.log(`Find courier ${payload.id}`)
    return this.courierService.findOne(payload.id)
  }

  @MessagePattern({ cmd: 'courier-update' })
  update(@Payload() payload: { id: string; data: UpdateCourierDto }): Promise<CourierResult> {
    this.logger.log(`Update courier ${payload.id}`)
    return this.courierService.update(payload.id, payload.data)
  }
}
