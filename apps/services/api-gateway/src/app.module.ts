// src/app.module.ts
import { AppLogger } from '@dailyshop/shared-utils'
import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { AuthModule } from './auth/auth.module'
import { CourierModule } from './courier/courier.module'
import { OrderModule } from './order/order.module'
import { ProductModule } from './product/product.module'
import { UserModule } from './user/user.module'

@Module({
  imports: [
    // .env dosyasını yükler ve ConfigService’i global olarak kullanılabilir kılar
    ConfigModule.forRoot({ isGlobal: true }),

    // Auth ve User modülleri HTTP endpointlerini ve microservice client bağlantılarını içerir
    AuthModule,
    UserModule,
    ProductModule,
    CourierModule,
    OrderModule
  ],
  providers: [AppLogger]
})
export class AppModule {}
