import { ProductEntity } from '@dailyshop/shared-types'
import { AppLogger } from '@dailyshop/shared-utils'
import { Test, TestingModule } from '@nestjs/testing'
import { CreateProductDto } from './dto/create-product.dto'
import { UpdateProductDto } from './dto/update-product.dto'
import { ProductController } from './product.controller'
import { ProductService } from './product.service'

// Mock the shared-utils module
jest.mock('@dailyshop/shared-utils', () => ({
  AppLogger: jest.fn().mockImplementation(() => ({
    log: jest.fn(),
    warn: jest.fn(),
    error: jest.fn()
  }))
}))

describe('ProductController', () => {
  let controller: ProductController

  const mockProduct: ProductEntity = {
    id: '1',
    name: 'Test Product',
    description: 'Test Description',
    price: 99.99,
    createdAt: new Date(),
    updatedAt: new Date()
  }

  const mockCreateProductDto: CreateProductDto = {
    name: 'Test Product',
    description: 'Test Description',
    price: 99.99
  }

  const mockUpdateProductDto: UpdateProductDto = {
    name: 'Updated Product',
    description: 'Updated Description',
    price: 149.99
  }

  const mockProductService = {
    create: jest.fn(),
    findAll: jest.fn(),
    findOne: jest.fn(),
    update: jest.fn(),
    remove: jest.fn()
  }

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProductController],
      providers: [
        {
          provide: ProductService,
          useValue: mockProductService
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

    controller = module.get<ProductController>(ProductController)
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  it('should be defined', () => {
    expect(controller).toBeDefined()
  })

  describe('create', () => {
    it('should create a product successfully', async () => {
      const expectedResult = { message: 'Product created', product: mockProduct }
      mockProductService.create.mockResolvedValue(expectedResult)

      const result = await controller.create(mockCreateProductDto)

      expect(mockProductService.create).toHaveBeenCalledWith(mockCreateProductDto)
      expect(result).toEqual(expectedResult)
    })

    it('should handle errors during product creation', async () => {
      const error = new Error('Creation failed')
      mockProductService.create.mockRejectedValue(error)

      await expect(controller.create(mockCreateProductDto)).rejects.toThrow('Creation failed')
      expect(mockProductService.create).toHaveBeenCalledWith(mockCreateProductDto)
    })
  })

  describe('findAll', () => {
    it('should return all products', async () => {
      const mockProducts = [mockProduct, { ...mockProduct, id: '2', name: 'Test Product 2' }]
      mockProductService.findAll.mockResolvedValue(mockProducts)

      const result = await controller.findAll()

      expect(mockProductService.findAll).toHaveBeenCalled()
      expect(result).toEqual(mockProducts)
    })

    it('should return empty array when no products exist', async () => {
      mockProductService.findAll.mockResolvedValue([])

      const result = await controller.findAll()

      expect(mockProductService.findAll).toHaveBeenCalled()
      expect(result).toEqual([])
    })

    it('should handle errors when fetching products', async () => {
      const error = new Error('Fetch failed')
      mockProductService.findAll.mockRejectedValue(error)

      await expect(controller.findAll()).rejects.toThrow('Fetch failed')
      expect(mockProductService.findAll).toHaveBeenCalled()
    })
  })

  describe('findOne', () => {
    it('should return a product when found', async () => {
      mockProductService.findOne.mockResolvedValue(mockProduct)

      const result = await controller.findOne({ id: '1' })

      expect(mockProductService.findOne).toHaveBeenCalledWith('1')
      expect(result).toEqual(mockProduct)
    })

    it('should return null when product not found', async () => {
      mockProductService.findOne.mockResolvedValue(null)

      const result = await controller.findOne({ id: '999' })

      expect(mockProductService.findOne).toHaveBeenCalledWith('999')
      expect(result).toBeNull()
    })

    it('should handle errors when fetching a product', async () => {
      const error = new Error('Fetch failed')
      mockProductService.findOne.mockRejectedValue(error)

      await expect(controller.findOne({ id: '1' })).rejects.toThrow('Fetch failed')
      expect(mockProductService.findOne).toHaveBeenCalledWith('1')
    })
  })

  describe('update', () => {
    it('should update a product successfully', async () => {
      const updatedProduct = { ...mockProduct, ...mockUpdateProductDto }
      mockProductService.update.mockResolvedValue(updatedProduct)

      const result = await controller.update({ id: '1', data: mockUpdateProductDto })

      expect(mockProductService.update).toHaveBeenCalledWith('1', mockUpdateProductDto)
      expect(result).toEqual(updatedProduct)
    })

    it('should return null when product not found for update', async () => {
      mockProductService.update.mockResolvedValue(null)

      const result = await controller.update({ id: '999', data: mockUpdateProductDto })

      expect(mockProductService.update).toHaveBeenCalledWith('999', mockUpdateProductDto)
      expect(result).toBeNull()
    })

    it('should handle errors when updating a product', async () => {
      const error = new Error('Update failed')
      mockProductService.update.mockRejectedValue(error)

      await expect(controller.update({ id: '1', data: mockUpdateProductDto })).rejects.toThrow('Update failed')
      expect(mockProductService.update).toHaveBeenCalledWith('1', mockUpdateProductDto)
    })
  })

  describe('remove', () => {
    it('should remove a product successfully', async () => {
      mockProductService.remove.mockResolvedValue(true)

      const result = await controller.remove({ id: '1' })

      expect(mockProductService.remove).toHaveBeenCalledWith('1')
      expect(result).toBe(true)
    })

    it('should handle errors when removing a product', async () => {
      const error = new Error('Remove failed')
      mockProductService.remove.mockRejectedValue(error)

      await expect(controller.remove({ id: '1' })).rejects.toThrow('Remove failed')
      expect(mockProductService.remove).toHaveBeenCalledWith('1')
    })
  })
})
