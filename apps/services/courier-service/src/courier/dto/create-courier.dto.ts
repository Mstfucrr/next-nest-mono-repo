import { IsBoolean, IsNumber, IsOptional, IsString } from 'class-validator'

export class CreateCourierDto {
  @IsString()
  externalId!: string

  @IsString()
  accountId!: string

  @IsString()
  name!: string

  @IsString()
  @IsOptional()
  phone?: string

  @IsString()
  @IsOptional()
  tckn?: string

  @IsString()
  @IsOptional()
  otherGsm?: string

  @IsString()
  @IsOptional()
  address?: string

  @IsString()
  @IsOptional()
  licensePlate?: string

  @IsString()
  @IsOptional()
  mail?: string

  @IsString()
  @IsOptional()
  iban?: string

  @IsString()
  @IsOptional()
  taxAreaCode?: string

  @IsString()
  @IsOptional()
  vkn?: string

  @IsString()
  @IsOptional()
  imei?: string

  @IsString()
  @IsOptional()
  posDeviceId?: string

  @IsString()
  @IsOptional()
  posDeviceType?: string

  @IsString()
  @IsOptional()
  eteration_device_brand?: string

  @IsString()
  @IsOptional()
  eteration_device_token?: string

  @IsString()
  @IsOptional()
  countyId?: string

  @IsString()
  @IsOptional()
  hubId?: string

  @IsString()
  @IsOptional()
  restaurantId?: string

  @IsString()
  @IsOptional()
  reasonId?: string

  @IsString()
  @IsOptional()
  onlineReasonId?: string

  @IsString()
  @IsOptional()
  state!: string

  @IsBoolean()
  isWorking!: boolean

  @IsBoolean()
  isWorkingFlag!: boolean

  @IsBoolean()
  DeliverPrepaidOrder!: boolean

  @IsBoolean()
  isTest!: boolean

  @IsBoolean()
  eteration_imei_updated!: boolean

  @IsNumber()
  iv!: number

  @IsNumber()
  @IsOptional()
  carrierType?: number

  @IsNumber()
  @IsOptional()
  carrierBillingType?: number
}
