import { AppLogger } from '@dailyshop/shared-utils'
import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { ProductModule } from './product/product.module'

@Module({
  imports: [ProductModule],
  controllers: [AppController],
  providers: [AppService, AppLogger]
})
export class AppModule {}
