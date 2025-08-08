import { CourierEntity, UpdateCourierPayload } from '@dailyshop/shared-types'
import { AppLogger } from '@dailyshop/shared-utils'
import { Inject, Injectable } from '@nestjs/common'
import { ClientProxy } from '@nestjs/microservices'
import { firstValueFrom } from 'rxjs'

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

  async update(id: string, dto: UpdateCourierPayload): Promise<CourierEntity> {
    this.logger.log(`Updating courier ${id}`)
    return firstValueFrom<CourierEntity>(this.courierClient.send({ cmd: 'courier-update' }, { id, data: dto }))
  }
}
