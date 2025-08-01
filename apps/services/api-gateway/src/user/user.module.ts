import { AppLogger } from '@dailyshop/shared-utils'
import { Module } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { ClientsModule, Transport } from '@nestjs/microservices'
import { UserController } from './user.controller'
import { UserService } from './user.service'

@Module({
  imports: [
    ConfigModule,
    ClientsModule.registerAsync([
      {
        name: 'USER_SERVICE',
        imports: [ConfigModule],
        useFactory: (cs: ConfigService) => ({
          transport: Transport.TCP,
          options: {
            host: cs.get<string>('USER_SERVICE_HOST') || 'user-service',
            port: cs.get<number>('USER_SERVICE_PORT') || 4002
          }
        }),
        inject: [ConfigService]
      }
    ])
  ],
  controllers: [UserController],
  providers: [UserService, AppLogger]
})
export class UserModule {}
