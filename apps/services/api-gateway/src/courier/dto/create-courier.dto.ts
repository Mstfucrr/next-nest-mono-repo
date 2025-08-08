import { ApiProperty } from '@nestjs/swagger'
import { IsBoolean, IsNumber, IsOptional, IsString } from 'class-validator'

export class CreateCourierDto {
  @ApiProperty({
    example: '8114fde8-c0df-400a-a116-fd40665578d8',
    description: 'External ID of the courier'
  })
  @IsString()
  externalId!: string

  @ApiProperty({
    example: 'fiyuu',
    description: 'Account ID'
  })
  @IsString()
  accountId!: string

  @ApiProperty({
    example: 'Emre Uslu TESTİ DEĞİŞTİM zaa',
    description: 'Name of the courier'
  })
  @IsString()
  name!: string

  @ApiProperty({
    example: '5434311232',
    description: 'Phone number of the courier',
    required: false
  })
  @IsString()
  @IsOptional()
  phone?: string

  @ApiProperty({
    example: '76356344211',
    description: 'Turkish Citizenship Number',
    required: false
  })
  @IsString()
  @IsOptional()
  tckn?: string

  @ApiProperty({
    example: '5674567389',
    description: 'Alternative phone number',
    required: false
  })
  @IsString()
  @IsOptional()
  otherGsm?: string

  @ApiProperty({
    example: 'Aziz Mahmut Hüdayi Mahallesi, Çavuşdere Caddesi No:12',
    description: 'Address of the courier',
    required: false
  })
  @IsString()
  @IsOptional()
  address?: string

  @ApiProperty({
    example: '67DTG93',
    description: 'License plate number',
    required: false
  })
  @IsString()
  @IsOptional()
  licensePlate?: string

  @ApiProperty({
    example: 'eda@fiyuu.com.tr',
    description: 'Email address',
    required: false
  })
  @IsString()
  @IsOptional()
  mail?: string

  @ApiProperty({
    example: 'TR363673637663736363736375',
    description: 'IBAN number',
    required: false
  })
  @IsString()
  @IsOptional()
  iban?: string

  @ApiProperty({
    example: 'PENDIK',
    description: 'Tax area code',
    required: false
  })
  @IsString()
  @IsOptional()
  taxAreaCode?: string

  @ApiProperty({
    example: '162378902213',
    description: 'Tax number',
    required: false
  })
  @IsString()
  @IsOptional()
  vkn?: string

  @ApiProperty({
    example: '497327893644572',
    description: 'IMEI number',
    required: false
  })
  @IsString()
  @IsOptional()
  imei?: string

  @ApiProperty({
    example: '00C27438',
    description: 'POS device ID',
    required: false
  })
  @IsString()
  @IsOptional()
  posDeviceId?: string

  @ApiProperty({
    example: 'Virtual',
    description: 'POS device type',
    required: false
  })
  @IsString()
  @IsOptional()
  posDeviceType?: string

  @ApiProperty({
    example: 'android',
    description: 'Device brand',
    required: false
  })
  @IsString()
  @IsOptional()
  eteration_device_brand?: string

  @ApiProperty({
    example:
      'c5NGu6HbTXidur04ArgR0I:APA91bGPJNNViTFUc4Jrdv7xs3dd6zio9yjPHRdpQjWVlqHtBj_okX2jd840YEaZqerI_4SXb5zSEMwjBpHQqq3IONsxGENWSE3tr0TlBlMPy1OerDTKF5Q',
    description: 'Device token',
    required: false
  })
  @IsString()
  @IsOptional()
  eteration_device_token?: string

  @ApiProperty({
    example: '8F73515E-9EC4-E311-9400-0050568027BF',
    description: 'County ID',
    required: false
  })
  @IsString()
  @IsOptional()
  countyId?: string

  @ApiProperty({
    example: '883cfdad6210febee532270181973460',
    description: 'Hub ID',
    required: false
  })
  @IsString()
  @IsOptional()
  hubId?: string

  @ApiProperty({
    example: '29a862ac93f786b800d0e464ecbd6536',
    description: 'Restaurant ID',
    required: false
  })
  @IsString()
  @IsOptional()
  restaurantId?: string

  @ApiProperty({
    example: '1',
    description: 'Reason ID',
    required: false
  })
  @IsString()
  @IsOptional()
  reasonId?: string

  @ApiProperty({
    example: '1',
    description: 'Online reason ID',
    required: false
  })
  @IsString()
  @IsOptional()
  onlineReasonId?: string

  @ApiProperty({
    example: 'ready',
    description: 'State of the courier'
  })
  @IsString()
  state!: string

  @ApiProperty({
    example: true,
    description: 'Whether the courier is working'
  })
  @IsBoolean()
  isWorking!: boolean

  @ApiProperty({
    example: true,
    description: 'Working flag status'
  })
  @IsBoolean()
  isWorkingFlag!: boolean

  @ApiProperty({
    example: true,
    description: 'Whether to deliver prepaid orders'
  })
  @IsBoolean()
  DeliverPrepaidOrder!: boolean

  @ApiProperty({
    example: false,
    description: 'Whether this is a test courier'
  })
  @IsBoolean()
  isTest!: boolean

  @ApiProperty({
    example: false,
    description: 'Whether IMEI has been updated'
  })
  @IsBoolean()
  eteration_imei_updated!: boolean

  @ApiProperty({
    example: 1,
    description: 'IV value'
  })
  @IsNumber()
  iv!: number

  @ApiProperty({
    example: 2,
    description: 'Carrier type',
    required: false
  })
  @IsNumber()
  @IsOptional()
  carrierType?: number

  @ApiProperty({
    example: 3,
    description: 'Carrier billing type',
    required: false
  })
  @IsNumber()
  @IsOptional()
  carrierBillingType?: number
}
