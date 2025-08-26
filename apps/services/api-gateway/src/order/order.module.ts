import { AppLogger } from '@dailyshop/shared-utils'
import { Module } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { ClientsModule, Transport } from '@nestjs/microservices'
import { OrderController } from './order.controller'
import { OrderService } from './order.service'

@Module({
  imports: [
    ConfigModule,
    ClientsModule.registerAsync([
      {
        name: 'ORDER_SERVICE',
        imports: [ConfigModule],
        useFactory: (cs: ConfigService) => ({
          transport: Transport.TCP,
          options: {
            host: cs.get<string>('ORDER_SERVICE_HOST') || 'order-service',
            port: cs.get<number>('ORDER_SERVICE_PORT') || 4005
          }
        }),
        inject: [ConfigService]
      }
    ])
  ],
  controllers: [OrderController],
  providers: [OrderService, AppLogger]
})
export class OrderModule {}
