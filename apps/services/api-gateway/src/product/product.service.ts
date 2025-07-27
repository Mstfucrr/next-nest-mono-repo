import { CreateProductPayload, ProductResult } from '@dailyshop/shared-types'
import { AppLogger } from '@dailyshop/shared-utils'
import { Inject, Injectable } from '@nestjs/common'
import { ClientProxy } from '@nestjs/microservices'
import { firstValueFrom } from 'rxjs'
import { UpdateProductDto } from './dto/update-product.dto'

@Injectable()
export class ProductService {
  constructor(
    @Inject('PRODUCT_SERVICE') private readonly productClient: ClientProxy,
    private readonly logger: AppLogger
  ) {}

  async create(dto: CreateProductPayload) {
    this.logger.log(`Creating product with payload: ${JSON.stringify(dto)}`)
    return firstValueFrom<ProductResult>(this.productClient.send({ cmd: 'product-create' }, dto))
  }

  findAll() {
    return `This action returns all product`
  }

  findOne(id: number) {
    return `This action returns a #${id} product`
  }

  update(id: number, updateProductDto: UpdateProductDto) {
    return `This action updates a #${id} product`
  }

  remove(id: number) {
    return `This action removes a #${id} product`
  }
}
