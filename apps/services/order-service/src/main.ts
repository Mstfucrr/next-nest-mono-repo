import { AppLogger } from '@dailyshop/shared-utils'
import { NestFactory } from '@nestjs/core'
import { MicroserviceOptions, Transport } from '@nestjs/microservices'
import { AppModule } from './app.module'

const microserviceOptions: MicroserviceOptions = {
  transport: Transport.TCP,
  options: {
    host: process.env.ORDER_HOST || '127.0.0.1',
    port: parseInt(process.env.ORDER_PORT || '4005')
  }
}

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(AppModule, {
    ...microserviceOptions,
    bufferLogs: true
  })
  const logger = await app.resolve(AppLogger)
  app.useLogger(logger)
  logger.log('Order service is running on port 4005')
  await app.listen()
}

void bootstrap()
