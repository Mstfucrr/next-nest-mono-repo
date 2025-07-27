import {
  CreateProductPayload,
  ProductEntity,
  ProductResult,
  UpdateProductPayload
} from '@dailyshop/shared-types'
import { AppLogger } from '@dailyshop/shared-utils'
import { Inject, Injectable } from '@nestjs/common'
import { ClientProxy } from '@nestjs/microservices'
import { firstValueFrom } from 'rxjs'

@Injectable()
export class ProductService {
  constructor(
    @Inject('PRODUCT_SERVICE') private readonly productClient: ClientProxy,
    private readonly logger: AppLogger
  ) {}

  async create(dto: CreateProductPayload): Promise<ProductResult> {
    this.logger.log(`Creating product with payload: ${JSON.stringify(dto)}`)
    return firstValueFrom<ProductResult>(
      this.productClient.send({ cmd: 'product-create' }, dto)
    )
  }

  async findAll(): Promise<ProductEntity[]> {
    return firstValueFrom<ProductEntity[]>(
      this.productClient.send({ cmd: 'product-find-all' }, {})
    )
  }

  async findOne(id: string): Promise<ProductEntity | null> {
    return firstValueFrom<ProductEntity | null>(
      this.productClient.send({ cmd: 'product-find-one' }, { id })
    )
  }

  async update(id: string, dto: UpdateProductPayload): Promise<ProductEntity | null> {
    return firstValueFrom<ProductEntity | null>(
      this.productClient.send({ cmd: 'product-update' }, { id, data: dto })
    )
  }

  async remove(id: string): Promise<boolean> {
    return firstValueFrom<boolean>(
      this.productClient.send({ cmd: 'product-remove' }, { id })
    )
  }
}
