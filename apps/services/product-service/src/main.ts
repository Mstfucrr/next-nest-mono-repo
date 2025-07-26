import { AppLogger } from '@dailyshop/shared-utils'
import { NestFactory } from '@nestjs/core'
import { MicroserviceOptions, Transport } from '@nestjs/microservices'
import { AppModule } from './app.module'

const microserviceOptions: MicroserviceOptions = {
  transport: Transport.TCP,
  options: {
    host: process.env.PRODUCT_HOST || '127.0.0.1',
    port: parseInt(process.env.PRODUCT_PORT || '4003')
  }
}

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(AppModule, {
    ...microserviceOptions,
    bufferLogs: true
  })
  const logger = await app.resolve(AppLogger)
  app.useLogger(logger)
  logger.log('Product service is running on port 4003')
  await app.listen()
}

void bootstrap()
