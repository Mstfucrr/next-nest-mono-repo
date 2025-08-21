import { ApiPropertyOptional } from '@nestjs/swagger'
import { Type } from 'class-transformer'
import { IsArray, IsIn, IsInt, IsOptional, IsString, Min, ValidateNested } from 'class-validator'

export class SearchParamDto {
  @ApiPropertyOptional() @IsOptional() @IsString() key?: string
  @ApiPropertyOptional() @IsOptional() @IsString() value?: string
}

export class PaginationQueryDto {
  @ApiPropertyOptional({ default: 10 })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(0)
  limit?: number = 10

  @ApiPropertyOptional({ default: 0 })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(0)
  offset?: number = 0

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  sortKey?: string

  @ApiPropertyOptional({ enum: ['asc', 'desc'] })
  @IsOptional()
  @IsIn(['asc', 'desc'])
  sortValue?: 'asc' | 'desc'

  @ApiPropertyOptional({ type: [SearchParamDto] })
  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => SearchParamDto)
  search?: SearchParamDto[]
}
