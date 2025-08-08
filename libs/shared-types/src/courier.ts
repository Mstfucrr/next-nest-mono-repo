/**
 * CourierService'in veritabanından döneceği Courier modeli
 */
export interface CourierResult {
  message: string
  courier: CourierEntity
}

/**
 * CourierService tarafından emit edilecek kurye güncelleme yükü
 */
export interface UpdateCourierPayload {
  name?: string
  phone?: string
  otherGsm?: string
  address?: string
  licensePlate?: string
  mail?: string
  iban?: string
  taxAreaCode?: string
  vkn?: string
  tckn?: string
  imei?: string
  posDeviceId?: string
  posDeviceType?: string
  eteration_device_brand?: string
  eteration_device_token?: string
  countyId?: string
  hubId?: string
  restaurantId?: string
  reasonId?: string
  onlineReasonId?: string
  state?: string
  isWorking?: boolean
  isWorkingFlag?: boolean
  DeliverPrepaidOrder?: boolean
  isTest?: boolean
  eteration_imei_updated?: boolean
  iv?: number
  carrierType?: number
  carrierBillingType?: number
}

/**
 * CourierService'in veritabanından döneceği Courier modeli
 */
export interface CourierEntity {
  id: string
  externalId: string
  accountId: string
  isWorking: boolean
  updatedAt: Date
  tckn?: string
  createdAt: Date
  phone?: string
  name: string
  iv: number
  state: string
  DeliverPrepaidOrder: boolean
  restaurantId?: string
  eteration_device_brand?: string
  isWorkingFlag: boolean
  posDeviceType?: string
  onlineReasonId?: string
  carrierType?: number
  countyId?: string
  licensePlate?: string
  otherGsm?: string
  posDeviceId?: string
  hubId?: string
  address?: string
  reasonId?: string
  eteration_device_token?: string
  carrierBillingType?: number
  imei?: string
  iban?: string
  mail?: string
  taxAreaCode?: string
  vkn?: string
  isTest: boolean
  eteration_imei_updated: boolean
}

