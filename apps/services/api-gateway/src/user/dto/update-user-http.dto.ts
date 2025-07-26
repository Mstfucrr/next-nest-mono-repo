import { ApiProperty } from '@nestjs/swagger'
import { IsEmail, IsOptional, IsString } from 'class-validator'

export class UpdateUserHttpDto {
  @ApiProperty({ example: 'new@example.com', required: false, description: 'Yeni e-posta adresi' })
  @IsEmail()
  @IsOptional()
  email?: string

  @ApiProperty({ example: 'Yeni İsim', required: false, description: 'Yeni kullanıcı adı' })
  @IsString()
  @IsOptional()
  fullName?: string
}
