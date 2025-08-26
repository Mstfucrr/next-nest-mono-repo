import { AppLogger } from '@dailyshop/shared-utils'
import { Module } from '@nestjs/common'
import { PrismaModule } from '../prisma/prisma.module'
import { OrderController } from './order.controller'
import { OrderService } from './order.service'
import { OrderRepository } from './repositories/order.repository'
import { ORDER_REPOSITORY } from './repositories/order.repository.interface'

@Module({
  imports: [PrismaModule],
  controllers: [OrderController],
  providers: [
    OrderService,
    AppLogger,
    {
      provide: ORDER_REPOSITORY,
      useClass: OrderRepository
    }
  ]
})
export class OrderModule {}
