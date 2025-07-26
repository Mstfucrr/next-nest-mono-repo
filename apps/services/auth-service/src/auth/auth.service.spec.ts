// src/auth/auth.service.spec.ts
import { AppLogger } from '@dailyshop/shared-utils'
import { JwtService } from '@nestjs/jwt'
import { Test, TestingModule } from '@nestjs/testing'
import * as bcrypt from 'bcrypt'
import { AuthService } from './auth.service'
import { LoginDto } from './dto/login.dto'
import { RegisterDto } from './dto/register.dto'

// Mock the shared-utils module
jest.mock('@dailyshop/shared-utils', () => ({
  AppLogger: jest.fn().mockImplementation(() => ({
    log: jest.fn(),
    warn: jest.fn(),
    error: jest.fn()
  }))
}))

// Mock bcrypt module
jest.mock('bcrypt', () => ({
  hash: jest.fn().mockResolvedValue('hashed-password')
}))

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
        },
        {
          provide: AppLogger,
          useValue: {
            log: jest.fn(),
            warn: jest.fn(),
            error: jest.fn()
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

    const result = await service.register(dto)

    expect(bcrypt.hash).toHaveBeenCalledWith(dto.password, 10)

    expect(result.message).toBe('Auth created')

    expect(result.auth.email).toBe(dto.email)
    expect(result.auth.fullName).toBe(dto.fullName)
    expect(result.auth).not.toHaveProperty('password')
  })

  it('should login and return access token', () => {
    const dto: LoginDto = {
      email: 'test@example.com',
      password: 'password123'
    }

    const signSpy = jest.spyOn(jwtService, 'sign')
    const result = service.login(dto)

    expect(signSpy).toHaveBeenCalledWith({ sub: 'dummy-user-id', email: dto.email })
    expect(result).toEqual({ access_token: 'mocked-jwt-token' })
  })

  it('should validate valid token', () => {
    const verifySpy = jest.spyOn(jwtService, 'verify')
    const result = service.validateToken('valid.token')
    expect(verifySpy).toHaveBeenCalledWith('valid.token')
    expect(result).toHaveProperty('email', 'test@example.com')
  })

  it('should return null on invalid token', () => {
    jest.spyOn(jwtService, 'verify').mockImplementationOnce(() => {
      throw new Error('invalid token')
    })

    const result = service.validateToken('invalid.token')
    expect(result).toBeNull()
  })
})
