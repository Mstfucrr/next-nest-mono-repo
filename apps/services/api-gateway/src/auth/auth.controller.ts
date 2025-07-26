import { Body, Controller, Get, HttpCode, Post, Query } from '@nestjs/common'
import { ApiOperation, ApiTags } from '@nestjs/swagger'
import { AuthService } from './auth.service'
import { LoginHttpDto } from './dto/login-http.dto'
import { RegisterHttpDto } from './dto/register-http.dto'
import { AppLogger } from '@dailyshop/shared-utils'

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(
    private readonly service: AuthService,
    private readonly logger: AppLogger
  ) {}

  @Post('register')
  @ApiOperation({ summary: 'Yeni kullanıcı oluştur ve giriş için kayıt ol' })
  @HttpCode(201)
  register(@Body() dto: RegisterHttpDto) {
    return this.service.register(dto)
  }

  @Post('login')
  @ApiOperation({ summary: 'Kullanıcı girişi (JWT al)' })
  login(@Body() dto: LoginHttpDto) {
    return this.service.login(dto)
  }

  @Get('validate')
  @ApiOperation({ summary: 'JWT token doğrulaması yap' })
  async validate(@Query('token') token: string) {
    const result = await this.service.validateToken(token)
    this.logger.log(`Validate result: ${JSON.stringify(result)}`)
    return result
  }
}
