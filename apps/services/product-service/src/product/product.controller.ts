import { AppLogger } from '@dailyshop/shared-utils'
import { Controller } from '@nestjs/common'
import { MessagePattern, Payload } from '@nestjs/microservices'
import { CreateProductDto } from './dto/create-product.dto'
import { UpdateProductDto } from './dto/update-product.dto'
import { ProductService } from './product.service'

@Controller()
export class ProductController {
  constructor(
    private readonly productService: ProductService,
    private readonly logger: AppLogger
  ) {}

  @MessagePattern({ cmd: 'product-create' })
  create(@Payload() dto: CreateProductDto) {
    this.logger.log(`Creating product with payload: ${JSON.stringify(dto)}`)
    return this.productService.create(dto)
  }

  @MessagePattern({ cmd: 'product-find-all' })
  findAll() {
    return this.productService.findAll()
  }

  @MessagePattern({ cmd: 'product-find-one' })
  findOne(@Payload() payload: { id: string }) {
    return this.productService.findOne(payload.id)
  }

  @MessagePattern({ cmd: 'product-update' })
  update(@Payload() payload: { id: string; data: UpdateProductDto }) {
    return this.productService.update(payload.id, payload.data)
  }

  @MessagePattern({ cmd: 'product-remove' })
  remove(@Payload() payload: { id: string }) {
    return this.productService.remove(payload.id)
  }
}
