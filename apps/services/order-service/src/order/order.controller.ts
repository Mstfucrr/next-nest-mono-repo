import { OrderEntity, OrderResult, PaginationInput, PaginationOutput } from '@dailyshop/shared-types'
import { AppLogger } from '@dailyshop/shared-utils'
import { Controller } from '@nestjs/common'
import { MessagePattern, Payload } from '@nestjs/microservices'
import { OrderService } from './order.service'
import { CreateOrderDto } from './dto/create-order.dto'
import { UpdateOrderDto } from './dto/update-order.dto'

@Controller()
export class OrderController {
  constructor(
    private readonly orderService: OrderService,
    private readonly logger: AppLogger
  ) {}

  @MessagePattern({ cmd: 'order-create' })
  create(@Payload() payload: CreateOrderDto): Promise<OrderResult> {
    this.logger.log('Create order request received')
    return this.orderService.create(payload)
  }

  @MessagePattern({ cmd: 'order-create-many' })
  createMany(@Payload() payload: CreateOrderDto[]): Promise<{ message: string; orders: OrderEntity[] }> {
    this.logger.log(`Create many orders request received: ${payload.length} orders`)
    return this.orderService.createMany(payload)
  }

  @MessagePattern({ cmd: 'order-find-all' })
  findAll(): Promise<OrderEntity[]> {
    this.logger.log('Find all orders request received')
    return this.orderService.findAll()
  }

  @MessagePattern({ cmd: 'order-find-all-with-pagination' })
  findAllWithPagination(@Payload() payload: PaginationInput<OrderEntity>): Promise<PaginationOutput<OrderEntity>> {
    this.logger.log(`Find all orders with pagination request received: ${JSON.stringify(payload)}`)
    return this.orderService.findAllWithPagination(payload)
  }

  @MessagePattern({ cmd: 'order-find-one' })
  findOne(@Payload() payload: { id: string }): Promise<OrderEntity | null> {
    this.logger.log(`Find order ${payload.id}`)
    return this.orderService.findOne(payload.id)
  }

  @MessagePattern({ cmd: 'order-update' })
  update(@Payload() payload: { id: string; data: UpdateOrderDto }): Promise<OrderResult> {
    this.logger.log(`Update order ${payload.id}`)
    return this.orderService.update(payload.id, payload.data)
  }

  @MessagePattern({ cmd: 'order-delete' })
  delete(@Payload() payload: { id: string }): Promise<{ message: string; success: boolean }> {
    this.logger.log(`Delete order ${payload.id}`)
    return this.orderService.delete(payload.id)
  }
}
