import { CourierEntity, CourierResult, PaginationInput } from '@dailyshop/shared-types'
import { AppLogger } from '@dailyshop/shared-utils'
import { Inject, Injectable } from '@nestjs/common'
import { CreateCourierDto } from './dto/create-courier.dto'
import { UpdateCourierDto } from './dto/update-courier.dto'
import { COURIER_REPOSITORY, ICourierRepository } from './repositories/courier.repository.interface'

@Injectable()
export class CourierService {
  constructor(
    @Inject(COURIER_REPOSITORY)
    private readonly courierRepository: ICourierRepository,
    private readonly logger: AppLogger
  ) {}

  async findAll(): Promise<CourierEntity[]> {
    this.logger.log('Fetching all couriers')
    return await this.courierRepository.findAll()
  }

  async findOne(id: string): Promise<CourierEntity | null> {
    this.logger.log(`Fetching courier ${id}`)
    return await this.courierRepository.findOne(id)
  }

  async create(dto: CreateCourierDto): Promise<CourierResult> {
    this.logger.log(`Creating courier with data: ${JSON.stringify(dto)}`)
    const courier = await this.courierRepository.create(dto)
    this.logger.log(`Courier created with id: ${courier.id}`)
    return { message: 'Courier created', courier }
  }

  async findAllWithPagination(payload: PaginationInput<CourierEntity>) {
    const { rows, total } = await this.courierRepository.findAllWithPagination(payload)
    return { rows, total }
  }

  async createMany(dtos: CreateCourierDto[]): Promise<{ message: string; couriers: CourierEntity[] }> {
    this.logger.log(`Creating ${dtos.length} couriers`)
    const result = await this.courierRepository.createMany(dtos)
    this.logger.log(`Created ${result.count} couriers`)
    return { message: `Created ${result.count} couriers`, couriers: [] }
  }

  async update(id: string, dto: UpdateCourierDto): Promise<CourierResult> {
    this.logger.log(`Updating courier ${id}`)
    const courier = await this.courierRepository.update(id, dto)
    this.logger.log(`Courier updated with id: ${courier.id}`)
    return { message: 'Courier updated', courier }
  }

  async delete(id: string): Promise<{ message: string; success: boolean }> {
    this.logger.log(`Deleting courier ${id}`)
    const success = await this.courierRepository.delete(id)
    if (success) {
      this.logger.log(`Courier deleted with id: ${id}`)
      return { message: 'Courier deleted successfully', success: true }
    } else {
      this.logger.warn(`Failed to delete courier with id: ${id}`)
      return { message: 'Failed to delete courier', success: false }
    }
  }

  async findByState(state: string): Promise<CourierEntity[]> {
    this.logger.log(`Fetching couriers with state: ${state}`)
    return await this.courierRepository.findByState(state)
  }

  async findByCarrierType(carrierType: number): Promise<CourierEntity[]> {
    this.logger.log(`Fetching couriers with carrier type: ${carrierType}`)
    return await this.courierRepository.findByCarrierType(carrierType)
  }

  async findWorkingCouriers(working: boolean = true): Promise<CourierEntity[]> {
    this.logger.log('Fetching working couriers')
    return await this.courierRepository.findWorkingCouriers(working)
  }
}
