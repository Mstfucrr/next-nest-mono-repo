// src/auth/auth.service.spec.ts
import { Test, TestingModule } from '@nestjs/testing'
import { AuthService } from './auth.service'
import { JwtService } from '@nestjs/jwt'
import * as bcrypt from 'bcrypt'
import { RegisterDto } from './dto/register.dto'
import { LoginDto } from './dto/login.dto'

describe('AuthService', () => {
  let service: AuthService
  let jwtService: JwtService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: JwtService,
          useValue: {
            sign: jest.fn().mockReturnValue('mocked-jwt-token'),
            verify: jest.fn().mockReturnValue({ sub: 'user-id', email: 'test@example.com' })
          }
        }
      ]
    }).compile()

    service = module.get<AuthService>(AuthService)
    jwtService = module.get<JwtService>(JwtService)
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })

  it('should register a user and emit to user-service', async () => {
    const dto: RegisterDto = {
      email: 'test@example.com',
      password: 'password123',
      fullName: 'Test User'
    }

    const hashSpy = jest.spyOn(bcrypt, 'hash').mockResolvedValue('hashed-password' as never)

    const result = await service.register(dto)

    expect(hashSpy).toHaveBeenCalledWith(dto.password, 10)

    expect(result.message).toBe('User registered')

    expect(result.auth.email).toBe(dto.email)
    expect(result.auth.fullName).toBe(dto.fullName)
    expect(result.auth).not.toHaveProperty('password')
  })

  it('should login and return access token', async () => {
    const dto: LoginDto = {
      email: 'test@example.com',
      password: 'password123'
    }

    const signSpy = jest.spyOn(jwtService, 'sign')
    const result = await service.login(dto)

    expect(signSpy).toHaveBeenCalledWith({ sub: 'dummy-user-id', email: dto.email })
    expect(result).toEqual({ access_token: 'mocked-jwt-token' })
  })

  it('should validate valid token', async () => {
    const verifySpy = jest.spyOn(jwtService, 'verify')
    const result = await service.validateToken('valid.token')
    expect(verifySpy).toHaveBeenCalledWith('valid.token')
    expect(result).toHaveProperty('email', 'test@example.com')
  })

  it('should return null on invalid token', async () => {
    jest.spyOn(jwtService, 'verify').mockImplementationOnce(() => {
      throw new Error('invalid token')
    })

    const result = await service.validateToken('invalid.token')
    expect(result).toBeNull()
  })
})
