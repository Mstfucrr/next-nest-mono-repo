import { CourierEntity, CourierResult } from '@dailyshop/shared-types'
import { AppLogger } from '@dailyshop/shared-utils'
import { Injectable } from '@nestjs/common'
import { PrismaService } from '../prisma/prisma.service'
import { CreateCourierDto } from './dto/create-courier.dto'
import { UpdateCourierDto } from './dto/update-courier.dto'

@Injectable()
export class CourierService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly logger: AppLogger
  ) {}

  async findAll(): Promise<CourierEntity[]> {
    this.logger.log('Fetching all couriers')
    return this.prisma.courier.findMany()
  }

  async findOne(id: string): Promise<CourierEntity | null> {
    this.logger.log(`Fetching courier ${id}`)
    return this.prisma.courier.findUnique({ where: { id } })
  }

  async create(dto: CreateCourierDto): Promise<CourierResult> {
    this.logger.log(`Creating courier with data: ${JSON.stringify(dto)}`)
    const courier = await this.prisma.courier.create({ data: dto })
    this.logger.log(`Courier created with id: ${courier.id}`)
    return { message: 'Courier created', courier }
  }

  async update(id: string, dto: UpdateCourierDto): Promise<CourierResult> {
    this.logger.log(`Updating courier ${id}`)
    const courier = await this.prisma.courier.update({ where: { id }, data: dto })
    this.logger.log(`Courier updated with id: ${courier.id}`)
    return { message: 'Courier updated', courier }
  }
}
