import { AppLogger } from '@dailyshop/shared-utils'
import { Test, TestingModule } from '@nestjs/testing'
import { PrismaService } from '../prisma/prisma.service'
import { CreateUserDto } from './dto/create-user.dto'
import { UpdateUserDto } from './dto/update-user.dto'
import { User } from './entities/user.entity'
import { UsersService } from './user.service'

// Mock the shared-utils module
jest.mock('@dailyshop/shared-utils', () => ({
  AppLogger: jest.fn().mockImplementation(() => ({
    log: jest.fn(),
    warn: jest.fn(),
    error: jest.fn()
  }))
}))

describe('UsersService', () => {
  let service: UsersService

  const mockUser: User = {
    id: '1',
    email: 'test@example.com',
    fullName: 'Test User',
    createdAt: new Date(),
    updatedAt: new Date()
  }

  const mockCreateUserDto: CreateUserDto = {
    email: 'test@example.com',
    fullName: 'Test User'
  }

  const mockUpdateUserDto: UpdateUserDto = {
    email: 'updated@example.com',
    fullName: 'Updated User'
  }

  const mockPrismaService = {
    user: {
      create: jest.fn(),
      findMany: jest.fn(),
      findUnique: jest.fn(),
      update: jest.fn(),
      delete: jest.fn()
    }
  }

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: PrismaService,
          useValue: mockPrismaService
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

    service = module.get<UsersService>(UsersService)
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })

  describe('create', () => {
    it('should create a new user successfully', async () => {
      mockPrismaService.user.create.mockResolvedValue(mockUser)

      const result = await service.create(mockCreateUserDto)

      expect(mockPrismaService.user.create).toHaveBeenCalledWith({
        data: mockCreateUserDto
      })
      expect(result).toEqual({ message: 'User created', user: mockUser })
    })

    it('should throw an error when user creation fails', async () => {
      const error = new Error('Database error')
      mockPrismaService.user.create.mockRejectedValue(error)

      await expect(service.create(mockCreateUserDto)).rejects.toThrow('Database error')
      expect(mockPrismaService.user.create).toHaveBeenCalledWith({
        data: mockCreateUserDto
      })
    })
  })

  describe('findAll', () => {
    it('should return all users', async () => {
      const mockUsers = [mockUser, { ...mockUser, id: '2', email: 'test2@example.com' }]
      mockPrismaService.user.findMany.mockResolvedValue(mockUsers)

      const result = await service.findAll()

      expect(mockPrismaService.user.findMany).toHaveBeenCalled()
      expect(result).toEqual(mockUsers)
    })

    it('should return empty array when no users exist', async () => {
      mockPrismaService.user.findMany.mockResolvedValue([])

      const result = await service.findAll()

      expect(mockPrismaService.user.findMany).toHaveBeenCalled()
      expect(result).toEqual([])
    })

    it('should throw an error when database query fails', async () => {
      const error = new Error('Database error')
      mockPrismaService.user.findMany.mockRejectedValue(error)

      await expect(service.findAll()).rejects.toThrow('Database error')
      expect(mockPrismaService.user.findMany).toHaveBeenCalled()
    })
  })

  describe('findOne', () => {
    it('should return a user when found', async () => {
      mockPrismaService.user.findUnique.mockResolvedValue(mockUser)

      const result = await service.findOne('1')

      expect(mockPrismaService.user.findUnique).toHaveBeenCalledWith({
        where: { id: '1' }
      })
      expect(result).toEqual(mockUser)
    })

    it('should return null when user not found', async () => {
      mockPrismaService.user.findUnique.mockResolvedValue(null)

      const result = await service.findOne('999')

      expect(mockPrismaService.user.findUnique).toHaveBeenCalledWith({
        where: { id: '999' }
      })
      expect(result).toBeNull()
    })

    it('should throw an error when database query fails', async () => {
      const error = new Error('Database error')
      mockPrismaService.user.findUnique.mockRejectedValue(error)

      await expect(service.findOne('1')).rejects.toThrow('Database error')
      expect(mockPrismaService.user.findUnique).toHaveBeenCalledWith({
        where: { id: '1' }
      })
    })
  })

  describe('update', () => {
    it('should update a user successfully', async () => {
      const updatedUser = { ...mockUser, ...mockUpdateUserDto }
      mockPrismaService.user.update.mockResolvedValue(updatedUser)

      const result = await service.update('1', mockUpdateUserDto)

      expect(mockPrismaService.user.update).toHaveBeenCalledWith({
        where: { id: '1' },
        data: mockUpdateUserDto
      })
      expect(result).toEqual(updatedUser)
    })

    it('should return null when user not found for update', async () => {
      mockPrismaService.user.update.mockRejectedValue(new Error('Record not found'))

      await expect(service.update('999', mockUpdateUserDto)).rejects.toThrow('Record not found')
      expect(mockPrismaService.user.update).toHaveBeenCalledWith({
        where: { id: '999' },
        data: mockUpdateUserDto
      })
    })

    it('should throw an error when database update fails', async () => {
      const error = new Error('Database error')
      mockPrismaService.user.update.mockRejectedValue(error)

      await expect(service.update('1', mockUpdateUserDto)).rejects.toThrow('Database error')
      expect(mockPrismaService.user.update).toHaveBeenCalledWith({
        where: { id: '1' },
        data: mockUpdateUserDto
      })
    })
  })

  describe('remove', () => {
    it('should delete a user successfully and return true', async () => {
      mockPrismaService.user.delete.mockResolvedValue(mockUser)

      const result = await service.remove('1')

      expect(mockPrismaService.user.delete).toHaveBeenCalledWith({
        where: { id: '1' }
      })
      expect(result).toBe(true)
    })

    it('should return false when user not found for deletion', async () => {
      mockPrismaService.user.delete.mockRejectedValue(new Error('Record not found'))

      await expect(service.remove('999')).rejects.toThrow('Record not found')
      expect(mockPrismaService.user.delete).toHaveBeenCalledWith({
        where: { id: '999' }
      })
    })

    it('should throw an error when database deletion fails', async () => {
      const error = new Error('Database error')
      mockPrismaService.user.delete.mockRejectedValue(error)

      await expect(service.remove('1')).rejects.toThrow('Database error')
      expect(mockPrismaService.user.delete).toHaveBeenCalledWith({
        where: { id: '1' }
      })
    })
  })
})
