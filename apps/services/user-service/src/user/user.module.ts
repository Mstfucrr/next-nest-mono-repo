import { Module } from '@nestjs/common'
import { UsersService } from './user.service'
import { UsersController } from './user.controller'
import { AppLogger } from '@dailyshop/shared-utils'

@Module({
  controllers: [UsersController],
  providers: [UsersService, AppLogger]
})
export class UserModule {}
