import { AppLogger } from '@dailyshop/shared-utils'
import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { PrismaModule, PrismaService } from '@dailyshop/prisma'
import { ProductModule } from './product/product.module'

@Module({
  imports: [ProductModule, PrismaModule],
  controllers: [AppController],
  providers: [AppService, PrismaService, AppLogger]
})
export class AppModule {}
