import { CourierEntity, PaginationInput } from '@dailyshop/shared-types'
import { CreateCourierDto } from '../dto/create-courier.dto'
import { UpdateCourierDto } from '../dto/update-courier.dto'

export const COURIER_REPOSITORY = 'COURIER_REPOSITORY'

export interface ICourierRepository {
  findAll(): Promise<CourierEntity[]>
  findOne(id: string): Promise<CourierEntity | null>
  create(dto: CreateCourierDto): Promise<CourierEntity>
  createMany(dtos: CreateCourierDto[]): Promise<{ count: number }>
  update(id: string, dto: UpdateCourierDto): Promise<CourierEntity>
  delete(id: string): Promise<boolean>
  findAllWithPagination(payload: PaginationInput<CourierEntity>): Promise<{ rows: CourierEntity[]; total: number }>
  findByState(state: string): Promise<CourierEntity[]>
  findByCarrierType(carrierType: number): Promise<CourierEntity[]>
  findWorkingCouriers(working?: boolean): Promise<CourierEntity[]>
}
