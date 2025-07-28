import { AppLogger } from '@dailyshop/shared-utils'
import { Module } from '@nestjs/common'
import { UserController } from './user.controller'
import { UserService } from './user.service'

@Module({
  controllers: [UserController],
  providers: [UserService, AppLogger]
})
export class UserModule {}
