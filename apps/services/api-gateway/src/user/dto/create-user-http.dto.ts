import { ApiProperty } from '@nestjs/swagger'
import { IsEmail, IsString } from 'class-validator'

export class CreateUserHttpDto {
  @ApiProperty({ example: 'user@example.com', description: 'Kullanıcının e-posta adresi' })
  @IsEmail()
  email!: string

  @ApiProperty({ example: 'Ahmet Yılmaz', description: 'Kullanıcının tam adı' })
  @IsString()
  fullName!: string
}
