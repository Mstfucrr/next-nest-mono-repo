import { AppLogger } from '@dailyshop/shared-utils'
import { Test, TestingModule } from '@nestjs/testing'
import { PrismaService } from '../prisma/prisma.service'
import { CourierService } from './courier.service'

jest.mock('@dailyshop/shared-utils', () => ({
  AppLogger: jest.fn().mockImplementation(() => ({
    log: jest.fn(),
    warn: jest.fn(),
    error: jest.fn()
  }))
}))

describe('CourierService', () => {
  let service: CourierService

  const mockPrismaService = {
    courier: {
      findMany: jest.fn(),
      findUnique: jest.fn(),
      update: jest.fn()
    }
  }

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CourierService,
        { provide: PrismaService, useValue: mockPrismaService },
        {
          provide: AppLogger,
          useValue: { log: jest.fn(), warn: jest.fn(), error: jest.fn() }
        }
      ]
    }).compile()

    service = module.get<CourierService>(CourierService)
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })
})
