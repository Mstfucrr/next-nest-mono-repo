import { OrderEntity, PaginationInput } from '@dailyshop/shared-types'
import { Injectable } from '@nestjs/common'
import { CreateOrderDto } from '../dto/create-order.dto'
import { UpdateOrderDto } from '../dto/update-order.dto'
import { IOrderRepository } from './order.repository.interface'

@Injectable()
export class OrderSqlRepository implements IOrderRepository {
  constructor() {} // private readonly database: DatabaseConnection // Future SQL connection

  findAll(): Promise<OrderEntity[]> {
    // SQL: SELECT * FROM order_service.orders
    throw new Error('SQL repository not implemented yet')
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  findOne(_id: string): Promise<OrderEntity | null> {
    // SQL: SELECT * FROM order_service.orders WHERE id = $1
    throw new Error('SQL repository not implemented yet')
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  create(_dto: CreateOrderDto): Promise<OrderEntity> {
    // SQL: INSERT INTO order_service.orders (...) VALUES (...)
    throw new Error('SQL repository not implemented yet')
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  createMany(_dtos: CreateOrderDto[]): Promise<{ count: number }> {
    // SQL: INSERT INTO order_service.orders (...) VALUES (...), (...), ...
    throw new Error('SQL repository not implemented yet')
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  update(_id: string, _dto: UpdateOrderDto): Promise<OrderEntity> {
    // SQL: UPDATE order_service.orders SET ... WHERE id = $1
    throw new Error('SQL repository not implemented yet')
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  delete(_id: string): Promise<boolean> {
    // SQL: DELETE FROM order_service.orders WHERE id = $1
    throw new Error('SQL repository not implemented yet')
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  findAllWithPagination(_payload: PaginationInput<OrderEntity>): Promise<{ rows: OrderEntity[]; total: number }> {
    // SQL: SELECT * FROM order_service.orders
    //      WHERE ...
    //      ORDER BY ...
    //      LIMIT $1 OFFSET $2
    throw new Error('SQL repository not implemented yet')
  }
}
