import { OrderEntity, PaginationInput } from '@dailyshop/shared-types'
import { CreateOrderDto } from '../dto/create-order.dto'
import { UpdateOrderDto } from '../dto/update-order.dto'

export const ORDER_REPOSITORY = 'ORDER_REPOSITORY'

export interface IOrderRepository {
  findAll(): Promise<OrderEntity[]>
  findOne(id: string): Promise<OrderEntity | null>
  create(dto: CreateOrderDto): Promise<OrderEntity>
  createMany(dtos: CreateOrderDto[]): Promise<{ count: number }>
  update(id: string, dto: UpdateOrderDto): Promise<OrderEntity>
  delete(id: string): Promise<boolean>
  findAllWithPagination(
    payload: PaginationInput<OrderEntity>
  ): Promise<{ rows: OrderEntity[]; total: number }>
}
