import { Module } from '@nestjs/common'
import { AppLogger } from '@dailyshop/shared-utils'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { AuthModule } from './auth/auth.module'

@Module({
  imports: [AuthModule],
  controllers: [AppController],
  providers: [AppService, AppLogger]
})
export class AppModule {}
