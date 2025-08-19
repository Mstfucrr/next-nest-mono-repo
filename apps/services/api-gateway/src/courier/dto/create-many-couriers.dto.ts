import { ApiProperty } from '@nestjs/swagger'
import { Type } from 'class-transformer'
import { ArrayMinSize, IsArray, ValidateNested } from 'class-validator'
import { CreateCourierDto } from './create-courier.dto'

export class CreateManyCouriersDto {
  @ApiProperty({
    type: [CreateCourierDto],
    description: 'Array of couriers to create',
    example: [
      {
        externalId: '8114fde8-c0df-400a-a116-fd40665578d8',
        accountId: 'fiyuu',
        name: 'Emre Uslu TESTİ DEĞİŞTİM zaa',
        phone: '5434311232',
        tckn: '76356344211',
        address: 'Aziz Mahmut Hüdayi Mahallesi, Çavuşdere Caddesi No:12',
        licensePlate: '67DTG93',
        mail: 'eda@fiyuu.com.tr',
        iban: 'TR363673637663736363736375',
        taxAreaCode: 'PENDIK',
        vkn: '162378902213',
        imei: '497327893644572',
        posDeviceId: '00C27438',
        posDeviceType: 'Virtual',
        eteration_device_brand: 'android',
        eteration_device_token:
          'c5NGu6HbTXidur04ArgR0I:APA91bGPJNNViTFUc4Jrdv7xs3dd6zio9yjPHRdpQjWVlqHtBj_okX2jd840YEaZqerI_4SXb5zSEMwjBpHQqq3IONsxGENWSE3tr0TlBlMPy1OerDTKF5Q',
        countyId: '8F73515E-9EC4-E311-9400-0050568027BF',
        hubId: '883cfdad6210febee532270181973460',
        restaurantId: '29a862ac93f786b800d0e464ecbd6536',
        reasonId: '1',
        onlineReasonId: '1',
        state: 'ready',
        isWorking: true,
        isWorkingFlag: true,
        DeliverPrepaidOrder: true,
        isTest: false,
        eteration_imei_updated: false,
        iv: 1,
        carrierType: 2,
        carrierBillingType: 3
      },
      {
        externalId: '504bc2d7-d500-4669-be84-8f2d8da2225f',
        accountId: 'fiyuu',
        name: 'CEPTE POS END TEST',
        phone: '5363636333',
        tckn: '08037917391',
        address: 'Aziz Mahmut Hüdayi Mahallesi, Çavuşdere Caddesi No:12',
        licensePlate: '67DTG93',
        mail: 'eda@fiyuu.com.tr',
        iban: 'TR363673637663736363736375',
        taxAreaCode: 'PENDIK',
        vkn: '162378902213',
        imei: '497327893644572',
        posDeviceId: null,
        posDeviceType: null,
        eteration_device_brand: 'android',
        eteration_device_token:
          'c5NGu6HbTXidur04ArgR0I:APA91bGPJNNViTFUc4Jrdv7xs3dd6zio9yjPHRdpQjWVlqHtBj_okX2jd840YEaZqerI_4SXb5zSEMwjBpHQqq3IONsxGENWSE3tr0TlBlMPy1OerDTKF5Q',
        countyId: '8F73515E-9EC4-E311-9400-0050568027BF',
        hubId: '883cfdad6210febee532270181973460',
        restaurantId: '29a862ac93f786b800d0e464ecbd6536',
        reasonId: '1',
        onlineReasonId: '1',
        state: 'ready',
        isWorking: true,
        isWorkingFlag: true,
        DeliverPrepaidOrder: true,
        isTest: false,
        eteration_imei_updated: false,
        iv: 62,
        carrierType: 2,
        carrierBillingType: 3
      }
    ]
  })
  @IsArray()
  @ArrayMinSize(1, { message: 'At least one courier must be provided' })
  @ValidateNested({ each: true })
  @Type(() => CreateCourierDto)
  couriers!: CreateCourierDto[]
}


