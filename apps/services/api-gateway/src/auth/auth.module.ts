import { AppLogger } from '@dailyshop/shared-utils'
import { Module } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { ClientsModule, Transport } from '@nestjs/microservices'
import { AuthController } from './auth.controller'
import { AuthService } from './auth.service'

@Module({
  imports: [
    ConfigModule,
    ClientsModule.registerAsync([
      {
        name: 'AUTH_SERVICE',
        imports: [ConfigModule],
        useFactory: (cs: ConfigService) => ({
          transport: Transport.TCP,
          options: {
            host: cs.get<string>('AUTH_SERVICE_HOST') || 'auth-service',
            port: cs.get<number>('AUTH_SERVICE_PORT') || 4001
          }
        }),
        inject: [ConfigService]
      },
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
  controllers: [AuthController],
  providers: [AuthService, AppLogger]
})
export class AuthModule {}
