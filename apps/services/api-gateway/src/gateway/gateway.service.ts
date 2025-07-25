// src/gateway/gateway.service.ts
import { AuthResult, UserResult } from '@dailyshop/shared-types'
import { Inject, Injectable } from '@nestjs/common'
import { ClientProxy } from '@nestjs/microservices'
import { firstValueFrom } from 'rxjs'
import { LoginHttpDto } from './dto/login-http.dto'
import { RegisterHttpDto } from './dto/register-http.dto'

@Injectable()
export class GatewayService {
  constructor(
    @Inject('AUTH_SERVICE') private readonly authClient: ClientProxy, // Auth servisine client
    @Inject('USER_SERVICE') private readonly userClient: ClientProxy // User servisine client
  ) {}

  // Yeni kullanıcı kaydı: önce auth, sonra user servisine event emit
  async register(dto: RegisterHttpDto) {
    // auth servisinde kayıt
    const authResult = await firstValueFrom<AuthResult>(this.authClient.send({ cmd: 'auth-register' }, dto))
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

    return userResult
  }

  // Giriş isteği: auth servisine yönlendir
  async login(dto: LoginHttpDto) {
    return await firstValueFrom<{ token: string }>(this.authClient.send({ cmd: 'auth-login' }, dto))
  }

  // Token doğrulama: auth servisine yönlendir
  async validateToken(token: string) {
    return await firstValueFrom<{ isValid: boolean }>(this.authClient.send({ cmd: 'auth-validate-token' }, token))
  }
}
