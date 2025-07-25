import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common'
import { AppLogger } from '@dailyshop/shared-utils'
import { PrismaClient } from '@prisma/client'

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit, OnModuleDestroy {
  constructor(private readonly logger: AppLogger) {
    super()
  }

  async onModuleInit() {
    this.logger.log('Connecting to database')
    await this.$connect()
  }

  async onModuleDestroy() {
    this.logger.log('Disconnecting from database')
    await this.$disconnect()
  }
}
