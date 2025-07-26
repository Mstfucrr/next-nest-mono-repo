import { Controller } from '@nestjs/common'
import { MessagePattern, Payload } from '@nestjs/microservices'
import { CreateProductDto } from './dto/create-product.dto'
import { UpdateProductDto } from './dto/update-product.dto'
import { ProductService } from './product.service'

@Controller()
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @MessagePattern({ cmd: 'product-create' })
  create(@Payload() createProductDto: CreateProductDto) {
    return this.productService.create(createProductDto)
  }

  @MessagePattern({ cmd: 'product-find-all' })
  findAll() {
    return this.productService.findAll()
  }

  @MessagePattern({ cmd: 'product-find-one' })
  findOne(@Payload() id: number) {
    return this.productService.findOne(id)
  }

  @MessagePattern({ cmd: 'product-update' })
  update(@Payload() updateProductDto: UpdateProductDto) {
    return this.productService.update(updateProductDto.id, updateProductDto)
  }

  @MessagePattern({ cmd: 'product-remove' })
  remove(@Payload() id: number) {
    return this.productService.remove(id)
  }
}
