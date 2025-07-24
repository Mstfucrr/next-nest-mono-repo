// src/main.ts
import { ValidationPipe } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { NestFactory } from '@nestjs/core'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'
import { AppModule } from './app.module'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)

  // Global ValidationPipe: gelen tüm isteklere DTO validasyonu uygular
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true
    })
  )

  // Swagger kurulum
  const config = new DocumentBuilder()
    .setTitle('Dailyshop API Gateway')
    .setDescription('Gateway üzerinden mikroservislere yönlendirme')
    .setVersion('1.0')
    .build()
  const document = SwaggerModule.createDocument(app, config)
  SwaggerModule.setup('api', app, document) // http://localhost:4000/api

  console.log('API Gateway is running on port 4000')
  console.log('You can access the API Gateway at http://localhost:4000/api')

  // ConfigService: .env dosyasındaki değerlere erişim
  const configService = app.get(ConfigService)
  const port = configService.get<number>('PORT') || 4000
  await app.listen(port) // HTTP dinlemeye başla
}
bootstrap()
