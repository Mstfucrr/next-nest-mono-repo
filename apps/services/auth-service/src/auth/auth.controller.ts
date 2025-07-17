import { Controller } from '@nestjs/common'
import { AuthService } from './auth.service'
import { MessagePattern, Payload } from '@nestjs/microservices'
import { LoginDto } from './dto/login.dto'
import { RegisterDto } from './dto/register.dto'

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @MessagePattern({ cmd: 'auth-register' })
  register(@Payload() dto: RegisterDto) {
    return this.authService.register(dto)
  }

  @MessagePattern({ cmd: 'auth-login' })
  login(@Payload() dto: LoginDto) {
    return this.authService.login(dto)
  }

  @MessagePattern({ cmd: 'auth-validate-token' })
  validate(@Payload() token: string) {
    return this.authService.validateToken(token)
  }
}
