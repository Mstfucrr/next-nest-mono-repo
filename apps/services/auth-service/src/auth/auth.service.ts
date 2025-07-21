import { Injectable } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { RegisterDto } from './dto/register.dto'
import { LoginDto } from './dto/login.dto'
import { Auth } from './entities/auth.entity'
import * as bcrypt from 'bcrypt'

@Injectable()
export class AuthService {
  constructor(private readonly jwtService: JwtService) {}

  async register(dto: RegisterDto): Promise<{ message: string; auth: Omit<Auth, 'password'> }> {
    const hashedPassword = await bcrypt.hash(dto.password, 10)

    const user: Auth = {
      id: crypto.randomUUID(),
      email: dto.email,
      password: hashedPassword,
      fullName: dto.fullName
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password: _password, ...safeUser } = user
    return {
      message: 'User registered',
      auth: safeUser
    }
  }

  login(dto: LoginDto): { access_token: string } {
    const payload = { sub: 'dummy-user-id', email: dto.email }
    const token = this.jwtService.sign(payload)
    return { access_token: token }
  }

  validateToken(token: string): Record<string, unknown> | null {
    try {
      return this.jwtService.verify(token) as Record<string, unknown> | null
    } catch {
      return null
    }
  }
}
