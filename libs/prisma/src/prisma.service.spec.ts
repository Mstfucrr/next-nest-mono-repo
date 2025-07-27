import { AppLogger } from '@dailyshop/shared-utils'
import { Test, TestingModule } from '@nestjs/testing'
import { PrismaService } from './prisma.service'

// Mock the shared-utils module
jest.mock('@dailyshop/shared-utils', () => ({
  AppLogger: jest.fn().mockImplementation(() => ({
    log: jest.fn(),
    warn: jest.fn(),
    error: jest.fn()
  }))
}))

describe('PrismaService', () => {
  let service: PrismaService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
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

    service = module.get<PrismaService>(PrismaService)
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })
})
