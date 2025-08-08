import { AppLogger } from '@dailyshop/shared-utils'
import { Module } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { ClientsModule, Transport } from '@nestjs/microservices'
import { CourierController } from './courier.controller'
import { CourierService } from './courier.service'

@Module({
  imports: [
    ConfigModule,
    ClientsModule.registerAsync([
      {
        name: 'COURIER_SERVICE',
        imports: [ConfigModule],
        useFactory: (cs: ConfigService) => ({
          transport: Transport.TCP,
          options: {
            host: cs.get<string>('COURIER_SERVICE_HOST') || 'courier-service',
            port: cs.get<number>('COURIER_SERVICE_PORT') || 4004
          }
        }),
        inject: [ConfigService]
      }
    ])
  ],
  controllers: [CourierController],
  providers: [CourierService, AppLogger]
})
export class CourierModule {}
