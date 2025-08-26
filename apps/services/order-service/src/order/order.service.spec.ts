import { Test, TestingModule } from '@nestjs/testing'
import { AppLogger } from '@dailyshop/shared-utils'
import { ORDER_REPOSITORY } from './repositories/order.repository.interface'
import { OrderService } from './order.service'

describe('OrderService', () => {
  let service: OrderService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        OrderService,
        { provide: ORDER_REPOSITORY, useValue: {} },
        { provide: AppLogger, useValue: { log: jest.fn(), warn: jest.fn() } }
      ]
    }).compile()

    service = module.get<OrderService>(OrderService)
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })
})
