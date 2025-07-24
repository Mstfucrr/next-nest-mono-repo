import { ValidationPipe } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { NestFactory } from '@nestjs/core'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'
import { AppModule } from './app.module'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  const config = app.get(ConfigService)

  // Global validation
  app.useGlobalPipes(new ValidationPipe({ whitelist: true }))

  const opts = new DocumentBuilder()
    .setTitle('Dailyshop API Gateway')
    .setVersion('1.0')
    .addTag('auth')

    .addTag('user')
    .addBearerAuth()
    .build()

  const doc = SwaggerModule.createDocument(app, opts)
  SwaggerModule.setup('docs', app, doc)

  await app.listen(config.get<number>('PORT') ?? 3000)
}
bootstrap()
