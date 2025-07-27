import { ProductEntity } from '@dailyshop/shared-types'
import { AppLogger } from '@dailyshop/shared-utils'
import { Test, TestingModule } from '@nestjs/testing'
import { PrismaService } from '../prisma/prisma.service'
import { CreateProductDto } from './dto/create-product.dto'
import { UpdateProductDto } from './dto/update-product.dto'
import { ProductService } from './product.service'

// Mock the shared-utils module
jest.mock('@dailyshop/shared-utils', () => ({
  AppLogger: jest.fn().mockImplementation(() => ({
    log: jest.fn(),
    warn: jest.fn(),
    error: jest.fn()
  }))
}))

describe('ProductService', () => {
  let service: ProductService

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

  const mockPrismaService = {
    product: {
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
        ProductService,
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

    service = module.get<ProductService>(ProductService)
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })

  describe('create', () => {
    it('should create a new product successfully', async () => {
      mockPrismaService.product.create.mockResolvedValue(mockProduct)

      const result = await service.create(mockCreateProductDto)

      expect(mockPrismaService.product.create).toHaveBeenCalledWith({
        data: mockCreateProductDto
      })
      expect(result).toEqual({ message: 'Product created', product: mockProduct })
    })

    it('should throw an error when product creation fails', async () => {
      const error = new Error('Database error')
      mockPrismaService.product.create.mockRejectedValue(error)

      await expect(service.create(mockCreateProductDto)).rejects.toThrow('Database error')
      expect(mockPrismaService.product.create).toHaveBeenCalledWith({
        data: mockCreateProductDto
      })
    })
  })

  describe('findAll', () => {
    it('should return all products', async () => {
      const mockProducts = [mockProduct, { ...mockProduct, id: '2', name: 'Test Product 2' }]
      mockPrismaService.product.findMany.mockResolvedValue(mockProducts)

      const result = await service.findAll()

      expect(mockPrismaService.product.findMany).toHaveBeenCalled()
      expect(result).toEqual(mockProducts)
    })

    it('should return empty array when no products exist', async () => {
      mockPrismaService.product.findMany.mockResolvedValue([])

      const result = await service.findAll()

      expect(mockPrismaService.product.findMany).toHaveBeenCalled()
      expect(result).toEqual([])
    })

    it('should throw an error when database query fails', async () => {
      const error = new Error('Database error')
      mockPrismaService.product.findMany.mockRejectedValue(error)

      await expect(service.findAll()).rejects.toThrow('Database error')
      expect(mockPrismaService.product.findMany).toHaveBeenCalled()
    })
  })

  describe('findOne', () => {
    it('should return a product when found', async () => {
      mockPrismaService.product.findUnique.mockResolvedValue(mockProduct)

      const result = await service.findOne('1')

      expect(mockPrismaService.product.findUnique).toHaveBeenCalledWith({
        where: { id: '1' }
      })
      expect(result).toEqual(mockProduct)
    })

    it('should return null when product not found', async () => {
      mockPrismaService.product.findUnique.mockResolvedValue(null)

      const result = await service.findOne('999')

      expect(mockPrismaService.product.findUnique).toHaveBeenCalledWith({
        where: { id: '999' }
      })
      expect(result).toBeNull()
    })

    it('should throw an error when database query fails', async () => {
      const error = new Error('Database error')
      mockPrismaService.product.findUnique.mockRejectedValue(error)

      await expect(service.findOne('1')).rejects.toThrow('Database error')
      expect(mockPrismaService.product.findUnique).toHaveBeenCalledWith({
        where: { id: '1' }
      })
    })
  })

  describe('update', () => {
    it('should update a product successfully', async () => {
      const updatedProduct = { ...mockProduct, ...mockUpdateProductDto }
      mockPrismaService.product.update.mockResolvedValue(updatedProduct)

      const result = await service.update('1', mockUpdateProductDto)

      expect(mockPrismaService.product.update).toHaveBeenCalledWith({
        where: { id: '1' },
        data: mockUpdateProductDto
      })
      expect(result).toEqual(updatedProduct)
    })

    it('should return null when product not found for update', async () => {
      mockPrismaService.product.update.mockRejectedValue(new Error('Record not found'))

      await expect(service.update('999', mockUpdateProductDto)).rejects.toThrow('Record not found')
      expect(mockPrismaService.product.update).toHaveBeenCalledWith({
        where: { id: '999' },
        data: mockUpdateProductDto
      })
    })

    it('should throw an error when database update fails', async () => {
      const error = new Error('Database error')
      mockPrismaService.product.update.mockRejectedValue(error)

      await expect(service.update('1', mockUpdateProductDto)).rejects.toThrow('Database error')
      expect(mockPrismaService.product.update).toHaveBeenCalledWith({
        where: { id: '1' },
        data: mockUpdateProductDto
      })
    })
  })

  describe('remove', () => {
    it('should delete a product successfully and return true', async () => {
      mockPrismaService.product.delete.mockResolvedValue(mockProduct)

      const result = await service.remove('1')

      expect(mockPrismaService.product.delete).toHaveBeenCalledWith({
        where: { id: '1' }
      })
      expect(result).toBe(true)
    })

    it('should return false when product not found for deletion', async () => {
      mockPrismaService.product.delete.mockRejectedValue(new Error('Record not found'))

      await expect(service.remove('999')).rejects.toThrow('Record not found')
      expect(mockPrismaService.product.delete).toHaveBeenCalledWith({
        where: { id: '999' }
      })
    })

    it('should throw an error when database deletion fails', async () => {
      const error = new Error('Database error')
      mockPrismaService.product.delete.mockRejectedValue(error)

      await expect(service.remove('1')).rejects.toThrow('Database error')
      expect(mockPrismaService.product.delete).toHaveBeenCalledWith({
        where: { id: '1' }
      })
    })
  })
})
