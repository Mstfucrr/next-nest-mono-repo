import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'

async function bootstrap() {
  console.log('🚀 Starting API application...')

  const app = await NestFactory.create(AppModule)

  const port = 4000
  await app.listen(port)

  console.log(`✅ API Application started successfully!`)
  console.log(`📡 Server running on: http://localhost:${port}`)
}

bootstrap()
