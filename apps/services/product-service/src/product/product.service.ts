import { CreateProductPayload, ProductEntity, ProductResult, UpdateProductPayload } from '@dailyshop/shared-types'
import { AppLogger } from '@dailyshop/shared-utils'
import { Injectable } from '@nestjs/common'
import { PrismaService } from '../prisma/prisma.service'

@Injectable()
export class ProductService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly logger: AppLogger
  ) {}

  async create(payload: CreateProductPayload): Promise<ProductResult> {
    this.logger.log(`Creating product with payload: ${JSON.stringify(payload)}`)
    const product = await this.prisma.product.create({
      data: payload
    })
    this.logger.log(`Product created with id: ${product.id}`)
    return { message: 'Product created', product }
  }

  async findAll(): Promise<ProductEntity[]> {
    this.logger.log('Fetching all products')
    return await this.prisma.product.findMany()
  }

  async findOne(id: string): Promise<ProductEntity | null> {
    this.logger.log(`Fetching product ${id}`)
    return this.prisma.product.findUnique({
      where: { id }
    })
  }

  async update(id: string, payload: UpdateProductPayload): Promise<ProductEntity | null> {
    this.logger.log(`Updating product ${id} with payload: ${JSON.stringify(payload)}`)
    return this.prisma.product.update({
      where: { id },
      data: payload
    })
  }

  async remove(id: string): Promise<boolean> {
    this.logger.log(`Removing product ${id}`)
    const result = await this.prisma.product.delete({
      where: { id }
    })
    this.logger.log(`Product removed with id: ${id}`)
    return result !== null
  }
}
