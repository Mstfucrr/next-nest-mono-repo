import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { MicroserviceOptions, Transport } from '@nestjs/microservices'

const microserviceOptions: MicroserviceOptions = {
  transport: Transport.TCP,
  options: {
    host: process.env.USER_HOST || '127.0.0.1',
    port: parseInt(process.env.USER_PORT || '3002')
  }
}

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(AppModule, microserviceOptions)
  await app.listen()
}

void bootstrap()
