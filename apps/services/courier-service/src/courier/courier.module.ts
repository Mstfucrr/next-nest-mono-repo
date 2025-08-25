import { AppLogger } from '@dailyshop/shared-utils'
import { Module } from '@nestjs/common'
import { PrismaModule } from '../prisma/prisma.module'
import { CourierController } from './courier.controller'
import { CourierService } from './courier.service'
import { CourierRepository } from './repositories/courier.repository'
import { COURIER_REPOSITORY } from './repositories/courier.repository.interface'

@Module({
  imports: [PrismaModule],
  controllers: [CourierController],
  providers: [
    CourierService,
    AppLogger,
    {
      provide: COURIER_REPOSITORY,
      useClass: CourierRepository
    }
  ]
})
export class CourierModule {}
