import { ApiProperty } from '@nestjs/swagger'
import { IsBoolean, IsNumber, IsOptional, IsString } from 'class-validator'

export class UpdateCourierDto {
  @ApiProperty({
    example: 'Emre Uslu Updated',
    description: 'Name of the courier',
    required: false
  })
  @IsString()
  @IsOptional()
  name?: string

  @ApiProperty({
    example: '5434311232',
    description: 'Phone number of the courier',
    required: false
  })
  @IsString()
  @IsOptional()
  phone?: string

  @ApiProperty({
    example: '5674567389',
    description: 'Alternative phone number',
    required: false
  })
  @IsString()
  @IsOptional()
  otherGsm?: string

  @ApiProperty({
    example: 'Updated Address, New Street No:15',
    description: 'Address of the courier',
    required: false
  })
  @IsString()
  @IsOptional()
  address?: string

  @ApiProperty({
    example: '34ABC123',
    description: 'License plate number',
    required: false
  })
  @IsString()
  @IsOptional()
  licensePlate?: string

  @ApiProperty({
    example: 'updated@fiyuu.com.tr',
    description: 'Email address',
    required: false
  })
  @IsString()
  @IsOptional()
  mail?: string

  @ApiProperty({
    example: 'TR123456789012345678901234',
    description: 'IBAN number',
    required: false
  })
  @IsString()
  @IsOptional()
  iban?: string

  @ApiProperty({
    example: 'ISTANBUL',
    description: 'Tax area code',
    required: false
  })
  @IsString()
  @IsOptional()
  taxAreaCode?: string

  @ApiProperty({
    example: '987654321098',
    description: 'Tax number',
    required: false
  })
  @IsString()
  @IsOptional()
  vkn?: string

  @ApiProperty({
    example: '76356344211',
    description: 'Turkish Citizenship Number',
    required: false
  })
  @IsString()
  @IsOptional()
  tckn?: string

  @ApiProperty({
    example: '497327893644572',
    description: 'IMEI number',
    required: false
  })
  @IsString()
  @IsOptional()
  imei?: string

  @ApiProperty({
    example: '00C27439',
    description: 'POS device ID',
    required: false
  })
  @IsString()
  @IsOptional()
  posDeviceId?: string

  @ApiProperty({
    example: 'Physical',
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
    example: 'updated_device_token_here',
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
    example: '2',
    description: 'Reason ID',
    required: false
  })
  @IsString()
  @IsOptional()
  reasonId?: string

  @ApiProperty({
    example: '2',
    description: 'Online reason ID',
    required: false
  })
  @IsString()
  @IsOptional()
  onlineReasonId?: string

  @ApiProperty({
    example: 'active',
    description: 'State of the courier',
    required: false
  })
  @IsString()
  @IsOptional()
  state?: string

  @ApiProperty({
    example: true,
    description: 'Whether the courier is working',
    required: false
  })
  @IsBoolean()
  @IsOptional()
  isWorking?: boolean

  @ApiProperty({
    example: true,
    description: 'Working flag status',
    required: false
  })
  @IsBoolean()
  @IsOptional()
  isWorkingFlag?: boolean

  @ApiProperty({
    example: true,
    description: 'Whether to deliver prepaid orders',
    required: false
  })
  @IsBoolean()
  @IsOptional()
  DeliverPrepaidOrder?: boolean

  @ApiProperty({
    example: false,
    description: 'Whether this is a test courier',
    required: false
  })
  @IsBoolean()
  @IsOptional()
  isTest?: boolean

  @ApiProperty({
    example: true,
    description: 'Whether IMEI has been updated',
    required: false
  })
  @IsBoolean()
  @IsOptional()
  eteration_imei_updated?: boolean

  @ApiProperty({
    example: 5,
    description: 'IV value',
    required: false
  })
  @IsNumber()
  @IsOptional()
  iv?: number

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
