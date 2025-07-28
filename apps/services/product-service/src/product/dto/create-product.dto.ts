import { IsNumber, IsString, Min, MinLength } from 'class-validator'

export class CreateProductDto {
  @IsString()
  @MinLength(3)
  name!: string

  @IsString()
  @MinLength(3)
  description!: string

  @IsNumber()
  @Min(0)
  price!: number
}
