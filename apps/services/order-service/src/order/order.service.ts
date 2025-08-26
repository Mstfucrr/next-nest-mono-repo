import { OrderEntity, OrderResult, PaginationInput } from '@dailyshop/shared-types'
import { AppLogger } from '@dailyshop/shared-utils'
import { Inject, Injectable } from '@nestjs/common'
import { CreateOrderDto } from './dto/create-order.dto'
import { UpdateOrderDto } from './dto/update-order.dto'
import { IOrderRepository, ORDER_REPOSITORY } from './repositories/order.repository.interface'

@Injectable()
export class OrderService {
  constructor(
    @Inject(ORDER_REPOSITORY)
    private readonly orderRepository: IOrderRepository,
    private readonly logger: AppLogger
  ) {}

  async findAll(): Promise<OrderEntity[]> {
    this.logger.log('Fetching all orders')
    return await this.orderRepository.findAll()
  }

  async findOne(id: string): Promise<OrderEntity | null> {
    this.logger.log(`Fetching order ${id}`)
    return await this.orderRepository.findOne(id)
  }

  async create(dto: CreateOrderDto): Promise<OrderResult> {
    this.logger.log(`Creating order with data: ${JSON.stringify(dto)}`)
    const order = await this.orderRepository.create(dto)
    this.logger.log(`Order created with id: ${order.id}`)
    return { message: 'Order created', order }
  }

  async findAllWithPagination(payload: PaginationInput<OrderEntity>) {
    const { rows, total } = await this.orderRepository.findAllWithPagination(payload)
    return { rows, total }
  }

  async createMany(dtos: CreateOrderDto[]): Promise<{ message: string; orders: OrderEntity[] }> {
    this.logger.log(`Creating ${dtos.length} orders`)
    const result = await this.orderRepository.createMany(dtos)
    this.logger.log(`Created ${result.count} orders`)
    return { message: `Created ${result.count} orders`, orders: [] }
  }

  async update(id: string, dto: UpdateOrderDto): Promise<OrderResult> {
    this.logger.log(`Updating order ${id}`)
    const order = await this.orderRepository.update(id, dto)
    this.logger.log(`Order updated with id: ${order.id}`)
    return { message: 'Order updated', order }
  }

  async delete(id: string): Promise<{ message: string; success: boolean }> {
    this.logger.log(`Deleting order ${id}`)
    const success = await this.orderRepository.delete(id)
    if (success) {
      this.logger.log(`Order deleted with id: ${id}`)
      return { message: 'Order deleted successfully', success: true }
    } else {
      this.logger.warn(`Failed to delete order with id: ${id}`)
      return { message: 'Failed to delete order', success: false }
    }
  }
}
