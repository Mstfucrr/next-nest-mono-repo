import { NestFactory } from '@nestjs/core'
import { MicroserviceOptions, Transport } from '@nestjs/microservices'
import { AppModule } from './app.module'

const microserviceOptions: MicroserviceOptions = {
  transport: Transport.TCP,
  options: {
    host: process.env.AUTH_HOST || '127.0.0.1',
    port: parseInt(process.env.AUTH_PORT || '4001')
  }
}

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(AppModule, microserviceOptions)
  console.log('Auth service is running on port 4001')
  await app.listen()
}

void bootstrap()
