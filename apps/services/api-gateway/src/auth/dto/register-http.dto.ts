import { ApiProperty } from '@nestjs/swagger'
import { IsEmail, IsString, MinLength } from 'class-validator'

export class RegisterHttpDto {
  @ApiProperty({ example: 'user@example.com', description: 'Kullanıcının e-posta adresi' })
  @IsEmail()
  email!: string

  @ApiProperty({ minLength: 6, description: 'Parola en az 6 karakter olmalı' })
  @IsString()
  @MinLength(6)
  password!: string

  @ApiProperty({ example: 'Ahmet Yılmaz', description: 'Kullanıcının tam adı' })
  @IsString()
  fullName!: string
}
