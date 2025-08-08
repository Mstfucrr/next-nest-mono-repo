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
  tckn: string | null
  createdAt: Date
  phone: string | null
  name: string
  iv: number
  state: string
  DeliverPrepaidOrder: boolean
  restaurantId: string | null
  eteration_device_brand: string | null
  isWorkingFlag: boolean
  posDeviceType: string | null
  onlineReasonId: string | null
  carrierType: number | null
  countyId: string | null
  licensePlate: string | null
  otherGsm: string | null
  posDeviceId: string | null
  hubId: string | null
  address: string | null
  reasonId: string | null
  eteration_device_token: string | null
  carrierBillingType: number | null
  imei: string | null
  iban: string | null
  mail: string | null
  taxAreaCode: string | null
  vkn: string | null
  isTest: boolean
  eteration_imei_updated: boolean
}
