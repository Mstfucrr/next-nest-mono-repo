import { Inject, Injectable } from '@nestjs/common'
import { ClientProxy } from '@nestjs/microservices'
import { firstValueFrom } from 'rxjs'
import { AuthResult, UserResult, ValidateTokenResult } from '@dailyshop/shared-types'
import { AppLogger } from '@dailyshop/shared-utils'
import { LoginHttpDto } from './dto/login-http.dto'
import { RegisterHttpDto } from './dto/register-http.dto'

@Injectable()
export class AuthService {
  constructor(
    @Inject('AUTH_SERVICE') private readonly authClient: ClientProxy,
    @Inject('USER_SERVICE') private readonly userClient: ClientProxy,
    private readonly logger: AppLogger
  ) {}

  async register(dto: RegisterHttpDto) {
    this.logger.log(`Register payload: ${JSON.stringify(dto)}`)
    const authResult = await firstValueFrom<AuthResult>(
      this.authClient.send({ cmd: 'auth-register' }, dto)
    )
    this.logger.log(`Auth service result: ${JSON.stringify(authResult)}`)
    const userResult = await firstValueFrom<UserResult>(
      this.userClient.send(
        { cmd: 'user-create' },
        { email: authResult.auth.email, fullName: authResult.auth.fullName }
      )
    )
    this.logger.log(`User service result: ${JSON.stringify(userResult)}`)
    return userResult
  }

  async login(dto: LoginHttpDto) {
    this.logger.log(`Login attempt for ${dto.email}`)
    const result = await firstValueFrom<{ token: string }>(
      this.authClient.send({ cmd: 'auth-login' }, dto)
    )
    this.logger.log('Login token issued')
    return result
  }

  async validateToken(token: string) {
    this.logger.log('Validating token')
    const result = await firstValueFrom<ValidateTokenResult | null>(
      this.authClient.send({ cmd: 'auth-validate-token' }, token)
    )
    this.logger.log(`Validate result: ${JSON.stringify(result)}`)
    return result
  }
}
