import { CreateProductPayload, ProductEntity, ProductResult, UpdateProductPayload } from '@dailyshop/shared-types'
import { Injectable } from '@nestjs/common'

@Injectable()
export class ProductService {
  create(payload: CreateProductPayload): ProductResult {
    const now = new Date()
    const product: ProductEntity = {
      id: 'temp-id',
      name: payload.name,
      description: payload.description,
      price: payload.price,
      createdAt: now,
      updatedAt: now
    }
    return { message: 'Product created', product }
  }

  findAll(): ProductEntity[] {
    return []
  }

  findOne(id: string): ProductEntity | null {
    return null
  }

  update(id: string, payload: UpdateProductPayload): ProductEntity | null {
    return null
  }

  remove(id: string): boolean {
    return false
  }
}
