import { OrderEntity, PaginationInput } from '@dailyshop/shared-types'
import { buildPrismaQuery, paginatePrisma } from '@dailyshop/shared-utils'
import { Injectable } from '@nestjs/common'
import { Prisma } from '@prisma/client'
import { PrismaService } from '../../prisma/prisma.service'
import { CreateOrderDto } from '../dto/create-order.dto'
import { UpdateOrderDto } from '../dto/update-order.dto'
import { IOrderRepository } from './order.repository.interface'

@Injectable()
export class OrderRepository implements IOrderRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(): Promise<OrderEntity[]> {
    return await this.prisma.order.findMany()
  }

  async findOne(id: string): Promise<OrderEntity | null> {
    return await this.prisma.order.findUnique({ where: { id } })
  }

  async create(dto: CreateOrderDto): Promise<OrderEntity> {
    return await this.prisma.order.create({ data: dto })
  }

  async createMany(dtos: CreateOrderDto[]): Promise<{ count: number }> {
    return await this.prisma.order.createMany({ data: dtos })
  }

  async update(id: string, dto: UpdateOrderDto): Promise<OrderEntity> {
    return await this.prisma.order.update({ where: { id }, data: dto })
  }

  async delete(id: string): Promise<boolean> {
    try {
      await this.prisma.order.delete({ where: { id } })
      return true
    } catch {
      return false
    }
  }

  async findAllWithPagination(payload: PaginationInput<OrderEntity>) {
    const query = buildPrismaQuery<OrderEntity, Prisma.OrderWhereInput, Prisma.OrderOrderByWithRelationInput>({
      payload,
      searchable: {
        status: 'string',
        customerId: 'string',
        createdAt: 'date',
        total: 'number'
      },
      searchMode: 'AND',
      defaultSort: { key: 'createdAt', value: 'desc' },
      caseInsensitive: true,
      coerceNumeric: true
    })

    const { rows, total } = await paginatePrisma<
      OrderEntity,
      Prisma.OrderWhereInput,
      Prisma.OrderOrderByWithRelationInput
    >(this.prisma.order, query)

    return { rows, total }
  }
}
