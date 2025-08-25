import { CourierEntity, CourierResult, PaginationInput, PaginationOutput } from '@dailyshop/shared-types'
import { AppLogger } from '@dailyshop/shared-utils'
import { Inject, Injectable } from '@nestjs/common'
import { ClientProxy } from '@nestjs/microservices'
import { firstValueFrom } from 'rxjs'
import { CreateCourierDto } from './dto/create-courier.dto'
import { UpdateCourierDto } from './dto/update-courier.dto'

@Injectable()
export class CourierService {
  constructor(
    @Inject('COURIER_SERVICE') private readonly courierClient: ClientProxy,
    private readonly logger: AppLogger
  ) {}

  async findAll(): Promise<CourierEntity[]> {
    this.logger.log('Fetching all couriers')
    return firstValueFrom<CourierEntity[]>(this.courierClient.send({ cmd: 'courier-find-all' }, {}))
  }

  async findOne(id: string): Promise<CourierEntity | null> {
    this.logger.log(`Fetching courier ${id}`)
    return firstValueFrom<CourierEntity | null>(this.courierClient.send({ cmd: 'courier-find-one' }, { id }))
  }

  async findAllWithPagination(payload: PaginationInput<CourierEntity>): Promise<PaginationOutput<CourierEntity>> {
    this.logger.log('Find all couriers with pagination request received')
    return firstValueFrom<PaginationOutput<CourierEntity>>(
      this.courierClient.send({ cmd: 'courier-find-all-with-pagination' }, payload)
    )
  }

  async create(dto: CreateCourierDto): Promise<CourierResult> {
    this.logger.log(`Creating courier with data: ${JSON.stringify(dto)}`)
    return firstValueFrom<CourierResult>(this.courierClient.send({ cmd: 'courier-create' }, dto))
  }

  async createMany(dtos: CreateCourierDto[]): Promise<{ message: string; couriers: CourierEntity[] }> {
    this.logger.log(`Creating ${dtos.length} couriers`)
    return firstValueFrom<{ message: string; couriers: CourierEntity[] }>(
      this.courierClient.send({ cmd: 'courier-create-many' }, dtos)
    )
  }

  async update(id: string, dto: UpdateCourierDto): Promise<CourierResult> {
    this.logger.log(`Updating courier ${id}`)
    return firstValueFrom<CourierResult>(this.courierClient.send({ cmd: 'courier-update' }, { id, data: dto }))
  }

  async delete(id: string): Promise<{ message: string; success: boolean }> {
    this.logger.log(`Deleting courier ${id}`)
    return firstValueFrom<{ message: string; success: boolean }>(
      this.courierClient.send({ cmd: 'courier-delete' }, { id })
    )
  }

  async findByState(state: string): Promise<CourierEntity[]> {
    this.logger.log(`Fetching couriers with state: ${state}`)
    return firstValueFrom<CourierEntity[]>(this.courierClient.send({ cmd: 'courier-find-by-state' }, { state }))
  }

  async findByCarrierType(carrierType: number): Promise<CourierEntity[]> {
    this.logger.log(`Fetching couriers with carrier type: ${carrierType}`)
    return firstValueFrom<CourierEntity[]>(
      this.courierClient.send({ cmd: 'courier-find-by-carrier-type' }, { carrierType })
    )
  }

  async findWorkingCouriers(working: boolean = true): Promise<CourierEntity[]> {
    this.logger.log('Fetching working couriers')
    return firstValueFrom<CourierEntity[]>(this.courierClient.send({ cmd: 'courier-find-working' }, { working }))
  }
}
