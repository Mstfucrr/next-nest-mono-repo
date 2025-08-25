import { CourierEntity, PaginationInput } from '@dailyshop/shared-types'
import { Injectable } from '@nestjs/common'
import { CreateCourierDto } from '../dto/create-courier.dto'
import { UpdateCourierDto } from '../dto/update-courier.dto'
import { ICourierRepository } from './courier.repository.interface'

@Injectable()
export class CourierSqlRepository implements ICourierRepository {
  constructor() {} // private readonly database: DatabaseConnection // Gelecekte SQL connection için

  findAll(): Promise<CourierEntity[]> {
    // SQL: SELECT * FROM courier_service.couriers
    throw new Error('SQL repository not implemented yet')
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  findOne(_id: string): Promise<CourierEntity | null> {
    // SQL: SELECT * FROM courier_service.couriers WHERE id = $1
    throw new Error('SQL repository not implemented yet')
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  create(_dto: CreateCourierDto): Promise<CourierEntity> {
    // SQL: INSERT INTO courier_service.couriers (...) VALUES (...)
    throw new Error('SQL repository not implemented yet')
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  createMany(_dtos: CreateCourierDto[]): Promise<{ count: number }> {
    // SQL: INSERT INTO courier_service.couriers (...) VALUES (...), (...), ...
    throw new Error('SQL repository not implemented yet')
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  update(_id: string, _dto: UpdateCourierDto): Promise<CourierEntity> {
    // SQL: UPDATE courier_service.couriers SET ... WHERE id = $1
    throw new Error('SQL repository not implemented yet')
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  delete(_id: string): Promise<boolean> {
    // SQL: DELETE FROM courier_service.couriers WHERE id = $1
    throw new Error('SQL repository not implemented yet')
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  findAllWithPagination(_payload: PaginationInput<CourierEntity>): Promise<{ rows: CourierEntity[]; total: number }> {
    // SQL: SELECT * FROM courier_service.couriers
    //      WHERE ...
    //      ORDER BY ...
    //      LIMIT $1 OFFSET $2
    throw new Error('SQL repository not implemented yet')
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  findByState(_state: string): Promise<CourierEntity[]> {
    // SQL: SELECT * FROM courier_service.couriers WHERE state = $1
    throw new Error('SQL repository not implemented yet')
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  findByCarrierType(_carrierType: number): Promise<CourierEntity[]> {
    // SQL: SELECT * FROM courier_service.couriers WHERE carrierType = $1
    throw new Error('SQL repository not implemented yet')
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  findWorkingCouriers(_working: boolean = true): Promise<CourierEntity[]> {
    // SQL: SELECT * FROM courier_service.couriers WHERE isWorking = $1
    throw new Error('SQL repository not implemented yet')
  }
}
