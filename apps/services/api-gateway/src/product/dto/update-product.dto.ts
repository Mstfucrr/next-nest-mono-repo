import { IsNumber, IsOptional, IsString, Min } from 'class-validator'

export class UpdateProductDto {
  @IsString()
  @IsOptional()
  name?: string

  @IsString()
  @IsOptional()
  description?: string

  @IsNumber()
  @Min(0)
  @IsOptional()
  price?: number
}
