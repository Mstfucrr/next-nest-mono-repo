import { AppLogger } from '@dailyshop/shared-utils'
import { Test, TestingModule } from '@nestjs/testing'
import { PrismaService } from '../prisma/prisma.service'
import { UsersController } from './user.controller'
import { UsersService } from './user.service'

// Mock the shared-utils module
jest.mock('@dailyshop/shared-utils', () => ({
  AppLogger: jest.fn().mockImplementation(() => ({
    log: jest.fn(),
    warn: jest.fn(),
    error: jest.fn()
  }))
}))

describe('UsersController', () => {
  let controller: UsersController

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [
        UsersService,
        PrismaService,
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

    controller = module.get<UsersController>(UsersController)
  })

  it('should be defined', () => {
    expect(controller).toBeDefined()
  })
})
