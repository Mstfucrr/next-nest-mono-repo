import { AppLogger } from '@dailyshop/shared-utils'
import { Test, TestingModule } from '@nestjs/testing'
import { PrismaService } from '../prisma/prisma.service'
import { CourierController } from './courier.controller'
import { CourierService } from './courier.service'

jest.mock('@dailyshop/shared-utils', () => ({
  AppLogger: jest.fn().mockImplementation(() => ({
    log: jest.fn(),
    warn: jest.fn(),
    error: jest.fn()
  }))
}))

describe('CourierController', () => {
  let controller: CourierController

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CourierController],
      providers: [
        CourierService,
        PrismaService,
        {
          provide: AppLogger,
          useValue: { log: jest.fn(), warn: jest.fn(), error: jest.fn() }
        }
      ]
    }).compile()

    controller = module.get<CourierController>(CourierController)
  })

  it('should be defined', () => {
    expect(controller).toBeDefined()
  })
})
