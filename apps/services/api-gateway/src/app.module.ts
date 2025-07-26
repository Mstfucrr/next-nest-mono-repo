// src/app.module.ts
import { Module } from '@nestjs/common'
import { AppLogger } from '@dailyshop/shared-utils'
import { ConfigModule } from '@nestjs/config'
import { AuthModule } from './auth/auth.module'
import { UserModule } from './user/user.module'

@Module({
  imports: [
    // .env dosyasını yükler ve ConfigService’i global olarak kullanılabilir kılar
    ConfigModule.forRoot({ isGlobal: true }),

    // Auth ve User modülleri HTTP endpointlerini ve microservice client bağlantılarını içerir
    AuthModule,
    UserModule
  ],
  providers: [AppLogger]
})
export class AppModule {}
