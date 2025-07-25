import { NestFactory } from '@nestjs/core'
import { MicroserviceOptions, Transport } from '@nestjs/microservices'
import { AppModule } from './app.module'
import { AppLogger } from '@dailyshop/shared-utils'

const microserviceOptions: MicroserviceOptions = {
  transport: Transport.TCP,
  options: {
    host: process.env.USER_HOST || '127.0.0.1',
    port: parseInt(process.env.USER_PORT || '4002')
  }
}

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(AppModule, microserviceOptions, {
    bufferLogs: true
  })
  app.useLogger(app.get(AppLogger))
  const logger = app.get(AppLogger)
  logger.log('User service is running on port 4002')
  await app.listen()
}

void bootstrap()
