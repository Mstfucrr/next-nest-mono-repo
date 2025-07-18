import { Module } from '@nestjs/common'
import { AuthService } from './auth.service'
import { AuthController } from './auth.controller'
import { JwtModule } from '@nestjs/jwt'
import { ConfigModule, ConfigService } from '@nestjs/config'

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }), // Bu modülün global olarak kullanılmasını sağlar
    JwtModule.registerAsync({
      // JWT konfigürasyonu
      useFactory: (config: ConfigService) => ({
        // JWT_SECRET ve JWT_EXPIRES_IN değerlerini alır ve JwtModule'a gönderir
        secret: config.get<string>('JWT_SECRET'), // JWT_SECRET değerini alır
        signOptions: { expiresIn: config.get<string>('JWT_EXPIRES_IN') } // JWT_EXPIRES_IN değerini alır
      }),
      inject: [ConfigService] // Burada ConfigService'i inject ediyoruz. inject: [ConfigService] ile ConfigService'i kullanabiliriz.
    })
  ],
  controllers: [AuthController], // Auth controller
  providers: [AuthService] // Auth service
})
export class AuthModule {}
