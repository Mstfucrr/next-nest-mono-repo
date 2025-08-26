import { IsNumber, IsString } from 'class-validator'

export class CreateOrderDto {
  @IsString()
  customerId!: string

  @IsString()
  status!: string

  @IsNumber()
  total!: number
}
