import { ApiProperty } from '@nestjs/swagger'
import { IsNumber, IsString, Min, MinLength } from 'class-validator'

export class CreateProductDto {
  @ApiProperty({ example: 'Product Name', description: 'Product name' })
  @IsString()
  @MinLength(3)
  name!: string

  @ApiProperty({ example: 'Product Description', description: 'Product description' })
  @IsString()
  @MinLength(3)
  description!: string

  @ApiProperty({ example: 100, description: 'Product price' })
  @IsNumber()
  @Min(0)
  price!: number
}
