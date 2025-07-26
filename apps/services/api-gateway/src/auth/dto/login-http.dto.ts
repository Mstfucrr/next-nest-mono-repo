import { ApiProperty } from '@nestjs/swagger'
import { IsEmail, IsString } from 'class-validator'

export class LoginHttpDto {
  @ApiProperty({ example: 'user@example.com', description: 'Kullanıcının e-posta adresi' })
  @IsEmail()
  email!: string

  @ApiProperty({ description: 'Kullanıcının şifresi' })
  @IsString()
  password!: string
}
