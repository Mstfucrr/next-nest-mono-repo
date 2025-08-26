import { OrderEntity, OrderResult, PaginationInput, PaginationOutput } from '@dailyshop/shared-types'
import { AppLogger } from '@dailyshop/shared-utils'
import { Inject, Injectable } from '@nestjs/common'
import { ClientProxy } from '@nestjs/microservices'
import { firstValueFrom } from 'rxjs'
import { CreateOrderDto } from './dto/create-order.dto'
import { UpdateOrderDto } from './dto/update-order.dto'

@Injectable()
export class OrderService {
  constructor(
    @Inject('ORDER_SERVICE') private readonly orderClient: ClientProxy,
    private readonly logger: AppLogger
  ) {}

  async findAll(): Promise<OrderEntity[]> {
    this.logger.log('Fetching all orders')
    return firstValueFrom<OrderEntity[]>(this.orderClient.send({ cmd: 'order-find-all' }, {}))
  }

  async findOne(id: string): Promise<OrderEntity | null> {
    this.logger.log(`Fetching order ${id}`)
    return firstValueFrom<OrderEntity | null>(this.orderClient.send({ cmd: 'order-find-one' }, { id }))
  }

  async findAllWithPagination(payload: PaginationInput<OrderEntity>): Promise<PaginationOutput<OrderEntity>> {
    this.logger.log('Find all orders with pagination request received')
    return firstValueFrom<PaginationOutput<OrderEntity>>(
      this.orderClient.send({ cmd: 'order-find-all-with-pagination' }, payload)
    )
  }

  async create(dto: CreateOrderDto): Promise<OrderResult> {
    this.logger.log(`Creating order with data: ${JSON.stringify(dto)}`)
    return firstValueFrom<OrderResult>(this.orderClient.send({ cmd: 'order-create' }, dto))
  }

  async createMany(dtos: CreateOrderDto[]): Promise<{ message: string; orders: OrderEntity[] }> {
    this.logger.log(`Creating ${dtos.length} orders`)
    return firstValueFrom<{ message: string; orders: OrderEntity[] }>(
      this.orderClient.send({ cmd: 'order-create-many' }, dtos)
    )
  }

  async update(id: string, dto: UpdateOrderDto): Promise<OrderResult> {
    this.logger.log(`Updating order ${id}`)
    return firstValueFrom<OrderResult>(this.orderClient.send({ cmd: 'order-update' }, { id, data: dto }))
  }

  async delete(id: string): Promise<{ message: string; success: boolean }> {
    this.logger.log(`Deleting order ${id}`)
    return firstValueFrom<{ message: string; success: boolean }>(
      this.orderClient.send({ cmd: 'order-delete' }, { id })
    )
  }
}
