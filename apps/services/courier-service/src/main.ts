import { AppLogger } from '@dailyshop/shared-utils'
import { NestFactory } from '@nestjs/core'
import { MicroserviceOptions, Transport } from '@nestjs/microservices'
import { AppModule } from './app.module'

const microserviceOptions: MicroserviceOptions = {
  transport: Transport.TCP,
  options: {
    host: process.env.COURIER_HOST || '127.0.0.1',
    port: parseInt(process.env.COURIER_PORT || '4004')
  }
}

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(AppModule, {
    ...microserviceOptions,
    bufferLogs: true
  })
  const logger = await app.resolve(AppLogger)
  app.useLogger(logger)
  logger.log('Courier service is running on port 4004')
  await app.listen()
}

void bootstrap()
