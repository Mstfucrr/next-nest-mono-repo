// src/gateway/gateway.service.ts
import { AuthResult, UserResult, ValidateTokenResult } from '@dailyshop/shared-types'
import { Inject, Injectable } from '@nestjs/common'
import { ClientProxy } from '@nestjs/microservices'
import { AppLogger } from '@dailyshop/shared-utils'
import { firstValueFrom } from 'rxjs'
import { LoginHttpDto } from './dto/login-http.dto'
import { RegisterHttpDto } from './dto/register-http.dto'

@Injectable()
export class GatewayService {
  constructor(
    @Inject('AUTH_SERVICE') private readonly authClient: ClientProxy, // Auth servisine client
    @Inject('USER_SERVICE') private readonly userClient: ClientProxy, // User servisine client
    private readonly logger: AppLogger
  ) {}

  // Yeni kullanıcı kaydı: önce auth, sonra user servisine event emit
  async register(dto: RegisterHttpDto) {
    this.logger.log(`Register payload: ${JSON.stringify(dto)}`)
    const authResult = await firstValueFrom<AuthResult>(this.authClient.send({ cmd: 'auth-register' }, dto))
    this.logger.log(`Auth service result: ${JSON.stringify(authResult)}`)
    // user servisinde profil oluştur
    const userResult = await firstValueFrom<UserResult>(
      this.userClient.send(
        { cmd: 'user-create' },
        {
          email: authResult.auth.email,
          fullName: authResult.auth.fullName
        }
      )
    )
    this.logger.log(`User service result: ${JSON.stringify(userResult)}`)
    return userResult
  }

  // Giriş isteği: auth servisine yönlendir
  async login(dto: LoginHttpDto) {
    this.logger.log(`Login attempt for ${dto.email}`)
    const result = await firstValueFrom<{ token: string }>(this.authClient.send({ cmd: 'auth-login' }, dto))
    this.logger.log('Login token issued')
    return result
  }

  // Token doğrulama: auth servisine yönlendir
  async validateToken(token: string) {
    this.logger.log('Validating token')
    const result = await firstValueFrom<ValidateTokenResult | null>(
      this.authClient.send({ cmd: 'auth-validate-token' }, token)
    )
    this.logger.log(`Validate result: ${JSON.stringify(result)}`)
    return result
  }
}
