/**
 * ProductService’in veritabanından döneceği Product modeli
 */
export interface ProductResult {
  message: string
  product: ProductEntity
}

/**
 * ProductService tarafından emit edilecek ürün oluşturma yükü
 */
export interface CreateProductPayload {
  name: string
  description: string
  price: number
}

/**
 * ProductService’in veritabanından döneceği Product modeli
 */
export interface ProductEntity {
  id: string
  name: string
  description: string
  price: number
  createdAt: Date
  updatedAt: Date
}

/**
 * ProductService tarafından emit edilecek ürün güncelleme yükü
 */
export interface UpdateProductPayload {
  name?: string
  description?: string
  price?: number
}
