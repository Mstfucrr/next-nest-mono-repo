import { AppLogger } from '@dailyshop/shared-utils'
import { Module } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { ClientsModule, Transport } from '@nestjs/microservices'
import { ProductController } from './product.controller'
import { ProductService } from './product.service'

@Module({
  imports: [
    ConfigModule,
    ClientsModule.registerAsync([
      {
        name: 'PRODUCT_SERVICE',
        imports: [ConfigModule],
        useFactory: (cs: ConfigService) => ({
          transport: Transport.TCP,
          options: {
            host: cs.get<string>('PRODUCT_SERVICE_HOST') || '127.0.0.1',
            port: cs.get<number>('PRODUCT_SERVICE_PORT') || 4003
          }
        }),
        inject: [ConfigService]
      }
    ])
  ],
  controllers: [ProductController],
  providers: [ProductService, AppLogger]
})
export class ProductModule {}
