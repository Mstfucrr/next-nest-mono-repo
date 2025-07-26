// src/gateway/gateway.controller.ts
import { Body, Controller, Get, HttpCode, Post, Query } from '@nestjs/common'
import { ApiOperation, ApiTags } from '@nestjs/swagger'
import { LoginHttpDto } from './dto/login-http.dto'
import { RegisterHttpDto } from './dto/register-http.dto'
import { GatewayService } from './gateway.service'
import { AppLogger } from '@dailyshop/shared-utils'

@ApiTags('Auth') // Swagger’da grup başlığı
@Controller('auth') // /auth taban route’u
export class GatewayController {
  constructor(
    private readonly gw: GatewayService,
    private readonly logger: AppLogger
  ) {}

  @Post('register')
  @ApiOperation({ summary: 'Yeni kullanıcı kaydı' })
  @HttpCode(201)
  register(@Body() dto: RegisterHttpDto) {
    return this.gw.register(dto) // GatewayService üzerinden işle
  }

  @Post('login')
  @ApiOperation({ summary: 'Kullanıcı girişi (JWT al)' })
  login(@Body() dto: LoginHttpDto): Promise<{ token: string }> {
    return this.gw.login(dto)
  }

  @Get('validate')
  @ApiOperation({ summary: 'Token doğrula' })
  async validate(@Query('token') token: string) {
    const result = await this.gw.validateToken(token)
    this.logger.log(`Validate result: ${JSON.stringify(result)}`)
    return result
  }
}
