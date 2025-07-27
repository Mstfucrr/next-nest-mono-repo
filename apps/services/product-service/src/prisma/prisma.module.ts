import { Global, Module } from '@nestjs/common'
import { PrismaService } from './prisma.service'
import { AppLogger } from '@dailyshop/shared-utils'

@Global()
@Module({
  providers: [PrismaService, AppLogger],
  exports: [PrismaService]
})
export class PrismaModule {}
