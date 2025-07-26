import { Module } from '@nestjs/common'
import { ClientsModule, Transport } from '@nestjs/microservices'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { UserService } from './user.service'
import { UserController } from './user.controller'
import { AppLogger } from '@dailyshop/shared-utils'

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
            host: cs.get<string>('USER_SERVICE_HOST') || '127.0.0.1',
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
