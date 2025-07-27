import { AuthResult, LoginPayload, RegisterPayload, ValidateTokenResult } from '@dailyshop/shared-types'
import { AppLogger } from '@dailyshop/shared-utils'
import { Injectable } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import * as bcrypt from 'bcrypt'
import * as crypto from 'crypto'
import { Auth } from './entities/auth.entity'

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly logger: AppLogger
  ) {}

  async register(dto: RegisterPayload): Promise<AuthResult> {
    this.logger.log(`Registering user: ${dto.email}`)
    const hashedPassword = await bcrypt.hash(dto.password, 10)

    const user: Auth = {
      id: crypto.randomUUID(),
      email: dto.email,
      password: hashedPassword,
      fullName: dto.fullName
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password: _password, ...safeUser } = user
    this.logger.log('Auth created')
    return {
      message: 'Auth created',
      auth: safeUser
    }
  }

  login(dto: LoginPayload): { access_token: string } {
    this.logger.log(`Login attempt: ${dto.email}`)
    const payload = { sub: 'dummy-user-id', email: dto.email }
    const token = this.jwtService.sign(payload)
    this.logger.log('Token generated')
    return { access_token: token }
  }

  validateToken(token: string): ValidateTokenResult | null {
    try {
      this.logger.log('Token verification')
      const result = this.jwtService.verify<ValidateTokenResult>(token)
      this.logger.log(`Token valid for user ${result.sub}`)
      return result
    } catch {
      this.logger.warn('Invalid token')
      return null
    }
  }
}
