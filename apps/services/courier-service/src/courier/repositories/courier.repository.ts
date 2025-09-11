import { CourierEntity, PaginationInput } from '@dailyshop/shared-types'
import { buildPrismaQuery, paginatePrisma } from '@dailyshop/shared-utils'
import { Injectable } from '@nestjs/common'
import { Prisma } from '@prisma/client'
import { PrismaService } from '../../prisma/prisma.service'
import { CreateCourierDto } from '../dto/create-courier.dto'
import { UpdateCourierDto } from '../dto/update-courier.dto'
import { ICourierRepository } from './courier.repository.interface'

@Injectable()
export class CourierRepository implements ICourierRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(): Promise<CourierEntity[]> {
    return await this.prisma.courier.findMany()
  }

  async findOne(id: string): Promise<CourierEntity | null> {
    return await this.prisma.courier.findUnique({ where: { id } })
  }

  async create(dto: CreateCourierDto): Promise<CourierEntity> {
    return await this.prisma.courier.create({ data: dto })
  }

  async createMany(dtos: CreateCourierDto[]): Promise<{ count: number }> {
    return await this.prisma.courier.createMany({ data: dtos })
  }

  async update(id: string, dto: UpdateCourierDto): Promise<CourierEntity> {
    return await this.prisma.courier.update({
      where: { id },
      data: {
        ...dto,
        state: dto.state ? 'ready' : 'deactivated'
      }
    })
  }

  async delete(id: string): Promise<boolean> {
    try {
      await this.prisma.courier.delete({ where: { id } })
      return true
    } catch {
      return false
    }
  }

  async findAllWithPagination(payload: PaginationInput<CourierEntity>) {
    const query = buildPrismaQuery<
      CourierEntity,
      Prisma.CourierDefaultArgs,
      Prisma.CourierWhereInput,
      Prisma.CourierOrderByWithRelationInput
    >({
      payload,
      searchable: {
        id: 'string',
        name: 'string',
        phone: 'string',
        mail: 'string',
        tckn: 'string',
        state: 'eq',
        createdAt: 'date',
        carrierType: 'number'
      },
      searchMode: 'AND',
      defaultSort: { key: 'createdAt', value: 'desc' },
      caseInsensitive: true,
      coerceNumeric: true,
      defaultArgs: {
        select: {
          id: true,
          name: true,
          phone: true,
          mail: true,
          tckn: true,
          state: true,
          isWorking: true,
          createdAt: true
        }
      }
    })

    const { rows, total } = await paginatePrisma<
      CourierEntity,
      Prisma.CourierDefaultArgs,
      Prisma.CourierWhereInput,
      Prisma.CourierOrderByWithRelationInput
    >(this.prisma.courier, query)

    return { rows, total }
  }

  async findByState(state: string): Promise<CourierEntity[]> {
    return await this.prisma.courier.findMany({ where: { state } })
  }

  async findByCarrierType(carrierType: number): Promise<CourierEntity[]> {
    return await this.prisma.courier.findMany({ where: { carrierType } })
  }

  async findWorkingCouriers(working: boolean = true): Promise<CourierEntity[]> {
    return await this.prisma.courier.findMany({ where: { isWorking: working } })
  }
}
