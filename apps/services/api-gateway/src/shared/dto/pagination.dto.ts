import { ApiPropertyOptional } from '@nestjs/swagger'
import { plainToInstance, Transform, Type } from 'class-transformer'
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
  @Transform(
    ({ value }) => {
      console.log('value', value)
      const arr = Array.isArray(value) ? value : [value]
      const parsed = arr.flatMap(item => {
        if (typeof item === 'string') {
          try {
            return JSON.parse(item) as SearchParamDto
          } catch {
            return []
          }
        }
        if (item && typeof item === 'object') return [item as SearchParamDto]
        return []
      })
      return plainToInstance(SearchParamDto, parsed)
    },
    { toClassOnly: true }
  )
  search?: SearchParamDto[]
}
