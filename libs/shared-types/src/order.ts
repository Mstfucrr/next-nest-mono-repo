/**
 * OrderService'in veritabanından döneceği Order modeli
 */
export interface OrderResult {
  message: string
  order: OrderEntity
}

/**
 * OrderService tarafından emit edilecek sipariş oluşturma yükü
 */
export interface CreateOrderPayload {
  customerId: string
  status: string
  total: number
}

/**
 * OrderService'in veritabanından döneceği Order modeli
 */
export interface OrderEntity {
  id: string
  customerId: string
  status: string
  total: number
  createdAt: Date
  updatedAt: Date
}

/**
 * OrderService tarafından emit edilecek sipariş güncelleme yükü
 */
export interface UpdateOrderPayload {
  customerId?: string
  status?: string
  total?: number
}
