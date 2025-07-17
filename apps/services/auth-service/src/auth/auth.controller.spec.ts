import { Test, TestingModule } from '@nestjs/testing'
import { AuthController } from './auth.controller'
import { AuthService } from './auth.service'
import { RegisterDto } from './dto/register.dto'
import { LoginDto } from './dto/login.dto'

describe('AuthController', () => {
  let controller: AuthController
  let authService: AuthService

  const mockAuthService = {
    register: jest.fn(),
    login: jest.fn(),
    validateToken: jest.fn()
  }

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        {
          provide: AuthService,
          useValue: mockAuthService
        }
      ]
    }).compile()

    controller = module.get<AuthController>(AuthController)
    authService = module.get<AuthService>(AuthService)
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  describe('register', () => {
    it('should register a new user successfully', async () => {
      const registerDto: RegisterDto = {
        email: 'test@example.com',
        password: 'password123',
        fullName: 'Test User'
      }

      const expectedResult = {
        message: 'User registered',
        user: {
          id: 'test-uuid',
          email: 'test@example.com',
          fullName: 'Test User'
        }
      }

      mockAuthService.register.mockResolvedValue(expectedResult)

      const result = await controller.register(registerDto)

      const registerSpy = jest.spyOn(authService, 'register')
      expect(registerSpy).toHaveBeenCalledWith(registerDto)
      expect(result).toEqual(expectedResult)
    })

    it('should handle registration error', async () => {
      const registerDto: RegisterDto = {
        email: 'test@example.com',
        password: 'password123',
        fullName: 'Test User'
      }

      const error = new Error('Registration failed')
      mockAuthService.register.mockRejectedValue(error)

      await expect(controller.register(registerDto)).rejects.toThrow('Registration failed')
      const registerSpy = jest.spyOn(authService, 'register')
      expect(registerSpy).toHaveBeenCalledWith(registerDto)
    })

    it('should handle invalid register data', async () => {
      const invalidRegisterDto = {
        email: 'invalid-email',
        password: '123',
        fullName: ''
      } as RegisterDto

      const error = new Error('Validation failed')
      mockAuthService.register.mockRejectedValue(error)

      await expect(controller.register(invalidRegisterDto)).rejects.toThrow('Validation failed')
      const registerSpy = jest.spyOn(authService, 'register')
      expect(registerSpy).toHaveBeenCalledWith(invalidRegisterDto)
    })
  })

  describe('login', () => {
    it('should login user successfully', () => {
      const loginDto: LoginDto = {
        email: 'test@example.com',
        password: 'password123'
      }

      const expectedResult = {
        access_token: 'mock-jwt-token'
      }

      mockAuthService.login.mockReturnValue(expectedResult)

      const result = controller.login(loginDto)

      const loginSpy = jest.spyOn(authService, 'login')
      expect(loginSpy).toHaveBeenCalledWith(loginDto)
      expect(result).toEqual(expectedResult)
    })

    it('should handle login error', () => {
      const loginDto: LoginDto = {
        email: 'test@example.com',
        password: 'password123'
      }

      const error = new Error('Login failed')
      mockAuthService.login.mockImplementation(() => {
        throw error
      })

      expect(() => controller.login(loginDto)).toThrow('Login failed')
      const loginSpy = jest.spyOn(authService, 'login')
      expect(loginSpy).toHaveBeenCalledWith(loginDto)
    })

    it('should handle invalid login data', () => {
      const invalidLoginDto = {
        email: 'invalid-email',
        password: ''
      } as LoginDto

      const error = new Error('Invalid credentials')
      mockAuthService.login.mockImplementation(() => {
        throw error
      })

      expect(() => controller.login(invalidLoginDto)).toThrow('Invalid credentials')
      const loginSpy = jest.spyOn(authService, 'login')
      expect(loginSpy).toHaveBeenCalledWith(invalidLoginDto)
    })
  })

  describe('validate', () => {
    it('should validate token successfully', () => {
      const token = 'valid-jwt-token'
      const expectedResult = {
        sub: 'user-id',
        email: 'test@example.com',
        iat: 1234567890
      }

      mockAuthService.validateToken.mockReturnValue(expectedResult)

      const result = controller.validate(token)

      const validateTokenSpy = jest.spyOn(authService, 'validateToken')
      expect(validateTokenSpy).toHaveBeenCalledWith(token)
      expect(result).toEqual(expectedResult)
    })

    it('should return null for invalid token', () => {
      const token = 'invalid-jwt-token'

      mockAuthService.validateToken.mockReturnValue(null)

      const result = controller.validate(token)

      const validateTokenSpy = jest.spyOn(authService, 'validateToken')
      expect(validateTokenSpy).toHaveBeenCalledWith(token)
      expect(result).toBeNull()
    })

    it('should handle token validation error', () => {
      const token = 'malformed-token'

      const error = new Error('Token validation error')
      mockAuthService.validateToken.mockImplementation(() => {
        throw error
      })

      expect(() => controller.validate(token)).toThrow('Token validation error')
      const validateTokenSpy = jest.spyOn(authService, 'validateToken')
      expect(validateTokenSpy).toHaveBeenCalledWith(token)
    })

    it('should handle empty token', () => {
      const token = ''

      mockAuthService.validateToken.mockReturnValue(null)

      const result = controller.validate(token)

      const validateTokenSpy = jest.spyOn(authService, 'validateToken')
      expect(validateTokenSpy).toHaveBeenCalledWith(token)
      expect(result).toBeNull()
    })

    it('should handle null token', () => {
      const token = null as unknown as string

      mockAuthService.validateToken.mockReturnValue(null)

      const result = controller.validate(token)

      const validateTokenSpy = jest.spyOn(authService, 'validateToken')
      expect(validateTokenSpy).toHaveBeenCalledWith(token)
      expect(result).toBeNull()
    })
  })

  describe('message pattern handling', () => {
    it('should handle auth-register message pattern', async () => {
      const registerDto: RegisterDto = {
        email: 'test@example.com',
        password: 'password123',
        fullName: 'Test User'
      }

      const expectedResult = {
        message: 'User registered',
        user: {
          id: 'test-uuid',
          email: 'test@example.com',
          fullName: 'Test User'
        }
      }

      mockAuthService.register.mockResolvedValue(expectedResult)

      const result = await controller.register(registerDto)

      expect(result).toEqual(expectedResult)
    })

    it('should handle auth-login message pattern', () => {
      const loginDto: LoginDto = {
        email: 'test@example.com',
        password: 'password123'
      }

      const expectedResult = {
        access_token: 'mock-jwt-token'
      }

      mockAuthService.login.mockReturnValue(expectedResult)

      const result = controller.login(loginDto)

      expect(result).toEqual(expectedResult)
    })

    it('should handle auth-validate-token message pattern', () => {
      const token = 'valid-jwt-token'
      const expectedResult = {
        sub: 'user-id',
        email: 'test@example.com'
      }

      mockAuthService.validateToken.mockReturnValue(expectedResult)

      const result = controller.validate(token)

      expect(result).toEqual(expectedResult)
    })
  })
})
