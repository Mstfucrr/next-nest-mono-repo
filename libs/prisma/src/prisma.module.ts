import { AppLogger } from '@dailyshop/shared-utils'
import { Global, Module } from '@nestjs/common'
import { PrismaService } from './prisma.service'

@Global()
@Module({
  providers: [PrismaService, AppLogger],
  exports: [PrismaService]
})
export class PrismaModule {}
