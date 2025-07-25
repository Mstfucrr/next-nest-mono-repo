import { AppLogger } from '@dailyshop/shared-utils'
import { NestFactory } from '@nestjs/core'
import { MicroserviceOptions, Transport } from '@nestjs/microservices'
import { AppModule } from './app.module'

const microserviceOptions: MicroserviceOptions = {
  transport: Transport.TCP,
  options: {
    host: process.env.USER_HOST || '127.0.0.1',
    port: parseInt(process.env.USER_PORT || '4002')
  }
}

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(AppModule, {
    ...microserviceOptions,
    bufferLogs: true
  })
  const logger = await app.resolve(AppLogger)
  app.useLogger(logger)
  logger.log('User service is running on port 4002')
  await app.listen()
}

void bootstrap()
