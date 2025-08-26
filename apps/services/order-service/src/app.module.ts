import { AppLogger } from '@dailyshop/shared-utils'
import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { PrismaModule } from './prisma/prisma.module'
import { PrismaService } from './prisma/prisma.service'
import { OrderModule } from './order/order.module'

@Module({
  imports: [OrderModule, PrismaModule],
  controllers: [AppController],
  providers: [AppService, PrismaService, AppLogger]
})
export class AppModule {}
