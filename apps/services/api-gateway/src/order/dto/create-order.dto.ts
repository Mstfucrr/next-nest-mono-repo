import { ApiProperty } from '@nestjs/swagger'
import { IsNumber, IsString } from 'class-validator'

export class CreateOrderDto {
  @ApiProperty({ description: 'ID of the customer placing the order' })
  @IsString()
  customerId!: string

  @ApiProperty({ description: 'Status of the order' })
  @IsString()
  status!: string

  @ApiProperty({ description: 'Total amount of the order' })
  @IsNumber()
  total!: number
}
