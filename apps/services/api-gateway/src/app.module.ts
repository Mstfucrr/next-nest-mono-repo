// src/app.module.ts
import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { GatewayModule } from './gateway/gateway.module'

@Module({
  imports: [
    // .env dosyasını yükler ve ConfigService’i global olarak kullanılabilir kılar
    ConfigModule.forRoot({ isGlobal: true }),

    // GatewayModule: HTTP endpoint’leri ve microservice client proxy’lerini içerir
    GatewayModule
  ]
})
export class AppModule {}
