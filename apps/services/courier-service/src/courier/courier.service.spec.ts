import { CourierEntity } from '@dailyshop/shared-types'
import { AppLogger } from '@dailyshop/shared-utils'
import { Test, TestingModule } from '@nestjs/testing'
import { CourierService } from './courier.service'
import { COURIER_REPOSITORY, ICourierRepository } from './repositories/courier.repository.interface'

jest.mock('@dailyshop/shared-utils', () => ({
  AppLogger: jest.fn().mockImplementation(() => ({
    log: jest.fn(),
    warn: jest.fn(),
    error: jest.fn()
  }))
}))

describe('CourierService', () => {
  let service: CourierService
  let mockRepository: jest.Mocked<ICourierRepository>

  const mockCourier: CourierEntity = {
    id: '1',
    externalId: 'ext-1',
    accountId: 'acc-1',
    isWorking: true,
    updatedAt: new Date(),
    tckn: '12345678901',
    createdAt: new Date(),
    phone: '+905551234567',
    name: 'Test Courier',
    iv: 1,
    state: 'active',
    DeliverPrepaidOrder: false,
    restaurantId: null,
    eteration_device_brand: null,
    isWorkingFlag: true,
    posDeviceType: null,
    onlineReasonId: null,
    carrierType: 1,
    countyId: null,
    licensePlate: null,
    otherGsm: null,
    posDeviceId: null,
    hubId: null,
    address: null,
    reasonId: null,
    eteration_device_token: null,
    carrierBillingType: null,
    imei: null,
    iban: null,
    mail: null,
    taxAreaCode: null,
    vkn: null,
    isTest: false,
    eteration_imei_updated: false
  }

  beforeEach(async () => {
    mockRepository = {
      findAll: jest.fn(),
      findOne: jest.fn(),
      create: jest.fn(),
      createMany: jest.fn(),
      update: jest.fn(),
      findAllWithPagination: jest.fn(),
      findByState: jest.fn(),
      findByCarrierType: jest.fn(),
      findWorkingCouriers: jest.fn(),
      delete: jest.fn()
    }

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CourierService,
        { provide: COURIER_REPOSITORY, useValue: mockRepository },
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

  it('should call repository findAll method', async (): Promise<void> => {
    const mockCouriers = [mockCourier]
    mockRepository.findAll.mockResolvedValue(mockCouriers)

    const result = await service.findAll()

    expect(mockRepository.findAll).toHaveBeenCalled() // eslint-disable-line @typescript-eslint/unbound-method
    expect(result).toEqual(mockCouriers)
  })
})
